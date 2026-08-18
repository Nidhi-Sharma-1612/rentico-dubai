"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import Container from "@/components/shared/Container";
import Button from "@/components/shared/Button";
import { resolveIcon } from "@/lib/icons";

const WHATSAPP_TEXT = "Hi%20Rentico%2C%20I%27d%20like%20a%20free%20earnings%20estimate%20for%20my%20property.";

interface WhyRenticoContent {
  eyebrow: string;
  title: string;
  paragraphs: string[];
  buttonLabel: string;
  perksHeading: string;
  perks: { icon: string; text: string }[];
  skinInGameText: string;
  skinStat1Value: string;
  skinStat1Label: string;
  skinStat2Value: string;
  skinStat2Label: string;
}

export default function WhyRentico({
  whatsapp,
  eyebrow,
  title,
  paragraphs,
  buttonLabel,
  perksHeading,
  perks,
  skinInGameText,
  skinStat1Value,
  skinStat1Label,
  skinStat2Value,
  skinStat2Label,
}: WhyRenticoContent & { whatsapp: string }) {
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
            {eyebrow}
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl lg:text-[2.75rem]">{title}</h2>
          {paragraphs.map((p, i) => (
            <p key={i} className="text-base leading-relaxed text-navy-900/60 sm:text-lg">
              {p}
            </p>
          ))}
          <Button
            href={`https://wa.me/${whatsapp}?text=${WHATSAPP_TEXT}`}
            target="_blank"
            rel="noopener noreferrer"
            size="lg"
            icon={<MessageCircle className="h-4 w-4" />}
            className="w-fit"
          >
            {buttonLabel}
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
            <h3 className="text-sm font-bold uppercase tracking-wider text-navy-900/50">{perksHeading}</h3>
            <ul className="flex flex-col gap-4">
              {perks.map((p) => {
                const Icon = resolveIcon(p.icon);
                return (
                  <li
                    key={p.text}
                    className="flex items-start gap-3.5 rounded-2xl border border-navy-900/8 bg-white p-4 shadow-sm"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange-50 text-orange-600">
                      <Icon className="h-4.5 w-4.5" />
                    </span>
                    <span className="pt-1.5 text-sm leading-snug text-navy-900/75">{p.text}</span>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="rounded-2xl bg-navy-950 p-6">
            <p className="text-sm leading-relaxed text-white/80">
              <span className="font-bold text-white">Skin in the game.</span> {skinInGameText}
            </p>
            <div className="mt-5 grid grid-cols-2 gap-4 border-t border-white/10 pt-5">
              <div>
                <p className="text-2xl font-extrabold text-orange-400">{skinStat1Value}</p>
                <p className="text-xs text-white/50">{skinStat1Label}</p>
              </div>
              <div>
                <p className="text-2xl font-extrabold text-orange-400">{skinStat2Value}</p>
                <p className="text-xs text-white/50">{skinStat2Label}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
