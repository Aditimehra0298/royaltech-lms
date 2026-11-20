import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();

const contentPath = join(root, "data", "admin-content.json");
const data = JSON.parse(readFileSync(contentPath, "utf8"));
for (const c of data.categories || []) {
  if (c.tone === "violet") c.tone = "blue";
}
writeFileSync(contentPath, JSON.stringify(data, null, 2) + "\n");
console.log(data.categories.map((c) => `${c.slug}:${c.tone}`).join(", "));

const cssPath = join(root, "app", "globals.css");
let css = readFileSync(cssPath, "utf8");
const before = css;
css = css
  .split("rgba(139, 92, 246,")
  .join("rgba(0, 183, 253,")
  .split("rgba(139,92,246,")
  .join("rgba(0,183,253,")
  .split("rgba(99, 102, 241,")
  .join("rgba(14, 165, 233,")
  .split("rgba(217, 70, 239,")
  .join("rgba(20, 184, 166,")
  .split("#6d28d9")
  .join("#0891b2")
  .split("#4338ca")
  .join("#0284c7")
  .split("#a21caf")
  .join("#0d9488")
  .split(".text-violet-300")
  .join(".text-cyan-300")
  .split(".text-violet-200")
  .join(".text-cyan-200")
  .split(".text-violet-100")
  .join(".text-cyan-100")
  .split(".bg-violet-500\\/20")
  .join(".bg-cyan-500\\/20")
  .split(".text-indigo-300")
  .join(".text-sky-300")
  .split(".bg-indigo-500\\/20")
  .join(".bg-sky-500\\/20")
  .split(".text-fuchsia-300")
  .join(".text-teal-300")
  .split(".bg-fuchsia-500\\/20")
  .join(".bg-teal-500\\/20")
  .split("about-mission-badge-violet")
  .join("about-mission-badge-cyan")
  .split('[class*="bg-violet-6"]')
  .join('[class*="bg-cyan-6"]');

if (css !== before) {
  writeFileSync(cssPath, css);
  console.log("globals.css updated");
} else {
  console.log("globals.css unchanged");
}
