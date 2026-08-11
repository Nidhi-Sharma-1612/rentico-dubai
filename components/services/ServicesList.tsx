"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Container from "@/components/shared/Container";
import Button from "@/components/shared/Button";
import { services } from "@/lib/data/services";
import { serviceImages } from "@/lib/data/serviceImages";
import { serviceIconMap } from "@/components/services/iconMap";
import ServiceInquiryModal from "@/components/services/ServiceInquiryModal";
import { Service } from "@/lib/types";

export default function ServicesList() {
  const [activeService, setActiveService] = useState<Service | null>(null);

  return (
    <>
      {services.map((service, i) => {
        const Icon = serviceIconMap[service.icon];
        const image = serviceImages[service.slug];
        const reversed = i % 2 === 1;

        return (
          <section
            key={service.slug}
            id={service.slug}
            className={`scroll-mt-24 ${i % 2 === 0 ? "bg-white" : "bg-navy-50/40"}`}
          >
            <Container className="grid grid-cols-1 items-center gap-12 py-16 sm:py-20 lg:grid-cols-2 lg:gap-20">
              {image && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className={`group relative ${reversed ? "order-1 lg:order-2" : "order-1"}`}
                >
                  <div className="relative aspect-4/5 w-full overflow-hidden rounded-3xl shadow-xl shadow-navy-950/10">
                    <Image
                      src={image}
                      alt={service.name}
                      fill
                      sizes="(min-width: 1024px) 45vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <span
                    className={`absolute -bottom-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-500 text-lg font-extrabold text-white shadow-lg shadow-orange-500/25 ${
                      reversed ? "-right-5" : "-left-5"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </motion.div>
              )}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className={`flex flex-col gap-5 ${reversed ? "order-2 lg:order-1" : "order-2"}`}
              >
                {Icon && (
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
                    <Icon className="h-6 w-6" strokeWidth={1.75} />
                  </span>
                )}
                <h2 className="text-2xl font-bold tracking-tight text-navy-900 sm:text-3xl">
                  {service.name}
                </h2>
                <p className="max-w-lg text-base leading-relaxed text-navy-900/60">
                  {service.description}
                </p>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setActiveService(service)}
                  icon={<ArrowRight className="h-4 w-4" />}
                  className="w-fit"
                >
                  Explore {service.name}
                </Button>
              </motion.div>
            </Container>
          </section>
        );
      })}

      <ServiceInquiryModal service={activeService} onClose={() => setActiveService(null)} />
    </>
  );
}
