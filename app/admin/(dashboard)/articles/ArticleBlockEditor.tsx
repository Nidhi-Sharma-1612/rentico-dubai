"use client";

import { useId } from "react";
import { GripVertical, Trash2, Plus } from "lucide-react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, useSortable, arrayMove } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ArticleBlock } from "@/lib/types";

const inputClass =
  "w-full rounded-lg border border-navy-900/12 bg-white px-3 py-2 text-sm text-navy-900 outline-none transition-colors placeholder:text-navy-900/35 focus:border-orange-500";

const blockLabels: Record<ArticleBlock["type"], string> = {
  paragraph: "Paragraph",
  heading: "Heading",
  list: "Bulleted list",
  quote: "Quote",
};

function emptyBlock(type: ArticleBlock["type"]): ArticleBlock {
  if (type === "list") return { type, items: [""] };
  return { type, text: "" };
}

function BlockFields({ block, onChange }: { block: ArticleBlock; onChange: (block: ArticleBlock) => void }) {
  if (block.type === "list") {
    return (
      <textarea
        className={inputClass}
        rows={3}
        placeholder="One item per line"
        value={block.items.join("\n")}
        onChange={(e) => onChange({ type: "list", items: e.target.value.split("\n") })}
      />
    );
  }

  if (block.type === "heading") {
    return (
      <input
        className={inputClass}
        placeholder="Heading text"
        value={block.text}
        onChange={(e) => onChange({ type: "heading", text: e.target.value })}
      />
    );
  }

  return (
    <textarea
      className={inputClass}
      rows={block.type === "quote" ? 2 : 3}
      placeholder={block.type === "quote" ? "Quote text" : "Paragraph text"}
      value={block.text}
      onChange={(e) => onChange({ type: block.type, text: e.target.value })}
    />
  );
}

function SortableBlock({
  id,
  block,
  onChange,
  onRemove,
}: {
  id: string;
  block: ArticleBlock;
  onChange: (block: ArticleBlock) => void;
  onRemove: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={`flex items-start gap-2.5 rounded-xl border border-navy-900/8 bg-white p-3.5 ${isDragging ? "opacity-50" : ""}`}
    >
      <button
        type="button"
        {...attributes}
        {...listeners}
        className="mt-2 cursor-grab touch-none text-navy-900/30 hover:text-navy-900/60"
        aria-label="Drag to reorder block"
      >
        <GripVertical className="h-4 w-4" />
      </button>
      <div className="flex-1">
        <p className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-navy-900/40">
          {blockLabels[block.type]}
        </p>
        <BlockFields block={block} onChange={onChange} />
      </div>
      <button
        type="button"
        onClick={onRemove}
        className="mt-2 text-navy-900/30 transition-colors hover:text-red-600"
        aria-label="Remove block"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
}

export default function ArticleBlockEditor({
  value,
  onChange,
}: {
  value: ArticleBlock[];
  onChange: (blocks: ArticleBlock[]) => void;
}) {
  const baseId = useId();
  const ids = value.map((_, i) => `${baseId}-${i}`);
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = ids.indexOf(String(active.id));
    const newIndex = ids.indexOf(String(over.id));
    onChange(arrayMove(value, oldIndex, newIndex));
  };

  const updateBlock = (index: number, block: ArticleBlock) => {
    onChange(value.map((b, i) => (i === index ? block : b)));
  };

  const removeBlock = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  const addBlock = (type: ArticleBlock["type"]) => {
    onChange([...value, emptyBlock(type)]);
  };

  return (
    <div className="flex flex-col gap-3">
      {value.length === 0 && (
        <p className="rounded-xl border border-dashed border-navy-900/15 p-6 text-center text-sm text-navy-900/40">
          No content blocks yet — add one below.
        </p>
      )}

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={ids} strategy={verticalListSortingStrategy}>
          <div className="flex flex-col gap-2.5">
            {value.map((block, i) => (
              <SortableBlock
                key={ids[i]}
                id={ids[i]}
                block={block}
                onChange={(b) => updateBlock(i, b)}
                onRemove={() => removeBlock(i)}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      <div className="flex flex-wrap gap-2 pt-1">
        {(["paragraph", "heading", "list", "quote"] as const).map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => addBlock(type)}
            className="inline-flex items-center gap-1.5 rounded-full border border-navy-900/12 bg-white px-3.5 py-1.5 text-xs font-semibold text-navy-900/70 transition-colors hover:border-orange-300 hover:text-orange-600"
          >
            <Plus className="h-3.5 w-3.5" />
            {blockLabels[type]}
          </button>
        ))}
      </div>
    </div>
  );
}
