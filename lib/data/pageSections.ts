import "server-only";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { pages, sections } from "@/lib/db/schema";

interface HeroContent {
  badgeText: string;
  headingPrefix: string;
  headingHighlight: string;
  description: string;
  trustItems: { icon: string; title: string }[];
}

interface FeaturedHomesContent {
  eyebrow: string;
  title: string;
  description: string;
  buttonLabel: string;
  buttonHref: string;
}

interface WhatPeopleSayContent {
  eyebrow: string;
  title: string;
  description: string;
}

interface CtaContent {
  heading: string;
  description: string;
  primaryButtonLabel: string;
  primaryButtonHref: string;
  secondaryButtonLabel: string;
  secondaryButtonHref: string;
  faqEyebrow: string;
  faqHeadingLine1: string;
  faqHeadingLine2: string;
}

interface WelcomeContent {
  stats: { value: string; label: string }[];
  points: string[];
}

interface AmenitiesContent {
  heading: string;
  description: string;
  items: { icon: string; label: string }[];
}

interface TheStayContent {
  eyebrow: string;
  title: string;
  description: string;
  note: string;
  items: { icon: string; title: string; description: string }[];
}

interface DirectBookingContent {
  badgeLabel: string;
  heading: string;
  comparisonRows: { label: string; direct: string; other: string }[];
  quote: string;
  buttonLabel: string;
  buttonHref: string;
}

export interface HomeSections {
  hero: HeroContent;
  featuredHomes: FeaturedHomesContent;
  welcome: WelcomeContent;
  amenities: AmenitiesContent;
  theStay: TheStayContent;
  directBooking: DirectBookingContent;
  whatPeopleSay: WhatPeopleSayContent;
  cta: CtaContent;
}

// Fallback content — mirrors what these sections shipped with before the
// admin Pages editor existed, so the homepage still renders correctly if
// the DB is unreachable or a section hasn't been seeded yet.
const DEFAULT_HOME_SECTIONS: HomeSections = {
  hero: {
    badgeText: "4.9 rated · 20+ homes across Dubai",
    headingPrefix: "Luxury Stays,",
    headingHighlight: "Handled With Care",
    description:
      "Discover Dubai's finest luxury homes — booked direct for preferred rates, exclusive privileges, and a flawless stay from check-in to check-out.",
    trustItems: [
      { icon: "BadgeDollarSign", title: "Best Price Guarantee" },
      { icon: "ShieldCheck", title: "No Hidden Fees" },
      { icon: "Headset", title: "Direct Communication" },
      { icon: "Lock", title: "Flexible & Secure" },
    ],
  },
  featuredHomes: {
    eyebrow: "Featured Homes",
    title: "Handpicked properties, ready to book",
    description:
      "A glimpse of our current portfolio — every home professionally managed, cleaned and styled to a 5-star standard.",
    buttonLabel: "View All Properties",
    buttonHref: "/book-your-stay",
  },
  welcome: {
    stats: [
      { value: "2025", label: "Founded" },
      { value: "20+", label: "Managed Properties" },
      { value: "6", label: "Prime Districts" },
      { value: "4.9★", label: "Average Rating" },
    ],
    points: [
      "Every home professionally cleaned, styled and maintained to a 5-star standard",
      "Homes across Downtown, Business Bay, Palm Jumeirah, Dubai Marina, Dubai Hills & Sobha Hartland",
      "A dedicated local team available around the clock",
    ],
  },
  amenities: {
    heading: "Our Furnished Apartments Features",
    description:
      "Whether you're working remotely, visiting for business, or settling into a new city, Rentico curates every home with the amenities that make it feel like yours.",
    items: [
      { icon: "Wifi", label: "High Speed Wifi" },
      { icon: "Monitor", label: "Beautiful Workspaces" },
      { icon: "Bath", label: "Bathroom Essentials" },
      { icon: "BedDouble", label: "Fresh Linens" },
      { icon: "UtensilsCrossed", label: "Equipped Kitchens" },
      { icon: "KeyRound", label: "Self Check In" },
      { icon: "Sparkles", label: "Professional Cleaning" },
      { icon: "Coffee", label: "Coffee Machine" },
    ],
  },
  theStay: {
    eyebrow: "The Stay",
    title: "Whatever the stay requires.",
    description:
      "A car waiting at the airport. Groceries in the fridge before you land. A chef for an evening at home, a yacht for the morning, a later departure when the flight moves. Ask in advance or midway through — most of it we can arrange the same day.",
    note: "Some of it is complimentary, some is at cost through our partners. We'll always tell you which.",
    items: [
      {
        icon: "Car",
        title: "Airport transfer and chauffeur",
        description: "Met on arrival, and a car with driver for as long as you need one.",
      },
      { icon: "Clock", title: "Early arrival, late departure", description: "Whenever the calendar allows." },
      {
        icon: "ShoppingCart",
        title: "Housekeeping and grocery stocking",
        description: "A clean pathway through longer stays, and the fridge filled before you land.",
      },
      {
        icon: "Star",
        title: "Beyond the apartment",
        description: "Desert, yacht, private tours, and a chef to cook in your kitchen.",
      },
    ],
  },
  directBooking: {
    badgeLabel: "Booked direct",
    heading: "The same home, without the middleman.",
    comparisonRows: [
      { label: "Nightly rate", direct: "15% less", other: "Platform rate" },
      { label: "Service fee", direct: "None", other: "Added at checkout" },
      { label: "Cancellation", direct: "Free up to 7 days before", other: "Varies, often stricter" },
      { label: "Who you speak to", direct: "Our Dubai team, on WhatsApp", other: "Platform messaging" },
      { label: "Early arrival, late departure", direct: "On request", other: "Rarely offered" },
    ],
    quote: "Same apartments. Same team. Same standard. Fewer fees.",
    buttonLabel: "See all homes",
    buttonHref: "/book-your-stay",
  },
  whatPeopleSay: {
    eyebrow: "What People Say",
    title: "Loved by guests and owners alike",
    description: "Real feedback from the people who stay in — and own — our managed homes.",
  },
  cta: {
    heading: "Your next level stay starts here",
    description:
      "Whether you're booking a stay or listing a property, the Rentico team is ready to help — speak to us today.",
    primaryButtonLabel: "Book Your Stay",
    primaryButtonHref: "/book-your-stay",
    secondaryButtonLabel: "List Your Property",
    secondaryButtonHref: "/become-a-partner",
    faqEyebrow: "FAQ",
    faqHeadingLine1: "Common questions,",
    faqHeadingLine2: "answered clearly",
  },
};

