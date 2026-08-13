export interface Property {
  id: string;
  slug: string;
  name: string;
  area: string;
  address: string;
  lat?: number;
  lng?: number;
  pricePerNight: number;
  currency: string;
  bedrooms: number;
  bathrooms: number;
  maxGuests: number;
  rating: number;
  reviewCount: number;
  image: string;
  images: string[];
  badge?: string;
  description: string;
  theSpace: string;
  amenities: string[];
  houseRules: string[];
}

export interface Service {
  slug: string;
  name: string;
  description: string;
  icon: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  rating: number;
}

export interface FAQ {
  question: string;
  answer: string;
}

export type ArticleBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "list"; items: string[] }
  | { type: "quote"; text: string };

export interface Article {
  id: string;
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  readTime: string;
  date: string;
  content: ArticleBlock[];
}
