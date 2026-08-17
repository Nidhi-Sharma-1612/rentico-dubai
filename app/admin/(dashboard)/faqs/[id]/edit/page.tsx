import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { faqs } from "@/lib/db/schema";
import FaqForm from "../../FaqForm";

export default async function EditFaqPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [row] = await db.select().from(faqs).where(eq(faqs.id, id)).limit(1);

  if (!row) notFound();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-navy-900">Edit FAQ</h1>
      <FaqForm initial={row} />
    </div>
  );
}
