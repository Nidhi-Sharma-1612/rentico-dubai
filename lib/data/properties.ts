import { Property } from "@/lib/types";

const img = (id: string) =>
  `https://images.unsplash.com/${id}?q=80&w=1600&auto=format&fit=crop`;

const commonAmenities = [
  "High-Speed WiFi",
  "Air Conditioning",
  "Fully Equipped Kitchen",
  "Smart TV",
  "Washer & Dryer",
  "Private Parking",
  "Swimming Pool Access",
  "Gym Access",
  "Balcony",
  "24/7 Security",
  "Elevator Access",
  "Self Check-In",
];

const commonHouseRules = [
  "No smoking inside the property",
  "No parties or events",
  "Pets allowed on request",
  "Children of all ages welcome",
  "Check-in after 3:00 PM",
  "Check-out before 11:00 AM",
];

export const properties: Property[] = [
  {
    id: "1",
    slug: "1br-azizi-riviera-sobha-hartland",
    name: "1BR Azizi Riviera",
    area: "Sobha Hartland, Dubai",
    address: "Azizi Riviera, Sobha Hartland, Mohammed Bin Rashid City, Dubai, UAE",
    pricePerNight: 365,
    currency: "AED",
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 4,
    rating: 4.9,
    reviewCount: 87,
    image: img("photo-1560448204-e02f11c3d0e2"),
    images: [
      img("photo-1560448204-e02f11c3d0e2"),
      img("photo-1556909212-d5b604d0c90d"),
      img("photo-1560185893-a55cbc8c57e8"),
      img("photo-1584622650111-993a426fbf0a"),
      img("photo-1554995207-c18c203602cb"),
      img("photo-1600566753086-00f18fb6b3ea"),
    ],
    badge: "Instant Book",
    description:
      "A bright, beautifully styled one-bedroom home on the Meydan side of Sobha Hartland, moments from the Ras Al Khor Wildlife Sanctuary and Downtown Dubai. Floor-to-ceiling windows fill the living space with natural light, and the building's canal-front promenade is a five-minute walk away — perfect for a relaxed morning coffee.",
    theSpace:
      "The open-plan living and dining area flows into a fully equipped kitchen with everything you need to cook a full meal. The bedroom features a plush queen bed, blackout curtains and built-in wardrobes, while the bathroom is finished with a rainfall shower and premium toiletries. A private balcony overlooks the community's landscaped gardens.",
    amenities: commonAmenities,
    houseRules: commonHouseRules,
  },
  {
    id: "2",
    slug: "1br-hartland-sobha-hartland",
    name: "1BR Hartland",
    area: "Sobha Hartland, Dubai",
    address: "Sobha Hartland, Mohammed Bin Rashid City, Dubai, UAE",
    pricePerNight: 365,
    currency: "AED",
    bedrooms: 1,
    bathrooms: 2,
    maxGuests: 4,
    rating: 4.9,
    reviewCount: 112,
    image: img("photo-1512917774080-9991f1c4c750"),
    images: [
      img("photo-1512917774080-9991f1c4c750"),
      img("photo-1600489000022-c2086d79f9d4"),
      img("photo-1631049307264-da0ec9d70304"),
      img("photo-1584622650111-993a426fbf0a"),
      img("photo-1616486338812-3dadae4b4ace"),
      img("photo-1502005229762-cf1b2da7c5d6"),
    ],
    badge: "Guest Favorite",
    description:
      "Set within a landscaped low-rise community in Sobha Hartland, this design-forward one-bedroom apartment comes with two full bathrooms — a rare find for the size — and resort-style shared amenities including a lagoon-facing pool. It's a five-minute drive to Downtown Dubai and Business Bay.",
    theSpace:
      "A generous living area opens onto a private terrace, ideal for evening downtime. The kitchen is fitted with full-size appliances, and the bedroom includes a king bed, ample storage and a dedicated en-suite bathroom, plus a second guest bathroom just off the living room.",
    amenities: commonAmenities,
    houseRules: commonHouseRules,
  },
  {
    id: "3",
    slug: "1br-dubai-hills",
    name: "1BR Dubai Hills",
    area: "Near Dubai Hills Mall",
    address: "Dubai Hills Estate, Dubai, UAE",
    pricePerNight: 365,
    currency: "AED",
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 4,
    rating: 4.8,
    reviewCount: 64,
    image: img("photo-1600607687939-ce8a6c25118c"),
    images: [
      img("photo-1600607687939-ce8a6c25118c"),
      img("photo-1556909212-d5b604d0c90d"),
      img("photo-1560185893-a55cbc8c57e8"),
      img("photo-1598928506311-c55ded91a20c"),
      img("photo-1615873968403-89e068629265"),
      img("photo-1584622650111-993a426fbf0a"),
    ],
    badge: "New Listing",
    description:
      "A stylish, recently furnished one-bedroom apartment a short walk from Dubai Hills Mall, with the Dubai Hills Golf Club and Park just beyond. The building's rooftop pool and gym are included, and Downtown Dubai is a 15-minute drive via Al Khail Road.",
    theSpace:
      "Warm wood accents and a curated furniture package give this home a boutique-hotel feel. The living room comfortably seats four around a large TV, the kitchen is fully equipped for longer stays, and the bedroom offers a queen bed with a workspace nook — ideal for guests combining leisure with remote work.",
    amenities: commonAmenities,
    houseRules: commonHouseRules,
  },
];
