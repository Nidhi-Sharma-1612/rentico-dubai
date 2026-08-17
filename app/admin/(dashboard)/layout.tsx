import { redirect } from "next/navigation";
import Logo from "@/components/layout/Logo";
import { getCurrentAdmin } from "@/lib/admin/getCurrentAdmin";
import AdminSidebar from "./AdminSidebar";
import SignOutButton from "./SignOutButton";

export default async function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    redirect("/admin/login");
  }

  return (
    <div className="flex min-h-full">
      <aside className="flex w-64 shrink-0 flex-col border-r border-navy-900/8 bg-white p-5">
        <div className="px-2 pb-6">
          <Logo />
        </div>
        <div className="flex-1">
          <AdminSidebar />
        </div>
        <div className="mt-6 border-t border-navy-900/8 pt-4">
          <p className="truncate px-3 text-xs text-navy-900/40">{admin.email}</p>
          <SignOutButton />
        </div>
      </aside>

      <main className="flex-1 bg-navy-50/30 p-8">{children}</main>
    </div>
  );
}
