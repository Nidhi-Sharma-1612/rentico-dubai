process.loadEnvFile(".env.local");
import postgres from "postgres";

// Locks down every public table against Supabase's auto-generated REST API,
// which is reachable by anyone holding the public anon key. The app itself
// never queries these tables through that API — it always goes through
// Drizzle over DATABASE_URL, which connects as the `postgres` role (the
// tables' owner). Table owners bypass RLS by default in Postgres, so
// enabling RLS here with zero policies blocks the anon/authenticated roles
// completely without touching how the app reads or writes.
const TABLES = [
  "admin_users",
  "pages",
  "sections",
  "articles",
  "faqs",
  "testimonials",
  "site_settings",
  "activity_log",
  "guesty_tokens",
];

async function main() {
  const sql = postgres(process.env.DATABASE_URL!, { prepare: false });

  for (const table of TABLES) {
    await sql.unsafe(`alter table public.${table} enable row level security`);
    console.log(`Enabled RLS on public.${table}`);
  }

  console.log(
    "\nDone. Verify in the Supabase dashboard under Advisors that the rls_disabled_in_public warning is gone."
  );
  await sql.end();
}

main();
