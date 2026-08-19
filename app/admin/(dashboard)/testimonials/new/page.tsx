import BackLink from "../../BackLink";
import TestimonialForm from "../TestimonialForm";

export default function NewTestimonialPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <BackLink href="/admin/testimonials" label="All testimonials" />
        <h1 className="mt-2 text-2xl font-bold text-navy-900">New Testimonial</h1>
      </div>
      <TestimonialForm />
    </div>
  );
}
