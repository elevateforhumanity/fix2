"use server";

import { revalidatePath } from "next/cache";
import { getSupabaseServerClient } from "@/lib/supabaseServer";

function requireAdminKey(searchParams?: Record<string, string | string[] | undefined>) {
  const expected = process.env.ADMIN_DASHBOARD_PASSWORD;
  const keyParam = searchParams?.key;
  const key = Array.isArray(keyParam) ? keyParam[0] : keyParam;
  if (expected && key !== expected) {
    throw new Error("Unauthorized: invalid admin key");
  }
  return key || "";
}

export async function updateProgramAction(
  formData: FormData,
  searchParams?: Record<string, string | string[] | undefined>
) {
  // simple gate
  const adminKey = requireAdminKey(searchParams);

  const slug = String(formData.get("slug") || "").trim();
  const name = String(formData.get("name") || "").trim();
  const short_description = String(formData.get("short_description") || "").trim();
  const long_description = String(formData.get("long_description") || "").trim();

  if (!slug || !name || !short_description || !long_description) {
    return { ok: false, error: "All fields are required." };
  }

  const supabase = getSupabaseServerClient();
  const { error } = await supabase
    .from("programs")
    .update({
      name,
      short_description,
      long_description,
      updated_at: new Date().toISOString(),
    })
    .eq("slug", slug);

  if (error) {
    console.error("updateProgramAction error:", error);
    return { ok: false, error: error.message };
  }

  // Revalidate public pages
  revalidatePath("/programs");
  revalidatePath(`/programs/${slug}`);
  revalidatePath("/admin/programs");
  revalidatePath(`/admin/programs/${slug}`);

  return { ok: true, redirectTo: `/admin/programs?key=${encodeURIComponent(adminKey)}&saved=${encodeURIComponent(slug)}` };
}
