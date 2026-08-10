"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import Container from "@/components/shared/Container";
import { testimonials } from "@/lib/data/testimonials";

export default function AboutTestimonial() {
  const testimonial = testimonials.find((t) => t.id === "3");
  if (!testimonial) return null;

  return (
    <section className="bg-navy-950 py-20 sm:py-28">
      <Container className="flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex max-w-2xl flex-col items-center gap-6"
        >
          <Quote className="h-10 w-10 text-orange-500/40" fill="currentColor" strokeWidth={0} />
          <p className="text-xl font-medium leading-relaxed text-white sm:text-2xl">
            &ldquo;{testimonial.quote}&rdquo;
          </p>
          <div className="flex items-center gap-0.5">
            {Array.from({ length: testimonial.rating }).map((_, idx) => (
              <Star key={idx} className="h-4 w-4 fill-orange-500 text-orange-500" />
            ))}
          </div>
          <div>
            <p className="text-sm font-bold text-white">{testimonial.name}</p>
            <p className="text-xs text-white/50">{testimonial.role}</p>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
