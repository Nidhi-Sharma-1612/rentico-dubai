"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { ChevronDown, GripVertical, Plus, Trash2 } from "lucide-react";
import { updateSection, ActionResult } from "./actions";
import { FieldConfig, ItemFieldConfig } from "./sectionSchemas";
import { ICONS } from "@/lib/icons";

const inputClass =
  "w-full rounded-lg border border-navy-900/12 bg-white px-3 py-2.5 text-sm text-navy-900 outline-none transition-colors placeholder:text-navy-900/35 focus:border-orange-500";

type Content = Record<string, unknown>;

function emptyItemFrom(itemFields: ItemFieldConfig[]): Record<string, string> {
  return Object.fromEntries(itemFields.map((f) => [f.key, ""]));
}

function move<T>(arr: T[], from: number, to: number): T[] {
  if (to < 0 || to >= arr.length) return arr;
  const next = [...arr];
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);
  return next;
}

// Groups adjacent short fields (single-line text/icon) into pairs so they can
// render side by side instead of each claiming a full row — long fields
// (textarea, list-text, list-object) always get their own row.
const SHORT_FIELD_TYPES = new Set(["text", "icon"]);

function chunkFields<T extends { type: string }>(fields: T[]): T[][] {
  const rows: T[][] = [];
  let buffer: T[] = [];
  const flush = () => {
    if (buffer.length) rows.push(buffer);
    buffer = [];
  };
  for (const field of fields) {
    if (SHORT_FIELD_TYPES.has(field.type)) {
      buffer.push(field);
      if (buffer.length === 2) flush();
    } else {
      flush();
      rows.push([field]);
    }
  }
  flush();
  return rows;
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

function IconSelect({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const Selected = ICONS[value];
  return (
    <div className="relative">
      <span className="pointer-events-none absolute left-3 top-1/2 flex h-4 w-4 -translate-y-1/2 items-center justify-center text-orange-600">
        {Selected && <Selected className="h-4 w-4" />}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`${inputClass} appearance-none pl-9 pr-9`}
      >
        <option value="" disabled>
          Choose an icon
        </option>
        {Object.keys(ICONS).map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-900/40" />
    </div>
  );
}

function ItemFieldInput({
  field,
  value,
  onChange,
}: {
  field: ItemFieldConfig;
  value: string;
  onChange: (v: string) => void;
}) {
  if (field.type === "textarea") {
    return (
      <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={2} className={inputClass} />
    );
  }
  if (field.type === "icon") {
    return <IconSelect value={value} onChange={onChange} />;
  }
  return <input value={value} onChange={(e) => onChange(e.target.value)} className={inputClass} />;
}

function ListTextField({
  field,
  items,
  onChange,
}: {
  field: Extract<FieldConfig, { type: "list-text" }>;
  items: string[];
  onChange: (items: string[]) => void;
}) {
  return (
    <div className="flex flex-col gap-2.5 rounded-xl border border-navy-900/8 bg-navy-50/40 p-4">
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-2">
          <GripVertical className="h-4 w-4 shrink-0 text-navy-900/25" />
          <input
            value={item}
            onChange={(e) => onChange(items.map((it, idx) => (idx === i ? e.target.value : it)))}
            className={inputClass}
          />
          <button
            type="button"
            aria-label={`Remove ${field.itemLabel.toLowerCase()}`}
            onClick={() => onChange(items.filter((_, idx) => idx !== i))}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-navy-900/35 transition-colors hover:bg-red-50 hover:text-red-500"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...items, ""])}
        className="flex items-center justify-center gap-1.5 rounded-lg border border-dashed border-orange-300 py-2 text-sm font-semibold text-orange-600 transition-colors hover:border-orange-400 hover:bg-orange-50/60"
      >
        <Plus className="h-4 w-4" />
        Add {field.itemLabel.toLowerCase()}
      </button>
    </div>
  );
}

function ListObjectField({
  field,
  items,
  onChange,
}: {
  field: Extract<FieldConfig, { type: "list-object" }>;
  items: Record<string, string>[];
  onChange: (items: Record<string, string>[]) => void;
}) {
  const itemFieldRows = chunkFields(field.itemFields);

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-navy-900/8 bg-navy-50/40 p-4">
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
        {items.map((item, i) => {
          const updateSub = (key: string, v: string) =>
            onChange(items.map((it, idx) => (idx === i ? { ...it, [key]: v } : it)));

          return (
            <div key={i} className="flex flex-col gap-3 rounded-lg border border-navy-900/8 bg-white p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-navy-900/40">
                  {field.itemLabel} {i + 1}
                </span>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    aria-label="Move up"
                    onClick={() => onChange(move(items, i, i - 1))}
                    disabled={i === 0}
                    className="flex h-7 w-7 items-center justify-center rounded-md text-navy-900/35 transition-colors hover:bg-navy-900/6 hover:text-navy-900/70 disabled:pointer-events-none disabled:opacity-30"
                  >
                    <ChevronDown className="h-4 w-4 rotate-180" />
                  </button>
                  <button
                    type="button"
                    aria-label="Move down"
                    onClick={() => onChange(move(items, i, i + 1))}
                    disabled={i === items.length - 1}
                    className="flex h-7 w-7 items-center justify-center rounded-md text-navy-900/35 transition-colors hover:bg-navy-900/6 hover:text-navy-900/70 disabled:pointer-events-none disabled:opacity-30"
                  >
                    <ChevronDown className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    aria-label={`Remove ${field.itemLabel.toLowerCase()}`}
                    onClick={() => onChange(items.filter((_, idx) => idx !== i))}
                    className="flex h-7 w-7 items-center justify-center rounded-md text-navy-900/35 transition-colors hover:bg-red-50 hover:text-red-500"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {itemFieldRows.map((row, ri) =>
                row.length === 2 ? (
                  <div key={ri} className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {row.map((sub) => (
                      <div key={sub.key} className="flex flex-col gap-1.5">
                        <label className="text-xs font-medium text-navy-900/50">{sub.label}</label>
                        <ItemFieldInput field={sub} value={item[sub.key] ?? ""} onChange={(v) => updateSub(sub.key, v)} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div key={row[0].key} className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium text-navy-900/50">{row[0].label}</label>
                    <ItemFieldInput field={row[0]} value={item[row[0].key] ?? ""} onChange={(v) => updateSub(row[0].key, v)} />
                  </div>
                )
              )}
            </div>
          );
        })}
      </div>
      <button
        type="button"
        onClick={() => onChange([...items, emptyItemFrom(field.itemFields)])}
        className="flex items-center justify-center gap-1.5 rounded-lg border border-dashed border-orange-300 py-2.5 text-sm font-semibold text-orange-600 transition-colors hover:border-orange-400 hover:bg-orange-50/60"
      >
        <Plus className="h-4 w-4" />
        Add {field.itemLabel.toLowerCase()}
      </button>
    </div>
  );
}

function TopField({
  field,
  content,
  setField,
}: {
  field: FieldConfig;
  content: Content;
  setField: (key: string, value: unknown) => void;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-semibold text-navy-900">{field.label}</label>

      {field.type === "text" && (
        <input
          value={(content[field.key] as string) ?? ""}
          onChange={(e) => setField(field.key, e.target.value)}
          className={inputClass}
        />
      )}

      {field.type === "textarea" && (
        <textarea
          value={(content[field.key] as string) ?? ""}
          onChange={(e) => setField(field.key, e.target.value)}
          rows={3}
          className={inputClass}
        />
      )}

      {field.type === "icon" && (
        <IconSelect value={(content[field.key] as string) ?? ""} onChange={(v) => setField(field.key, v)} />
      )}

      {field.type === "list-text" && (
        <ListTextField
          field={field}
          items={(content[field.key] as string[]) ?? []}
          onChange={(items) => setField(field.key, items)}
        />
      )}

      {field.type === "list-object" && (
        <ListObjectField
          field={field}
          items={(content[field.key] as Record<string, string>[]) ?? []}
          onChange={(items) => setField(field.key, items)}
        />
      )}
    </div>
  );
}

export default function SectionForm({
  pageSlug,
  sectionKey,
  fields,
  initialContent,
}: {
  pageSlug: string;
  sectionKey: string;
  fields: FieldConfig[];
  initialContent: Content;
}) {
  const action = updateSection.bind(null, pageSlug, sectionKey);
  const [state, formAction] = useActionState<ActionResult, FormData>(action, {});
  const [content, setContent] = useState<Content>(initialContent);

  const setField = (key: string, value: unknown) => setContent((prev) => ({ ...prev, [key]: value }));
  const rows = chunkFields(fields);

  return (
    <form action={formAction} className="flex w-full flex-col gap-6">
      <input type="hidden" name="content" value={JSON.stringify(content)} />

      {rows.map((row, i) =>
        row.length === 2 ? (
          <div key={i} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {row.map((field) => (
              <TopField key={field.key} field={field} content={content} setField={setField} />
            ))}
          </div>
        ) : (
          <TopField key={row[0].key} field={row[0]} content={content} setField={setField} />
        )
      )}

      {state.error && (
        <p role="alert" className="text-sm font-medium text-red-600">
          {state.error}
        </p>
      )}
      {state.success && <p className="text-sm font-medium text-emerald-600">Saved. Public page updated.</p>}

      <div>
        <SubmitButton />
      </div>
    </form>
  );
}
