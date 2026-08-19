"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { setArticleStatus } from "./actions";

export default function ArticleStatusToggle({
  id,
  slug,
  status,
}: {
  id: string;
  slug: string;
  status: string;
}) {
  const [isPending, startTransition] = useTransition();
  const next = status === "draft" ? "published" : "draft";

  const handleClick = () => {
    startTransition(async () => {
      await setArticleStatus(id, slug, next);
      toast.success(next === "published" ? "Article published." : "Article moved to draft.");
    });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isPending}
      className="text-sm font-semibold text-navy-900/50 transition-colors hover:text-navy-900 disabled:pointer-events-none disabled:opacity-50"
    >
      {status === "draft" ? "Publish" : "Unpublish"}
    </button>
  );
}
