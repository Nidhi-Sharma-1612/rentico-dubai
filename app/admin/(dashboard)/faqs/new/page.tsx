import FaqForm from "../FaqForm";

export default function NewFaqPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-navy-900">New FAQ</h1>
      <FaqForm />
    </div>
  );
}
