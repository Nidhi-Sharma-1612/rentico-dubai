"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  Armchair,
  BedDouble,
  CheckCircle2,
  ImageIcon,
  Lightbulb,
  MessageCircle,
  MonitorSpeaker,
  Palette,
  PanelTop,
  Sofa,
  Tv,
} from "lucide-react";
import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import Button from "@/components/shared/Button";
import Badge from "@/components/shared/Badge";

const WHATSAPP_TEXT =
  "Hi%20Rentico%2C%20I%27d%20like%20to%20ask%20about%20your%20Design%20by%20Rentico%20packages.";

const packages = [
  {
    name: "Essential",
    subtitle: "The complete base",
    description: "Clean, functional and fully furnished — everything a five-star stay needs.",
    image: "https://images.unsplash.com/photo-1704040686428-7534b262d0d8?q=80&w=1200&auto=format&fit=crop",
    checklist: [
      "Full furniture & furnishings",
      "Hotel-grade linen & towels",
      "Complete kitchen & appliance pack",
      "Full apartment paint & touch-ups",
      "Cushions, throws, rugs & artwork",
      "Procurement, delivery & assembly",
      "Styled, DTCM-ready handover",
    ],
    perfectFor: "First listings & smart budgets.",
    thumbnails: [
      "https://images.unsplash.com/photo-1760722974657-f64bce2f9cc5?q=80&w=300&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1630660664869-c9d3cc676880?q=80&w=300&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1601276869861-8602a77c6871?q=80&w=300&auto=format&fit=crop",
    ],
  },
  {
    name: "Elevated",
    subtitle: "Everything in Essential, plus",
    description: "Designer feature pieces and premium finishes that lift nightly rates and reviews.",
    image: "https://images.unsplash.com/photo-1757924461488-ef9ad0670978?q=80&w=1200&auto=format&fit=crop",
    iconChecklist: [
      { icon: Sofa, label: "Upgraded designer furniture" },
      { icon: Armchair, label: "Feature armchair & upholstered headboard" },
      { icon: Tv, label: "Floating media console + LED" },
      { icon: PanelTop, label: "Decorative wall mouldings" },
      { icon: Lightbulb, label: "Layered lighting scheme" },
      { icon: BedDouble, label: "Premium layered bedding & décor" },
      { icon: Palette, label: "Full design concept & moodboard" },
      { icon: ImageIcon, label: "Art, décor & accessories" },
      { icon: MonitorSpeaker, label: "Smart TV & soundbar" },
    ],
    perfectFor: "Owners chasing higher returns.",
    thumbnails: [
      "https://images.unsplash.com/photo-1776764586882-8ae3439e7612?q=80&w=300&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1638127815875-d8c930a8d467?q=80&w=300&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1694378060976-66ee61c4f427?q=80&w=300&auto=format&fit=crop",
    ],
    featured: true,
  },
  {
    name: "Signature",
    subtitle: "Everything in Elevated, plus",
    description: "Fully bespoke, luxury interiors built for top-tier, standout listings.",
    image: "https://images.unsplash.com/photo-1758957701419-2c6e266f7988?q=80&w=1200&auto=format&fit=crop",
    checklist: [
      "Bespoke, made-to-measure pieces",
      "Marble & premium finishes",
      "Sculpted feature media wall",
      "Feature joinery & wall panelling",
      "Luxury linen & designer textiles",
      "Gallery artwork & sculptural décor",
      "Dedicated lead designer",
    ],
    perfectFor: "Standout, premium properties.",
    thumbnails: [
      "https://images.unsplash.com/photo-1566041510394-cf7c8fe21800?q=80&w=300&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1640280882429-204f63d777e7?q=80&w=300&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1698746043955-42b03ddedfcb?q=80&w=300&auto=format&fit=crop",
    ],
  },
];

