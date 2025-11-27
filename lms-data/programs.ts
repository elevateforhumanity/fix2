import type { Program, ProgramWithPartners } from "@/types/program";
import { partnerCourses, getPartnerCourseById } from "./partners/sample-partners";

function computeSalePrice(partnerIds: string[], markupMultiplier: number): number {
  const base = partnerIds.reduce((sum, id) => {
    const pc = getPartnerCourseById(id);
    return sum + (pc?.baseCost ?? 0);
  }, 0);
  return Math.round(base * markupMultiplier);
}

// ===== CNA =====
const cnaPartnerIds = ["hsi-cna-main", "nationaldrug-basic", "careersafe-cna-safety"];

const cnaProgram: Program = {
  id: "prog-cna",
  slug: "certified-nursing-assistant",
  title: "Certified Nursing Assistant (CNA) Career Pathway",
  subtitle: "Tuition-based CNA program with Earn While You Learn options.",
  description:
    "Train for high-demand CNA roles in long-term care, rehab, and home health. This tuition-based pathway combines CNA training with safety, drug-free workplace, and soft skills credentials.",
  deliveryEngine: "NATIVE",
  salePrice: computeSalePrice(cnaPartnerIds, 1.5),
  stripeProductId: undefined,
  stripePriceId: undefined,
  stripePriceIdPlan: undefined,
  partnerRequirements: cnaPartnerIds.map((id) => ({
    partnerCourseId: id,
    required: true,
  })),
  isStateTuitionFunded: false,
  earnWhileYouLearnNotes:
    "CNA tuition is self-pay or employer-pay. Students may still qualify for paid Work Experience (WEX), JRI stipends, and OJT-supported employment after training.",
  visiblePublic: true,
};

// ===== BARBER (APPRENTICESHIP) =====
const barberPartnerIds = ["milady-barber-theory", "nationaldrug-barber"];

const barberProgram: Program = {
  id: "prog-barber",
  slug: "barber-apprenticeship",
  title: "Barber Apprenticeship Career Pathway",
  subtitle:
    "Milady barber theory plus registered apprenticeship hours so you can earn while you learn in the shop.",
  description:
    "This apprenticeship pathway combines Milady barber theory with real shop experience under a licensed barber. As an apprentice, you build hours toward licensure while learning cuts, shaves, sanitation, customer service, and the business side of barbering. Tuition covers your theory content and support; apprenticeship placements are where you earn while you learn.",
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
    "Apprentices log hours in real barbershops under licensed barbers. You can earn income while completing your theory and required apprenticeship hours toward licensure. Employers may also choose to reimburse or cover tuition.",
  visiblePublic: true,
};

// ===== HVAC / BUILDING TECH =====
const hvacPartnerIds = ["careersafe-hvac-osha", "nationaldrug-hvac"];

const hvacProgram: Program = {
  id: "prog-hvac",
  slug: "hvac-building-technician",
  title: "HVAC & Building Technician Career Pathway",
  subtitle:
    "Safety-first training for HVAC and building maintenance with pathways into real trade employment.",
  description:
    "This pathway prepares learners for entry-level HVAC and building maintenance roles. It combines safety and drug-free workplace training with hands-on skills delivered through Elevate and employer partners.",
  deliveryEngine: "NATIVE",
  salePrice: computeSalePrice(hvacPartnerIds, 1.5),
  stripeProductId: undefined,
  stripePriceId: undefined,
  stripePriceIdPlan: undefined,
  partnerRequirements: hvacPartnerIds.map((id) => ({
    partnerCourseId: id,
    required: true,
  })),
  isStateTuitionFunded: false,
  earnWhileYouLearnNotes:
    "Learners may qualify for paid Work Experience placements in maintenance, facilities, or apprentice roles, and OJT-supported employment with partner employers.",
  visiblePublic: true,
};

// ===== CDL / TRANSPORTATION =====
const cdlPartnerIds = ["nationaldrug-cdl", "careersafe-cdl-safety"];

const cdlProgram: Program = {
  id: "prog-cdl",
  slug: "cdl-transportation",
  title: "CDL & Transportation Career Pathway",
  subtitle:
    "Transportation safety, DOT drug & alcohol awareness, and job readiness for CDL-driven careers.",
  description:
    "This pathway supports learners preparing for CDL and transportation roles. It focuses on DOT drug & alcohol awareness, transportation safety, and workplace professionalism alongside external CDL training partners.",
  deliveryEngine: "NATIVE",
  salePrice: computeSalePrice(cdlPartnerIds, 1.5),
  stripeProductId: undefined,
  stripePriceId: undefined,
  stripePriceIdPlan: undefined,
  partnerRequirements: cdlPartnerIds.map((id) => ({
    partnerCourseId: id,
    required: true,
  })),
  isStateTuitionFunded: false,
  earnWhileYouLearnNotes:
    "Learners may connect to WEX roles in transportation support and OJT-supported hiring with transportation employers after meeting CDL requirements.",
  visiblePublic: true,
};

// ===== CUSTOMER SERVICE PRO =====
const customerServicePartnerIds = ["rise-customer-service", "certiport-customer-service"];

