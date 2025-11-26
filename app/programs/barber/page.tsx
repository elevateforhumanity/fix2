import { ProgramPageShell } from "@/components/programs/ProgramPageShell";
import { Card } from "@/components/ui/Card";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Barber Apprenticeship Program - Earn While You Learn",
  description: "State-approved barber apprenticeship training in real barbershops. Earn while you learn toward your barber license. WIOA-funded, 1-2 years.",
  keywords: ["barber apprenticeship", "barber training", "barber license", "earn while you learn", "WIOA barber program"],
  openGraph: {
    title: "Barber Apprenticeship Program | Elevate for Humanity",
    description: "State-approved barber apprenticeship. Earn while you learn toward your barber license in real barbershops.",
    images: ["/images/programs-new/program-7.jpg"],
    type: "website",
  },
};

export default function BarberProgramPage() {
  return (
    <ProgramPageShell
      title="Barber Apprenticeship"
      subtitle="Train in a real barbershop while working toward your state license."
      blurb="Elevate partners with approved barbershops and academies so you can earn while you learn under a state-registered apprenticeship—one of only a handful of sponsored barber apprenticeships in the state."
      credential="State-approved barber apprenticeship toward licensure"
      duration="Approx. 1–2 years (hours based)"
      schedule="Shop-based; days and times set with your sponsor shop"
      location="Partner barbershops and academies in Indiana"
      funding="Apprenticeship model with potential workforce funding support."
      audience="Individuals serious about a long-term career in barbering, customer service, and entrepreneurship."
      outcomes={[
        "Develop core cutting, lining, and grooming skills under supervision",
        "Build real client relationships and service habits in a live shop",
        "Track hours and competencies toward state licensing requirements",
        "Understand shop professionalism, sanitation, and basic business operations",
      ]}
      highlights={[
        "Earn while you learn in a real barbershop environment",
        "One of only a few sponsored barber apprenticeships in the state",
        "Pathway to licensure and eventually owning your own chair or shop",
      ]}
      employerNotes="Register as a sponsor shop to train future licensed barbers in-house and build a reliable pipeline of talent that understands your culture and standards."
      applyHref="/apply?program=barber-apprenticeship"
    >
      <Card className="p-5 md:p-6 space-y-3">
        <h3 className="text-lg font-semibold text-slate-900">
          What the apprenticeship looks like
        </h3>
        <ul className="text-sm text-slate-700 space-y-1">
          <li>• On-the-job training inside a partnering barbershop</li>
          <li>• Related instruction through an approved education partner</li>
          <li>• Hour tracking and competency checks toward licensing</li>
          <li>• Support from Elevate around workforce and wrap-around resources</li>
        </ul>
      </Card>
    </ProgramPageShell>
  );
}
