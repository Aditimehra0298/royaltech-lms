import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const dir = join(process.cwd(), "public", "inspired");
const colors = {
  "coursera.svg": "#0056D2",
  "udemy.svg": "#A435F0",
  "edx.svg": "#D32F2F",
  "linkedin.svg": "#0A66C2",
  "google.svg": "#4285F4",
  "microsoft.svg": "#00A4EF",
  "amazonwebservices.svg": "#FF9900",
  "ibm.svg": "#054ADA",
  "skillshare.svg": "#00FF84",
  "khanacademy.svg": "#14BF96",
};

for (const [file, color] of Object.entries(colors)) {
  const p = join(dir, file);
  if (!existsSync(p)) continue;
  let s = readFileSync(p, "utf8");
  s = s.replace(/fill="[^"]*"/g, "");
  s = s.replace("<svg ", `<svg fill="${color}" `);
  s = s.replace(/<path /g, `<path fill="${color}" `);
  writeFileSync(p, s);
  console.log("colored", file);
}
