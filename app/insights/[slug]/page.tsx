import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Container from "@/components/shared/Container";
import CTABanner from "@/components/shared/CTABanner";
import ArticleHeader from "@/components/insights/ArticleHeader";
import ArticleBody from "@/components/insights/ArticleBody";
import ArticleTOC from "@/components/insights/ArticleTOC";
import ReadingProgress from "@/components/insights/ReadingProgress";
import MoreInsights from "@/components/insights/MoreInsights";
import { articles } from "@/lib/data/articles";
import { articleImages } from "@/lib/data/articleImages";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) return {};
  return {
    title: `${article.title} | Rentico Dubai`,
    description: article.excerpt,
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) notFound();

  return (
    <>
      <ReadingProgress />
      <ArticleHeader article={article} image={articleImages[article.slug]} />

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
        secondaryHref="/services/estimated-revenue"
      />

      <MoreInsights currentSlug={article.slug} />
    </>
  );
}
