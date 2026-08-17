"use client";

import { motion } from "framer-motion";
import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import FAQAccordion from "@/components/shared/FAQAccordion";
import { FAQ as FAQType } from "@/lib/types";

export default function ExperienceFAQ({ faqs }: { faqs: FAQType[] }) {
  return (
    <section className="py-20 sm:py-28">
      <Container className="flex flex-col gap-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto flex max-w-2xl flex-col items-center gap-5 text-center"
        >
          <SectionHeading eyebrow="FAQ" title="Questions guests ask us" align="center" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mx-auto w-full max-w-3xl"
        >
          <FAQAccordion faqs={faqs} variant="flat" />
        </motion.div>
      </Container>
    </section>
  );
}
