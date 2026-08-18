"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Newspaper, HelpCircle, Quote, FileStack, Settings, UserCog } from "lucide-react";

const navItems = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/articles", label: "Articles", icon: Newspaper },
  { href: "/admin/faqs", label: "FAQs", icon: HelpCircle },
  { href: "/admin/testimonials", label: "Testimonials", icon: Quote },
  { href: "/admin/pages", label: "Pages", icon: FileStack },
  { href: "/admin/settings", label: "Settings", icon: Settings },
  { href: "/admin/account", label: "Account", icon: UserCog },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1">
      {navItems.map((item) => {
        const active = item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
              active ? "bg-orange-50 text-orange-600" : "text-navy-900/60 hover:bg-navy-900/5 hover:text-navy-900"
            }`}
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
