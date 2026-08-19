import "server-only";
import { and, eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { pages, sections } from "@/lib/db/schema";
import type { ArticleBlock } from "@/lib/types";

export interface PageSeo {
  metaTitle: string;
  metaDescription: string;
}

export interface LegalPageContent {
  heroEyebrow: string;
  heroTitle: string;
  heroDescription: string;
  lastUpdated: string;
  blocks: ArticleBlock[];
  ctaHeading: string;
  ctaDescription: string;
  ctaButtonLabel: string;
  ctaButtonHref: string;
}

// Shared by the Privacy Policy and Terms & Conditions pages — both use the
// same "content" section key and shape (hero + block-based body + CTA), so
// one generic fetch covers both instead of a per-page function.
export async function getLegalPageContent(pageSlug: string, fallback: LegalPageContent): Promise<LegalPageContent> {
  try {
    const [row] = await db
      .select({ content: sections.content })
      .from(sections)
      .innerJoin(pages, eq(sections.pageId, pages.id))
      .where(and(eq(pages.slug, pageSlug), eq(sections.key, "content")))
      .limit(1);

    return (row?.content as LegalPageContent) ?? fallback;
  } catch (err) {
    console.error(`Failed to load legal page content for ${pageSlug}:`, err);
    return fallback;
  }
}

// Shared by every page's generateMetadata() — the "seo" section key is the
// same across all pages (see SEO_PAGE_SLUGS in the admin's sectionSchemas.ts),
// so one generic fetch covers all of them instead of a per-page function.
export async function getPageSeo(pageSlug: string, fallback: PageSeo): Promise<PageSeo> {
  try {
    const [row] = await db
      .select({ content: sections.content })
      .from(sections)
      .innerJoin(pages, eq(sections.pageId, pages.id))
      .where(and(eq(pages.slug, pageSlug), eq(sections.key, "seo")))
      .limit(1);

    return (row?.content as PageSeo) ?? fallback;
  } catch (err) {
    console.error(`Failed to load SEO for ${pageSlug}:`, err);
    return fallback;
  }
}

interface HeroContent {
  badgeText: string;
  headingPrefix: string;
  headingHighlight: string;
  description: string;
  backgroundImage: string;
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
  image: string;
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
    backgroundImage:
      "https://static.wixstatic.com/media/b008a0_fd3740c8b02548db9ad8d2638b4736ecf000.jpg/v1/fill/w_2400,h_1600,al_c,q_90,usm_0.33_1.00_0.00,enc_avif,quality_auto/b008a0_fd3740c8b02548db9ad8d2638b4736ecf000.jpg",
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
    image: "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?q=80&w=1400&auto=format&fit=crop",
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
    { label: "Experience", href: "/experience" },
    { label: "Manage my property", href: "/manage-my-property" },
    { label: "Become a Partner", href: "/become-a-partner" },
    { label: "About Us", href: "/about-us" },
  ],
  footerQuickLinks: [
    { label: "Home", href: "/" },
    { label: "Experience", href: "/experience" },
    { label: "Manage my property", href: "/manage-my-property" },
    { label: "About Us", href: "/about-us" },
    { label: "Become a Partner", href: "/become-a-partner" },
    { label: "Insights", href: "/insights" },
    { label: "Contact", href: "/contact" },
  ],
  footerLegalLinks: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms-conditions" },
  ],
};

interface ExperienceHeroContent {
  eyebrow: string;
  title: string;
  description: string;
}

interface ExperienceCategoryItem {
  icon: string;
  category: string;
  title: string;
  alt: string;
  description: string;
  image: string;
}

interface ExperienceCategoriesContent {
  items: ExperienceCategoryItem[];
}

interface ExperienceCtaContent {
  heading: string;
  description: string;
  whatsappButtonLabel: string;
  secondaryButtonLabel: string;
  secondaryButtonHref: string;
  faqEyebrow: string;
  faqHeading: string;
}

export interface ExperienceSections {
  hero: ExperienceHeroContent;
  categories: ExperienceCategoriesContent;
  cta: ExperienceCtaContent;
}

