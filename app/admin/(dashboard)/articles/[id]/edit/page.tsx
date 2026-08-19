import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { articles } from "@/lib/db/schema";
import ArticleForm from "../../ArticleForm";
import BackLink from "../../../BackLink";

export default async function EditArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [row] = await db.select().from(articles).where(eq(articles.id, id)).limit(1);

  if (!row) notFound();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <BackLink href="/admin/articles" label="All articles" />
        <h1 className="mt-2 text-2xl font-bold text-navy-900">Edit Article</h1>
      </div>
      <ArticleForm initial={row} />
    </div>
  );
}
