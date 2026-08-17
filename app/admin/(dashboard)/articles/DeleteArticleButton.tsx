"use client";

import { useTransition } from "react";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { deleteArticle } from "./actions";

export default function DeleteArticleButton({ id, slug, title }: { id: string; slug: string; title: string }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (!confirm(`Delete "${title}"? This can't be undone.`)) return;
    startTransition(async () => {
      await deleteArticle(id, slug);
      toast.success("Article deleted.");
    });
  };

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isPending}
      className="text-navy-900/40 transition-colors hover:text-red-600 disabled:pointer-events-none disabled:opacity-50"
      aria-label={`Delete "${title}"`}
    >
      <Trash2 className="h-4 w-4" />
    </button>
  );
}