const DEFAULT_EXPERIENCE_SECTIONS: ExperienceSections = {
  hero: {
    eyebrow: "The Experience",
    title: "Everything Dubai has to offer, already arranged",
    description:
      "From the moment you land to the last night out, our concierge team turns your stay into an itinerary — transport, celebrations, adventure, dining, and the access that usually takes connections.",
  },
  categories: {
    items: [
      {
        icon: "Car",
        category: "Transportation",
        title: "Arrival, Handled",
        alt: "Chauffeured luxury car ready for airport arrival",
        description:
          "First impressions start on the tarmac. Chauffeured cars, private jets, helicopter transfers, or something with more horsepower — your Dubai starts exactly the way you pictured it, from the moment you land.",
        image: "https://images.unsplash.com/photo-1568954264787-80157b74c5f3?q=80&w=1400&auto=format&fit=crop",
      },
      {
        icon: "Compass",
        category: "Signature Experiences",
        title: "Dubai, Up Close",
        alt: "Yacht sailing past the Dubai skyline at sunset",
        description:
          "The moments people fly here for. A yacht at golden hour. A table at the restaurant everyone's talking about. Access that usually takes connections — we already have them.",
        image: "https://images.unsplash.com/photo-1770273886464-54794e10e845?q=80&w=1400&auto=format&fit=crop",
      },
      {
        icon: "PartyPopper",
        category: "Celebrations",
        title: "Moments That Deserve More",
        alt: "Proposal setup with a floral arch at sunset",
        description:
          "A proposal on a yacht at sunset. A birthday no one forgets. A wedding that feels like Dubai, not a banquet hall. Tell us the occasion — we'll build the setting, the details, the surprise, all of it.",
        image: "https://images.unsplash.com/photo-1761963503451-e064fea6a2b5?q=80&w=1400&auto=format&fit=crop",
      },
      {
        icon: "Zap",
        category: "Adventure",
        title: "Chase the Rush",
        alt: "Skydiver in freefall over the coastline",
        description:
          "Skydive over Palm Jumeirah and watch the whole city unfold beneath you. Tear across the dunes in a buggy. Jet ski the coastline. If it gets your heart rate up, we've got a way in.",
        image: "https://images.unsplash.com/photo-1659221876406-31a3746f41b9?q=80&w=1400&auto=format&fit=crop",
      },
      {
        icon: "UtensilsCrossed",
        category: "Dining & Entertainment",
        title: "Taste the City",
        alt: "Private chef plating a dish",
        description:
          "A private chef for your last night. A reservation that's usually booked out for weeks. Dubai's food scene, opened up — no guesswork, no waiting.",
        image: "https://images.unsplash.com/photo-1761095596765-c8abe01d3aea?q=80&w=1400&auto=format&fit=crop",
      },
      {
        icon: "Flower2",
        category: "Wellness & Beauty",
        title: "Recharge",
        alt: "Sunrise yoga session on the beach",
        description:
          "In-villa spa, personal training, private yoga at sunrise. Recovery on your schedule, wherever you're staying.",
        image: "https://images.unsplash.com/photo-1671211085251-c49156a49621?q=80&w=1400&auto=format&fit=crop",
      },
      {
        icon: "Route",
        category: "Custom Itineraries",
        title: "Built Around You",
        alt: "Friends planning their trip together on a rooftop",
        description:
          'Tell us who\'s coming and what they\'re into — we\'ll lay out the days so you\'re not the one googling "things to do in Dubai" at midnight.',
        image: "https://images.unsplash.com/photo-1758272133483-281d50324455?q=80&w=1400&auto=format&fit=crop",
      },
      {
        icon: "Ticket",
        category: "VIP Event Access",
        title: "Front Row",
        alt: "Crowd at a grandstand watching a race",
        description:
          "F1 weekends, concerts, festivals — skip the queue and the guesswork. We handle the tickets, the hospitality, the logistics.",
        image: "https://images.unsplash.com/photo-1683645899605-6e485b817261?q=80&w=1400&auto=format&fit=crop",
      },
    ],
  },
  cta: {
    heading: "Tell us the occasion, we'll handle the rest.",
    description:
      "Message our concierge team with your dates and what you're after — we'll come back with options, same day.",
    whatsappButtonLabel: "Chat with us on WhatsApp",
    secondaryButtonLabel: "Book Your Stay",
    secondaryButtonHref: "/book-your-stay",
    faqEyebrow: "FAQ",
    faqHeading: "Questions guests ask us",
  },
};

export async function getExperienceSections(): Promise<ExperienceSections> {
  try {
    const rows = await db
      .select({ key: sections.key, content: sections.content })
      .from(sections)
      .innerJoin(pages, eq(sections.pageId, pages.id))
      .where(eq(pages.slug, "experience"));

    const byKey = Object.fromEntries(rows.map((r) => [r.key, r.content]));

    return {
      hero: (byKey["hero"] as ExperienceHeroContent) ?? DEFAULT_EXPERIENCE_SECTIONS.hero,
      categories: (byKey["categories"] as ExperienceCategoriesContent) ?? DEFAULT_EXPERIENCE_SECTIONS.categories,
      cta: (byKey["cta"] as ExperienceCtaContent) ?? DEFAULT_EXPERIENCE_SECTIONS.cta,
    };
  } catch (err) {
    console.error("Failed to load experience sections:", err);
    return DEFAULT_EXPERIENCE_SECTIONS;
  }
}

interface PartnerHeroContent {
  eyebrow: string;
  title: string;
  description: string;
  primaryButtonLabel: string;
  whatsappButtonLabel: string;
  image: string;
  badgeValue: string;
  badgeLabel: string;
  stats: { icon: string; value: string; label: string }[];
}

interface AudienceToggleContent {
  brokerTitle: string;
  brokerDescription: string;
  developerTitle: string;
  developerDescription: string;
}

interface CommissionCalculatorContent {
  eyebrow: string;
  title: string;
  description: string;
  disclosureText: string;
}

interface NoConflictContent {
  eyebrow: string;
  title: string;
  description: string;
  points: { icon: string; lead: string; text: string }[];
}

interface PartnerStepsContent {
  eyebrow: string;
  title: string;
  description: string;
  steps: { title: string; description: string }[];
}

interface OperatorStatsContent {
  eyebrow: string;
  title: string;
  description: string;
  stats: { icon: string; value: string; description: string }[];
}

interface PartnerFormSectionContent {
  registerEyebrow: string;
  registerTitle: string;
  registerDescription: string;
  faqEyebrow: string;
  faqTitle: string;
}

export interface PartnerSections {
  hero: PartnerHeroContent;
  audienceToggle: AudienceToggleContent;
  commissionCalculator: CommissionCalculatorContent;
  noConflict: NoConflictContent;
  steps: PartnerStepsContent;
  operatorStats: OperatorStatsContent;
  formSection: PartnerFormSectionContent;
}

