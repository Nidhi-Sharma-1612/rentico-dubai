"use client";

import { motion } from "framer-motion";
import { MessageCircle, Users, FileText, Eye, Wallet, Percent } from "lucide-react";
import Container from "@/components/shared/Container";
import Button from "@/components/shared/Button";

const WHATSAPP_TEXT = "Hi%20Rentico%2C%20I%27d%20like%20a%20free%20earnings%20estimate%20for%20my%20property.";

const perks = [
  { icon: Users, text: "Your own Owner Relationship Manager — not a call-centre queue" },
  { icon: FileText, text: "A transparent statement and payout on the 15th of every month" },
  { icon: Eye, text: "Live performance you can check any time, not a black box" },
  { icon: Wallet, text: "A flat, all-inclusive fee with nothing hidden or deducted by surprise" },
  { icon: Percent, text: "Transparent pricing — 20% of gross revenue" },
];

export default function WhyRentico({ whatsapp }: { whatsapp: string }) {
  return (
    <section className="py-20 sm:py-28">
      <Container className="grid grid-cols-1 gap-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-6"
        >
          <span className="w-fit rounded-full bg-orange-50 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-orange-600">
            Why Owners Hand Us the Keys
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl lg:text-[2.75rem]">
            We&apos;d rather earn your trust than impress you with badges.
          </h2>
          <p className="text-base leading-relaxed text-navy-900/60 sm:text-lg">
            Plenty of managers will show you a wall of logos. We&apos;d rather show you the numbers, the software,
            and the reporting — and let those do the convincing.
          </p>
          <p className="text-base leading-relaxed text-navy-900/60 sm:text-lg">
            Rentico is a licensed UAE short-term rental operator built for owners who treat their property as an
            asset, not a hobby. Now operating across both Dubai and Abu Dhabi, we bring the same standard to every
            home: dynamic pricing that moves with the market, a guest-experience standard that protects your
            reviews, and reporting clear enough that you always know exactly how your property is doing and exactly
            what you&apos;re being paid.
          </p>
          <p className="text-base leading-relaxed text-navy-900/60 sm:text-lg">
            We&apos;re selective on purpose. We take on homes we can genuinely make perform — because how your
            property does is a direct reflection of how we work.
          </p>
          <Button
            href={`https://wa.me/${whatsapp}?text=${WHATSAPP_TEXT}`}
            target="_blank"
            rel="noopener noreferrer"
            size="lg"
            icon={<MessageCircle className="h-4 w-4" />}
            className="w-fit"
          >
            Get my free earnings estimate
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-col gap-6"
        >
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-navy-900/50">What every owner gets</h3>
            <ul className="flex flex-col gap-4">
              {perks.map((p) => (
                <li
                  key={p.text}
                  className="flex items-start gap-3.5 rounded-2xl border border-navy-900/8 bg-white p-4 shadow-sm"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange-50 text-orange-600">
                    <p.icon className="h-4.5 w-4.5" />
                  </span>
                  <span className="pt-1.5 text-sm leading-snug text-navy-900/75">{p.text}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl bg-navy-950 p-6">
            <p className="text-sm leading-relaxed text-white/80">
              <span className="font-bold text-white">Skin in the game.</span> We own 16 apartments across Dubai
              outright — AED 45M+ — run to the exact same standard as yours.
            </p>
            <div className="mt-5 grid grid-cols-2 gap-4 border-t border-white/10 pt-5">
              <div>
                <p className="text-2xl font-extrabold text-orange-400">16</p>
                <p className="text-xs text-white/50">Apartments owned</p>
              </div>
              <div>
                <p className="text-2xl font-extrabold text-orange-400">AED 45M+</p>
                <p className="text-xs text-white/50">Owned outright</p>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
