"use client";

import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import Container from "@/components/shared/Container";
import Button from "@/components/shared/Button";
import FAQAccordion from "@/components/shared/FAQAccordion";
import { FAQ as FAQType } from "@/lib/types";

export default function ExperienceFAQSection({ faqs, whatsapp }: { faqs: FAQType[]; whatsapp: string }) {
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
                Tell us the occasion, we&apos;ll handle the rest.
              </h2>
              <p className="max-w-sm text-base leading-relaxed text-white/85">
                Message our concierge team with your dates and what you&apos;re after — we&apos;ll come back with
                options, same day.
              </p>

              <div className="mt-2 flex flex-col items-center gap-3">
                <Button
                  href={`https://wa.me/${whatsapp}?text=Hi%20Rentico%2C%20I%27d%20like%20to%20plan%20an%20experience%20for%20my%20stay.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="secondary"
                  size="lg"
                  icon={<MessageCircle className="h-4 w-4" />}
                >
                  Chat with us on WhatsApp
                </Button>
                <Button href="/book-your-stay" variant="white" size="lg" icon={<ArrowRight className="h-4 w-4" />}>
                  Book Your Stay
                </Button>
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
            <h3 className="text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl">Questions guests ask us</h3>
          </div>

          <FAQAccordion faqs={faqs} variant="flat" />
        </motion.div>
      </Container>
    </section>
  );
}
