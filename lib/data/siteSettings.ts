import "server-only";
import { db } from "@/lib/db";
import { siteSettings } from "@/lib/db/schema";
import { SiteSettings } from "@/lib/types";

// Used whenever the DB is unreachable or the singleton row hasn't been
// created yet, so public pages never render blank contact info.
export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  phone: "+971-52 146 0222",
  whatsapp: "971521460222",
  email: "info@renticodubai.com",
  address: "1604 The One Tower, Dubai, UAE",
  responseTimeNote: "Our team typically responds within 24 hours",
  logoUrl:
    "https://static.wixstatic.com/media/b008a0_a30f9f33808d4e72b681d89f13c5c321~mv2.png/v1/fill/w_852,h_366,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Untitled%20design.png",
  footerTagline:
    "Luxury short-term rental management across Dubai's finest addresses — direct booking, transparent pricing, and a flawless stay every time.",
  copyrightName: "Rentico Vacation Homes Rental L.L.C.",
  socialLinks: [
    { label: "WhatsApp", href: "https://wa.me/971521460222" },
    { label: "Instagram", href: "https://www.instagram.com/renticodubai/" },
    { label: "LinkedIn", href: "https://www.linkedin.com/company/rentico-vacation-homes-rental-l-l-c/" },
    { label: "TikTok", href: "https://www.tiktok.com/@renticodubai" },
  ],
};

export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const [row] = await db.select().from(siteSettings).limit(1);
    if (!row) return DEFAULT_SITE_SETTINGS;

    return {
      phone: row.phone ?? DEFAULT_SITE_SETTINGS.phone,
      whatsapp: row.whatsapp ?? DEFAULT_SITE_SETTINGS.whatsapp,
      email: row.email ?? DEFAULT_SITE_SETTINGS.email,
      address: row.address ?? DEFAULT_SITE_SETTINGS.address,
      responseTimeNote: row.responseTimeNote ?? DEFAULT_SITE_SETTINGS.responseTimeNote,
      logoUrl: row.logoUrl ?? DEFAULT_SITE_SETTINGS.logoUrl,
      footerTagline: row.footerTagline ?? DEFAULT_SITE_SETTINGS.footerTagline,
      copyrightName: row.copyrightName ?? DEFAULT_SITE_SETTINGS.copyrightName,
      socialLinks: row.socialLinks.length ? row.socialLinks : DEFAULT_SITE_SETTINGS.socialLinks,
    };
  } catch (err) {
    console.error("Failed to load site settings:", err);
    return DEFAULT_SITE_SETTINGS;
  }
}
