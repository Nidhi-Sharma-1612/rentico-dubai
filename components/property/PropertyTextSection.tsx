export default function PropertyTextSection({
  title,
  children,
}: {
  title: string;
  children: string;
}) {
  return (
    <div className="border-b border-navy-900/8 py-8">
      <h2 className="mb-3 text-xl font-bold text-navy-900">{title}</h2>
      <p className="text-sm leading-relaxed text-navy-900/70 sm:text-base">{children}</p>
    </div>
  );
}
