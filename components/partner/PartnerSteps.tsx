"use client";

import { motion } from "framer-motion";
import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";

interface PartnerStepsContent {
  eyebrow: string;
  title: string;
  description: string;
  steps: { title: string; description: string }[];
}

export default function PartnerSteps({ eyebrow, title, description, steps }: PartnerStepsContent) {
  return (
    <section className="py-20 sm:py-28">
      <Container className="flex flex-col gap-14">
        <SectionHeading eyebrow={eyebrow} title={title} description={description} align="center" />

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
