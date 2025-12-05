import { ProgramsGrid } from "@/components/programs/ProgramsGrid";

export const metadata = {
  title: "Training & Career Pathways | Elevate for Humanity",
  description: "Explore workforce training programs in HVAC, healthcare, transportation, trades, and career readiness. WIOA-aligned pathways with funding support."
};

export default function ProgramsPage() {
  return (
    <main className="bg-slate-50">
      <ProgramsGrid />
    </main>
  );
}
