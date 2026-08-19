import Link from "next/link";
import { count, desc, eq } from "drizzle-orm";
import { FileStack, HelpCircle, LayoutDashboard, Newspaper, Quote, Settings as SettingsIcon } from "lucide-react";
import { getCurrentAdmin } from "@/lib/admin/getCurrentAdmin";
import { db } from "@/lib/db";
import { activityLog, adminUsers, articles, faqs, testimonials } from "@/lib/db/schema";
import { ACTION_COLORS, ACTION_ICONS, ACTION_LABELS, ENTITY_LABELS, timeAgo } from "@/lib/admin/activityLabels";
import { PAGE_TITLES } from "./pages/sectionSchemas";
import PageIcon from "./PageIcon";

export default async function AdminOverviewPage() {
  const admin = await getCurrentAdmin();
  const pageCount = Object.keys(PAGE_TITLES).filter((slug) => slug !== "global").length;

  let articleCount = 0;
  let faqCount = 0;
  let testimonialCount = 0;
  let recentActivity: { action: string; entityType: string; entityId: string; createdAt: Date; by: string }[] = [];

  try {
    const [[{ value: articleTotal }], [{ value: faqTotal }], [{ value: testimonialTotal }], activityRows] =
      await Promise.all([
        db.select({ value: count() }).from(articles),
        db.select({ value: count() }).from(faqs),
        db.select({ value: count() }).from(testimonials),
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
          .limit(8),
      ]);
    articleCount = articleTotal;
    faqCount = faqTotal;
    testimonialCount = testimonialTotal;
    recentActivity = activityRows.map((r) => ({ ...r, by: r.by ?? "Unknown" }));
  } catch (err) {
    console.error("Failed to load overview stats:", err);
  }

  const stats = [
    { label: "Articles", value: articleCount, href: "/admin/articles", icon: Newspaper },
    { label: "FAQs", value: faqCount, href: "/admin/faqs", icon: HelpCircle },
    { label: "Testimonials", value: testimonialCount, href: "/admin/testimonials", icon: Quote },
    { label: "Editable pages", value: pageCount, href: "/admin/pages", icon: FileStack },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-3">
        <PageIcon icon={LayoutDashboard} />
        <div>
          <h1 className="text-2xl font-bold text-navy-900">Welcome, {admin?.name}</h1>
          <p className="mt-1 text-sm text-navy-900/55">
            Use the sidebar to manage Articles, FAQs, Testimonials, page content, and site settings.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="flex items-center gap-4 rounded-2xl border border-navy-900/8 bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-orange-200 hover:bg-orange-50/30 hover:shadow-md hover:shadow-navy-900/5"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-orange-50 text-orange-600">
              <s.icon className="h-5 w-5" />
            </span>
            <div>
              <p className="text-2xl font-extrabold text-navy-900">{s.value}</p>
              <p className="text-xs font-medium text-navy-900/50">{s.label}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.3fr_1fr]">
        <div className="flex flex-col gap-3 rounded-2xl border border-navy-900/8 bg-white p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-wider text-navy-900/40">Recent activity</h2>
            <Link href="/admin/activity" className="text-xs font-semibold text-orange-600 hover:underline">
              View all
            </Link>
          </div>
          {recentActivity.length === 0 ? (
            <p className="py-6 text-center text-sm text-navy-900/40">No activity yet.</p>
          ) : (
            <ul className="flex flex-col divide-y divide-navy-900/6">
              {recentActivity.map((a, i) => {
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

        <div className="flex flex-col gap-3 rounded-2xl border border-navy-900/8 bg-white p-5">
          <h2 className="text-sm font-bold uppercase tracking-wider text-navy-900/40">Quick links</h2>
          <div className="flex flex-col gap-2">
            <Link
              href="/admin/settings"
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-navy-900/75 transition-colors hover:bg-orange-50/60 hover:text-orange-600"
            >
              <SettingsIcon className="h-4 w-4 text-navy-900/40" />
              Site settings
            </Link>
            <Link
              href="/admin/pages/global"
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-navy-900/75 transition-colors hover:bg-orange-50/60 hover:text-orange-600"
            >
              <FileStack className="h-4 w-4 text-navy-900/40" />
              Navbar & footer links
            </Link>
            <Link
              href="/admin/articles/new"
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-navy-900/75 transition-colors hover:bg-orange-50/60 hover:text-orange-600"
            >
              <Newspaper className="h-4 w-4 text-navy-900/40" />
              New article
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
