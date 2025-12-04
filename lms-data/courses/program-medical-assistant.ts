import type { Course } from "@/types/course";

export const medicalAssistantCourse: Course = {
  id: "medical-assistant-001",
  slug: "medical-assistant",
  title: "Medical Assistant Certification Program",
  shortTitle: "Medical Assistant",
  credentialPartner: "OTHER",
  externalCredentialName: "Certified Medical Assistant (CMA)",
  description: "Comprehensive training program for aspiring medical assistants covering clinical and administrative skills.",
  hoursTotal: 240,
  deliveryMode: "HYBRID",
  locationLabel: "Multiple Locations",
  fundingEligible: ["WRG", "WIOA_ADULT", "WIOA_DW", "WEX", "SELF_PAY"],
  targetAudience: [
    "Healthcare career seekers",
    "Career changers",
    "Recent high school graduates",
  ],
  outcomes: [
    "Perform clinical procedures",
    "Manage patient records",
    "Assist physicians",
    "Handle medical billing",
    "Pass CMA certification exam",
  ],
  modules: [
    {
      id: "ma-mod-1",
      title: "Introduction to Medical Assisting",
      description: "Overview of the medical assistant role and healthcare environment",
      lessons: [
        {
          id: "ma-1-1",
          title: "Role of the Medical Assistant",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "ma-1-2",
          title: "Healthcare Settings",
          type: "video",
          durationMinutes: 30,
        },
        {
          id: "ma-1-3",
          title: "Professional Ethics",
          type: "reading",
          durationMinutes: 60,
        },
        {
          id: "ma-1-4",
          title: "Module 1 Quiz",
          type: "quiz",
          durationMinutes: 20,
        },
      ],
    },
    {
      id: "ma-mod-2",
      title: "Clinical Skills",
      description: "Essential clinical procedures and patient care",
      lessons: [
        {
          id: "ma-2-1",
          title: "Vital Signs",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "ma-2-2",
          title: "Vital Signs Lab",
          type: "lab",
          durationMinutes: 120,
        },
        {
          id: "ma-2-3",
          title: "Phlebotomy Basics",
          type: "video",
          durationMinutes: 60,
        },
        {
          id: "ma-2-4",
          title: "Phlebotomy Lab",
          type: "lab",
          durationMinutes: 180,
        },
      ],
    },
    {
      id: "ma-mod-3",
      title: "Administrative Skills",
      description: "Medical office management and documentation",
      lessons: [
        {
          id: "ma-3-1",
          title: "Medical Records Management",
          type: "reading",
          durationMinutes: 60,
        },
        {
          id: "ma-3-2",
          title: "Scheduling and Reception",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "ma-3-3",
          title: "Medical Billing Basics",
          type: "video",
          durationMinutes: 90,
        },
      ],
    },
    {
      id: "ma-mod-4",
      title: "Certification Preparation",
      description: "Prepare for CMA certification exam",
      lessons: [
        {
          id: "ma-4-1",
          title: "Exam Overview",
          type: "reading",
          durationMinutes: 30,
        },
        {
          id: "ma-4-2",
          title: "Practice Exam",
          type: "quiz",
          durationMinutes: 120,
        },
        {
          id: "ma-4-3",
          title: "Final Review",
          type: "reading",
          durationMinutes: 60,
        },
      ],
    },
  ],
  lmsPath: "/student/enroll/medical-assistant",
  isPublished: true,
};
