"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";

export default function Story() {
  return (
    <section className="py-20 sm:py-28">
      <Container className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-6"
        >
          <SectionHeading
            eyebrow="Our Story"
            title="Built for owners and guests who expect more"
            description="Rentico was founded in 2025 in Dubai with a simple premise: short-term rentals should feel effortless for owners and exceptional for guests — without the fees and friction of third-party platforms."
          />
          <p className="text-sm leading-relaxed text-navy-900/60 sm:text-base">
            Today we manage a growing portfolio of luxury homes across Downtown Dubai,
            Business Bay, Palm Jumeirah, Dubai Marina, Dubai Hills and Sobha Hartland. Every property is
            professionally cleaned, styled and maintained to a standard that consistently
            earns a 4.9-star guest rating — while owners get transparent reporting and a
            direct line to our team, always.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative aspect-4/5 w-full overflow-hidden rounded-3xl"
        >
          <Image
            src="https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?q=80&w=1400&auto=format&fit=crop"
            alt="A Rentico-managed home, styled and maintained to a 5-star standard"
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover"
          />
        </motion.div>
      </Container>
    </section>
  );
}
