import {
  OTP_MAX_SENDS_PER_WINDOW,
  OTP_MAX_VERIFY_ATTEMPTS,
  OTP_SEND_WINDOW_MINUTES,
  OTP_TTL_MINUTES,
  OTP_VERIFIED_WINDOW_MINUTES,
  generateOtpCode,
  hashOtpCode,
  isOtpExpired,
  otpExpiresAt,
  verifiedWithinWindow,
  type OtpPurpose,
} from "@/lib/email-otp";
import { sendOtpEmail, type OtpEmailKind } from "@/lib/mail";
import { prisma } from "@/lib/prisma";
import {
  isMysqlConnectionError,
  isMysqlSkipped,
  markMysqlUnreachable,
} from "@/lib/server/mysql-availability";
import {
  memoryCountRecentSends,
  memoryCreateOtp,
  memoryFindActiveOtp,
  memoryHasRecentVerification,
  memoryInvalidateOpenCodes,
  memoryUpdateOtp,
} from "@/lib/server/otp-memory-store";

export type OtpSendResult = {
  ok: boolean;
  message?: string;
  devLogged?: boolean;
  /** Only returned when SMTP is intentionally disabled / local dev. */
  devCode?: string;
  expiresInMinutes?: number;
};

export type OtpVerifyResult = {
  ok: boolean;
  message?: string;
  /** Hint for HTTP status: 429 when locked / rate-limited. */
  httpStatus?: number;
  remainingAttempts?: number;
};

function useMemoryOtp(): boolean {
  return isMysqlSkipped();
}

function otpModel() {
  if (!prisma.lmsEmailOtp) {
    throw new Error(
      "Prisma client missing lmsEmailOtp. Run: npm run db:generate — then restart npm run dev",
    );
  }
  return prisma.lmsEmailOtp;
}

function mailKindForPurpose(purpose: OtpPurpose): OtpEmailKind {
  return purpose === "reset_password" || purpose === "admin_security" ? "reset_password" : "register";
}

async function withMysqlFallback<T>(fn: () => Promise<T>, fallback: () => Promise<T> | T): Promise<T> {
  if (useMemoryOtp()) return fallback();
  try {
    return await fn();
  } catch (err) {
    if (isMysqlConnectionError(err)) {
      markMysqlUnreachable(err);
      return fallback();
    }
    throw err;
  }
}

export async function countRecentOtpSends(email: string, purpose: OtpPurpose): Promise<number> {
  const since = new Date(Date.now() - OTP_SEND_WINDOW_MINUTES * 60 * 1000);
  return withMysqlFallback(
    () =>
      otpModel().count({
        where: { email, purpose, createdAt: { gte: since } },
      }),
    () => memoryCountRecentSends(email, purpose, since),
  );
}

