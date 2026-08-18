"use client";

import { motion } from "framer-motion";
import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import { resolveIcon } from "@/lib/icons";

interface OperatorStatsContent {
  eyebrow: string;
  title: string;
  description: string;
  stats: { icon: string; value: string; description: string }[];
}

export default function OperatorStats({ eyebrow, title, description, stats }: OperatorStatsContent) {
  return (
    <section className="bg-navy-950 py-20 sm:py-28">
      <Container className="flex flex-col gap-14">
        <SectionHeading eyebrow={eyebrow} title={title} description={description} align="center" light />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((s, i) => {
            const Icon = resolveIcon(s.icon);
            return (
              <motion.div
                key={s.value}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:border-orange-400/40 hover:bg-white/10"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500/15 text-orange-300">
                  <Icon className="h-5 w-5" />
                </span>
                <p className="text-base font-bold text-white">{s.value}</p>
                <p className="text-sm leading-relaxed text-white/55">{s.description}</p>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
