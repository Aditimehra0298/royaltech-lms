/**
 * Runs after `npm install`.
 * Uses --use-system-ca only when the running Node supports it (Node 22+).
 * Railway/Node 20 must not pass that flag or install/build fails.
 */
import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const node = process.execPath;

function supportsUseSystemCa() {
  const probe = spawnSync(node, ["--use-system-ca", "-e", "process.exit(0)"], {
    stdio: "ignore",
  });
  return probe.status === 0;
}

const useSystemCa = supportsUseSystemCa();
const nodeArgsPrefix = useSystemCa ? ["--use-system-ca"] : [];

function withOptionalSystemCaEnv() {
  const env = { ...process.env };
  if (!useSystemCa) return env;
  const cur = (env.NODE_OPTIONS ?? "").trim();
  if (!cur.includes("--use-system-ca")) {
    env.NODE_OPTIONS = cur ? `${cur} --use-system-ca` : "--use-system-ca";
  }
  return env;
}

const env = withOptionalSystemCaEnv();

const nanoid = spawnSync(node, [...nodeArgsPrefix, "scripts/ensure-nanoid-non-secure.mjs"], {
  cwd: root,
  env,
  stdio: "inherit",
  shell: false,
});
if (nanoid.status !== 0) process.exit(nanoid.status ?? 1);

const prismaCli = path.join(root, "node_modules", "prisma", "build", "index.js");
if (!existsSync(prismaCli)) {
  console.warn("[postinstall] prisma CLI missing; skip prisma generate.");
  process.exit(0);
}

const prisma = spawnSync(node, [...nodeArgsPrefix, prismaCli, "generate"], {
  cwd: root,
  env,
  stdio: "inherit",
  shell: false,
});
process.exit(prisma.status ?? 1);
