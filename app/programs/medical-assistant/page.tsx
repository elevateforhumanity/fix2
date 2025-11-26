// app/programs/medical-assistant/page.tsx
import { ProgramTemplate } from "@/components/marketing/ProgramTemplate";
import { programsData } from "@/lib/program-data";
import type { Metadata } from "next";

const programData = programsData["medical-assistant"];

export const metadata: Metadata = {
  title: `${programData.name} Training Program | Elevate For Humanity`,
  description: programData.description,
  keywords: [`${programData.name.toLowerCase()} training`, "free healthcare training", "WIOA program", "Marion County"],
  openGraph: {
    title: `${programData.name} Training Program | Elevate For Humanity`,
    description: programData.description,
    images: ["/images/programs-new/program-8.jpg"],
    type: "website",
  },
};

export default function ProgramPage() {
  return <ProgramTemplate program={programData} />;
}
