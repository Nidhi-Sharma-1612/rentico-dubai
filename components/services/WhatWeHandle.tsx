"use client";

import { motion } from "framer-motion";
import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import { resolveIcon } from "@/lib/icons";

interface WhatWeHandleContent {
  eyebrow: string;
  title: string;
  description: string;
  items: { icon: string; title: string; description: string }[];
}

export default function WhatWeHandle({ eyebrow, title, description, items }: WhatWeHandleContent) {
  return (
    <section className="bg-navy-50/40 py-20 sm:py-28">
      <Container className="flex flex-col gap-14">
        <SectionHeading eyebrow={eyebrow} title={title} description={description} align="center" />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {items.map((item, i) => {
            const Icon = resolveIcon(item.icon);
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (i % 2) * 0.08 }}
                className="group flex flex-col gap-3 rounded-2xl border border-navy-900/8 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-xl sm:p-7"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-orange-600 transition-colors duration-300 group-hover:bg-orange-500 group-hover:text-white">
                  <Icon className="h-5.5 w-5.5" />
                </span>
                <h3 className="text-lg font-bold text-navy-900">{item.title}</h3>
                <p className="text-sm leading-relaxed text-navy-900/60">{item.description}</p>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
