import { z } from "zod";

export type ItemFieldConfig =
  | { type: "text"; key: string; label: string }
  | { type: "textarea"; key: string; label: string }
  | { type: "icon"; key: string; label: string };

export type FieldConfig =
  | ItemFieldConfig
  | { type: "list-text"; key: string; label: string; itemLabel: string }
  | { type: "list-object"; key: string; label: string; itemLabel: string; itemFields: ItemFieldConfig[] };

export interface SectionSchema {
  name: string;
  zod: z.ZodTypeAny;
  fields: FieldConfig[];
}

const statItemSchema = z.object({ value: z.string().min(1), label: z.string().min(1) });
const amenityItemSchema = z.object({ icon: z.string().min(1), label: z.string().min(1) });
const stayItemSchema = z.object({ icon: z.string().min(1), title: z.string().min(1), description: z.string().min(1) });
const comparisonRowSchema = z.object({ label: z.string().min(1), direct: z.string().min(1), other: z.string().min(1) });

const welcomeContentSchema = z.object({
  stats: z.array(statItemSchema).min(1),
  points: z.array(z.string().min(1)).min(1),
});

const amenitiesContentSchema = z.object({
  heading: z.string().min(1),
  description: z.string().min(1),
  items: z.array(amenityItemSchema).min(1),
});

const theStayContentSchema = z.object({
  eyebrow: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  note: z.string().min(1),
  items: z.array(stayItemSchema).min(1),
});

const directBookingContentSchema = z.object({
  badgeLabel: z.string().min(1),
  heading: z.string().min(1),
  comparisonRows: z.array(comparisonRowSchema).min(1),
  quote: z.string().min(1),
  buttonLabel: z.string().min(1),
  buttonHref: z.string().min(1),
});

const trustItemSchema = z.object({ icon: z.string().min(1), title: z.string().min(1) });

const heroContentSchema = z.object({
  badgeText: z.string().min(1),
  headingPrefix: z.string().min(1),
  headingHighlight: z.string().min(1),
  description: z.string().min(1),
  trustItems: z.array(trustItemSchema).min(1),
});

const featuredHomesContentSchema = z.object({
  eyebrow: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  buttonLabel: z.string().min(1),
  buttonHref: z.string().min(1),
});

const whatPeopleSayContentSchema = z.object({
  eyebrow: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
});

const linkItemSchema = z.object({ label: z.string().min(1), href: z.string().min(1) });

const navLinksContentSchema = z.object({
  links: z.array(linkItemSchema).min(1),
});

const footerLinksContentSchema = z.object({
  quickLinks: z.array(linkItemSchema).min(1),
  legalLinks: z.array(linkItemSchema).min(1),
});

const ctaContentSchema = z.object({
  heading: z.string().min(1),
  description: z.string().min(1),
  primaryButtonLabel: z.string().min(1),
  primaryButtonHref: z.string().min(1),
  secondaryButtonLabel: z.string().min(1),
  secondaryButtonHref: z.string().min(1),
  faqEyebrow: z.string().min(1),
  faqHeadingLine1: z.string().min(1),
  faqHeadingLine2: z.string().min(1),
});

