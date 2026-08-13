import { CircleCheck } from "lucide-react";

/**
 * Guesty host descriptions use ad-hoc formatting: blank-line-separated
 * blocks, short emoji-led lines as subheadings (e.g. "🛏️ Bedroom"), and
 * "✔ " prefixed bullet lines. This parses that into real headings/lists/
 * paragraphs instead of collapsing everything into one flat run of text.
 */
interface Block {
  type: "heading" | "list" | "paragraph";
  lines: string[];
}

const BULLET_RE = /^(?:[✔✓♛•▪◦]|[-*])\s+/;
const EMOJI_RE = /^\p{Extended_Pictographic}️?\s*/u;

function isBullet(line: string): boolean {
  return BULLET_RE.test(line);
}

function isHeadingLine(line: string): boolean {
  const rest = line.replace(EMOJI_RE, "");
  return rest.length > 0 && rest.length !== line.length && rest.length <= 40 && !/[.!?]$/.test(rest);
}

function parseBlocks(text: string): Block[] {
  const lines = text
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);

  const blocks: Block[] = [];
  let i = 0;

  while (i < lines.length) {
    if (isBullet(lines[i])) {
      const items: string[] = [];
      while (i < lines.length && isBullet(lines[i])) {
        items.push(lines[i].replace(BULLET_RE, "").trim());
        i++;
      }
      blocks.push({ type: "list", lines: items });
      continue;
    }

    if (isHeadingLine(lines[i])) {
      blocks.push({ type: "heading", lines: [lines[i]] });
      i++;
      continue;
    }

    const paragraph: string[] = [];
    while (i < lines.length && !isBullet(lines[i]) && !isHeadingLine(lines[i])) {
      paragraph.push(lines[i]);
      i++;
    }
    blocks.push({ type: "paragraph", lines: [paragraph.join(" ")] });
  }

  return blocks;
}

export default function PropertyTextSection({
  title,
  children,
}: {
  title: string;
  children: string;
}) {
  const blocks = parseBlocks(children);

  return (
    <div className="border-b border-navy-900/8 py-8">
      <h2 className="mb-4 text-xl font-bold text-navy-900">{title}</h2>
      <div className="flex max-w-3xl flex-col gap-4">
        {blocks.map((block, i) => {
          if (block.type === "heading") {
            return (
              <h3 key={i} className="pt-2 text-base font-bold text-navy-900 first:pt-0">
                {block.lines[0]}
              </h3>
            );
          }
          if (block.type === "list") {
            return (
              <ul key={i} className="grid grid-cols-1 gap-x-6 gap-y-2.5 sm:grid-cols-2">
                {block.lines.map((item, j) => (
                  <li key={j} className="flex items-start gap-2.5 text-sm text-navy-900/70 sm:text-base">
                    <CircleCheck className="mt-0.5 h-4 w-4 shrink-0 text-orange-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            );
          }
          return (
            <p key={i} className="text-sm leading-relaxed text-navy-900/70 sm:text-base">
              {block.lines[0]}
            </p>
          );
        })}
      </div>
    </div>
  );
}
