"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Headset, PiggyBank, ShieldCheck, Smartphone } from "lucide-react";
import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import Button from "@/components/shared/Button";

const perks = [
  { icon: ShieldCheck, label: "Full management, start to finish" },
  { icon: Headset, label: "24/7 owner & guest support" },
  { icon: PiggyBank, label: "Transparent 20% management fee" },
  { icon: Smartphone, label: "Real-time owner app access" },
];

export default function PartnerCTA() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <div className="grid grid-cols-1 overflow-hidden rounded-3xl bg-navy-900 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center gap-6 p-8 sm:p-12 lg:p-14"
          >
            <SectionHeading
              eyebrow="Become a Partner"
              title="Turn your property into a high-performing asset"
              description="Earn more than a traditional lease with a team that manages every detail — while you stay fully informed with real-time reporting."
              light
            />

            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {perks.map((p) => (
                <li key={p.label} className="flex items-center gap-2.5 text-sm text-white/80">
                  <p.icon className="h-4.5 w-4.5 shrink-0 text-orange-400" />
                  {p.label}
                </li>
              ))}
            </ul>

            <Button href="/become-a-partner" size="lg" icon={<ArrowRight className="h-4 w-4" />} className="w-fit">
              Partner With Us
            </Button>
          </motion.div>

          <div className="relative min-h-[280px] lg:min-h-full">
            <Image
              src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1400&auto=format&fit=crop"
              alt="Dubai Marina skyline"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-l from-transparent to-navy-900/40 lg:hidden" />
          </div>
        </div>
      </Container>
    </section>
  );
}
