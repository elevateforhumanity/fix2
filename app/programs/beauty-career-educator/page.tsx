// Auto-generated program page
import { ProgramTemplate } from "@/components/marketing/ProgramTemplate";
import { programsData } from "@/lib/program-data";
import type { Metadata } from "next";

const slug = "beauty-career-educator";
const programData = programsData[slug];

export const metadata: Metadata = {
  title: `${programData?.name || 'Program'} Training | Elevate For Humanity`,
  description: programData?.description || 'Career training program',
};

export default function ProgramPage() {
  if (!programData) {
    return <div>Program not found</div>;
  }
  return <ProgramTemplate program={programData} />;
}
