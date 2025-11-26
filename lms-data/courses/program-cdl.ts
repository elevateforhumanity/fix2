// lms-data/courses/program-cdl.ts

import type { Course } from "@/types/course";

export const cdlCourse: Course = {
  id: "cdl-001",
  slug: "cdl-class-a",
  title: "CDL Class A Driver Prep Program",
  shortTitle: "CDL Class A",
  credentialPartner: "OTHER",
  externalCredentialName: "CDL Class A License Prep",
  description:
    "This CDL Class A prep program helps you build the knowledge and confidence to pass your written and skills exams. You'll learn regulations, safety, vehicle inspection, and basic driving practices so you can pursue high-demand trucking careers.",
  hoursTotal: 200,
  deliveryMode: "HYBRID",
  locationLabel: "Online Theory + Partner Driving Yard",
  fundingEligible: ["WRG", "WIOA_ADULT", "WIOA_DW", "JRI", "WEX", "SELF_PAY"],
  targetAudience: [
    "Adults looking for high-paying driving careers",
    "Justice-involved individuals ready for a second chance opportunity",
    "People comfortable with travel and physical work",
  ],
  outcomes: [
    "Understand CDL regulations, hours-of-service, and safety rules.",
    "Perform a basic pre-trip inspection.",
    "Recognize and manage common driving hazards.",
    "Prepare for the CDL written exam.",
    "Prepare for the skills test with a partner driving provider.",
  ],
  modules: [
    {
      id: "cdl-mod-1",
      title: "CDL Basics & Regulations",
      description: "Learn what CDL Class A is and what it takes to get licensed.",
      lessons: [
        {
          id: "cdl-1-1",
          title: "CDL Overview & License Types",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "cdl-1-2",
          title: "Regulations & Hours-of-Service",
          type: "video",
          durationMinutes: 45,
        },
      ],
    },
    {
      id: "cdl-mod-2",
      title: "Safety & Vehicle Inspection",
      description:
        "Focus on safety-first driving and learning how to inspect your truck.",
      lessons: [
        {
          id: "cdl-2-1",
          title: "Pre-Trip Inspection Basics",
          type: "video",
          durationMinutes: 30,
        },
        {
          id: "cdl-2-2",
          title: "Safety, Hazards & Defensive Driving",
          type: "reading",
          durationMinutes: 45,
        },
      ],
    },
    {
      id: "cdl-mod-3",
      title: "Written Exam Prep & Skills Practice",
      description:
        "Strengthen your knowledge for the written test and coordinate skills training.",
      lessons: [
        {
          id: "cdl-3-1",
          title: "Practice Questions & Knowledge Check",
          type: "quiz",
          durationMinutes: 60,
        },
        {
          id: "cdl-3-2",
          title: "Partner Driving Practice Hours",
          type: "lab",
          durationMinutes: 240,
        },
      ],
    },
  ],
  lmsPath: "/student/enroll/cdl-class-a",
  isPublished: true,
};
