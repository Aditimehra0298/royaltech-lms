import { createRequire } from "node:module";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { buildOtpEmail } from "@/lib/email-templates/otp";
import { emailAppName, emailAppUrl, emailLogoSrc, emailSmtpFromHeader } from "@/lib/email-brand-config";

export type { OtpEmailKind } from "@/lib/email-templates/otp";

export type SendEmailResult = { sent: boolean; devLogged?: boolean; devCode?: string };
export type SendOtpResult = SendEmailResult;

export type TransactionalEmailPayload = {
  to: string;
  subject: string;
  text: string;
  html: string;
};

function smtpConfigured(): boolean {
  return Boolean(
    process.env.SMTP_HOST?.trim() &&
      process.env.SMTP_USER?.trim() &&
      process.env.SMTP_PASS?.trim(),
  );
}

function smtpMissingVars(): string[] {
  const missing: string[] = [];
  if (!process.env.SMTP_HOST?.trim()) missing.push("SMTP_HOST");
  if (!process.env.SMTP_USER?.trim()) missing.push("SMTP_USER");
  if (!process.env.SMTP_PASS?.trim()) missing.push("SMTP_PASS");
  return missing;
}

function nodemailerInstalled(): boolean {
  return existsSync(join(process.cwd(), "node_modules", "nodemailer", "package.json"));
}

/** Real SMTP: enabled unless explicitly OTP_USE_SMTP=false. */
function useRealSmtp(): boolean {
  return process.env.OTP_USE_SMTP !== "false" && smtpConfigured();
}

type NodemailerModule = {
  createTransport: (opts: Record<string, unknown>) => {
    sendMail: (opts: Record<string, unknown>) => Promise<unknown>;
  };
};

let nodemailerModule: NodemailerModule | null | undefined;

function loadNodemailer(): NodemailerModule | null {
  if (nodemailerModule !== undefined) return nodemailerModule;
  if (!nodemailerInstalled()) {
    nodemailerModule = null;
    return null;
  }
  try {
    const req = createRequire(join(process.cwd(), "package.json"));
    nodemailerModule = req("nodemailer") as NodemailerModule;
  } catch {
    nodemailerModule = null;
  }
  return nodemailerModule;
}

function logDevEmail(to: string, subject: string, reason: string, preview?: string): SendEmailResult {
  const extra = preview ? `\n  Preview: ${preview}` : "";
  console.log(`[email] ${to} — ${subject}\n  (${reason})${extra}`);
  return { sent: true, devLogged: true };
}

function logDevOtp(to: string, code: string, reason: string): SendOtpResult {
  const result = logDevEmail(to, "OTP", reason, `code: ${code}`);
  return { ...result, devCode: code };
}

/** When true, OTP is logged / shown instead of sent over SMTP. */
export function otpSmtpDisabled(): boolean {
  return process.env.OTP_USE_SMTP === "false" || !smtpConfigured();
}

/** Only show OTP on the login page when SMTP is intentionally off. */
function allowDevOtpOnPage(): boolean {
  if (process.env.OTP_USE_SMTP === "true") return false;
  if (process.env.OTP_DEV_EXPOSE_CODE === "true") return true;
  if (process.env.OTP_USE_SMTP === "false") return true;
  return false;
}

async function sendWithNodemailer(payload: TransactionalEmailPayload): Promise<void> {
  const nm = loadNodemailer();
  if (!nm) throw new Error("nodemailer is not installed. Run: npm install nodemailer");
  const port = Number(process.env.SMTP_PORT ?? "587");
  const secure = process.env.SMTP_SECURE === "true" || port === 465;
  const timeout = 25_000;
  const transporter = nm.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure,
    connectionTimeout: timeout,
    greetingTimeout: timeout,
    socketTimeout: timeout,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
  const from = emailSmtpFromHeader();
  await transporter.sendMail({
    from,
    to: payload.to,
    subject: payload.subject,
    text: payload.text,
    html: payload.html,
  });
}

/** Send any transactional HTML email (welcome, notifications, etc.). */
export async function sendTransactionalEmail(
  payload: TransactionalEmailPayload,
): Promise<SendEmailResult> {
  if (!useRealSmtp()) {
    return logDevEmail(
      payload.to,
      payload.subject,
      "OTP_USE_SMTP=false — email preview in terminal only",
      payload.text.slice(0, 120),
    );
  }

  if (loadNodemailer()) {
    await sendWithNodemailer(payload);
  } else {
    const { sendViaNativeSmtp } = await import("./smtp-native");
    await sendViaNativeSmtp(payload);
  }

  if (process.env.OTP_DEV_LOG === "true") {
    console.log(`[email] sent to ${payload.to}: ${payload.subject}`);
  }

  return { sent: true, devLogged: false };
}

export async function sendOtpEmail(
  to: string,
  code: string,
  kind: import("@/lib/email-templates/otp").OtpEmailKind = "register",
): Promise<SendOtpResult> {
  // Recipient = the address the user typed on the form (never the LMS SMTP mailbox).
  const recipient = to.trim().toLowerCase();
  if (!recipient || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recipient)) {
    throw new Error("OTP recipient email is missing or invalid.");
  }

  const { subject, text, html } = buildOtpEmail({
    code,
    kind,
    appName: emailAppName(),
    appUrl: emailAppUrl(),
    logoSrc: emailLogoSrc(),
  });

  if (!useRealSmtp()) {
    const reason = !smtpConfigured()
      ? "SMTP not configured — set SMTP_HOST / SMTP_USER / SMTP_PASS"
      : "OTP_USE_SMTP=false — email preview in terminal only";
    if (allowDevOtpOnPage()) {
      return logDevOtp(recipient, code, `${reason} | would send TO ${recipient}`);
    }
    const missing = smtpMissingVars();
    const detail =
      missing.length > 0
        ? `Missing in .env.local: ${missing.join(", ")}. Add them, save, and restart npm run dev.`
        : reason;
    console.error(`[email] OTP blocked for ${recipient}: ${detail}`);
    throw new Error(detail);
  }

  if (process.env.OTP_DEV_LOG === "true") {
    console.log(`[email] OTP → TO ${recipient} | FROM ${emailSmtpFromHeader()}`);
  }

  return sendTransactionalEmail({ to: recipient, subject, text, html });
}
