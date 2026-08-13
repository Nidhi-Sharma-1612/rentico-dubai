import "server-only";
import { getBookingEngineToken } from "@/lib/guesty/auth";
import { parseDateParam, toDateParam } from "@/lib/calendar";

const BASE_URL = "https://booking.guesty.com/api";

async function request<T>(
  path: string,
  options: { revalidate?: number; method?: "GET" | "POST"; body?: unknown } = {}
): Promise<T> {
  const { revalidate, method = "GET", body } = options;
  const token = await getBookingEngineToken();
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      ...(body !== undefined ? { "Content-Type": "application/json" } : {}),
    },
    ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
    ...(revalidate !== undefined ? { next: { revalidate } } : { cache: "no-store" }),
  });

  if (!res.ok) {
    throw new Error(`Guesty Booking Engine request failed (${res.status}) for ${path}: ${await res.text()}`);
  }

  return res.json() as Promise<T>;
}

const LISTING_FIELDS =
  "_id title address accommodates bedrooms bathrooms beds amenities prices picture pictures publicDescription reviews tags unitTypeHouseRules";

export interface GuestyBEAddress {
  full?: string;
  city?: string;
  country?: string;
  state?: string;
  neighborhood?: string;
  lat?: number;
  lng?: number;
}

export interface GuestyBEPicture {
  original?: string;
  large?: string;
  regular?: string;
  thumbnail?: string;
  caption?: string;
}

export interface GuestyBEListing {
  _id: string;
  title: string;
  address?: GuestyBEAddress;
  accommodates?: number;
  bedrooms?: number;
  bathrooms?: number;
  beds?: number;
  amenities?: string[];
  prices?: {
    basePrice?: number;
    currency?: string;
    cleaningFee?: number;
  };
  picture?: GuestyBEPicture;
  pictures?: GuestyBEPicture[];
  publicDescription?: {
    summary?: string;
    space?: string;
    notes?: string;
  };
  reviews?: { avg?: number; total?: number };
  tags?: string[];
  unitTypeHouseRules?: {
    houseRules?: {
      additionalRules?: string | null;
      petsAllowed?: { enabled?: boolean };
      smokingAllowed?: { enabled?: boolean };
      suitableForEvents?: { enabled?: boolean };
      childrenRules?: { suitableForChildren?: boolean; suitableForInfants?: boolean };
    };
  };
  /** Only present when the list is called with checkIn/checkOut. */
  nightlyRates?: Record<string, number>;
  /** Only present when the list is called with checkIn/checkOut. 1 = available. */
  allotment?: Record<string, number>;
}

interface ListingsListResponse {
  results: GuestyBEListing[];
  pagination: { total: number; cursor?: { next: string | null } };
}

export interface SearchListingsParams {
  checkIn?: string;
  checkOut?: string;
  numberOfBedrooms?: number;
  city?: string;
  limit?: number;
  cursor?: string;
}

const LISTINGS_REVALIDATE_SECONDS = 300;

export async function searchListings(params: SearchListingsParams = {}): Promise<{
  listings: GuestyBEListing[];
  total: number;
}> {
  const query = new URLSearchParams({ fields: LISTING_FIELDS, limit: String(params.limit ?? 50) });
  if (params.checkIn) query.set("checkIn", params.checkIn);
  if (params.checkOut) query.set("checkOut", params.checkOut);
  if (params.numberOfBedrooms) query.set("numberOfBedrooms", String(params.numberOfBedrooms));
  if (params.city) query.set("city", params.city);
  if (params.cursor) query.set("cursor", params.cursor);

  // Date-scoped searches reflect live availability — don't cache those as
  // long as the plain listings list.
  const revalidate = params.checkIn || params.checkOut ? 60 : LISTINGS_REVALIDATE_SECONDS;
  const data = await request<ListingsListResponse>(`/listings?${query.toString()}`, { revalidate });
  return { listings: data.results, total: data.pagination.total };
}

export async function getListing(id: string): Promise<GuestyBEListing> {
  return request<GuestyBEListing>(`/listings/${id}?fields=${encodeURIComponent(LISTING_FIELDS)}`, {
    revalidate: LISTINGS_REVALIDATE_SECONDS,
  });
}

