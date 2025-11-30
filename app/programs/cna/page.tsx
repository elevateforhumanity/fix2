import { ProgramPageLayout } from "@/components/layouts/ProgramPageLayout";

export const metadata = {
  title: "CNA – Certified Nursing Assistant Program | Elevate For Humanity",
  description:
    "Train as a Certified Nursing Assistant (CNA) and support patients with daily care in hospitals, long-term care, and home health settings.",
};

export default function CnaPage() {
  return (
    <ProgramPageLayout
      title="CNA – Certified Nursing Assistant"
      subtitle="CNAs are the heart of patient care. In this program you'll learn how to safely support patients with mobility, hygiene, meals, and daily activities—while building the communication skills to support families and nursing staff."
      badge="Healthcare • Entry point into nursing"
      duration="4–8 weeks (state-approved CNA training partner)"
      schedule="Flexible day, evening, and weekend cohorts"
      location="Classroom, skills lab, and supervised clinicals"
      fundingTags={[
        "WIOA Eligible (for qualified students)",
        "Partner-funded clinicals",
        "Bridge into other healthcare pathways",
      ]}
      salaryRange="$14–$20/hour starting, depending on facility"
      jobTitles={[
        "Certified Nursing Assistant (CNA)",
        "Patient Care Tech (PCT)",
        "Nurse Aide",
      ]}
      outcomes={[
        "Hands-on training in safe transfers, bathing, feeding, and vital signs",
        "Understanding of patient rights, dignity, and communication",
        "Preparation for the state-approved CNA exam through our training partner",
        "Experience working alongside licensed nurses and healthcare teams",
      ]}
      idealFor={[
        "Compassionate people who want to be close to direct patient care",
        "Anyone exploring nursing, LPN, or other healthcare careers in the future",
        "People who prefer active, on-your-feet work over sitting at a desk",
      ]}
      steps={[
        "Complete your Elevate For Humanity application online.",
        "Connect with our staff to confirm CNA training schedule options.",
        "Work with a coach to complete WIOA or other funding paperwork.",
        "Attend orientation, then begin classes with our CNA training partner.",
        "Complete clinicals, sit for your CNA exam, and connect with hiring partners.",
      ]}
      faq={[
        {
          question: "Will this program prepare me for the state CNA exam?",
          answer:
            "Yes. Training is delivered with a state-approved CNA training partner and is aligned with exam requirements.",
        },
        {
          question: "Can I work while I'm in the program?",
          answer:
            "Many students work while in training. Your coach will help you look at your schedule and choose a cohort that makes sense for your life.",
        },
      ]}
    />
  );
}
