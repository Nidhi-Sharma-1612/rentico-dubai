import { z } from "zod";
import {
  ArrowRight,
  BedDouble,
  Building2,
  Calendar,
  ClipboardList,
  Compass,
  FileStack,
  FileText,
  Globe,
  Handshake,
  Heart,
  Home,
  Layers,
  Link2,
  LineChart,
  LockKeyhole,
  MapPinned,
  Palette,
  Percent,
  Phone,
  Quote,
  ScrollText,
  Search,
  Shield,
  ShieldCheck,
  Smartphone,
  Sofa,
  Sparkles,
  Star,
  Users,
  Wrench,
  type LucideIcon,
} from "lucide-react";

export type ItemFieldConfig =
  | { type: "text"; key: string; label: string }
  | { type: "textarea"; key: string; label: string }
  | { type: "icon"; key: string; label: string }
  | { type: "image"; key: string; label: string };

export type FieldConfig =
  | ItemFieldConfig
  | { type: "list-text"; key: string; label: string; itemLabel: string }
  | { type: "list-object"; key: string; label: string; itemLabel: string; itemFields: ItemFieldConfig[] }
  | { type: "blocks"; key: string; label: string };

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
  image: z.string().min(1),
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
  backgroundImage: z.string().min(1),
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

const experienceHeroContentSchema = z.object({
  eyebrow: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
});

const experienceCategoryItemSchema = z.object({
  icon: z.string().min(1),
  category: z.string().min(1),
  title: z.string().min(1),
  alt: z.string().min(1),
  description: z.string().min(1),
  image: z.string().min(1),
});

const experienceCategoriesContentSchema = z.object({
  items: z.array(experienceCategoryItemSchema).min(1),
});

const experienceCtaContentSchema = z.object({
  heading: z.string().min(1),
  description: z.string().min(1),
  whatsappButtonLabel: z.string().min(1),
  secondaryButtonLabel: z.string().min(1),
  secondaryButtonHref: z.string().min(1),
  faqEyebrow: z.string().min(1),
  faqHeading: z.string().min(1),
});

const partnerStatItemSchema = z.object({ icon: z.string().min(1), value: z.string().min(1), label: z.string().min(1) });

const partnerHeroContentSchema = z.object({
  eyebrow: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  primaryButtonLabel: z.string().min(1),
  whatsappButtonLabel: z.string().min(1),
  image: z.string().min(1),
  badgeValue: z.string().min(1),
  badgeLabel: z.string().min(1),
  stats: z.array(partnerStatItemSchema).min(1),
});

const audienceToggleContentSchema = z.object({
  brokerTitle: z.string().min(1),
  brokerDescription: z.string().min(1),
  developerTitle: z.string().min(1),
  developerDescription: z.string().min(1),
});

const commissionCalculatorContentSchema = z.object({
  eyebrow: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  disclosureText: z.string().min(1),
});

const noConflictPointSchema = z.object({ icon: z.string().min(1), lead: z.string().min(1), text: z.string().min(1) });

const noConflictContentSchema = z.object({
  eyebrow: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  points: z.array(noConflictPointSchema).min(1),
});

const partnerStepItemSchema = z.object({ title: z.string().min(1), description: z.string().min(1) });

const partnerStepsContentSchema = z.object({
  eyebrow: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  steps: z.array(partnerStepItemSchema).min(1),
});

const operatorStatItemSchema = z.object({
  icon: z.string().min(1),
  value: z.string().min(1),
  description: z.string().min(1),
});

const operatorStatsContentSchema = z.object({
  eyebrow: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  stats: z.array(operatorStatItemSchema).min(1),
});

const partnerFormSectionContentSchema = z.object({
  registerEyebrow: z.string().min(1),
  registerTitle: z.string().min(1),
  registerDescription: z.string().min(1),
  faqEyebrow: z.string().min(1),
  faqTitle: z.string().min(1),
});

const servicesCredibilityItemSchema = z.object({ icon: z.string().min(1), label: z.string().min(1) });

const servicesHeroContentSchema = z.object({
  eyebrow: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  primaryButtonLabel: z.string().min(1),
  secondaryButtonLabel: z.string().min(1),
  tagline: z.string().min(1),
  image: z.string().min(1),
  badgeValue: z.string().min(1),
  badgeLabel: z.string().min(1),
  credibility: z.array(servicesCredibilityItemSchema).min(1),
});

const whyRenticoPerkSchema = z.object({ icon: z.string().min(1), text: z.string().min(1) });

