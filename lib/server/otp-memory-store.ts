/**
 * In-memory OTP store for local/dev when MySQL is unavailable (SKIP_MYSQL).
 * Not for multi-instance production.
 */

import type { OtpPurpose } from "@/lib/email-otp";

export type MemoryOtpRecord = {
  id: string;
  email: string;
  purpose: OtpPurpose;
  codeHash: string;
  expiresAt: Date;
  createdAt: Date;
  verifiedAt: Date | null;
  attemptCount: number;
};

const globalStore = globalThis as unknown as {
  __rtiOtpMemory?: Map<string, MemoryOtpRecord>;
};

function store(): Map<string, MemoryOtpRecord> {
  if (!globalStore.__rtiOtpMemory) globalStore.__rtiOtpMemory = new Map();
  return globalStore.__rtiOtpMemory;
}

function key(email: string, purpose: OtpPurpose): string {
  return `${purpose}:${email.trim().toLowerCase()}`;
}

function newId(): string {
  return `mem_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

export function memoryCountRecentSends(
  email: string,
  purpose: OtpPurpose,
  since: Date,
): number {
  const row = store().get(key(email, purpose));
  if (!row) return 0;
  return row.createdAt >= since ? 1 : 0;
}

export function memoryInvalidateOpenCodes(email: string, purpose: OtpPurpose): void {
  const k = key(email, purpose);
  const row = store().get(k);
  if (!row || row.verifiedAt) return;
  store().set(k, { ...row, expiresAt: new Date() });
}

export function memoryCreateOtp(input: {
  email: string;
  purpose: OtpPurpose;
  codeHash: string;
  expiresAt: Date;
}): MemoryOtpRecord {
  const row: MemoryOtpRecord = {
    id: newId(),
    email: input.email.trim().toLowerCase(),
    purpose: input.purpose,
    codeHash: input.codeHash,
    expiresAt: input.expiresAt,
    createdAt: new Date(),
    verifiedAt: null,
    attemptCount: 0,
  };
  store().set(key(row.email, row.purpose), row);
  return row;
}

export function memoryFindActiveOtp(
  email: string,
  purpose: OtpPurpose,
  now = new Date(),
): MemoryOtpRecord | null {
  const row = store().get(key(email, purpose));
  if (!row || row.verifiedAt || row.expiresAt <= now) return null;
  return row;
}

export function memoryUpdateOtp(
  email: string,
  purpose: OtpPurpose,
  patch: Partial<Pick<MemoryOtpRecord, "attemptCount" | "verifiedAt" | "expiresAt">>,
): MemoryOtpRecord | null {
  const k = key(email, purpose);
  const row = store().get(k);
  if (!row) return null;
  const next = { ...row, ...patch };
  store().set(k, next);
  return next;
}

export function memoryHasRecentVerification(
  email: string,
  purpose: OtpPurpose,
  since: Date,
): boolean {
  const row = store().get(key(email, purpose));
  return Boolean(row?.verifiedAt && row.verifiedAt >= since);
}
