"use client";

import { motion } from "framer-motion";
import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";

const steps = [
  {
    title: "Send us the property",
    description:
      "Use the form below, WhatsApp, or your partner dashboard. Building, size and the owner's contact — that's all we need. Registering first protects the referral for 90 days.",
  },
  {
    title: "We quote the owner",
    description:
      "We build a data-backed earnings projection from comparable units in that exact building and present it to the owner — with you named as the introducer.",
  },
  {
    title: "We onboard and launch",
    description:
      "Permits, furnishing, photography, listings across every channel. You do nothing. You get a note when the unit goes live.",
  },
  {
    title: "You get paid",
    description: "Bank transfer with a written commission statement. No chasing, no invoicing games, no “next month.”",
  },
];

export default function PartnerSteps() {
  return (
    <section className="py-20 sm:py-28">
      <Container className="flex flex-col gap-14">
        <SectionHeading
          eyebrow="How It Works"
          title="Four steps, most of them ours"
          description="Your work ends at step one."
          align="center"
        />

        <div className="relative grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="pointer-events-none absolute top-9 left-0 right-0 hidden border-t border-dashed border-navy-900/12 lg:block" />

          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative flex flex-col gap-3 rounded-2xl border border-navy-900/8 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-xl"
            >
              <span className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full bg-orange-500 text-sm font-bold text-white ring-4 ring-white">
                {i + 1}
              </span>
              <h3 className="text-base font-bold text-navy-900">{step.title}</h3>
              <p className="text-sm leading-relaxed text-navy-900/60">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
