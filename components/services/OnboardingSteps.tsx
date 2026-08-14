"use client";

import { motion } from "framer-motion";
import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";

const steps = [
  {
    title: "Discovery call",
    description:
      "Your Owner Relationship Manager walks the property with you — condition, potential, and an honest, data-backed number on what it can realistically earn.",
  },
  {
    title: "Onboarding & setup",
    description:
      "Professional photography, staging and furnishing recommendations, tourism-permit registration, and full multi-platform listing setup.",
  },
  {
    title: "Go live and start earning",
    description:
      "Your property launches across every major platform, fully optimised and priced to perform from day one.",
  },
  {
    title: "Ongoing partnership",
    description:
      "Daily pricing, 24/7 guest care, regular inspections, monthly reporting, and your dedicated contact on call.",
  },
];

export default function OnboardingSteps() {
  return (
    <section id="how-it-works" className="scroll-mt-24 bg-navy-950 py-20 sm:py-28">
      <Container className="flex flex-col gap-14">
        <SectionHeading
          eyebrow="How Onboarding Works"
          title="From first call to first payout"
          align="center"
          light
        />

        <div className="relative grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="pointer-events-none absolute top-9 left-0 right-0 hidden border-t border-dashed border-white/15 lg:block" />

          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange-400/40 hover:bg-white/10"
            >
              <span className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full bg-orange-500 text-sm font-bold text-white ring-4 ring-navy-950">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-base font-bold text-white">{step.title}</h3>
              <p className="text-sm leading-relaxed text-white/60">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
