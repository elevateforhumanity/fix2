// app/programs/patient-care-technician/page.tsx
import { ProgramTemplate } from "@/components/marketing/ProgramTemplate";
import { programsData } from "@/lib/program-data";
import type { Metadata } from "next";

const programData = programsData["patient-care-technician"];

export const metadata: Metadata = {
  openGraph: { images: ["/images/team-new/team-11.jpg"] },
  title: `${programData.name} Training Program | Elevate For Humanity`,
  description: programData.description,
  keywords: [`${programData.name.toLowerCase()} training`, "free healthcare training", "WIOA program", "Marion County"],
};

export default function ProgramPage() {
  return <ProgramTemplate program={programData} />;
}
