// app/programs/sterile-processing/page.tsx
import { ProgramTemplate } from "@/components/marketing/ProgramTemplate";
import { programsData } from "@/lib/program-data";
import type { Metadata } from "next";

const programData = programsData["sterile-processing"];

export const metadata: Metadata = {
  title: `${programData.name} Training Program | Elevate For Humanity`,
  description: programData.description,
  keywords: [`${programData.name.toLowerCase()} training`, "free healthcare training", "WIOA program", "Marion County"],
};

export default function ProgramPage() {
  return <ProgramTemplate program={programData} />;
}
