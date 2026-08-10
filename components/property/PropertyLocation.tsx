import { MapPin } from "lucide-react";

export default function PropertyLocation({ address }: { address: string }) {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

  return (
    <div className="py-8">
      <h2 className="mb-5 text-xl font-bold text-navy-900">Location</h2>
      <div className="flex flex-col gap-3">
        <span className="flex items-start gap-3 text-sm text-navy-900/75">
          <MapPin className="mt-0.5 h-4.5 w-4.5 shrink-0 text-orange-500" />
          {address}
        </span>
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
