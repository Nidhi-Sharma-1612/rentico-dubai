import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { faqs } from "@/lib/db/schema";
import FaqForm from "../../FaqForm";
import BackLink from "../../../BackLink";

export default async function EditFaqPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [row] = await db.select().from(faqs).where(eq(faqs.id, id)).limit(1);

  if (!row) notFound();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <BackLink href="/admin/faqs" label="All FAQs" />
        <h1 className="mt-2 text-2xl font-bold text-navy-900">Edit FAQ</h1>
      </div>
      <FaqForm initial={row} />
    </div>
  );
}
