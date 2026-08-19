import "server-only";
import { db } from "@/lib/db";
import { guestyTokens } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

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
 * Guesty caps token generation at 5 per 24h per client ID. An in-memory-only
 * cache doesn't survive a process restart — and some hosts restart the
 * Node process far more often than that budget can absorb (observed on
 * Hostinger: every few seconds under some configurations), which burns the
 * whole daily quota almost immediately. Two layers:
 *  - `tokenCache` (this module, stashed on `globalThis` to survive dev's
 *    hot-reload re-evaluation) is the fast path within a single process.
 *  - The `guesty_tokens` table is the durable layer that survives restarts
 *    and is shared across every process/replica, since they all read the
 *    same database.
 */
const globalForGuesty = globalThis as unknown as {
  __guestyTokenCache?: Map<string, CachedToken>;
};
const tokenCache = globalForGuesty.__guestyTokenCache ?? new Map<string, CachedToken>();
globalForGuesty.__guestyTokenCache = tokenCache;

async function readDbToken(cacheKey: string): Promise<CachedToken | null> {
  try {
    const [row] = await db
      .select({ accessToken: guestyTokens.accessToken, expiresAt: guestyTokens.expiresAt })
      .from(guestyTokens)
      .where(eq(guestyTokens.cacheKey, cacheKey))
      .limit(1);
    return row ?? null;
  } catch (err) {
    console.error(`Failed to read cached Guesty token for "${cacheKey}":`, err);
    return null;
  }
}

async function writeDbToken(cacheKey: string, token: CachedToken): Promise<void> {
  try {
    await db
      .insert(guestyTokens)
      .values({ cacheKey, accessToken: token.accessToken, expiresAt: token.expiresAt, updatedAt: new Date() })
      .onConflictDoUpdate({
        target: guestyTokens.cacheKey,
        set: { accessToken: token.accessToken, expiresAt: token.expiresAt, updatedAt: new Date() },
      });
  } catch (err) {
    // Best-effort — worse case is one extra token fetch on the next restart,
    // never something that should break the actual Guesty request in flight.
    console.error(`Failed to persist Guesty token for "${cacheKey}":`, err);
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

  // Cold in-memory cache (first request after a restart) — check the DB
  // before spending one of Guesty's 5 daily token requests.
  if (!cached) {
    const dbToken = await readDbToken(cacheKey);
    if (dbToken && dbToken.expiresAt > Date.now()) {
      cached = dbToken;
      tokenCache.set(cacheKey, cached);
    }
  }

  if (cached && cached.expiresAt > Date.now()) {
    return cached.accessToken;
  }

  const token = await fetchToken(tokenUrl, clientId, clientSecret, scope);
  tokenCache.set(cacheKey, token);
  await writeDbToken(cacheKey, token);
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
