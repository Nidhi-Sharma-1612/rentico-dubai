"use client";

import { motion } from "framer-motion";
import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import { resolveIcon } from "@/lib/icons";

interface NoConflictContent {
  eyebrow: string;
  title: string;
  description: string;
  points: { icon: string; lead: string; text: string }[];
}

export default function NoConflictSection({ eyebrow, title, description, points }: NoConflictContent) {
  return (
    <section className="bg-navy-50/40 py-20 sm:py-28">
      <Container className="flex flex-col gap-12">
        <SectionHeading eyebrow={eyebrow} title={title} description={description} align="center" />

        <div className="mx-auto grid w-full max-w-4xl grid-cols-1 gap-5 sm:grid-cols-2">
          {points.map((p, i) => {
            const Icon = resolveIcon(p.icon);
            return (
              <motion.div
                key={p.lead}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="flex items-start gap-3.5 rounded-2xl border border-navy-900/8 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange-50 text-orange-600">
                  <Icon className="h-4.5 w-4.5" />
                </span>
                <p className="pt-1.5 text-sm leading-relaxed text-navy-900/70">
                  <span className="font-bold text-navy-900">{p.lead}</span> {p.text}
                </p>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
