import "server-only";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./schema";

// postgres() connects lazily on first query, so an unset DATABASE_URL only
// surfaces as an error when a route actually reads/writes the DB — not at
// module-evaluation time, which would otherwise break every build until
// real credentials are configured.
const client = postgres(process.env.DATABASE_URL ?? "", { prepare: false });

export const db = drizzle(client, { schema });
