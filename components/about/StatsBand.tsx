"use client";

import { motion } from "framer-motion";
import Container from "@/components/shared/Container";

interface StatsBandContent {
  stats: { value: string; label: string }[];
}

export default function StatsBand({ stats }: StatsBandContent) {
  return (
    <section className="bg-navy-950 py-16 sm:py-20">
      <Container>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex flex-col items-center text-center"
            >
              <p className="text-3xl font-extrabold text-orange-400 sm:text-4xl">{s.value}</p>
              <p className="mt-2 text-sm text-white/60">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
