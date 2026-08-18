"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import { Testimonial } from "@/lib/types";

const AUTOPLAY_MS = 5000;

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

interface WhatPeopleSayContent {
  eyebrow: string;
  title: string;
  description: string;
}

export default function Testimonials({
  testimonials,
  eyebrow,
  title,
  description,
}: WhatPeopleSayContent & { testimonials: Testimonial[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (paused || reducedMotion || testimonials.length <= 1) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused, reducedMotion, testimonials.length]);

  const visible = Array.from({ length: Math.min(3, testimonials.length) }, (_, i) => {
    const t = testimonials[(index + i) % testimonials.length];
    return { ...t, slot: i };
  });

  const goTo = (i: number) => setIndex(((i % testimonials.length) + testimonials.length) % testimonials.length);

  if (testimonials.length === 0) return null;

  return (
    <section className="bg-navy-50/40 py-20 sm:py-28">
      <Container className="flex flex-col gap-14">
        <SectionHeading eyebrow={eyebrow} title={title} description={description} align="center" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-8"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {visible.map((t) => (
              <div key={t.slot} className={t.slot === 0 ? "" : "hidden lg:block"}>
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.div
                    key={t.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.5 }}
                    className="flex h-full flex-col gap-5 rounded-2xl border border-navy-900/8 bg-white p-6"
                  >
                    <div className="flex items-center justify-between">
                      <Quote className="h-7 w-7 text-orange-200" fill="currentColor" strokeWidth={0} />
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: t.rating }).map((_, idx) => (
                          <Star key={idx} className="h-3.5 w-3.5 fill-orange-500 text-orange-500" />
                        ))}
                      </div>
                    </div>

                    <p className="text-sm leading-relaxed text-navy-900/70">&ldquo;{t.quote}&rdquo;</p>

                    <div className="mt-auto flex items-center gap-3 border-t border-navy-900/8 pt-4">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy-950 text-xs font-bold text-white">
                        {initials(t.name)}
                      </span>
                      <div>
                        <p className="text-sm font-bold text-navy-900">{t.name}</p>
                        <p className="text-xs text-navy-900/50">{t.role}</p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-3 sm:gap-6">
            <button
              type="button"
              onClick={() => goTo(index - 1)}
              aria-label="Previous testimonial"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-navy-900/10 bg-white text-navy-900/60 transition-colors hover:border-orange-300 hover:text-orange-600"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <div className="flex flex-wrap items-center justify-center">
              {testimonials.map((t, i) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className="group flex h-8 w-5 items-center justify-center sm:w-6"
                >
                  <span
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === index ? "w-5 bg-orange-500 sm:w-6" : "w-1.5 bg-navy-900/15 group-hover:bg-navy-900/30"
                    }`}
                  />
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => goTo(index + 1)}
              aria-label="Next testimonial"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-navy-900/10 bg-white text-navy-900/60 transition-colors hover:border-orange-300 hover:text-orange-600"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
