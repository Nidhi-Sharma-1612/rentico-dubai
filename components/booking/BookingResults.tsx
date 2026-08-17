"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import PropertyCard from "@/components/shared/PropertyCard";
import { Property } from "@/lib/types";

const PropertiesMap = dynamic(() => import("./PropertiesMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-navy-50 text-sm text-navy-900/40">
      Loading map…
    </div>
  ),
});

export default function BookingResults({
  properties,
  searchQuery,
  totals,
}: {
  properties: Property[];
  searchQuery?: string;
  totals: Record<string, { amount: number; nights: number; discount?: { amount: number; percent: number } }>;
}) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-start lg:gap-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {properties.map((property) => (
          <div
            key={property.id}
            onMouseEnter={() => setHoveredId(property.id)}
            onMouseLeave={() => setHoveredId(null)}
            className={`rounded-2xl transition-shadow duration-200 ${
              hoveredId === property.id ? "ring-2 ring-orange-400" : ""
            }`}
          >
            <PropertyCard property={property} searchQuery={searchQuery} totalForStay={totals[property.id]} />
          </div>
        ))}
      </div>

      <div className="h-96 overflow-hidden rounded-3xl border border-navy-900/8 lg:sticky lg:top-28 lg:h-[calc(100vh-9rem)]">
        <PropertiesMap properties={properties} hoveredId={hoveredId} onPinHover={setHoveredId} />
      </div>
    </div>
  );
}
