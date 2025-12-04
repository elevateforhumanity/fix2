// app/admin/external-modules/approvals/page.tsx
// Admin interface to review and approve external module submissions

import { getSupabaseServerClient } from "@/lib/supabaseServer";
import ApprovalsList from "./ApprovalsList";

export default async function ExternalModuleApprovalsPage() {
  const supabase = getSupabaseServerClient();

  // Fetch all pending submissions
  const { data: pendingSubmissions } = await supabase
    .from("external_partner_progress")
    .select(
      `
      *,
      external_partner_modules (
        title,
        partner_name,
        course_id,
        courses (
          title
        )
      ),
      profiles (
        full_name,
        email
      )
    `
    )
    .eq("status", "submitted")
    .order("created_at", { ascending: false });

  // Fetch recently approved
  const { data: recentlyApproved } = await supabase
    .from("external_partner_progress")
    .select(
      `
      *,
      external_partner_modules (
        title,
        partner_name,
        course_id,
        courses (
          title
        )
      ),
      profiles (
        full_name,
        email
      )
    `
    )
    .eq("status", "approved")
    .order("approved_at", { ascending: false })
    .limit(20);

  return (
    <main className="max-w-7xl mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold mb-1">
          External Module Approvals
        </h1>
        <p className="text-sm text-slate-600">
          Review and approve student submissions for external partner modules
        </p>
      </div>

      <ApprovalsList
        pendingSubmissions={pendingSubmissions || []}
        recentlyApproved={recentlyApproved || []}
      />
    </main>
  );
}
