import { twMerge } from "tailwind-merge";

export function cn(...classes: Array<string | undefined | false>) {
  return twMerge(classes.filter(Boolean).join(" "));
}

export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
