// lms-data/courses/program-building-tech.ts

import type { Course } from "@/types/course";

export const buildingTechCourse: Course = {
  id: "btech-001",
  slug: "building-maintenance-technician",
  title: "Building Maintenance Technician",
  shortTitle: "Building Tech",
  credentialPartner: "NONE",
  externalCredentialName: "Entry-Level Building Maintenance Training",
  description:
    "The Building Maintenance Technician program prepares you to support property managers, maintenance teams, and facilities departments. You'll learn basic repairs, safety, and customer service to support apartments, schools, and commercial buildings.",
  hoursTotal: 240,
  deliveryMode: "HYBRID",
  locationLabel: "On-Site Labs + Online Theory",
  fundingEligible: ["WRG", "WIOA_ADULT", "WIOA_DW", "WEX", "SELF_PAY"],
  targetAudience: [
    "Adults interested in hands-on facility work",
    "Individuals transitioning from construction or general labor",
    "Justice-involved learners ready to re-enter the workforce",
  ],
  outcomes: [
    "Perform basic repair and maintenance tasks safely.",
    "Identify common building systems (electrical, plumbing, HVAC).",
    "Communicate professionally with tenants and supervisors.",
    "Use common tools and materials for building upkeep.",
    "Prepare for entry-level building maintenance roles.",
  ],
  modules: [
    {
      id: "btech-mod-1",
      title: "Safety & Tools for Building Techs",
      description: "Learn essential safety practices and how to use the tools of the trade.",
      lessons: [
        {
          id: "btech-1-1",
          title: "Workplace Safety & PPE",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "btech-1-2",
          title: "Hand & Power Tools Basics",
          type: "lab",
          durationMinutes: 90,
        },
      ],
    },
    {
      id: "btech-mod-2",
      title: "Building Systems Overview",
      description:
        "Explore how electrical, plumbing, and HVAC systems work together in a building.",
      lessons: [
        {
          id: "btech-2-1",
          title: "Electrical & Lighting Basics",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "btech-2-2",
          title: "Plumbing & Fixtures",
          type: "video",
          durationMinutes: 30,
        },
        {
          id: "btech-2-3",
          title: "HVAC & Ventilation Introduction",
          type: "video",
          durationMinutes: 30,
        },
      ],
    },
    {
      id: "btech-mod-3",
      title: "Customer Service & Work Orders",
      description:
        "Connect technical skills with good communication and documentation habits.",
      lessons: [
        {
          id: "btech-3-1",
          title: "Work Orders & Documentation",
          type: "reading",
          durationMinutes: 30,
        },
        {
          id: "btech-3-2",
          title: "Customer Service & Professionalism",
          type: "video",
          durationMinutes: 30,
        },
      ],
    },
  ],
  lmsPath: "/student/enroll/building-maintenance-technician",
  isPublished: true,
};
