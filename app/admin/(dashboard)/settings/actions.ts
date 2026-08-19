"use server";

import { z } from "zod";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { siteSettings, activityLog } from "@/lib/db/schema";
import { getCurrentAdmin } from "@/lib/admin/getCurrentAdmin";
import { cleanupUnreferencedMedia } from "../upload-actions";

const socialLinkSchema = z.object({
  label: z.string().min(1),
  href: z.string().url(),
});

const settingsSchema = z.object({
  phone: z.string().min(1, "Phone is required."),
  whatsapp: z.string().regex(/^\d+$/, "WhatsApp number must be digits only, e.g. 971521460222."),
  email: z.string().email("Enter a valid email."),
  address: z.string().min(1, "Address is required."),
  responseTimeNote: z.string().min(1, "Response time note is required."),
  logoUrl: z.string().url("Enter a valid logo URL."),
  footerTagline: z.string().min(1, "Footer tagline is required."),
  copyrightName: z.string().min(1, "Copyright name is required."),
  socialLinks: z.array(socialLinkSchema),
});

export interface ActionResult {
  error?: string;
  success?: boolean;
}

export async function updateSiteSettings(_prevState: ActionResult, formData: FormData): Promise<ActionResult> {
  const admin = await getCurrentAdmin();
  if (!admin) return { error: "Not authenticated." };

  let socialLinks;
  try {
    socialLinks = JSON.parse(String(formData.get("socialLinks") ?? "[]"));
  } catch {
    return { error: "Invalid social links data." };
  }

  const parsed = settingsSchema.safeParse({
    phone: formData.get("phone"),
    whatsapp: formData.get("whatsapp"),
    email: formData.get("email"),
    address: formData.get("address"),
    responseTimeNote: formData.get("responseTimeNote"),
    logoUrl: formData.get("logoUrl"),
    footerTagline: formData.get("footerTagline"),
    copyrightName: formData.get("copyrightName"),
    socialLinks,
  });
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Invalid input." };

  const [existing] = await db.select({ logoUrl: siteSettings.logoUrl }).from(siteSettings).where(eq(siteSettings.id, 1)).limit(1);

  await db
    .insert(siteSettings)
    .values({ id: 1, ...parsed.data })
    .onConflictDoUpdate({ target: siteSettings.id, set: parsed.data });

  if (existing?.logoUrl && existing.logoUrl !== parsed.data.logoUrl) {
    await cleanupUnreferencedMedia(existing.logoUrl);
  }

  await db.insert(activityLog).values({
    adminUserId: admin.id,
    action: "update",
    entityType: "site_settings",
    entityId: "1",
  });

  revalidatePath("/admin/settings");
  revalidatePath("/", "layout");

  return { success: true };
}
