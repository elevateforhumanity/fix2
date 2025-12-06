import { Metadata } from "next";
import ProgramLandingPage from "@/components/templates/ProgramLandingPage";

export const metadata: Metadata = {
  title: "HVAC Technician Training | Elevate for Humanity",
  description: "Hands-on HVAC training with EPA 608 certification prep. Connect to employers hiring in Marion County through workforce grants and employer sponsors.",
  openGraph: {
    title: "HVAC Technician Training | Elevate for Humanity",
    description: "Hands-on HVAC training with EPA 608 certification prep and job placement support.",
    images: ["/images/programs-new/program-16.jpg"],
    type: "website",
  },
};

export default function HVACTechnicianPage() {
  return (
    <ProgramLandingPage
      category="Skilled Trades • High-Demand"
      title="HVAC Technician Training"
      description="Hands-on training in heating, ventilation, and air conditioning systems with direct connections to employers that are hiring in Marion County."
      duration="4–9 months"
      fundingTags={["Workforce Grants", "Employer Sponsors"]}
      format="Lab + Field"
      imageSrc="/images/programs-new/program-16.jpg"
      imageAlt="Learners working with HVAC equipment"
      programSlug="hvac-technician"
      whoThisIsFor={{
        description: "Adults who want a skilled trade career with stable income, including career changers and re-entry talent ready for a fresh start.",
        bullets: [
          "No prior HVAC experience required",
          "Comfortable with hands-on, technical work",
          "Willing to pass employer screenings and show up consistently",
        ],
      }}
      whatYouLearn={[
        "HVAC safety, tools, and core systems",
        "Residential and light commercial troubleshooting",
        "EPA 608 certification prep (required for refrigerant handling)",
        "Customer communication and soft skills",
        "How to prepare for employer interviews and certifications",
      ]}
      howItWorks={[
        {
          step: 1,
          title: "Apply with Elevate",
          description: "We review your goals and barriers.",
        },
        {
          step: 2,
          title: "Get matched to funding",
          description: "WRG, WIOA, or employer sponsors.",
        },
        {
          step: 3,
          title: "Start training",
          description: "You attend lab + field with partner schools.",
        },
        {
          step: 4,
          title: "Connect to employers",
          description: "We help with interviews and placement.",
        },
      ]}
      fundingOptions={[
        "Workforce Ready Grants",
        "WIOA funding (partner workforce boards)",
        "Employer-sponsored training pathways",
        "Barrier support (transportation, childcare referrals, etc.)",
      ]}
      fundingNote="Elevate For Humanity is the front door – we help you navigate approvals with WorkOne, EmployIndy, and partner programs so you're not doing it alone."
      schedule="Flexible scheduling with day and evening options. Hands-on lab work combined with field experience."
      whatHappensAfter="Upon completion, you'll be connected to HVAC contractors and service companies hiring in the Indianapolis area. Many graduates start as apprentices or junior technicians."
    />
  );
}
