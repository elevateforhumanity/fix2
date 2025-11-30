import { ProgramPageLayout } from "@/components/layouts/ProgramPageLayout";

export const metadata = {
  title: "Medical Assistant Program | Elevate For Humanity",
  description:
    "Train as a Medical Assistant with hands-on classroom and clinical experience. Free tuition for eligible students through WIOA, WRG, and partner funding.",
};

export default function MedicalAssistantPage() {
  return (
    <ProgramPageLayout
      title="Medical Assistant"
      subtitle="Support doctors, nurses, and patients in clinics, doctor's offices, and specialty practices. This hands-on program blends clinical skills, front office skills, and patient communication so you're ready for day one on the job."
      badge="Healthcare • High-demand career"
      duration="4–6 months (varies by cohort)"
      schedule="Day and evening options"
      location="In-person labs plus blended online learning"
      fundingTags={[
        "WIOA Eligible (for qualified students)",
        "Workforce Ready Grant (WRG) Eligible",
        "Employer & apprenticeship pathways",
      ]}
      salaryRange="$15–$21/hour starting, depending on employer"
      jobTitles={[
        "Medical Assistant",
        "Clinical Assistant",
        "Front Desk Medical Receptionist",
        "Patient Care Coordinator",
      ]}
      outcomes={[
        "Foundational knowledge of anatomy, vital signs, and basic clinical procedures",
        "Hands-on practice with patient intake, rooming, and documentation",
        "Experience with basic EHR (Electronic Health Record) workflows",
        "Professional communication skills for patients, nurses, and providers",
        "Preparation for industry-recognized Medical Assistant credentials (where applicable)",
      ]}
      idealFor={[
        "People who enjoy helping others and want to work in healthcare",
        "Parents and caregivers looking for a career that can grow over time",
        "People who like structure, routines, and being part of a medical team",
        "Anyone who wants a healthcare career without starting with years of college debt",
      ]}
      steps={[
        "Complete the short online application so we can get to know you.",
        "Meet with a career coach to confirm your goals and funding eligibility.",
        "Submit documents required for WIOA/WRG or other funding programs.",
        "Attend orientation, receive your class schedule, and meet your support team.",
        "Begin class and stay connected with your career coach and case manager for support.",
      ]}
      faq={[
        {
          question: "Do I need prior healthcare experience?",
          answer:
            "No. This program is designed for beginners. We'll meet you where you are and help you build skills step by step.",
        },
        {
          question: "Is the program really free?",
          answer:
            "For students who qualify for WIOA, WRG, or partner funding, tuition is fully covered. We'll walk you through eligibility and paperwork so you understand your options.",
        },
        {
          question: "Will you help me find a job?",
          answer:
            "Yes. Our career center supports you with resume building, interview prep, and job connections with local healthcare employers.",
        },
      ]}
    />
  );
}
