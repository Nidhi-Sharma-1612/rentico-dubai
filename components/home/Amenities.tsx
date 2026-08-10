"use client";

import { motion } from "framer-motion";
import {
  Bath,
  BedDouble,
  Coffee,
  KeyRound,
  Monitor,
  Sparkles,
  UtensilsCrossed,
  Wifi,
} from "lucide-react";
import Container from "@/components/shared/Container";

const amenities = [
  { icon: Wifi, label: "High Speed Wifi" },
  { icon: Monitor, label: "Beautiful Workspaces" },
  { icon: Bath, label: "Bathroom Essentials" },
  { icon: BedDouble, label: "Fresh Linens" },
  { icon: UtensilsCrossed, label: "Equipped Kitchens" },
  { icon: KeyRound, label: "Self Check In" },
  { icon: Sparkles, label: "Professional Cleaning" },
  { icon: Coffee, label: "Coffee Machine" },
];

export default function Amenities() {
  return (
    <section className="bg-navy-50/40 py-16 sm:py-20">
      <Container className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[320px_1fr] lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-4"
        >
          <h2 className="text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl">
            Our Furnished Apartments Features
          </h2>
          <p className="text-base leading-relaxed text-navy-900/60">
            Whether you&apos;re working remotely, visiting for business, or settling
            into a new city, Rentico curates every home with the amenities that
            make it feel like yours.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-8 rounded-3xl border border-navy-900/8 bg-white p-6 shadow-sm sm:grid-cols-4 sm:gap-y-10 sm:p-10">
          {amenities.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="flex flex-col items-center gap-3 text-center"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-orange-50 text-orange-600">
                <item.icon className="h-6 w-6" strokeWidth={1.75} />
              </span>
              <p className="text-sm font-semibold text-navy-900">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
