import type { LucideIcon } from "lucide-react";

export default function EmptyState({ icon: Icon, label }: { icon: LucideIcon; label: string }) {
  return (
    <div className="flex flex-col items-center gap-2.5 rounded-xl border border-dashed border-navy-900/15 bg-white p-10 text-center">
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-navy-900/5 text-navy-900/30">
        <Icon className="h-5 w-5" />
      </span>
      <p className="text-sm text-navy-900/50">{label}</p>
    </div>
  );
}
