import type { Metadata } from "next";
import PageHero from "@/components/shared/PageHero";
import ServiceProcess from "@/components/services/ServiceProcess";
import CTABanner from "@/components/shared/CTABanner";
import PMFeatures from "@/components/services/property-management/PMFeatures";
import PMComparison from "@/components/services/property-management/PMComparison";
import PMTestimonial from "@/components/services/property-management/PMTestimonial";
import { services } from "@/lib/data/services";

const service = services.find((s) => s.slug === "property-management")!;

export const metadata: Metadata = {
  title: `${service.name} | Rentico Dubai`,
  description: service.shortDescription,
};

export default function PropertyManagementPage() {
  return (
    <>
      <PageHero eyebrow="Services" title={service.name} description={service.shortDescription} />

      <PMFeatures service={service} />
      <PMComparison />
      <ServiceProcess service={service} />
      <PMTestimonial />

      <CTABanner
        title="Ready to put your property to work?"
        description="Tell us about your property and our team will walk you through onboarding, pricing and what to expect."
        primaryLabel="Become a Partner"
        primaryHref="/become-a-partner"
        secondaryLabel="Get a Free Revenue Estimate"
        secondaryHref="/services/estimated-revenue"
      />
    </>
  );
}
