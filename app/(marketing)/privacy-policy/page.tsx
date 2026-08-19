import type { Metadata } from "next";
import PageHero from "@/components/shared/PageHero";
import Container from "@/components/shared/Container";
import ArticleBody from "@/components/insights/ArticleBody";
import ArticleTOC from "@/components/insights/ArticleTOC";
import ReadingProgress from "@/components/insights/ReadingProgress";
import CTABanner from "@/components/shared/CTABanner";
import { ArticleBlock } from "@/lib/types";
import { getLegalPageContent, getPageSeo, LegalPageContent } from "@/lib/data/pageSections";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSeo("privacy-policy", {
    metaTitle: "Privacy Policy | Rentico Dubai",
    metaDescription:
      "How Rentico Vacation Homes Rental L.L.C. collects, uses and protects your personal information.",
  });
  return { title: seo.metaTitle, description: seo.metaDescription };
}

// Reads admin-editable content from the DB — without this, Next would
// statically bake this page at build time and admin edits would never show
// up without a redeploy.
export const revalidate = 60;

const DEFAULT_BLOCKS: ArticleBlock[] = [
  {
    type: "paragraph",
    text: "This Privacy Policy explains how Rentico Vacation Homes Rental L.L.C. (“Rentico”, “we”, “us”, “our”) collects, uses and protects your personal information when you visit renticodubai.com, book a stay with us, or enquire about listing your property for management. By using our website or services, you agree to the practices described in this policy.",
  },
  { type: "heading", text: "1. Information We Collect" },
  {
    type: "paragraph",
    text: "We collect information that you provide directly to us, as well as information collected automatically when you use our website.",
  },
  { type: "list", items: [
    "Name, email address and phone number",
    "Booking details such as check-in/check-out dates and guest count",
    "Payment information, processed securely by our payment partners",
    "Property details submitted through our partner enquiry form",
    "Any messages you send to our team",
    "IP address, browser type, device information and pages visited on our website",
  ] },
  { type: "heading", text: "2. How We Use Your Information" },
  { type: "list", items: [
    "To process bookings and manage your stay",
    "To communicate with you about your reservation or partnership enquiry",
    "To provide customer support before, during and after your stay",
    "To improve our website, services and guest experience",
    "To comply with legal and regulatory requirements, including Dubai holiday-home guest registration",
    "To send booking confirmations, receipts and service updates",
  ] },
  { type: "heading", text: "3. Cookies & Tracking Technologies" },
  {
    type: "paragraph",
    text: "We use cookies and similar technologies to keep our website functioning correctly, remember your preferences, and understand how visitors use renticodubai.com. Essential cookies are required for core site functionality such as the booking widget; analytics cookies help us improve the site and are optional. You can control or disable cookies through your browser settings, though some parts of the site may not function as intended if you do.",
  },
  { type: "heading", text: "4. How We Share Information" },
  {
    type: "paragraph",
    text: "We do not sell your personal information. We only share it where necessary to deliver our services:",
  },
  { type: "list", items: [
    "With payment processors to complete transactions securely",
    "With our property management and booking software providers to coordinate your stay",
    "With government authorities where required for guest registration or legal compliance",
    "With service providers who support our operations, such as cleaning and maintenance teams, on a need-to-know basis",
  ] },
  { type: "heading", text: "5. Data Retention" },
  {
    type: "paragraph",
    text: "We retain personal information for as long as necessary to fulfil the purposes described in this policy, including any legal, accounting or guest-registration record-keeping requirements under applicable UAE law.",
  },
  { type: "heading", text: "6. Your Rights" },
  { type: "list", items: [
    "Access the personal information we hold about you",
    "Request correction of inaccurate or incomplete information",
    "Request deletion of your information, subject to legal retention requirements",
    "Opt out of marketing communications at any time",
  ] },
  {
    type: "paragraph",
    text: "To exercise any of these rights, contact us at info@renticodubai.com and we will respond as soon as reasonably possible.",
  },
  { type: "heading", text: "7. Data Security" },
  {
    type: "paragraph",
    text: "We apply reasonable technical and organisational measures to protect your personal information against unauthorised access, loss or misuse. No method of transmission or storage is completely secure, but we work to protect your data at every step of your booking or enquiry.",
  },
  { type: "heading", text: "8. Third-Party Links" },
  {
    type: "paragraph",
    text: "Our website may link to third-party sites, such as booking channels or payment gateways, that are not operated by Rentico. We are not responsible for the privacy practices of these third parties and encourage you to review their own policies.",
  },
  { type: "heading", text: "9. Children's Privacy" },
  {
    type: "paragraph",
    text: "Our website and services are not directed at individuals under the age of 18, and we do not knowingly collect personal information from children.",
  },
  { type: "heading", text: "10. Changes to This Policy" },
  {
    type: "paragraph",
    text: "We may update this Privacy Policy from time to time to reflect changes in our practices or for legal and regulatory reasons. The “Last updated” date at the top of this page will always reflect the most recent revision.",
  },
  { type: "heading", text: "11. Contact Us" },
  {
    type: "paragraph",
    text: "If you have any questions about this Privacy Policy or how we handle your information, contact us at info@renticodubai.com or +971-52 146 0222.",
  },
];

const DEFAULT_CONTENT: LegalPageContent = {
  heroEyebrow: "Legal",
  heroTitle: "Privacy Policy",
  heroDescription: "How we collect, use and protect your personal information.",
  lastUpdated: "10 August 2026",
  blocks: DEFAULT_BLOCKS,
  ctaHeading: "Questions about your data?",
  ctaDescription: "Reach out to our team any time — we're happy to walk you through how your information is handled.",
  ctaButtonLabel: "Contact Us",
  ctaButtonHref: "/contact",
};

export default async function PrivacyPolicyPage() {
  const { heroEyebrow, heroTitle, heroDescription, lastUpdated, blocks, ctaHeading, ctaDescription, ctaButtonLabel, ctaButtonHref } =
    await getLegalPageContent("privacy-policy", DEFAULT_CONTENT);

  return (
    <>
      <ReadingProgress />
      <PageHero eyebrow={heroEyebrow} title={heroTitle} description={heroDescription} />

      <section className="py-12 sm:py-16">
        <Container>
          <div className="mx-auto flex max-w-6xl justify-center gap-12">
            <ArticleTOC content={blocks} />
            <div className="min-w-0 max-w-3xl flex-1">
              <p className="mb-8 text-sm text-navy-900/45">Last updated: {lastUpdated}</p>
              <ArticleBody content={blocks} />
            </div>
          </div>
        </Container>
      </section>

      <CTABanner title={ctaHeading} description={ctaDescription} primaryLabel={ctaButtonLabel} primaryHref={ctaButtonHref} />
    </>
  );
}
