import { Service } from "@/lib/types";

export const services: Service[] = [
  {
    slug: "property-management",
    name: "Property Management",
    shortDescription:
      "End-to-end management of your Dubai home — bookings, guests, pricing and reporting, fully handled.",
    description:
      "We take full operational ownership of your property, from guest screening and check-in to dynamic pricing and monthly owner reporting — so your investment performs without demanding your time.",
    icon: "Building2",
    features: [
      "Dynamic pricing across booking channels",
      "24/7 guest communication and support",
      "Owner portal with real-time performance reporting",
      "Compliance with Dubai holiday-home regulations (DTCM)",
      "Transparent, all-in management fee",
    ],
    process: [
      { title: "Onboarding", description: "We assess your property and set up your listing, pricing and calendar." },
      { title: "Go live", description: "Your home is published across our direct-booking site and partner channels." },
      { title: "Manage", description: "We handle every guest touchpoint, cleaning schedule and maintenance need." },
      { title: "Report", description: "You receive clear monthly statements and real-time revenue visibility." },
    ],
  },
  {
    slug: "listing-management",
    name: "Listing Management",
    shortDescription:
      "Professional photography, copywriting and channel distribution that gets your home noticed and booked.",
    description:
      "Your listing is your storefront. We craft photography, descriptions and pricing strategy tuned to Dubai's short-term rental market to maximise visibility and conversion across every channel.",
    icon: "ClipboardList",
    features: [
      "Professional photography and virtual staging",
      "SEO-optimised titles and descriptions",
      "Multi-channel distribution (Airbnb, Booking.com, direct site)",
      "Continuous pricing and calendar optimisation",
      "Performance tracking against comparable listings",
    ],
    process: [
      { title: "Audit", description: "We review your current listing and identify gaps against top performers." },
      { title: "Create", description: "Photography, copy and pricing are rebuilt for maximum appeal." },
      { title: "Distribute", description: "Your listing goes live across all major booking channels." },
      { title: "Optimise", description: "We continuously test and refine to improve occupancy and ADR." },
    ],
  },
  {
    slug: "cleaning-maintenance",
    name: "Cleaning and Maintenance",
    shortDescription:
      "Hotel-grade cleaning and proactive maintenance between every stay, so your home always feels brand new.",
    description:
      "A spotless, well-maintained home is the foundation of a 5-star guest experience. Our in-house housekeeping and maintenance teams keep your property guest-ready year-round.",
    icon: "Sparkles",
    features: [
      "Hotel-standard cleaning after every checkout",
      "Linen and amenity restocking",
      "Scheduled preventive maintenance checks",
      "Rapid-response repairs and vendor coordination",
      "Quality-control inspections before every check-in",
    ],
    process: [
      { title: "Checkout", description: "Our team is notified the moment a guest departs." },
      { title: "Deep clean", description: "A full hotel-standard clean and restock is completed." },
      { title: "Inspect", description: "A quality check confirms the home is guest-ready." },
      { title: "Maintain", description: "Preventive checks catch issues before they affect a stay." },
    ],
  },
  {
    slug: "interior-design",
    name: "Interior Design",
    shortDescription:
      "Design consultancy that turns your property into a standout, highly bookable Dubai home.",
    description:
      "First impressions drive bookings. Our design team styles your property to photograph beautifully and feel unmistakably premium in person — balancing guest appeal with durability.",
    icon: "Sofa",
    features: [
      "Full furniture and styling packages",
      "Space planning for guest comfort and flow",
      "Sourcing durable, guest-proof materials",
      "Brand-consistent styling across your portfolio",
      "Budget-tiered design packages",
    ],
    process: [
      { title: "Consult", description: "We assess the space and align on style, budget and timeline." },
      { title: "Design", description: "A full concept, mood board and furniture plan is presented." },
      { title: "Furnish", description: "We source, deliver and install every piece." },
      { title: "Style", description: "Final styling ensures the home is camera-ready for launch." },
    ],
  },
  {
    slug: "estimated-revenue",
    name: "Estimated Revenue",
    shortDescription:
      "A data-backed projection of what your property can earn as a short-term rental in Dubai.",
    description:
      "Before you commit, know the numbers. We analyse your property's location, size and comparable performance data to give you a realistic revenue estimate.",
    icon: "TrendingUp",
    features: [
      "Comparable-property market analysis",
      "Seasonal occupancy and ADR projections",
      "Short-term vs. traditional lease comparison",
      "Net-yield estimate after management fees",
      "No-obligation, free consultation",
    ],
    process: [
      { title: "Share details", description: "Tell us your property's location, size and configuration." },
      { title: "Analyse", description: "We benchmark it against comparable performing listings nearby." },
      { title: "Receive estimate", description: "You get a clear projected revenue range." },
      { title: "Decide", description: "Move forward with onboarding whenever you're ready." },
    ],
  },
];
