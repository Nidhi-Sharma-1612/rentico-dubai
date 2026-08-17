"use client";

import { FormEvent, ReactNode, useState } from "react";
import { CheckCircle2, MessageCircle, Send } from "lucide-react";
import Button from "@/components/shared/Button";
import { RELATIONSHIP_OPTIONS, Relationship, usePartnerAudience } from "@/components/partner/PartnerAudienceContext";

const WHATSAPP_TEXT = "Hi%20Rentico%2C%20I%27d%20like%20to%20register%20a%20property%20referral.";

const unitTypes = ["Studio", "1 bedroom", "2 bedroom", "3 bedroom", "4+ bedroom"];
const ownerContactOptions = ["Yes, details below", "Not yet"];
const startOptions = ["Immediately", "Within 30 days", "30–90 days", "Not sure yet"];

const inputClass =
  "w-full rounded-xl border border-navy-900/12 bg-white px-4 py-3 text-sm text-navy-900 outline-none transition-colors placeholder:text-navy-900/35 focus:border-orange-500";

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-semibold text-navy-900/45">{label}</span>
      {children}
    </label>
  );
}

function FieldGroup({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-4 border-t border-navy-900/8 pt-5 first:border-t-0 first:pt-0">
      <h3 className="text-xs font-bold uppercase tracking-wider text-navy-900/40">{label}</h3>
      {children}
    </div>
  );
}

export default function ReferralForm({ whatsapp }: { whatsapp: string }) {
  const [submitted, setSubmitted] = useState(false);
  const { relationship, setRelationship } = usePartnerAudience();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-navy-900/8 bg-white p-10 text-center">
        <CheckCircle2 className="h-10 w-10 text-orange-500" />
        <h3 className="text-lg font-bold text-navy-900">Referral registered</h3>
        <p className="max-w-sm text-sm text-navy-900/60">
          Thanks — this referral is now protected for 90 days. A member of the Rentico team will follow up shortly.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 rounded-2xl border border-navy-900/8 bg-white p-6 shadow-sm sm:p-8"
    >
      <FieldGroup label="About you">
        <Field label="I am a...">
          <select
            required
            value={relationship}
            onChange={(e) => setRelationship(e.target.value as Relationship)}
            className={inputClass}
          >
            {RELATIONSHIP_OPTIONS.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </Field>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Your name">
            <input required placeholder="Full name" className={inputClass} />
          </Field>
          <Field label="Company">
            <input required placeholder="Agency or developer" className={inputClass} />
          </Field>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Email">
            <input required type="email" placeholder="you@company.com" className={inputClass} />
          </Field>
          <Field label="WhatsApp">
            <input required type="tel" placeholder="+971 ..." className={inputClass} />
          </Field>
        </div>
      </FieldGroup>

      <FieldGroup label="The property">
        <Field label="Building / tower & area">
          <input required placeholder="e.g. Executive Towers, Business Bay" className={inputClass} />
        </Field>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="How many units?">
            <input required type="number" min={1} defaultValue={1} className={inputClass} />
          </Field>
          <Field label="Unit type">
            <select required defaultValue="" className={inputClass}>
              <option value="" disabled>
                Select type
              </option>
              {unitTypes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </Field>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Owner contact shared?">
            <select required defaultValue="" className={inputClass}>
              <option value="" disabled>
                Select one
              </option>
              {ownerContactOptions.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </Field>
          <Field label="When could it start?">
            <select required defaultValue="" className={inputClass}>
              <option value="" disabled>
                Select one
              </option>
              {startOptions.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </Field>
        </div>
      </FieldGroup>

      <FieldGroup label="Anything else (optional)">
        <Field label="Notes">
          <textarea
            placeholder="Owner's situation, building restrictions, handover dates..."
            rows={3}
            className={inputClass}
          />
        </Field>
        <Field label="Partner code (if you have one)">
          <input placeholder="e.g. RNT-AG-014" className={inputClass} />
        </Field>
      </FieldGroup>

      <label className="flex items-start gap-2.5 rounded-xl border border-navy-900/8 bg-navy-50/50 p-3.5 text-xs leading-relaxed text-navy-900/60">
        <input required type="checkbox" className="mt-0.5 h-4 w-4 shrink-0 accent-orange-500" />
        I confirm I have the owner&apos;s permission to share their details, and I agree to Rentico&apos;s Partner
        Terms.
      </label>

      <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <Button type="submit" size="lg" icon={<Send className="h-4 w-4" />} className="w-full sm:w-fit">
          Register this referral
        </Button>
        <a
          href={`https://wa.me/${whatsapp}?text=${WHATSAPP_TEXT}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm font-semibold text-orange-600 transition-colors hover:text-orange-700"
        >
          <MessageCircle className="h-4 w-4" />
          Send on WhatsApp instead
        </a>
      </div>
    </form>
  );
}