const whyRenticoContentSchema = z.object({
  eyebrow: z.string().min(1),
  title: z.string().min(1),
  paragraphs: z.array(z.string().min(1)).min(1),
  buttonLabel: z.string().min(1),
  perksHeading: z.string().min(1),
  perks: z.array(whyRenticoPerkSchema).min(1),
  skinInGameText: z.string().min(1),
  skinStat1Value: z.string().min(1),
  skinStat1Label: z.string().min(1),
  skinStat2Value: z.string().min(1),
  skinStat2Label: z.string().min(1),
});

const whatWeHandleItemSchema = z.object({
  icon: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
});

const whatWeHandleContentSchema = z.object({
  eyebrow: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  items: z.array(whatWeHandleItemSchema).min(1),
});

const onboardingStepItemSchema = z.object({ title: z.string().min(1), description: z.string().min(1) });

const onboardingStepsContentSchema = z.object({
  eyebrow: z.string().min(1),
  title: z.string().min(1),
  steps: z.array(onboardingStepItemSchema).min(1),
});

const iconChecklistItemSchema = z.object({ icon: z.string().min(1), label: z.string().min(1) });

const pricingDesignContentSchema = z.object({
  eyebrow: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  buttonLabel: z.string().min(1),
  essentialName: z.string().min(1),
  essentialSubtitle: z.string().min(1),
  essentialDescription: z.string().min(1),
  essentialImage: z.string().min(1),
  essentialPerfectFor: z.string().min(1),
  essentialChecklist: z.array(z.string().min(1)).min(1),
  elevatedName: z.string().min(1),
  elevatedSubtitle: z.string().min(1),
  elevatedDescription: z.string().min(1),
  elevatedImage: z.string().min(1),
  elevatedPerfectFor: z.string().min(1),
  elevatedChecklist: z.array(iconChecklistItemSchema).min(1),
  signatureName: z.string().min(1),
  signatureSubtitle: z.string().min(1),
  signatureDescription: z.string().min(1),
  signatureImage: z.string().min(1),
  signaturePerfectFor: z.string().min(1),
  signatureChecklist: z.array(z.string().min(1)).min(1),
});

const ownerAppPreviewItemSchema = z.object({ icon: z.string().min(1), label: z.string().min(1) });

const ownerAppContentSchema = z.object({
  eyebrow: z.string().min(1),
  headingLine1: z.string().min(1),
  headingLine2: z.string().min(1),
  description: z.string().min(1),
  points: z.array(z.string().min(1)).min(1),
  appEyebrow: z.string().min(1),
  appHeading: z.string().min(1),
  previewItems: z.array(ownerAppPreviewItemSchema).min(1),
});

const operatingStatItemSchema = z.object({
  label: z.string().min(1),
  value: z.string().min(1),
  caption: z.string().min(1),
});

const operatingResultItemSchema = z.object({
  quote: z.string().min(1),
  name: z.string().min(1),
  role: z.string().min(1),
});

const whereWeOperateContentSchema = z.object({
  eyebrow: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  portfolioHeading: z.string().min(1),
  portfolioDescription: z.string().min(1),
  stats: z.array(operatingStatItemSchema).min(1),
  resultsHeading: z.string().min(1),
  results: z.array(operatingResultItemSchema).min(1),
});

const servicesCtaContentSchema = z.object({
  heading: z.string().min(1),
  description: z.string().min(1),
  whatsappButtonLabel: z.string().min(1),
  sendDetailsLabel: z.string().min(1),
  faqEyebrow: z.string().min(1),
  faqTitle: z.string().min(1),
});

const aboutHeroContentSchema = z.object({
  eyebrow: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
});

const aboutStoryContentSchema = z.object({
  eyebrow: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  paragraph: z.string().min(1),
  image: z.string().min(1),
});

const aboutStatItemSchema = z.object({ value: z.string().min(1), label: z.string().min(1) });

const aboutStatsContentSchema = z.object({
  stats: z.array(aboutStatItemSchema).min(1),
});

const aboutValueItemSchema = z.object({
  icon: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
});

const aboutValuesContentSchema = z.object({
  eyebrow: z.string().min(1),
  title: z.string().min(1),
  values: z.array(aboutValueItemSchema).min(1),
});

const aboutAreaItemSchema = z.object({ name: z.string().min(1), description: z.string().min(1) });

