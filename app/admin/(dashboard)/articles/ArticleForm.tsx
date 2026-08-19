"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import Image from "next/image";
import { FileEdit, Globe, Loader2, Upload, X } from "lucide-react";
import { createArticle, updateArticle, ActionResult } from "./actions";
import { uploadImage } from "../upload-actions";
import ArticleBlockEditor from "./ArticleBlockEditor";
import { ArticleBlock } from "@/lib/types";
import { slugify } from "@/lib/utils";

const inputClass =
  "w-full rounded-xl border border-navy-900/12 bg-white px-4 py-3 text-sm text-navy-900 outline-none transition-colors placeholder:text-navy-900/35 focus:border-orange-500";

interface ArticleFormProps {
  initial?: {
    id: string;
    title: string;
    slug: string;
    category: string;
    excerpt: string;
    readTime: string;
    date: string;
    image: string | null;
    content: ArticleBlock[];
    status: string;
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

export default function ArticleForm({ initial }: ArticleFormProps) {
  const action = initial ? updateArticle.bind(null, initial.id) : createArticle;
  const [state, formAction] = useActionState<ActionResult, FormData>(action, {});

  const [title, setTitle] = useState(initial?.title ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(initial));
  const [image, setImage] = useState<string | null>(initial?.image ?? null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [content, setContent] = useState<ArticleBlock[]>(initial?.content ?? []);

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (!slugTouched) setSlug(slugify(value));
  };

  const handleImageUpload = async (file: File) => {
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
    setImage(result.url ?? null);
  };

  return (
    <form action={formAction} className="flex max-w-3xl flex-col gap-5">
      <input type="hidden" name="image" value={image ?? ""} />
      <input type="hidden" name="content" value={JSON.stringify(content)} />

      <div className="flex flex-col gap-1.5">
        <label htmlFor="title" className="text-sm font-semibold text-navy-900">
          Title
        </label>
        <input
          id="title"
          name="title"
          value={title}
          onChange={(e) => handleTitleChange(e.target.value)}
          required
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-semibold text-navy-900">Status</label>
        <div className="flex gap-2">
          <label className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl border border-navy-900/12 px-4 py-3 text-sm font-semibold text-navy-900/60 transition-colors has-checked:border-orange-500 has-checked:bg-orange-50 has-checked:text-orange-600">
            <input
              type="radio"
              name="status"
              value="draft"
              defaultChecked={(initial?.status ?? "draft") === "draft"}
              className="sr-only"
            />
            <FileEdit className="h-4 w-4" />
            Draft
          </label>
          <label className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl border border-navy-900/12 px-4 py-3 text-sm font-semibold text-navy-900/60 transition-colors has-checked:border-orange-500 has-checked:bg-orange-50 has-checked:text-orange-600">
            <input type="radio" name="status" value="published" defaultChecked={initial?.status === "published"} className="sr-only" />
            <Globe className="h-4 w-4" />
            Published
          </label>
        </div>
        <p className="text-xs text-navy-900/40">Draft articles are hidden from the public Insights page until published.</p>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="slug" className="text-sm font-semibold text-navy-900">
          Slug
        </label>
        <input
          id="slug"
          name="slug"
          value={slug}
          onChange={(e) => {
            setSlugTouched(true);
            setSlug(e.target.value);
          }}
          pattern="[a-z0-9-]+"
          required
          className={inputClass}
        />
        <p className="text-xs text-navy-900/40">Used in the URL — lowercase letters, numbers, and hyphens only.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="category" className="text-sm font-semibold text-navy-900">
            Category
          </label>
          <input
            id="category"
            name="category"
            defaultValue={initial?.category}
            placeholder="For Property Owners"
            required
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="readTime" className="text-sm font-semibold text-navy-900">
            Read time
          </label>
          <input
            id="readTime"
            name="readTime"
            defaultValue={initial?.readTime}
            placeholder="5 min read"
            required
            className={inputClass}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="date" className="text-sm font-semibold text-navy-900">
          Date
        </label>
        <input
          id="date"
          name="date"
          type="date"
          defaultValue={initial?.date}
          required
          className={`${inputClass} max-w-xs`}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="excerpt" className="text-sm font-semibold text-navy-900">
          Excerpt
        </label>
        <textarea id="excerpt" name="excerpt" defaultValue={initial?.excerpt} rows={2} required className={inputClass} />
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-sm font-semibold text-navy-900">Cover image</p>
        {image ? (
          <div className="relative h-40 w-64 overflow-hidden rounded-xl border border-navy-900/8">
            <Image src={image} alt="Cover" fill className="object-cover" />
            <button
              type="button"
              onClick={() => setImage(null)}
              className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-navy-900/70 text-white hover:bg-navy-900"
              aria-label="Remove image"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        ) : (
          <label className="flex h-40 w-64 cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-navy-900/20 text-navy-900/40 transition-colors hover:border-orange-300 hover:text-orange-600">
            {uploading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Upload className="h-5 w-5" />}
            <span className="text-xs font-medium">{uploading ? "Uploading..." : "Upload image"}</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleImageUpload(file);
              }}
            />
          </label>
        )}
        {uploadError && <p className="text-sm font-medium text-red-600">{uploadError}</p>}
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-sm font-semibold text-navy-900">Content</p>
        <ArticleBlockEditor value={content} onChange={setContent} />
      </div>

      {state.error && (
        <p role="alert" className="text-sm font-medium text-red-600">
          {state.error}
        </p>
      )}

      <div className="mt-2">
        <SubmitButton label={initial ? "Save changes" : "Create article"} />
      </div>
    </form>
  );
}
