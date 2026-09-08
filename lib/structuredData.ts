import { SiteSettings } from "@/lib/types";

export const SITE_URL = "https://staywithrentico.com";

/**
 * Organization + LocalBusiness JSON-LD, rendered once site-wide (see
 * app/(marketing)/layout.tsx) so every page carries it without duplicating
 * the script tag per route.
 *
 * Deliberately omits aggregateRating/Review markup: the testimonials in
 * lib/db/schema.ts's `testimonials` table are admin-entered marketing copy,
 * not reviews sourced from an independently verified platform (and every
 * existing one happens to be 5 stars) — marking that up as review structured
 * data is exactly the pattern Google's review-rich-results policy treats as
 * spam, and risks a manual action against the whole domain. Real star
 * ratings in search results should come from a connected, verified source
 * like Google Business Profile instead.
 */
export function buildOrganizationSchema(settings: SiteSettings) {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness"],
    name: "Rentico Dubai",
    legalName: settings.copyrightName,
    url: SITE_URL,
    logo: settings.logoUrl,
    image: settings.logoUrl,
    description: settings.footerTagline,
    telephone: settings.phone,
    email: settings.email,
    address: settings.address,
    areaServed: ["Dubai", "Abu Dhabi"],
    sameAs: settings.socialLinks.map((s) => s.href).filter(Boolean),
  };
}