const DEFAULT_PARTNER_SECTIONS: PartnerSections = {
  hero: {
    eyebrow: "Broker, Agent & Developer Partnerships",
    title: "Send us a property. Keep your client. Get paid.",
    description:
      "Rentico manages short-term rentals across Dubai and Abu Dhabi. You refer the owner, we run the property, and you earn a commission on every unit that goes live — without giving up the relationship.",
    primaryButtonLabel: "See what I'd earn",
    whatsappButtonLabel: "WhatsApp us",
    image: "/DSC09792-HDR-copy.jpg",
    badgeValue: "AED 20,000",
    badgeLabel: "Up to, per referral",
    stats: [
      { icon: "Wallet", value: "Up to AED 20,000", label: "Per referral, paid on go-live" },
      { icon: "Timer", value: "48 hours", label: "From referral to owner quote" },
      { icon: "Users", value: "50+ partners", label: "Brokers & agencies referring" },
      { icon: "ShieldOff", value: "Zero conflict", label: "We never list or sell your client's unit" },
    ],
  },
  audienceToggle: {
    brokerTitle: "Brokers & agents",
    brokerDescription: "Refer owners, earn per unit",
    developerTitle: "Developers & portfolios",
    developerDescription: "Bulk units, handover to revenue",
  },
  commissionCalculator: {
    eyebrow: "Commission Calculator",
    title: "What's a referral worth?",
    description:
      "Add the properties you could send us. You earn 5% of the yearly contracted rent as a one-time referral commission.",
    disclosureText:
      "You earn 5% of the property's yearly contracted rent as a one-time referral fee — as long as the owner places the property under Rentico's management and accepts our 20% management fee. Once the property is live and has taken its first booking, we transfer your commission by bank within 14 days with a written statement.",
  },
  noConflict: {
    eyebrow: "The Part Brokers Actually Worry About",
    title: "We don't touch your client.",
    description:
      "Every broker who has ever been burned by a management company knows the story: you hand over an owner, and six months later that company is selling their next unit. Here's our written position.",
    points: [
      {
        icon: "ShieldCheck",
        lead: "We are not a brokerage.",
        text: "Rentico holds a vacation-home rental licence, not a real estate brokerage licence. We are not permitted to sell your client's property even if we wanted to.",
      },
      {
        icon: "Repeat",
        lead: "Sale enquiries come back to you.",
        text: "If your referred owner tells us they want to sell or buy, we route them to you by name — it's written into the partner agreement.",
      },
      {
        icon: "Eye",
        lead: "You stay in the loop, if you want to be.",
        text: "Optional CC on the owner's monthly statement, so you can see the property performing and use it in your next pitch.",
      },
      {
        icon: "TrendingUp",
        lead: "A managed unit is a better listing later.",
        text: "When your client does sell, they hand a buyer a performing asset with verified income history — an easier sale at a better price.",
      },
    ],
  },
  steps: {
    eyebrow: "How It Works",
    title: "Four steps, most of them ours",
    description: "Your work ends at step one.",
    steps: [
      {
        title: "Send us the property",
        description:
          "Use the form below, WhatsApp, or your partner dashboard. Building, size and the owner's contact — that's all we need. Registering first protects the referral for 90 days.",
      },
      {
        title: "We quote the owner",
        description:
          "We build a data-backed earnings projection from comparable units in that exact building and present it to the owner — with you named as the introducer.",
      },
      {
        title: "We onboard and launch",
        description:
          "Permits, furnishing, photography, listings across every channel. You do nothing. You get a note when the unit goes live.",
      },
      {
        title: "You get paid",
        description: "Bank transfer with a written commission statement. No chasing, no invoicing games, no “next month.”",
      },
    ],
  },
  operatorStats: {
    eyebrow: "Why Partners Send Us Properties",
    title: "The operator behind the referral",
    description: "Your name is attached to whoever you recommend. Here's what you'd be putting it next to.",
    stats: [
      {
        icon: "Building2",
        value: "20+ homes managed",
        description: "Across 6 districts in Dubai and Abu Dhabi, under DET and DCT licence.",
      },
      { icon: "Star", value: "4.9★ Superhost", description: "Your client's reviews are your reputation too." },
      {
        icon: "PiggyBank",
        value: "16 apartments owned",
        description: "AED 45M+ owned outright, run to the exact same standard as yours.",
      },
      {
        icon: "Link2",
        value: "Direct relationships",
        description: "Built on direct relationships, not app-store algorithms.",
      },
      {
        icon: "Smartphone",
        value: "Owner App",
        description: "Live calendar, statements and payouts — so your client never has to chase us, or you.",
      },
      {
        icon: "Banknote",
        value: "Paid on time, always",
        description: "Bank transfer with a written commission statement, every time.",
      },
    ],
  },
  formSection: {
    registerEyebrow: "Register a Referral",
    registerTitle: "Send it over",
    registerDescription: "Two minutes. Registering protects your referral for 90 days, even if the owner takes their time.",
    faqEyebrow: "Partner FAQ",
    faqTitle: "Before you send us anything",
  },
};

