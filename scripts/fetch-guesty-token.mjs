#!/usr/bin/env node
// Fetches a Guesty OAuth2 token and writes it into .env.local, so
// lib/guesty/auth.ts can reuse it across dev-server restarts instead of
// spending another of the account's 5-tokens/24h budget. The running dev
// server now does this automatically on every fresh fetch (see auth.ts's
// persistTokenToEnvLocal) — this script is only needed to bootstrap a token
// *before* the dev server has ever run, or to force one API's token to
// refresh independently of the other.
//
// Usage: node scripts/fetch-guesty-token.mjs [open-api|booking-engine]
// Defaults to booking-engine. Costs exactly one token — only run this when
// you actually need a fresh one.

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const projectRoot = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const envPath = path.join(projectRoot, ".env.local");

const TARGETS = {
  "open-api": {
    tokenUrl: "https://open-api.guesty.com/oauth2/token",
    scope: "open-api",
    clientIdKey: "GUESTY_OPEN_API_CLIENT_ID",
    clientSecretKey: "GUESTY_OPEN_API_CLIENT_SECRET",
    accessTokenKey: "GUESTY_OPEN_API_ACCESS_TOKEN",
    expiresAtKey: "GUESTY_OPEN_API_TOKEN_EXPIRES_AT",
  },
  "booking-engine": {
    tokenUrl: "https://booking.guesty.com/oauth2/token",
    scope: "booking_engine:api",
    clientIdKey: "GUESTY_BOOKING_ENGINE_CLIENT_ID",
    clientSecretKey: "GUESTY_BOOKING_ENGINE_CLIENT_SECRET",
    accessTokenKey: "GUESTY_BOOKING_ENGINE_ACCESS_TOKEN",
    expiresAtKey: "GUESTY_BOOKING_ENGINE_TOKEN_EXPIRES_AT",
  },
};

const target = TARGETS[process.argv[2] ?? "booking-engine"];
if (!target) {
  console.error(`Unknown target. Usage: node scripts/fetch-guesty-token.mjs [${Object.keys(TARGETS).join("|")}]`);
  process.exit(1);
}

function readEnvVar(name) {
  if (!existsSync(envPath)) return undefined;
  const line = readFileSync(envPath, "utf8")
    .split("\n")
    .find((l) => l.startsWith(`${name}=`));
  return line?.slice(name.length + 1);
}

const clientId = readEnvVar(target.clientIdKey);
const clientSecret = readEnvVar(target.clientSecretKey);

if (!clientId || !clientSecret) {
  console.error(`Missing ${target.clientIdKey}/${target.clientSecretKey} in .env.local`);
  process.exit(1);
}

const res = await fetch(target.tokenUrl, {
  method: "POST",
  headers: { "Content-Type": "application/x-www-form-urlencoded" },
  body: new URLSearchParams({
    grant_type: "client_credentials",
    scope: target.scope,
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
  .filter((l) => !l.startsWith(`${target.accessTokenKey}=`) && !l.startsWith(`${target.expiresAtKey}=`))
  .join("\n")
  .trimEnd();

content += `\n\n${target.accessTokenKey}=${data.access_token}\n${target.expiresAtKey}=${expiresAtMs}\n`;

writeFileSync(envPath, content);
console.log(`Token saved, valid until ${new Date(expiresAtMs).toISOString()}`);
console.log("Restart the dev server to pick it up.");
