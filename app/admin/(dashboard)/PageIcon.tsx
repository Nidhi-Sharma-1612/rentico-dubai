import type { LucideIcon } from "lucide-react";

export default function PageIcon({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
      <Icon className="h-5 w-5" />
    </span>
  );
}