const aboutAreasServedContentSchema = z.object({
  eyebrow: z.string().min(1),
  title: z.string().min(1),
  areas: z.array(aboutAreaItemSchema).min(1),
});

const aboutCtaContentSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  primaryLabel: z.string().min(1),
  primaryHref: z.string().min(1),
  secondaryLabel: z.string().min(1),
  secondaryHref: z.string().min(1),
});

const genericHeroContentSchema = z.object({
  eyebrow: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
});

const contactDetailsContentSchema = z.object({
  eyebrow: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
});

const insightsCtaContentSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  primaryLabel: z.string().min(1),
  primaryHref: z.string().min(1),
});

const ownerLoginPerkSchema = z.object({ icon: z.string().min(1), label: z.string().min(1) });

const ownerLoginContentSchema = z.object({
  badgeLabel: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  perks: z.array(ownerLoginPerkSchema).min(1),
  buttonLabel: z.string().min(1),
  buttonHref: z.string().min(1),
  footerNote: z.string().min(1),
  footerLinkLabel: z.string().min(1),
  footerLinkHref: z.string().min(1),
});

// Shared by every page's "seo" section — the browser-tab title and search
// snippet, editable independently from the page's on-page hero copy.
const seoContentSchema = z.object({
  metaTitle: z.string().min(1),
  metaDescription: z.string().min(1),
});

const SEO_FIELDS = [
  { type: "text" as const, key: "metaTitle", label: "Meta title (browser tab / search result title)" },
  { type: "textarea" as const, key: "metaDescription", label: "Meta description (search result snippet)" },
];

const SEO_PAGE_SLUGS = [
  "home",
  "experience",
  "become-a-partner",
  "manage-my-property",
  "about-us",
  "contact",
  "insights",
  "owner-login",
  "book-your-stay",
  "privacy-policy",
  "terms-conditions",
];

// Matches ArticleBlock in lib/types.ts — kept in sync manually since this
// file can't import the "use server" articles/actions.ts schema.
const legalBlockSchema = z.discriminatedUnion("type", [
  z.object({ type: z.literal("paragraph"), text: z.string().min(1) }),
  z.object({ type: z.literal("heading"), text: z.string().min(1) }),
  z.object({ type: z.literal("list"), items: z.array(z.string().min(1)).min(1) }),
  z.object({ type: z.literal("quote"), text: z.string().min(1) }),
]);

const legalContentSchema = z.object({
  heroEyebrow: z.string().min(1),
  heroTitle: z.string().min(1),
  heroDescription: z.string().min(1),
  lastUpdated: z.string().min(1),
  blocks: z.array(legalBlockSchema).min(1),
  ctaHeading: z.string().min(1),
  ctaDescription: z.string().min(1),
  ctaButtonLabel: z.string().min(1),
  ctaButtonHref: z.string().min(1),
});

