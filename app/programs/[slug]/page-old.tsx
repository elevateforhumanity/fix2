import { notFound } from "next/navigation";
import { programs } from "@/app/data/programs";
import { ProgramHero } from "@/components/programs/ProgramHero";
import { ProgramDetails } from "@/components/programs/ProgramDetails";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  // Use static data directly for build time
  return programs.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  const program = programs.find(p => p.slug === slug);
  
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
  const { slug } = await params;
  const program = programs.find(p => p.slug === slug);

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
