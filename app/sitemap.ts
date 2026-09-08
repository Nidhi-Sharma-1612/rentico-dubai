import type { MetadataRoute } from "next";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { articles } from "@/lib/db/schema";
import { searchListings } from "@/lib/guesty/bookingApi";
import { slugify } from "@/lib/utils";
import { SITE_URL } from "@/lib/structuredData";

const STATIC_PAGES: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "", priority: 1, changeFrequency: "daily" },
  { path: "/book-your-stay", priority: 0.9, changeFrequency: "daily" },
  { path: "/experience", priority: 0.7, changeFrequency: "monthly" },
  { path: "/manage-my-property", priority: 0.8, changeFrequency: "monthly" },
  { path: "/become-a-partner", priority: 0.7, changeFrequency: "monthly" },
  { path: "/about-us", priority: 0.6, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.6, changeFrequency: "yearly" },
  { path: "/insights", priority: 0.7, changeFrequency: "weekly" },
  { path: "/owner-login", priority: 0.3, changeFrequency: "yearly" },
  { path: "/privacy-policy", priority: 0.2, changeFrequency: "yearly" },
  { path: "/terms-conditions", priority: 0.2, changeFrequency: "yearly" },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = STATIC_PAGES.map((p) => ({
    url: `${SITE_URL}${p.path}`,
    priority: p.priority,
    changeFrequency: p.changeFrequency,
  }));

  let articleEntries: MetadataRoute.Sitemap = [];
  try {
    const rows = await db
      .select({ slug: articles.slug, updatedAt: articles.updatedAt })
      .from(articles)
      .where(eq(articles.status, "published"));
    articleEntries = rows.map((a) => ({
      url: `${SITE_URL}/insights/${a.slug}`,
      lastModified: a.updatedAt,
      priority: 0.5,
      changeFrequency: "monthly",
    }));
  } catch (err) {
    console.error("Failed to load articles for sitemap:", err);
  }

  let propertyEntries: MetadataRoute.Sitemap = [];
  try {
    const { listings } = await searchListings({ limit: 100 });
    propertyEntries = listings.map((l) => ({
      url: `${SITE_URL}/properties/${slugify(l.title)}`,
      priority: 0.6,
      changeFrequency: "weekly",
    }));
  } catch (err) {
    console.error("Failed to load listings for sitemap:", err);
  }

  return [...staticEntries, ...articleEntries, ...propertyEntries];
}
