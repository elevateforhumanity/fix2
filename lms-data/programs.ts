import type { Program, ProgramWithPartners } from "@/types/program";
import { partnerCourses, getPartnerCourseById } from "./partners/sample-partners";

// Helper: compute sale price based on partner base costs & markup
function computeSalePrice(partnerIds: string[], markupMultiplier: number): number {
  const base = partnerIds.reduce((sum, id) => {
    const pc = getPartnerCourseById(id);
    return sum + (pc?.baseCost ?? 0);
  }, 0);
  return Math.round(base * markupMultiplier);
}

// ===== CNA PROGRAM (TUITION-BASED, NOT STATE-FUNDED) =====
const cnaPartnerIds = [
  "hsi-cna-main",
  "nationaldrug-basic",
  "careersafe-cna-safety",
];

const cnaProgram: Program = {
  id: "prog-cna",
  slug: "certified-nursing-assistant",
  title: "Certified Nursing Assistant (CNA) Career Pathway",
  subtitle: "Tuition-based CNA program with Earn While You Learn options.",
  description:
    "Train for high-demand CNA roles in long-term care, rehab, and home health. This tuition-based pathway combines CNA training with safety, drug-free workplace, and soft skills credentials.",
  deliveryEngine: "NATIVE",
  salePrice: computeSalePrice(cnaPartnerIds, 1.5), // 50% markup
  stripeProductId: undefined,          // fill after Stripe setup
  stripePriceId: undefined,            // pay in full
  stripePriceIdPlan: undefined,        // payment plan
  partnerRequirements: cnaPartnerIds.map((id) => ({
    partnerCourseId: id,
    required: true,
  })),
  isStateTuitionFunded: false, // CNA tuition is NOT state-funded in your case
  earnWhileYouLearnNotes:
    "CNA tuition is self-pay or employer-pay. Students may still qualify for paid Work Experience (WEX), JRI stipends, and OJT-supported employment after training.",
  visiblePublic: true,
};

// ===== BARBER APPRENTICESHIP (TUITION-BASED + APPRENTICESHIP WAGES) =====
const barberPartnerIds = [
  "milady-barber-theory",
  "nationaldrug-barber",
];

const barberProgram: Program = {
  id: "prog-barber",
  slug: "barber-apprenticeship",
  title: "Barber Apprenticeship Career Pathway",
  subtitle: "Milady-based barber theory with Earn While You Learn apprenticeship.",
  description:
    "Prepare for a licensed barber career through Milady barber theory, EFH labs, and a registered apprenticeship model that allows you to earn while you learn in real shops.",
  deliveryEngine: "NATIVE",
  salePrice: computeSalePrice(barberPartnerIds, 1.5),
  stripeProductId: undefined,
  stripePriceId: undefined,
  stripePriceIdPlan: undefined,
  partnerRequirements: barberPartnerIds.map((id) => ({
    partnerCourseId: id,
    required: true,
  })),
  isStateTuitionFunded: false,
  earnWhileYouLearnNotes:
    "Students can earn wages through registered apprenticeship placements while completing barber theory and EFH labs. Employers may choose to reimburse or cover tuition.",
  visiblePublic: true,
};

export const allPrograms: Program[] = [cnaProgram, barberProgram];

export function getProgramBySlug(slug: string): ProgramWithPartners | undefined {
  const prog = allPrograms.find((p) => p.slug === slug);
  if (!prog) return undefined;
  const partners = prog.partnerRequirements
    .map((req) => getPartnerCourseById(req.partnerCourseId))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));
  return { ...prog, partners };
}

export function getProgramById(id: string): ProgramWithPartners | undefined {
  const prog = allPrograms.find((p) => p.id === id);
  if (!prog) return undefined;
  const partners = prog.partnerRequirements
    .map((req) => getPartnerCourseById(req.partnerCourseId))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));
  return { ...prog, partners };
}
