import Hero from "@/components/home/Hero";
import TrustBar from "@/components/home/TrustBar";
import Welcome from "@/components/home/Welcome";
import Properties from "@/components/home/Properties";
import Amenities from "@/components/home/Amenities";
import PartnerCTA from "@/components/home/PartnerCTA";
import Testimonials from "@/components/home/Testimonials";
import FAQ from "@/components/home/FAQ";
import CTASection from "@/components/home/CTASection";
import { searchListings, getPortfolioAvailability } from "@/lib/guesty/bookingApi";
import { mapListingToProperty } from "@/lib/guesty/mappers";
import { AVAILABILITY_WINDOW_DAYS, toDateParam } from "@/lib/calendar";
import { Property } from "@/lib/types";

const FEATURED_COUNT = 3;

// Without this, `next build`'s static-generation probe still attempts the
// Guesty fetch below before discovering the route is dynamic — silently
// spending a token from the account's 5-tokens/24h budget on every build.
export const dynamic = "force-dynamic";

export default async function Home() {
  let featuredProperties: Property[] = [];
  try {
    const { listings } = await searchListings({ limit: FEATURED_COUNT });
    featuredProperties = listings.map(mapListingToProperty);
  } catch (err) {
    console.error("Failed to load featured properties from Guesty:", err);
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

  return (
    <>
      <Hero unavailableDates={unavailableDates} />
      <Welcome />
      <TrustBar />
      <Properties properties={featuredProperties} />
      <Amenities />
      <PartnerCTA />
      <Testimonials />
      <FAQ />
      <CTASection />
    </>
  );
}