export async function getHomeSections(): Promise<HomeSections> {
  try {
    const rows = await db
      .select({ key: sections.key, content: sections.content })
      .from(sections)
      .innerJoin(pages, eq(sections.pageId, pages.id))
      .where(eq(pages.slug, "home"));

    const byKey = Object.fromEntries(rows.map((r) => [r.key, r.content]));

    return {
      hero: (byKey["hero"] as HeroContent) ?? DEFAULT_HOME_SECTIONS.hero,
      featuredHomes: (byKey["featured-homes"] as FeaturedHomesContent) ?? DEFAULT_HOME_SECTIONS.featuredHomes,
      welcome: (byKey["welcome"] as WelcomeContent) ?? DEFAULT_HOME_SECTIONS.welcome,
      amenities: (byKey["amenities"] as AmenitiesContent) ?? DEFAULT_HOME_SECTIONS.amenities,
      theStay: (byKey["the-stay"] as TheStayContent) ?? DEFAULT_HOME_SECTIONS.theStay,
      directBooking: (byKey["direct-booking"] as DirectBookingContent) ?? DEFAULT_HOME_SECTIONS.directBooking,
      whatPeopleSay: (byKey["what-people-say"] as WhatPeopleSayContent) ?? DEFAULT_HOME_SECTIONS.whatPeopleSay,
      cta: (byKey["cta"] as CtaContent) ?? DEFAULT_HOME_SECTIONS.cta,
    };
  } catch (err) {
    console.error("Failed to load home page sections:", err);
    return DEFAULT_HOME_SECTIONS;
  }
}

interface LinkItem {
  label: string;
  href: string;
}

export interface GlobalSections {
  navLinks: LinkItem[];
  footerQuickLinks: LinkItem[];
  footerLegalLinks: LinkItem[];
}

const DEFAULT_GLOBAL_SECTIONS: GlobalSections = {
  navLinks: [
    { label: "Home", href: "/" },
    { label: "Manage my property", href: "/manage-my-property" },
    { label: "Become a Partner", href: "/become-a-partner" },
    { label: "Experience", href: "/experience" },
    { label: "About Us", href: "/about-us" },
  ],
  footerQuickLinks: [
    { label: "Home", href: "/" },
    { label: "Manage my property", href: "/manage-my-property" },
    { label: "About Us", href: "/about-us" },
    { label: "Become a Partner", href: "/become-a-partner" },
    { label: "Insights", href: "/insights" },
    { label: "Experience", href: "/experience" },
    { label: "Contact", href: "/contact" },
  ],
  footerLegalLinks: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms-conditions" },
  ],
};

export async function getGlobalSections(): Promise<GlobalSections> {
  try {
    const rows = await db
      .select({ key: sections.key, content: sections.content })
      .from(sections)
      .innerJoin(pages, eq(sections.pageId, pages.id))
      .where(eq(pages.slug, "global"));

    const byKey = Object.fromEntries(rows.map((r) => [r.key, r.content]));
    const navLinks = byKey["nav-links"] as { links: LinkItem[] } | undefined;
    const footerLinks = byKey["footer-links"] as { quickLinks: LinkItem[]; legalLinks: LinkItem[] } | undefined;

    return {
      navLinks: navLinks?.links ?? DEFAULT_GLOBAL_SECTIONS.navLinks,
      footerQuickLinks: footerLinks?.quickLinks ?? DEFAULT_GLOBAL_SECTIONS.footerQuickLinks,
      footerLegalLinks: footerLinks?.legalLinks ?? DEFAULT_GLOBAL_SECTIONS.footerLegalLinks,
    };
  } catch (err) {
    console.error("Failed to load global sections:", err);
    return DEFAULT_GLOBAL_SECTIONS;
  }
}
