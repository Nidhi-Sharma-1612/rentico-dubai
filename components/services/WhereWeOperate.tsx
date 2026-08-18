"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { MapPin, Quote, Star } from "lucide-react";
import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";

const OperatingMap = dynamic(() => import("./OperatingMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-navy-50 text-sm text-navy-900/40">
      Loading map…
    </div>
  ),
});

const dubaiAreas = ["Downtown", "Business Bay", "Marina", "Palm Jumeirah", "Dubai Hills", "MBR City", "JVC"];
const abuDhabiAreas = ["Saadiyat", "Yas", "Al Reem", "Al Raha Beach", "Corniche"];

interface WhereWeOperateContent {
  eyebrow: string;
  title: string;
  description: string;
  portfolioHeading: string;
  portfolioDescription: string;
  stats: { label: string; value: string; caption: string }[];
  resultsHeading: string;
  results: { quote: string; name: string; role: string }[];
}

function AreaList({ title, areas }: { title: string; areas: string[] }) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-navy-900/50">
        <MapPin className="h-4 w-4 text-orange-500" />
        {title}
      </h3>
      <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        {areas.map((area, i) => (
          <li
            key={area}
            className="flex items-center gap-3 rounded-xl border border-navy-900/8 bg-white px-4 py-3 text-sm font-semibold text-navy-900"
          >
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-50 text-xs font-bold text-orange-600">
              {i + 1}
            </span>
            {area}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function WhereWeOperate({
  eyebrow,
  title,
  description,
  portfolioHeading,
  portfolioDescription,
  stats,
  resultsHeading,
  results,
}: WhereWeOperateContent) {
  return (
    <section className="bg-navy-50/40 py-20 sm:py-28">
      <Container className="flex flex-col gap-16">
        <div className="flex flex-col gap-10">
          <SectionHeading eyebrow={eyebrow} title={title} description={description} align="center" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-8 rounded-3xl border border-navy-900/8 bg-white/60 p-6 sm:p-10"
          >
            <div className="h-85 w-full overflow-hidden rounded-2xl border border-navy-900/8 sm:h-100">
              <OperatingMap />
            </div>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              <AreaList title="Dubai" areas={dubaiAreas} />
              <AreaList title="Abu Dhabi" areas={abuDhabiAreas} />
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-8"
        >
          <div className="mx-auto max-w-2xl text-center">
            <h3 className="text-xl font-bold text-navy-900 sm:text-2xl">{portfolioHeading}</h3>
            <p className="mt-3 text-base leading-relaxed text-navy-900/60">{portfolioDescription}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-navy-900/8 bg-white p-4 text-center">
                <p className="text-xs font-semibold uppercase tracking-wider text-navy-900/40">{stat.label}</p>
                <p className="mt-1.5 text-base font-extrabold text-navy-900">{stat.value}</p>
                <p className="mt-0.5 text-xs text-navy-900/50">{stat.caption}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="flex flex-col gap-8">
          <h3 className="text-center text-xl font-bold text-navy-900 sm:text-2xl">{resultsHeading}</h3>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {results.map((r, i) => (
              <motion.div
                key={r.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex flex-col gap-4 rounded-2xl border border-navy-900/8 bg-white p-6 sm:p-7"
              >
                <div className="flex items-center justify-between">
                  <Quote className="h-7 w-7 text-orange-200" fill="currentColor" strokeWidth={0} />
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }, (_, star) => (
                      <Star key={star} className="h-3.5 w-3.5 text-orange-400" fill="currentColor" strokeWidth={0} />
                    ))}
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-navy-900/70">&ldquo;{r.quote}&rdquo;</p>
                <div className="mt-auto border-t border-navy-900/8 pt-4">
                  <p className="text-sm font-bold text-navy-900">{r.name}</p>
                  <p className="text-xs text-navy-900/50">{r.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
