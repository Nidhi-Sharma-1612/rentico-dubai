import Link from "next/link";
import { Plus, Star } from "lucide-react";
import { db } from "@/lib/db";
import { testimonials } from "@/lib/db/schema";
import { asc } from "drizzle-orm";
import DeleteTestimonialButton from "./DeleteTestimonialButton";

export default async function AdminTestimonialsListPage() {
  const rows = await db.select().from(testimonials).orderBy(asc(testimonials.sortOrder));

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">Testimonials</h1>
          <p className="text-sm text-navy-900/55">{rows.length} total</p>
        </div>
        <Link
          href="/admin/testimonials/new"
          className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-orange-600"
        >
          <Plus className="h-4 w-4" />
          New Testimonial
        </Link>
      </div>

      {rows.length === 0 ? (
        <p className="rounded-xl border border-navy-900/8 bg-white p-8 text-center text-sm text-navy-900/50">
          No testimonials yet.
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          {rows.map((t) => (
            <div
              key={t.id}
              className="flex items-start justify-between gap-4 rounded-xl border border-navy-900/8 bg-white p-5"
            >
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold text-navy-900">{t.name}</p>
                  <span className="text-xs text-navy-900/40">{t.role}</span>
                  <span className="flex items-center gap-0.5 text-xs text-orange-500">
                    <Star className="h-3 w-3" fill="currentColor" strokeWidth={0} />
                    {t.rating}
                  </span>
                </div>
                <p className="max-w-xl text-sm text-navy-900/60">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex gap-2 pt-1">
                  {t.showOnHome && (
                    <span className="rounded-full bg-navy-900/5 px-2.5 py-0.5 text-xs font-medium text-navy-900/50">
                      Home
                    </span>
                  )}
                  {t.featuredForAbout && (
                    <span className="rounded-full bg-orange-50 px-2.5 py-0.5 text-xs font-medium text-orange-600">
                      About (featured)
                    </span>
                  )}
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <Link
                  href={`/admin/testimonials/${t.id}/edit`}
                  className="text-sm font-semibold text-orange-600 hover:underline"
                >
                  Edit
                </Link>
                <DeleteTestimonialButton id={t.id} name={t.name} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
