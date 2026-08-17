import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { eq, ne, desc } from "drizzle-orm";
import Container from "@/components/shared/Container";
import CTABanner from "@/components/shared/CTABanner";
import ArticleHeader from "@/components/insights/ArticleHeader";
import ArticleBody from "@/components/insights/ArticleBody";
import ArticleTOC from "@/components/insights/ArticleTOC";
import ReadingProgress from "@/components/insights/ReadingProgress";
import MoreInsights from "@/components/insights/MoreInsights";
import { db } from "@/lib/db";
import { articles as articlesTable } from "@/lib/db/schema";

// Reads admin-editable article content from the DB — without this, Next
// would statically bake pages at build time and edits would never show up
// without a redeploy. New articles created after the last build still work
// via on-demand generation (dynamicParams defaults to true).
export const revalidate = 60;

export async function generateStaticParams() {
  try {
    const rows = await db.select({ slug: articlesTable.slug }).from(articlesTable);
    return rows.map((a) => ({ slug: a.slug }));
  } catch (err) {
    console.error("Failed to load article slugs:", err);
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const [article] = await db.select().from(articlesTable).where(eq(articlesTable.slug, slug)).limit(1);
  if (!article) return {};
  return {
    title: `${article.title} | Rentico Dubai`,
    description: article.excerpt,
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [article] = await db.select().from(articlesTable).where(eq(articlesTable.slug, slug)).limit(1);
  if (!article) notFound();

  const related = await db
    .select()
    .from(articlesTable)
    .where(ne(articlesTable.slug, slug))
    .orderBy(desc(articlesTable.date))
    .limit(3);

  return (
    <>
      <ReadingProgress />
      <ArticleHeader article={article} image={article.image ?? undefined} />

      <section className="py-12 sm:py-16">
        <Container>
          <div className="mx-auto flex max-w-6xl justify-center gap-12">
            <ArticleTOC content={article.content} />
            <div className="min-w-0 max-w-3xl flex-1">
              <ArticleBody content={article.content} />
            </div>
          </div>
        </Container>
      </section>

      <CTABanner
        title="Ready to put your property to work?"
        description="Get a free, no-obligation revenue estimate from our team."
        primaryLabel="Become a Partner"
        primaryHref="/become-a-partner"
        secondaryLabel="Get a Free Revenue Estimate"
        secondaryHref="/manage-my-property"
      />

      <MoreInsights articles={related} />
    </>
  );
}
