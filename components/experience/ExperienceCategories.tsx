"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Container from "@/components/shared/Container";
import { resolveIcon } from "@/lib/icons";

interface CategoryItem {
  icon: string;
  category: string;
  title: string;
  alt: string;
  description: string;
  image: string;
}

export default function ExperienceCategories({ items }: { items: CategoryItem[] }) {
  return (
    <div className="flex flex-col">
      {items.map((item, i) => {
        const Icon = resolveIcon(item.icon);
        const number = String(i + 1).padStart(2, "0");
        const textBlock = (
          <motion.div
            key="text"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-4"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-orange-50 text-orange-600">
                <Icon className="h-5 w-5" strokeWidth={1.75} />
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-orange-600">
                {item.category}
              </span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-navy-900 sm:text-3xl lg:text-4xl">
              {item.title}
            </h2>
            <p className="max-w-lg text-base leading-relaxed text-navy-900/60 sm:text-lg">{item.description}</p>
          </motion.div>
        );

        const imageBlock = (
          <motion.div
            key="image"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="group relative aspect-4/3 w-full overflow-hidden rounded-3xl shadow-lg"
          >
            <Image
              src={item.image}
              alt={item.alt}
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <span className="absolute left-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-sm font-bold text-navy-900 backdrop-blur-sm">
              {number}
            </span>
          </motion.div>
        );

        return (
          <section key={item.title} className={i % 2 === 0 ? "py-20 sm:py-24" : "bg-navy-50/40 py-20 sm:py-24"}>
            <Container className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
              {i % 2 === 0 ? (
                <>
                  {textBlock}
                  {imageBlock}
                </>
              ) : (
                <>
                  {imageBlock}
                  {textBlock}
                </>
              )}
            </Container>
          </section>
        );
      })}
    </div>
  );
}
