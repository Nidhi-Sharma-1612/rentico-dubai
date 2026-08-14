"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { amenityIconMap } from "@/components/property/amenityIcons";

const INITIAL_COUNT = 9;

export default function PropertyAmenities({ amenities }: { amenities: string[] }) {
  const [expanded, setExpanded] = useState(false);
  if (amenities.length === 0) return null;

  const hasMore = amenities.length > INITIAL_COUNT;
  const visible = expanded ? amenities : amenities.slice(0, INITIAL_COUNT);

  return (
    <div className="border-b border-navy-900/8 py-8">
      <h2 className="mb-5 text-xl font-bold text-navy-900">Amenities</h2>
      <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((amenity) => {
          const Icon = amenityIconMap[amenity] ?? Check;
          return (
            <span key={amenity} className="flex items-center gap-3 text-sm text-navy-900/75">
              <Icon className="h-4.5 w-4.5 shrink-0 text-orange-500" />
              {amenity}
            </span>
          );
        })}
      </div>
      {hasMore && (
        <button
          type="button"
          onClick={() => setExpanded((e) => !e)}
          className="mt-5 text-sm font-semibold text-orange-600 hover:underline"
        >
          {expanded ? "Show less" : `Show all ${amenities.length} amenities`}
        </button>
      )}
    </div>
  );
}
