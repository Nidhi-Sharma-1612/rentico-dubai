"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import Container from "@/components/shared/Container";
import Badge from "@/components/shared/Badge";
import { Article } from "@/lib/types";

const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export default function ArticleHeader({ article, image }: { article: Article; image?: string }) {
  return (
    <section className="pb-4 pt-10 sm:pt-14">
      <Container className="flex flex-col gap-8">
        <Link
          href="/insights"
          className="flex w-fit items-center gap-1.5 text-sm font-semibold text-navy-900/60 transition-colors hover:text-orange-600"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Insights
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto flex max-w-3xl flex-col gap-5"
        >
          <Badge>{article.category}</Badge>
          <h1 className="text-3xl font-extrabold tracking-tight text-navy-900 sm:text-4xl">{article.title}</h1>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-navy-900/8 pt-5 text-sm text-navy-900/50">
            <span className="flex items-center gap-2.5 text-navy-900/70">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-navy-900 text-xs font-bold text-white">
                RT
              </span>
              <span className="font-semibold">Rentico Team</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {dateFormatter.format(new Date(article.date))}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              {article.readTime}
            </span>
          </div>
        </motion.div>

        {image && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative mx-auto h-64 w-full max-w-4xl overflow-hidden rounded-3xl sm:h-96"
          >
            <Image
              src={image}
              alt={article.title}
              fill
              sizes="(min-width: 1024px) 60vw, 100vw"
              className="object-cover"
              priority
            />
          </motion.div>
        )}
      </Container>
    </section>
  );
}
