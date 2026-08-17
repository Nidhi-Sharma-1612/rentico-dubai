import "server-only";
import { eq } from "drizzle-orm";
import { createClient } from "@/lib/supabase/server";
import { db } from "@/lib/db";
import { adminUsers } from "@/lib/db/schema";

export interface CurrentAdmin {
  id: string;
  authUserId: string;
  email: string;
  name: string;
}

export async function getCurrentAdmin(): Promise<CurrentAdmin | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const [row] = await db.select().from(adminUsers).where(eq(adminUsers.authUserId, user.id)).limit(1);

  if (row) {
    return { id: row.id, authUserId: row.authUserId, email: row.email, name: row.name ?? row.email.split("@")[0] };
  }

  // No adminUsers row yet (e.g. the very first login before it's been
  // provisioned) — fall back to deriving a display name from the auth email
  // rather than treating this as unauthenticated.
  return {
    id: user.id,
    authUserId: user.id,
    email: user.email ?? "",
    name: user.email?.split("@")[0] ?? "Admin",
  };
}
