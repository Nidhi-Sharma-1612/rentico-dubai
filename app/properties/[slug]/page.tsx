import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Container from "@/components/shared/Container";
import CTABanner from "@/components/shared/CTABanner";
import PropertyHero from "@/components/property/PropertyHero";
import PropertyGallery from "@/components/property/PropertyGallery";
import PropertyFacts from "@/components/property/PropertyFacts";
import PropertyTextSection from "@/components/property/PropertyTextSection";
import PropertyAmenities from "@/components/property/PropertyAmenities";
import PropertyHouseRules from "@/components/property/PropertyHouseRules";
import PropertyLocation from "@/components/property/PropertyLocation";
import PropertySidebarBooking from "@/components/property/PropertySidebarBooking";
import SimilarProperties from "@/components/property/SimilarProperties";
import { properties } from "@/lib/data/properties";
import { buildBookingQuery, parseBookingSearchParams } from "@/lib/booking";

export function generateStaticParams() {
  return properties.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const property = properties.find((p) => p.slug === slug);
  if (!property) return {};
  return {
    title: `${property.name} | Rentico Dubai`,
    description: property.description,
  };
}

export default async function PropertyDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { slug } = await params;
  const property = properties.find((p) => p.slug === slug);
  if (!property) notFound();

  const resolvedSearchParams = await searchParams;
  const search = parseBookingSearchParams(resolvedSearchParams);

  const otherProperties = properties.filter((p) => p.slug !== slug);
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
