import { MapPin } from "lucide-react";

interface PropertyLocationProps {
  address: string;
}

export default function PropertyLocation({ address }: PropertyLocationProps) {
  const query = address;

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
  const embedUrl = `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;

  return (
    <div className="py-8">
      <h2 className="mb-5 text-xl font-bold text-navy-900">Location</h2>
      <div className="flex flex-col gap-4">
        <span className="flex items-start gap-3 text-sm text-navy-900/75">
          <MapPin className="mt-0.5 h-4.5 w-4.5 shrink-0 text-orange-500" />
          {address}
        </span>

        {query && (
          <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-navy-900/8">
            <iframe
              src={embedUrl}
              title={`Map showing the location of ${address}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 h-full w-full"
            />
          </div>
        )}

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
