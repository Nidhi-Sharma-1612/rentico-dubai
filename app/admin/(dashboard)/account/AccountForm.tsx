"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { Eye, EyeOff, Lock, ShieldCheck, User } from "lucide-react";
import { changePassword, ActionResult } from "./actions";

const inputClass =
  "w-full rounded-xl border border-navy-900/12 bg-white py-2.5 pl-11 pr-11 text-sm text-navy-900 outline-none transition-colors placeholder:text-navy-900/35 focus:border-orange-500";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center justify-center rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-orange-600 disabled:pointer-events-none disabled:opacity-50"
    >
      {pending ? "Updating..." : "Update password"}
    </button>
  );
}

function PasswordField({ name, label, autoComplete }: { name: string; label: string; autoComplete: string }) {
  const [show, setShow] = useState(false);

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="text-sm font-semibold text-navy-900">
        {label}
      </label>
      <div className="relative">
        <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-900/35" />
        <input
          id={name}
          name={name}
          type={show ? "text" : "password"}
          required
          autoComplete={autoComplete}
          className={inputClass}
        />
        <button
          type="button"
          onClick={() => setShow((v) => !v)}
          aria-label={show ? "Hide password" : "Show password"}
          aria-pressed={show}
          className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-md text-navy-900/40 transition-colors hover:bg-navy-900/6 hover:text-navy-900/70"
        >
          {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
    </div>
  );
}

export default function AccountForm({ email }: { email: string }) {
  const [state, formAction] = useActionState<ActionResult, FormData>(changePassword, {});

  return (
    <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-[1fr_380px]">
      <form action={formAction} className="flex flex-col gap-4 rounded-2xl border border-navy-900/8 bg-white p-6">
        <h2 className="text-sm font-bold uppercase tracking-wider text-navy-900/40">Change password</h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <PasswordField name="currentPassword" label="Current password" autoComplete="current-password" />
          <div className="hidden sm:block" />
          <PasswordField name="newPassword" label="New password" autoComplete="new-password" />
          <PasswordField name="confirmPassword" label="Confirm new password" autoComplete="new-password" />
        </div>

        {state.error && (
          <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600">
            {state.error}
          </p>
        )}
        {state.success && (
          <p className="rounded-lg bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-600">
            Password updated.
          </p>
        )}

        <div className="mt-1">
          <SubmitButton />
        </div>
      </form>

      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3 rounded-2xl border border-navy-900/8 bg-white p-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-navy-900/40">Signed in as</h3>
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-50 text-orange-600">
              <User className="h-4.5 w-4.5" />
            </span>
            <p className="truncate text-sm font-semibold text-navy-900">{email}</p>
          </div>
        </div>

        <div className="flex flex-col gap-3 rounded-2xl border border-navy-900/8 bg-navy-50/40 p-6">
          <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-navy-900/40">
            <ShieldCheck className="h-4 w-4 text-orange-500" />
            Password tips
          </h3>
          <ul className="flex flex-col gap-2 text-sm text-navy-900/60">
            <li>• At least 8 characters — longer is stronger.</li>
            <li>• Don&apos;t reuse a password from another site.</li>
            <li>• You&apos;ll need your current password to confirm this change.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
