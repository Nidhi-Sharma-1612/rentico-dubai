"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { createTestimonial, updateTestimonial, ActionResult } from "./actions";

const inputClass =
  "w-full rounded-xl border border-navy-900/12 bg-white px-4 py-3 text-sm text-navy-900 outline-none transition-colors placeholder:text-navy-900/35 focus:border-orange-500";

interface TestimonialFormProps {
  initial?: {
    id: string;
    name: string;
    role: string;
    quote: string;
    rating: number;
    showOnHome: boolean;
    featuredForAbout: boolean;
    sortOrder: number;
  };
}

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center justify-center rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-orange-600 disabled:pointer-events-none disabled:opacity-50"
    >
      {pending ? "Saving..." : label}
    </button>
  );
}

export default function TestimonialForm({ initial }: TestimonialFormProps) {
  const action = initial ? updateTestimonial.bind(null, initial.id) : createTestimonial;
  const [state, formAction] = useActionState<ActionResult, FormData>(action, {});

  return (
    <form action={formAction} className="flex max-w-xl flex-col gap-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="name" className="text-sm font-semibold text-navy-900">
            Name
          </label>
          <input id="name" name="name" defaultValue={initial?.name} required className={inputClass} />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="role" className="text-sm font-semibold text-navy-900">
            Role
          </label>
          <input
            id="role"
            name="role"
            defaultValue={initial?.role}
            placeholder="Property owner, 1BR Dubai Hills"
            required
            className={inputClass}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="quote" className="text-sm font-semibold text-navy-900">
          Quote
        </label>
        <textarea id="quote" name="quote" defaultValue={initial?.quote} rows={4} required className={inputClass} />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="rating" className="text-sm font-semibold text-navy-900">
            Rating
          </label>
          <select id="rating" name="rating" defaultValue={initial?.rating ?? 5} className={inputClass}>
            {[5, 4, 3, 2, 1].map((r) => (
              <option key={r} value={r}>
                {r} star{r !== 1 ? "s" : ""}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="sortOrder" className="text-sm font-semibold text-navy-900">
            Sort order
          </label>
          <input
            id="sortOrder"
            name="sortOrder"
            type="number"
            defaultValue={initial?.sortOrder ?? 0}
            className={inputClass}
          />
        </div>
      </div>

      <div className="flex flex-col gap-3 rounded-xl border border-navy-900/8 bg-navy-50/40 p-4">
        <label className="flex items-center gap-2.5 text-sm font-medium text-navy-900">
          <input
            type="checkbox"
            name="showOnHome"
            defaultChecked={initial?.showOnHome ?? true}
            className="h-4 w-4 rounded border-navy-900/25 text-orange-500 focus:ring-orange-500"
          />
          Show on Home page
        </label>
        <label className="flex items-center gap-2.5 text-sm font-medium text-navy-900">
          <input
            type="checkbox"
            name="featuredForAbout"
            defaultChecked={initial?.featuredForAbout ?? false}
            className="h-4 w-4 rounded border-navy-900/25 text-orange-500 focus:ring-orange-500"
          />
          Featured testimonial on About page (should be exactly one)
        </label>
      </div>

      {state.error && (
        <p role="alert" className="text-sm font-medium text-red-600">
          {state.error}
        </p>
      )}

      <div className="mt-2">
        <SubmitButton label={initial ? "Save changes" : "Create testimonial"} />
      </div>
    </form>
  );
}
