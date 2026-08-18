import { redirect } from "next/navigation";
import { getCurrentAdmin } from "@/lib/admin/getCurrentAdmin";
import AccountForm from "./AccountForm";

export default async function AdminAccountPage() {
  const admin = await getCurrentAdmin();
  if (!admin) redirect("/admin/login");

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-navy-900">Account</h1>
        <p className="mt-1 text-sm text-navy-900/55">Manage your own login credentials.</p>
      </div>

      <AccountForm email={admin.email} />
    </div>
  );
}