export async function getPartnerSections(): Promise<PartnerSections> {
  try {
    const rows = await db
      .select({ key: sections.key, content: sections.content })
      .from(sections)
      .innerJoin(pages, eq(sections.pageId, pages.id))
      .where(eq(pages.slug, "become-a-partner"));

    const byKey = Object.fromEntries(rows.map((r) => [r.key, r.content]));

    return {
      hero: (byKey["hero"] as PartnerHeroContent) ?? DEFAULT_PARTNER_SECTIONS.hero,
      audienceToggle: (byKey["audience-toggle"] as AudienceToggleContent) ?? DEFAULT_PARTNER_SECTIONS.audienceToggle,
      commissionCalculator:
        (byKey["commission-calculator"] as CommissionCalculatorContent) ??
        DEFAULT_PARTNER_SECTIONS.commissionCalculator,
      noConflict: (byKey["no-conflict"] as NoConflictContent) ?? DEFAULT_PARTNER_SECTIONS.noConflict,
      steps: (byKey["steps"] as PartnerStepsContent) ?? DEFAULT_PARTNER_SECTIONS.steps,
      operatorStats: (byKey["operator-stats"] as OperatorStatsContent) ?? DEFAULT_PARTNER_SECTIONS.operatorStats,
      formSection: (byKey["form-section"] as PartnerFormSectionContent) ?? DEFAULT_PARTNER_SECTIONS.formSection,
    };
  } catch (err) {
    console.error("Failed to load become-a-partner sections:", err);
    return DEFAULT_PARTNER_SECTIONS;
  }
}

interface ServicesHeroContent {
  eyebrow: string;
  title: string;
  description: string;
  primaryButtonLabel: string;
  secondaryButtonLabel: string;
  tagline: string;
  image: string;
  badgeValue: string;
  badgeLabel: string;
  credibility: { icon: string; label: string }[];
}

interface WhyRenticoContent {
  eyebrow: string;
  title: string;
  paragraphs: string[];
  buttonLabel: string;
  perksHeading: string;
  perks: { icon: string; text: string }[];
  skinInGameText: string;
  skinStat1Value: string;
  skinStat1Label: string;
  skinStat2Value: string;
  skinStat2Label: string;
}

interface WhatWeHandleContent {
  eyebrow: string;
  title: string;
  description: string;
  items: { icon: string; title: string; description: string }[];
}

interface OnboardingStepsContent {
  eyebrow: string;
  title: string;
  steps: { title: string; description: string }[];
}

interface PricingDesignContent {
  eyebrow: string;
  title: string;
  description: string;
  buttonLabel: string;
  essentialName: string;
  essentialSubtitle: string;
  essentialDescription: string;
  essentialImage: string;
  essentialPerfectFor: string;
  essentialChecklist: string[];
  elevatedName: string;
  elevatedSubtitle: string;
  elevatedDescription: string;
  elevatedImage: string;
  elevatedPerfectFor: string;
  elevatedChecklist: { icon: string; label: string }[];
  signatureName: string;
  signatureSubtitle: string;
  signatureDescription: string;
  signatureImage: string;
  signaturePerfectFor: string;
  signatureChecklist: string[];
}

interface OwnerAppContent {
  eyebrow: string;
  headingLine1: string;
  headingLine2: string;
  description: string;
  points: string[];
  appEyebrow: string;
  appHeading: string;
  previewItems: { icon: string; label: string }[];
}

interface WhereWeOperateContent {
  eyebrow: string;
  title: string;
  description: string;
  portfolioHeading: string;
  portfolioDescription: string;
  stats: { label: string; value: string; caption: string }[];
  resultsHeading: string;
  results: { quote: string; name: string; role: string }[];
}

interface ServicesCtaContent {
  heading: string;
  description: string;
  whatsappButtonLabel: string;
  sendDetailsLabel: string;
  faqEyebrow: string;
  faqTitle: string;
}

export interface ServicesSections {
  hero: ServicesHeroContent;
  whyRentico: WhyRenticoContent;
  whatWeHandle: WhatWeHandleContent;
  onboardingSteps: OnboardingStepsContent;
  pricingDesign: PricingDesignContent;
  ownerApp: OwnerAppContent;
  whereWeOperate: WhereWeOperateContent;
  cta: ServicesCtaContent;
}

