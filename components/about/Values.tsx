"use client";

import { motion } from "framer-motion";
import { Handshake, MapPinned, ShieldCheck, Sparkles } from "lucide-react";
import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";

const values = [
  {
    icon: Handshake,
    title: "Direct Relationships",
    description: "No app-store middlemen — just a direct line between us, owners and guests.",
  },
  {
    icon: ShieldCheck,
    title: "Transparency",
    description: "Clear pricing and honest reporting, always. No hidden fees, no surprises.",
  },
  {
    icon: Sparkles,
    title: "Hospitality-Grade Care",
    description: "Every home is cleaned, styled and maintained to a 5-star hotel standard.",
  },
  {
    icon: MapPinned,
    title: "Local Expertise",
    description: "Deep knowledge of Dubai's neighbourhoods, regulations and rental market.",
  },
];

export default function Values() {
  return (
    <section className="bg-navy-50/40 py-20 sm:py-28">
      <Container className="flex flex-col gap-14">
        <SectionHeading eyebrow="What Drives Us" title="The values behind every stay" align="center" />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group flex flex-col items-center gap-3 rounded-2xl border border-navy-900/8 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-xl"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-orange-600 transition-colors duration-300 group-hover:bg-orange-500 group-hover:text-white">
                <v.icon className="h-6 w-6" />
              </span>
              <h3 className="text-base font-bold text-navy-900">{v.title}</h3>
              <p className="text-sm leading-relaxed text-navy-900/60">{v.description}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