export async function sendOtpForPurpose(email: string, purpose: OtpPurpose): Promise<OtpSendResult> {
  const sends = await countRecentOtpSends(email, purpose);
  if (sends >= OTP_MAX_SENDS_PER_WINDOW) {
    return {
      ok: false,
      message: `Too many codes sent. Wait ${OTP_SEND_WINDOW_MINUTES} minutes and try again.`,
    };
  }

  const code = generateOtpCode();
  const codeHash = hashOtpCode(code);
  const expiresAt = otpExpiresAt();

  await withMysqlFallback(
    async () => {
      await otpModel().updateMany({
        where: {
          email,
          purpose,
          verifiedAt: null,
          expiresAt: { gt: new Date() },
        },
        data: { expiresAt: new Date() },
      });
      await otpModel().create({
        data: {
          email,
          codeHash,
          purpose,
          expiresAt,
          attemptCount: 0,
        },
      });
    },
    () => {
      memoryInvalidateOpenCodes(email, purpose);
      memoryCreateOtp({ email, purpose, codeHash, expiresAt });
    },
  );

  try {
    const mail = await sendOtpEmail(email, code, mailKindForPurpose(purpose));
    const devMode = Boolean(mail.devLogged);
    if (devMode && process.env.NODE_ENV === "production" && process.env.OTP_USE_SMTP !== "false") {
      return {
        ok: false,
        message:
          "Email OTP is not configured on the server. Set SMTP_HOST, SMTP_USER, and SMTP_PASS (Gmail app password), then restart the app.",
      };
    }
    // Never return the code to the browser when real SMTP email is enabled.
    const exposeOnPage =
      process.env.OTP_USE_SMTP !== "true" && Boolean(mail.devCode);

    return {
      ok: true,
      devLogged: mail.devLogged,
      ...(exposeOnPage ? { devCode: mail.devCode } : {}),
      expiresInMinutes: OTP_TTL_MINUTES,
      message: exposeOnPage
        ? `Dev mode — code for ${email}: ${mail.devCode} (expires in ${OTP_TTL_MINUTES} minutes).`
        : `Verification code emailed to ${email}. Check inbox and spam. Expires in ${OTP_TTL_MINUTES} minutes.`,
    };
  } catch (err) {
    const detail = err instanceof Error ? err.message : "Failed to send email";
    console.error("[otp/send-mail]", email, detail);
    return {
      ok: false,
      message:
        `Could not send email to ${email}. ` +
        `Check SMTP (Gmail app password, firewall port 587) and server logs. ${detail}`,
    };
  }
}

export async function sendRegistrationOtp(email: string): Promise<OtpSendResult> {
  return sendOtpForPurpose(email, "register");
}

export async function sendPasswordResetOtp(_email: string): Promise<OtpSendResult> {
  return {
    ok: false,
    message: "Password reset codes are disabled. Use the forgot-password email link instead.",
  };
}

export async function sendAdminSecurityOtp(email: string): Promise<OtpSendResult> {
  return sendOtpForPurpose(email, "admin_security");
}

