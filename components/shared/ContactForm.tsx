"use client";

import { FormEvent, useState } from "react";
import { CheckCircle2, Send } from "lucide-react";
import Button from "@/components/shared/Button";

const propertyTypes = ["Apartment", "Villa", "Penthouse", "Townhouse", "Other"];

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-navy-900/8 bg-white p-10 text-center">
        <CheckCircle2 className="h-10 w-10 text-orange-500" />
        <h3 className="text-lg font-bold text-navy-900">Request received</h3>
        <p className="max-w-sm text-sm text-navy-900/60">
          Thanks for reaching out — a member of the Rentico team will be in touch shortly.
        </p>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-xl border border-navy-900/12 bg-white px-4 py-3 text-sm text-navy-900 outline-none transition-colors placeholder:text-navy-900/35 focus:border-orange-500";

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 rounded-2xl border border-navy-900/8 bg-white p-6 shadow-sm sm:p-8"
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <input required placeholder="First name" className={inputClass} />
        <input required placeholder="Last name" className={inputClass} />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <input required type="email" placeholder="Email" className={inputClass} />
        <input required type="tel" placeholder="Phone number" className={inputClass} />
      </div>
      <select required defaultValue="" className={inputClass}>
        <option value="" disabled>
          Property Type
        </option>
        {propertyTypes.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>
      <input placeholder="Subject" className={inputClass} />
      <textarea placeholder="Message" rows={4} className={inputClass} />

      <Button type="submit" size="lg" icon={<Send className="h-4 w-4" />} className="mt-2 w-full sm:w-fit">
        Send Request
      </Button>
      <p className="text-xs text-navy-900/45">
        No spam, ever. Our team typically responds within 24 hours.
      </p>
    </form>
  );
}
