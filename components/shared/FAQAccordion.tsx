"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Plus } from "lucide-react";
import { FAQ } from "@/lib/types";

export default function FAQAccordion({
  faqs,
  variant = "card",
  initialCount,
}: {
  faqs: FAQ[];
  variant?: "card" | "flat";
  initialCount?: number;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [expanded, setExpanded] = useState(false);

  const hasMore = initialCount !== undefined && faqs.length > initialCount;
  const visibleFaqs = hasMore && !expanded ? faqs.slice(0, initialCount) : faqs;

  const viewMoreButton = hasMore && (
    <button
      onClick={() => setExpanded((v) => !v)}
      className="flex items-center gap-1.5 text-sm font-semibold text-orange-600 transition-colors hover:text-orange-700"
    >
      {expanded ? "View less" : `View all ${faqs.length} questions`}
      <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`} />
    </button>
  );

  if (variant === "flat") {
    return (
      <div className="flex flex-col gap-6">
        <div className="flex flex-col divide-y divide-navy-900/10 border-t border-navy-900/10">
          {visibleFaqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={faq.question}>
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-6 py-5 text-left sm:py-6"
                  aria-expanded={isOpen}
                >
                  <span className="text-xs font-semibold uppercase tracking-wider text-navy-900 sm:text-sm">
                    {faq.question}
                  </span>
                  <span
                    className={`flex h-5 w-5 shrink-0 items-center justify-center text-orange-500 transition-transform duration-300 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  >
                    <Plus className="h-4 w-4" />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-xl pb-6 text-sm leading-relaxed text-navy-900/60 sm:text-base">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
        {viewMoreButton && <div className="flex justify-center">{viewMoreButton}</div>}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-3">
        {visibleFaqs.map((faq, i) => {
          const isOpen = openIndex === i;
          return (
            <div
              key={faq.question}
              className="overflow-hidden rounded-2xl border border-navy-900/8 bg-white"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
                aria-expanded={isOpen}
              >
                <span className="text-sm font-semibold text-navy-900 sm:text-base">
                  {faq.question}
                </span>
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-orange-50 text-orange-600 transition-transform duration-300 ${
                    isOpen ? "rotate-45" : ""
                  }`}
                >
                  <Plus className="h-4 w-4" />
                </span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-5 text-sm leading-relaxed text-navy-900/60 sm:px-6">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
      {viewMoreButton && <div className="flex justify-center">{viewMoreButton}</div>}
    </div>
  );
}
