"use server";

import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { pages, sections, activityLog } from "@/lib/db/schema";
import { getCurrentAdmin } from "@/lib/admin/getCurrentAdmin";
import { SECTION_SCHEMAS } from "./sectionSchemas";

export interface ActionResult {
  error?: string;
  success?: boolean;
}

// Public routes affected by each page's section content — kept separate from
// admin-side pathing so a section edit revalidates the marketing page it
// actually renders on, not just the admin editor route.
const REVALIDATE_PATHS: Record<string, string[]> = {
  home: ["/"],
  experience: ["/experience"],
  "become-a-partner": ["/become-a-partner"],
  "manage-my-property": ["/manage-my-property"],
  "about-us": ["/about-us"],
  contact: ["/contact"],
  insights: ["/insights"],
  "owner-login": ["/owner-login"],
  "book-your-stay": ["/book-your-stay"],
};

export async function updateSection(
  pageSlug: string,
  sectionKey: string,
  _prevState: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  const admin = await getCurrentAdmin();
  if (!admin) return { error: "Not authenticated." };

  const schema = SECTION_SCHEMAS[`${pageSlug}:${sectionKey}`];
  if (!schema) return { error: "Unknown section." };

  const raw = formData.get("content");
  if (typeof raw !== "string") return { error: "Missing content." };

  let parsedJson: unknown;
  try {
    parsedJson = JSON.parse(raw);
  } catch {
    return { error: "Malformed content." };
  }

  const parsed = schema.zod.safeParse(parsedJson);
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Invalid input." };

  const [page] = await db.select().from(pages).where(eq(pages.slug, pageSlug)).limit(1);
  if (!page) return { error: "Page not found." };

  await db
    .update(sections)
    .set({ content: parsed.data, updatedAt: new Date() })
    .where(and(eq(sections.pageId, page.id), eq(sections.key, sectionKey)));

  await db.insert(activityLog).values({
    adminUserId: admin.id,
    action: "update",
    entityType: "section",
    entityId: `${pageSlug}:${sectionKey}`,
  });

  if (pageSlug === "global") {
    // Nav/footer links render on every marketing page via the shared
    // layout, so revalidate the whole layout tree rather than one path.
    revalidatePath("/", "layout");
  } else {
    for (const path of REVALIDATE_PATHS[pageSlug] ?? []) revalidatePath(path);
  }

  return { success: true };
}
