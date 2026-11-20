import { readFileSync } from "node:fs";

const t = readFileSync(".env.local", "utf8");
function g(k) {
  const m = t.match(new RegExp(`^${k}=(.*)$`, "m"));
  if (!m) return "";
  return m[1].trim().replace(/^["']+|["']+$/g, "");
}

const pass = g("SMTP_PASS").replace(/\s/g, "");
console.log("OTP_USE_SMTP=", g("OTP_USE_SMTP") || "EMPTY");
console.log("SMTP_HOST=", g("SMTP_HOST") || "EMPTY");
console.log("SMTP_USER=", g("SMTP_USER") || "EMPTY");
console.log(
  "SMTP_PASS=",
  pass ? (pass.length >= 16 ? "SET_OK" : `SET_BUT_SHORT_${pass.length}`) : "EMPTY",
);
