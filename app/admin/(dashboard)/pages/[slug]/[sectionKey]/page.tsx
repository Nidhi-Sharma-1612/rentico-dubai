import { notFound } from "next/navigation";
import { and, eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { pages, sections } from "@/lib/db/schema";
import { PAGE_TITLES, SECTION_SCHEMAS, sectionIcon } from "../../sectionSchemas";
import SectionForm from "../../SectionForm";
import PageIcon from "../../../PageIcon";
import BackLink from "../../../BackLink";

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
        <BackLink href={`/admin/pages/${slug}`} label={PAGE_TITLES[slug]} />
        <div className="mt-2 flex items-center gap-3">
          <PageIcon icon={sectionIcon(sectionKey)} />
          <h1 className="text-2xl font-bold text-navy-900">{schema.name}</h1>
        </div>
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
