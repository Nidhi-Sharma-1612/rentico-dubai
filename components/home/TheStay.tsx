"use client";

import { motion } from "framer-motion";
import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import { resolveIcon } from "@/lib/icons";

interface TheStayContent {
  eyebrow: string;
  title: string;
  description: string;
  note: string;
  items: { icon: string; title: string; description: string }[];
}

export default function TheStay({ eyebrow, title, description, note, items }: TheStayContent) {
  return (
    <section className="py-20 sm:py-28">
      <Container className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-6"
        >
          <SectionHeading eyebrow={eyebrow} title={title} description={description} />
          <p className="text-sm italic leading-relaxed text-navy-900/50 sm:text-base">{note}</p>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {items.map((item, i) => {
            const Icon = resolveIcon(item.icon);
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group flex flex-col gap-3 rounded-2xl border border-navy-900/8 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-xl sm:p-7"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-orange-600 transition-colors duration-300 group-hover:bg-orange-500 group-hover:text-white">
                  <Icon className="h-6 w-6" strokeWidth={1.75} />
                </span>
                <p className="text-base font-bold text-navy-900 sm:text-lg">{item.title}</p>
                <p className="text-sm leading-relaxed text-navy-900/60">{item.description}</p>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
