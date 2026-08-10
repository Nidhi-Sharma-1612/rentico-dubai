import { Quote } from "lucide-react";
import { ArticleBlock } from "@/lib/types";
import { slugify } from "@/lib/utils";

export default function ArticleBody({ content }: { content: ArticleBlock[] }) {
  const leadIndex = content.findIndex((block) => block.type === "paragraph");

  return (
    <div className="flex flex-col gap-5">
      {content.map((block, i) => {
        if (block.type === "heading") {
          return (
            <h2
              key={i}
              id={slugify(block.text)}
              className="mt-4 scroll-mt-28 text-xl font-bold text-navy-900 sm:text-2xl"
            >
              {block.text}
            </h2>
          );
        }

        if (block.type === "quote") {
          return (
            <blockquote
              key={i}
              className="my-2 flex items-start gap-4 rounded-2xl border-l-4 border-orange-500 bg-orange-50/60 px-6 py-5"
            >
              <Quote className="mt-0.5 h-5 w-5 shrink-0 text-orange-400" fill="currentColor" strokeWidth={0} />
              <p className="text-lg font-medium leading-relaxed text-navy-900">{block.text}</p>
            </blockquote>
          );
        }

        if (block.type === "list") {
          return (
            <ul key={i} className="flex flex-col gap-2.5">
              {block.items.map((item) => (
                <li key={item} className="flex items-start gap-3 text-base leading-relaxed text-navy-900/70">
                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500" />
                  {item}
                </li>
              ))}
            </ul>
          );
        }

        const isLead = i === leadIndex;

        return (
          <p
            key={i}
            className={
              isLead
                ? "text-lg leading-relaxed text-navy-900/80"
                : "text-base leading-relaxed text-navy-900/70"
            }
          >
            {block.text}
          </p>
        );
      })}
    </div>
  );
}
