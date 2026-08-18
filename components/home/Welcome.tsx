"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";

interface WelcomeContent {
  stats: { value: string; label: string }[];
  points: string[];
  image: string;
}

export default function Welcome({ stats, points, image }: WelcomeContent) {
  return (
    <section className="bg-navy-50/40 py-20 sm:py-28">
      <Container className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="relative aspect-4/5 w-full overflow-hidden rounded-3xl">
            <Image
              src={image}
              alt="Luxury Dubai living room"
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -right-6 hidden w-56 rounded-2xl bg-navy-950 p-5 text-white shadow-xl sm:block">
            <p className="text-3xl font-extrabold text-orange-400">4.9★</p>
            <p className="mt-1 text-sm text-white/70">Average guest rating across all homes</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-6"
        >
          <SectionHeading
            eyebrow="Welcome to Rentico"
            title="A new standard for short-term stays in Dubai"
            description="Since 2025, Rentico has managed a growing portfolio of luxury homes across Dubai's most sought-after districts — built on direct relationships, not app store algorithms."
          />

          <ul className="flex flex-col gap-3">
            {points.map((p) => (
              <li key={p} className="flex items-start gap-3 text-sm text-navy-900/70 sm:text-base">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-orange-500" />
                {p}
              </li>
            ))}
          </ul>

          <div className="mt-4 grid grid-cols-2 gap-6 border-t border-navy-900/8 pt-6 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="text-2xl font-extrabold text-navy-900 sm:text-3xl">{s.value}</p>
                <p className="mt-1 text-xs text-navy-900/50 sm:text-sm">{s.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
