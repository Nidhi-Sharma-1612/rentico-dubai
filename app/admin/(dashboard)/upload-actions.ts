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
