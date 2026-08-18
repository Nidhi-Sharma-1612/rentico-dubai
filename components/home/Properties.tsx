"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import Button from "@/components/shared/Button";
import PropertyCard from "@/components/shared/PropertyCard";
import { Property } from "@/lib/types";

interface FeaturedHomesContent {
  eyebrow: string;
  title: string;
  description: string;
  buttonLabel: string;
  buttonHref: string;
}

export default function Properties({
  properties,
  eyebrow,
  title,
  description,
  buttonLabel,
  buttonHref,
}: FeaturedHomesContent & { properties: Property[] }) {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading eyebrow={eyebrow} title={title} description={description} />
          <Button
            href={buttonHref}
            variant="outline"
            icon={<ArrowRight className="h-4 w-4" />}
            className="hidden sm:inline-flex"
          >
            {buttonLabel}
          </Button>
        </div>

        {properties.length === 0 ? (
          <p className="mt-12 rounded-2xl border border-navy-900/8 bg-navy-50/40 p-10 text-center text-sm text-navy-900/60">
            Our live listings are temporarily unavailable — please check back
            shortly, or view our{" "}
            <a
              href="/book-your-stay"
              className="font-semibold text-orange-600 hover:underline"
            >
              full portfolio
            </a>
            .
          </p>
        ) : (
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {properties.map((property, i) => {
              const isOrphan =
                properties.length % 2 !== 0 && i === properties.length - 1;
              return (
                <motion.div
                  key={property.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={
                    isOrphan ? "sm:col-span-2 lg:col-span-1" : undefined
                  }
                >
                  <PropertyCard property={property} />
                </motion.div>
              );
            })}
          </div>
        )}

        <Button
          href={buttonHref}
          variant="outline"
          icon={<ArrowRight className="h-4 w-4" />}
          className="mt-10 flex w-full justify-center sm:hidden"
        >
          {buttonLabel}
        </Button>
      </Container>
    </section>
  );
}
