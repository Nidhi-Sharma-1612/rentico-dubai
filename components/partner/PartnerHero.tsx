"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { MessageCircle, ShieldOff, Timer, Users, Wallet } from "lucide-react";
import Container from "@/components/shared/Container";
import Button from "@/components/shared/Button";

const WHATSAPP_TEXT = "Hi%20Rentico%2C%20I%27d%20like%20to%20refer%20a%20property%20owner.";

// Placeholder — swap for the real partner count once available.
const stats = [
  { icon: Wallet, value: "Up to AED 20,000", label: "Per referral, paid on go-live" },
  { icon: Timer, value: "48 hours", label: "From referral to owner quote" },
  { icon: Users, value: "50+ partners", label: "Brokers & agencies referring" },
  { icon: ShieldOff, value: "Zero conflict", label: "We never list or sell your client's unit" },
];

export default function PartnerHero({ whatsapp }: { whatsapp: string }) {
  return (
    <section className="relative overflow-hidden bg-navy-950 pb-28 pt-16 sm:pb-32 sm:pt-20">
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
              Broker, Agent & Developer Partnerships
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl"
            >
              Send us a property. Keep your client. Get paid.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-4 max-w-xl text-base leading-relaxed text-white/65 sm:text-lg"
            >
              Rentico manages short-term rentals across Dubai and Abu Dhabi. You refer the owner, we run the
              property, and you earn a commission on every unit that goes live — without giving up the relationship.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-8 flex flex-col items-center gap-4 sm:flex-row"
            >
              <Button href="#calculator" variant="primary" size="lg">
                See what I&apos;d earn
              </Button>
              <Button
                href={`https://wa.me/${whatsapp}?text=${WHATSAPP_TEXT}`}
                target="_blank"
                rel="noopener noreferrer"
                variant="outline-light"
                size="lg"
                icon={<MessageCircle className="h-4 w-4" />}
              >
                WhatsApp us
              </Button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-4/5 w-full overflow-hidden rounded-3xl sm:aspect-square lg:aspect-3/2">
              <Image
                src="/DSC09792-HDR-copy.jpg"
                alt="A Rentico-managed apartment living area"
                fill
                priority
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 hidden w-56 rounded-2xl bg-white p-5 shadow-xl sm:block">
              <p className="text-3xl font-extrabold text-orange-500">AED 20,000</p>
              <p className="mt-1 text-sm text-navy-900/60">Up to, per referral</p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {stats.map((s) => (
            <div
              key={s.value}
              className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-left backdrop-blur-sm"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-500/15 text-orange-300">
                <s.icon className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-bold text-white sm:text-base">{s.value}</p>
                <p className="text-xs text-white/50">{s.label}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