const DEFAULT_SERVICES_SECTIONS: ServicesSections = {
  hero: {
    eyebrow: "Short-Term & Mid-Term Rental Management · Dubai & Abu Dhabi",
    title: "Your UAE property, run like an asset — not a hobby.",
    description:
      "From furnishing and licensing to daily pricing and round-the-clock guest care, Rentico runs every part of the operation across Dubai and Abu Dhabi. You keep ownership and the returns; we handle everything between check-ins.",
    primaryButtonLabel: "Get my free earnings estimate",
    secondaryButtonLabel: "See how it works",
    tagline: "Better stays. Better returns.",
    image: "/DSC00523-HDR.jpg",
    badgeValue: "4.97★",
    badgeLabel: "Airbnb Superhost rating",
    credibility: [
      { icon: "ShieldCheck", label: "Licensed UAE operator" },
      { icon: "Star", label: "4.97★ Airbnb Superhost" },
      { icon: "Timer", label: "Under 30 min response, 24/7" },
      { icon: "Smartphone", label: "Owner App — live calendar, statements & payouts" },
    ],
  },
  whyRentico: {
    eyebrow: "Why Owners Hand Us the Keys",
    title: "We'd rather earn your trust than impress you with badges.",
    paragraphs: [
      "Plenty of managers will show you a wall of logos. We'd rather show you the numbers, the software, and the reporting — and let those do the convincing.",
      "Rentico is a licensed UAE short-term rental operator built for owners who treat their property as an asset, not a hobby. Now operating across both Dubai and Abu Dhabi, we bring the same standard to every home: dynamic pricing that moves with the market, a guest-experience standard that protects your reviews, and reporting clear enough that you always know exactly how your property is doing and exactly what you're being paid.",
      "We're selective on purpose. We take on homes we can genuinely make perform — because how your property does is a direct reflection of how we work.",
    ],
    buttonLabel: "Get my free earnings estimate",
    perksHeading: "What every owner gets",
    perks: [
      { icon: "Users", text: "Your own Owner Relationship Manager — not a call-centre queue" },
      { icon: "FileText", text: "A transparent statement and payout on the 15th of every month" },
      { icon: "Eye", text: "Live performance you can check any time, not a black box" },
      { icon: "Wallet", text: "A flat, all-inclusive fee with nothing hidden or deducted by surprise" },
      { icon: "Percent", text: "Transparent pricing — 20% of gross revenue" },
    ],
    skinInGameText:
      "We own 16 apartments across Dubai outright — AED 45M+ — run to the exact same standard as yours.",
    skinStat1Value: "16",
    skinStat1Label: "Apartments owned",
    skinStat2Value: "AED 45M+",
    skinStat2Label: "Owned outright",
  },
  whatWeHandle: {
    eyebrow: "What We Handle",
    title: "Every part of the operation, covered",
    description: "From pricing to maintenance, nothing sits on your plate.",
    items: [
      {
        icon: "LineChart",
        title: "Dynamic, data-led pricing",
        description:
          "Your nightly rate isn't set once and forgotten. We price daily through PriceLabs — reading demand, seasonality, events, and live market data across both emirates — so your property captures peak rates and stays booked through the quieter weeks, not just the busy ones.",
      },
      {
        icon: "Layers",
        title: "Multi-platform listings, optimised per channel",
        description:
          "Your home goes live on Airbnb, Booking.com, and the other major OTAs, plus direct booking — each listing written, shot, and tuned for that platform's guests. One property, managed as a portfolio of channels, all synced through Guesty so calendars never clash.",
      },
      {
        icon: "Headset",
        title: "24/7 guest care, in minutes not hours",
        description:
          "Every enquiry, check-in, and midnight question is handled by our team, day or night, by phone and WhatsApp, with responses under 30 minutes.",
      },
      {
        icon: "Sparkles",
        title: "Hotel-grade housekeeping & inspections",
        description:
          "Every turnover is cleaned to a hotel standard and inspected against a Breezeway checklist with time-stamped photos.",
      },
      {
        icon: "Wrench",
        title: "Proactive maintenance",
        description:
          "Small issues get caught and fixed before a guest ever notices. Minor work is itemised on your statement; anything larger gets a quote and your approval first.",
      },
      {
        icon: "FileBarChart",
        title: "Reporting you don't have to decode",
        description:
          "One clear monthly statement: occupancy, average nightly rate, revenue, fees, and net payout — plus what's on the books ahead.",
      },
    ],
  },
  onboardingSteps: {
    eyebrow: "How Onboarding Works",
    title: "From first call to first payout",
    steps: [
      {
        title: "Discovery call",
        description:
          "Your Owner Relationship Manager walks the property with you — condition, potential, and an honest, data-backed number on what it can realistically earn.",
      },
      {
        title: "Onboarding & setup",
        description:
          "Professional photography, staging and furnishing recommendations, tourism-permit registration, and full multi-platform listing setup.",
      },
      {
        title: "Go live and start earning",
        description:
          "Your property launches across every major platform, fully optimised and priced to perform from day one.",
      },
      {
        title: "Ongoing partnership",
        description:
          "Daily pricing, 24/7 guest care, regular inspections, monthly reporting, and your dedicated contact on call.",
      },
    ],
  },
  pricingDesign: {
    eyebrow: "Design by Rentico",
    title: "What each package includes.",
    description:
      "Each tier builds on the one before — every essential inclusion carries up, then adds more premium features for higher returns and five-star reviews.",
    buttonLabel: "Ask about our packages",
    essentialName: "Essential",
    essentialSubtitle: "The complete base",
    essentialDescription: "Clean, functional and fully furnished — everything a five-star stay needs.",
    essentialImage: "https://images.unsplash.com/photo-1704040686428-7534b262d0d8?q=80&w=1200&auto=format&fit=crop",
    essentialPerfectFor: "First listings & smart budgets.",
    essentialChecklist: [
      "Full furniture & furnishings",
      "Hotel-grade linen & towels",
      "Complete kitchen & appliance pack",
      "Full apartment paint & touch-ups",
      "Cushions, throws, rugs & artwork",
      "Procurement, delivery & assembly",
      "Styled, DTCM-ready handover",
    ],
    elevatedName: "Elevated",
    elevatedSubtitle: "Everything in Essential, plus",
    elevatedDescription: "Designer feature pieces and premium finishes that lift nightly rates and reviews.",
    elevatedImage: "https://images.unsplash.com/photo-1757924461488-ef9ad0670978?q=80&w=1200&auto=format&fit=crop",
    elevatedPerfectFor: "Owners chasing higher returns.",
    elevatedChecklist: [
      { icon: "Sofa", label: "Upgraded designer furniture" },
      { icon: "Armchair", label: "Feature armchair & upholstered headboard" },
      { icon: "Tv", label: "Floating media console + LED" },
      { icon: "PanelTop", label: "Decorative wall mouldings" },
      { icon: "Lightbulb", label: "Layered lighting scheme" },
      { icon: "BedDouble", label: "Premium layered bedding & décor" },
      { icon: "Palette", label: "Full design concept & moodboard" },
      { icon: "ImageIcon", label: "Art, décor & accessories" },
      { icon: "MonitorSpeaker", label: "Smart TV & soundbar" },
    ],
    signatureName: "Signature",
    signatureSubtitle: "Everything in Elevated, plus",
    signatureDescription: "Fully bespoke, luxury interiors built for top-tier, standout listings.",
    signatureImage: "https://images.unsplash.com/photo-1758957701419-2c6e266f7988?q=80&w=1200&auto=format&fit=crop",
    signaturePerfectFor: "Standout, premium properties.",
    signatureChecklist: [
      "Bespoke, made-to-measure pieces",
      "Marble & premium finishes",
      "Sculpted feature media wall",
      "Feature joinery & wall panelling",
      "Luxury linen & designer textiles",
      "Gallery artwork & sculptural décor",
      "Dedicated lead designer",
    ],
  },
  ownerApp: {
    eyebrow: "Owner App",
    headingLine1: "Everything,",
    headingLine2: "in your pocket",
    description:
      "You don't have to wait for a monthly call. The Rentico Owner App puts your property's performance in your hands, live — and every number in it reconciles to the statement you're paid on.",
    points: [
      "Live calendar — see every booking, rate and guest as it lands",
      "Statements and payout history, downloadable as PDF and CSV",
      "Block your own dates in seconds — no phone call, no email chain",
      "Maintenance log with photos, quotes and approvals in one thread",
      "Direct line to your Owner Relationship Manager, in-app",
    ],
    appEyebrow: "Rentico Owner App",
    appHeading: "Your property, live in your pocket.",
    previewItems: [
      { icon: "Calendar", label: "Live Calendar" },
      { icon: "FileText", label: "Statements" },
      { icon: "ClipboardList", label: "Maintenance" },
      { icon: "MessageCircle", label: "Direct Chat" },
    ],
  },
  whereWeOperate: {
    eyebrow: "Where We Operate",
    title: "Dubai & Abu Dhabi, and nowhere we can't do it well",
    description:
      "Rentico operates where guests actually search and pay a premium to stay. We say no more often than we say yes — a smaller, consistent portfolio outperforms a large, uneven one.",
    portfolioHeading: "Our portfolio standard",
    portfolioDescription:
      "Every home we manage is professionally shot, accurately listed, furnished to one consistent standard, and walked through before each guest arrives. Dubai is a crowded market — the listings that consistently perform aren't the cheapest, they're the ones that read right and deliver exactly what they promised, stay after stay.",
    stats: [
      { label: "Portfolio size", value: "Curated", caption: "Quality-gated on entry" },
      { label: "Occupancy", value: "80–90%", caption: "Sustained, portfolio-wide" },
      { label: "Channel coverage", value: "5+ major OTAs", caption: "Optimised per platform" },
      { label: "Design & furnishing", value: "In-house", caption: "Three package tiers" },
      { label: "Reporting", value: "Monthly", caption: "Aligned to your targets" },
    ],
    resultsHeading: "Owner results",
    results: [
      {
        quote:
          "Rentico has exceeded my expectations with their professionalism and attention to detail. They take care of every aspect of managing my property, allowing me to enjoy consistent returns without any hassle.",
        name: "Firas",
        role: "Property owner, 1BR Dubai Hills",
      },
      {
        quote:
          "Since partnering with Rentico, managing my property has become completely stress-free. Their transparent communication, reliable service, and commitment to quality have made them a partner I can truly trust.",
        name: "Linda",
        role: "Property owner, 2BR Burj Royale",
      },
    ],
  },
  cta: {
    heading: "Find out what your property could earn.",
    description:
      "Get a free, honest estimate. Message us directly and we'll come back with a data-backed estimate — and whether Rentico is the right fit.",
    whatsappButtonLabel: "Chat with us on WhatsApp",
    sendDetailsLabel: "Send details instead",
    faqEyebrow: "FAQ",
    faqTitle: "Questions owners ask us",
  },
};

