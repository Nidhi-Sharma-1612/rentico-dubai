import type { Metadata } from "next";
import { asc, eq } from "drizzle-orm";
import ServicesHero from "@/components/services/ServicesHero";
import WhyRentico from "@/components/services/WhyRentico";
import WhatWeHandle from "@/components/services/WhatWeHandle";
import OnboardingSteps from "@/components/services/OnboardingSteps";
import PricingAndDesign from "@/components/services/PricingAndDesign";
import OwnerApp from "@/components/services/OwnerApp";
import WhereWeOperate from "@/components/services/WhereWeOperate";
import FinalCTASection from "@/components/services/FinalCTASection";
import { db } from "@/lib/db";
import { faqs } from "@/lib/db/schema";
import { FAQ } from "@/lib/types";
import { getSiteSettings } from "@/lib/data/siteSettings";

export const metadata: Metadata = {
  title: "Manage Your Property | Rentico",
  description:
    "Short-term & mid-term rental management across Dubai and Abu Dhabi — dynamic pricing, 24/7 guest care, hotel-grade housekeeping, and transparent monthly reporting for a flat 20% of gross revenue.",
};

// This page reads admin-editable FAQs from the DB — without this, Next
// would statically bake it at build time and admin edits would never show
// up without a redeploy.
export const revalidate = 60;

export default async function ServicesPage() {
  let servicesFaqs: FAQ[] = [];
  try {
    servicesFaqs = await db.select().from(faqs).where(eq(faqs.group, "services")).orderBy(asc(faqs.sortOrder));
  } catch (err) {
    console.error("Failed to load FAQs:", err);
  }
  const { whatsapp } = await getSiteSettings();

  return (
    <>
      <ServicesHero whatsapp={whatsapp} />
      <WhyRentico whatsapp={whatsapp} />
      <WhatWeHandle />
      <OnboardingSteps />
      <PricingAndDesign whatsapp={whatsapp} />
      <OwnerApp />
      <WhereWeOperate />
      <FinalCTASection faqs={servicesFaqs} whatsapp={whatsapp} />
    </>
  );
}
