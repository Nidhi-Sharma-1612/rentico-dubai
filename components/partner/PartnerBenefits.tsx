"use client";

import { motion } from "framer-motion";
import { Gift, Headset, PiggyBank, ShieldCheck, Smartphone, TrendingUp } from "lucide-react";
import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";

const benefits = [
  {
    icon: ShieldCheck,
    title: "Full Management",
    description: "From listing to guest checkout, we handle every operational detail of your property.",
  },
  {
    icon: Headset,
    title: "24/7 Support",
    description: "Our team is available around the clock for both owners and guests.",
  },
  {
    icon: PiggyBank,
    title: "Transparent 20% Fee",
    description: "One clear, all-inclusive management fee — no hidden charges, ever.",
  },
  {
    icon: Smartphone,
    title: "Owner App Access",
    description: "Track bookings, revenue and performance in real time from your phone.",
  },
  {
    icon: TrendingUp,
    title: "Higher Returns",
    description: "Short-term rentals typically outperform traditional annual leases in Dubai.",
  },
  {
    icon: Gift,
    title: "Referral Rewards",
    description: "Refer another owner to Rentico and earn rewards of up to AED 20,000.",
  },
];

export default function PartnerBenefits() {
  return (
    <section className="py-20 sm:py-28">
      <Container className="flex flex-col gap-14">
        <SectionHeading
          eyebrow="Why Partner With Rentico"
          title="Everything you need, none of the hassle"
          description="We manage your property like it's our own — so you get the returns of a short-term rental without the day-to-day work."
          align="center"
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group flex flex-col gap-3 rounded-2xl border border-navy-900/8 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-xl"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-orange-600 transition-colors duration-300 group-hover:bg-orange-500 group-hover:text-white">
                <b.icon className="h-5.5 w-5.5" />
              </span>
              <h3 className="text-base font-bold text-navy-900">{b.title}</h3>
              <p className="text-sm leading-relaxed text-navy-900/60">{b.description}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