const LEGAL_FIELDS: FieldConfig[] = [
  { type: "text", key: "heroEyebrow", label: "Hero eyebrow" },
  { type: "text", key: "heroTitle", label: "Hero title" },
  { type: "textarea", key: "heroDescription", label: "Hero description" },
  { type: "text", key: "lastUpdated", label: "Last updated (e.g. 10 August 2026)" },
  { type: "blocks", key: "blocks", label: "Policy content" },
  { type: "text", key: "ctaHeading", label: "CTA heading" },
  { type: "textarea", key: "ctaDescription", label: "CTA description" },
  { type: "text", key: "ctaButtonLabel", label: "CTA button label" },
  { type: "text", key: "ctaButtonHref", label: "CTA button link" },
];

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
      { type: "image", key: "backgroundImage", label: "Background photo" },
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
      { type: "image", key: "image", label: "Photo" },
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
  "experience:hero": {
    name: "Hero",
    zod: experienceHeroContentSchema,
    fields: [
      { type: "text", key: "eyebrow", label: "Eyebrow" },
      { type: "text", key: "title", label: "Title" },
      { type: "textarea", key: "description", label: "Description" },
    ],
  },
  "experience:categories": {
    name: "Categories",
    zod: experienceCategoriesContentSchema,
    fields: [
      {
        type: "list-object",
        key: "items",
        label: "Experience categories",
        itemLabel: "Category",
        itemFields: [
          { type: "icon", key: "icon", label: "Icon" },
          { type: "text", key: "category", label: "Category label" },
          { type: "text", key: "title", label: "Title" },
          { type: "text", key: "alt", label: "Image alt text" },
          { type: "textarea", key: "description", label: "Description" },
          { type: "image", key: "image", label: "Photo" },
        ],
      },
    ],
  },
  "experience:cta": {
    name: "CTA",
    zod: experienceCtaContentSchema,
    fields: [
      { type: "text", key: "heading", label: "Heading" },
      { type: "textarea", key: "description", label: "Description" },
      { type: "text", key: "whatsappButtonLabel", label: "WhatsApp button label" },
      { type: "text", key: "secondaryButtonLabel", label: "Secondary button label" },
      { type: "text", key: "secondaryButtonHref", label: "Secondary button link" },
      { type: "text", key: "faqEyebrow", label: "FAQ eyebrow" },
      { type: "text", key: "faqHeading", label: "FAQ heading" },
    ],
  },
  "become-a-partner:hero": {
    name: "Hero",
    zod: partnerHeroContentSchema,
    fields: [
      { type: "text", key: "eyebrow", label: "Eyebrow" },
      { type: "text", key: "title", label: "Title" },
      { type: "textarea", key: "description", label: "Description" },
      { type: "text", key: "primaryButtonLabel", label: "Primary button label" },
      { type: "text", key: "whatsappButtonLabel", label: "WhatsApp button label" },
      { type: "image", key: "image", label: "Photo" },
      { type: "text", key: "badgeValue", label: "Floating badge value" },
      { type: "text", key: "badgeLabel", label: "Floating badge label" },
      {
        type: "list-object",
        key: "stats",
        label: "Stats",
        itemLabel: "Stat",
        itemFields: [
          { type: "icon", key: "icon", label: "Icon" },
          { type: "text", key: "value", label: "Value" },
          { type: "text", key: "label", label: "Label" },
        ],
      },
    ],
  },
  "become-a-partner:audience-toggle": {
    name: "Audience Toggle",
    zod: audienceToggleContentSchema,
    fields: [
      { type: "text", key: "brokerTitle", label: "Broker segment title" },
      { type: "text", key: "brokerDescription", label: "Broker segment description" },
      { type: "text", key: "developerTitle", label: "Developer segment title" },
      { type: "text", key: "developerDescription", label: "Developer segment description" },
    ],
  },
  "become-a-partner:commission-calculator": {
    name: "Commission Calculator",
    zod: commissionCalculatorContentSchema,
    fields: [
      { type: "text", key: "eyebrow", label: "Eyebrow" },
      { type: "text", key: "title", label: "Title" },
      { type: "textarea", key: "description", label: "Description" },
      { type: "textarea", key: "disclosureText", label: "\"How and when this gets paid\" text" },
    ],
  },
  "become-a-partner:no-conflict": {
    name: "No Conflict",
    zod: noConflictContentSchema,
    fields: [
      { type: "text", key: "eyebrow", label: "Eyebrow" },
      { type: "text", key: "title", label: "Title" },
      { type: "textarea", key: "description", label: "Description" },
      {
        type: "list-object",
        key: "points",
        label: "Points",
        itemLabel: "Point",
        itemFields: [
          { type: "icon", key: "icon", label: "Icon" },
          { type: "text", key: "lead", label: "Lead-in (bold)" },
          { type: "textarea", key: "text", label: "Text" },
        ],
      },
    ],
  },
  "become-a-partner:steps": {
    name: "How It Works",
    zod: partnerStepsContentSchema,
    fields: [
      { type: "text", key: "eyebrow", label: "Eyebrow" },
      { type: "text", key: "title", label: "Title" },
      { type: "text", key: "description", label: "Description" },
      {
        type: "list-object",
        key: "steps",
        label: "Steps",
        itemLabel: "Step",
        itemFields: [
          { type: "text", key: "title", label: "Title" },
          { type: "textarea", key: "description", label: "Description" },
        ],
      },
    ],
  },
  "become-a-partner:operator-stats": {
    name: "Operator Stats",
    zod: operatorStatsContentSchema,
    fields: [
      { type: "text", key: "eyebrow", label: "Eyebrow" },
      { type: "text", key: "title", label: "Title" },
      { type: "textarea", key: "description", label: "Description" },
      {
        type: "list-object",
        key: "stats",
        label: "Stats",
        itemLabel: "Stat",
        itemFields: [
          { type: "icon", key: "icon", label: "Icon" },
          { type: "text", key: "value", label: "Value" },
          { type: "textarea", key: "description", label: "Description" },
        ],
      },
    ],
  },
  "become-a-partner:form-section": {
    name: "Registration & FAQ",
    zod: partnerFormSectionContentSchema,
    fields: [
      { type: "text", key: "registerEyebrow", label: "Register eyebrow" },
      { type: "text", key: "registerTitle", label: "Register title" },
      { type: "textarea", key: "registerDescription", label: "Register description" },
      { type: "text", key: "faqEyebrow", label: "FAQ eyebrow" },
      { type: "text", key: "faqTitle", label: "FAQ title" },
    ],
  },
  "manage-my-property:hero": {
    name: "Hero",
    zod: servicesHeroContentSchema,
    fields: [
      { type: "text", key: "eyebrow", label: "Eyebrow" },
      { type: "text", key: "title", label: "Title" },
      { type: "textarea", key: "description", label: "Description" },
      { type: "text", key: "primaryButtonLabel", label: "Primary button label" },
      { type: "text", key: "secondaryButtonLabel", label: "Secondary button label" },
      { type: "text", key: "tagline", label: "Tagline" },
      { type: "image", key: "image", label: "Photo" },
      { type: "text", key: "badgeValue", label: "Floating badge value" },
      { type: "text", key: "badgeLabel", label: "Floating badge label" },
      {
        type: "list-object",
        key: "credibility",
        label: "Credibility badges",
        itemLabel: "Badge",
        itemFields: [
          { type: "icon", key: "icon", label: "Icon" },
          { type: "text", key: "label", label: "Label" },
        ],
      },
    ],
  },
  "manage-my-property:why-rentico": {
    name: "Why Rentico",
    zod: whyRenticoContentSchema,
    fields: [
      { type: "text", key: "eyebrow", label: "Eyebrow" },
      { type: "text", key: "title", label: "Title" },
      { type: "list-text", key: "paragraphs", label: "Paragraphs", itemLabel: "Paragraph" },
      { type: "text", key: "buttonLabel", label: "Button label" },
      { type: "text", key: "perksHeading", label: "Perks heading" },
      {
        type: "list-object",
        key: "perks",
        label: "Perks",
        itemLabel: "Perk",
        itemFields: [
          { type: "icon", key: "icon", label: "Icon" },
          { type: "text", key: "text", label: "Text" },
        ],
      },
      { type: "textarea", key: "skinInGameText", label: "\"Skin in the game\" text" },
      { type: "text", key: "skinStat1Value", label: "Skin-in-game stat 1 value" },
      { type: "text", key: "skinStat1Label", label: "Skin-in-game stat 1 label" },
      { type: "text", key: "skinStat2Value", label: "Skin-in-game stat 2 value" },
      { type: "text", key: "skinStat2Label", label: "Skin-in-game stat 2 label" },
    ],
  },
  "manage-my-property:what-we-handle": {
    name: "What We Handle",
    zod: whatWeHandleContentSchema,
    fields: [
      { type: "text", key: "eyebrow", label: "Eyebrow" },
      { type: "text", key: "title", label: "Title" },
      { type: "textarea", key: "description", label: "Description" },
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
  "manage-my-property:onboarding-steps": {
    name: "Onboarding Steps",
    zod: onboardingStepsContentSchema,
    fields: [
      { type: "text", key: "eyebrow", label: "Eyebrow" },
      { type: "text", key: "title", label: "Title" },
      {
        type: "list-object",
        key: "steps",
        label: "Steps",
        itemLabel: "Step",
        itemFields: [
          { type: "text", key: "title", label: "Title" },
          { type: "textarea", key: "description", label: "Description" },
        ],
      },
    ],
  },
  "manage-my-property:pricing-design": {
    name: "Pricing & Design",
    zod: pricingDesignContentSchema,
    fields: [
      { type: "text", key: "eyebrow", label: "Eyebrow" },
      { type: "text", key: "title", label: "Title" },
      { type: "textarea", key: "description", label: "Description" },
      { type: "text", key: "buttonLabel", label: "Button label" },
      { type: "text", key: "essentialName", label: "Essential — name" },
      { type: "text", key: "essentialSubtitle", label: "Essential — subtitle" },
      { type: "textarea", key: "essentialDescription", label: "Essential — description" },
      { type: "image", key: "essentialImage", label: "Essential — photo" },
      { type: "text", key: "essentialPerfectFor", label: "Essential — perfect for" },
      { type: "list-text", key: "essentialChecklist", label: "Essential — checklist", itemLabel: "Item" },
      { type: "text", key: "elevatedName", label: "Elevated — name" },
      { type: "text", key: "elevatedSubtitle", label: "Elevated — subtitle" },
      { type: "textarea", key: "elevatedDescription", label: "Elevated — description" },
      { type: "image", key: "elevatedImage", label: "Elevated — photo" },
      { type: "text", key: "elevatedPerfectFor", label: "Elevated — perfect for" },
      {
        type: "list-object",
        key: "elevatedChecklist",
        label: "Elevated — checklist",
        itemLabel: "Item",
        itemFields: [
          { type: "icon", key: "icon", label: "Icon" },
          { type: "text", key: "label", label: "Label" },
        ],
      },
      { type: "text", key: "signatureName", label: "Signature — name" },
      { type: "text", key: "signatureSubtitle", label: "Signature — subtitle" },
      { type: "textarea", key: "signatureDescription", label: "Signature — description" },
      { type: "image", key: "signatureImage", label: "Signature — photo" },
      { type: "text", key: "signaturePerfectFor", label: "Signature — perfect for" },
      { type: "list-text", key: "signatureChecklist", label: "Signature — checklist", itemLabel: "Item" },
    ],
  },
  "manage-my-property:owner-app": {
    name: "Owner App",
    zod: ownerAppContentSchema,
    fields: [
      { type: "text", key: "eyebrow", label: "Eyebrow" },
      { type: "text", key: "headingLine1", label: "Heading (line 1)" },
      { type: "text", key: "headingLine2", label: "Heading (line 2, italic)" },
      { type: "textarea", key: "description", label: "Description" },
      { type: "list-text", key: "points", label: "Points", itemLabel: "Point" },
      { type: "text", key: "appEyebrow", label: "App card eyebrow" },
      { type: "text", key: "appHeading", label: "App card heading" },
      {
        type: "list-object",
        key: "previewItems",
        label: "Preview tiles",
        itemLabel: "Tile",
        itemFields: [
          { type: "icon", key: "icon", label: "Icon" },
          { type: "text", key: "label", label: "Label" },
        ],
      },
    ],
  },
  "manage-my-property:where-we-operate": {
    name: "Where We Operate",
    zod: whereWeOperateContentSchema,
    fields: [
      { type: "text", key: "eyebrow", label: "Eyebrow" },
      { type: "text", key: "title", label: "Title" },
      { type: "textarea", key: "description", label: "Description" },
      { type: "text", key: "portfolioHeading", label: "Portfolio standard heading" },
      { type: "textarea", key: "portfolioDescription", label: "Portfolio standard description" },
      {
        type: "list-object",
        key: "stats",
        label: "Stats",
        itemLabel: "Stat",
        itemFields: [
          { type: "text", key: "label", label: "Label" },
          { type: "text", key: "value", label: "Value" },
          { type: "text", key: "caption", label: "Caption" },
        ],
      },
      { type: "text", key: "resultsHeading", label: "Results heading" },
      {
        type: "list-object",
        key: "results",
        label: "Owner results",
        itemLabel: "Result",
        itemFields: [
          { type: "textarea", key: "quote", label: "Quote" },
          { type: "text", key: "name", label: "Name" },
          { type: "text", key: "role", label: "Role" },
        ],
      },
    ],
  },
  "manage-my-property:cta": {
    name: "CTA",
    zod: servicesCtaContentSchema,
    fields: [
      { type: "text", key: "heading", label: "Heading" },
      { type: "textarea", key: "description", label: "Description" },
      { type: "text", key: "whatsappButtonLabel", label: "WhatsApp button label" },
      { type: "text", key: "sendDetailsLabel", label: "\"Send details instead\" label" },
      { type: "text", key: "faqEyebrow", label: "FAQ eyebrow" },
      { type: "text", key: "faqTitle", label: "FAQ title" },
    ],
  },
  "about-us:hero": {
    name: "Hero",
    zod: aboutHeroContentSchema,
    fields: [
      { type: "text", key: "eyebrow", label: "Eyebrow" },
      { type: "text", key: "title", label: "Title" },
      { type: "textarea", key: "description", label: "Description" },
    ],
  },
  "about-us:story": {
    name: "Our Story",
    zod: aboutStoryContentSchema,
    fields: [
      { type: "text", key: "eyebrow", label: "Eyebrow" },
      { type: "text", key: "title", label: "Title" },
      { type: "textarea", key: "description", label: "Description" },
      { type: "textarea", key: "paragraph", label: "Additional paragraph" },
      { type: "image", key: "image", label: "Photo" },
    ],
  },
  "about-us:stats": {
    name: "Stats",
    zod: aboutStatsContentSchema,
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
    ],
  },
  "about-us:values": {
    name: "Values",
    zod: aboutValuesContentSchema,
    fields: [
      { type: "text", key: "eyebrow", label: "Eyebrow" },
      { type: "text", key: "title", label: "Title" },
      {
        type: "list-object",
        key: "values",
        label: "Values",
        itemLabel: "Value",
        itemFields: [
          { type: "icon", key: "icon", label: "Icon" },
          { type: "text", key: "title", label: "Title" },
          { type: "textarea", key: "description", label: "Description" },
        ],
      },
    ],
  },
  "about-us:areas-served": {
    name: "Areas Served",
    zod: aboutAreasServedContentSchema,
    fields: [
      { type: "text", key: "eyebrow", label: "Eyebrow" },
      { type: "text", key: "title", label: "Title" },
      {
        type: "list-object",
        key: "areas",
        label: "Areas",
        itemLabel: "Area",
        itemFields: [
          { type: "text", key: "name", label: "Name" },
          { type: "textarea", key: "description", label: "Description" },
        ],
      },
    ],
  },
  "about-us:cta": {
    name: "CTA",
    zod: aboutCtaContentSchema,
    fields: [
      { type: "text", key: "title", label: "Title" },
      { type: "textarea", key: "description", label: "Description" },
      { type: "text", key: "primaryLabel", label: "Primary button label" },
      { type: "text", key: "primaryHref", label: "Primary button link" },
      { type: "text", key: "secondaryLabel", label: "Secondary button label" },
      { type: "text", key: "secondaryHref", label: "Secondary button link" },
    ],
  },
  "contact:hero": {
    name: "Hero",
    zod: genericHeroContentSchema,
    fields: [
      { type: "text", key: "eyebrow", label: "Eyebrow" },
      { type: "text", key: "title", label: "Title" },
      { type: "textarea", key: "description", label: "Description" },
    ],
  },
  "contact:details": {
    name: "Contact Details Heading",
    zod: contactDetailsContentSchema,
    fields: [
      { type: "text", key: "eyebrow", label: "Eyebrow" },
      { type: "text", key: "title", label: "Title" },
      { type: "textarea", key: "description", label: "Description" },
    ],
  },
  "insights:hero": {
    name: "Hero",
    zod: genericHeroContentSchema,
    fields: [
      { type: "text", key: "eyebrow", label: "Eyebrow" },
      { type: "text", key: "title", label: "Title" },
      { type: "textarea", key: "description", label: "Description" },
    ],
  },
  "insights:cta": {
    name: "CTA",
    zod: insightsCtaContentSchema,
    fields: [
      { type: "text", key: "title", label: "Title" },
      { type: "textarea", key: "description", label: "Description" },
      { type: "text", key: "primaryLabel", label: "Button label" },
      { type: "text", key: "primaryHref", label: "Button link" },
    ],
  },
  "owner-login:hero": {
    name: "Hero",
    zod: ownerLoginContentSchema,
    fields: [
      { type: "text", key: "badgeLabel", label: "Badge label" },
      { type: "text", key: "title", label: "Title" },
      { type: "textarea", key: "description", label: "Description" },
      {
        type: "list-object",
        key: "perks",
        label: "Perks",
        itemLabel: "Perk",
        itemFields: [
          { type: "icon", key: "icon", label: "Icon" },
          { type: "text", key: "label", label: "Label" },
        ],
      },
      { type: "text", key: "buttonLabel", label: "Button label" },
      { type: "text", key: "buttonHref", label: "Button link" },
      { type: "text", key: "footerNote", label: "Footer note" },
      { type: "text", key: "footerLinkLabel", label: "Footer link label" },
      { type: "text", key: "footerLinkHref", label: "Footer link href" },
    ],
  },
  "book-your-stay:hero": {
    name: "Hero",
    zod: genericHeroContentSchema,
    fields: [
      { type: "text", key: "eyebrow", label: "Eyebrow" },
      { type: "text", key: "title", label: "Title" },
      { type: "textarea", key: "description", label: "Description" },
    ],
  },
  "privacy-policy:content": {
    name: "Content",
    zod: legalContentSchema,
    fields: LEGAL_FIELDS,
  },
  "terms-conditions:content": {
    name: "Content",
    zod: legalContentSchema,
    fields: LEGAL_FIELDS,
  },
  // A "seo" section is added for every real page below, via SEO_PAGE_SLUGS —
  // same meta title/description fields on each, so it's generated rather
  // than repeated by hand nine times.
  ...Object.fromEntries(
    SEO_PAGE_SLUGS.map((slug) => [
      `${slug}:seo`,
      { name: "SEO", zod: seoContentSchema, fields: SEO_FIELDS } satisfies SectionSchema,
    ])
  ),
};

