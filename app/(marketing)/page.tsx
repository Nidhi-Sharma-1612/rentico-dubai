import Hero from "@/components/home/Hero";
import Welcome from "@/components/home/Welcome";
import Properties from "@/components/home/Properties";
import Amenities from "@/components/home/Amenities";
import TheStay from "@/components/home/TheStay";
import DirectBooking from "@/components/home/DirectBooking";
import Testimonials from "@/components/home/Testimonials";
import FAQSection from "@/components/home/FAQSection";
import { searchListings, getPortfolioAvailability } from "@/lib/guesty/bookingApi";
import { mapListingToProperty } from "@/lib/guesty/mappers";
import { AVAILABILITY_WINDOW_DAYS, toDateParam } from "@/lib/calendar";
import { Property, Testimonial, FAQ as FAQType } from "@/lib/types";
import { db } from "@/lib/db";
import { testimonials, faqs } from "@/lib/db/schema";
import { asc, eq } from "drizzle-orm";
import { getSiteSettings } from "@/lib/data/siteSettings";
import { getHomeSections } from "@/lib/data/pageSections";

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

  let homeTestimonials: Testimonial[] = [];
  try {
    homeTestimonials = await db
      .select()
      .from(testimonials)
      .where(eq(testimonials.showOnHome, true))
      .orderBy(asc(testimonials.sortOrder));
  } catch (err) {
    console.error("Failed to load testimonials:", err);
  }

  let homeFaqs: FAQType[] = [];
  try {
    homeFaqs = await db.select().from(faqs).where(eq(faqs.group, "home")).orderBy(asc(faqs.sortOrder));
  } catch (err) {
    console.error("Failed to load FAQs:", err);
  }

  const { phone, email } = await getSiteSettings();
  const { hero, featuredHomes, welcome, amenities, theStay, directBooking, whatPeopleSay, cta } =
    await getHomeSections();

  return (
    <>
      <Hero unavailableDates={unavailableDates} {...hero} />
      <Welcome stats={welcome.stats} points={welcome.points} />
      <Properties properties={featuredProperties} {...featuredHomes} />
      <Amenities {...amenities} />
      <TheStay {...theStay} />
      <DirectBooking {...directBooking} />
      <Testimonials testimonials={homeTestimonials} {...whatPeopleSay} />
      <FAQSection faqs={homeFaqs} phone={phone} email={email} {...cta} />
    </>
  );
}
