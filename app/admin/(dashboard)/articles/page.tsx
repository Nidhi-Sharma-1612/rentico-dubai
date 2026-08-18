import Link from "next/link";
import Image from "next/image";
import { Plus } from "lucide-react";
import { desc } from "drizzle-orm";
import { db } from "@/lib/db";
import { articles } from "@/lib/db/schema";
import DeleteArticleButton from "./DeleteArticleButton";

export default async function AdminArticlesListPage() {
  const rows = await db.select().from(articles).orderBy(desc(articles.date));

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">Articles</h1>
          <p className="text-sm text-navy-900/55">{rows.length} total</p>
        </div>
        <Link
          href="/admin/articles/new"
          className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-orange-600"
        >
          <Plus className="h-4 w-4" />
          New Article
        </Link>
      </div>

      {rows.length === 0 ? (
        <p className="rounded-xl border border-navy-900/8 bg-white p-8 text-center text-sm text-navy-900/50">
          No articles yet.
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          {rows.map((a) => (
            <div key={a.id} className="flex items-center gap-4 rounded-xl border border-navy-900/8 bg-white p-4">
              {a.image ? (
                <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-lg">
                  <Image src={a.image} alt={a.title} fill className="object-cover" />
                </div>
              ) : (
                <div className="h-16 w-24 shrink-0 rounded-lg bg-navy-900/5" />
              )}
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold text-navy-900">{a.title}</p>
                <p className="text-xs text-navy-900/45">
                  {a.category} · {a.readTime} · {a.date}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <Link
                  href={`/admin/articles/${a.id}/edit`}
                  className="text-sm font-semibold text-orange-600 hover:underline"
                >
                  Edit
                </Link>
                <DeleteArticleButton id={a.id} slug={a.slug} title={a.title} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
