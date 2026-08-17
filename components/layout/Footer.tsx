import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import Logo from "@/components/layout/Logo";
import { SOCIAL_ICONS } from "@/lib/data/social";
import Container from "@/components/shared/Container";
import { SiteSettings } from "@/lib/types";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Manage my property", href: "/manage-my-property" },
  { label: "About Us", href: "/about-us" },
  { label: "Become a Partner", href: "/become-a-partner" },
  { label: "Insights", href: "/insights" },
  { label: "Experience", href: "/experience" },
  { label: "Contact", href: "/contact" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms-conditions" },
];

export default function Footer({ settings }: { settings: SiteSettings }) {
  return (
    <footer className="bg-navy-950 text-white">
      <Container className="grid grid-cols-1 gap-12 py-16 lg:grid-cols-4 lg:py-20">
        <div className="flex flex-col gap-4 lg:col-span-2">
          <div className="w-fit rounded-xl bg-white px-4 py-3">
            <Logo src={settings.logoUrl} />
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-white/60">{settings.footerTagline}</p>
          <div className="flex gap-3 pt-2">
            {settings.socialLinks.map((s) => {
              const Icon = SOCIAL_ICONS[s.label];
              if (!Icon) return null;
              return (
                <Link
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/80 transition-colors hover:bg-orange-500 hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                </Link>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-white/50">
            Quick Links
          </h4>
          <ul className="flex flex-col gap-3">
            {quickLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-sm text-white/70 hover:text-orange-400">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-white/50">
            Contact
          </h4>
          <ul className="flex flex-col gap-3 text-sm text-white/70">
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-orange-400" />
              {settings.address}
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="h-4 w-4 shrink-0 text-orange-400" />
              <a href={`tel:+${settings.whatsapp}`} className="hover:text-orange-400">
                {settings.phone}
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="h-4 w-4 shrink-0 text-orange-400" />
              <a href={`mailto:${settings.email}`} className="hover:text-orange-400">
                {settings.email}
              </a>
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col items-center justify-between gap-4 py-6 sm:flex-row">
          <p className="text-xs text-white/50">
            © {new Date().getFullYear()} Rentico Vacation Homes Rental L.L.C. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-xs text-white/50">
            <span>Design and developed by</span>
            <Image src="/logo.png" alt="Design by Dial" width={90} height={21} className="h-4 w-auto" />
          </div>
          <div className="flex gap-6">
            {legalLinks.map((l) => (
              <Link key={l.href} href={l.href} className="text-xs text-white/50 hover:text-white/80">
                {l.label}
              </Link>
            ))}
          </div>
        </Container>
      </div>
    </footer>
  );
}
