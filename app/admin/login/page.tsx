import type { Metadata } from "next";
import Logo from "@/components/layout/Logo";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Admin Login | Rentico Dubai",
};

export default function AdminLoginPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-navy-950 px-4 py-16">
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-orange-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-16 h-72 w-72 rounded-full bg-orange-500/10 blur-3xl" />

      <div className="relative w-full max-w-sm rounded-3xl border border-navy-900/8 bg-white p-8 shadow-2xl shadow-black/30 sm:p-10">
        <div className="flex flex-col items-center gap-2 text-center">
          <Logo />
          <h1 className="mt-3 text-xl font-bold text-navy-900">Admin Panel</h1>
          <p className="text-sm text-navy-900/55">Manage your site&apos;s content, properties, and settings.</p>
        </div>

        <div className="mt-8">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
