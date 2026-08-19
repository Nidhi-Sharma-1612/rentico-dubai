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
import { getServicesSections, getPageSeo } from "@/lib/data/pageSections";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSeo("manage-my-property", {
    metaTitle: "Manage Your Property | Rentico",
    metaDescription:
      "Short-term & mid-term rental management across Dubai and Abu Dhabi — dynamic pricing, 24/7 guest care, hotel-grade housekeeping, and transparent monthly reporting for a flat 20% of gross revenue.",
  });
  return { title: seo.metaTitle, description: seo.metaDescription };
}

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
  const { hero, whyRentico, whatWeHandle, onboardingSteps, pricingDesign, ownerApp, whereWeOperate, cta } =
    await getServicesSections();

  return (
    <>
      <ServicesHero whatsapp={whatsapp} {...hero} />
      <WhyRentico whatsapp={whatsapp} {...whyRentico} />
      <WhatWeHandle {...whatWeHandle} />
      <OnboardingSteps {...onboardingSteps} />
      <PricingAndDesign whatsapp={whatsapp} {...pricingDesign} />
      <OwnerApp {...ownerApp} />
      <WhereWeOperate {...whereWeOperate} />
      <FinalCTASection faqs={servicesFaqs} whatsapp={whatsapp} {...cta} />
    </>
  );
}