/**
 * Guesty's /listings?checkIn&checkOut filters to listings whose rate plan
 * can support the *entire* span as one continuous stay (subject to each
 * plan's min/maxNights) — confirmed live: fixing checkIn 14 days out and
 * growing checkOut, results held steady through a 45-night span then
 * dropped to zero at 60+ nights. A wide single query (e.g. a 90-day
 * calendar window) silently returns zero listings — which reads as
 * "everything available" rather than the real cause, an invalid query.
 * Splitting into chunks well under any observed maxNights keeps each
 * chunk's query valid; chunks are fetched in parallel and merged.
 */
const AVAILABILITY_CHUNK_DAYS = 14;

function chunkDateRange(checkIn: string, checkOut: string, chunkDays: number): { checkIn: string; checkOut: string }[] {
  const start = parseDateParam(checkIn);
  const end = parseDateParam(checkOut);
  if (!start || !end) return [];

  const chunks: { checkIn: string; checkOut: string }[] = [];
  let cursor = start;
  while (cursor < end) {
    const chunkEnd = new Date(cursor);
    chunkEnd.setDate(chunkEnd.getDate() + chunkDays);
    const boundedEnd = chunkEnd < end ? chunkEnd : end;
    chunks.push({ checkIn: toDateParam(cursor), checkOut: toDateParam(boundedEnd) });
    cursor = boundedEnd;
  }
  return chunks;
}

/**
 * Fetches nightlyRates + allotment for one listing across a date range, for
 * the property page calendar. The /listings search endpoint doesn't support
 * filtering to a single id (`ids` is rejected as an unknown param — verified
 * live), so each chunk fetches a page large enough to be sure `id` is
 * included rather than assuming it's first in Guesty's default ordering.
 */
export async function getListingAvailability(
  id: string,
  checkIn: string,
  checkOut: string
): Promise<Pick<GuestyBEListing, "nightlyRates" | "allotment">> {
  const chunks = chunkDateRange(checkIn, checkOut, AVAILABILITY_CHUNK_DAYS);

  // Sequential, not Promise.all — Guesty's per-second burst limit (5 req/s)
  // is easy to trip when a full window's worth of chunks fire at once.
  const found: (GuestyBEListing | undefined)[] = [];
  for (const chunk of chunks) {
    const query = new URLSearchParams({
      checkIn: chunk.checkIn,
      checkOut: chunk.checkOut,
      limit: "100",
      fields: "_id nightlyRates allotment",
    });
    const data = await request<ListingsListResponse>(`/listings?${query.toString()}`, { revalidate: 60 });
    found.push(data.results.find((l) => l._id === id));
  }

  if (found.every((listing) => !listing)) {
    console.error(`getListingAvailability: listing ${id} not found in any chunk of the requested range`);
  }

  const nightlyRates: Record<string, number> = {};
  const allotment: Record<string, number> = {};
  for (const listing of found) {
    Object.assign(nightlyRates, listing?.nightlyRates);
    Object.assign(allotment, listing?.allotment);
  }
  return { nightlyRates, allotment };
}

/**
 * Dates where every listing in the portfolio is booked out, for the
 * general (not-yet-listing-specific) search widgets on the homepage and
 * Book Your Stay page. Each chunk returns every listing's allotment for
 * that slice, merged across chunks (see chunkDateRange above for why
 * chunking is needed) — a date only counts as unavailable if none of the
 * listings that reported data for it had any allotment left.
 */
export async function getPortfolioAvailability(checkIn: string, checkOut: string): Promise<Set<string>> {
  const chunks = chunkDateRange(checkIn, checkOut, AVAILABILITY_CHUNK_DAYS);

  const available = new Set<string>();
  const seen = new Set<string>();

  // Sequential, not Promise.all — Guesty's per-second burst limit (5 req/s)
  // is easy to trip when a full window's worth of chunks fire at once.
  for (const chunk of chunks) {
    const query = new URLSearchParams({
      checkIn: chunk.checkIn,
      checkOut: chunk.checkOut,
      limit: "100",
      fields: "_id allotment",
    });
    const data = await request<ListingsListResponse>(`/listings?${query.toString()}`, { revalidate: 60 });

    for (const listing of data.results) {
      for (const [date, value] of Object.entries(listing.allotment ?? {})) {
        seen.add(date);
        if (value >= 1) available.add(date);
      }
    }
  }

  return new Set([...seen].filter((date) => !available.has(date)));
}

