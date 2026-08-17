import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import ArticleCard from "@/components/insights/ArticleCard";
import { Article } from "@/lib/types";

export default function MoreInsights({ articles }: { articles: Article[] }) {
  if (articles.length === 0) return null;

  return (
    <section className="bg-navy-50/40 py-20 sm:py-28">
      <Container className="flex flex-col gap-12">
        <SectionHeading eyebrow="Keep Reading" title="More insights for property owners" align="center" />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article, i) => (
            <ArticleCard key={article.id} article={article} delay={i * 0.08} />
          ))}
        </div>
      </Container>
    </section>
  );
}
