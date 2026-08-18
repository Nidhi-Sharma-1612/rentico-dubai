"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, MessageCircle, Star, ShieldCheck, Timer, Smartphone } from "lucide-react";
import Container from "@/components/shared/Container";
import Button from "@/components/shared/Button";

const WHATSAPP_TEXT = "Hi%20Rentico%2C%20I%27d%20like%20a%20free%20earnings%20estimate%20for%20my%20property.";

const credibility = [
  { icon: ShieldCheck, label: "Licensed UAE operator" },
  { icon: Star, label: "4.97★ Airbnb Superhost" },
  { icon: Timer, label: "Under 30 min response, 24/7" },
  { icon: Smartphone, label: "Owner App — live calendar, statements & payouts" },
];

export default function ServicesHero({ whatsapp }: { whatsapp: string }) {
  return (
    <section className="relative overflow-hidden bg-navy-950 pb-20 pt-24 sm:pb-28 sm:pt-32">
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-orange-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-16 h-72 w-72 rounded-full bg-orange-500/10 blur-3xl" />

      <Container className="relative">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col items-start text-left">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-orange-300 backdrop-blur"
            >
              Short-Term &amp; Mid-Term Rental Management · Dubai &amp; Abu Dhabi
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl"
            >
              Your UAE property, run like an asset — not a hobby.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 max-w-xl text-base leading-relaxed text-white/65 sm:text-lg"
            >
              From furnishing and licensing to daily pricing and round-the-clock guest care, Rentico runs every part
              of the operation across Dubai and Abu Dhabi. You keep ownership and the returns; we handle everything
              between check-ins.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
            >
              <Button
                href={`https://wa.me/${whatsapp}?text=${WHATSAPP_TEXT}`}
                target="_blank"
                rel="noopener noreferrer"
                size="lg"
                icon={<MessageCircle className="h-4 w-4" />}
              >
                Get my free earnings estimate
              </Button>
              <Button
                href="#how-it-works"
                variant="outline-light"
                size="lg"
                icon={<ArrowRight className="h-4 w-4 -rotate-45" />}
              >
                See how it works
              </Button>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-orange-300/80"
            >
              Better stays. Better returns.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-4/5 w-full overflow-hidden rounded-3xl sm:aspect-square lg:aspect-6/5">
              <Image
                src="/DSC00523-HDR.jpg"
                alt="A Rentico-managed apartment bedroom with a Dubai skyline view"
                fill
                priority
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 hidden w-56 rounded-2xl bg-white p-5 shadow-xl sm:block">
              <p className="text-3xl font-extrabold text-orange-500">4.97★</p>
              <p className="mt-1 text-sm text-navy-900/60">Airbnb Superhost rating</p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {credibility.map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-5 text-left backdrop-blur-sm"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange-500/15 text-orange-300">
                <item.icon className="h-4.5 w-4.5" />
              </span>
              <span className="text-sm font-semibold text-white/85">{item.label}</span>
            </div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
