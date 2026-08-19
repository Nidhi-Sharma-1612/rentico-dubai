import Link from "next/link";
import { Compass, Handshake, HelpCircle, Home, Plus, Wrench } from "lucide-react";
import { asc } from "drizzle-orm";
import { db } from "@/lib/db";
import { faqs } from "@/lib/db/schema";
import FaqReorderList from "./FaqReorderList";
import PageIcon from "../PageIcon";

const groups = [
  { value: "home", label: "Home", icon: Home },
  { value: "services", label: "Services", icon: Wrench },
  { value: "partner", label: "Become a Partner", icon: Handshake },
  { value: "experience", label: "Experience", icon: Compass },
] as const;

export default async function AdminFaqsListPage() {
  const rows = await db.select().from(faqs).orderBy(asc(faqs.sortOrder));

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <PageIcon icon={HelpCircle} />
          <div>
            <h1 className="text-2xl font-bold text-navy-900">FAQs</h1>
            <p className="text-sm text-navy-900/55">{rows.length} total · drag to reorder within a page</p>
          </div>
        </div>
        <Link
          href="/admin/faqs/new"
          className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-orange-600"
        >
          <Plus className="h-4 w-4" />
          New FAQ
        </Link>
      </div>

      {groups.map((g) => (
        <div key={g.value} className="flex flex-col gap-3">
          <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-navy-900/50">
            <g.icon className="h-4 w-4 text-navy-900/35" />
            {g.label}
          </h2>
          <FaqReorderList group={g.value} initialItems={rows.filter((r) => r.group === g.value)} />
        </div>
      ))}
    </div>
  );
}
