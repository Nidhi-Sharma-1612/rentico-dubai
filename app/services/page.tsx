import type { Metadata } from "next";
import PageHero from "@/components/shared/PageHero";
import CTABanner from "@/components/shared/CTABanner";
import ServicesList from "@/components/services/ServicesList";

export const metadata: Metadata = {
  title: "Services | Rentico Dubai",
  description:
    "Full-service property, listing, cleaning, design and revenue management for luxury Dubai short-term rentals.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="What We Do"
        title="Full-service management for your Dubai property"
        description="From listing to guest checkout, Rentico handles every part of running a high-performing short-term rental — so you don't have to."
      />

      <ServicesList />

      <CTABanner
        title="Not sure where to start?"
        description="Tell us about your property and we'll recommend the right services for your goals."
        primaryLabel="Talk to Our Team"
        primaryHref="/contact"
      />
    </>
  );
}
