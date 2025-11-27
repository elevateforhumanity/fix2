import { getTuitionForProgram, type FundingFlag } from "@/lms-data/tuition";

export type PaymentOptionType = "pay_in_full" | "installments";

export interface PaymentOption {
  id: string;
  label: string;
  type: PaymentOptionType;
  description?: string;
  displayAmount: string;
  fundingNotes?: string;
  paymentUrl?: string;
}

export interface ProgramPaymentConfig {
  programId: string;
  options: PaymentOption[];
  defaultOptionId?: string;
}

export const programPaymentConfigs: ProgramPaymentConfig[] = [
  {
    programId: "prog-cna",
    options: [
      {
        id: "cna-full",
        label: "Pay in Full",
        type: "pay_in_full",
        displayAmount: "$3,000 – $5,500 (varies by partner)",
        fundingNotes:
          "Often paired with WRG + JRI + employer support. Use this for private pay or when grant is covering most of the cost.",
      },
      {
        id: "cna-plan",
        label: "Payment Plan",
        type: "installments",
        displayAmount: "Example: $250–$350/month",
        fundingNotes:
          "Use when learner does not qualify for full WRG coverage or when employer is cost-sharing.",
      },
    ],
    defaultOptionId: "cna-full",
  },
  {
    programId: "prog-barber",
    options: [
      {
        id: "barber-full",
        label: "FREE Apprenticeship",
        type: "pay_in_full",
        displayAmount: "FREE - Earn while you learn",
        fundingNotes:
          "Barber apprenticeship where you earn wages in the shop while completing your hours. No tuition cost.",
      },
    ],
    defaultOptionId: "barber-full",
  },
  {
    programId: "prog-tax-vita",
    options: [
      {
        id: "tax-core",
        label: "Program Fee (Wraparound Training)",
        type: "pay_in_full",
        displayAmount: "$0–$750 (depends on employer and grant support)",
        fundingNotes:
          "Core IRS VITA curriculum is free; Elevate may charge for wraparound training, coaching, and placement support.",
      },
    ],
  },
];

export function getPaymentConfigForProgram(programId: string): ProgramPaymentConfig | undefined {
  return programPaymentConfigs.find((cfg) => cfg.programId === programId);
}

export function getFundingFlagsForProgram(programId: string): FundingFlag[] {
  const tuition = getTuitionForProgram(programId);
  return tuition?.fundingFlags ?? [];
}
