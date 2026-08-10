import type { Metadata } from "next";
import Link from "next/link";
import { X } from "lucide-react";
import PageHero from "@/components/shared/PageHero";
import Container from "@/components/shared/Container";
import BookingWidget from "@/components/shared/BookingWidget";
import PropertyCard from "@/components/shared/PropertyCard";
import SectionHeading from "@/components/shared/SectionHeading";
import { properties } from "@/lib/data/properties";
import { buildBookingQuery, filterProperties, hasActiveSearch, parseBookingSearchParams } from "@/lib/booking";

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

  const matches = searched ? filterProperties(properties, search) : properties;
  const noExactMatches = searched && matches.length === 0;
  const results = noExactMatches ? properties : matches;

  // Carry the dates/guests forward into whichever property a guest opens next.
  const forwardQuery = buildBookingQuery({ checkIn: search.checkIn, checkOut: search.checkOut, guests: search.guests });

  const heading = searched
    ? noExactMatches
      ? "No exact matches — here's our full portfolio"
      : `${matches.length} stay${matches.length === 1 ? "" : "s"} match your search`
    : "Our current portfolio";

  const description = noExactMatches
    ? `We couldn't find a stay in ${search.destination || "that area"} for those dates — here's everything else we have available.`
    : searched
      ? "Filtered to your destination, dates and guest count."
      : "A snapshot of homes available to book direct. Full live availability and calendars are coming soon.";

  return (
    <>
      <PageHero
        eyebrow="Book Your Stay"
        title="Find your next luxury stay in Dubai"
        description="Search live availability across our managed portfolio and book directly — no third-party fees."
      >
        <div className="mt-10 w-full max-w-5xl">
          <BookingWidget
            initialDestination={search.destination}
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

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((property) => (
              <PropertyCard key={property.id} property={property} searchQuery={forwardQuery} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
