import type { Metadata } from "next";
import PageHero from "@/components/shared/PageHero";
import Container from "@/components/shared/Container";
import Button from "@/components/shared/Button";
import { services } from "@/lib/data/services";
import ServiceCard from "@/components/services/ServiceCard";

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

      <section className="py-20 sm:py-28">
        <Container>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <ServiceCard key={service.slug} service={service} delay={i * 0.08} />
            ))}

            <div className="flex flex-col justify-center gap-4 rounded-2xl bg-navy-900 p-7 text-white">
              <h3 className="text-lg font-bold">Not sure where to start?</h3>
              <p className="text-sm leading-relaxed text-white/70">
                Tell us about your property and we&apos;ll recommend the right services for your goals.
              </p>
              <Button href="/become-a-partner" variant="primary" className="w-fit">
                Talk to Our Team
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
