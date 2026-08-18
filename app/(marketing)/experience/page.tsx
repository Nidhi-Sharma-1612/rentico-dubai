import type { Metadata } from "next";
import { asc, eq } from "drizzle-orm";
import PageHero from "@/components/shared/PageHero";
import ExperienceCategories from "@/components/experience/ExperienceCategories";
import ExperienceFAQSection from "@/components/experience/ExperienceFAQSection";
import { db } from "@/lib/db";
import { faqs } from "@/lib/db/schema";
import { FAQ } from "@/lib/types";
import { getSiteSettings } from "@/lib/data/siteSettings";
import { getExperienceSections } from "@/lib/data/pageSections";

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
  const { whatsapp } = await getSiteSettings();
  const { hero, categories, cta } = await getExperienceSections();

  return (
    <>
      <PageHero eyebrow={hero.eyebrow} title={hero.title} description={hero.description} />
      <ExperienceCategories items={categories.items} />
      <ExperienceFAQSection faqs={experienceFaqs} whatsapp={whatsapp} {...cta} />
    </>
  );
}
