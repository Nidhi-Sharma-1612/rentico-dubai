"use server";

import { z } from "zod";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { articles, activityLog } from "@/lib/db/schema";
import { getCurrentAdmin } from "@/lib/admin/getCurrentAdmin";
import { cleanupUnreferencedMedia } from "../upload-actions";

const blockSchema = z.discriminatedUnion("type", [
  z.object({ type: z.literal("paragraph"), text: z.string().min(1) }),
  z.object({ type: z.literal("heading"), text: z.string().min(1) }),
  z.object({ type: z.literal("list"), items: z.array(z.string().min(1)).min(1) }),
  z.object({ type: z.literal("quote"), text: z.string().min(1) }),
]);

const articleSchema = z.object({
  title: z.string().min(1, "Title is required."),
  slug: z
    .string()
    .min(1, "Slug is required.")
    .regex(/^[a-z0-9-]+$/, "Slug can only contain lowercase letters, numbers, and hyphens."),
  category: z.string().min(1, "Category is required."),
  excerpt: z.string().min(1, "Excerpt is required."),
  readTime: z.string().min(1, "Read time is required."),
  date: z.string().min(1, "Date is required."),
  image: z.string().optional().nullable(),
  content: z.array(blockSchema).min(1, "Add at least one content block."),
  status: z.enum(["draft", "published"]),
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
  let content: unknown;
  try {
    content = JSON.parse(String(formData.get("content") ?? "[]"));
  } catch {
    return { success: false as const, error: { issues: [{ message: "Content is malformed." }] } };
  }

  return articleSchema.safeParse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    category: formData.get("category"),
    excerpt: formData.get("excerpt"),
    readTime: formData.get("readTime"),
    date: formData.get("date"),
    image: formData.get("image") || null,
    content,
    status: formData.get("status"),
  });
}

function revalidatePublicPages(slug?: string) {
  revalidatePath("/insights");
  if (slug) revalidatePath(`/insights/${slug}`);
}

export async function createArticle(_prevState: ActionResult, formData: FormData): Promise<ActionResult> {
  const admin = await requireAdmin();
  const parsed = parseInput(formData);
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Invalid input." };

  let id: string;
  try {
    const [row] = await db.insert(articles).values(parsed.data).returning({ id: articles.id });
    id = row.id;
  } catch (err) {
    if (err instanceof Error && err.message.includes("articles_slug_unique")) {
      return { error: "That slug is already in use by another article." };
    }
    throw err;
  }

  await db.insert(activityLog).values({ adminUserId: admin.id, action: "create", entityType: "article", entityId: id });
  revalidatePublicPages(parsed.data.slug);
  redirect("/admin/articles");
}

export async function updateArticle(id: string, _prevState: ActionResult, formData: FormData): Promise<ActionResult> {
  const admin = await requireAdmin();
  const parsed = parseInput(formData);
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Invalid input." };

  const [existing] = await db.select({ image: articles.image }).from(articles).where(eq(articles.id, id)).limit(1);

  try {
    await db.update(articles).set({ ...parsed.data, updatedAt: new Date() }).where(eq(articles.id, id));
  } catch (err) {
    if (err instanceof Error && err.message.includes("articles_slug_unique")) {
      return { error: "That slug is already in use by another article." };
    }
    throw err;
  }

  if (existing?.image && existing.image !== parsed.data.image) {
    await cleanupUnreferencedMedia(existing.image);
  }

  await db.insert(activityLog).values({ adminUserId: admin.id, action: "update", entityType: "article", entityId: id });
  revalidatePublicPages(parsed.data.slug);
  redirect("/admin/articles");
}

export async function deleteArticle(id: string, slug: string): Promise<void> {
  const admin = await requireAdmin();
  const [deleted] = await db.delete(articles).where(eq(articles.id, id)).returning({ image: articles.image });
  await db.insert(activityLog).values({ adminUserId: admin.id, action: "delete", entityType: "article", entityId: id });
  await cleanupUnreferencedMedia(deleted?.image);
  revalidatePublicPages(slug);
}

export async function setArticleStatus(id: string, slug: string, status: "draft" | "published"): Promise<void> {
  const admin = await requireAdmin();
  await db.update(articles).set({ status, updatedAt: new Date() }).where(eq(articles.id, id));
  await db.insert(activityLog).values({
    adminUserId: admin.id,
    action: "update",
    entityType: "article",
    entityId: id,
  });
  revalidatePublicPages(slug);
}
