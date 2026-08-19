import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, FileStack } from "lucide-react";
import { PAGE_ICONS, PAGE_TITLES, sectionIcon, sectionsForPage } from "../sectionSchemas";
import PageIcon from "../../PageIcon";
import BackLink from "../../BackLink";

export default async function AdminPageSectionsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const title = PAGE_TITLES[slug];
  if (!title) notFound();

  const sections = sectionsForPage(slug);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <BackLink href="/admin/pages" label="All pages" />
        <div className="mt-2 flex items-center gap-3">
          <PageIcon icon={PAGE_ICONS[slug] ?? FileStack} />
          <div>
            <h1 className="text-2xl font-bold text-navy-900">{title}</h1>
            <p className="mt-1 text-sm text-navy-900/55">Choose a section to edit its content.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
        {sections.map(({ key, schema }) => {
          const Icon = sectionIcon(key);
          return (
            <Link
              key={key}
              href={`/admin/pages/${slug}/${key}`}
              className="flex items-center gap-4 rounded-xl border border-navy-900/8 bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-orange-200 hover:bg-orange-50/30 hover:shadow-md hover:shadow-navy-900/5"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-50 text-orange-600">
                <Icon className="h-5 w-5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold text-navy-900">{schema.name}</p>
                <p className="text-xs text-navy-900/50">{schema.fields.length} field{schema.fields.length === 1 ? "" : "s"}</p>
              </div>
              <ChevronRight className="h-4 w-4 shrink-0 text-navy-900/30" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
