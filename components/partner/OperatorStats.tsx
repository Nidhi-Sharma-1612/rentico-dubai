"use client";

import { motion } from "framer-motion";
import { Banknote, Building2, Link2, PiggyBank, Smartphone, Star } from "lucide-react";
import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";

const stats = [
  {
    icon: Building2,
    value: "20+ homes managed",
    description: "Across 6 districts in Dubai and Abu Dhabi, under DET and DCT licence.",
  },
  {
    icon: Star,
    value: "4.9★ Superhost",
    description: "Your client's reviews are your reputation too.",
  },
  {
    icon: PiggyBank,
    value: "16 apartments owned",
    description: "AED 45M+ owned outright, run to the exact same standard as yours.",
  },
  {
    icon: Link2,
    value: "Direct relationships",
    description: "Built on direct relationships, not app-store algorithms.",
  },
  {
    icon: Smartphone,
    value: "Owner App",
    description: "Live calendar, statements and payouts — so your client never has to chase us, or you.",
  },
  {
    icon: Banknote,
    value: "Paid on time, always",
    description: "Bank transfer with a written commission statement, every time.",
  },
];

export default function OperatorStats() {
  return (
    <section className="bg-navy-950 py-20 sm:py-28">
      <Container className="flex flex-col gap-14">
        <SectionHeading
          eyebrow="Why Partners Send Us Properties"
          title="The operator behind the referral"
          description="Your name is attached to whoever you recommend. Here's what you'd be putting it next to."
          align="center"
          light
        />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((s, i) => (
            <motion.div
              key={s.value}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:border-orange-400/40 hover:bg-white/10"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500/15 text-orange-300">
                <s.icon className="h-5 w-5" />
              </span>
              <p className="text-base font-bold text-white">{s.value}</p>
              <p className="text-sm leading-relaxed text-white/55">{s.description}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
