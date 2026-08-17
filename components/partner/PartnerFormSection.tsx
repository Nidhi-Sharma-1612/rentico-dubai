"use client";

import { motion } from "framer-motion";
import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import ReferralForm from "@/components/partner/ReferralForm";
import FAQAccordion from "@/components/shared/FAQAccordion";
import { FAQ as FAQType } from "@/lib/types";

export default function PartnerFormSection({ faqs, whatsapp }: { faqs: FAQType[]; whatsapp: string }) {
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
          <SectionHeading
            eyebrow="Register a Referral"
            title="Send it over"
            description="Two minutes. Registering protects your referral for 90 days, even if the owner takes their time."
          />
          <ReferralForm whatsapp={whatsapp} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col gap-6"
        >
          <SectionHeading eyebrow="Partner FAQ" title="Before you send us anything" />
          <FAQAccordion faqs={faqs} />
        </motion.div>
      </Container>
    </section>
  );
}
