#!/usr/bin/env node
// Fetches one Guesty Booking Engine OAuth2 token and writes it into
// .env.local as GUESTY_BOOKING_ENGINE_ACCESS_TOKEN / _TOKEN_EXPIRES_AT, so
// lib/guesty/auth.ts can reuse it across dev-server restarts instead of
// spending another of the account's 5-tokens/24h budget.
//
// Usage: node scripts/fetch-guesty-token.mjs
// Costs exactly one token — only run this when you actually need a fresh one
// (e.g. the stored one has expired, or was never fetched today).

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const projectRoot = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const envPath = path.join(projectRoot, ".env.local");

function readEnvVar(name) {
  if (!existsSync(envPath)) return undefined;
  const line = readFileSync(envPath, "utf8")
    .split("\n")
    .find((l) => l.startsWith(`${name}=`));
  return line?.slice(name.length + 1);
}

const clientId = readEnvVar("GUESTY_BOOKING_ENGINE_CLIENT_ID");
const clientSecret = readEnvVar("GUESTY_BOOKING_ENGINE_CLIENT_SECRET");

if (!clientId || !clientSecret) {
  console.error("Missing GUESTY_BOOKING_ENGINE_CLIENT_ID/_SECRET in .env.local");
  process.exit(1);
}

const res = await fetch("https://booking.guesty.com/oauth2/token", {
  method: "POST",
  headers: { "Content-Type": "application/x-www-form-urlencoded" },
  body: new URLSearchParams({
    grant_type: "client_credentials",
    scope: "booking_engine:api",
    client_id: clientId,
    client_secret: clientSecret,
  }),
});

if (!res.ok) {
  console.error(`Token request failed (${res.status}): ${await res.text()}`);
  process.exit(1);
}

const data = await res.json();
const expiresAtMs = Date.now() + (data.expires_in - 300) * 1000; // 5min safety margin

let content = existsSync(envPath) ? readFileSync(envPath, "utf8") : "";
content = content
  .split("\n")
  .filter((l) => !l.startsWith("GUESTY_BOOKING_ENGINE_ACCESS_TOKEN=") && !l.startsWith("GUESTY_BOOKING_ENGINE_TOKEN_EXPIRES_AT="))
  .join("\n")
  .trimEnd();

content += `\n\nGUESTY_BOOKING_ENGINE_ACCESS_TOKEN=${data.access_token}\nGUESTY_BOOKING_ENGINE_TOKEN_EXPIRES_AT=${expiresAtMs}\n`;

writeFileSync(envPath, content);
console.log(`Token saved, valid until ${new Date(expiresAtMs).toISOString()}`);
console.log("Restart the dev server to pick it up.");
