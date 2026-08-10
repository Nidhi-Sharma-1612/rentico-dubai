import type { Metadata } from "next";
import PageHero from "@/components/shared/PageHero";
import Container from "@/components/shared/Container";
import ArticleCard from "@/components/insights/ArticleCard";
import CTABanner from "@/components/shared/CTABanner";
import { articles } from "@/lib/data/articles";

export const metadata: Metadata = {
  title: "Insights | Rentico Dubai",
  description:
    "Market insights, owner guides and hosting tips for short-term rental properties in Dubai.",
};

export default function InsightsPage() {
  const [featuredArticle, ...restArticles] = articles;

  return (
    <>
      <PageHero
        eyebrow="Insights"
        title="Guides, market data and tips for Dubai property owners"
        description="Everything you need to know about running a successful short-term rental in Dubai — from regulation to returns."
      />

      <section className="py-20 sm:py-28">
        <Container>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="sm:col-span-2 lg:col-span-3">
              <ArticleCard article={featuredArticle} featured />
            </div>
            {restArticles.map((article, i) => (
              <ArticleCard key={article.id} article={article} delay={i * 0.08} />
            ))}
          </div>
        </Container>
      </section>

      <CTABanner
        title="Have a property in mind?"
        description="Get a free, no-obligation revenue estimate from our team."
        primaryLabel="Become a Partner"
        primaryHref="/become-a-partner"
      />
    </>
  );
}
