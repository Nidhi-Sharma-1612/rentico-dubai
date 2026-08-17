import type { Metadata } from "next";
import { asc, eq } from "drizzle-orm";
import PageHero from "@/components/shared/PageHero";
import ExperienceCategories from "@/components/experience/ExperienceCategories";
import ExperienceFAQ from "@/components/experience/ExperienceFAQ";
import CTABanner from "@/components/shared/CTABanner";
import { db } from "@/lib/db";
import { faqs } from "@/lib/db/schema";
import { FAQ } from "@/lib/types";

export const metadata: Metadata = {
  title: "Experience | Rentico",
  description:
    "Transportation, signature experiences, celebrations, adventure, dining, wellness, custom itineraries and VIP event access — arranged by the Rentico concierge team for every stay.",
};

// This page reads admin-editable FAQs from the DB — without this, Next
// would statically bake it at build time and admin edits would never show
// up without a redeploy.
export const revalidate = 60;

export default async function ExperiencePage() {
  let experienceFaqs: FAQ[] = [];
  try {
    experienceFaqs = await db.select().from(faqs).where(eq(faqs.group, "experience")).orderBy(asc(faqs.sortOrder));
  } catch (err) {
    console.error("Failed to load FAQs:", err);
  }

  return (
    <>
      <PageHero
        eyebrow="The Experience"
        title="Everything Dubai has to offer, already arranged"
        description="From the moment you land to the last night out, our concierge team turns your stay into an itinerary — transport, celebrations, adventure, dining, and the access that usually takes connections."
      />
      <ExperienceCategories />
      <ExperienceFAQ faqs={experienceFaqs} />
      <CTABanner
        title="Tell us the occasion, we'll handle the rest."
        description="Message our concierge team with your dates and what you're after — we'll come back with options, same day."
        primaryLabel="Chat with us on WhatsApp"
        primaryHref="https://wa.me/971521460222?text=Hi%20Rentico%2C%20I%27d%20like%20to%20plan%20an%20experience%20for%20my%20stay."
        primaryExternal
        secondaryLabel="Book Your Stay"
        secondaryHref="/book-your-stay"
      />
    </>
  );
}
