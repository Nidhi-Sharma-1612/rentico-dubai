"use client";

import { motion } from "framer-motion";
import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import ReferralForm from "@/components/partner/ReferralForm";
import FAQAccordion from "@/components/shared/FAQAccordion";
import { FAQ as FAQType } from "@/lib/types";

interface PartnerFormSectionContent {
  registerEyebrow: string;
  registerTitle: string;
  registerDescription: string;
  faqEyebrow: string;
  faqTitle: string;
}

export default function PartnerFormSection({
  faqs,
  whatsapp,
  registerEyebrow,
  registerTitle,
  registerDescription,
  faqEyebrow,
  faqTitle,
}: PartnerFormSectionContent & { faqs: FAQType[]; whatsapp: string }) {
  return (
    <section id="register" className="scroll-mt-24 py-20 sm:py-28">
      <Container className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-6"
        >
          <SectionHeading eyebrow={registerEyebrow} title={registerTitle} description={registerDescription} />
          <ReferralForm whatsapp={whatsapp} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col gap-6"
        >
          <SectionHeading eyebrow={faqEyebrow} title={faqTitle} />
          <FAQAccordion faqs={faqs} />
        </motion.div>
      </Container>
    </section>
  );
}
