import { getProgramById } from "@/lms-data/programs";
import { createProgramEnrollment, updateEnrollmentStatus } from "@/lib/db/enrollments";
import type { FundingSource } from "@/types/enrollment";

export async function provisionEnrollmentFromStripe(args: {
  programId: string;
  studentId: string;
  paymentMode: "full" | "plan";
  stripeRefId?: string; // payment_intent or subscription id
}) {
  const { programId, studentId, paymentMode, stripeRefId } = args;
  const program = getProgramById(programId);
  if (!program) return;

  const fundingSource: FundingSource = "SELF_PAY";

  const enrollment = await createProgramEnrollment({
    studentId,
    programId,
    fundingSource,
    status: "AWAITING_SEATS",
    stripeRefId,
    paymentMode,
  });

  // TODO: auto-create PartnerSeatOrder + PartnerSeat records here
  // and assign seats based on program.partnerRequirements.

  // For now, simulate immediate readiness:
  await updateEnrollmentStatus(enrollment.id, "READY_TO_START");

  return enrollment;
}
