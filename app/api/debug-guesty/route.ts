import { NextResponse } from "next/server";
import {
  searchListings,
  getListing,
  getListingAvailability,
  getPaymentProvider,
  createReservationQuote,
  getRatePlanId,
} from "@/lib/guesty/bookingApi";
import { mapListingToProperty } from "@/lib/guesty/mappers";
import { toDateParam } from "@/lib/calendar";

/**
 * One-shot diagnostic covering every read-path Guesty call this project
 * makes, run against a single cached token to respect the account's
 * 5-tokens/24h cap. Does NOT call createReservationFromQuote — that writes
 * a real reservation record and should only be exercised deliberately,
 * separately, with a Stripe test card.
 */
export async function GET() {
  const results: Record<string, unknown> = {};

  try {
    const { listings, total } = await searchListings({ limit: 3 });
    results.searchListings = { ok: true, total, count: listings.length };

    const first = listings[0];
    if (!first) {
      results.searchListings = { ok: true, total, count: 0, note: "No listings returned — nothing else to test" };
      return NextResponse.json(results);
    }

    results.rawFirstListing = {
      _id: first._id,
      title: first.title,
      unitTypeHouseRules: first.unitTypeHouseRules,
      reviews: first.reviews,
    };
    results.mappedProperty = mapListingToProperty(first);

    try {
      const detail = await getListing(first._id);
      results.getListing = { ok: true, detailMapped: mapListingToProperty(detail) };
    } catch (err) {
      results.getListing = { ok: false, error: err instanceof Error ? err.message : String(err) };
    }

    const today = new Date();
    const checkIn = new Date(today);
    checkIn.setDate(checkIn.getDate() + 14);
    const checkOut = new Date(checkIn);
    checkOut.setDate(checkOut.getDate() + 3);

    try {
      const availability = await getListingAvailability(first._id, toDateParam(checkIn), toDateParam(checkOut));
      results.getListingAvailability = { ok: true, ...availability };
    } catch (err) {
      results.getListingAvailability = { ok: false, error: err instanceof Error ? err.message : String(err) };
    }

    try {
      const provider = await getPaymentProvider(first._id);
      results.getPaymentProvider = { ok: true, provider };
    } catch (err) {
      results.getPaymentProvider = { ok: false, error: err instanceof Error ? err.message : String(err) };
    }

    try {
      const quote = await createReservationQuote({
        listingId: first._id,
        checkInDateLocalized: toDateParam(checkIn),
        checkOutDateLocalized: toDateParam(checkOut),
        guestsCount: 2,
      });
      const ratePlan = quote.rates?.ratePlans?.[0];
      results.createReservationQuote = {
        ok: true,
        quoteId: quote._id,
        expiresAt: quote.expiresAt,
        rawFirstRatePlan: ratePlan,
        resolvedRatePlanId: ratePlan ? getRatePlanId(ratePlan) : undefined,
      };
    } catch (err) {
      results.createReservationQuote = { ok: false, error: err instanceof Error ? err.message : String(err) };
    }

    return NextResponse.json(results);
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : String(err), partial: results },
      { status: 500 }
    );
  }
}
