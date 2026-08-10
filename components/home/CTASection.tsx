"use client";

import { motion } from "framer-motion";
import { ArrowRight, Mail, Phone } from "lucide-react";
import Container from "@/components/shared/Container";
import Button from "@/components/shared/Button";

export default function CTASection() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl bg-linear-to-br from-orange-500 to-orange-600 px-8 py-14 text-center sm:px-14 sm:py-20"
        >
          <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10" />
          <div className="absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-white/10" />

          <div className="relative flex flex-col items-center gap-6">
            <h2 className="max-w-2xl text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Your next level stay starts here
            </h2>
            <p className="max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
              Whether you&apos;re booking a stay or listing a property, the
              Rentico team is ready to help — speak to us today.
            </p>

            <div className="mt-2 flex flex-col gap-3 sm:flex-row">
              <Button
                href="/book-your-stay"
                variant="secondary"
                size="lg"
                icon={<ArrowRight className="h-4 w-4" />}
              >
                Book Your Stay
              </Button>
              <Button href="/become-a-partner" variant="white" size="lg">
                List Your Property
              </Button>
            </div>

            <div className="mt-4 flex flex-col items-center gap-2 text-sm text-white/90 sm:flex-row sm:gap-6">
              <a
                href="tel:+971521460222"
                className="flex items-center gap-2 hover:text-white"
              >
                <Phone className="h-4 w-4" />
                +971-52 146 0222
              </a>
              <a
                href="mailto:info@renticodubai.com"
                className="flex items-center gap-2 hover:text-white"
              >
                <Mail className="h-4 w-4" />
                info@renticodubai.com
              </a>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
