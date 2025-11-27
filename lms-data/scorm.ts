export interface ScormPackage {
  id: string;             // internal ID, used in URLs
  slug: string;           // human-readable slug
  title: string;
  description: string;
  programId?: string;     // optional link to a Program.id
  launchUrl: string;      // path under /public, e.g. /scorm/jri/module-1/index.html
  provider: "jri" | "milady" | "hsi" | "career-safe" | "custom";
  order: number;
  visibleToStudents: boolean;
}

/**
 * SCORM package catalog.
 * NOTE: After you unzip your JRI SCORM zips, make sure the folder names + index paths
 * match the launchUrl values below (you can rename folders to keep it clean).
 */
export const scormPackages: ScormPackage[] = [
  {
    id: "jri-module-1",
    slug: "jri-job-ready-indy-module-1",
    title: "JRI Module 1 – Career Readiness Foundations",
    description:
      "Job Ready Indy module focused on basic employability skills, expectations, and mindset for work.",
    programId: "prog-tax-vita", // example: also relevant for customer service & other programs
    launchUrl: "/scorm/jri/module-1/index.html",
    provider: "jri",
    order: 1,
    visibleToStudents: true,
  },
  {
    id: "jri-module-2",
    slug: "jri-job-ready-indy-module-2",
    title: "JRI Module 2 – Communication & Professionalism",
    description:
      "Building communication, professionalism, and workplace behavior skills.",
    programId: "prog-customer-service-contact-center",
    launchUrl: "/scorm/jri/module-2/index.html",
    provider: "jri",
    order: 2,
    visibleToStudents: true,
  },
  {
    id: "jri-module-3",
    slug: "jri-job-ready-indy-module-3",
    title: "JRI Module 3 – Problem Solving & Teamwork",
    description:
      "Focus on teamwork, conflict resolution, and problem-solving in real workplaces.",
    programId: "prog-business-technician-apprenticeship",
    launchUrl: "/scorm/jri/module-3/index.html",
    provider: "jri",
    order: 3,
    visibleToStudents: true,
  },
  {
    id: "jri-module-4",
    slug: "jri-job-ready-indy-module-4",
    title: "JRI Module 4 – Financial Literacy & Planning",
    description:
      "Intro to budgeting, paychecks, and financial decisions for young workers.",
    programId: "prog-tax-vita",
    launchUrl: "/scorm/jri/module-4/index.html",
    provider: "jri",
    order: 4,
    visibleToStudents: true,
  },
  {
    id: "jri-module-5",
    slug: "jri-job-ready-indy-module-5",
    title: "JRI Module 5 – Digital Skills & Safety",
    description:
      "Digital basics, online professionalism, and staying safe using technology at work.",
    programId: "prog-it-support-helpdesk",
    launchUrl: "/scorm/jri/module-5/index.html",
    provider: "jri",
    order: 5,
    visibleToStudents: true,
  },
  {
    id: "jri-module-6",
    slug: "jri-job-ready-indy-module-6",
    title: "JRI Module 6 – Job Search & Next Steps",
    description:
      "Job search, interviewing, and planning the next step after training.",
    programId: "prog-customer-service-contact-center",
    launchUrl: "/scorm/jri/module-6/index.html",
    provider: "jri",
    order: 6,
    visibleToStudents: true,
  },
  {
    id: "jri-module-7",
    slug: "jri-job-ready-indy-module-7",
    title: "JRI Module 7 – Workplace Rights & Responsibilities",
    description:
      "Understanding basic rights, responsibilities, and protections at work.",
    programId: "prog-business-ems-apprenticeship",
    launchUrl: "/scorm/jri/module-7/index.html",
    provider: "jri",
    order: 7,
    visibleToStudents: true,
  },
  {
    id: "jri-module-8",
    slug: "jri-job-ready-indy-module-8",
    title: "JRI Module 8 – Capstone & Reflection",
    description:
      "Capstone reflections tying together all JRI skills and planning the next move.",
    programId: undefined,
    launchUrl: "/scorm/jri/module-8/index.html",
    provider: "jri",
    order: 8,
    visibleToStudents: true,
  },
];

export function getScormPackageById(id: string): ScormPackage | undefined {
  return scormPackages.find((pkg) => pkg.id === id);
}

export function getVisibleScormPackages() {
  return scormPackages
    .filter((pkg) => pkg.visibleToStudents)
    .sort((a, b) => a.order - b.order);
}
