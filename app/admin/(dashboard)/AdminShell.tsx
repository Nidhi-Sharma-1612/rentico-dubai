"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Logo from "@/components/layout/Logo";
import AdminSidebar from "./AdminSidebar";
import SignOutButton from "./SignOutButton";

function SidebarContent({ email, onNavigate }: { email: string; onNavigate?: () => void }) {
  return (
    <>
      <div className="flex-1" onClick={onNavigate}>
        <AdminSidebar />
      </div>
      <div className="mt-6 border-t border-navy-900/8 pt-4">
        <p className="truncate px-3 text-xs text-navy-900/40">{email}</p>
        <SignOutButton />
      </div>
    </>
  );
}

export default function AdminShell({ email, children }: { email: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      <header className="flex items-center justify-between border-b border-navy-900/8 bg-white px-4 py-3 lg:hidden">
        <Logo />
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          className="flex h-10 w-10 items-center justify-center rounded-lg text-navy-900 transition-colors hover:bg-navy-900/5"
        >
          <Menu className="h-6 w-6" />
        </button>
      </header>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-navy-950/40 lg:hidden"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="fixed inset-y-0 left-0 z-50 flex w-72 max-w-[85vw] flex-col bg-white p-5 shadow-xl lg:hidden"
            >
              <div className="flex items-center justify-between px-2 pb-6">
                <Logo />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-navy-900 transition-colors hover:bg-navy-900/5"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <SidebarContent email={email} onNavigate={() => setOpen(false)} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <aside className="hidden w-64 shrink-0 flex-col border-r border-navy-900/8 bg-white p-5 lg:flex">
        <div className="px-2 pb-6">
          <Logo />
        </div>
        <SidebarContent email={email} />
      </aside>

      <main className="flex-1 bg-navy-50/30 p-4 sm:p-6 lg:p-8">{children}</main>
    </div>
  );
}
