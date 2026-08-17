import { getCurrentAdmin } from "@/lib/admin/getCurrentAdmin";

export default async function AdminOverviewPage() {
  const admin = await getCurrentAdmin();

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl font-bold text-navy-900">Welcome, {admin?.name}</h1>
      <p className="text-sm text-navy-900/55">
        Use the sidebar to manage Articles, FAQs, Testimonials, page content, and site settings.
      </p>
    </div>
  );
}
