"use client";

import { motion } from "framer-motion";
import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";

const steps = [
  { title: "Share Your Property", description: "Tell us the location, size and configuration of your home." },
  { title: "Get a Revenue Estimate", description: "We provide a free, data-backed projection of potential earnings." },
  { title: "Onboard & Launch", description: "We prepare, photograph and list your property across all channels." },
  { title: "Earn & Track", description: "Sit back while we manage guests — track performance anytime via the owner app." },
];

export default function PartnerSteps() {
  return (
    <section className="bg-navy-950 py-20 sm:py-28">
      <Container className="flex flex-col gap-14">
        <SectionHeading
          eyebrow="How It Works"
          title="From first message to first booking"
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
                {i + 1}
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
