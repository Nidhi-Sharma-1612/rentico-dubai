import "server-only";
import { getOpenApiToken } from "@/lib/guesty/auth";

const BASE_URL = "https://open-api.guesty.com/v1";

async function request<T>(path: string, revalidate?: number): Promise<T> {
  const token = await getOpenApiToken();
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { Authorization: `Bearer ${token}` },
    ...(revalidate !== undefined ? { next: { revalidate } } : { cache: "no-store" }),
  });

  if (!res.ok) {
    throw new Error(`Guesty Open API request failed (${res.status}) for ${path}: ${await res.text()}`);
  }

  return res.json() as Promise<T>;
}

export interface GuestyAddress {
  full?: string;
  street?: string;
  city?: string;
  country?: string;
  lat?: number;
  lng?: number;
}

export interface GuestyPicture {
  original?: string;
  large?: string;
  regular?: string;
  thumbnail?: string;
  caption?: string;
}

export interface GuestyListing {
  _id: string;
  nickname?: string;
  title?: string;
  active?: boolean;
  bedrooms?: number;
  bathrooms?: number;
  accommodates?: number;
  address?: GuestyAddress;
  publishedAddress?: GuestyAddress;
  picture?: GuestyPicture;
  pictures?: GuestyPicture[];
  amenities?: string[];
  prices?: {
    basePrice?: number;
    currency?: string;
  };
  publicDescription?: {
    summary?: string;
    space?: string;
    notes?: string;
    houseRules?: string;
  };
  terms?: {
    minNights?: number;
    maxNights?: number;
  };
}

interface ListListingsResponse {
  results: GuestyListing[];
  count: number;
}

export interface ListListingsParams {
  active?: boolean;
  limit?: number;
  skip?: number;
  city?: string;
  available?: { checkIn: string; checkOut: string; minOccupancy?: number };
  ids?: string[];
}

function buildQuery(params: ListListingsParams): string {
  const query = new URLSearchParams();
  if (params.active !== undefined) query.set("active", String(params.active));
  if (params.limit !== undefined) query.set("limit", String(params.limit));
  if (params.skip !== undefined) query.set("skip", String(params.skip));
  if (params.city) query.set("city", params.city);
  if (params.ids?.length) query.set("ids", params.ids.join(","));
  if (params.available) query.set("available", JSON.stringify(params.available));
  return query.toString();
}

/** Cache listings briefly — real-time freshness isn't critical for marketing pages, but a stale multi-hour cache would be. */
const LISTINGS_REVALIDATE_SECONDS = 300;

export async function listListings(params: ListListingsParams = {}): Promise<GuestyListing[]> {
  const query = buildQuery({ active: true, limit: 100, ...params });
  const data = await request<ListListingsResponse>(`/listings?${query}`, LISTINGS_REVALIDATE_SECONDS);
  return data.results;
}

export async function getListing(id: string): Promise<GuestyListing> {
  return request<GuestyListing>(`/listings/${id}`, LISTINGS_REVALIDATE_SECONDS);
}

export interface GuestyCalendarDay {
  date: string;
  status: "available" | "unavailable" | "booked" | "reserved";
  price?: number;
  currency?: string;
  minNights?: number;
}

interface CalendarResponse {
  data: {
    days: GuestyCalendarDay[];
  };
}

export async function getListingCalendar(
  listingId: string,
  startDate: string,
  endDate: string
): Promise<GuestyCalendarDay[]> {
  const data = await request<CalendarResponse>(
    `/availability-pricing/api/calendar/listings/${listingId}?startDate=${startDate}&endDate=${endDate}`,
    60
  );
  return data.data.days;
}

/**
 * Review field names beyond the basics aren't fully documented — verified
 * empirically against a real account; adjust here if Guesty's actual
 * response shape differs once inspected.
 */
export interface GuestyReview {
  _id: string;
  listingId?: string;
  rating?: { overall?: number } | number;
  content?: string;
  publicReview?: string;
  reviewerName?: string;
  guestName?: string;
  createdAt?: string;
}

interface ReviewsResponse {
  data: GuestyReview[];
  skip: number;
  limit: number;
}

export async function getListingReviews(listingId: string): Promise<GuestyReview[]> {
  const data = await request<ReviewsResponse>(`/reviews?listingId=${listingId}&limit=50`, LISTINGS_REVALIDATE_SECONDS);
  return data.data;
}

export interface GuestyPaymentProvider {
  paymentProviderId: string;
  paymentProcessorName?: string;
  status?: string;
}

export async function getPaymentProviderForListing(listingId: string): Promise<GuestyPaymentProvider> {
  return request<GuestyPaymentProvider>(`/payment-providers/provider-by-listing?listingId=${listingId}`, 3600);
}

export interface GuestySupportedAmenity {
  name: string;
  group?: string;
}

export async function getSupportedAmenities(): Promise<GuestySupportedAmenity[]> {
  return request<GuestySupportedAmenity[]>(`/properties-api/amenities/supported`, 86400);
}
