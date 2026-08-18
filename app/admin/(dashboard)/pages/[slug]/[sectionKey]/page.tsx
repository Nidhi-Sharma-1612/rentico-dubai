import Link from "next/link";
import { notFound } from "next/navigation";
import { and, eq } from "drizzle-orm";
import { ArrowLeft } from "lucide-react";
import { db } from "@/lib/db";
import { pages, sections } from "@/lib/db/schema";
import { PAGE_TITLES, SECTION_SCHEMAS } from "../../sectionSchemas";
import SectionForm from "../../SectionForm";

export default async function AdminSectionEditPage({
  params,
}: {
  params: Promise<{ slug: string; sectionKey: string }>;
}) {
  const { slug, sectionKey } = await params;
  const schema = SECTION_SCHEMAS[`${slug}:${sectionKey}`];
  if (!schema || !PAGE_TITLES[slug]) notFound();

  const [row] = await db
    .select({ content: sections.content })
    .from(sections)
    .innerJoin(pages, eq(sections.pageId, pages.id))
    .where(and(eq(pages.slug, slug), eq(sections.key, sectionKey)))
    .limit(1);

  if (!row) notFound();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <Link
          href={`/admin/pages/${slug}`}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-navy-900/50 hover:text-navy-900"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          {PAGE_TITLES[slug]}
        </Link>
        <h1 className="mt-2 text-2xl font-bold text-navy-900">{schema.name}</h1>
      </div>

      <SectionForm
        pageSlug={slug}
        sectionKey={sectionKey}
        fields={schema.fields}
        initialContent={row.content as Record<string, unknown>}
      />
    </div>
  );
}
