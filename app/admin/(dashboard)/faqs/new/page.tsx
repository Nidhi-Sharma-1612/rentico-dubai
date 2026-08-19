import BackLink from "../../BackLink";
import FaqForm from "../FaqForm";

export default function NewFaqPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <BackLink href="/admin/faqs" label="All FAQs" />
        <h1 className="mt-2 text-2xl font-bold text-navy-900">New FAQ</h1>
      </div>
      <FaqForm />
    </div>
  );
}
