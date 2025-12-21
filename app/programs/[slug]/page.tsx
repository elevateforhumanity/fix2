import { notFound } from 'next/navigation';
import { programs } from '@/app/data/programs';
import { ProgramTemplate } from '@/components/programs/ProgramTemplate';

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  return programs.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  const program = programs.find((p) => p.slug === slug);

  if (!program) {
    return { title: 'Program Not Found' };
  }

  return {
    title: `${program.name} | Free Training | Elevate for Humanity`,
    description: program.shortDescription,
  };
}

export default async function ProgramDetailPage({
  params,
}: {
  params: Params;
}) {
  const { slug } = await params;
  const program = programs.find((p) => p.slug === slug);

  if (!program) {
    return notFound();
  }

  return <ProgramTemplate program={program} />;
}
