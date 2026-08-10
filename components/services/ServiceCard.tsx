"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Service } from "@/lib/types";
import { serviceIconMap } from "@/components/services/iconMap";
import { serviceImages } from "@/lib/data/serviceImages";

export default function ServiceCard({ service, delay = 0 }: { service: Service; delay?: number }) {
  const Icon = serviceIconMap[service.icon];
  const image = serviceImages[service.slug];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <Link
        href={`/services/${service.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-navy-900/8 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-xl"
      >
        {image && (
          <div className="relative h-44 w-full overflow-hidden">
            <Image
              src={image}
              alt={service.name}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {Icon && (
              <span className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white/95 text-navy-900 shadow-sm transition-colors group-hover:bg-orange-500 group-hover:text-white">
                <Icon className="h-5 w-5" />
              </span>
            )}
          </div>
        )}

        <div className="flex flex-1 flex-col gap-3 p-6">
          <h3 className="text-lg font-bold text-navy-900">{service.name}</h3>
          <p className="text-sm leading-relaxed text-navy-900/60">{service.shortDescription}</p>
          <span className="mt-auto flex items-center gap-1.5 pt-2 text-sm font-semibold text-orange-600">
            Learn more
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
