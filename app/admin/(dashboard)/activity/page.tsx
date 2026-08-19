import Link from "next/link";
import { ChevronLeft, ChevronRight, History } from "lucide-react";
import { count, desc, eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { activityLog, adminUsers } from "@/lib/db/schema";
import { ACTION_COLORS, ACTION_ICONS, ACTION_LABELS, ENTITY_LABELS, timeAgo } from "@/lib/admin/activityLabels";
import PageIcon from "../PageIcon";

const PAGE_SIZE = 30;

export default async function AdminActivityPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, Number(pageParam) || 1);

  let rows: { action: string; entityType: string; entityId: string; createdAt: Date; by: string }[] = [];
  let total = 0;

  try {
    const [[{ value: totalCount }], activityRows] = await Promise.all([
      db.select({ value: count() }).from(activityLog),
      db
        .select({
          action: activityLog.action,
          entityType: activityLog.entityType,
          entityId: activityLog.entityId,
          createdAt: activityLog.createdAt,
          by: adminUsers.email,
        })
        .from(activityLog)
        .leftJoin(adminUsers, eq(activityLog.adminUserId, adminUsers.id))
        .orderBy(desc(activityLog.createdAt))
        .limit(PAGE_SIZE)
        .offset((page - 1) * PAGE_SIZE),
    ]);
    total = totalCount;
    rows = activityRows.map((r) => ({ ...r, by: r.by ?? "Unknown" }));
  } catch (err) {
    console.error("Failed to load activity log:", err);
  }

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <PageIcon icon={History} />
        <div>
          <h1 className="text-2xl font-bold text-navy-900">Activity log</h1>
          <p className="mt-1 text-sm text-navy-900/55">{total} action{total === 1 ? "" : "s"} recorded</p>
        </div>
      </div>

      <div className="rounded-2xl border border-navy-900/8 bg-white p-5">
        {rows.length === 0 ? (
          <p className="py-6 text-center text-sm text-navy-900/40">No activity yet.</p>
        ) : (
          <ul className="flex flex-col divide-y divide-navy-900/6">
            {rows.map((a, i) => {
              const ActionIcon = ACTION_ICONS[a.action];
              return (
                <li key={i} className="flex items-start gap-3 py-3 text-sm">
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${ACTION_COLORS[a.action] ?? "bg-navy-900/5 text-navy-900/50"}`}
                  >
                    {ActionIcon && <ActionIcon className="h-3.5 w-3.5" />}
                  </span>
                  <div className="flex flex-1 flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                    <p className="text-navy-900/75">
                      <span className="font-semibold text-navy-900">{a.by}</span>{" "}
                      {ACTION_LABELS[a.action] ?? a.action} {ENTITY_LABELS[a.entityType] ?? a.entityType}{" "}
                      <span className="font-medium text-navy-900/50">{a.entityId}</span>
                    </p>
                    <span className="shrink-0 text-xs text-navy-900/40">{timeAgo(a.createdAt)}</span>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between text-sm">
          <Link
            href={`/admin/activity?page=${page - 1}`}
            aria-disabled={page <= 1}
            className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 font-semibold ${
              page <= 1
                ? "pointer-events-none text-navy-900/25"
                : "text-navy-900/70 hover:bg-navy-900/5 hover:text-navy-900"
            }`}
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Link>
          <span className="text-navy-900/50">
            Page {page} of {totalPages}
          </span>
          <Link
            href={`/admin/activity?page=${page + 1}`}
            aria-disabled={page >= totalPages}
            className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 font-semibold ${
              page >= totalPages
                ? "pointer-events-none text-navy-900/25"
                : "text-navy-900/70 hover:bg-navy-900/5 hover:text-navy-900"
            }`}
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      )}
    </div>
  );
}
