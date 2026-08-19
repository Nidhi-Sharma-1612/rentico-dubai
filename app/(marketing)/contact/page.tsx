import type { Metadata } from "next";
import Link from "next/link";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import PageHero from "@/components/shared/PageHero";
import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import ContactForm from "@/components/shared/ContactForm";
import { SOCIAL_ICONS } from "@/lib/data/social";
import { getSiteSettings } from "@/lib/data/siteSettings";
import { getContactSections, getPageSeo } from "@/lib/data/pageSections";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSeo("contact", {
    metaTitle: "Contact Us | Rentico Dubai",
    metaDescription:
      "Get in touch with Rentico Dubai — questions about booking a stay, listing your property, or anything else. We typically respond within 24 hours.",
  });
  return { title: seo.metaTitle, description: seo.metaDescription };
}

// This page reads admin-editable site settings from the DB — without this,
// Next would statically bake it at build time and admin edits would never
// show up without a redeploy.
export const revalidate = 60;

export default async function ContactPage() {
  const settings = await getSiteSettings();
  const { hero, details: detailsHeading } = await getContactSections();

  const details = [
    { icon: MapPin, label: settings.address },
    { icon: Phone, label: settings.phone, href: `tel:+${settings.whatsapp}` },
    { icon: Mail, label: settings.email, href: `mailto:${settings.email}` },
    { icon: Clock, label: settings.responseTimeNote },
  ];

  return (
    <>
      <PageHero eyebrow={hero.eyebrow} title={hero.title} description={hero.description} />

      <section className="py-20 sm:py-28">
        <Container className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col gap-8">
            <SectionHeading
              eyebrow={detailsHeading.eyebrow}
              title={detailsHeading.title}
              description={detailsHeading.description}
            />

            <ul className="flex flex-col gap-4">
              {details.map((d) => (
                <li key={d.label} className="flex items-center gap-3.5 text-sm text-navy-900/75">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
                    <d.icon className="h-4.5 w-4.5" />
                  </span>
                  {d.href ? (
                    <a href={d.href} className="font-semibold hover:text-orange-600">
                      {d.label}
                    </a>
                  ) : (
                    d.label
                  )}
                </li>
              ))}
            </ul>

            <div className="flex gap-3 border-t border-navy-900/8 pt-6">
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
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-navy-50 text-navy-900/70 transition-colors hover:bg-orange-500 hover:text-white"
                  >
                    <Icon className="h-4.5 w-4.5" />
                  </Link>
                );
              })}
            </div>
          </div>

          <ContactForm showPropertyType={false} />
        </Container>
      </section>
    </>
  );
}
