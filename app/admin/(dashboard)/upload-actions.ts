"use server";

import { createClient } from "@/lib/supabase/server";
import { getCurrentAdmin } from "@/lib/admin/getCurrentAdmin";

const MAX_SIZE = 5 * 1024 * 1024;

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
  const { error } = await supabase.storage.from("media").remove([name]);
  if (error) return { error: error.message };
  return {};
}
