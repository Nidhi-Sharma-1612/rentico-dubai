import "server-only";

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
 * Guesty caps token generation at 5 per 24h per client ID, so this cache
 * must survive across requests within the process — never fetch a fresh
 * token per call. Refreshed 60s before actual expiry as a safety margin.
 * Note: this in-memory cache resets on cold start in a serverless
 * deployment; if that becomes an issue, back it with a shared store.
 */
const tokenCache = new Map<string, CachedToken>();

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
  scope: string,
  seed?: { accessToken: string | undefined; expiresAt: string | undefined }
): Promise<string> {
  if (!clientId || !clientSecret) {
    throw new Error(`Missing Guesty credentials for "${cacheKey}" — check .env.local`);
  }

  let cached = tokenCache.get(cacheKey);

  // Seed the in-memory cache from a pre-fetched token in .env.local, if one
  // is present and still valid. Lets a token survive a dev-server restart
  // (e.g. to pick up an unrelated env change mid-demo) without spending
  // another of the 5-tokens/24h budget — see scripts/fetch-guesty-token.mjs.
  if (!cached && seed?.accessToken && seed.expiresAt) {
    const expiresAt = Number(seed.expiresAt);
    if (Number.isFinite(expiresAt) && expiresAt > Date.now()) {
      cached = { accessToken: seed.accessToken, expiresAt };
      tokenCache.set(cacheKey, cached);
    }
  }

  if (cached && cached.expiresAt > Date.now()) {
    return cached.accessToken;
  }

  const token = await fetchToken(tokenUrl, clientId, clientSecret, scope);
  tokenCache.set(cacheKey, token);
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
    "booking_engine:api",
    {
      accessToken: process.env.GUESTY_BOOKING_ENGINE_ACCESS_TOKEN,
      expiresAt: process.env.GUESTY_BOOKING_ENGINE_TOKEN_EXPIRES_AT,
    }
  );
}
