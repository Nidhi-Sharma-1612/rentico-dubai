# Rentico Dubai

Marketing and booking website for **Rentico Dubai**, a licensed short-term and mid-term rental management company operating across Dubai and Abu Dhabi.

The site is fully live-data: listings, availability, pricing and guest reviews are fetched from **Guesty** at request time, and checkout takes a real card payment via **Stripe** (Guesty is the merchant of record — Stripe is used for tokenization only, the charge itself is created through Guesty's `/instant-charge` endpoint). Nearly all marketing copy — every page's sections, articles, FAQs, testimonials, site-wide settings and SEO metadata — is editable through a built-in admin panel backed by Supabase, not hardcoded.

## Tech stack

- [Next.js](https://nextjs.org) 16 (App Router, TypeScript, Turbopack)
- [Tailwind CSS](https://tailwindcss.com) v4
- [Framer Motion](https://www.framer.com/motion/) for animation
- [lucide-react](https://lucide.dev) for icons
- [Guesty Open API](https://developers.guesty.com/) + [Guesty Booking Engine API](https://developers.guesty.com/) for listings, availability, quotes and reservations
- [Stripe](https://stripe.com) (`@stripe/stripe-js`, `@stripe/react-stripe-js`) for card capture at checkout
- [Leaflet](https://leafletjs.com) / [react-leaflet](https://react-leaflet.js.org) for the coverage-area map on the Manage My Property page (free OpenStreetMap tiles, no API key)
- [Supabase](https://supabase.com) — Postgres database, Auth (admin login), and Storage (uploaded images)
- [Drizzle ORM](https://orm.drizzle.team) + [drizzle-kit](https://orm.drizzle.team/kit-docs/overview) for the database layer
- [react-hook-form](https://react-hook-form.com) + [zod](https://zod.dev), [@dnd-kit](https://dndkit.com) (drag-to-reorder), [sonner](https://sonner.emilkowal.ski) (toasts) — admin panel forms/UX

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the public site, and [http://localhost:3000/admin/login](http://localhost:3000/admin/login) for the admin panel (see [Admin panel](#admin-panel) below for how to create an account).

Other scripts:

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint    # eslint
```

Database:

```bash
npm run db:studio   # browse the database in Drizzle Studio
npm run db:secure   # enable Row Level Security on every public table (scripts/enable-rls.ts)
```

`npm run db:push` (drizzle-kit push) is defined but currently crashes on this project when it tries to introspect an existing `CHECK` constraint (a drizzle-kit bug, not project-specific). Until that's fixed upstream, apply schema changes with a one-off script instead — see any of the `scripts/*.ts` files or past commits for the pattern: `process.loadEnvFile(".env.local")` + the `postgres` npm package + raw SQL, run via `npx tsx`, deleted after running (except permanent scripts like `enable-rls.ts`).

## Environment variables

Create `.env.local` (gitignored — never commit real values) with:

```
# Supabase project — used for admin auth, Postgres, and image uploads (Storage)
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

# Supabase Postgres connection string (pooler), used by Drizzle for all DB reads/writes.
# Connects as the table-owner role, which bypasses Row Level Security by default —
# RLS (enabled via `npm run db:secure`) exists to lock out the public anon/authenticated
# REST API, not to gate the app itself.
DATABASE_URL=

# Guesty Open API — listings, calendars, reviews (scope: open-api)
GUESTY_OPEN_API_CLIENT_ID=
GUESTY_OPEN_API_CLIENT_SECRET=

# Guesty Booking Engine API — quotes + reservations (scope: booking_engine:api)
GUESTY_BOOKING_ENGINE_CLIENT_ID=
GUESTY_BOOKING_ENGINE_CLIENT_SECRET=

# Rentico's Stripe account (the one connected to Guesty). Publishable key
# only — safe to expose client-side, never put a secret key here.
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
```

Guesty OAuth tokens are cached in the `guesty_tokens` database table (see `lib/guesty/auth.ts`) and refreshed automatically — there's nothing to seed manually, and this survives server restarts. Guesty allows at most 5 token fetches per 24h per credential, so avoid anything that would restart the process in a tight loop against production credentials.

## Admin panel

`/admin` is a full CMS covering every page's content sections, Articles (with draft/preview via Next.js Draft Mode), FAQs, Testimonials, a media library, site-wide settings (contact info, logo, social links), SEO metadata per page, and an activity log — all backed by Supabase Postgres via Drizzle, gated behind Supabase Auth.

To create the first admin account, add a row to Supabase Auth (dashboard or `supabase.auth.admin.createUser`) and a matching row in the `admin_users` table (`auth_user_id` must match the Auth user's id). There's no public sign-up flow by design.

## Project structure

```
app/
  (marketing)/             Public site routes, sharing app/(marketing)/layout.tsx (Navbar/Footer)
    page.tsx                 Homepage — live featured listings, testimonials
    experience/               Guest experience page
    manage-my-property/       Owner-facing pitch: what we handle, onboarding, pricing, coverage map
    become-a-partner/         Referral partner pitch, commission calculator, inquiry form
    insights/                 Articles hub + [slug] article detail pages
    about-us/                 Company story, values, service areas
    contact/                  Contact details + form
    book-your-stay/           Live property search (Guesty Booking Engine)
    properties/[slug]/        Property detail + booking/checkout (Guesty + Stripe)
      actions.ts                 Server actions: quote, payment-provider lookup, instant-charge reservation
    owner-login/               External link out to the Guesty owner portal
    privacy-policy/, terms-conditions/   Admin-editable legal pages (same block editor as Articles)
  admin/
    login/                    Admin sign-in
    (dashboard)/              Everything behind the auth gate: Overview, Articles, FAQs, Testimonials,
                               Pages (generic section editor), Media library, Activity log, Settings, Account
  api/draft/                 Route handlers enabling/disabling Next.js Draft Mode for article previews

components/
  home/                      Homepage sections (Hero, Welcome, Amenities, Testimonials, FAQ, ...)
  layout/                    Navbar, Footer, Logo
  shared/                    Reusable primitives (Button, Container, BookingWidget, DateRangePicker, CTABanner, ...)
  property/                  Property detail page sections, incl. BookingCheckoutModal (Stripe Elements)
  services/                  Manage My Property page sections, incl. the Leaflet coverage map
                              (directory name predates the page's rename from /services)
  booking/                   Book Your Stay search results
  partner/, about/, insights/, experience/
                              Section components scoped to their page area

lib/
  types.ts                   Shared TypeScript types (Property, Article, FAQ, ...)
  guesty/                    Guesty API layer
    auth.ts                    OAuth2 token fetch, cached in Postgres (survives restarts)
    openApi.ts, bookingApi.ts  Typed fetchers for listings/calendar/reviews and quotes/reservations
    mappers.ts                 Guesty response → app types
  db/
    schema.ts                  Drizzle schema — every table in the project
    index.ts                   Drizzle client (DATABASE_URL)
  data/
    pageSections.ts            Fetchers for each page's admin-editable content, with hardcoded fallbacks
    siteSettings.ts, social.ts Site-wide settings fetcher
  admin/
    getCurrentAdmin.ts          Resolves the logged-in admin from the Supabase session
    activityLabels.ts           Shared labels/icons for the activity log
  supabase/
    client.ts, server.ts, proxy.ts   Supabase client factories (browser/server) + session refresh
  booking.ts, calendar.ts, utils.ts
                              Booking query helpers, calendar math, misc utilities

scripts/
  enable-rls.ts             Enables Row Level Security on every public table (npm run db:secure)
  fetch-guesty-token.mjs    Legacy manual token bootstrap — superseded by the DB-cached token flow
                            in lib/guesty/auth.ts; only useful for forcing an out-of-band token fetch
```
