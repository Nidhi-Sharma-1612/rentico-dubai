import { parseDateParam, toDateParam } from "@/lib/calendar";

/**
 * The canonical shape of a "stay search" — dates and party size. This is
 * intentionally the *only* thing passed between the homepage search
 * widget, the Book Your Stay results page and a property's own booking
 * sidebar, carried as URL search params rather than client-side state.
 *
 * Why URL params, not React state/context: the three surfaces above are
 * separate routes, so anything held in component state is lost on
 * navigation. Query params survive navigation, page refreshes and are
 * shareable/bookmarkable — which is also exactly the input shape the
 * Guesty Booking Engine API needs (checkIn, checkOut) for its search and
 * quote endpoints.
 */
export interface BookingSearch {
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
    checkIn: parseDateParam(firstValue(raw.checkIn)),
    checkOut: parseDateParam(firstValue(raw.checkOut)),
    guests: Number.isFinite(guestsRaw) && guestsRaw > 0 ? guestsRaw : DEFAULT_GUESTS,
  };
}

/** Serializes a (partial) search into a URLSearchParams query string. */
export function buildBookingQuery(search: Partial<BookingSearch>): string {
  const params = new URLSearchParams();
  if (search.checkIn) params.set("checkIn", toDateParam(search.checkIn));
  if (search.checkOut) params.set("checkOut", toDateParam(search.checkOut));
  if (search.guests) params.set("guests", String(search.guests));
  return params.toString();
}

/** True once the visitor has actually searched for something. */
export function hasActiveSearch(search: BookingSearch): boolean {
  return Boolean(search.checkIn || search.checkOut);
}