export async function getServicesSections(): Promise<ServicesSections> {
  try {
    const rows = await db
      .select({ key: sections.key, content: sections.content })
      .from(sections)
      .innerJoin(pages, eq(sections.pageId, pages.id))
      .where(eq(pages.slug, "manage-my-property"));

    const byKey = Object.fromEntries(rows.map((r) => [r.key, r.content]));

    return {
      hero: (byKey["hero"] as ServicesHeroContent) ?? DEFAULT_SERVICES_SECTIONS.hero,
      whyRentico: (byKey["why-rentico"] as WhyRenticoContent) ?? DEFAULT_SERVICES_SECTIONS.whyRentico,
      whatWeHandle: (byKey["what-we-handle"] as WhatWeHandleContent) ?? DEFAULT_SERVICES_SECTIONS.whatWeHandle,
      onboardingSteps:
        (byKey["onboarding-steps"] as OnboardingStepsContent) ?? DEFAULT_SERVICES_SECTIONS.onboardingSteps,
      pricingDesign: (byKey["pricing-design"] as PricingDesignContent) ?? DEFAULT_SERVICES_SECTIONS.pricingDesign,
      ownerApp: (byKey["owner-app"] as OwnerAppContent) ?? DEFAULT_SERVICES_SECTIONS.ownerApp,
      whereWeOperate:
        (byKey["where-we-operate"] as WhereWeOperateContent) ?? DEFAULT_SERVICES_SECTIONS.whereWeOperate,
      cta: (byKey["cta"] as ServicesCtaContent) ?? DEFAULT_SERVICES_SECTIONS.cta,
    };
  } catch (err) {
    console.error("Failed to load manage-my-property sections:", err);
    return DEFAULT_SERVICES_SECTIONS;
  }
}

