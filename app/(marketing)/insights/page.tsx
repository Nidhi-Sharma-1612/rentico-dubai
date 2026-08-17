import type { Metadata } from "next";
import { desc } from "drizzle-orm";
import PageHero from "@/components/shared/PageHero";
import Container from "@/components/shared/Container";
import ArticleCard from "@/components/insights/ArticleCard";
import CTABanner from "@/components/shared/CTABanner";
import { db } from "@/lib/db";
import { articles as articlesTable } from "@/lib/db/schema";
import { Article } from "@/lib/types";

export const metadata: Metadata = {
  title: "Insights | Rentico Dubai",
  description:
    "Market insights, owner guides and hosting tips for short-term rental properties in Dubai.",
};

// Reads admin-editable articles from the DB — without this, Next would
// statically bake this list at build time and new/edited articles would
// never show up without a redeploy.
export const revalidate = 60;

export default async function InsightsPage() {
  let articles: Article[] = [];
  try {
    articles = await db.select().from(articlesTable).orderBy(desc(articlesTable.date));
  } catch (err) {
    console.error("Failed to load articles:", err);
  }

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
          {articles.length === 0 ? (
            <p className="text-center text-sm text-navy-900/50">No articles yet.</p>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="sm:col-span-2 lg:col-span-3">
                <ArticleCard article={featuredArticle} featured />
              </div>
              {restArticles.map((article, i) => (
                <ArticleCard key={article.id} article={article} delay={i * 0.08} />
              ))}
            </div>
          )}
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
