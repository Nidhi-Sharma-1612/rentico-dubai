import { Check } from "lucide-react";
import { amenityIconMap } from "@/components/property/amenityIcons";

export default function PropertyAmenities({ amenities }: { amenities: string[] }) {
  return (
    <div className="border-b border-navy-900/8 py-8">
      <h2 className="mb-5 text-xl font-bold text-navy-900">Amenities</h2>
      <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
        {amenities.map((amenity) => {
          const Icon = amenityIconMap[amenity] ?? Check;
          return (
            <span key={amenity} className="flex items-center gap-3 text-sm text-navy-900/75">
              <Icon className="h-4.5 w-4.5 shrink-0 text-orange-500" />
              {amenity}
            </span>
          );
        })}
      </div>
    </div>
  );
}
