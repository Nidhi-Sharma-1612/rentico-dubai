"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import Button from "@/components/shared/Button";
import PropertyCard from "@/components/shared/PropertyCard";
import { properties } from "@/lib/data/properties";

export default function Properties() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Featured Homes"
            title="Handpicked properties, ready to book"
            description="A glimpse of our current portfolio — every home professionally managed, cleaned and styled to a 5-star standard."
          />
          <Button href="/book-your-stay" variant="outline" icon={<ArrowRight className="h-4 w-4" />} className="hidden sm:inline-flex">
            View All Properties
          </Button>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {properties.map((property, i) => {
            const isOrphan = properties.length % 2 !== 0 && i === properties.length - 1;
            return (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={isOrphan ? "sm:col-span-2 lg:col-span-1" : undefined}
              >
                <PropertyCard property={property} />
              </motion.div>
            );
          })}
        </div>

        <Button href="/book-your-stay" variant="outline" icon={<ArrowRight className="h-4 w-4" />} className="mt-10 flex w-full justify-center sm:hidden">
          View All Properties
        </Button>
      </Container>
    </section>
  );
}
