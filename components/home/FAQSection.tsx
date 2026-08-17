"use client";

import { motion } from "framer-motion";
import { ArrowRight, Mail, Phone } from "lucide-react";
import Container from "@/components/shared/Container";
import Button from "@/components/shared/Button";
import FAQAccordion from "@/components/shared/FAQAccordion";
import { FAQ as FAQType } from "@/lib/types";

export default function FAQSection({ faqs, phone, email }: { faqs: FAQType[]; phone: string; email: string }) {
  const telHref = `tel:+${phone.replace(/\D/g, "")}`;

  return (
    <section className="py-20 sm:py-28">
      <Container className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:sticky lg:top-28 lg:self-start"
        >
          <div className="relative flex h-full flex-col items-center justify-center gap-6 overflow-hidden rounded-3xl bg-linear-to-br from-orange-500 to-orange-600 px-8 py-14 text-center sm:px-10">
            <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10" />
            <div className="absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-white/10" />

            <div className="relative flex flex-col items-center gap-6">
              <h2 className="max-w-sm text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                Your next level stay starts here
              </h2>
              <p className="max-w-sm text-base leading-relaxed text-white/85">
                Whether you&apos;re booking a stay or listing a property, the Rentico team is ready to help — speak
                to us today.
              </p>

              <div className="mt-2 flex flex-col items-center gap-3">
                <Button href="/book-your-stay" variant="secondary" size="lg" icon={<ArrowRight className="h-4 w-4" />}>
                  Book Your Stay
                </Button>
                <Button href="/become-a-partner" variant="white" size="lg">
                  List Your Property
                </Button>
              </div>

              <div className="mt-4 flex flex-col items-center gap-2 text-sm text-white/90">
                <a href={telHref} className="flex items-center gap-2 hover:text-white">
                  <Phone className="h-4 w-4" />
                  {phone}
                </a>
                <a href={`mailto:${email}`} className="flex items-center gap-2 hover:text-white">
                  <Mail className="h-4 w-4" />
                  {email}
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-col gap-8"
        >
          <div className="flex flex-col gap-3">
            <span className="w-fit rounded-full bg-orange-50 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-orange-600">
              FAQ
            </span>
            <h3 className="text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl">
              Common questions,
              <span className="block italic text-navy-900/55">answered clearly</span>
            </h3>
          </div>

          <FAQAccordion faqs={faqs} variant="flat" />
        </motion.div>
      </Container>
    </section>
  );
}
