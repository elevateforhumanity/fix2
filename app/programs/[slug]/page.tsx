import { notFound } from "next/navigation";
import { getAllPrograms, getProgramBySlug } from "@/lib/programs";
import { ProgramHero } from "@/components/programs/ProgramHero";
import { ProgramDetails } from "@/components/programs/ProgramDetails";

type Params = { slug: string };

export function generateStaticParams() {
  const programs = getAllPrograms();
  return programs.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const program = getProgramBySlug(params.slug);
  
  if (!program) {
    return {
      title: "Program Not Found"
    };
  }

  return {
    title: `${program.name} | Elevate for Humanity`,
    description: program.shortTagline
  };
}

export default function ProgramDetailPage({ params }: { params: Params }) {
  const program = getProgramBySlug(params.slug);

  if (!program) {
    return notFound();
  }

  return (
    <main className="bg-slate-50">
      <ProgramHero program={program} />
      <ProgramDetails program={program} />
    </main>
  );
}
