import type { Metadata } from "next";
import { asc, eq } from "drizzle-orm";
import { PartnerAudienceProvider } from "@/components/partner/PartnerAudienceContext";
import PartnerHero from "@/components/partner/PartnerHero";
import AudienceToggle from "@/components/partner/AudienceToggle";
import CommissionCalculator from "@/components/partner/CommissionCalculator";
import NoConflictSection from "@/components/partner/NoConflictSection";
import PartnerSteps from "@/components/partner/PartnerSteps";
import OperatorStats from "@/components/partner/OperatorStats";
import PartnerFormSection from "@/components/partner/PartnerFormSection";
import { db } from "@/lib/db";
import { faqs } from "@/lib/db/schema";
import { FAQ } from "@/lib/types";
import { getSiteSettings } from "@/lib/data/siteSettings";
import { getPartnerSections } from "@/lib/data/pageSections";

export const metadata: Metadata = {
  title: "Broker, Agent & Developer Partnerships | Rentico Dubai",
  description:
    "Send us a property, keep your client, and get paid. Refer owners to Rentico and earn a commission up to AED 20,000 on every unit that goes live.",
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
  const { whatsapp } = await getSiteSettings();
  const { hero, audienceToggle, commissionCalculator, noConflict, steps, operatorStats, formSection } =
    await getPartnerSections();

  return (
    <PartnerAudienceProvider>
      <PartnerHero whatsapp={whatsapp} {...hero} />
      <AudienceToggle {...audienceToggle} />
      <CommissionCalculator {...commissionCalculator} />
      <NoConflictSection {...noConflict} />
      <PartnerSteps {...steps} />
      <OperatorStats {...operatorStats} />
      <PartnerFormSection faqs={partnerFaqs} whatsapp={whatsapp} {...formSection} />
    </PartnerAudienceProvider>
  );
}
