import type { PartnerCourse } from "@/types/partnerCourse";

// Example partner course definitions.
// Replace costs & descriptions with your real data from your repository.

export const partnerCourses: PartnerCourse[] = [
  {
    id: "hsi-cna-main",
    partnerSystem: "HSI",
    partnerCode: "HSI-CNA-CORE",
    title: "HSI / Choice Medical CNA Core Training",
    description: "Core CNA theory and skills preparation aligned to Indiana CNA exam.",
    hours: 80,
    baseCost: 300,
  },
  {
    id: "nationaldrug-basic",
    partnerSystem: "NATIONAL_DRUG",
    partnerCode: "ND-DFW-HEALTH",
    title: "Drug-Free Workplace Training for Healthcare",
    description: "Drug-free workplace & compliance module for healthcare roles.",
    hours: 4,
    baseCost: 40,
  },
  {
    id: "careersafe-cna-safety",
    partnerSystem: "CAREERSAFE",
    partnerCode: "CS-HEALTH-SAFETY",
    title: "CareerSafe Healthcare Safety Basics",
    description: "OSHA basics, infection control, and patient safety concepts.",
    hours: 8,
    baseCost: 60,
  },
  {
    id: "milady-barber-theory",
    partnerSystem: "MILADY",
    partnerCode: "MILADY-BARBER-ONLINE",
    title: "Milady Barbering Online Theory",
    description: "Core barber theory content delivered through Milady.",
    hours: 150,
    baseCost: 250,
  },
  {
    id: "nationaldrug-barber",
    partnerSystem: "NATIONAL_DRUG",
    partnerCode: "ND-DFW-BEAUTY",
    title: "Drug-Free Workplace Training for Barber/Beauty",
    description: "Drug-free workplace module geared toward salon/barber environments.",
    hours: 2,
    baseCost: 35,
  }
];

export function getPartnerCourseById(id: string): PartnerCourse | undefined {
  return partnerCourses.find((c) => c.id === id);
}
