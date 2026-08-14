"use client";

import { motion } from "framer-motion";
import { LineChart, Layers, Headset, Sparkles, Wrench, FileBarChart } from "lucide-react";
import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";

const items = [
  {
    icon: LineChart,
    title: "Dynamic, data-led pricing",
    description:
      "Your nightly rate isn't set once and forgotten. We price daily through PriceLabs — reading demand, seasonality, events, and live market data across both emirates — so your property captures peak rates and stays booked through the quieter weeks, not just the busy ones.",
  },
  {
    icon: Layers,
    title: "Multi-platform listings, optimised per channel",
    description:
      "Your home goes live on Airbnb, Booking.com, and the other major OTAs, plus direct booking — each listing written, shot, and tuned for that platform's guests. One property, managed as a portfolio of channels, all synced through Guesty so calendars never clash.",
  },
  {
    icon: Headset,
    title: "24/7 guest care, in minutes not hours",
    description:
      "Every enquiry, check-in, and midnight question is handled by our team, day or night, by phone and WhatsApp, with responses under 30 minutes.",
  },
  {
    icon: Sparkles,
    title: "Hotel-grade housekeeping & inspections",
    description:
      "Every turnover is cleaned to a hotel standard and inspected against a Breezeway checklist with time-stamped photos.",
  },
  {
    icon: Wrench,
    title: "Proactive maintenance",
    description:
      "Small issues get caught and fixed before a guest ever notices. Minor work is itemised on your statement; anything larger gets a quote and your approval first.",
  },
  {
    icon: FileBarChart,
    title: "Reporting you don't have to decode",
    description:
      "One clear monthly statement: occupancy, average nightly rate, revenue, fees, and net payout — plus what's on the books ahead.",
  },
];

export default function WhatWeHandle() {
  return (
    <section className="bg-navy-50/40 py-20 sm:py-28">
      <Container className="flex flex-col gap-14">
        <SectionHeading
          eyebrow="What We Handle"
          title="Every part of the operation, covered"
          description="From pricing to maintenance, nothing sits on your plate."
          align="center"
        />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i % 2) * 0.08 }}
              className="group flex flex-col gap-3 rounded-2xl border border-navy-900/8 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-xl sm:p-7"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-orange-600 transition-colors duration-300 group-hover:bg-orange-500 group-hover:text-white">
                <item.icon className="h-5.5 w-5.5" />
              </span>
              <h3 className="text-lg font-bold text-navy-900">{item.title}</h3>
              <p className="text-sm leading-relaxed text-navy-900/60">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
