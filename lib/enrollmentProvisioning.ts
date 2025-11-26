import { getProgramById } from "@/lms-data/programs";
import { createProgramEnrollment, updateEnrollmentStatus } from "@/lib/db/enrollments";
import type { FundingSource } from "@/types/enrollment";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function provisionEnrollmentFromStripe(args: {
  programId: string;
  studentId: string;
  paymentMode: "full" | "plan";
  stripeRefId?: string; // payment_intent or subscription id
}) {
  const { programId, studentId, paymentMode, stripeRefId } = args;
  const program = getProgramById(programId);
  if (!program) {
    console.error("Program not found:", programId);
    return;
  }

  const fundingSource: FundingSource = "SELF_PAY";

  // Create enrollment
  const enrollment = await createProgramEnrollment({
    studentId,
    programId,
    fundingSource,
    status: "AWAITING_SEATS",
    stripeRefId,
    paymentMode,
  });

  // Create partner seat orders for each required partner course
  const seatOrders = program.partnerRequirements
    .filter((req) => req.required)
    .map((req) => ({
      enrollment_id: enrollment.id,
      partner_course_id: req.partnerCourseId,
      quantity: 1,
      status: "PENDING",
    }));

  if (seatOrders.length > 0) {
    const { error } = await supabase
      .from("partner_seat_orders")
      .insert(seatOrders);

    if (error) {
      console.error("Error creating seat orders:", error);
    }
  }

  // Mark enrollment as ready (in production, this would happen after seats are actually purchased)
  await updateEnrollmentStatus(enrollment.id, "READY_TO_START");

  return enrollment;
}
