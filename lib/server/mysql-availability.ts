/**
 * When local MySQL is down (common in this repo), skip Prisma catalog reads
 * so the LMS can run from `data/admin-content.json` without console overlays.
 */

const RETRY_MS = 30_000;

let unreachableUntil = 0;
let warnedOnce = false;

export function isMysqlSkipped(): boolean {
  if (process.env.SKIP_MYSQL === "1" || process.env.SKIP_MYSQL === "true") return true;
  return Date.now() < unreachableUntil;
}

export function markMysqlUnreachable(err?: unknown): void {
  unreachableUntil = Date.now() + RETRY_MS;
  if (warnedOnce) return;
  warnedOnce = true;
  const detail =
    err instanceof Error ? err.message.split("\n").find((l) => l.trim()) || err.message : "";
  console.warn(
    `[mysql] Database unreachable — using JSON catalog only.${detail ? ` (${detail.slice(0, 120)})` : ""} Set SKIP_MYSQL=true to silence retries.`,
  );
}

export function markMysqlReachable(): void {
  unreachableUntil = 0;
}

export function isMysqlConnectionError(err: unknown): boolean {
  const msg = err instanceof Error ? err.message : String(err ?? "");
  const name = err instanceof Error ? err.name : "";
  return (
    name.includes("PrismaClientInitializationError") ||
    /Can't reach database server/i.test(msg) ||
    /P1001|ECONNREFUSED|connect ETIMEDOUT/i.test(msg)
  );
}
