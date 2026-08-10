"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Sparkles, XCircle } from "lucide-react";
import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";

const traditional = [
  "Fixed rent locked in for 12 months, regardless of demand",
  "Vacant periods between tenants earn nothing",
  "You coordinate maintenance, cleaning and disputes yourself",
  "No flexibility to use the property yourself",
];

const managed = [
  "Dynamic pricing captures peak Dubai demand",
  "Guest turnover fully handled — no vacancy admin",
  "Cleaning, maintenance and 24/7 guest support included",
  "Use your own home whenever you like, fee-free",
  "One transparent 20% fee, tracked in your owner app",
];

export default function PMComparison() {
  return (
    <section className="bg-navy-50/40 py-20 sm:py-28">
      <Container className="flex flex-col gap-14">
        <SectionHeading
          eyebrow="Short-Term vs. Long-Term"
          title="Why owners switch to short-term management"
          description="Short-term rental income in Dubai's prime districts typically outperforms a traditional annual lease — without you giving up flexibility."
          align="center"
        />

        <div className="mx-auto grid w-full max-w-4xl grid-cols-1 gap-6 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-5 rounded-2xl border border-navy-900/8 bg-white p-7 sm:p-8"
          >
            <h3 className="text-base font-bold text-navy-900/70">
              Traditional Annual Lease
            </h3>
            <ul className="flex flex-col gap-3">
              {traditional.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-navy-900/55">
                  <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-navy-900/25" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative flex flex-col gap-5 rounded-2xl bg-navy-900 p-7 shadow-xl ring-1 ring-orange-500/30 lg:-translate-y-3 sm:p-8"
          >
            <span className="absolute -top-3.5 left-7 flex items-center gap-1.5 rounded-full bg-orange-500 px-3.5 py-1 text-xs font-semibold text-white">
              <Sparkles className="h-3.5 w-3.5" />
              Recommended
            </span>
            <h3 className="text-base font-bold text-white">
              Rentico Managed Short-Term Rental
            </h3>
            <ul className="flex flex-col gap-3">
              {managed.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-white/80">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-orange-400" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