export const PAGE_TITLES: Record<string, string> = {
  home: "Home",
  experience: "Experience",
  "become-a-partner": "Become a Partner",
  "manage-my-property": "Manage My Property",
  "about-us": "About Us",
  contact: "Contact",
  insights: "Insights",
  "owner-login": "Owner Login",
  "book-your-stay": "Book Your Stay",
  "privacy-policy": "Privacy Policy",
  "terms-conditions": "Terms & Conditions",
  global: "Global (Navbar & Footer)",
};

export const PAGE_ICONS: Record<string, LucideIcon> = {
  home: Home,
  experience: Compass,
  "become-a-partner": Handshake,
  "manage-my-property": Building2,
  "about-us": Users,
  contact: Phone,
  insights: FileText,
  "privacy-policy": Shield,
  "terms-conditions": ScrollText,
  "owner-login": LockKeyhole,
  "book-your-stay": Calendar,
  global: Globe,
};

// Keyed by section key — shared across pages since keys like "hero" and
// "cta" repeat. Falls back to FileStack for anything unlisted.
const SECTION_ICONS: Record<string, LucideIcon> = {
  hero: Sparkles,
  welcome: Home,
  "featured-homes": Building2,
  amenities: Sofa,
  "the-stay": BedDouble,
  "direct-booking": Calendar,
  "what-people-say": Quote,
  cta: ArrowRight,
  categories: Layers,
  "audience-toggle": Users,
  "commission-calculator": Percent,
  "no-conflict": ShieldCheck,
  steps: ClipboardList,
  "operator-stats": LineChart,
  "form-section": FileText,
  "why-rentico": Star,
  "what-we-handle": Wrench,
  "onboarding-steps": ClipboardList,
  "pricing-design": Palette,
  "owner-app": Smartphone,
  "where-we-operate": MapPinned,
  story: FileText,
  stats: LineChart,
  values: Heart,
  "areas-served": MapPinned,
  details: Phone,
  "nav-links": Link2,
  "footer-links": Link2,
  content: FileText,
  seo: Search,
};

