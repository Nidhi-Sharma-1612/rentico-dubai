import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, ArrowLeft } from "lucide-react";
import { PAGE_TITLES, sectionsForPage } from "../sectionSchemas";

export default async function AdminPageSectionsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const title = PAGE_TITLES[slug];
  if (!title) notFound();

  const sections = sectionsForPage(slug);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <Link href="/admin/pages" className="inline-flex items-center gap-1.5 text-sm font-medium text-navy-900/50 hover:text-navy-900">
          <ArrowLeft className="h-3.5 w-3.5" />
          All pages
        </Link>
        <h1 className="mt-2 text-2xl font-bold text-navy-900">{title}</h1>
        <p className="mt-1 text-sm text-navy-900/55">Choose a section to edit its content.</p>
      </div>

      <div className="flex flex-col gap-2.5">
        {sections.map(({ key, schema }) => (
          <Link
            key={key}
            href={`/admin/pages/${slug}/${key}`}
            className="flex items-center gap-4 rounded-xl border border-navy-900/8 bg-white p-5 transition-colors hover:border-orange-200 hover:bg-orange-50/30"
          >
            <div className="flex-1">
              <p className="text-sm font-bold text-navy-900">{schema.name}</p>
              <p className="text-xs text-navy-900/50">{schema.fields.length} field{schema.fields.length === 1 ? "" : "s"}</p>
            </div>
            <ChevronRight className="h-4 w-4 text-navy-900/30" />
          </Link>
        ))}
      </div>
    </div>
  );
}
