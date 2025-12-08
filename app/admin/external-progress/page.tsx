// app/admin/external-progress/page.tsx
import { supabaseAdmin } from "@/lib/supabase-admin";
import { requireAdmin } from '@/lib/authGuards';
import ExternalProgressAdminClient from "./ExternalProgressAdminClient";

type AdminExternalProgressRow = {
  id: string;
  status: "not_started" | "in_progress" | "submitted" | "approved";
  proof_file_url: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
  user: {
    id: string;
    full_name: string | null;
  } | null;
  module: {
    id: string;
    title: string;
    partner_name: string;
    course: {
      id: string;
      title: string;
    } | null;
  } | null;
};

async function getExternalProgress(): Promise<AdminExternalProgressRow[]> {
  const { data, error } = await supabaseAdmin
    .from("external_partner_progress")
    .select(
      `
      id,
      status,
      proof_file_url,
      notes,
      created_at,
      updated_at,
      user:profiles!external_partner_progress_user_id_fkey (
        id,
        full_name
      ),
      module:external_partner_modules!external_partner_progress_module_id_fkey (
        id,
        title,
        partner_name,
        course:courses!external_partner_modules_course_id_fkey (
          id,
          title
        )
      )
    `
    )
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching external progress", error);
    return [];
  }

  return (data || []) as AdminExternalProgressRow[];
}

export default async function ExternalProgressAdminPage() {
  await requireAdmin();

  const rows = await getExternalProgress();

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-semibold mb-1">
          External Partner Modules – Review
        </h1>
        <p className="text-sm text-slate-600">
          Review Milady / other partner completions submitted by students.
          Approving marks the external module as completed inside Elevate.
        </p>
      </div>

      <ExternalProgressAdminClient initialRows={rows} />
    </div>
  );
}
