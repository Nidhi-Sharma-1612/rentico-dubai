import Image from "next/image";
import Link from "next/link";
import { Bath, BedDouble, Star, Users } from "lucide-react";
import { Property } from "@/lib/types";
import Badge from "@/components/shared/Badge";

export default function PropertyCard({
  property,
  searchQuery,
}: {
  property: Property;
  /** Optional dates/guests query string to carry forward into the detail page. */
  searchQuery?: string;
}) {
  const href = searchQuery
    ? `/properties/${property.slug}?${searchQuery}`
    : `/properties/${property.slug}`;

  return (
    <Link
      href={href}
      className="group flex flex-col overflow-hidden rounded-2xl border border-navy-900/8 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative h-64 w-full overflow-hidden">
        <Image
          src={property.image}
          alt={property.name}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {property.badge && (
          <div className="absolute left-4 top-4">
            <Badge tone="white">{property.badge}</Badge>
          </div>
        )}
        <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-xs font-semibold text-navy-900 shadow-sm">
          <Star className="h-3.5 w-3.5 fill-orange-500 text-orange-500" />
          {property.rating}
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5">
        <div>
          <h3 className="text-lg font-bold text-navy-900">{property.name}</h3>
          <p className="text-sm text-navy-900/55">{property.area}</p>
        </div>

        <div className="flex items-center gap-4 text-sm text-navy-900/70">
          <span className="flex items-center gap-1.5">
            <BedDouble className="h-4 w-4 text-orange-500" />
            {property.bedrooms} bed
          </span>
          <span className="flex items-center gap-1.5">
            <Bath className="h-4 w-4 text-orange-500" />
            {property.bathrooms} bath
          </span>
          <span className="flex items-center gap-1.5">
            <Users className="h-4 w-4 text-orange-500" />
            {property.maxGuests} guests
          </span>
        </div>

        <div className="mt-auto flex items-center justify-between border-t border-navy-900/8 pt-4">
          <p className="text-navy-900">
            <span className="text-lg font-bold">
              {property.currency} {property.pricePerNight}
            </span>
            <span className="text-sm text-navy-900/50"> / night</span>
          </p>
          <span className="text-sm font-semibold text-orange-600 transition-transform group-hover:translate-x-0.5">
            View stay →
          </span>
        </div>
      </div>
    </Link>
  );
}
