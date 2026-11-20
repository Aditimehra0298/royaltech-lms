/** Brand + URL settings shared by welcome, OTP, and other transactional emails. */

import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

/** Official wordmark — hosted on Cloudinary (works in Gmail/Outlook). */
export const DEFAULT_EMAIL_LOGO_URL =
  "https://res.cloudinary.com/dwnnakrrh/image/upload/v1780117597/SF-WHITE-LOGO_elrbzm.png";

/** OTP / transactional emails always brand as Royal Tech Innovation. */
export const DEFAULT_EMAIL_APP_NAME = "Royal Tech Innovation";

export const DEFAULT_EMAIL_TAGLINE =
  "Learn without limits. Build skills that move careers forward.";

export function emailAppName(): string {
  // Brand is fixed — do not allow other product names on OTP / mail.
  return DEFAULT_EMAIL_APP_NAME;
}

/** Short brand for subject lines. */
export function emailShortBrand(): string {
  return "Royal Tech Innovation";
}

/**
 * SMTP From header. Display name is always Royal Tech Innovation.
 * Address comes from SMTP_USER (Gmail requires the authenticated mailbox).
 */
export function emailSmtpFromHeader(): string {
  const user = process.env.SMTP_USER?.trim() || "noreply@royaltechinnovation.com";
  const explicit = process.env.SMTP_FROM?.trim();
  if (explicit) {
    const angle = explicit.match(/<([^>]+)>/);
    const addr = (angle?.[1] || explicit).trim() || user;
    return `${DEFAULT_EMAIL_APP_NAME} <${addr}>`;
  }
  return `${DEFAULT_EMAIL_APP_NAME} <${user}>`;
}

export function emailTagline(): string {
  return process.env.MAIL_TAGLINE?.trim() || DEFAULT_EMAIL_TAGLINE;
}

export function emailAppUrl(): string {
  return (
    process.env.NEXT_PUBLIC_APP_URL?.trim() ||
    process.env.APP_URL?.trim() ||
    "http://localhost:3000"
  );
}

function mimeForImagePath(filePath: string): string {
  const lower = filePath.toLowerCase();
  if (lower.endsWith(".jpg") || lower.endsWith(".jpeg")) return "image/jpeg";
  if (lower.endsWith(".webp")) return "image/webp";
  if (lower.endsWith(".gif")) return "image/gif";
  return "image/png";
}

function readLogoDataUriFromDisk(): string | undefined {
  const customFile = process.env.MAIL_LOGO_FILE?.trim();
  const candidates = [
    customFile,
    join(process.cwd(), "public", "logo-mark.jpg"),
    join(process.cwd(), "public", "logo-mark.png"),
    join(process.cwd(), "public", "SF-WHITE-LOGO.png"),
    join(process.cwd(), "public", "email", "sft-logo.png"),
    join(process.cwd(), "logo-mark.jpg"),
    join(process.cwd(), "SF-WHITE-LOGO.png"),
  ].filter((p): p is string => Boolean(p));

  for (const file of candidates) {
    if (!existsSync(file)) continue;
    try {
      const buf = readFileSync(file);
      return `data:${mimeForImagePath(file)};base64,${buf.toString("base64")}`;
    } catch {
      continue;
    }
  }
  return undefined;
}

/** Absolute logo URL fallback when embedded logo is unavailable. */
export function emailLogoUrl(): string | undefined {
  const explicit = process.env.MAIL_LOGO_URL?.trim();
  if (explicit) return explicit;
  return DEFAULT_EMAIL_LOGO_URL;
}

/**
 * Logo for email HTML — prefers public HTTPS Cloudinary wordmark (Gmail-safe),
 * then optional embedded file override.
 */
export function emailLogoSrc(): string | undefined {
  const embedded = process.env.MAIL_LOGO_DATA_URI?.trim();
  if (embedded) return embedded;

  const url = process.env.MAIL_LOGO_URL?.trim() || DEFAULT_EMAIL_LOGO_URL;
  if (url.startsWith("https://")) return url;

  const fromDisk = readLogoDataUriFromDisk();
  if (fromDisk) return fromDisk;

  if (url) return url;

  const base = emailAppUrl().replace(/\/$/, "");
  const path = process.env.MAIL_LOGO_PATH?.trim() || "/logo-mark.png";
  return path.startsWith("/") ? `${base}${path}` : `${base}/${path}`;
}
