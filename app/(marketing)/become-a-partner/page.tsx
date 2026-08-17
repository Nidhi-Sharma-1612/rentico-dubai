import type { Metadata } from "next";
import { asc, eq } from "drizzle-orm";
import PageHero from "@/components/shared/PageHero";
import PartnerBenefits from "@/components/partner/PartnerBenefits";
import PartnerSteps from "@/components/partner/PartnerSteps";
import PartnerFormSection from "@/components/partner/PartnerFormSection";
import { db } from "@/lib/db";
import { faqs } from "@/lib/db/schema";
import { FAQ } from "@/lib/types";

export const metadata: Metadata = {
  title: "Become a Partner | Rentico Dubai",
  description:
    "Partner with Rentico Dubai — full property management, 24/7 support, a transparent 20% fee, and referral rewards up to AED 20,000.",
};

// This page reads admin-editable FAQs from the DB — without this, Next
// would statically bake it at build time and admin edits would never show
// up without a redeploy.
export const revalidate = 60;

export default async function BecomeAPartnerPage() {
  let partnerFaqs: FAQ[] = [];
  try {
    partnerFaqs = await db.select().from(faqs).where(eq(faqs.group, "partner")).orderBy(asc(faqs.sortOrder));
  } catch (err) {
    console.error("Failed to load FAQs:", err);
  }

  return (
    <>
      <PageHero
        eyebrow="Become a Partner"
        title="Turn your property into a high-performing asset"
        description="Referral rewards up to AED 20,000. Full management, transparent pricing, and a team that treats your home like our own."
      />
      <PartnerBenefits />
      <PartnerSteps />
      <PartnerFormSection faqs={partnerFaqs} />
    </>
  );
}
