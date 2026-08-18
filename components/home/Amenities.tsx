"use client";

import { motion } from "framer-motion";
import Container from "@/components/shared/Container";
import { resolveIcon } from "@/lib/icons";

interface AmenitiesContent {
  heading: string;
  description: string;
  items: { icon: string; label: string }[];
}

export default function Amenities({ heading, description, items }: AmenitiesContent) {
  return (
    <section className="bg-navy-50/40 py-16 sm:py-20">
      <Container className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[320px_1fr] lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-4"
        >
          <h2 className="text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl">{heading}</h2>
          <p className="text-base leading-relaxed text-navy-900/60">{description}</p>
        </motion.div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-8 rounded-3xl border border-navy-900/8 bg-white p-6 shadow-sm sm:grid-cols-4 sm:gap-y-10 sm:p-10">
          {items.map((item, i) => {
            const Icon = resolveIcon(item.icon);
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="flex flex-col items-center gap-3 text-center"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-orange-50 text-orange-600">
                  <Icon className="h-6 w-6" strokeWidth={1.75} />
                </span>
                <p className="text-sm font-semibold text-navy-900">{item.label}</p>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
