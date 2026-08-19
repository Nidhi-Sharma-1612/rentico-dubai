import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { testimonials } from "@/lib/db/schema";
import TestimonialForm from "../../TestimonialForm";
import BackLink from "../../../BackLink";

export default async function EditTestimonialPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [row] = await db.select().from(testimonials).where(eq(testimonials.id, id)).limit(1);

  if (!row) notFound();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <BackLink href="/admin/testimonials" label="All testimonials" />
        <h1 className="mt-2 text-2xl font-bold text-navy-900">Edit Testimonial</h1>
      </div>
      <TestimonialForm initial={row} />
    </div>
  );
}
