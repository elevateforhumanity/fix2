// lms-data/courses/program-hvac.ts

import type { Course } from "@/types/course";

export const hvacCourse: Course = {
  id: "hvac-001",
  slug: "hvac-technician",
  title: "HVAC Technician Training",
  shortTitle: "HVAC Technician",
  credentialPartner: "OTHER",
  externalCredentialName: "Entry-Level HVAC Technician Certification Prep",
  description:
    "This HVAC program helps you build real-world skills in heating, ventilation, and air conditioning. You'll learn safety, tools, troubleshooting, and basic installation so you can step into entry-level technician roles and apprenticeships.",
  hoursTotal: 300,
  deliveryMode: "HYBRID",
  locationLabel: "Indianapolis Training Center & On-the-Job Practice",
  fundingEligible: ["WRG", "WIOA_ADULT", "WIOA_DW", "WEX", "APPRENTICESHIP", "SELF_PAY"],
  targetAudience: [
    "Adults interested in skilled trades",
    "Justice-involved individuals seeking a career in construction trades",
    "People who like hands-on, technical work and problem-solving",
  ],
  outcomes: [
    "Understand basic HVAC systems, components, and operation.",
    "Use common HVAC tools safely and correctly.",
    "Follow safety and environmental guidelines, including refrigerant handling basics.",
    "Assist with installation, maintenance, and basic troubleshooting.",
    "Prepare for entry-level HVAC employment or apprenticeship pathways.",
  ],
  modules: [
    {
      id: "hvac-mod-1",
      title: "HVAC Safety & Tools",
      description: "Start with safety, PPE, tool use, and job site expectations.",
      lessons: [
        {
          id: "hvac-1-1",
          title: "Jobsite Safety & PPE",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "hvac-1-2",
          title: "Hand & Power Tools Overview",
          type: "video",
          durationMinutes: 30,
        },
        {
          id: "hvac-1-3",
          title: "Safety & Tools Practice Lab",
          type: "lab",
          durationMinutes: 90,
        },
      ],
    },
    {
      id: "hvac-mod-2",
      title: "HVAC Fundamentals",
      description:
        "Get familiar with how heating, cooling, and ventilation systems work in real buildings.",
      lessons: [
        {
          id: "hvac-2-1",
          title: "Basic HVAC Concepts",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "hvac-2-2",
          title: "Airflow, Ductwork & Filters",
          type: "video",
          durationMinutes: 30,
        },
        {
          id: "hvac-2-3",
          title: "Fundamentals Knowledge Check",
          type: "quiz",
          durationMinutes: 30,
        },
      ],
    },
    {
      id: "hvac-mod-3",
      title: "Hands-On Practice & Troubleshooting",
      description:
        "Apply classroom learning during lab time and supervised troubleshooting practice.",
      lessons: [
        {
          id: "hvac-3-1",
          title: "Basic Maintenance Tasks",
          type: "lab",
          durationMinutes: 180,
        },
        {
          id: "hvac-3-2",
          title: "Intro to Troubleshooting",
          type: "lab",
          durationMinutes: 120,
        },
      ],
    },
  ],
  lmsPath: "/student/enroll/hvac-technician",
  isPublished: true,
};
