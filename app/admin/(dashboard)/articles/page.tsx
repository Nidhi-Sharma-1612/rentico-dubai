import Link from "next/link";
import Image from "next/image";
import { Eye, Newspaper, Plus } from "lucide-react";
import { desc } from "drizzle-orm";
import { db } from "@/lib/db";
import { articles } from "@/lib/db/schema";
import DeleteArticleButton from "./DeleteArticleButton";
import ArticleStatusToggle from "./ArticleStatusToggle";
import PageIcon from "../PageIcon";
import EmptyState from "../EmptyState";

export default async function AdminArticlesListPage() {
  const rows = await db.select().from(articles).orderBy(desc(articles.date));

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <PageIcon icon={Newspaper} />
          <div>
            <h1 className="text-2xl font-bold text-navy-900">Articles</h1>
            <p className="text-sm text-navy-900/55">{rows.length} total</p>
          </div>
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
        <EmptyState icon={Newspaper} label="No articles yet." />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {rows.map((a) => (
            <div
              key={a.id}
              className="flex flex-col overflow-hidden rounded-xl border border-navy-900/8 bg-white transition-all hover:-translate-y-0.5 hover:shadow-md hover:shadow-navy-900/5"
            >
              <div className="relative aspect-video w-full shrink-0 bg-navy-900/5">
                {a.image && <Image src={a.image} alt={a.title} fill className="object-cover" />}
                <span
                  className={`absolute left-2 top-2 rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider ${
                    a.status === "draft" ? "bg-navy-900/70 text-white" : "bg-emerald-500 text-white"
                  }`}
                >
                  {a.status === "draft" ? "Draft" : "Published"}
                </span>
              </div>
              <div className="flex flex-1 flex-col gap-2 p-4">
                <p className="line-clamp-2 text-sm font-bold text-navy-900">{a.title}</p>
                <p className="text-xs text-navy-900/45">
                  {a.category} · {a.readTime} · {a.date}
                </p>
                <div className="mt-auto flex flex-wrap items-center justify-between gap-x-3 gap-y-2 pt-3">
                  <div className="flex items-center gap-3">
                    <Link
                      href={`/admin/articles/${a.id}/edit`}
                      className="text-sm font-semibold text-orange-600 hover:underline"
                    >
                      Edit
                    </Link>
                    <Link
                      href={a.status === "draft" ? `/api/draft?slug=${a.slug}` : `/insights/${a.slug}`}
                      target="_blank"
                      className="inline-flex items-center gap-1 text-sm font-semibold text-navy-900/50 hover:text-navy-900"
                    >
                      <Eye className="h-3.5 w-3.5" />
                      {a.status === "draft" ? "Preview" : "View"}
                    </Link>
                    <ArticleStatusToggle id={a.id} slug={a.slug} status={a.status} />
                  </div>
                  <DeleteArticleButton id={a.id} slug={a.slug} title={a.title} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
