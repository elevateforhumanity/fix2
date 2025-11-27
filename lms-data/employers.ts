import { allPrograms } from "@/lms-data/programs";
import { getFundingForProgram } from "@/lms-data/funding";

export type WorkBasedType = "wex" | "ojt" | "apprenticeship" | "hire-only";

export interface EmployerFacingOpportunity {
  id: string;
  programId: string;
  workBasedTypes: WorkBasedType[];
  idealRoles: string[];
  typicalHoursPerWeek: number;
  typicalDurationWeeks: number;
  notesForEmployer: string;
}

export interface PlacementRecord {
  id: string;
  learnerName: string;
  employerName: string;
  programId: string;
  workBasedType: WorkBasedType;
  status: "screening" | "active" | "completed" | "on-hold";
  startDate?: string;
  endDate?: string;
  hoursCompleted?: number;
  notes?: string;
}

/**
 * Employer-facing opportunities:
 * Think of these as "menus" for what employers can host with Elevate.
 */
export const employerOpportunities: EmployerFacingOpportunity[] = [
  {
    id: "opp-customer-service-wex-ojt",
    programId: "prog-customer-service-contact-center",
    workBasedTypes: ["wex", "ojt"],
    idealRoles: ["Front desk", "Call center rep", "Customer support"],
    typicalHoursPerWeek: 20,
    typicalDurationWeeks: 4,
    notesForEmployer:
      "Great for trying out new talent in customer-facing roles. Start with WEX to build confidence, then convert strong performers to OJT or hire.",
  },
  {
    id: "opp-it-support-ojt",
    programId: "prog-it-support-helpdesk",
    workBasedTypes: ["ojt", "hire-only"],
    idealRoles: ["IT helpdesk", "Desktop support", "Junior support tech"],
    typicalHoursPerWeek: 30,
    typicalDurationWeeks: 12,
    notesForEmployer:
      "Ideal for employers who can hire into real IT roles and want wage reimbursement while new staff learns the environment.",
  },
  {
    id: "opp-hvac-apprenticeship",
    programId: "prog-hvac-technician",
    workBasedTypes: ["apprenticeship"],
    idealRoles: ["HVAC helper", "Maintenance tech apprentice"],
    typicalHoursPerWeek: 30,
    typicalDurationWeeks: 24,
    notesForEmployer:
      "Structured earn-while-you-learn model. Learners build hands-on skills under your licensed techs while progressing through Elevate coursework.",
  },
  {
    id: "opp-building-tech-apprenticeship",
    programId: "prog-building-technician-apprenticeship",
    workBasedTypes: ["apprenticeship"],
    idealRoles: ["Building maintenance apprentice", "Facilities helper"],
    typicalHoursPerWeek: 25,
    typicalDurationWeeks: 24,
    notesForEmployer:
      "Matches learners with properties, facilities, and maintenance teams for long-term skills growth.",
  },
  {
    id: "opp-barber-beauty-apprenticeship",
    programId: "prog-barber",
    workBasedTypes: ["apprenticeship"],
    idealRoles: ["Barber apprentice", "Shop assistant"],
    typicalHoursPerWeek: 20,
    typicalDurationWeeks: 26,
    notesForEmployer:
      "Designed for barber shops that want to grow their own talent while learners complete required hours toward licensure.",
  },
  {
    id: "opp-nails-esthetics-apprenticeship",
    programId: "prog-nail-technician-apprenticeship",
    workBasedTypes: ["apprenticeship"],
    idealRoles: ["Nail tech apprentice", "Salon assistant"],
    typicalHoursPerWeek: 20,
    typicalDurationWeeks: 26,
    notesForEmployer:
      "Great fit for salons/spas wanting to develop long-term nail or esthetics talent.",
  },
  {
    id: "opp-tax-vita-wex",
    programId: "prog-tax-vita",
    workBasedTypes: ["wex", "hire-only"],
    idealRoles: ["Tax intake support", "Client service assistant"],
    typicalHoursPerWeek: 10,
    typicalDurationWeeks: 8,
    notesForEmployer:
      "Pairs with IRS VITA training and Intuit/Link & Learn coursework; ideal for seasonal roles or community-based tax sites.",
  },
];

/**
 * Example placement records (for layout/demo only).
 * Later, these can come from Supabase or another database.
 */
export const samplePlacements: PlacementRecord[] = [
  {
    id: "plc-001",
    learnerName: "Sample Learner A",
    employerName: "Sample Employer – Call Center",
    programId: "prog-customer-service-contact-center",
    workBasedType: "wex",
    status: "active",
    startDate: "2025-10-01",
    hoursCompleted: 40,
    notes: "Strong attendance; candidate for OJT conversion.",
  },
  {
    id: "plc-002",
    learnerName: "Sample Learner B",
    employerName: "Sample Employer – IT Services",
    programId: "prog-it-support-helpdesk",
    workBasedType: "ojt",
    status: "screening",
    notes: "Interview scheduled; pending hiring decision.",
  },
  {
    id: "plc-003",
    learnerName: "Sample Learner C",
    employerName: "Sample Employer – HVAC & Mechanical",
    programId: "prog-hvac-technician",
    workBasedType: "apprenticeship",
    status: "completed",
    startDate: "2025-05-01",
    endDate: "2025-10-30",
    hoursCompleted: 520,
    notes: "Completed apprenticeship hours; hired full-time.",
  },
];

export function getEmployerOpportunitiesWithDetails() {
  return employerOpportunities.map((opp) => {
    const program = allPrograms.find((p) => p.id === opp.programId);
    const funding = getFundingForProgram(opp.programId);

    return {
      ...opp,
      program,
      funding,
    };
  });
}
