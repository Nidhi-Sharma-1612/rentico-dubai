"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import Container from "@/components/shared/Container";
import Button from "@/components/shared/Button";
import FAQAccordion from "@/components/shared/FAQAccordion";
import { FAQ as FAQType } from "@/lib/types";

export default function FAQ({ faqs }: { faqs: FAQType[] }) {
  return (
    <section className="py-20 sm:py-28">
      <Container className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] lg:gap-20">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:sticky lg:top-28 lg:self-start"
        >
          <div className="flex flex-col gap-5">
            <span className="w-fit rounded-full bg-orange-50 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-orange-600">
              FAQ
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl lg:text-[2.75rem]">
              Common questions,
              <span className="block italic text-navy-900/55">answered clearly</span>
            </h2>
            <p className="max-w-sm text-base leading-relaxed text-navy-900/60">
              Can&apos;t find what you&apos;re looking for? Reach out directly and our team will be happy to help.
            </p>
            <Button
              href="/contact"
              variant="outline"
              icon={<MessageCircle className="h-4 w-4" />}
              className="w-fit"
            >
              Contact Us
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <FAQAccordion faqs={faqs} variant="flat" />
        </motion.div>
      </Container>
    </section>
  );
}
