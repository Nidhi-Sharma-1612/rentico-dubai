import "server-only";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

interface TokenResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
}

interface CachedToken {
  accessToken: string;
  expiresAt: number;
}

/**
 * Guesty caps token generation at 5 per 24h per client ID. A plain
 * module-level cache doesn't actually survive dev: Turbopack/webpack fast
 * refresh re-evaluates this module on every hot reload, which would
 * silently reset a `new Map()` here and burn a fresh token on the next
 * request after almost every file save. Stashing it on `globalThis`
 * (same trick used for Prisma-style singletons) survives HMR, so the
 * cache only resets on an actual process restart.
 */
const globalForGuesty = globalThis as unknown as {
  __guestyTokenCache?: Map<string, CachedToken>;
};
const tokenCache = globalForGuesty.__guestyTokenCache ?? new Map<string, CachedToken>();
globalForGuesty.__guestyTokenCache = tokenCache;

const ENV_KEYS: Record<string, { token: string; expiresAt: string }> = {
  "open-api": {
    token: "GUESTY_OPEN_API_ACCESS_TOKEN",
    expiresAt: "GUESTY_OPEN_API_TOKEN_EXPIRES_AT",
  },
  "booking-engine": {
    token: "GUESTY_BOOKING_ENGINE_ACCESS_TOKEN",
    expiresAt: "GUESTY_BOOKING_ENGINE_TOKEN_EXPIRES_AT",
  },
};

function readEnvSeed(cacheKey: string): { accessToken?: string; expiresAt?: string } {
  const keys = ENV_KEYS[cacheKey];
  if (!keys) return {};
  return { accessToken: process.env[keys.token], expiresAt: process.env[keys.expiresAt] };
}

/**
 * Persists a freshly fetched token to .env.local so it also survives a full
 * dev-server restart, not just hot reloads — the next `next dev` boot reads
 * it back as a seed instead of spending another of the 5-tokens/24h budget.
 * Dev-only and best-effort: a write failure (e.g. read-only fs in some
 * deploy preview) must never break the actual Guesty request.
 */
function persistTokenToEnvLocal(cacheKey: string, token: CachedToken) {
  if (process.env.NODE_ENV !== "development") return;
  const keys = ENV_KEYS[cacheKey];
  if (!keys) return;

  try {
    const envPath = path.join(process.cwd(), ".env.local");
    let content = existsSync(envPath) ? readFileSync(envPath, "utf8") : "";
    content = content
      .split("\n")
      .filter((l) => !l.startsWith(`${keys.token}=`) && !l.startsWith(`${keys.expiresAt}=`))
      .join("\n")
      .trimEnd();
    content += `\n\n${keys.token}=${token.accessToken}\n${keys.expiresAt}=${token.expiresAt}\n`;
    writeFileSync(envPath, content);
  } catch {
    // best-effort only — worst case is one extra token fetch later
  }
}

async function fetchToken(
  tokenUrl: string,
  clientId: string,
  clientSecret: string,
  scope: string
): Promise<CachedToken> {
  const res = await fetch(tokenUrl, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      scope,
      client_id: clientId,
      client_secret: clientSecret,
    }),
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Guesty token request failed (${res.status}): ${await res.text()}`);
  }

  const data = (await res.json()) as TokenResponse;
  return {
    accessToken: data.access_token,
    expiresAt: Date.now() + (data.expires_in - 60) * 1000,
  };
}

async function getToken(
  cacheKey: string,
  tokenUrl: string,
  clientId: string | undefined,
  clientSecret: string | undefined,
  scope: string
): Promise<string> {
  if (!clientId || !clientSecret) {
    throw new Error(`Missing Guesty credentials for "${cacheKey}" — check .env.local`);
  }

  let cached = tokenCache.get(cacheKey);

  // Seed from a pre-fetched token in .env.local if the in-memory cache is
  // cold (first request after a process restart) and the seed hasn't expired.
  if (!cached) {
    const seed = readEnvSeed(cacheKey);
    if (seed.accessToken && seed.expiresAt) {
      const expiresAt = Number(seed.expiresAt);
      if (Number.isFinite(expiresAt) && expiresAt > Date.now()) {
        cached = { accessToken: seed.accessToken, expiresAt };
        tokenCache.set(cacheKey, cached);
      }
    }
  }

  if (cached && cached.expiresAt > Date.now()) {
    return cached.accessToken;
  }

  const token = await fetchToken(tokenUrl, clientId, clientSecret, scope);
  tokenCache.set(cacheKey, token);
  persistTokenToEnvLocal(cacheKey, token);
  return token.accessToken;
}

export function getOpenApiToken(): Promise<string> {
  return getToken(
    "open-api",
    "https://open-api.guesty.com/oauth2/token",
    process.env.GUESTY_OPEN_API_CLIENT_ID,
    process.env.GUESTY_OPEN_API_CLIENT_SECRET,
    "open-api"
  );
}

export function getBookingEngineToken(): Promise<string> {
  return getToken(
    "booking-engine",
    "https://booking.guesty.com/oauth2/token",
    process.env.GUESTY_BOOKING_ENGINE_CLIENT_ID,
    process.env.GUESTY_BOOKING_ENGINE_CLIENT_SECRET,
    "booking_engine:api"
  );
}
