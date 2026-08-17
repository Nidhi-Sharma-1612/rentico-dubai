"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { GripVertical, Trash2 } from "lucide-react";
import { toast } from "sonner";
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
import { deleteFaq, reorderFaqs } from "./actions";

export interface FaqRow {
  id: string;
  question: string;
  answer: string;
}

function SortableRow({ faq, onDelete }: { faq: FaqRow; onDelete: (id: string) => void }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: faq.id });

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={`flex items-start gap-3 rounded-xl border border-navy-900/8 bg-white p-4 ${isDragging ? "opacity-50" : ""}`}
    >
      <button
        type="button"
        {...attributes}
        {...listeners}
        className="mt-0.5 cursor-grab touch-none text-navy-900/30 hover:text-navy-900/60"
        aria-label="Drag to reorder"
      >
        <GripVertical className="h-4 w-4" />
      </button>
      <div className="flex-1">
        <p className="text-sm font-bold text-navy-900">{faq.question}</p>
        <p className="mt-1 text-sm text-navy-900/55">{faq.answer}</p>
      </div>
      <div className="flex shrink-0 items-center gap-3">
        <Link href={`/admin/faqs/${faq.id}/edit`} className="text-sm font-semibold text-orange-600 hover:underline">
          Edit
        </Link>
        <button
          type="button"
          onClick={() => onDelete(faq.id)}
          className="text-navy-900/40 transition-colors hover:text-red-600"
          aria-label={`Delete "${faq.question}"`}
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

export default function FaqReorderList({ group, initialItems }: { group: string; initialItems: FaqRow[] }) {
  const [items, setItems] = useState(initialItems);
  const [, startTransition] = useTransition();
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  if (items.length === 0) {
    return <p className="rounded-xl border border-navy-900/8 bg-white p-6 text-center text-sm text-navy-900/50">No FAQs yet.</p>;
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = items.findIndex((i) => i.id === active.id);
    const newIndex = items.findIndex((i) => i.id === over.id);
    const reordered = arrayMove(items, oldIndex, newIndex);
    setItems(reordered);

    startTransition(async () => {
      await reorderFaqs(reordered.map((item, i) => ({ id: item.id, sortOrder: i })));
    });
  };

  const handleDelete = (id: string) => {
    if (!confirm("Delete this FAQ? This can't be undone.")) return;
    setItems((prev) => prev.filter((i) => i.id !== id));
    startTransition(async () => {
      await deleteFaq(id);
      toast.success("FAQ deleted.");
    });
  };

  return (
    <DndContext id={`faq-dnd-${group}`} sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={items.map((i) => i.id)} strategy={verticalListSortingStrategy}>
        <div className="flex flex-col gap-2.5">
          {items.map((faq) => (
            <SortableRow key={faq.id} faq={faq} onDelete={handleDelete} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
