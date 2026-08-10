"use client";

import { motion } from "framer-motion";
import { BadgeDollarSign, Headset, Lock, ShieldCheck } from "lucide-react";
import Container from "@/components/shared/Container";

const items = [
  {
    icon: BadgeDollarSign,
    title: "Best Price Guarantee",
    description: "The lowest rate on every home, guaranteed when you book direct.",
  },
  {
    icon: ShieldCheck,
    title: "No Hidden Fees",
    description: "Transparent pricing from the first search — no surprise charges.",
  },
  {
    icon: Headset,
    title: "Direct Communication",
    description: "Instant access to our team before, during and after your stay.",
  },
  {
    icon: Lock,
    title: "Flexible & Secure",
    description: "Flexible dates and fully secure payments on every booking.",
  },
];

export default function TrustBar() {
  return (
    <section className="bg-navy-50/40 py-16 sm:py-20">
      <Container>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group flex flex-col gap-4 rounded-2xl border border-navy-900/8 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-xl sm:p-7"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-orange-600 transition-colors duration-300 group-hover:bg-orange-500 group-hover:text-white">
                <item.icon className="h-5.5 w-5.5" />
              </span>
              <div className="flex flex-col gap-1.5">
                <h3 className="text-base font-bold text-navy-900">{item.title}</h3>
                <p className="text-sm leading-relaxed text-navy-900/55">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
