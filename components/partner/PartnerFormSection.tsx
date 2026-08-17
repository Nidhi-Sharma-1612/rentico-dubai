"use client";

import { motion } from "framer-motion";
import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import ContactForm from "@/components/shared/ContactForm";
import FAQAccordion from "@/components/shared/FAQAccordion";
import { FAQ as FAQType } from "@/lib/types";

export default function PartnerFormSection({ faqs }: { faqs: FAQType[] }) {
  return (
    <section className="py-20 sm:py-28">
      <Container className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-6"
        >
          <SectionHeading
            eyebrow="Speak to the Team"
            title="Your next level stay starts here"
            description="Share a few details and the Rentico team will follow up with a tailored revenue estimate."
          />
          <ContactForm />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col gap-6"
        >
          <SectionHeading eyebrow="FAQ" title="Common questions from owners" />
          <FAQAccordion faqs={faqs} />
        </motion.div>
      </Container>
    </section>
  );
}
