import type { Metadata } from "next";
import Link from "next/link";
import { X } from "lucide-react";
import PageHero from "@/components/shared/PageHero";
import Container from "@/components/shared/Container";
import BookingWidget from "@/components/shared/BookingWidget";
import PropertyCard from "@/components/shared/PropertyCard";
import SectionHeading from "@/components/shared/SectionHeading";
import { searchListings, getPortfolioAvailability, createReservationQuote, getDiscount } from "@/lib/guesty/bookingApi";
import { mapListingToProperty } from "@/lib/guesty/mappers";
import { buildBookingQuery, hasActiveSearch, parseBookingSearchParams } from "@/lib/booking";
import { AVAILABILITY_WINDOW_DAYS, toDateParam } from "@/lib/calendar";
import { Property } from "@/lib/types";

export const metadata: Metadata = {
  title: "Book Your Stay | Rentico Dubai",
  description: "Search and book Rentico's luxury short-term rental homes across Dubai.",
};

export default async function BookYourStayPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedSearchParams = await searchParams;
  const search = parseBookingSearchParams(resolvedSearchParams);
  const searched = hasActiveSearch(search);

  let properties: Property[] = [];
  // Real total per listing for the searched dates, from an actual quote —
  // matches what checkout will charge, including any "Website" channel
  // discount. A raw sum of the listing's calendar rates was tried first and
  // rejected: it excludes the rate plan's price adjustment entirely,
  // understating the real total by ~40% in testing against Guesty's own
  // booking engine — a real quote is the only reliable source here.
  const totalsByListingId = new Map<
    string,
    { amount: number; nights: number; discount?: { amount: number; percent: number } }
  >();
  let loadError = false;
  try {
    const checkInParam = search.checkIn ? toDateParam(search.checkIn) : undefined;
    const checkOutParam = search.checkOut ? toDateParam(search.checkOut) : undefined;
    const { listings } = await searchListings({ checkIn: checkInParam, checkOut: checkOutParam });

    if (search.checkIn && search.checkOut && checkInParam && checkOutParam) {
      const nights = Math.round((search.checkOut.getTime() - search.checkIn.getTime()) / 86400000);
      // Sequential, not Promise.all — Guesty's per-second burst limit (5
      // req/s) is easy to trip when a whole results page's quotes fire at once.
      for (const listing of listings) {
        try {
          const quote = await createReservationQuote({
            listingId: listing._id,
            checkInDateLocalized: checkInParam,
            checkOutDateLocalized: checkOutParam,
            guestsCount: search.guests,
          });
          const money = quote.rates?.ratePlans?.[0]?.ratePlan.money;
          // subTotalPrice already includes totalFees — adding fees again
          // double-counts the cleaning fee (confirmed live against Guesty's
          // own booking engine's displayed totals).
          if (money) {
            const total = (money.subTotalPrice ?? 0) + (money.totalTaxes ?? 0);
            totalsByListingId.set(listing._id, { amount: total, nights, discount: getDiscount(money) });
          }
        } catch {
          // No quote for this listing/date combo (e.g. minNights not met) — its card falls back to the flat rate.
        }
      }
    }

    properties = listings
      .map(mapListingToProperty)
      .filter((p) => !search.guests || p.maxGuests >= search.guests);
  } catch (err) {
    console.error("Failed to load listings from Guesty:", err);
    loadError = true;
  }

  let unavailableDates: string[] = [];
  try {
    const today = new Date();
    const windowEnd = new Date(today);
    windowEnd.setDate(windowEnd.getDate() + AVAILABILITY_WINDOW_DAYS);
    const fullyBooked = await getPortfolioAvailability(toDateParam(today), toDateParam(windowEnd));
    unavailableDates = Array.from(fullyBooked);
  } catch (err) {
    console.error("Failed to load portfolio availability from Guesty:", err);
  }

  // properties can come back empty on a date-scoped search — Guesty
  // excludes listings that don't meet its minimum-notice/lead-time policy,
  // so very-short-notice date ranges can legitimately have zero bookable
  // stays across the whole portfolio.
  const noAvailability = !loadError && searched && properties.length === 0;

  // Carry the dates/guests forward into whichever property a guest opens next.
  const forwardQuery = buildBookingQuery({ checkIn: search.checkIn, checkOut: search.checkOut, guests: search.guests });

  const heading = loadError
    ? "Live availability is temporarily unavailable"
    : noAvailability
      ? "No availability for these dates"
      : searched
        ? `${properties.length} stay${properties.length === 1 ? "" : "s"} match your search`
        : "Our current portfolio";

  const description = loadError
    ? "We couldn't reach our booking system just now — please try again shortly, or reach out to our team directly."
    : noAvailability
      ? "None of our stays are bookable for these dates — often because they're too close to check-in. Try a later date range, or contact us directly for last-minute availability."
      : searched
        ? "Filtered to your dates and guest count."
        : "Our full portfolio, with live availability and pricing.";

  return (
    <>
      <PageHero
        eyebrow="Book Your Stay"
        title="Find your next luxury stay in Dubai"
        description="Search live availability across our managed portfolio and book directly — no third-party fees."
      >
        <div className="mt-10 w-full max-w-5xl">
          <BookingWidget
            unavailableDates={unavailableDates}
            initialCheckIn={search.checkIn}
            initialCheckOut={search.checkOut}
            initialGuests={search.guests}
          />
        </div>
      </PageHero>

      <section className="py-20 sm:py-28">
        <Container className="flex flex-col gap-12">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <SectionHeading eyebrow="Available Stays" title={heading} description={description} />
            {searched && (
              <Link
                href="/book-your-stay"
                className="flex items-center gap-1.5 text-sm font-semibold text-navy-900/60 hover:text-navy-900"
              >
                <X className="h-4 w-4" />
                Clear search
              </Link>
            )}
          </div>

          {properties.length === 0 ? (
            <p className="rounded-2xl border border-navy-900/8 bg-navy-50/40 p-10 text-center text-sm text-navy-900/60">
              Reach out to our team directly and we&apos;ll help find the right stay for you.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {properties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  searchQuery={forwardQuery}
                  totalForStay={totalsByListingId.get(property.id)}
                />
              ))}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
