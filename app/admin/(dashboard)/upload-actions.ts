"use server";

import { eq, sql } from "drizzle-orm";
import { createClient } from "@/lib/supabase/server";
import { getCurrentAdmin } from "@/lib/admin/getCurrentAdmin";
import { db } from "@/lib/db";
import { articles, sections, siteSettings } from "@/lib/db/schema";

const MAX_SIZE = 5 * 1024 * 1024;

const MEDIA_PATH_MARKER = "/storage/v1/object/public/media/";

/**
 * Deletes a file from the media bucket, but only if nothing still points to
 * it — the Media Library exists specifically so one uploaded image can be
 * reused across many fields (article covers, the site logo, any section's
 * image fields), so removing a file just because one place stopped using it
 * could silently break every other place still using the same URL.
 */
export async function cleanupUnreferencedMedia(url: string | null | undefined): Promise<void> {
  if (!url) return;
  const markerIndex = url.indexOf(MEDIA_PATH_MARKER);
  if (markerIndex === -1) return; // not one of our own uploads (e.g. a pasted Unsplash URL) — never touch those
  const path = url.slice(markerIndex + MEDIA_PATH_MARKER.length);
  if (!path) return;

  try {
    const [articleRef] = await db.select({ id: articles.id }).from(articles).where(eq(articles.image, url)).limit(1);
    if (articleRef) return;

    const [settingsRef] = await db
      .select({ id: siteSettings.id })
      .from(siteSettings)
      .where(eq(siteSettings.logoUrl, url))
      .limit(1);
    if (settingsRef) return;

    // Section content is a JSON blob with many possible image fields (hero
    // backgrounds, welcome photos, etc.) — a plain text search across it
    // catches all of them without needing to know each field's key.
    const [sectionRef] = await db
      .select({ id: sections.id })
      .from(sections)
      .where(sql`${sections.content}::text LIKE ${"%" + url + "%"}`)
      .limit(1);
    if (sectionRef) return;

    const supabase = await createClient();
    await supabase.storage.from("media").remove([path]);
  } catch (err) {
    // Best-effort only — cleanup failing must never break the save/delete
    // that triggered it.
    console.error(`Failed to clean up unreferenced media at "${path}":`, err);
  }
}

export interface UploadResult {
  url?: string;
  error?: string;
}

export async function uploadImage(formData: FormData): Promise<UploadResult> {
  const admin = await getCurrentAdmin();
  if (!admin) return { error: "Not authenticated." };

  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return { error: "No file provided." };
  }
  if (!file.type.startsWith("image/")) {
    return { error: "Only image files are allowed." };
  }
  if (file.size > MAX_SIZE) {
    return { error: "Image must be 5MB or smaller." };
  }

  const supabase = await createClient();
  const ext = file.name.split(".").pop() || "jpg";
  const path = `${crypto.randomUUID()}.${ext}`;

  const { error: uploadError } = await supabase.storage.from("media").upload(path, file, {
    contentType: file.type,
  });

  if (uploadError) {
    return { error: uploadError.message };
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from("media").getPublicUrl(path);

  return { url: publicUrl };
}

export interface MediaItem {
  name: string;
  url: string;
  size: number;
  createdAt: string | null;
}

export async function listMedia(): Promise<MediaItem[]> {
  const admin = await getCurrentAdmin();
  if (!admin) return [];

  const supabase = await createClient();
  const { data, error } = await supabase.storage.from("media").list("", {
    sortBy: { column: "created_at", order: "desc" },
  });
  if (error || !data) return [];

  return data
    .filter((f) => f.id)
    .map((f) => {
      const {
        data: { publicUrl },
      } = supabase.storage.from("media").getPublicUrl(f.name);
      return { name: f.name, url: publicUrl, size: f.metadata?.size ?? 0, createdAt: f.created_at ?? null };
    });
}

export interface DeleteMediaResult {
  error?: string;
}

export async function deleteMedia(name: string): Promise<DeleteMediaResult> {
  const admin = await getCurrentAdmin();
  if (!admin) return { error: "Not authenticated." };

  const supabase = await createClient();
  const { data, error } = await supabase.storage.from("media").remove([name]);
  if (error) return { error: error.message };
  // Supabase Storage's remove() can return success with an empty list when a
  // Row Level Security policy silently filters out the row instead of
  // erroring — treat "nothing was actually deleted" as a real failure.
  if (!data || data.length === 0) return { error: "File could not be deleted — it may already be gone." };
  return {};
}