interface AboutHeroContent {
  eyebrow: string;
  title: string;
  description: string;
}

interface AboutStoryContent {
  eyebrow: string;
  title: string;
  description: string;
  paragraph: string;
  image: string;
}

interface AboutStatsContent {
  stats: { value: string; label: string }[];
}

interface AboutValuesContent {
  eyebrow: string;
  title: string;
  values: { icon: string; title: string; description: string }[];
}

interface AboutAreasServedContent {
  eyebrow: string;
  title: string;
  areas: { name: string; description: string }[];
}

interface AboutCtaContent {
  title: string;
  description: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
}

export interface AboutSections {
  hero: AboutHeroContent;
  story: AboutStoryContent;
  stats: AboutStatsContent;
  values: AboutValuesContent;
  areasServed: AboutAreasServedContent;
  cta: AboutCtaContent;
}

const DEFAULT_ABOUT_SECTIONS: AboutSections = {
  hero: {
    eyebrow: "About Rentico",
    title: "A new standard for short-term stays in Dubai",
    description:
      "We manage luxury homes the way we'd want our own managed — with care, transparency and hospitality-grade service.",
  },
  story: {
    eyebrow: "Our Story",
    title: "Built for owners and guests who expect more",
    description:
      "Rentico was founded in 2025 in Dubai with a simple premise: short-term rentals should feel effortless for owners and exceptional for guests — without the fees and friction of third-party platforms.",
    paragraph:
      "Today we manage a growing portfolio of luxury homes across Downtown Dubai, Business Bay, Palm Jumeirah, Dubai Marina, Dubai Hills and Sobha Hartland. Every property is professionally cleaned, styled and maintained to a standard that consistently earns a 4.9-star guest rating — while owners get transparent reporting and a direct line to our team, always.",
    image: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?q=80&w=1400&auto=format&fit=crop",
  },
  stats: {
    stats: [
      { value: "2025", label: "Founded in Dubai" },
      { value: "20+", label: "Managed Properties" },
      { value: "6", label: "Prime Districts" },
      { value: "4.9★", label: "Average Guest Rating" },
    ],
  },
  values: {
    eyebrow: "What Drives Us",
    title: "The values behind every stay",
    values: [
      {
        icon: "Handshake",
        title: "Direct Relationships",
        description: "No app-store middlemen — just a direct line between us, owners and guests.",
      },
      {
        icon: "ShieldCheck",
        title: "Transparency",
        description: "Clear pricing and honest reporting, always. No hidden fees, no surprises.",
      },
      {
        icon: "Sparkles",
        title: "Hospitality-Grade Care",
        description: "Every home is cleaned, styled and maintained to a 5-star hotel standard.",
      },
      {
        icon: "MapPinned",
        title: "Local Expertise",
        description: "Deep knowledge of Dubai's neighbourhoods, regulations and rental market.",
      },
    ],
  },
  areasServed: {
    eyebrow: "Where We Operate",
    title: "Present across Dubai's most sought-after districts",
    areas: [
      { name: "Downtown Dubai", description: "Home to Burj Khalifa and Dubai Mall — the city's most iconic address." },
      { name: "Business Bay", description: "Dubai's central business district, minutes from Downtown." },
      { name: "Palm Jumeirah", description: "Iconic waterfront living with private beach access." },
      { name: "Dubai Marina", description: "A vibrant waterfront community with skyline and marina views." },
      { name: "Dubai Hills", description: "A modern master-planned community with golf-course views." },
      {
        name: "Sobha Hartland",
        description: "A fast-growing waterfront community by Meydan, close to Downtown Dubai.",
      },
    ],
  },
  cta: {
    title: "Ready to work with us?",
    description: "Whether you're booking a stay or listing a property, we'd love to hear from you.",
    primaryLabel: "Book Your Stay",
    primaryHref: "/book-your-stay",
    secondaryLabel: "Become a Partner",
    secondaryHref: "/become-a-partner",
  },
};

export async function getAboutSections(): Promise<AboutSections> {
  try {
    const rows = await db
      .select({ key: sections.key, content: sections.content })
      .from(sections)
      .innerJoin(pages, eq(sections.pageId, pages.id))
      .where(eq(pages.slug, "about-us"));

    const byKey = Object.fromEntries(rows.map((r) => [r.key, r.content]));

    return {
      hero: (byKey["hero"] as AboutHeroContent) ?? DEFAULT_ABOUT_SECTIONS.hero,
      story: (byKey["story"] as AboutStoryContent) ?? DEFAULT_ABOUT_SECTIONS.story,
      stats: (byKey["stats"] as AboutStatsContent) ?? DEFAULT_ABOUT_SECTIONS.stats,
      values: (byKey["values"] as AboutValuesContent) ?? DEFAULT_ABOUT_SECTIONS.values,
      areasServed: (byKey["areas-served"] as AboutAreasServedContent) ?? DEFAULT_ABOUT_SECTIONS.areasServed,
      cta: (byKey["cta"] as AboutCtaContent) ?? DEFAULT_ABOUT_SECTIONS.cta,
    };
  } catch (err) {
    console.error("Failed to load about-us sections:", err);
    return DEFAULT_ABOUT_SECTIONS;
  }
}

interface GenericHeroContent {
  eyebrow: string;
  title: string;
  description: string;
}

interface ContactDetailsContent {
  eyebrow: string;
  title: string;
  description: string;
}

