"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";

interface StoryContent {
  eyebrow: string;
  title: string;
  description: string;
  paragraph: string;
  image: string;
}

export default function Story({ eyebrow, title, description, paragraph, image }: StoryContent) {
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
          <SectionHeading eyebrow={eyebrow} title={title} description={description} />
          <p className="text-sm leading-relaxed text-navy-900/60 sm:text-base">{paragraph}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative aspect-4/5 w-full overflow-hidden rounded-3xl"
        >
          <Image
            src={image}
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
