import Link from "next/link";
import { ChevronRight, FileStack } from "lucide-react";
import { PAGE_TITLES, sectionsForPage } from "./sectionSchemas";

export default function AdminPagesPage() {
  const slugs = Object.keys(PAGE_TITLES);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-navy-900">Pages</h1>
        <p className="mt-1 text-sm text-navy-900/55">
          Edit the content blocks that make up each marketing page — no code deploy needed.
        </p>
      </div>

      <div className="flex flex-col gap-2.5">
        {slugs.map((slug) => {
          const sectionCount = sectionsForPage(slug).length;
          return (
            <Link
              key={slug}
              href={`/admin/pages/${slug}`}
              className="flex items-center gap-4 rounded-xl border border-navy-900/8 bg-white p-5 transition-colors hover:border-orange-200 hover:bg-orange-50/30"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-50 text-orange-600">
                <FileStack className="h-5 w-5" />
              </span>
              <div className="flex-1">
                <p className="text-sm font-bold text-navy-900">{PAGE_TITLES[slug]}</p>
                <p className="text-xs text-navy-900/50">
                  {sectionCount} editable section{sectionCount === 1 ? "" : "s"}
                </p>
              </div>
              <ChevronRight className="h-4 w-4 text-navy-900/30" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
