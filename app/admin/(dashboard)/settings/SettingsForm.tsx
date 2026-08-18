"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import Image from "next/image";
import { Loader2, Upload } from "lucide-react";
import { updateSiteSettings, ActionResult } from "./actions";
import { uploadImage } from "../upload-actions";
import { SiteSettings } from "@/lib/types";

const inputClass =
  "w-full rounded-xl border border-navy-900/12 bg-white px-4 py-3 text-sm text-navy-900 outline-none transition-colors placeholder:text-navy-900/35 focus:border-orange-500";

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-semibold text-navy-900">{label}</label>
      {children}
      {hint && <p className="text-xs text-navy-900/40">{hint}</p>}
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center justify-center rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-orange-600 disabled:pointer-events-none disabled:opacity-50"
    >
      {pending ? "Saving..." : "Save changes"}
    </button>
  );
}

export default function SettingsForm({ initial }: { initial: SiteSettings }) {
  const [state, formAction] = useActionState<ActionResult, FormData>(updateSiteSettings, {});

  const [logoUrl, setLogoUrl] = useState(initial.logoUrl);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [socialLinks, setSocialLinks] = useState(initial.socialLinks);

  const handleLogoUpload = async (file: File) => {
    setUploading(true);
    setUploadError(null);
    const formData = new FormData();
    formData.append("file", file);
    const result = await uploadImage(formData);
    setUploading(false);
    if (result.error) {
      setUploadError(result.error);
      return;
    }
    if (result.url) setLogoUrl(result.url);
  };

  const updateSocialHref = (label: string, href: string) => {
    setSocialLinks((prev) => prev.map((s) => (s.label === label ? { ...s, href } : s)));
  };

  return (
    <form action={formAction} className="flex max-w-2xl flex-col gap-5">
      <input type="hidden" name="logoUrl" value={logoUrl} />
      <input type="hidden" name="socialLinks" value={JSON.stringify(socialLinks)} />

      <div className="flex flex-col gap-3 rounded-xl border border-navy-900/8 bg-navy-50/40 p-5">
        <h3 className="text-xs font-bold uppercase tracking-wider text-navy-900/40">Logo</h3>
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex h-16 w-40 items-center justify-center overflow-hidden rounded-lg border border-navy-900/8 bg-white p-2">
            {logoUrl && (
              <Image src={logoUrl} alt="Logo preview" width={160} height={64} className="h-full w-full object-contain" />
            )}
          </div>
          <label className="flex cursor-pointer items-center gap-2 rounded-full border border-navy-900/15 bg-white px-4 py-2 text-sm font-semibold text-navy-900 transition-colors hover:border-orange-300 hover:text-orange-600">
            {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
            {uploading ? "Uploading..." : "Upload new logo"}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleLogoUpload(file);
              }}
            />
          </label>
        </div>
        {uploadError && <p className="text-sm font-medium text-red-600">{uploadError}</p>}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Phone (display format)">
          <input name="phone" defaultValue={initial.phone} placeholder="+971-52 146 0222" required className={inputClass} />
        </Field>
        <Field label="WhatsApp number" hint="Digits only, with country code — no spaces or symbols.">
          <input name="whatsapp" defaultValue={initial.whatsapp} placeholder="971521460222" required className={inputClass} />
        </Field>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Email">
          <input
            name="email"
            type="email"
            defaultValue={initial.email}
            placeholder="info@renticodubai.com"
            required
            className={inputClass}
          />
        </Field>
        <Field label="Address">
          <input name="address" defaultValue={initial.address} required className={inputClass} />
        </Field>
      </div>

      <Field label="Response time note" hint="Shown on the contact page and in a few contact forms.">
        <input name="responseTimeNote" defaultValue={initial.responseTimeNote} required className={inputClass} />
      </Field>

      <Field label="Footer tagline">
        <textarea name="footerTagline" defaultValue={initial.footerTagline} rows={3} required className={inputClass} />
      </Field>

      <Field label="Copyright name" hint={`Shown in the footer as "© ${new Date().getFullYear()} [this name]. All rights reserved." — the year updates automatically.`}>
        <input name="copyrightName" defaultValue={initial.copyrightName} required className={inputClass} />
      </Field>

      <div className="flex flex-col gap-3 rounded-xl border border-navy-900/8 bg-navy-50/40 p-5">
        <h3 className="text-xs font-bold uppercase tracking-wider text-navy-900/40">Social links</h3>
        {socialLinks.map((s) => (
          <div key={s.label} className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-navy-900">{s.label}</label>
            <input
              value={s.href}
              onChange={(e) => updateSocialHref(s.label, e.target.value)}
              type="url"
              required
              className={inputClass}
            />
          </div>
        ))}
      </div>

      {state.error && (
        <p role="alert" className="text-sm font-medium text-red-600">
          {state.error}
        </p>
      )}
      {state.success && <p className="text-sm font-medium text-emerald-600">Settings saved.</p>}

      <div className="mt-2">
        <SubmitButton />
      </div>
    </form>
  );
}
