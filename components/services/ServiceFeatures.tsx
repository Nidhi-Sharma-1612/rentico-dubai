"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import { Service } from "@/lib/types";
import { serviceIconMap } from "@/components/services/iconMap";
import { serviceImages } from "@/lib/data/serviceImages";

export default function ServiceFeatures({ service }: { service: Service }) {
  const Icon = serviceIconMap[service.icon];
  const image = serviceImages[service.slug];

  return (
    <section className="py-20 sm:py-28">
      <Container className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-20">
        {image && (
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative aspect-4/5 w-full overflow-hidden rounded-3xl">
              <Image
                src={image}
                alt={service.name}
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
            {Icon && (
              <div className="absolute -bottom-6 -right-6 hidden items-center gap-3 rounded-2xl bg-navy-900 p-5 text-white shadow-xl sm:flex">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-500/15 text-orange-400">
                  <Icon className="h-5.5 w-5.5" strokeWidth={1.75} />
                </span>
                <p className="max-w-36 text-sm font-semibold leading-snug">{service.name}</p>
              </div>
            )}
          </motion.div>
        )}

        <div className={`flex flex-col gap-10 ${image ? "order-1 lg:order-2" : ""}`}>
          <SectionHeading
            eyebrow="What's Included"
            title={`Everything covered under ${service.name}`}
            description={service.description}
          />

          <div className="flex flex-col gap-4">
            {service.features.map((feature, i) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="flex items-center gap-4 rounded-xl border border-navy-900/8 bg-white p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-orange-200 hover:shadow-md"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
                  <CheckCircle2 className="h-5.5 w-5.5" strokeWidth={1.75} />
                </span>
                <span className="text-sm font-semibold text-navy-900 sm:text-base">{feature}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
