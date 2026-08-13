import { GuestyBEListing } from "@/lib/guesty/bookingApi";
import { Property } from "@/lib/types";
import { slugify } from "@/lib/utils";

/** Guesty reviews are on a 10-point scale; the UI displays 5-star ratings. */
function toFiveStarRating(avg: number | undefined): number {
  if (!avg) return 0;
  return Math.round((avg / 2) * 10) / 10;
}

function formatHouseRules(listing: GuestyBEListing): string[] {
  const rules = listing.unitTypeHouseRules?.houseRules;
  if (!rules) return [];

  const result: string[] = [];

  if (rules.petsAllowed?.enabled !== undefined) {
    result.push(rules.petsAllowed.enabled ? "Pets allowed on request" : "No pets allowed");
  }
  if (rules.smokingAllowed?.enabled !== undefined) {
    result.push(rules.smokingAllowed.enabled ? "Smoking allowed" : "No smoking inside the property");
  }
  if (rules.suitableForEvents?.enabled !== undefined) {
    result.push(rules.suitableForEvents.enabled ? "Events allowed on request" : "No parties or events");
  }
  if (rules.childrenRules?.suitableForChildren !== undefined) {
    result.push(
      rules.childrenRules.suitableForChildren ? "Children of all ages welcome" : "Not suitable for children"
    );
  }
  if (rules.childrenRules?.suitableForInfants !== undefined) {
    result.push(rules.childrenRules.suitableForInfants ? "Suitable for infants" : "Not suitable for infants");
  }
  if (rules.additionalRules) {
    result.push(rules.additionalRules);
  }

  return result;
}

export function mapListingToProperty(listing: GuestyBEListing): Property {
  const images = (listing.pictures ?? [])
    .map((p) => p.regular ?? p.original ?? "")
    .filter(Boolean);

  return {
    id: listing._id,
    slug: slugify(listing.title),
    name: listing.title,
    area: listing.address?.neighborhood ?? listing.address?.city ?? "Dubai",
    address: listing.address?.full ?? "",
    lat: listing.address?.lat,
    lng: listing.address?.lng,
    pricePerNight: listing.prices?.basePrice ?? 0,
    currency: listing.prices?.currency ?? "AED",
    bedrooms: listing.bedrooms ?? 1,
    bathrooms: listing.bathrooms ?? 1,
    maxGuests: listing.accommodates ?? 1,
    rating: toFiveStarRating(listing.reviews?.avg),
    reviewCount: listing.reviews?.total ?? 0,
    image: listing.picture?.regular ?? listing.picture?.original ?? images[0] ?? "",
    images: images.length ? images : listing.picture ? [listing.picture.regular ?? listing.picture.original ?? ""] : [],
    description: listing.publicDescription?.summary ?? "",
    theSpace: listing.publicDescription?.space ?? "",
    amenities: listing.amenities ?? [],
    houseRules: formatHouseRules(listing),
  };
}

/** Parses Guesty's YYYY-MM-DD-keyed availability maps into Date sets for the calendar UI. */
export function mapAvailability(
  allotment: Record<string, number> | undefined
): { unavailableDates: Set<string> } {
  const unavailableDates = new Set<string>();
  if (!allotment) return { unavailableDates };

  for (const [date, value] of Object.entries(allotment)) {
    if (value < 1) unavailableDates.add(date);
  }
  return { unavailableDates };
}
