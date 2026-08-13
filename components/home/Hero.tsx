"use client";

import { motion } from "framer-motion";
import { ChevronDown, Star } from "lucide-react";
import Container from "@/components/shared/Container";
import BookingWidget from "@/components/shared/BookingWidget";
import HeroBackground from "@/components/home/HeroBackground";

export default function Hero({ unavailableDates }: { unavailableDates: string[] }) {
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
          4.9 rated · 20+ homes across Dubai
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-6 max-w-4xl text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl"
        >
          Luxury Stays,{" "}
          <span className="text-orange-400">Handled With Care</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-5 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg"
        >
          Discover Dubai&apos;s finest luxury homes — booked direct for
          preferred rates, exclusive privileges, and a flawless stay from
          check-in to check-out.
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
