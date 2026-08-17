"use client";

import { motion } from "framer-motion";
import { Car, Clock, ShoppingCart, Star } from "lucide-react";
import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";

const stayItems = [
  {
    icon: Car,
    title: "Airport transfer and chauffeur",
    description: "Met on arrival, and a car with driver for as long as you need one.",
  },
  {
    icon: Clock,
    title: "Early arrival, late departure",
    description: "Whenever the calendar allows.",
  },
  {
    icon: ShoppingCart,
    title: "Housekeeping and grocery stocking",
    description: "A clean pathway through longer stays, and the fridge filled before you land.",
  },
  {
    icon: Star,
    title: "Beyond the apartment",
    description: "Desert, yacht, private tours, and a chef to cook in your kitchen.",
  },
];

export default function TheStay() {
  return (
    <section className="py-20 sm:py-28">
      <Container className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-6"
        >
          <SectionHeading
            eyebrow="The Stay"
            title="Whatever the stay requires."
            description="A car waiting at the airport. Groceries in the fridge before you land. A chef for an evening at home, a yacht for the morning, a later departure when the flight moves. Ask in advance or midway through — most of it we can arrange the same day."
          />
          <p className="text-sm italic leading-relaxed text-navy-900/50 sm:text-base">
            Some of it is complimentary, some is at cost through our partners.
            We&apos;ll always tell you which.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {stayItems.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group flex flex-col gap-3 rounded-2xl border border-navy-900/8 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-xl sm:p-7"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-orange-600 transition-colors duration-300 group-hover:bg-orange-500 group-hover:text-white">
                <item.icon className="h-6 w-6" strokeWidth={1.75} />
              </span>
              <p className="text-base font-bold text-navy-900 sm:text-lg">{item.title}</p>
              <p className="text-sm leading-relaxed text-navy-900/60">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
