"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  BadgeDollarSign,
  BarChart3,
  Headset,
  ShieldCheck,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import { Service } from "@/lib/types";

const featureIcons: LucideIcon[] = [
  TrendingUp,
  Headset,
  BarChart3,
  ShieldCheck,
  BadgeDollarSign,
];

export default function PMFeatures({ service }: { service: Service }) {
  return (
    <section className="py-20 sm:py-28">
      <Container className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative order-2 lg:order-1"
        >
          <div className="relative aspect-4/5 w-full overflow-hidden rounded-3xl">
            <Image
              src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1400&auto=format&fit=crop"
              alt="Professionally managed Dubai apartment interior"
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -right-6 hidden w-56 rounded-2xl bg-navy-900 p-5 text-white shadow-xl sm:block">
            <p className="text-3xl font-extrabold text-orange-400">20%</p>
            <p className="mt-1 text-sm text-white/70">
              One all-inclusive fee. No hidden costs, ever.
            </p>
          </div>
        </motion.div>

        <div className="order-1 flex flex-col gap-10 lg:order-2">
          <SectionHeading
            eyebrow="What's Included"
            title={`Everything covered under ${service.name}`}
            description={service.description}
          />

          <div className="flex flex-col gap-4">
            {service.features.map((feature, i) => {
              const Icon = featureIcons[i] ?? ShieldCheck;
              return (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="flex items-center gap-4 rounded-xl border border-navy-900/8 bg-white p-4"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
                    <Icon className="h-5.5 w-5.5" strokeWidth={1.75} />
                  </span>
                  <span className="text-sm font-semibold text-navy-900 sm:text-base">
                    {feature}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
