import { ArticleBlock } from "@/lib/types";
import { slugify } from "@/lib/utils";

export default function ArticleTOC({ content }: { content: ArticleBlock[] }) {
  const headings = content.filter(
    (block): block is Extract<ArticleBlock, { type: "heading" }> => block.type === "heading"
  );

  if (headings.length < 3) return null;

  return (
    <div className="hidden shrink-0 lg:block lg:w-64">
      <nav className="sticky top-28 flex flex-col gap-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-navy-900/40">On This Page</span>
        <ul className="flex flex-col gap-1 border-l border-navy-900/8">
          {headings.map((heading) => (
            <li key={heading.text}>
              <a
                href={`#${slugify(heading.text)}`}
                className="-ml-px block border-l-2 border-transparent py-1 pl-4 text-sm leading-snug text-navy-900/55 transition-colors hover:border-orange-400 hover:text-orange-600"
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
