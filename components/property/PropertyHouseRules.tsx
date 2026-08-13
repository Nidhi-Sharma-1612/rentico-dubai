import { CircleCheck } from "lucide-react";

export default function PropertyHouseRules({ rules }: { rules: string[] }) {
  if (rules.length === 0) return null;

  return (
    <div className="border-b border-navy-900/8 py-8">
      <h2 className="mb-5 text-xl font-bold text-navy-900">House Rules</h2>
      <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
        {rules.map((rule) => (
          <span key={rule} className="flex items-center gap-3 text-sm text-navy-900/75">
            <CircleCheck className="h-4.5 w-4.5 shrink-0 text-orange-500" />
            {rule}
          </span>
        ))}
      </div>
    </div>
  );
}