export function sectionIcon(key: string): LucideIcon {
  return SECTION_ICONS[key] ?? FileStack;
}

// Matches the actual on-page section order (see app/(marketing)/page.tsx) so
// the admin list reads top-to-bottom the same way the live page does.
const SECTION_ORDER: Record<string, string[]> = {
  home: ["hero", "welcome", "featured-homes", "amenities", "the-stay", "direct-booking", "what-people-say", "cta"],
  experience: ["hero", "categories", "cta"],
  "become-a-partner": [
    "hero",
    "audience-toggle",
    "commission-calculator",
    "no-conflict",
    "steps",
    "operator-stats",
    "form-section",
  ],
  "manage-my-property": [
    "hero",
    "why-rentico",
    "what-we-handle",
    "onboarding-steps",
    "pricing-design",
    "owner-app",
    "where-we-operate",
    "cta",
  ],
  "about-us": ["hero", "story", "stats", "values", "areas-served", "cta"],
  contact: ["hero", "details"],
  insights: ["hero", "cta"],
  "owner-login": ["hero"],
  "book-your-stay": ["hero"],
  "privacy-policy": ["content"],
  "terms-conditions": ["content"],
  global: ["nav-links", "footer-links"],
};

export function sectionsForPage(pageSlug: string): { key: string; schema: SectionSchema }[] {
  const order = SECTION_ORDER[pageSlug] ?? [];
  // Keys not listed in SECTION_ORDER (currently just "seo", generated for
  // every page) sort after everything that is — meta settings belong at
  // the bottom of the list, not wherever indexOf(-1) would otherwise put them.
  const rank = (key: string) => {
    const i = order.indexOf(key);
    return i === -1 ? Infinity : i;
  };
  return Object.entries(SECTION_SCHEMAS)
    .filter(([id]) => id.startsWith(`${pageSlug}:`))
    .map(([id, schema]) => ({ key: id.split(":")[1], schema }))
    .sort((a, b) => rank(a.key) - rank(b.key));
}
