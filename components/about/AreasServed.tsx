"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";

const areas = [
  {
    name: "Downtown Dubai",
    description: "Home to Burj Khalifa and Dubai Mall — the city's most iconic address.",
  },
  {
    name: "Business Bay",
    description: "Dubai's central business district, minutes from Downtown.",
  },
  {
    name: "Palm Jumeirah",
    description: "Iconic waterfront living with private beach access.",
  },
  {
    name: "Dubai Marina",
    description: "A vibrant waterfront community with skyline and marina views.",
  },
  {
    name: "Dubai Hills",
    description: "A modern master-planned community with golf-course views.",
  },
  {
    name: "Sobha Hartland",
    description: "A fast-growing waterfront community by Meydan, close to Downtown Dubai.",
  },
];

export default function AreasServed() {
  return (
    <section className="py-20 sm:py-28">
      <Container className="flex flex-col gap-14">
        <SectionHeading
          eyebrow="Where We Operate"
          title="Present across Dubai's most sought-after districts"
          align="center"
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {areas.map((area, i) => (
            <motion.div
              key={area.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group flex flex-col gap-3 rounded-2xl border border-navy-900/8 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-xl"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-orange-600 transition-colors duration-300 group-hover:bg-orange-500 group-hover:text-white">
                <MapPin className="h-5 w-5" />
              </span>
              <h3 className="text-base font-bold text-navy-900">{area.name}</h3>
              <p className="text-sm leading-relaxed text-navy-900/60">{area.description}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
