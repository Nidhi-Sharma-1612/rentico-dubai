import TestimonialForm from "../TestimonialForm";

export default function NewTestimonialPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-navy-900">New Testimonial</h1>
      <TestimonialForm />
    </div>
  );
}
