import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getSiteSettings } from "@/lib/data/siteSettings";
import { getGlobalSections } from "@/lib/data/pageSections";

export default async function MarketingLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings();
  const { navLinks, footerQuickLinks, footerLegalLinks } = await getGlobalSections();

  return (
    <div className="flex min-h-full flex-col">
      <Navbar logoUrl={settings.logoUrl} links={navLinks} />
      <main className="flex-1">{children}</main>
      <Footer settings={settings} quickLinks={footerQuickLinks} legalLinks={footerLegalLinks} />
    </div>
  );
}
