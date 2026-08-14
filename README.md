# Rentico Dubai

Marketing and booking website for **Rentico Dubai**, a licensed short-term and mid-term rental management company operating across Dubai and Abu Dhabi.

The site is fully live-data: listings, availability, pricing and guest reviews are fetched from **Guesty** at request time, and checkout takes a real card payment via **Stripe** (Guesty is the merchant of record — Stripe is used for tokenization only, the charge itself is created through Guesty's `/instant-charge` endpoint).

## Tech stack

- [Next.js](https://nextjs.org) 16 (App Router, TypeScript, Turbopack)
- [Tailwind CSS](https://tailwindcss.com) v4
- [Framer Motion](https://www.framer.com/motion/) for animation
- [lucide-react](https://lucide.dev) for icons
- [Guesty Open API](https://developers.guesty.com/) + [Guesty Booking Engine API](https://developers.guesty.com/) for listings, availability, quotes and reservations
- [Stripe](https://stripe.com) (`@stripe/stripe-js`, `@stripe/react-stripe-js`) for card capture at checkout
- [Leaflet](https://leafletjs.com) / [react-leaflet](https://react-leaflet.js.org) for the coverage-area map on the Services page (free OpenStreetMap tiles, no API key)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

Other scripts:

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint    # eslint
```

## Environment variables

Create `.env.local` (gitignored — never commit real values) with:

```
# Guesty Open API — listings, calendars, reviews (scope: open-api)
GUESTY_OPEN_API_CLIENT_ID=
GUESTY_OPEN_API_CLIENT_SECRET=

# Guesty Booking Engine API — quotes + reservations (scope: booking_engine:api)
GUESTY_BOOKING_ENGINE_CLIENT_ID=
GUESTY_BOOKING_ENGINE_CLIENT_SECRET=

# Optional: pre-fetched Booking Engine token, seeded to survive dev-server
# restarts without burning the 5-tokens/24h OAuth rate limit. Safe to omit —
# the app fetches its own token on first use if these are absent/expired.
GUESTY_BOOKING_ENGINE_ACCESS_TOKEN=
GUESTY_BOOKING_ENGINE_TOKEN_EXPIRES_AT=

# Rentico's Stripe account (the one connected to Guesty). Publishable key
# only — safe to expose client-side, never put a secret key here.
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
```

To pre-fetch a Booking Engine token manually (e.g. before a demo, to avoid any live OAuth call mid-session):

```bash
node scripts/fetch-guesty-token.mjs
```

This writes `GUESTY_BOOKING_ENGINE_ACCESS_TOKEN` / `GUESTY_BOOKING_ENGINE_TOKEN_EXPIRES_AT` into `.env.local`. Guesty allows at most 5 token fetches per 24h per credential — run this deliberately, not in a loop.

## Project structure

```
app/                      Routes (App Router)
  page.tsx                 Homepage — live featured listings, testimonials
  services/                Services page: what we handle, onboarding, pricing, coverage map, FAQ
  become-a-partner/        Owner partner pitch, benefits, inquiry form
  insights/                Articles hub + [slug] article detail pages
  about-us/                Company story, values, service areas
  book-your-stay/          Live property search (Guesty Booking Engine)
  properties/[slug]/       Property detail + booking/checkout (Guesty + Stripe)
    actions.ts               Server actions: quote, payment-provider lookup, instant-charge reservation
  owner-login/             External link out to the Guesty owner portal
  privacy-policy/, terms-conditions/

components/
  home/                    Homepage sections (Hero, TrustBar, Properties, FAQ, Testimonials, ...)
  layout/                  Navbar, Footer, Logo
  shared/                  Reusable primitives (Button, Container, BookingWidget, DateRangePicker, CTABanner, FAQAccordion, ...)
  property/                Property detail page sections, incl. BookingCheckoutModal (Stripe Elements)
  services/                Services page sections, incl. OperatingMap (Leaflet coverage map)
  partner/, about/, insights/
                           Section components scoped to their page area

lib/
  types.ts                 Shared TypeScript types (Property, Article, FAQ, ...)
  guesty/                  Guesty API layer
    auth.ts                  OAuth2 token fetch + in-memory cache (seedable from .env.local)
    openApi.ts, bookingApi.ts  Typed fetchers for listings/calendar/reviews and quotes/reservations
    mappers.ts                Guesty response → app types
  data/                    Static content that isn't Guesty-sourced: articles, FAQs, destinations, nav, social links
  booking.ts, calendar.ts, utils.ts
                           Booking query helpers, calendar math, misc utilities

scripts/
  fetch-guesty-token.mjs   One-off script to pre-fetch and seed a Booking Engine OAuth token
```