/**
 * Everything below implements Guesty's documented Stripe Tokenization Flow
 * (https://booking-api-docs.guesty.com/docs/stripe-tokenization-flow):
 *   1. getPaymentProvider — the connected Stripe account for a listing.
 *   2. (client-side) Stripe.js tokenizes the card into a `pm_...` PaymentMethod.
 *   3. createReservationQuote — real price breakdown for the stay.
 *   4. createReservationFromQuote — creates the reservation, passing the
 *      PaymentMethod id as `ccToken`; Guesty charges the card itself via its
 *      connected Stripe account.
 *
 * Endpoint paths are confirmed from Guesty's API reference. The exact shape
 * of nested fields (e.g. which field on a rate plan is its `ratePlanId`)
 * is not fully documented and is written defensively below — verify
 * against a real response and adjust once the account-level token limit
 * clears and the Booking Engine source has been activated in the Guesty
 * dashboard (a prerequisite the docs call out for reservation creation).
 */

export interface GuestyPaymentProvider {
  providerAccountId: string;
  providerType?: string;
  paymentProcessorName?: string;
  status?: string;
}

export async function getPaymentProvider(listingId: string): Promise<GuestyPaymentProvider> {
  return request<GuestyPaymentProvider>(`/listings/${listingId}/payment-provider`, { revalidate: 3600 });
}

export interface GuestyRatePlanDetail {
  _id: string;
  name?: string;
  cancellationPolicy?: string;
  minNights?: number;
  money?: {
    currency?: string;
    /** Already includes fareCleaning — don't add totalFees on top of this when computing a grand total. */
    subTotalPrice?: number;
    totalTaxes?: number;
    totalFees?: number;
    fareAccommodation?: number;
    /** Accommodation fare after any channel promotion (e.g. the "Website" discount) is applied. */
    fareAccommodationAdjusted?: number;
    fareCleaning?: number;
    invoiceItems?: { title?: string; amount?: number; type?: string }[];
  };
}

/** Total discount from any PROMOTION invoice items (e.g. Guesty's "Website" channel discount), as a positive amount. */
export function getDiscount(money: GuestyRatePlanDetail["money"]): { amount: number; percent: number } | undefined {
  const promotions = money?.invoiceItems?.filter((item) => item.type === "PROMOTION") ?? [];
  if (promotions.length === 0) return undefined;

  const amount = Math.abs(promotions.reduce((sum, item) => sum + (item.amount ?? 0), 0));
  if (amount <= 0 || !money?.fareAccommodation) return undefined;

  return { amount, percent: Math.round((amount / money.fareAccommodation) * 100) };
}

/** Per-night breakdown on a quote — minNights/maxNights are set per check-in day, not fixed per listing. */
export interface GuestyRatePlanDay {
  date: string;
  price?: number;
  minNights?: number;
  maxNights?: number;
}

/** Each entry in `rates.ratePlans` wraps the actual rate plan under `.ratePlan`. */
export interface GuestyRatePlan {
  ratePlan: GuestyRatePlanDetail;
  inquiryId?: string;
  days?: GuestyRatePlanDay[];
}

export interface GuestyReservationQuote {
  _id: string;
  createdAt?: string;
  expiresAt?: string;
  rates?: { ratePlans?: GuestyRatePlan[] };
}

export function getRatePlanId(ratePlan: GuestyRatePlan): string | undefined {
  return ratePlan.ratePlan?._id;
}

export interface CreateReservationQuoteParams {
  listingId: string;
  checkInDateLocalized: string;
  checkOutDateLocalized: string;
  guestsCount: number;
}

/**
 * Thrown when Guesty rejects a quote for a specific, structured reason —
 * e.g. `{"error":{"code":"LISTING_IS_NOT_AVAILABLE","data":{"moreDetails":
 * {"notApplicableRatePlans":[{"notApplicable":{"minNights":true,...}}]}}}}`
 * (confirmed live for a too-short stay). `minNightsViolation` lets callers
 * show a specific, actionable message instead of a generic failure.
 */
