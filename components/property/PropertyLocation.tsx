"use client";

import dynamic from "next/dynamic";
import { MapPin } from "lucide-react";

const PropertyMap = dynamic(() => import("./PropertyMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-navy-50 text-sm text-navy-900/40">
      Loading map…
    </div>
  ),
});

interface PropertyLocationProps {
  address: string;
  lat?: number;
  lng?: number;
}

export default function PropertyLocation({ address, lat, lng }: PropertyLocationProps) {
  const hasCoords = typeof lat === "number" && typeof lng === "number";
  // Prefer exact coordinates when we have them — Guesty's address text is
  // often vague (just "Dubai, United Arab Emirates" for some listings), which
  // makes a text-based Google Maps search land on the generic city center
  // instead of the actual property. Google Maps has no supported way to
  // attach a custom label to an arbitrary (non-registered-place) pin, so the
  // search box shows raw coordinates here rather than the property name —
  // that's a Google Maps limitation, not something fixable on our side.
  const mapsQuery = hasCoords ? `${lat},${lng}` : encodeURIComponent(address);
  const mapsUrl = `https://www.google.com/maps?q=${mapsQuery}`;
  const embedUrl = `https://www.google.com/maps?q=${mapsQuery}&output=embed`;

  return (
    <div className="py-8">
      <h2 className="mb-5 text-xl font-bold text-navy-900">Location</h2>
      <div className="flex flex-col gap-4">
        <span className="flex items-start gap-3 text-sm text-navy-900/75">
          <MapPin className="mt-0.5 h-4.5 w-4.5 shrink-0 text-orange-500" />
          {address}
        </span>

        <div className="relative isolate aspect-video w-full overflow-hidden rounded-2xl border border-navy-900/8">
          {hasCoords ? (
            <PropertyMap lat={lat} lng={lng} />
          ) : (
            <iframe
              src={embedUrl}
              title={`Map showing the location of ${address}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 h-full w-full"
            />
          )}
        </div>

        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-fit text-sm font-semibold text-orange-600 hover:underline"
        >
          View on Google Maps
        </a>
      </div>
    </div>
  );
}
