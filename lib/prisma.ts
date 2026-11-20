import { PrismaClient } from "@prisma/client";

/** Bump when Prisma schema changes so dev HMR does not keep a stale client. */
const PRISMA_CLIENT_KEY = "prisma-v6-lms-course-content-v2";

const globalForPrisma = globalThis as unknown as {
  [key: string]: PrismaClient | undefined;
};

function createPrisma(): PrismaClient {
  // Avoid noisy Prisma engine logs when MySQL is intentionally offline (JSON catalog mode).
  const quiet = process.env.SKIP_MYSQL === "1" || process.env.SKIP_MYSQL === "true";
  return new PrismaClient({
    log: quiet ? [] : process.env.NODE_ENV === "development" ? ["warn"] : ["error"],
  });
}

export const prisma = globalForPrisma[PRISMA_CLIENT_KEY] ?? createPrisma();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma[PRISMA_CLIENT_KEY] = prisma;
}
