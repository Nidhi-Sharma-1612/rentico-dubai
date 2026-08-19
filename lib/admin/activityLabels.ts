import { Pencil, Plus, Trash2, type LucideIcon } from "lucide-react";

export const ACTION_LABELS: Record<string, string> = { create: "created", update: "updated", delete: "deleted" };

export const ACTION_ICONS: Record<string, LucideIcon> = { create: Plus, update: Pencil, delete: Trash2 };

export const ACTION_COLORS: Record<string, string> = {
  create: "bg-emerald-50 text-emerald-600",
  update: "bg-orange-50 text-orange-600",
  delete: "bg-red-50 text-red-600",
};

export const ENTITY_LABELS: Record<string, string> = {
  article: "article",
  faq: "FAQ",
  testimonial: "testimonial",
  section: "section",
  site_settings: "site settings",
};

export function timeAgo(date: Date): string {
  const seconds = Math.round((Date.now() - date.getTime()) / 1000);
  const units: [Intl.RelativeTimeFormatUnit, number][] = [
    ["year", 31536000],
    ["month", 2592000],
    ["day", 86400],
    ["hour", 3600],
    ["minute", 60],
  ];
  for (const [unit, secondsInUnit] of units) {
    const value = Math.floor(seconds / secondsInUnit);
    if (value >= 1) return new Intl.RelativeTimeFormat("en", { numeric: "auto" }).format(-value, unit);
  }
  return "just now";
}
