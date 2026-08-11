"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarCheck, Menu, User, X } from "lucide-react";
import Logo from "@/components/layout/Logo";
import Button from "@/components/shared/Button";
import { navLinks } from "@/lib/data/nav";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [lastPathname, setLastPathname] = useState(pathname);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setMobileOpen(false);
  }

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  const linkClass = (active: boolean) =>
    `text-sm font-semibold transition-colors ${
      active ? "text-orange-600" : "text-navy-900/75 hover:text-navy-900"
    }`;

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
        scrolled
          ? "border-navy-900/8 bg-white/95 backdrop-blur-md shadow-sm"
          : "border-transparent bg-white"
      }`}
    >
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
        <Logo />

        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className={linkClass(isActive(link.href))}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Button href="/owner-login" variant="ghost" size="md" icon={<User className="h-4 w-4" />}>
            Owner Login
          </Button>
          <Button href="/book-your-stay" variant="primary" size="md" icon={<CalendarCheck className="h-4 w-4" />}>
            Book Your Stay
          </Button>
        </div>

        <button
          className="flex h-10 w-10 items-center justify-center rounded-lg text-navy-900 lg:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-navy-900/8 bg-white lg:hidden"
          >
            <div className="flex flex-col gap-1 px-5 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-lg px-3 py-2.5 text-sm font-semibold text-navy-900"
                >
                  {link.label}
                </Link>
              ))}

              <div className="mt-3 flex flex-col gap-2 border-t border-navy-900/8 pt-4">
                <Button href="/owner-login" variant="outline" className="w-full justify-center">
                  Owner Login
                </Button>
                <Button href="/book-your-stay" variant="primary" className="w-full justify-center">
                  Book Your Stay
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