const customerServiceProgram: Program = {
  id: "prog-customer-service",
  slug: "customer-service-pro",
  title: "Customer Service Pro Career Pathway",
  subtitle:
    "Communication, systems, and certification prep for front-line customer service and office roles.",
  description:
    "This pathway prepares learners for office, call center, and customer-facing roles. It combines Rise customer service modules, Certiport certification prep, and Elevate soft skills and job readiness content.",
  deliveryEngine: "NATIVE",
  salePrice: computeSalePrice(customerServicePartnerIds, 1.5),
  stripeProductId: undefined,
  stripePriceId: undefined,
  stripePriceIdPlan: undefined,
  partnerRequirements: customerServicePartnerIds.map((id) => ({
    partnerCourseId: id,
    required: true,
  })),
  isStateTuitionFunded: false,
  earnWhileYouLearnNotes:
    "Learners may qualify for WEX placements in office and customer service environments and OJT-supported hiring with employer partners.",
  visiblePublic: true,
};

// ===== IT SUPPORT HELPDESK =====
const itPartnerIds = ["certiport-it-specialist-core", "certiport-it-networking"];

const itProgram: Program = {
  id: "prog-it-support",
  slug: "it-support-helpdesk",
  title: "IT Support Helpdesk Career Pathway",
  subtitle:
    "IT Specialist content plus helpdesk readiness for entry-level tech support roles.",
  description:
    "This pathway prepares learners for IT support and helpdesk roles using Certiport IT Specialist content, soft skills training, and job readiness modules tailored to tech environments.",
  deliveryEngine: "NATIVE",
  salePrice: computeSalePrice(itPartnerIds, 1.5),
  stripeProductId: undefined,
  stripePriceId: undefined,
  stripePriceIdPlan: undefined,
  partnerRequirements: itPartnerIds.map((id) => ({
    partnerCourseId: id,
    required: true,
  })),
  isStateTuitionFunded: false,
  earnWhileYouLearnNotes:
    "Learners may qualify for WEX placements in IT support settings and OJT-supported junior helpdesk roles.",
  visiblePublic: true,
};

// ===== ENTREPRENEURSHIP =====
const entrepreneurshipPartnerIds = ["certiport-esb"];

const entrepreneurshipProgram: Program = {
  id: "prog-entrepreneurship",
  slug: "entrepreneurship-small-business",
  title: "Entrepreneurship & Small Business Pathway",
  subtitle:
    "Certiport ESB plus EFH coaching for learners who want to start or grow a business.",
  description:
    "This pathway is for learners who want to turn ideas into income. It combines Certiport ESB content with Elevate coaching around planning, marketing, money management, and execution.",
  deliveryEngine: "NATIVE",
  salePrice: computeSalePrice(entrepreneurshipPartnerIds, 1.5),
  stripeProductId: undefined,
  stripePriceId: undefined,
  stripePriceIdPlan: undefined,
  partnerRequirements: entrepreneurshipPartnerIds.map((id) => ({
    partnerCourseId: id,
    required: true,
  })),
  isStateTuitionFunded: false,
  earnWhileYouLearnNotes:
    "Learners may continue to work in other roles while building their business, and may qualify for WEX or OJT if entrepreneurship pathways include employer-based roles.",
  visiblePublic: true,
};

// ===== BUILDING MAINTENANCE / FACILITIES =====
const buildingMaintPartnerIds = ["careersafe-building-safety", "nationaldrug-building"];

const buildingMaintenanceProgram: Program = {
  id: "prog-building-maintenance",
  slug: "building-maintenance-facilities",
  title: "Building Maintenance & Facilities Tech Pathway",
  subtitle:
    "Safety, compliance, and basic maintenance concepts for facilities and building roles.",
  description:
    "This pathway prepares learners for building maintenance and facilities roles. It blends safety, drug-free workplace training, and EFH hands-on skill development aligned with employer expectations.",
  deliveryEngine: "NATIVE",
  salePrice: computeSalePrice(buildingMaintPartnerIds, 1.5),
  stripeProductId: undefined,
  stripePriceId: undefined,
  stripePriceIdPlan: undefined,
  partnerRequirements: buildingMaintPartnerIds.map((id) => ({
    partnerCourseId: id,
    required: true,
  })),
  isStateTuitionFunded: false,
  earnWhileYouLearnNotes:
    "Learners may qualify for WEX roles in facilities, janitorial, and maintenance, and OJT-supported hiring with property and facilities employers.",
  visiblePublic: true,
};

// ===== TAX PREPARATION / VITA =====
const taxPartnerIds = ["irs-vita-training", "rise-tax-customer-service"];

const taxProgram: Program = {
  id: "prog-tax-vita",
  slug: "tax-preparation-vita",
  title: "Tax Preparation & IRS VITA Pathway",
  subtitle:
    "Prepare taxes, support families, and earn income during tax season.",
  description:
    "This pathway trains learners to support free tax preparation, IRS VITA standards, and basic individual tax prep. It blends IRS training modules, ethics, intake/interview skills, and real-world practice serving community members during tax season.",
  deliveryEngine: "NATIVE",
  salePrice: computeSalePrice(taxPartnerIds, 1.5),
  stripeProductId: undefined,
  stripePriceId: undefined,
  stripePriceIdPlan: undefined,
  partnerRequirements: taxPartnerIds.map((id) => ({
    partnerCourseId: id,
    required: true,
  })),
  isStateTuitionFunded: false,
  earnWhileYouLearnNotes:
    "Learners may support community members during tax season and can transition into paid seasonal or year-round tax prep roles.",
  visiblePublic: true,
};

export const allPrograms: Program[] = [
  cnaProgram,
  barberProgram,
  hvacProgram,
  cdlProgram,
  customerServiceProgram,
  itProgram,
  entrepreneurshipProgram,
  buildingMaintenanceProgram,
  taxProgram,
];

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
