"use server";

import { z } from "zod";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { testimonials, activityLog } from "@/lib/db/schema";
import { getCurrentAdmin } from "@/lib/admin/getCurrentAdmin";

const testimonialSchema = z.object({
  name: z.string().min(1, "Name is required."),
  role: z.string().min(1, "Role is required."),
  quote: z.string().min(1, "Quote is required."),
  rating: z.coerce.number().int().min(1).max(5),
  showOnHome: z.coerce.boolean(),
  featuredForAbout: z.coerce.boolean(),
  sortOrder: z.coerce.number().int().default(0),
});

export type TestimonialInput = z.infer<typeof testimonialSchema>;

export interface ActionResult {
  error?: string;
}

async function requireAdmin() {
  const admin = await getCurrentAdmin();
  if (!admin) throw new Error("Not authenticated.");
  return admin;
}

function parseInput(formData: FormData) {
  return testimonialSchema.safeParse({
    name: formData.get("name"),
    role: formData.get("role"),
    quote: formData.get("quote"),
    rating: formData.get("rating"),
    showOnHome: formData.get("showOnHome") === "on",
    featuredForAbout: formData.get("featuredForAbout") === "on",
    sortOrder: formData.get("sortOrder") || 0,
  });
}

export async function createTestimonial(_prevState: ActionResult, formData: FormData): Promise<ActionResult> {
  const admin = await requireAdmin();
  const parsed = parseInput(formData);
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Invalid input." };

  const [row] = await db.insert(testimonials).values(parsed.data).returning({ id: testimonials.id });
  await db.insert(activityLog).values({
    adminUserId: admin.id,
    action: "create",
    entityType: "testimonial",
    entityId: row.id,
  });

  revalidatePath("/admin/testimonials");
  revalidatePath("/");
  revalidatePath("/about-us");
  redirect("/admin/testimonials");
}

export async function updateTestimonial(
  id: string,
  _prevState: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  const admin = await requireAdmin();
  const parsed = parseInput(formData);
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Invalid input." };

  await db.update(testimonials).set(parsed.data).where(eq(testimonials.id, id));
  await db.insert(activityLog).values({ adminUserId: admin.id, action: "update", entityType: "testimonial", entityId: id });

  revalidatePath("/admin/testimonials");
  revalidatePath("/");
  revalidatePath("/about-us");
  redirect("/admin/testimonials");
}

export async function deleteTestimonial(id: string): Promise<void> {
  const admin = await requireAdmin();
  await db.delete(testimonials).where(eq(testimonials.id, id));
  await db.insert(activityLog).values({ adminUserId: admin.id, action: "delete", entityType: "testimonial", entityId: id });

  revalidatePath("/admin/testimonials");
  revalidatePath("/");
  revalidatePath("/about-us");
}
