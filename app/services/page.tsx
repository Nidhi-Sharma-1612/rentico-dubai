import type { Metadata } from "next";
import ServicesHero from "@/components/services/ServicesHero";
import WhyRentico from "@/components/services/WhyRentico";
import WhatWeHandle from "@/components/services/WhatWeHandle";
import OnboardingSteps from "@/components/services/OnboardingSteps";
import PricingAndDesign from "@/components/services/PricingAndDesign";
import WhereWeOperate from "@/components/services/WhereWeOperate";
import OwnerAppFAQ from "@/components/services/OwnerAppFAQ";
import FinalCTA from "@/components/services/FinalCTA";

export const metadata: Metadata = {
  title: "Manage Your Property | Rentico",
  description:
    "Short-term & mid-term rental management across Dubai and Abu Dhabi — dynamic pricing, 24/7 guest care, hotel-grade housekeeping, and transparent monthly reporting for a flat 20% of gross revenue.",
};

export default function ServicesPage() {
  return (
    <>
      <ServicesHero />
      <WhyRentico />
      <WhatWeHandle />
      <OnboardingSteps />
      <PricingAndDesign />
      <WhereWeOperate />
      <OwnerAppFAQ />
      <FinalCTA />
    </>
  );
}
