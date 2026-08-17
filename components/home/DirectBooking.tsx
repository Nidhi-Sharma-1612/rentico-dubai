"use client";

import { motion } from "framer-motion";
import { ArrowRight, BadgeCheck, CheckCircle2, Quote } from "lucide-react";
import Container from "@/components/shared/Container";
import Button from "@/components/shared/Button";

const comparisonRows = [
  { label: "Nightly rate", direct: "15% less", other: "Platform rate" },
  { label: "Service fee", direct: "None", other: "Added at checkout" },
  { label: "Cancellation", direct: "Free up to 7 days before", other: "Varies, often stricter" },
  { label: "Who you speak to", direct: "Our Dubai team, on WhatsApp", other: "Platform messaging" },
  { label: "Early arrival, late departure", direct: "On request", other: "Rarely offered" },
];

export default function DirectBooking() {
  return (
    <section className="relative isolate overflow-hidden bg-navy-950 py-20 sm:py-28">
      <div className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-orange-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-orange-500/10 blur-3xl" />

      <Container className="relative flex flex-col gap-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-4"
        >
          <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-orange-300">
            <BadgeCheck className="h-3.5 w-3.5" />
            Booked direct
          </span>
          <h2 className="max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-[2.75rem]">
            The same home, without the middleman.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="overflow-hidden rounded-3xl border border-white/10 bg-white/3 backdrop-blur-sm"
        >
          <div className="grid grid-cols-[1.3fr_1.2fr_1fr] gap-4 border-b border-white/10 px-6 py-4 sm:px-8">
            <span />
            <span className="text-xs font-semibold uppercase tracking-wider text-orange-300 sm:text-sm">
              Direct with us
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-white/40 sm:text-sm">
              Airbnb / Booking.com
            </span>
          </div>
          {comparisonRows.map((row) => (
            <div
              key={row.label}
              className="grid grid-cols-[1.3fr_1.2fr_1fr] items-center gap-4 border-b border-white/10 px-6 py-5 transition-colors last:border-b-0 hover:bg-white/3 sm:px-8 sm:py-6"
            >
              <span className="text-sm text-white/60 sm:text-base">{row.label}</span>
              <span className="flex items-center gap-2 text-sm font-semibold text-white sm:text-base">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-orange-400" />
                {row.direct}
              </span>
              <span className="text-sm text-white/40 sm:text-base">{row.other}</span>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center"
        >
          <p className="flex items-start gap-2 italic text-white/70">
            <Quote className="mt-0.5 h-5 w-5 shrink-0 text-orange-400" fill="currentColor" strokeWidth={0} />
            Same apartments. Same team. Same standard. Fewer fees.
          </p>
          <Button href="/book-your-stay" variant="outline-light" icon={<ArrowRight className="h-4 w-4" />}>
            See all homes
          </Button>
        </motion.div>
      </Container>
    </section>
  );
}
