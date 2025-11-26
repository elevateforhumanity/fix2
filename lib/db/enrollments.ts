import type { ProgramEnrollment } from "@/types/enrollment";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function createProgramEnrollment(
  partial: Omit<ProgramEnrollment, "id" | "createdAt">
): Promise<ProgramEnrollment> {
  const { data, error } = await supabase
    .from("program_enrollments")
    .insert({
      student_id: partial.studentId,
      program_id: partial.programId,
      funding_source: partial.fundingSource,
      status: partial.status,
      stripe_ref_id: partial.stripeRefId,
      payment_mode: partial.paymentMode,
    })
    .select()
    .single();

  if (error) {
    console.error("Error creating enrollment:", error);
    throw error;
  }

  return {
    id: data.id,
    studentId: data.student_id,
    programId: data.program_id,
    fundingSource: data.funding_source,
    status: data.status,
    stripeRefId: data.stripe_ref_id,
    paymentMode: data.payment_mode,
    createdAt: data.created_at,
  };
}

export async function updateEnrollmentStatus(
  id: string,
  status: ProgramEnrollment["status"]
): Promise<void> {
  const { error } = await supabase
    .from("program_enrollments")
    .update({ status })
    .eq("id", id);

  if (error) {
    console.error("Error updating enrollment status:", error);
    throw error;
  }
}

export async function listEnrollments(): Promise<ProgramEnrollment[]> {
  const { data, error } = await supabase
    .from("program_enrollments")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error listing enrollments:", error);
    return [];
  }

  return data.map((row) => ({
    id: row.id,
    studentId: row.student_id,
    programId: row.program_id,
    fundingSource: row.funding_source,
    status: row.status,
    stripeRefId: row.stripe_ref_id,
    paymentMode: row.payment_mode,
    createdAt: row.created_at,
  }));
}
