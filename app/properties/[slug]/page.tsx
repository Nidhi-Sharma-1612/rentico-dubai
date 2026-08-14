import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Container from "@/components/shared/Container";
import CTABanner from "@/components/shared/CTABanner";
import Button from "@/components/shared/Button";
import PropertyHero from "@/components/property/PropertyHero";
import PropertyGallery from "@/components/property/PropertyGallery";
import PropertyFacts from "@/components/property/PropertyFacts";
import PropertyTextSection from "@/components/property/PropertyTextSection";
import PropertyAmenities from "@/components/property/PropertyAmenities";
import PropertyHouseRules from "@/components/property/PropertyHouseRules";
import PropertyLocation from "@/components/property/PropertyLocation";
import PropertySidebarBooking from "@/components/property/PropertySidebarBooking";
import SimilarProperties from "@/components/property/SimilarProperties";
import { GuestyBEListing, searchListings, getListingAvailability } from "@/lib/guesty/bookingApi";
import { mapListingToProperty } from "@/lib/guesty/mappers";
import { buildBookingQuery, parseBookingSearchParams } from "@/lib/booking";
import { AVAILABILITY_WINDOW_DAYS, toDateParam } from "@/lib/calendar";
import { slugify } from "@/lib/utils";

async function findListingBySlug(slug: string): Promise<{ listing: GuestyBEListing; all: GuestyBEListing[] } | null> {
  const { listings } = await searchListings();
  const listing = listings.find((l) => slugify(l.title) === slug);
  return listing ? { listing, all: listings } : null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  // Metadata generation must never crash the route — a Guesty failure here
  // should just fall back to default metadata; the page component below
  // handles its own failure state.
  try {
    const found = await findListingBySlug(slug);
    if (!found) return {};
    const property = mapListingToProperty(found.listing);
    return {
      title: `${property.name} | Rentico Dubai`,
      description: property.description,
    };
  } catch (err) {
    console.error("generateMetadata failed to load listing:", err);
    return {};
  }
}

function UnavailableState() {
  return (
    <section className="flex min-h-[60vh] items-center justify-center py-20">
      <Container className="flex justify-center">
        <div className="w-full max-w-md rounded-3xl border border-navy-900/8 bg-navy-50/40 p-8 text-center sm:p-10">
          <h1 className="text-xl font-extrabold text-navy-900 sm:text-2xl">This stay is temporarily unavailable</h1>
          <p className="mt-3 text-sm leading-relaxed text-navy-900/60">
            We couldn&apos;t reach our booking system just now. Please try again shortly, or browse the rest of our
            portfolio.
          </p>
          <Button href="/book-your-stay" size="lg" className="mt-6 w-full justify-center">
            View All Properties
          </Button>
        </div>
      </Container>
    </section>
  );
}

export default async function PropertyDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { slug } = await params;

  let found: { listing: GuestyBEListing; all: GuestyBEListing[] };
  try {
    const result = await findListingBySlug(slug);
    if (!result) notFound();
    found = result;
  } catch (err) {
    console.error("Failed to load listing from Guesty:", err);
    return <UnavailableState />;
  }

  const { listing, all: listings } = found;
  const property = mapListingToProperty(listing);

  let unavailableDates: string[] = [];
  try {
    const today = new Date();
    const windowEnd = new Date(today);
    windowEnd.setDate(windowEnd.getDate() + AVAILABILITY_WINDOW_DAYS);
    const { allotment } = await getListingAvailability(listing._id, toDateParam(today), toDateParam(windowEnd));
    unavailableDates = Object.entries(allotment ?? {})
      .filter(([, value]) => value < 1)
      .map(([date]) => date);
  } catch (err) {
    // Availability is secondary to showing the listing itself — degrade to
    // "no known unavailable dates" rather than failing the whole page.
    console.error("Failed to load availability from Guesty:", err);
  }

  const resolvedSearchParams = await searchParams;
  const search = parseBookingSearchParams(resolvedSearchParams);

  const otherProperties = listings
    .filter((l) => l._id !== listing._id)
    .slice(0, 3)
    .map(mapListingToProperty);
  const forwardQuery = buildBookingQuery({ checkIn: search.checkIn, checkOut: search.checkOut, guests: search.guests });

  return (
    <>
      <PropertyHero property={property} />
      <PropertyGallery images={property.images} name={property.name} />

      <section className="py-12 sm:py-16">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:items-start lg:gap-10">
          <div className="flex flex-col lg:col-span-2">
            <PropertyFacts property={property} />
            <PropertyTextSection title="About This Property">
              {property.description}
            </PropertyTextSection>
            <PropertyTextSection title="The Space">{property.theSpace}</PropertyTextSection>
            <PropertyAmenities amenities={property.amenities} />
            <PropertyHouseRules rules={property.houseRules} />
            <PropertyLocation address={property.address} />
          </div>

          <PropertySidebarBooking
            property={property}
            unavailableDates={unavailableDates}
            initialCheckIn={search.checkIn}
            initialCheckOut={search.checkOut}
            initialGuests={search.guests}
          />
        </Container>
      </section>

      <SimilarProperties properties={otherProperties} searchQuery={forwardQuery} />

      <CTABanner
        title="Ready to book this stay?"
        description="Reach out to our team for a tailored quote or any questions about this home."
        primaryLabel="Book Your Stay"
        primaryHref="/book-your-stay"
        secondaryLabel="Become a Partner"
        secondaryHref="/become-a-partner"
      />
    </>
  );
}
