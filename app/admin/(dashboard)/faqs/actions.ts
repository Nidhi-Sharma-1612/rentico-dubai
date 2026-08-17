"use server";

import { z } from "zod";
import { eq, sql as sqlOp } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { faqs, activityLog } from "@/lib/db/schema";
import { getCurrentAdmin } from "@/lib/admin/getCurrentAdmin";

const faqSchema = z.object({
  group: z.enum(["home", "services", "partner", "experience"]),
  question: z.string().min(1, "Question is required."),
  answer: z.string().min(1, "Answer is required."),
});

export interface ActionResult {
  error?: string;
}

async function requireAdmin() {
  const admin = await getCurrentAdmin();
  if (!admin) throw new Error("Not authenticated.");
  return admin;
}

function parseInput(formData: FormData) {
  return faqSchema.safeParse({
    group: formData.get("group"),
    question: formData.get("question"),
    answer: formData.get("answer"),
  });
}

function revalidatePublicPages() {
  revalidatePath("/");
  revalidatePath("/manage-my-property");
  revalidatePath("/become-a-partner");
  revalidatePath("/experience");
}

export async function createFaq(_prevState: ActionResult, formData: FormData): Promise<ActionResult> {
  const admin = await requireAdmin();
  const parsed = parseInput(formData);
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Invalid input." };

  const [{ maxOrder }] = await db
    .select({ maxOrder: sqlOp<number>`coalesce(max(${faqs.sortOrder}), -1)` })
    .from(faqs)
    .where(eq(faqs.group, parsed.data.group));

  const [row] = await db
    .insert(faqs)
    .values({ ...parsed.data, sortOrder: maxOrder + 1 })
    .returning({ id: faqs.id });
  await db.insert(activityLog).values({ adminUserId: admin.id, action: "create", entityType: "faq", entityId: row.id });

  revalidatePath("/admin/faqs");
  revalidatePublicPages();
  redirect("/admin/faqs");
}

export async function updateFaq(id: string, _prevState: ActionResult, formData: FormData): Promise<ActionResult> {
  const admin = await requireAdmin();
  const parsed = parseInput(formData);
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Invalid input." };

  await db.update(faqs).set(parsed.data).where(eq(faqs.id, id));
  await db.insert(activityLog).values({ adminUserId: admin.id, action: "update", entityType: "faq", entityId: id });

  revalidatePath("/admin/faqs");
  revalidatePublicPages();
  redirect("/admin/faqs");
}

export async function deleteFaq(id: string): Promise<void> {
  const admin = await requireAdmin();
  await db.delete(faqs).where(eq(faqs.id, id));
  await db.insert(activityLog).values({ adminUserId: admin.id, action: "delete", entityType: "faq", entityId: id });

  revalidatePath("/admin/faqs");
  revalidatePublicPages();
}

export async function reorderFaqs(updates: { id: string; sortOrder: number }[]): Promise<void> {
  await requireAdmin();
  await Promise.all(updates.map((u) => db.update(faqs).set({ sortOrder: u.sortOrder }).where(eq(faqs.id, u.id))));

  revalidatePath("/admin/faqs");
  revalidatePublicPages();
}