export class GuestyQuoteError extends Error {
  code?: string;
  minNightsViolation: boolean;

  constructor(message: string, code?: string, minNightsViolation = false) {
    super(message);
    this.name = "GuestyQuoteError";
    this.code = code;
    this.minNightsViolation = minNightsViolation;
  }
}

interface GuestyQuoteErrorBody {
  error?: {
    code?: string;
    data?: { moreDetails?: { notApplicableRatePlans?: { notApplicable?: Record<string, boolean> }[] } };
  };
}

export async function createReservationQuote(
  params: CreateReservationQuoteParams
): Promise<GuestyReservationQuote> {
  try {
    return await request<GuestyReservationQuote>("/reservations/quotes", { method: "POST", body: params });
  } catch (err) {
    if (!(err instanceof Error)) throw err;

    const jsonStart = err.message.indexOf("{");
    if (jsonStart === -1) throw err;

    let parsed: GuestyQuoteErrorBody;
    try {
      parsed = JSON.parse(err.message.slice(jsonStart));
    } catch {
      throw err;
    }

    const notApplicable = parsed.error?.data?.moreDetails?.notApplicableRatePlans;
    const minNightsViolation = Boolean(notApplicable?.some((p) => p.notApplicable?.minNights));
    throw new GuestyQuoteError(err.message, parsed.error?.code, minNightsViolation);
  }
}

export interface CreateReservationParams {
  quoteId: string;
  ratePlanId: string;
  guest: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
  };
  /** Stripe PaymentMethod id (`pm_...`) from the client-side tokenization step. */
  ccToken: string;
  policy: {
    termsAndConditions: { isAccepted: boolean };
    privacy: { isAccepted: boolean };
  };
}

export interface GuestyReservation {
  _id: string;
  status?: string;
  platform?: string;
  createdAt?: string;
  guestId?: string;
  money?: { payments?: unknown[] };
}

/**
 * Request-to-book only — Guesty reviews and approves manually, so it
 * doesn't need the charge-validated flow below. For actual instant
 * bookings, use createInstantChargeReservation instead: a probe with a
 * deliberately invalid Stripe token against the plain /instant endpoint
 * still came back `status: "confirmed"`, i.e. that endpoint doesn't
 * synchronously validate payment before confirming.
 */
export async function createReservationFromQuote(params: CreateReservationParams): Promise<GuestyReservation> {
  const { quoteId, ...body } = params;
  return request<GuestyReservation>(`/reservations/quotes/${quoteId}/inquiry`, {
    method: "POST",
    body,
  });
}

export interface CreateInstantChargeParams {
  quoteId: string;
  ratePlanId: string;
  guest: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
  };
  /** Stripe ConfirmationToken id (`ctoken_...`) from `stripe.createConfirmationToken()`. */
  confirmationToken: string;
  policy: {
    termsAndConditions: { isAccepted: boolean };
    privacy: { isAccepted: boolean };
  };
}

export interface GuestyChargeResult {
  reservation: GuestyReservation;
  payment?: {
    _id: string;
    status?: string;
    amount?: number;
    currency?: string;
    error?: string;
    processorError?: { code?: string; message?: string };
  };
  threeDSChallenge?: unknown;
}

/**
 * The charge-validated instant-booking endpoint — attempts the charge
 * *before* confirming the reservation, so a failed card produces an error
 * instead of a confirmed-but-unpaid booking. `payment.status ===
 * "PENDING_AUTH"` means the card needs 3D Secure; completing that (via
 * Stripe.js + POST /reservations/{id}/verify-payment) isn't implemented
 * here yet — Guesty's public docs don't cover the client-side steps for a
 * direct (non-GuestyPay-Protect) Stripe account, so callers should treat
 * PENDING_AUTH as "can't complete online yet" rather than guessing at it.
 */
export async function createInstantChargeReservation(params: CreateInstantChargeParams): Promise<GuestyChargeResult> {
  const { quoteId, ...body } = params;
  return request<GuestyChargeResult>(`/reservations/quotes/${quoteId}/instant-charge`, {
    method: "POST",
    body,
  });
}

