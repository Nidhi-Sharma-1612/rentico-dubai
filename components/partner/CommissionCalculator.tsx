"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Info, Minus, Plus, Trash2 } from "lucide-react";
import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import Button from "@/components/shared/Button";

const BEDROOM_OPTIONS = ["Studio", "1", "2", "3", "4+"] as const;
type Bedroom = (typeof BEDROOM_OPTIONS)[number];

function bedroomLabel(b: Bedroom) {
  return b === "Studio" ? "Studio" : `${b} bedroom`;
}

// Flat per-unit rate pending Rentico's confirmed commission rate card by
// bedroom count — update this table once real figures are available.
const RATE_BY_BEDROOM: Record<Bedroom, number> = {
  Studio: 2500,
  "1": 2500,
  "2": 2500,
  "3": 2500,
  "4+": 2500,
};

const FREQUENCIES = [
  { label: "Just this batch", multiplier: 1 },
  { label: "A few times a year", multiplier: 4 },
  { label: "Monthly", multiplier: 12 },
] as const;

type Row = { id: string; bedrooms: Bedroom; qty: number };

let rowSeq = 1;
function newRow(): Row {
  return { id: `row-${rowSeq++}`, bedrooms: "1", qty: 1 };
}

export default function CommissionCalculator() {
  const [rows, setRows] = useState<Row[]>([newRow()]);
  const [frequencyIndex, setFrequencyIndex] = useState(1);
  const [showPayoutInfo, setShowPayoutInfo] = useState(false);
  const headingId = useId();

  const frequency = FREQUENCIES[frequencyIndex];
  const rowTotals = rows.map((r) => r.qty * RATE_BY_BEDROOM[r.bedrooms]);
  const batchTotal = rowTotals.reduce((a, b) => a + b, 0);
  const annualised = batchTotal * frequency.multiplier;

  const updateRow = (id: string, patch: Partial<Row>) =>
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)));

  return (
    <section id="calculator" className="py-20 sm:py-28">
      <Container className="flex flex-col gap-14">
        <SectionHeading
          eyebrow="Commission Calculator"
          title="What's a referral worth?"
          description="Add the properties you could send us. Commission is paid per unit once it goes live."
          align="center"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto grid w-full max-w-4xl grid-cols-1 gap-6 lg:grid-cols-[1.1fr_0.9fr]"
        >
          {/* Inputs */}
          <div className="flex flex-col gap-6 rounded-3xl border border-navy-900/8 bg-white p-6 shadow-sm sm:p-8">
            <div>
              <h3 id={headingId} className="text-sm font-bold uppercase tracking-wider text-navy-900/50">
                Properties you&apos;d refer
              </h3>
              <div className="mt-4 flex flex-col gap-3">
                {rows.map((row) => (
                  <div
                    key={row.id}
                    className="flex items-center gap-3 rounded-xl border border-navy-900/8 bg-navy-50/40 p-3"
                  >
                    <select
                      value={row.bedrooms}
                      onChange={(e) => updateRow(row.id, { bedrooms: e.target.value as Bedroom })}
                      aria-label="Bedroom count"
                      className="flex-1 rounded-lg border border-navy-900/12 bg-white px-3 py-2.5 text-sm font-medium text-navy-900 outline-none focus:border-orange-500"
                    >
                      {BEDROOM_OPTIONS.map((b) => (
                        <option key={b} value={b}>
                          {bedroomLabel(b)}
                        </option>
                      ))}
                    </select>

                    <div className="flex items-center gap-2 rounded-lg border border-navy-900/12 bg-white px-2 py-1.5">
                      <button
                        type="button"
                        aria-label="Decrease quantity"
                        onClick={() => updateRow(row.id, { qty: Math.max(1, row.qty - 1) })}
                        className="flex h-6 w-6 items-center justify-center rounded-md text-navy-900/60 transition-colors hover:bg-navy-900/8"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="w-5 text-center text-sm font-semibold text-navy-900">{row.qty}</span>
                      <button
                        type="button"
                        aria-label="Increase quantity"
                        onClick={() => updateRow(row.id, { qty: row.qty + 1 })}
                        className="flex h-6 w-6 items-center justify-center rounded-md text-navy-900/60 transition-colors hover:bg-navy-900/8"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    {rows.length > 1 && (
                      <button
                        type="button"
                        aria-label="Remove property"
                        onClick={() => setRows((prev) => prev.filter((r) => r.id !== row.id))}
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-navy-900/35 transition-colors hover:bg-red-50 hover:text-red-500"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={() => setRows((prev) => [...prev, newRow()])}
                className="mt-3 flex items-center justify-center gap-1.5 rounded-xl border border-dashed border-orange-300 py-2.5 text-sm font-semibold text-orange-600 transition-colors hover:border-orange-400 hover:bg-orange-50/60"
              >
                <Plus className="h-4 w-4" />
                Add another property
              </button>
            </div>

            <div className="border-t border-navy-900/8 pt-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-navy-900/50">
                How often could you refer?
              </h3>
              <div className="relative mt-3">
                <select
                  value={frequencyIndex}
                  onChange={(e) => setFrequencyIndex(Number(e.target.value))}
                  aria-label="Referral frequency"
                  className="w-full appearance-none rounded-lg border border-navy-900/12 bg-white px-3 py-2.5 pr-9 text-sm font-medium text-navy-900 outline-none focus:border-orange-500"
                >
                  {FREQUENCIES.map((f, i) => (
                    <option key={f.label} value={i}>
                      {f.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-900/40" />
              </div>
            </div>
          </div>

          {/* Result */}
          <div className="flex flex-col justify-between gap-6 rounded-3xl bg-navy-950 p-6 sm:p-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-orange-300">Your commission</p>
              <div className="mt-2 h-12 overflow-hidden sm:h-14">
                <AnimatePresence mode="popLayout">
                  <motion.p
                    key={batchTotal}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -14 }}
                    transition={{ duration: 0.25 }}
                    className="text-4xl font-extrabold text-white sm:text-5xl"
                  >
                    AED {batchTotal.toLocaleString()}
                  </motion.p>
                </AnimatePresence>
              </div>
              <p className="mt-2 text-sm text-white/50">On this batch, paid when each unit goes live.</p>

              <div className="mt-6 flex flex-col gap-2 border-t border-white/10 pt-5">
                {rows.map((row, i) => (
                  <div key={row.id} className="flex items-center justify-between text-sm text-white/70">
                    <span>
                      {row.qty} × {bedroomLabel(row.bedrooms)}
                    </span>
                    <span className="font-medium text-white">AED {rowTotals[i].toLocaleString()}</span>
                  </div>
                ))}
                <div className="mt-1 flex items-center justify-between border-t border-white/10 pt-3 text-sm">
                  <span className="font-semibold text-white/80">This batch</span>
                  <span className="font-bold text-white">AED {batchTotal.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold text-white/80">Annualised at this pace</span>
                  <span className="font-bold text-orange-300">AED {annualised.toLocaleString()}/yr</span>
                </div>
              </div>

              <div className="mt-4">
                <button
                  type="button"
                  onClick={() => setShowPayoutInfo((v) => !v)}
                  className="flex items-center gap-1.5 text-xs font-medium text-white/50 transition-colors hover:text-white/80"
                >
                  <Info className="h-3.5 w-3.5" />
                  How and when this gets paid
                </button>
                {showPayoutInfo && (
                  <p className="mt-2 text-xs leading-relaxed text-white/50">
                    Once the property is live and has taken its first booking, we transfer your commission by bank
                    within 14 days with a written statement — we don&apos;t pay on signature, since owners
                    occasionally sign and then stall.
                  </p>
                )}
              </div>
            </div>

            <Button href="#register" size="lg" className="w-full justify-center">
              Refer these properties
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
