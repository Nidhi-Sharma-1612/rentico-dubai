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

  return (
    <>
      <PageHero
        eyebrow="About Rentico"
        title="A new standard for short-term stays in Dubai"
        description="We manage luxury homes the way we'd want our own managed — with care, transparency and hospitality-grade service."
      />
      <Story />
      <StatsBand />
      <Values />
      <AreasServed />
      <AboutTestimonial testimonial={featuredTestimonial} />
      <CTABanner
        title="Ready to work with us?"
        description="Whether you're booking a stay or listing a property, we'd love to hear from you."
        primaryLabel="Book Your Stay"
        primaryHref="/book-your-stay"
        secondaryLabel="Become a Partner"
        secondaryHref="/become-a-partner"
      />
    </>
  );
}
