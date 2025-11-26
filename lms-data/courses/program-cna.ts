// lms-data/courses/program-cna.ts

import type { Course } from "@/types/course";

export const cnaCourse: Course = {
  id: "cna-001",
  slug: "certified-nursing-assistant",
  title: "Certified Nursing Assistant (CNA)",
  shortTitle: "CNA",
  credentialPartner: "CHOICE_MEDICAL",
  externalCredentialName: "State-Approved CNA Certification",
  description:
    "This hands-on CNA program prepares you to work in long-term care, home health, hospitals, and other healthcare settings. You will build the skills to safely care for patients, support nurses, and qualify for state certification testing.",
  hoursTotal: 105, // adjust to your exact breakdown
  deliveryMode: "HYBRID",
  locationLabel: "Indianapolis Training Center",
  fundingEligible: ["WRG", "WIOA_ADULT", "WIOA_YOUTH", "WIOA_DW", "WEX", "SELF_PAY"],
  targetAudience: [
    "Adults seeking a healthcare career",
    "Youth 18–24 starting in medical careers",
    "Justice-involved individuals ready to re-enter the workforce",
  ],
  outcomes: [
    "Provide safe, respectful bedside care to patients and residents.",
    "Assist with daily living activities including bathing, dressing, and feeding.",
    "Measure and record vital signs accurately.",
    "Communicate effectively with nurses, patients, and families.",
    "Prepare to sit for the state-approved CNA certification exam.",
  ],
  modules: [
    {
      id: "cna-mod-1",
      title: "Introduction to Healthcare & CNA Role",
      description:
        "Understand the healthcare system, the CNA scope of practice, and professional expectations.",
      lessons: [
        {
          id: "cna-1-1",
          title: "Healthcare Settings and the CNA Role",
          type: "reading",
          durationMinutes: 45,
          partnerRefCode: "CMI-Ch1",
        },
        {
          id: "cna-1-2",
          title: "Legal and Ethical Responsibilities",
          type: "reading",
          durationMinutes: 45,
          partnerRefCode: "CMI-Ch2",
        },
        {
          id: "cna-1-3",
          title: "Professionalism and Communication",
          type: "video",
          durationMinutes: 30,
        },
      ],
    },
    {
      id: "cna-mod-2",
      title: "Infection Control & Safety",
      description:
        "Learn infection prevention, handwashing, PPE, and keeping yourself and residents safe.",
      lessons: [
        {
          id: "cna-2-1",
          title: "Infection Control Basics",
          type: "reading",
          durationMinutes: 45,
          partnerRefCode: "CMI-Ch3",
        },
        {
          id: "cna-2-2",
          title: "Hand Hygiene & PPE Skills Lab",
          type: "lab",
          durationMinutes: 60,
        },
        {
          id: "cna-2-3",
          title: "Safety, Falls, and Emergency Procedures",
          type: "video",
          durationMinutes: 30,
        },
      ],
    },
    {
      id: "cna-mod-3",
      title: "Basic Nursing Skills & Vital Signs",
      description:
        "Practice measuring and recording vital signs and assisting with daily patient care.",
      lessons: [
        {
          id: "cna-3-1",
          title: "Measuring Vital Signs",
          type: "reading",
          durationMinutes: 45,
          partnerRefCode: "CMI-Ch4",
        },
        {
          id: "cna-3-2",
          title: "Vital Signs Skills Check",
          type: "lab",
          durationMinutes: 90,
        },
        {
          id: "cna-3-3",
          title: "CNA Skills Practice Quiz",
          type: "quiz",
          durationMinutes: 30,
        },
      ],
    },
    {
      id: "cna-mod-4",
      title: "Clinical Experience",
      description:
        "Supervised clinical hours in a healthcare facility to practice CNA skills with real patients.",
      lessons: [
        {
          id: "cna-4-1",
          title: "Clinical Orientation",
          type: "reading",
          durationMinutes: 30,
        },
        {
          id: "cna-4-2",
          title: "Clinical Rotation (On-Site Hours)",
          type: "lab",
          durationMinutes: 480, // example: 8 x 6-hour days; adjust to your requirement
        },
      ],
    },
  ],
  lmsPath: "/student/enroll/certified-nursing-assistant",
  isPublished: true,
};
