import { notFound } from "next/navigation";
import { getProgram, getAllPrograms } from "@/lib/data/programs";
import { ProgramHero } from "@/components/programs/ProgramHero";
import { ProgramDetails } from "@/components/programs/ProgramDetails";

type Params = { slug: string };

export async function generateStaticParams() {
  const programs = await getAllPrograms();
  return programs.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const program = await getProgram(params.slug);
  
  if (!program) {
    return {
      title: "Program Not Found"
    };
  }

  return {
    title: `${program.name} | Elevate for Humanity`,
    description: program.shortDescription
  };
}

export default async function ProgramDetailPage({ params }: { params: Params }) {
  const program = await getProgram(params.slug);

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
