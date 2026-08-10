"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";
import { Article } from "@/lib/types";
import { articleImages } from "@/lib/data/articleImages";
import Badge from "@/components/shared/Badge";

const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

export default function ArticleCard({
  article,
  featured = false,
  delay = 0,
}: {
  article: Article;
  featured?: boolean;
  delay?: number;
}) {
  const image = articleImages[article.slug];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="h-full"
    >
      <Link
        href={`/insights/${article.slug}`}
        className={`group flex h-full overflow-hidden rounded-2xl border border-navy-900/8 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-xl ${
          featured ? "flex-col lg:flex-row" : "flex-col"
        }`}
      >
        {image && (
          <div
            className={`relative overflow-hidden ${
              featured ? "h-56 w-full lg:h-auto lg:w-2/5" : "h-44 w-full"
            }`}
          >
            <Image
              src={image}
              alt={article.title}
              fill
              sizes={
                featured
                  ? "(min-width: 1024px) 40vw, 100vw"
                  : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              }
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {featured && (
              <span className="absolute left-4 top-4">
                <Badge tone="navy">Latest Insight</Badge>
              </span>
            )}
          </div>
        )}

        <div className="flex flex-1 flex-col gap-4 p-6 sm:p-7">
          <span className="w-fit rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-600">
            {article.category}
          </span>
          <h3
            className={`font-bold leading-snug text-navy-900 ${
              featured ? "text-xl sm:text-2xl" : "text-lg"
            }`}
          >
            {article.title}
          </h3>
          <p className="text-sm leading-relaxed text-navy-900/60">{article.excerpt}</p>
          <div className="mt-auto flex items-center justify-between border-t border-navy-900/8 pt-4 text-xs text-navy-900/45">
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              {article.readTime}
            </span>
            <span>{dateFormatter.format(new Date(article.date))}</span>
          </div>
          <span className="flex items-center gap-1.5 text-sm font-semibold text-orange-600">
            Read more
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
