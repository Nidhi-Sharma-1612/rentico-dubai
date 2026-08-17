"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { createFaq, updateFaq, ActionResult } from "./actions";

const inputClass =
  "w-full rounded-xl border border-navy-900/12 bg-white px-4 py-3 text-sm text-navy-900 outline-none transition-colors placeholder:text-navy-900/35 focus:border-orange-500";

interface FaqFormProps {
  initial?: {
    id: string;
    group: string;
    question: string;
    answer: string;
  };
}

const groups = [
  { value: "home", label: "Home" },
  { value: "services", label: "Services" },
  { value: "partner", label: "Become a Partner" },
  { value: "experience", label: "Experience" },
];

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

export default function FaqForm({ initial }: FaqFormProps) {
  const action = initial ? updateFaq.bind(null, initial.id) : createFaq;
  const [state, formAction] = useActionState<ActionResult, FormData>(action, {});

  return (
    <form action={formAction} className="flex max-w-xl flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="group" className="text-sm font-semibold text-navy-900">
          Page
        </label>
        <select id="group" name="group" defaultValue={initial?.group ?? "home"} className={inputClass}>
          {groups.map((g) => (
            <option key={g.value} value={g.value}>
              {g.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="question" className="text-sm font-semibold text-navy-900">
          Question
        </label>
        <input id="question" name="question" defaultValue={initial?.question} required className={inputClass} />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="answer" className="text-sm font-semibold text-navy-900">
          Answer
        </label>
        <textarea id="answer" name="answer" defaultValue={initial?.answer} rows={4} required className={inputClass} />
      </div>

      {state.error && (
        <p role="alert" className="text-sm font-medium text-red-600">
          {state.error}
        </p>
      )}

      <div className="mt-2">
        <SubmitButton label={initial ? "Save changes" : "Create FAQ"} />
      </div>
    </form>
  );
}
