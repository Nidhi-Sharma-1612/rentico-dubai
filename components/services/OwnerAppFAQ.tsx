"use client";

import { motion } from "framer-motion";
import { Calendar, FileText, CalendarOff, Headset, MessageCircle } from "lucide-react";
import Container from "@/components/shared/Container";
import Button from "@/components/shared/Button";
import FAQAccordion from "@/components/shared/FAQAccordion";
import { servicesFaqs } from "@/lib/data/faqs";

const WHATSAPP_HREF =
  "https://wa.me/971521460222?text=Hi%20Rentico%2C%20I%20have%20a%20question%20about%20managing%20my%20property.";

const features = [
  { icon: Calendar, title: "Calendar", description: "Real-time occupancy & earnings" },
  { icon: FileText, title: "Statement", description: "15th of every month" },
  { icon: CalendarOff, title: "Personal stays", description: "Block dates in seconds" },
  { icon: Headset, title: "Support", description: "Direct line, in-app" },
];

export default function OwnerAppFAQ() {
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
              Owner App
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl lg:text-[2.75rem]">
              Everything,
              <span className="block italic text-navy-900/55">in your pocket</span>
            </h2>
            <p className="max-w-sm text-base leading-relaxed text-navy-900/60">
              You don&apos;t have to wait for a monthly call. The Rentico Owner App puts your property&apos;s
              performance in your hands, live.
            </p>

            <ul className="grid grid-cols-2 gap-3">
              {features.map((f) => (
                <li
                  key={f.title}
                  className="flex flex-col gap-2 rounded-xl border border-navy-900/8 bg-white p-4"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-50 text-orange-600">
                    <f.icon className="h-4 w-4" />
                  </span>
                  <p className="text-sm font-bold text-navy-900">{f.title}</p>
                  <p className="text-xs text-navy-900/50">{f.description}</p>
                </li>
              ))}
            </ul>

            <div className="mt-2 flex flex-col gap-3 border-t border-navy-900/8 pt-6">
              <p className="text-sm text-navy-900/55">Can&apos;t find your answer below? We reply in minutes.</p>
              <Button
                href={WHATSAPP_HREF}
                target="_blank"
                rel="noopener noreferrer"
                variant="outline"
                icon={<MessageCircle className="h-4 w-4" />}
                className="w-fit"
              >
                Chat with us
              </Button>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <FAQAccordion faqs={servicesFaqs} variant="flat" />
        </motion.div>
      </Container>
    </section>
  );
}