// Registry key is `${page.slug}:${section.key}`. Pages/sections not listed
// here aren't editable through the admin yet — extend page by page.
export const SECTION_SCHEMAS: Record<string, SectionSchema> = {
  "home:hero": {
    name: "Hero",
    zod: heroContentSchema,
    fields: [
      { type: "text", key: "badgeText", label: "Badge text" },
      { type: "text", key: "headingPrefix", label: "Heading (first part)" },
      { type: "text", key: "headingHighlight", label: "Heading (highlighted part)" },
      { type: "textarea", key: "description", label: "Description" },
      {
        type: "list-object",
        key: "trustItems",
        label: "Trust badges",
        itemLabel: "Badge",
        itemFields: [
          { type: "icon", key: "icon", label: "Icon" },
          { type: "text", key: "title", label: "Title" },
        ],
      },
    ],
  },
  "home:featured-homes": {
    name: "Featured Homes",
    zod: featuredHomesContentSchema,
    fields: [
      { type: "text", key: "eyebrow", label: "Eyebrow" },
      { type: "text", key: "title", label: "Title" },
      { type: "textarea", key: "description", label: "Description" },
      { type: "text", key: "buttonLabel", label: "Button label" },
      { type: "text", key: "buttonHref", label: "Button link" },
    ],
  },
  "home:welcome": {
    name: "Welcome",
    zod: welcomeContentSchema,
    fields: [
      {
        type: "list-object",
        key: "stats",
        label: "Stats",
        itemLabel: "Stat",
        itemFields: [
          { type: "text", key: "value", label: "Value" },
          { type: "text", key: "label", label: "Label" },
        ],
      },
      { type: "list-text", key: "points", label: "Bullet points", itemLabel: "Point" },
    ],
  },
  "home:amenities": {
    name: "Amenities",
    zod: amenitiesContentSchema,
    fields: [
      { type: "text", key: "heading", label: "Heading" },
      { type: "textarea", key: "description", label: "Description" },
      {
        type: "list-object",
        key: "items",
        label: "Amenities",
        itemLabel: "Amenity",
        itemFields: [
          { type: "icon", key: "icon", label: "Icon" },
          { type: "text", key: "label", label: "Label" },
        ],
      },
    ],
  },
  "home:the-stay": {
    name: "The Stay",
    zod: theStayContentSchema,
    fields: [
      { type: "text", key: "eyebrow", label: "Eyebrow" },
      { type: "text", key: "title", label: "Title" },
      { type: "textarea", key: "description", label: "Description" },
      { type: "textarea", key: "note", label: "Note (italic disclaimer)" },
      {
        type: "list-object",
        key: "items",
        label: "Items",
        itemLabel: "Item",
        itemFields: [
          { type: "icon", key: "icon", label: "Icon" },
          { type: "text", key: "title", label: "Title" },
          { type: "textarea", key: "description", label: "Description" },
        ],
      },
    ],
  },
  "home:direct-booking": {
    name: "Direct Booking",
    zod: directBookingContentSchema,
    fields: [
      { type: "text", key: "badgeLabel", label: "Badge label" },
      { type: "text", key: "heading", label: "Heading" },
      {
        type: "list-object",
        key: "comparisonRows",
        label: "Comparison rows",
        itemLabel: "Row",
        itemFields: [
          { type: "text", key: "label", label: "Row label" },
          { type: "text", key: "direct", label: "Direct with us" },
          { type: "text", key: "other", label: "Airbnb / Booking.com" },
        ],
      },
      { type: "textarea", key: "quote", label: "Quote" },
      { type: "text", key: "buttonLabel", label: "Button label" },
      { type: "text", key: "buttonHref", label: "Button link" },
    ],
  },
  "home:what-people-say": {
    name: "What People Say",
    zod: whatPeopleSayContentSchema,
    fields: [
      { type: "text", key: "eyebrow", label: "Eyebrow" },
      { type: "text", key: "title", label: "Title" },
      { type: "textarea", key: "description", label: "Description" },
    ],
  },
  "home:cta": {
    name: "CTA",
    zod: ctaContentSchema,
    fields: [
      { type: "text", key: "heading", label: "Heading" },
      { type: "textarea", key: "description", label: "Description" },
      { type: "text", key: "primaryButtonLabel", label: "Primary button label" },
      { type: "text", key: "primaryButtonHref", label: "Primary button link" },
      { type: "text", key: "secondaryButtonLabel", label: "Secondary button label" },
      { type: "text", key: "secondaryButtonHref", label: "Secondary button link" },
      { type: "text", key: "faqEyebrow", label: "FAQ eyebrow" },
      { type: "text", key: "faqHeadingLine1", label: "FAQ heading (line 1)" },
      { type: "text", key: "faqHeadingLine2", label: "FAQ heading (line 2, italic)" },
    ],
  },
  "global:nav-links": {
    name: "Nav Links",
    zod: navLinksContentSchema,
    fields: [
      {
        type: "list-object",
        key: "links",
        label: "Navbar links",
        itemLabel: "Link",
        itemFields: [
          { type: "text", key: "label", label: "Label" },
          { type: "text", key: "href", label: "Link (path)" },
        ],
      },
    ],
  },
  "global:footer-links": {
    name: "Footer Links",
    zod: footerLinksContentSchema,
    fields: [
      {
        type: "list-object",
        key: "quickLinks",
        label: "Quick links",
        itemLabel: "Link",
        itemFields: [
          { type: "text", key: "label", label: "Label" },
          { type: "text", key: "href", label: "Link (path)" },
        ],
      },
      {
        type: "list-object",
        key: "legalLinks",
        label: "Legal links",
        itemLabel: "Link",
        itemFields: [
          { type: "text", key: "label", label: "Label" },
          { type: "text", key: "href", label: "Link (path)" },
        ],
      },
    ],
  },
};

export const PAGE_TITLES: Record<string, string> = {
  home: "Home",
  global: "Global (Navbar & Footer)",
};

// Matches the actual on-page section order (see app/(marketing)/page.tsx) so
// the admin list reads top-to-bottom the same way the live page does.
const SECTION_ORDER: Record<string, string[]> = {
  home: ["hero", "welcome", "featured-homes", "amenities", "the-stay", "direct-booking", "what-people-say", "cta"],
  global: ["nav-links", "footer-links"],
};

export function sectionsForPage(pageSlug: string): { key: string; schema: SectionSchema }[] {
  const order = SECTION_ORDER[pageSlug] ?? [];
  return Object.entries(SECTION_SCHEMAS)
    .filter(([id]) => id.startsWith(`${pageSlug}:`))
    .map(([id, schema]) => ({ key: id.split(":")[1], schema }))
    .sort((a, b) => order.indexOf(a.key) - order.indexOf(b.key));
}
