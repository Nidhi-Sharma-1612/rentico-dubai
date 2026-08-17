import type { Metadata } from "next";
import Logo from "@/components/layout/Logo";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Admin Login | Rentico Dubai",
};

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-full items-center justify-center bg-navy-50/40 px-4 py-16">
      <div className="w-full max-w-sm rounded-2xl border border-navy-900/8 bg-white p-8 shadow-sm">
        <div className="flex flex-col items-center gap-2 text-center">
          <Logo />
          <h1 className="mt-2 text-lg font-bold text-navy-900">Admin Panel</h1>
          <p className="text-sm text-navy-900/55">Manage your site&apos;s content, properties, and settings.</p>
        </div>

        <div className="mt-8">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
