import type { ProgramEnrollment } from "@/types/enrollment";

// NOTE: Replace this with real DB logic (Supabase, Postgres, etc.)
// For now it's just a placeholder so TypeScript compiles.

const inMemoryEnrollments: ProgramEnrollment[] = [];

export async function createProgramEnrollment(
  partial: Omit<ProgramEnrollment, "id" | "createdAt">
): Promise<ProgramEnrollment> {
  const enrollment: ProgramEnrollment = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    ...partial,
  };
  inMemoryEnrollments.push(enrollment);
  return enrollment;
}

export async function updateEnrollmentStatus(
  id: string,
  status: ProgramEnrollment["status"]
): Promise<void> {
  const idx = inMemoryEnrollments.findIndex((e) => e.id === id);
  if (idx === -1) return;
  inMemoryEnrollments[idx].status = status;
}

export async function listEnrollments(): Promise<ProgramEnrollment[]> {
  return inMemoryEnrollments;
}
