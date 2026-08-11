import type { Metadata } from "next";
import PageHero from "@/components/shared/PageHero";
import Container from "@/components/shared/Container";
import ArticleBody from "@/components/insights/ArticleBody";
import ArticleTOC from "@/components/insights/ArticleTOC";
import ReadingProgress from "@/components/insights/ReadingProgress";
import CTABanner from "@/components/shared/CTABanner";
import { ArticleBlock } from "@/lib/types";

export const metadata: Metadata = {
  title: "Terms & Conditions | Rentico Dubai",
  description:
    "The terms governing your use of renticodubai.com and Rentico's short-term rental booking and property management services.",
};

const lastUpdated = "10 August 2026";

const content: ArticleBlock[] = [
  {
    type: "paragraph",
    text: "These Terms & Conditions (“Terms”) govern your use of renticodubai.com and the short-term rental booking and property management services provided by Rentico Vacation Homes Rental L.L.C. (“Rentico”, “we”, “us”, “our”). By accessing this website or booking a stay with us, you agree to be bound by these Terms.",
  },
  { type: "heading", text: "1. Acceptance of Terms" },
  {
    type: "paragraph",
    text: "By using this website, making a booking, or submitting a partner enquiry, you confirm that you accept these Terms and agree to comply with them. If you do not agree, please do not use our website or services.",
  },
  { type: "heading", text: "2. Use of This Website" },
  {
    type: "paragraph",
    text: "You agree to use renticodubai.com only for lawful purposes. You may not misuse the website by knowingly introducing malicious content, attempting unauthorised access to our systems, or scraping or copying content without our permission.",
  },
  { type: "heading", text: "3. Booking & Reservations" },
  {
    type: "paragraph",
    text: "All bookings are subject to availability and confirmation by our team. You must be at least 18 years old to make a booking, and you are responsible for providing accurate guest and payment information. A booking is only confirmed once you receive written confirmation from Rentico.",
  },
  { type: "heading", text: "4. Pricing & Payment" },
  {
    type: "paragraph",
    text: "All prices are listed in AED unless otherwise stated and may include a cleaning fee, security deposit or Tourism Dirham fee where applicable. Payment is processed securely through our payment partners at the time of booking, unless a different arrangement is confirmed in writing.",
  },
  { type: "heading", text: "5. Cancellations & Refunds" },
  {
    type: "paragraph",
    text: "Cancellation and refund terms vary by property and rate plan and will be clearly shown before you confirm a booking. Where no specific policy is shown, cancellations made in good time before check-in are generally eligible for a full or partial refund at our discretion; late cancellations and no-shows may not be refundable.",
  },
  { type: "heading", text: "6. Guest Responsibilities" },
  {
    type: "paragraph",
    text: "Guests are expected to treat every property with care and to follow the house rules provided at check-in, which typically include:",
  },
  { type: "list", items: [
    "No smoking inside the property",
    "No parties or events",
    "Respecting quiet hours and neighbours",
    "Reporting any damage or issues to our team promptly",
  ] },
  {
    type: "paragraph",
    text: "Guests are liable for any damage caused to a property beyond normal wear and tear during their stay.",
  },
  { type: "heading", text: "7. Property Owner & Partner Terms" },
  {
    type: "paragraph",
    text: "Property owners partnering with Rentico for management services are governed by a separate management agreement covering our transparent management fee, reporting, licensing and operational responsibilities. These website Terms apply in addition to, and do not replace, that agreement.",
  },
  { type: "heading", text: "8. Intellectual Property" },
  {
    type: "paragraph",
    text: "All content on this website, including text, photography, logos and design, is owned by or licensed to Rentico and may not be reproduced or used without our prior written consent.",
  },
  { type: "heading", text: "9. Limitation of Liability" },
  {
    type: "paragraph",
    text: "Rentico is not liable for any indirect, incidental or consequential loss arising from your use of this website or our services, except where such liability cannot be excluded under applicable law. Our total liability for any claim is limited to the amount paid for the relevant booking.",
  },
  { type: "heading", text: "10. Governing Law" },
  {
    type: "paragraph",
    text: "These Terms are governed by the laws of the Emirate of Dubai and the United Arab Emirates. Any disputes arising from these Terms will be subject to the exclusive jurisdiction of the Dubai courts.",
  },
  { type: "heading", text: "11. Changes to These Terms" },
  {
    type: "paragraph",
    text: "We may update these Terms from time to time to reflect changes in our services or for legal and regulatory reasons. The “Last updated” date at the top of this page will always reflect the most recent revision.",
  },
  { type: "heading", text: "12. Contact Us" },
  {
    type: "paragraph",
    text: "If you have any questions about these Terms, contact us at info@renticodubai.com or +971-52 146 0222.",
  },
];

export default function TermsConditionsPage() {
  return (
    <>
      <ReadingProgress />
      <PageHero
        eyebrow="Legal"
        title="Terms & Conditions"
        description="The terms governing your use of this website and our services."
      />

      <section className="py-12 sm:py-16">
        <Container>
          <div className="mx-auto flex max-w-6xl justify-center gap-12">
            <ArticleTOC content={content} />
            <div className="min-w-0 max-w-3xl flex-1">
              <p className="mb-8 text-sm text-navy-900/45">Last updated: {lastUpdated}</p>
              <ArticleBody content={content} />
            </div>
          </div>
        </Container>
      </section>

      <CTABanner
        title="Have a question about these terms?"
        description="Reach out to our team any time — we're happy to help."
        primaryLabel="Contact Us"
        primaryHref="/contact"
      />
    </>
  );
}
