"use client";

import { motion } from "framer-motion";
import { Eye, Repeat, ShieldCheck, TrendingUp } from "lucide-react";
import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";

const points = [
  {
    icon: ShieldCheck,
    lead: "We are not a brokerage.",
    text: "Rentico holds a vacation-home rental licence, not a real estate brokerage licence. We are not permitted to sell your client's property even if we wanted to.",
  },
  {
    icon: Repeat,
    lead: "Sale enquiries come back to you.",
    text: "If your referred owner tells us they want to sell or buy, we route them to you by name — it's written into the partner agreement.",
  },
  {
    icon: Eye,
    lead: "You stay in the loop, if you want to be.",
    text: "Optional CC on the owner's monthly statement, so you can see the property performing and use it in your next pitch.",
  },
  {
    icon: TrendingUp,
    lead: "A managed unit is a better listing later.",
    text: "When your client does sell, they hand a buyer a performing asset with verified income history — an easier sale at a better price.",
  },
];

export default function NoConflictSection() {
  return (
    <section className="bg-orange-50/40 py-20 sm:py-28">
      <Container className="flex flex-col gap-12">
        <SectionHeading
          eyebrow="The Part Brokers Actually Worry About"
          title="We don't touch your client."
          description="Every broker who has ever been burned by a management company knows the story: you hand over an owner, and six months later that company is selling their next unit. Here's our written position."
          align="center"
        />

        <div className="mx-auto grid w-full max-w-4xl grid-cols-1 gap-5 sm:grid-cols-2">
          {points.map((p, i) => (
            <motion.div
              key={p.lead}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex items-start gap-3.5 rounded-2xl border border-navy-900/8 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange-50 text-orange-600">
                <p.icon className="h-4.5 w-4.5" />
              </span>
              <p className="pt-1.5 text-sm leading-relaxed text-navy-900/70">
                <span className="font-bold text-navy-900">{p.lead}</span> {p.text}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