export async function verifyOtpForPurpose(
  email: string,
  code: string,
  purpose: OtpPurpose,
): Promise<OtpVerifyResult> {
  const trimmed = code.trim();
  if (!/^\d{6}$/.test(trimmed)) {
    return { ok: false, message: "Enter the 6-digit code from your email.", httpStatus: 400 };
  }

  const codeHash = hashOtpCode(trimmed);
  const now = new Date();

  if (useMemoryOtp()) {
    const record = memoryFindActiveOtp(email, purpose, now);
    if (!record) {
      return {
        ok: false,
        message: "No valid code found. Request a new code.",
        httpStatus: 400,
      };
    }
    if (isOtpExpired(record.expiresAt, now)) {
      return { ok: false, message: "Code expired. Request a new code.", httpStatus: 400 };
    }
    if (record.attemptCount >= OTP_MAX_VERIFY_ATTEMPTS) {
      memoryUpdateOtp(email, purpose, { expiresAt: now });
      return {
        ok: false,
        message: "Too many incorrect codes. Request a new code and try again later.",
        httpStatus: 429,
        remainingAttempts: 0,
      };
    }
    if (record.codeHash !== codeHash) {
      const attempts = record.attemptCount + 1;
      memoryUpdateOtp(email, purpose, {
        attemptCount: attempts,
        ...(attempts >= OTP_MAX_VERIFY_ATTEMPTS ? { expiresAt: now } : {}),
      });
      const remaining = Math.max(0, OTP_MAX_VERIFY_ATTEMPTS - attempts);
      if (remaining === 0) {
        return {
          ok: false,
          message: "Too many incorrect codes. This code is locked. Request a new code.",
          httpStatus: 429,
          remainingAttempts: 0,
        };
      }
      return {
        ok: false,
        message: `Incorrect code. Try again. (${remaining} attempt${remaining === 1 ? "" : "s"} left)`,
        httpStatus: 400,
        remainingAttempts: remaining,
      };
    }
    memoryUpdateOtp(email, purpose, { verifiedAt: now });
    return {
      ok: true,
      message: purpose === "reset_password" ? "Code verified." : "Email verified.",
    };
  }

  try {
    const record = await otpModel().findFirst({
      where: {
        email,
        purpose,
        verifiedAt: null,
        expiresAt: { gt: now },
      },
      orderBy: { createdAt: "desc" },
    });

    if (!record) {
      return {
        ok: false,
        message: "No valid code found. Request a new code.",
        httpStatus: 400,
      };
    }

    if (isOtpExpired(record.expiresAt, now)) {
      return { ok: false, message: "Code expired. Request a new code.", httpStatus: 400 };
    }

    const priorAttempts = Number(record.attemptCount ?? 0);
    if (priorAttempts >= OTP_MAX_VERIFY_ATTEMPTS) {
      await otpModel().update({
        where: { id: record.id },
        data: { expiresAt: now },
      });
      return {
        ok: false,
        message: "Too many incorrect codes. Request a new code and try again later.",
        httpStatus: 429,
        remainingAttempts: 0,
      };
    }

    if (record.codeHash !== codeHash) {
      const updated = await otpModel().update({
        where: { id: record.id },
        data: { attemptCount: { increment: 1 } },
      });
      const attempts = Number(updated.attemptCount ?? priorAttempts + 1);
      const remaining = Math.max(0, OTP_MAX_VERIFY_ATTEMPTS - attempts);

      if (attempts >= OTP_MAX_VERIFY_ATTEMPTS) {
        await otpModel().update({
          where: { id: record.id },
          data: { expiresAt: now },
        });
        return {
          ok: false,
          message: "Too many incorrect codes. This code is locked. Request a new code.",
          httpStatus: 429,
          remainingAttempts: 0,
        };
      }

      return {
        ok: false,
        message: `Incorrect code. Try again. (${remaining} attempt${remaining === 1 ? "" : "s"} left)`,
        httpStatus: 400,
        remainingAttempts: remaining,
      };
    }

    await otpModel().update({
      where: { id: record.id },
      data: { verifiedAt: now },
    });

    await otpModel().updateMany({
      where: {
        email,
        purpose,
        verifiedAt: null,
        id: { not: record.id },
        expiresAt: { gt: now },
      },
      data: { expiresAt: now },
    });

    if (purpose === "register") {
      await prisma.lmsUser.updateMany({
        where: { email },
        data: { emailVerifiedAt: now },
      }).catch((err) => {
        if (isMysqlConnectionError(err)) markMysqlUnreachable(err);
      });
    }

    return {
      ok: true,
      message: purpose === "reset_password" ? "Code verified." : "Email verified.",
    };
  } catch (err) {
    if (isMysqlConnectionError(err)) {
      markMysqlUnreachable(err);
      return verifyOtpForPurpose(email, code, purpose);
    }
    throw err;
  }
}

export async function verifyRegistrationOtp(
  email: string,
  code: string,
): Promise<OtpVerifyResult> {
  return verifyOtpForPurpose(email, code, "register");
}

export async function hasRecentOtpVerification(email: string, purpose: OtpPurpose): Promise<boolean> {
  const since = new Date(Date.now() - OTP_VERIFIED_WINDOW_MINUTES * 60 * 1000);
  return withMysqlFallback(
    async () => {
      const verified = await otpModel().findFirst({
        where: {
          email,
          purpose,
          verifiedAt: { gte: since },
        },
        orderBy: { verifiedAt: "desc" },
      });
      return Boolean(verified?.verifiedAt && verifiedWithinWindow(verified.verifiedAt));
    },
    () => memoryHasRecentVerification(email, purpose, since),
  );
}

export async function hasRecentEmailVerification(email: string): Promise<boolean> {
  return hasRecentOtpVerification(email, "register");
}

export async function hasRecentPasswordResetVerification(email: string): Promise<boolean> {
  return hasRecentOtpVerification(email, "reset_password");
}
