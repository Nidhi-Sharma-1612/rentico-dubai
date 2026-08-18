"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { CheckCircle2, MessageCircle } from "lucide-react";
import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import Button from "@/components/shared/Button";
import Badge from "@/components/shared/Badge";
import { resolveIcon } from "@/lib/icons";

const WHATSAPP_TEXT =
  "Hi%20Rentico%2C%20I%27d%20like%20to%20ask%20about%20your%20Design%20by%20Rentico%20packages.";

// Detail-shot thumbnail strips aren't exposed in the admin editor yet (kept
// out of scope alongside the rest of this section's decorative imagery) —
// fixed here so the existing page design doesn't change.
const THUMBNAILS: Record<"essential" | "elevated" | "signature", string[]> = {
  essential: [
    "https://images.unsplash.com/photo-1760722974657-f64bce2f9cc5?q=80&w=300&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1630660664869-c9d3cc676880?q=80&w=300&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1601276869861-8602a77c6871?q=80&w=300&auto=format&fit=crop",
  ],
  elevated: [
    "https://images.unsplash.com/photo-1776764586882-8ae3439e7612?q=80&w=300&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1638127815875-d8c930a8d467?q=80&w=300&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1694378060976-66ee61c4f427?q=80&w=300&auto=format&fit=crop",
  ],
  signature: [
    "https://images.unsplash.com/photo-1566041510394-cf7c8fe21800?q=80&w=300&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1640280882429-204f63d777e7?q=80&w=300&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1698746043955-42b03ddedfcb?q=80&w=300&auto=format&fit=crop",
  ],
};

interface PricingDesignContent {
  eyebrow: string;
  title: string;
  description: string;
  buttonLabel: string;
  essentialName: string;
  essentialSubtitle: string;
  essentialDescription: string;
  essentialImage: string;
  essentialPerfectFor: string;
  essentialChecklist: string[];
  elevatedName: string;
  elevatedSubtitle: string;
  elevatedDescription: string;
  elevatedImage: string;
  elevatedPerfectFor: string;
  elevatedChecklist: { icon: string; label: string }[];
  signatureName: string;
  signatureSubtitle: string;
  signatureDescription: string;
  signatureImage: string;
  signaturePerfectFor: string;
  signatureChecklist: string[];
}

export default function PricingAndDesign({
  whatsapp,
  eyebrow,
  title,
  description,
  buttonLabel,
  essentialName,
  essentialSubtitle,
  essentialDescription,
  essentialImage,
  essentialPerfectFor,
  essentialChecklist,
  elevatedName,
  elevatedSubtitle,
  elevatedDescription,
  elevatedImage,
  elevatedPerfectFor,
  elevatedChecklist,
  signatureName,
  signatureSubtitle,
  signatureDescription,
  signatureImage,
  signaturePerfectFor,
  signatureChecklist,
}: PricingDesignContent & { whatsapp: string }) {
  const packages = [
    {
      name: essentialName,
      subtitle: essentialSubtitle,
      description: essentialDescription,
      image: essentialImage,
      checklist: essentialChecklist,
      iconChecklist: undefined,
      perfectFor: essentialPerfectFor,
      thumbnails: THUMBNAILS.essential,
      featured: false,
    },
    {
      name: elevatedName,
      subtitle: elevatedSubtitle,
      description: elevatedDescription,
      image: elevatedImage,
      checklist: undefined,
      iconChecklist: elevatedChecklist,
      perfectFor: elevatedPerfectFor,
      thumbnails: THUMBNAILS.elevated,
      featured: true,
    },
    {
      name: signatureName,
      subtitle: signatureSubtitle,
      description: signatureDescription,
      image: signatureImage,
      checklist: signatureChecklist,
      iconChecklist: undefined,
      perfectFor: signaturePerfectFor,
      thumbnails: THUMBNAILS.signature,
      featured: false,
    },
  ];

  return (
    <section className="bg-navy-50/40 py-20 sm:py-28">
      <Container className="flex flex-col gap-16">
        <div className="flex flex-col gap-10">
          <SectionHeading eyebrow={eyebrow} title={title} description={description} align="center" />

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {packages.map((pkg, i) => {
              const dark = pkg.featured;
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
                        {pkg.iconChecklist.map((item) => {
                          const Icon = resolveIcon(item.icon);
                          return (
                            <li key={item.label} className="flex flex-col items-start gap-1.5">
                              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-orange-300">
                                <Icon className="h-3.5 w-3.5" />
                              </span>
                              <span className="text-xs leading-snug text-white/75">{item.label}</span>
                            </li>
                          );
                        })}
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
            {buttonLabel}
          </Button>
        </div>
      </Container>
    </section>
  );
}
