"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import Container from "@/components/shared/Container";
import { resolveIcon } from "@/lib/icons";

interface OwnerAppContent {
  eyebrow: string;
  headingLine1: string;
  headingLine2: string;
  description: string;
  points: string[];
  appEyebrow: string;
  appHeading: string;
  previewItems: { icon: string; label: string }[];
}

export default function OwnerApp({
  eyebrow,
  headingLine1,
  headingLine2,
  description,
  points,
  appEyebrow,
  appHeading,
  previewItems,
}: OwnerAppContent) {
  return (
    <section className="py-20 sm:py-28">
      <Container className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-6"
        >
          <span className="w-fit rounded-full bg-orange-50 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-orange-600">
            {eyebrow}
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl lg:text-[2.75rem]">
            {headingLine1}
            <span className="block italic text-navy-900/55">{headingLine2}</span>
          </h2>
          <p className="max-w-xl text-base leading-relaxed text-navy-900/60 sm:text-lg">{description}</p>

          <ul className="flex flex-col gap-3">
            {points.map((point) => (
              <li key={point} className="flex items-start gap-3 text-sm text-navy-900/70 sm:text-base">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-orange-500" />
                {point}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="overflow-hidden rounded-3xl bg-navy-950 p-8 sm:p-10"
        >
          <p className="text-xs font-semibold uppercase tracking-wider text-orange-300">{appEyebrow}</p>
          <p className="mt-2 text-xl font-bold text-white">{appHeading}</p>

          <div className="mt-8 grid grid-cols-2 gap-4">
            {previewItems.map((item) => {
              const Icon = resolveIcon(item.icon);
              return (
                <div
                  key={item.label}
                  className="flex flex-col items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500/15 text-orange-300">
                    <Icon className="h-5 w-5" />
                  </span>
                  <p className="text-sm font-semibold text-white/90">{item.label}</p>
                </div>
              );
            })}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
