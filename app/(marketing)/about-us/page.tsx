import type { Metadata } from "next";
import { desc } from "drizzle-orm";
import PageHero from "@/components/shared/PageHero";
import Story from "@/components/about/Story";
import StatsBand from "@/components/about/StatsBand";
import Values from "@/components/about/Values";
import AreasServed from "@/components/about/AreasServed";
import AboutTestimonial from "@/components/about/AboutTestimonial";
import CTABanner from "@/components/shared/CTABanner";
import { db } from "@/lib/db";
import { testimonials } from "@/lib/db/schema";
import { Testimonial } from "@/lib/types";
import { getAboutSections } from "@/lib/data/pageSections";

export const metadata: Metadata = {
  title: "About Us | Rentico Dubai",
  description:
    "Rentico Dubai manages luxury short-term rental homes across Dubai's finest districts — founded 2025, 4.9-star rated.",
};

// This page now reads admin-editable content from the DB — without this,
// Next would statically bake it at build time and admin edits would never
// show up without a redeploy.
export const revalidate = 60;

export default async function AboutUsPage() {
  let featuredTestimonial: Testimonial | null = null;
  try {
    const rows = await db.select().from(testimonials).orderBy(desc(testimonials.featuredForAbout));
    featuredTestimonial = rows[0] ?? null;
  } catch (err) {
    console.error("Failed to load the featured testimonial:", err);
  }

  const { hero, story, stats, values, areasServed, cta } = await getAboutSections();

  return (
    <>
      <PageHero eyebrow={hero.eyebrow} title={hero.title} description={hero.description} />
      <Story {...story} />
      <StatsBand {...stats} />
      <Values {...values} />
      <AreasServed {...areasServed} />
      <AboutTestimonial testimonial={featuredTestimonial} />
      <CTABanner {...cta} />
    </>
  );
}
