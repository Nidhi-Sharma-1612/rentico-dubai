"use client";

import { useTransition } from "react";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { deleteTestimonial } from "./actions";

export default function DeleteTestimonialButton({ id, name }: { id: string; name: string }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (!confirm(`Delete the testimonial from "${name}"? This can't be undone.`)) return;
    startTransition(async () => {
      await deleteTestimonial(id);
      toast.success("Testimonial deleted.");
    });
  };

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isPending}
      className="text-navy-900/40 transition-colors hover:text-red-600 disabled:pointer-events-none disabled:opacity-50"
      aria-label={`Delete testimonial from ${name}`}
    >
      <Trash2 className="h-4 w-4" />
    </button>
  );
}
