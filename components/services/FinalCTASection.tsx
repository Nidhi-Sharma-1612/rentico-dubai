"use client";

import { FormEvent, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, MessageCircle, Send } from "lucide-react";
import Container from "@/components/shared/Container";
import Button from "@/components/shared/Button";
import FAQAccordion from "@/components/shared/FAQAccordion";
import { FAQ as FAQType } from "@/lib/types";

const WHATSAPP_TEXT = "Hi%20Rentico%2C%20I%27d%20like%20a%20free%20earnings%20estimate%20for%20my%20property.";

const propertyTypes = ["Apartment", "Villa", "Penthouse", "Townhouse", "Other"];
const bedroomOptions = ["Studio", "1", "2", "3", "4+"];
const revenueRanges = ["Not sure yet", "Under AED 150k/yr", "AED 150k–300k/yr", "AED 300k–500k/yr", "AED 500k+/yr"];

const inputClass =
  "w-full rounded-xl border border-navy-900/12 bg-white px-4 py-3 text-sm text-navy-900 outline-none transition-colors placeholder:text-navy-900/35 focus:border-orange-500";

function DetailsForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-navy-900/8 bg-white p-8 text-center">
        <CheckCircle2 className="h-10 w-10 text-orange-500" />
        <h3 className="text-lg font-bold text-navy-900">Details received</h3>
        <p className="max-w-sm text-sm text-navy-900/60">
          Thanks — your Owner Relationship Manager will follow up with a data-backed estimate shortly.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 rounded-2xl border border-navy-900/8 bg-white p-6 text-left shadow-sm"
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <select required defaultValue="" className={inputClass} aria-label="Property type">
          <option value="" disabled>
            Property type
          </option>
          {propertyTypes.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
        <input required placeholder="Community (e.g. Dubai Marina)" className={inputClass} />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <select required defaultValue="" className={inputClass} aria-label="Bedrooms">
          <option value="" disabled>
            Bedrooms
          </option>
          {bedroomOptions.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
        <select defaultValue="" className={inputClass} aria-label="Expected revenue range">
          <option value="" disabled>
            Revenue range
          </option>
          {revenueRanges.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <input required placeholder="Full name" className={inputClass} />
        <input required type="tel" placeholder="Phone number" className={inputClass} />
      </div>
      <input required type="email" placeholder="Email" className={inputClass} />

      <Button type="submit" size="lg" icon={<Send className="h-4 w-4" />} className="mt-2 w-full sm:w-fit">
        Send Details
      </Button>
    </form>
  );
}

export default function FinalCTASection({ faqs, whatsapp }: { faqs: FAQType[]; whatsapp: string }) {
  const [showForm, setShowForm] = useState(false);

  return (
    <section className="py-20 sm:py-28">
      <Container className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:sticky lg:top-28 lg:self-start"
        >
          <div className="relative flex flex-col items-center gap-6 overflow-hidden rounded-3xl bg-linear-to-br from-orange-500 to-orange-600 px-8 py-14 text-center sm:px-10">
            <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10" />
            <div className="absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-white/10" />

            <div className="relative flex flex-col items-center gap-6">
              <h2 className="max-w-sm text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                Find out what your property could earn.
              </h2>
              <p className="max-w-sm text-base leading-relaxed text-white/85">
                Get a free, honest estimate. Message us directly and we&apos;ll come back with a data-backed
                estimate — and whether Rentico is the right fit.
              </p>

              {!showForm && (
                <div className="mt-2 flex flex-col items-center gap-4">
                  <Button
                    href={`https://wa.me/${whatsapp}?text=${WHATSAPP_TEXT}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="secondary"
                    size="lg"
                    icon={<MessageCircle className="h-4 w-4" />}
                  >
                    Chat with us on WhatsApp
                  </Button>
                  <button
                    type="button"
                    onClick={() => setShowForm(true)}
                    className="text-sm font-semibold text-white/85 underline decoration-white/40 underline-offset-4 transition-colors hover:text-white"
                  >
                    Send details instead
                  </button>
                </div>
              )}
            </div>

            <AnimatePresence>
              {showForm && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="relative w-full overflow-hidden"
                >
                  <DetailsForm />
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="mt-4 text-sm font-semibold text-white/85 underline decoration-white/40 underline-offset-4 transition-colors hover:text-white"
                  >
                    Back to WhatsApp
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-col gap-8"
        >
          <div className="flex flex-col gap-3">
            <span className="w-fit rounded-full bg-orange-50 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-orange-600">
              FAQ
            </span>
            <h3 className="text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl">Questions owners ask us</h3>
          </div>

          <FAQAccordion faqs={faqs} variant="flat" initialCount={5} />
        </motion.div>
      </Container>
    </section>
  );
}
