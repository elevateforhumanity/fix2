// lms-data/courses/program-barber-apprenticeship.ts

import type { Course } from "@/types/course";

export const barberApprenticeshipCourse: Course = {
  id: "barber-001",
  slug: "barber-apprenticeship",
  title: "Barber Apprenticeship Program",
  shortTitle: "Barber Apprenticeship",
  credentialPartner: "MILADY",
  externalCredentialName: "State Barber License (Apprenticeship Pathway)",
  description:
    "This barber apprenticeship combines on-the-job training and related classroom instruction to prepare you for your state barber licensing exam. You will build strong technical skills, client service, and business knowledge in a real barbershop environment.",
  hoursTotal: 1500, // adjust to your state requirement
  deliveryMode: "HYBRID",
  locationLabel: "Partner Barbershops & Elevate For Humanity Training Labs",
  fundingEligible: ["APPRENTICESHIP", "JRI", "WEX", "SELF_PAY"],
  targetAudience: [
    "Adults interested in the barbering trade",
    "Justice-involved individuals seeking a skilled career",
    "Entrepreneurs who want to own a barbershop",
  ],
  outcomes: [
    "Perform professional haircuts, shaves, and grooming services.",
    "Apply sanitation and safety standards to protect clients and yourself.",
    "Develop strong customer service and client retention skills.",
    "Understand barbering laws and rules for your state.",
    "Prepare to sit for your state barber licensing exam.",
  ],
  modules: [
    {
      id: "barber-mod-1",
      title: "Barbering Foundations",
      description:
        "Get grounded in the history of barbering, basic tools, and professional expectations.",
      lessons: [
        {
          id: "barber-1-1",
          title: "History & Evolution of Barbering",
          type: "reading",
          durationMinutes: 45,
          partnerRefCode: "MILADY-Barber-Ch1",
        },
        {
          id: "barber-1-2",
          title: "Tools, Equipment, and Safety",
          type: "video",
          durationMinutes: 30,
          partnerRefCode: "MILADY-Barber-Ch2",
        },
      ],
    },
    {
      id: "barber-mod-2",
      title: "Sanitation, Safety & Laws",
      description:
        "Learn bloodborne pathogens, disinfection, and state rules to keep your license safe.",
      lessons: [
        {
          id: "barber-2-1",
          title: "Infection Control & Disinfection",
          type: "reading",
          durationMinutes: 45,
          partnerRefCode: "MILADY-Barber-Ch3",
        },
        {
          id: "barber-2-2",
          title: "State Board Rules & Regulations",
          type: "reading",
          durationMinutes: 45,
        },
        {
          id: "barber-2-3",
          title: "Sanitation Skills Lab",
          type: "lab",
          durationMinutes: 60,
        },
      ],
    },
    {
      id: "barber-mod-3",
      title: "Cutting, Shaving & Styling",
      description:
        "Practice the core hands-on skills of barbering with live models and mannequins.",
      lessons: [
        {
          id: "barber-3-1",
          title: "Clipper Cuts & Fades",
          type: "lab",
          durationMinutes: 180,
        },
        {
          id: "barber-3-2",
          title: "Shear Work & Blending",
          type: "lab",
          durationMinutes: 180,
        },
        {
          id: "barber-3-3",
          title: "Shaving & Facial Hair Design",
          type: "lab",
          durationMinutes: 120,
        },
      ],
    },
    {
      id: "barber-mod-4",
      title: "Apprenticeship Hours & Business Skills",
      description:
        "Complete your apprenticeship hours and build foundational barbershop business skills.",
      lessons: [
        {
          id: "barber-4-1",
          title: "Customer Service & Client Experience",
          type: "video",
          durationMinutes: 30,
        },
        {
          id: "barber-4-2",
          title: "Apprenticeship On-the-Job Hours",
          type: "lab",
          durationMinutes: 1300, // example placeholder, match your requirement
        },
      ],
    },
  ],
  lmsPath: "/student/enroll/barber-apprenticeship",
  isPublished: true,
};
