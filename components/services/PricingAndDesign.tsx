"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import Button from "@/components/shared/Button";
import Badge from "@/components/shared/Badge";

const WHATSAPP_HREF =
  "https://wa.me/971521460222?text=Hi%20Rentico%2C%20I%27d%20like%20to%20ask%20about%20your%20Design%20by%20Rentico%20packages.";

const terms = [
  { label: "Setup or sign-up fee", value: "One-time, itemized — no markup" },
  { label: "Hidden deductions", value: "None" },
  { label: "Statement & payout", value: "15th of every month" },
  { label: "Contract terms", value: "12-month renewable · 8-week NOC exit" },
];

const packages = [
  {
    name: "Essential",
    description: "Smart furnishings and clean styling for a guest-ready setup without overspending.",
  },
  {
    name: "Elevated",
    description: "Upgraded furnishings and layered styling with statement pieces, positioned for higher nightly rates.",
  },
  {
    name: "Signature",
    description: "Fully curated furnishings, elevated materials, statement lighting for top-tier premium units.",
    featured: true,
  },
];

export default function PricingAndDesign() {
  return (
    <section className="py-20 sm:py-28">
      <Container className="flex flex-col gap-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="overflow-hidden rounded-3xl bg-navy-900 px-8 py-12 text-center sm:px-14 sm:py-16"
        >
          <span className="mx-auto w-fit rounded-full bg-white/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-orange-300">
            Transparent Pricing
          </span>
          <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            20% of gross revenue.
          </h2>
          <p className="mt-2 text-lg font-semibold text-white/70">That&apos;s the whole conversation.</p>

          <div className="mx-auto mt-10 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-2">
            {terms.map((term) => (
              <div
                key={term.label}
                className="rounded-2xl border border-white/10 bg-white/5 p-5 text-left backdrop-blur-sm"
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-white/45">{term.label}</p>
                <p className="mt-1.5 text-sm font-semibold text-white">{term.value}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="flex flex-col gap-10">
          <SectionHeading
            eyebrow="Design by Rentico"
            title="Three packages, one guest-ready standard"
            description="Furnishing and styling tuned to the nightly rate you're aiming for."
            align="center"
          />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {packages.map((pkg, i) => (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`relative flex flex-col gap-4 rounded-2xl border p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                  pkg.featured
                    ? "border-orange-300 bg-orange-50/40"
                    : "border-navy-900/8 bg-white hover:border-orange-200"
                }`}
              >
                {pkg.featured && (
                  <div className="absolute -top-3 right-7">
                    <Badge>Top Tier</Badge>
                  </div>
                )}
                <span
                  className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold ${
                    pkg.featured ? "bg-orange-500 text-white" : "bg-navy-900/5 text-navy-900/50"
                  }`}
                >
                  {i + 1}
                </span>
                <h3 className="text-lg font-bold text-navy-900">{pkg.name}</h3>
                <p className="text-sm leading-relaxed text-navy-900/60">{pkg.description}</p>
              </motion.div>
            ))}
          </div>

          <Button
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            size="lg"
            icon={<MessageCircle className="h-4 w-4" />}
            className="mx-auto w-fit"
          >
            Ask about our packages
          </Button>
        </div>
      </Container>
    </section>
  );
}