export interface ContactSections {
  hero: GenericHeroContent;
  details: ContactDetailsContent;
}

const DEFAULT_CONTACT_SECTIONS: ContactSections = {
  hero: {
    eyebrow: "Get in Touch",
    title: "We're here to help",
    description:
      "Questions about booking a stay, listing your property, or anything else? Send us a message and our team will get back to you shortly.",
  },
  details: {
    eyebrow: "Contact Details",
    title: "Speak to the Rentico team",
    description:
      "Whether you're a guest or a property owner, reach out directly and we'll point you in the right direction.",
  },
};

export async function getContactSections(): Promise<ContactSections> {
  try {
    const rows = await db
      .select({ key: sections.key, content: sections.content })
      .from(sections)
      .innerJoin(pages, eq(sections.pageId, pages.id))
      .where(eq(pages.slug, "contact"));

    const byKey = Object.fromEntries(rows.map((r) => [r.key, r.content]));

    return {
      hero: (byKey["hero"] as GenericHeroContent) ?? DEFAULT_CONTACT_SECTIONS.hero,
      details: (byKey["details"] as ContactDetailsContent) ?? DEFAULT_CONTACT_SECTIONS.details,
    };
  } catch (err) {
    console.error("Failed to load contact sections:", err);
    return DEFAULT_CONTACT_SECTIONS;
  }
}

interface InsightsCtaContent {
  title: string;
  description: string;
  primaryLabel: string;
  primaryHref: string;
}

export interface InsightsSections {
  hero: GenericHeroContent;
  cta: InsightsCtaContent;
}

const DEFAULT_INSIGHTS_SECTIONS: InsightsSections = {
  hero: {
    eyebrow: "Insights",
    title: "Guides, market data and tips for Dubai property owners",
    description:
      "Everything you need to know about running a successful short-term rental in Dubai — from regulation to returns.",
  },
  cta: {
    title: "Have a property in mind?",
    description: "Get a free, no-obligation revenue estimate from our team.",
    primaryLabel: "Become a Partner",
    primaryHref: "/become-a-partner",
  },
};

export async function getInsightsSections(): Promise<InsightsSections> {
  try {
    const rows = await db
      .select({ key: sections.key, content: sections.content })
      .from(sections)
      .innerJoin(pages, eq(sections.pageId, pages.id))
      .where(eq(pages.slug, "insights"));

    const byKey = Object.fromEntries(rows.map((r) => [r.key, r.content]));

    return {
      hero: (byKey["hero"] as GenericHeroContent) ?? DEFAULT_INSIGHTS_SECTIONS.hero,
      cta: (byKey["cta"] as InsightsCtaContent) ?? DEFAULT_INSIGHTS_SECTIONS.cta,
    };
  } catch (err) {
    console.error("Failed to load insights sections:", err);
    return DEFAULT_INSIGHTS_SECTIONS;
  }
}

export interface OwnerLoginContent {
  badgeLabel: string;
  title: string;
  description: string;
  perks: { icon: string; label: string }[];
  buttonLabel: string;
  buttonHref: string;
  footerNote: string;
  footerLinkLabel: string;
  footerLinkHref: string;
}

const DEFAULT_OWNER_LOGIN_CONTENT: OwnerLoginContent = {
  badgeLabel: "Owner Portal",
  title: "Welcome back",
  description: "Log in to your dedicated owner portal to view bookings, occupancy and revenue for your property.",
  perks: [
    { icon: "LineChart", label: "Real-time booking & revenue reporting" },
    { icon: "ReceiptText", label: "Monthly owner statements" },
    { icon: "LockKeyhole", label: "Secure, dedicated portal access" },
  ],
  buttonLabel: "Continue to Owner Portal",
  buttonHref: "http://renticodubai.guestyowners.com",
  footerNote: "Not a partner yet?",
  footerLinkLabel: "List your property",
  footerLinkHref: "/become-a-partner",
};

export async function getOwnerLoginContent(): Promise<OwnerLoginContent> {
  try {
    const rows = await db
      .select({ key: sections.key, content: sections.content })
      .from(sections)
      .innerJoin(pages, eq(sections.pageId, pages.id))
      .where(eq(pages.slug, "owner-login"));

    const byKey = Object.fromEntries(rows.map((r) => [r.key, r.content]));
    return (byKey["hero"] as OwnerLoginContent) ?? DEFAULT_OWNER_LOGIN_CONTENT;
  } catch (err) {
    console.error("Failed to load owner-login content:", err);
    return DEFAULT_OWNER_LOGIN_CONTENT;
  }
}

const DEFAULT_BOOK_YOUR_STAY_HERO: GenericHeroContent = {
  eyebrow: "Book Your Stay",
  title: "Find your next luxury stay in Dubai",
  description: "Search live availability across our managed portfolio and book directly — no third-party fees.",
};

export async function getBookYourStayHero(): Promise<GenericHeroContent> {
  try {
    const rows = await db
      .select({ key: sections.key, content: sections.content })
      .from(sections)
      .innerJoin(pages, eq(sections.pageId, pages.id))
      .where(eq(pages.slug, "book-your-stay"));

    const byKey = Object.fromEntries(rows.map((r) => [r.key, r.content]));
    return (byKey["hero"] as GenericHeroContent) ?? DEFAULT_BOOK_YOUR_STAY_HERO;
  } catch (err) {
    console.error("Failed to load book-your-stay hero:", err);
    return DEFAULT_BOOK_YOUR_STAY_HERO;
  }
}

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