export default function PricingAndDesign({ whatsapp }: { whatsapp: string }) {
  return (
    <section className="bg-navy-50/40 py-20 sm:py-28">
      <Container className="flex flex-col gap-16">
        <div className="flex flex-col gap-10">
          <SectionHeading
            eyebrow="Design by Rentico"
            title="What each package includes."
            description="Each tier builds on the one before — every essential inclusion carries up, then adds more premium features for higher returns and five-star reviews."
            align="center"
          />

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {packages.map((pkg, i) => {
              const dark = Boolean(pkg.featured);
              return (
                <motion.div
                  key={pkg.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={`relative flex flex-col overflow-hidden rounded-2xl border shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                    dark ? "border-navy-900 bg-navy-950" : "border-navy-900/8 bg-white hover:border-orange-200"
                  }`}
                >
                  {pkg.featured && (
                    <div className="absolute right-4 top-4 z-10">
                      <Badge>Most Popular</Badge>
                    </div>
                  )}

                  <div className="flex flex-col gap-1.5 p-7 pb-0">
                    <h3 className={`text-2xl font-bold ${dark ? "text-white" : "text-navy-900"}`}>{pkg.name}</h3>
                    <p
                      className={`text-xs font-semibold uppercase tracking-wider ${
                        dark ? "text-white/45" : "text-navy-900/40"
                      }`}
                    >
                      {pkg.subtitle}
                    </p>
                    <p className={`text-sm font-bold ${dark ? "text-orange-300" : "text-orange-600"}`}>
                      Pricing on request
                    </p>
                  </div>

                  <div className="relative mx-7 mt-5 aspect-4/3 overflow-hidden rounded-xl">
                    <Image
                      src={pkg.image}
                      alt={`${pkg.name} package — furnished living room`}
                      fill
                      sizes="(min-width: 1024px) 33vw, 100vw"
                      className="object-cover"
                    />
                  </div>

                  <div className="flex flex-1 flex-col gap-5 p-7">
                    <p className={`text-sm leading-relaxed ${dark ? "text-white/70" : "text-navy-900/60"}`}>
                      {pkg.description}
                    </p>

                    {pkg.checklist && (
                      <div className="grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-2">
                        {[
                          pkg.checklist.slice(0, Math.ceil(pkg.checklist.length / 2)),
                          pkg.checklist.slice(Math.ceil(pkg.checklist.length / 2)),
                        ].map((column, ci) => (
                          <ul key={ci} className="flex flex-col gap-2.5">
                            {column.map((item) => (
                              <li
                                key={item}
                                className={`flex items-start gap-2 text-xs leading-snug ${
                                  dark ? "text-white/75" : "text-navy-900/70"
                                }`}
                              >
                                <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-orange-500" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        ))}
                      </div>
                    )}

                    {pkg.iconChecklist && (
                      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                        {pkg.iconChecklist.map((item) => (
                          <li key={item.label} className="flex flex-col items-start gap-1.5">
                            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-orange-300">
                              <item.icon className="h-3.5 w-3.5" />
                            </span>
                            <span className="text-xs leading-snug text-white/75">{item.label}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    <div
                      className={`mt-auto flex flex-col gap-3 border-t pt-5 ${
                        dark ? "border-white/10" : "border-navy-900/8"
                      }`}
                    >
                      <p className={`text-xs ${dark ? "text-white/50" : "text-navy-900/50"}`}>
                        <span className="font-bold uppercase tracking-wider">Perfect for</span>
                        <br />
                        {pkg.perfectFor}
                      </p>
                      <div className="grid grid-cols-3 gap-2">
                        {pkg.thumbnails.map((thumb, ti) => (
                          <div key={ti} className="relative aspect-square overflow-hidden rounded-lg">
                            <Image src={thumb} alt="" fill sizes="120px" className="object-cover" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <Button
            href={`https://wa.me/${whatsapp}?text=${WHATSAPP_TEXT}`}
            target="_blank"
            rel="noopener noreferrer"
            size="lg"
            icon={<MessageCircle className="h-4 w-4" />}
            className="mx-auto w-fit"
          >
            Ask about our packages
          </Button>
        </div>
      </Container>
    </section>
  );
}
