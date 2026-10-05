import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import Welcome from "@/components/home/Welcome";
import Properties from "@/components/home/Properties";
import Amenities from "@/components/home/Amenities";
import TheStay from "@/components/home/TheStay";
import DirectBooking from "@/components/home/DirectBooking";
import Testimonials from "@/components/home/Testimonials";
import FAQSection from "@/components/home/FAQSection";
import { GuestyBEListing, searchListings, getPortfolioAvailability, getPortfolioReviews } from "@/lib/guesty/bookingApi";
import { mapListingToProperty } from "@/lib/guesty/mappers";
import { AVAILABILITY_WINDOW_DAYS, toDateParam } from "@/lib/calendar";
import { Property, Testimonial, FAQ as FAQType } from "@/lib/types";
import { db } from "@/lib/db";
import { faqs } from "@/lib/db/schema";
import { asc, eq } from "drizzle-orm";
import { getSiteSettings } from "@/lib/data/siteSettings";
import { getHomeSections, getPageSeo } from "@/lib/data/pageSections";

const FEATURED_COUNT = 3;
const HOME_REVIEW_COUNT = 6;

// Without this, `next build`'s static-generation probe still attempts the
// Guesty fetch below before discovering the route is dynamic — silently
// spending a token from the account's 5-tokens/24h budget on every build.
export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSeo("home", {
    metaTitle: "Stay with Rentico | Holiday Homes in Dubai – Book Direct",
    metaDescription:
      "Book luxury holiday homes in Downtown, Business Bay, Palm Jumeirah, Dubai Marina and Dubai Hills directly with Stay with Rentico. Best price when you book direct.",
  });
  return { title: seo.metaTitle, description: seo.metaDescription, alternates: { canonical: "/" } };
}

export default async function Home() {
  let listings: GuestyBEListing[] = [];
  try {
    ({ listings } = await searchListings({ limit: 50 }));
  } catch (err) {
    console.error("Failed to load listings from Guesty:", err);
  }
  const featuredProperties: Property[] = listings.slice(0, FEATURED_COUNT).map(mapListingToProperty);

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
    const reviews = await getPortfolioReviews(
      listings
        .filter((l) => (l.reviews?.total ?? 0) > 0)
        .map((l) => ({ id: l._id, area: mapListingToProperty(l).area })),
      HOME_REVIEW_COUNT
    );
    homeTestimonials = reviews.map((r) => ({
      id: r.id,
      name: "Airbnb guest",
      role: `Stayed in ${r.area}`,
      quote: r.text,
      rating: r.rating,
    }));
  } catch (err) {
    console.error("Failed to load reviews from Guesty:", err);
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
      <Welcome stats={welcome.stats} points={welcome.points} image={welcome.image} />
      <Properties properties={featuredProperties} {...featuredHomes} />
      <Amenities {...amenities} />
      <TheStay {...theStay} />
      <DirectBooking {...directBooking} />
      <Testimonials testimonials={homeTestimonials} {...whatPeopleSay} />
      <FAQSection faqs={homeFaqs} phone={phone} email={email} {...cta} />
    </>
  );
}
