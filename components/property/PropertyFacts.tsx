import { Bath, BedDouble, Users } from "lucide-react";
import { Property } from "@/lib/types";

export default function PropertyFacts({ property }: { property: Property }) {
  const facts = [
    { icon: Users, label: `${property.maxGuests} Guests` },
    { icon: BedDouble, label: `${property.bedrooms} Bedroom${property.bedrooms > 1 ? "s" : ""}` },
    { icon: Bath, label: `${property.bathrooms} Bathroom${property.bathrooms > 1 ? "s" : ""}` },
  ];

  return (
    <div className="flex flex-wrap items-center gap-x-8 gap-y-3 border-b border-navy-900/8 pb-8">
      {facts.map((fact) => (
        <span key={fact.label} className="flex items-center gap-2.5 text-navy-900">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-50 text-orange-600">
            <fact.icon className="h-4.5 w-4.5" />
          </span>
          <span className="text-sm font-semibold">{fact.label}</span>
        </span>
      ))}
    </div>
  );
}
