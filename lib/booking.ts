import { isDateUnavailable, parseDateParam, toDateParam } from "@/lib/calendar";
import { Property } from "@/lib/types";

/**
 * The canonical shape of a "stay search" — destination, dates and party
 * size. This is intentionally the *only* thing passed between the
 * homepage search widget, the Book Your Stay results page and a
 * property's own booking sidebar, carried as URL search params rather
 * than client-side state.
 *
 * Why URL params, not React state/context: the three surfaces above are
 * separate routes, so anything held in component state is lost on
 * navigation. Query params survive navigation, page refreshes and are
 * shareable/bookmarkable — which is also exactly the input shape a real
 * Guesty integration needs (destination/listing, checkIn, checkOut,
 * guests) to call the Listings, Availability and Quote APIs. Swapping
 * the mock logic below for live Guesty calls should not require
 * changing how this state is stored or passed around.
 */
export interface BookingSearch {
  destination: string;
  checkIn: Date | null;
  checkOut: Date | null;
  guests: number;
}

export const DEFAULT_GUESTS = 2;

type RawSearchParams = Record<string, string | string[] | undefined>;

function firstValue(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

/** Reads a page's `searchParams` into a typed, defaulted BookingSearch. */
export function parseBookingSearchParams(raw: RawSearchParams): BookingSearch {
  const guestsRaw = Number(firstValue(raw.guests));

  return {
    destination: firstValue(raw.destination) ?? "",
    checkIn: parseDateParam(firstValue(raw.checkIn)),
    checkOut: parseDateParam(firstValue(raw.checkOut)),
    guests: Number.isFinite(guestsRaw) && guestsRaw > 0 ? guestsRaw : DEFAULT_GUESTS,
  };
}

/** Serializes a (partial) search into a URLSearchParams query string. */
export function buildBookingQuery(search: Partial<BookingSearch>): string {
  const params = new URLSearchParams();
  if (search.destination) params.set("destination", search.destination);
  if (search.checkIn) params.set("checkIn", toDateParam(search.checkIn));
  if (search.checkOut) params.set("checkOut", toDateParam(search.checkOut));
  if (search.guests) params.set("guests", String(search.guests));
  return params.toString();
}

/** True once the visitor has actually searched for something. */
export function hasActiveSearch(search: BookingSearch): boolean {
  return Boolean(search.destination || search.checkIn || search.checkOut);
}

/**
 * Phase 2 integration point: replace this with a real Guesty
 * availability/calendar lookup for the listing (e.g.
 * `guesty.availability.check(listingId, checkIn, checkOut)`).
 * Every call site below goes through this one function, so the swap
 * happens in a single place.
 */
export function isPropertyAvailable(
  property: Property,
  checkIn: Date | null,
  checkOut: Date | null
): boolean {
  if (!checkIn || !checkOut) return true;

  const cursor = new Date(checkIn);
  while (cursor < checkOut) {
    if (isDateUnavailable(cursor)) return false;
    cursor.setDate(cursor.getDate() + 1);
  }
  return true;
}

/**
 * Phase 2 integration point: replace the in-memory filter below with a
 * server-side Guesty Listings search (location + guest count + dates).
 * The `properties` array becomes the API response; the matching rules
 * stay conceptually the same.
 */
export function matchesSearch(property: Property, search: BookingSearch): boolean {
  if (search.guests && property.maxGuests < search.guests) return false;

  if (search.destination) {
    const destination = search.destination.toLowerCase();
    const area = property.area.toLowerCase();
    if (!area.includes(destination) && !destination.includes(area.split(",")[0].trim())) {
      return false;
    }
  }

  return isPropertyAvailable(property, search.checkIn, search.checkOut);
}

export function filterProperties(properties: Property[], search: BookingSearch): Property[] {
  return properties.filter((property) => matchesSearch(property, search));
}
