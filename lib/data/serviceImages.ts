const img = (id: string) =>
  `https://images.unsplash.com/${id}?q=80&w=1400&auto=format&fit=crop`;

export const serviceImages: Record<string, string> = {
  "property-management": img("photo-1512917774080-9991f1c4c750"),
  "listing-management": img("photo-1600489000022-c2086d79f9d4"),
  "cleaning-maintenance": img("photo-1616486338812-3dadae4b4ace"),
  "interior-design": img("photo-1631049307264-da0ec9d70304"),
  "estimated-revenue": img("photo-1502005229762-cf1b2da7c5d6"),
};
