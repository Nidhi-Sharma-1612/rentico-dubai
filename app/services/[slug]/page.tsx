import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHero from "@/components/shared/PageHero";
import ServiceFeatures from "@/components/services/ServiceFeatures";
import ServiceProcess from "@/components/services/ServiceProcess";
import CTABanner from "@/components/shared/CTABanner";
import { services } from "@/lib/data/services";

export function generateStaticParams() {
  // "property-management" has its own dedicated route at app/services/property-management/page.tsx
  return services
    .filter((s) => s.slug !== "property-management")
    .map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};
  return {
    title: `${service.name} | Rentico Dubai`,
    description: service.shortDescription,
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  return (
    <>
      <PageHero eyebrow="Services" title={service.name} description={service.shortDescription} />
      <ServiceFeatures service={service} />
      <ServiceProcess service={service} />
      <CTABanner
        title="Ready to get started?"
        description="Tell us about your property and our team will walk you through the details."
        primaryLabel="Become a Partner"
        primaryHref="/become-a-partner"
        secondaryLabel="View Other Services"
        secondaryHref="/services"
      />
    </>
  );
}
