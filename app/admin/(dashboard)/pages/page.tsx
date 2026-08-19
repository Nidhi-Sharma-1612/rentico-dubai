import Link from "next/link";
import { ChevronRight, FileStack } from "lucide-react";
import { PAGE_ICONS, PAGE_TITLES, sectionsForPage } from "./sectionSchemas";
import PageIcon from "../PageIcon";

export default function AdminPagesPage() {
  const slugs = Object.keys(PAGE_TITLES);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <PageIcon icon={FileStack} />
        <div>
          <h1 className="text-2xl font-bold text-navy-900">Pages</h1>
          <p className="mt-1 text-sm text-navy-900/55">
            Edit the content blocks that make up each marketing page — no code deploy needed.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
        {slugs.map((slug) => {
          const sectionCount = sectionsForPage(slug).length;
          const Icon = PAGE_ICONS[slug] ?? FileStack;
          return (
            <Link
              key={slug}
              href={`/admin/pages/${slug}`}
              className="flex items-center gap-4 rounded-xl border border-navy-900/8 bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-orange-200 hover:bg-orange-50/30 hover:shadow-md hover:shadow-navy-900/5"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-50 text-orange-600">
                <Icon className="h-5 w-5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold text-navy-900">{PAGE_TITLES[slug]}</p>
                <p className="text-xs text-navy-900/50">
                  {sectionCount} editable section{sectionCount === 1 ? "" : "s"}
                </p>
              </div>
              <ChevronRight className="h-4 w-4 shrink-0 text-navy-900/30" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
