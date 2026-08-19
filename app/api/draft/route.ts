import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { articles } from "@/lib/db/schema";
import { getCurrentAdmin } from "@/lib/admin/getCurrentAdmin";

// Preview links only ever come from the admin panel, where the request
// already carries an authenticated admin session — no separate shared
// secret needed like a typical headless-CMS draft URL would use.
export async function GET(request: Request) {
  const admin = await getCurrentAdmin();
  if (!admin) return new Response("Not authenticated.", { status: 401 });

  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");
  if (!slug) return new Response("Missing slug.", { status: 400 });

  const [article] = await db.select({ slug: articles.slug }).from(articles).where(eq(articles.slug, slug)).limit(1);
  if (!article) return new Response("Article not found.", { status: 404 });

  const draft = await draftMode();
  draft.enable();

  redirect(`/insights/${article.slug}`);
}
