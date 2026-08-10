import type { Metadata } from "next";
import PageHero from "@/components/shared/PageHero";
import PartnerBenefits from "@/components/partner/PartnerBenefits";
import PartnerSteps from "@/components/partner/PartnerSteps";
import PartnerFormSection from "@/components/partner/PartnerFormSection";

export const metadata: Metadata = {
  title: "Become a Partner | Rentico Dubai",
  description:
    "Partner with Rentico Dubai — full property management, 24/7 support, a transparent 20% fee, and referral rewards up to AED 20,000.",
};

export default function BecomeAPartnerPage() {
  return (
    <>
      <PageHero
        eyebrow="Become a Partner"
        title="Turn your property into a high-performing asset"
        description="Referral rewards up to AED 20,000. Full management, transparent pricing, and a team that treats your home like our own."
      />
      <PartnerBenefits />
      <PartnerSteps />
      <PartnerFormSection />
    </>
  );
}
