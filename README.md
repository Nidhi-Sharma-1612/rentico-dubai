# Rentico Dubai

Marketing website for **Rentico Dubai**, a luxury short-term rental and property management company operating across Dubai's prime districts (Downtown, Business Bay, Palm Jumeirah, Dubai Marina, Dubai Hills and Sobha Hartland).

This is **Phase 1**: a fully-designed, static UI/UX build. Live property availability, booking and owner-portal data (via Guesty) are deferred to Phase 2 — all property/testimonial/article data currently lives in `lib/data/` as typed static content.

## Tech stack

- [Next.js](https://nextjs.org) 16 (App Router, TypeScript)
- [Tailwind CSS](https://tailwindcss.com) v4
- [Framer Motion](https://www.framer.com/motion/) for animation
- [lucide-react](https://lucide.dev) for icons

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

## Project structure

```
app/                      Routes (App Router)
  page.tsx                 Homepage
  services/                Services overview + per-service detail pages
  become-a-partner/        Owner partner pitch, benefits, inquiry form
  insights/                Articles hub + [slug] article detail pages
  about-us/                Company story, values, service areas
  book-your-stay/          Property search/browse
  properties/[slug]/       Property detail pages
  owner-login/             External link out to the Guesty owner portal
  privacy-policy/, terms-conditions/

components/
  home/                    Homepage sections (Hero, TrustBar, Properties, FAQ, Testimonials, ...)
  layout/                  Navbar, Footer, Logo
  shared/                  Reusable primitives (Button, Container, BookingWidget, DateRangePicker, CTABanner, FAQAccordion, ...)
  services/, partner/, about/, property/, insights/
                           Section components scoped to their page area

lib/
  types.ts                 Shared TypeScript types (Property, Service, Article, FAQ, ...)
  data/                    Static content: properties, services, testimonials, articles, FAQs, nav
  booking.ts, calendar.ts, utils.ts
                           Booking query helpers, calendar math, misc utilities
```
