"use client";

import { motion } from "framer-motion";
import { ChevronDown, Star } from "lucide-react";
import Container from "@/components/shared/Container";
import BookingWidget from "@/components/shared/BookingWidget";
import HeroBackground from "@/components/home/HeroBackground";
import { resolveIcon } from "@/lib/icons";

interface HeroContent {
  badgeText: string;
  headingPrefix: string;
  headingHighlight: string;
  description: string;
  trustItems: { icon: string; title: string }[];
}

export default function Hero({
  unavailableDates,
  badgeText,
  headingPrefix,
  headingHighlight,
  description,
  trustItems,
}: HeroContent & { unavailableDates: string[] }) {
  return (
    <section className="relative isolate flex min-h-[calc(100vh-5rem)] flex-col justify-start overflow-hidden bg-navy-950 pt-36 pb-20 sm:pt-44 sm:pb-24 lg:pt-52 lg:pb-28">
      <HeroBackground />

      <Container className="flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold text-white/90 backdrop-blur"
        >
          <Star className="h-4 w-4 fill-orange-400 text-orange-400" />
          {badgeText}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-6 max-w-4xl text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl"
        >
          {headingPrefix} <span className="text-orange-400">{headingHighlight}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-5 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg"
        >
          {description}
        </motion.p>
      </Container>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="relative z-10 mx-auto mt-14 w-full max-w-6xl px-5 sm:px-8 lg:px-10"
      >
        <BookingWidget unavailableDates={unavailableDates} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="relative z-10 mx-auto mt-16 grid w-full max-w-6xl grid-cols-1 gap-3 px-5 sm:grid-cols-2 sm:px-8 lg:grid-cols-4 lg:px-10"
      >
        {trustItems.map((item) => {
          const Icon = resolveIcon(item.icon);
          return (
            <div
              key={item.title}
              className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-left backdrop-blur-sm"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange-500/15 text-orange-300">
                <Icon className="h-4.5 w-4.5" />
              </span>
              <span className="text-sm font-semibold text-white/85">{item.title}</span>
            </div>
          );
        })}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.9 }}
        className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-0.5 sm:bottom-8"
      >
        <span className="text-[10px] font-semibold uppercase leading-none tracking-widest text-white/40">
          Scroll
        </span>
        <ChevronDown className="h-4 w-4 animate-bounce text-white/40 motion-reduce:animate-none" />
      </motion.div>
    </section>
  );
}
