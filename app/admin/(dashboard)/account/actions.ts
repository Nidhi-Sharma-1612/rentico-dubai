"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { getCurrentAdmin } from "@/lib/admin/getCurrentAdmin";

const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required."),
    newPassword: z.string().min(8, "New password must be at least 8 characters."),
    confirmPassword: z.string().min(1, "Please confirm your new password."),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "New password and confirmation don't match.",
    path: ["confirmPassword"],
  });

export interface ActionResult {
  error?: string;
  success?: boolean;
}

export async function changePassword(_prevState: ActionResult, formData: FormData): Promise<ActionResult> {
  const admin = await getCurrentAdmin();
  if (!admin) return { error: "Not authenticated." };

  const parsed = changePasswordSchema.safeParse({
    currentPassword: formData.get("currentPassword"),
    newPassword: formData.get("newPassword"),
    confirmPassword: formData.get("confirmPassword"),
  });
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Invalid input." };

  const supabase = await createClient();

  // Re-verify identity with the current password before allowing a change —
  // updateUser() alone would let anyone with an open session swap the
  // password without ever proving they know the existing one.
  const { error: verifyError } = await supabase.auth.signInWithPassword({
    email: admin.email,
    password: parsed.data.currentPassword,
  });
  if (verifyError) return { error: "Current password is incorrect." };

  const { error: updateError } = await supabase.auth.updateUser({ password: parsed.data.newPassword });
  if (updateError) return { error: updateError.message };

  revalidatePath("/admin/account");
  return { success: true };
}
