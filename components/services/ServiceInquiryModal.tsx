"use client";

import { FormEvent, useEffect, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, X } from "lucide-react";
import { Service } from "@/lib/types";
import { destinations } from "@/lib/data/destinations";
import SingleDatePicker from "@/components/shared/SingleDatePicker";

interface ServiceInquiryModalProps {
  service: Service | null;
  onClose: () => void;
}

const inputClass =
  "w-full rounded-xl border border-navy-900/12 bg-white px-4 py-3 text-sm text-navy-900 outline-none transition-colors placeholder:text-navy-900/35 focus:border-orange-500";

const emptySubscribe = () => () => {};

// SSR-safe "has this component mounted in the browser yet" check, without an
// effect + setState (which would trigger an extra render pass).
function useMounted() {
  return useSyncExternalStore(emptySubscribe, () => true, () => false);
}

export default function ServiceInquiryModal({ service, onClose }: ServiceInquiryModalProps) {
  const mounted = useMounted();

  useEffect(() => {
    if (!service) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [service, onClose]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {service && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-100 flex items-center justify-center bg-navy-950/60 p-4 backdrop-blur-sm"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          {/* Keying by slug gives every open a fresh card instance, so the
              success state never leaks into the next inquiry. */}
          <ServiceInquiryCard key={service.slug} service={service} onClose={onClose} />
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

function ServiceInquiryCard({ service, onClose }: { service: Service; onClose: () => void }) {
  const [submitted, setSubmitted] = useState(false);
  const [preferredDate, setPreferredDate] = useState<Date | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.97 }}
      transition={{ duration: 0.2 }}
      role="dialog"
      aria-modal="true"
      aria-label={`Enquire about ${service.name}`}
      className="relative max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl sm:p-8"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute right-5 top-5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-navy-900/50 transition-colors hover:bg-navy-900/5 hover:text-navy-900"
      >
        <X className="h-5 w-5" />
      </button>

      <h2 className="pr-10 text-2xl font-extrabold tracking-tight text-navy-900 sm:text-3xl">
        {service.name}
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-navy-900/55">
        Tell us a bit about your property and we&apos;ll follow up shortly.
      </p>

      {submitted ? (
        <div className="mt-8 flex flex-col items-center gap-3 rounded-2xl bg-navy-50 p-8 text-center">
          <CheckCircle2 className="h-10 w-10 text-orange-500" />
          <h3 className="text-base font-bold text-navy-900">Request received</h3>
          <p className="max-w-sm text-sm text-navy-900/60">
            Thanks for reaching out about {service.name} — a member of the Rentico team will be in
            touch shortly.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <input placeholder="Full Name" className={inputClass} />
          <input required type="tel" placeholder="Phone *" className={inputClass} />
          <input required type="email" placeholder="Email *" className={inputClass} />
          <select required defaultValue="" className={inputClass} aria-label="Number of bedrooms">
            <option value="" disabled>
              Number of Bedrooms *
            </option>
            {["Studio", "1", "2", "3", "4+"].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
          <select required defaultValue="" className={inputClass} aria-label="Property area">
            <option value="" disabled>
              Property Area *
            </option>
            {destinations.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
          <SingleDatePicker
            value={preferredDate}
            onChange={setPreferredDate}
            placeholder="Preferred Contact Date"
          />

          <button
            type="submit"
            className="rounded-xl bg-orange-500 px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-orange-600 sm:col-span-2"
          >
            Submit
          </button>
        </form>
      )}
    </motion.div>
  );
}
