import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ProgramDetailTemplate } from '@/components/templates/ProgramDetailTemplate';
import { programs } from '@/app/data/programs';

interface ProgramPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return programs.map((program) => ({
    slug: program.slug,
  }));
}

export async function generateMetadata({ params }: ProgramPageProps): Promise<Metadata> {
  const program = programs.find((p) => p.slug === params.slug);

  if (!program) {
    return {
      title: 'Program Not Found',
    };
  }

  return {
    title: program.name,
    description: program.shortDescription || program.heroSubtitle,
  };
}

export default function ProgramPage({ params }: ProgramPageProps) {
  const program = programs.find((p) => p.slug === params.slug);

  if (!program) {
    notFound();
  }

  // Convert program data to template format
  const templateData = {
    slug: program.slug,
    name: program.name,
    heroTitle: program.heroTitle,
    heroSubtitle: program.heroSubtitle,
    shortDescription: program.shortDescription,
    longDescription: program.longDescription,
    heroImage: program.heroImage,
    heroImageAlt: program.heroImageAlt,
    duration: program.duration,
    schedule: program.schedule,
    delivery: program.delivery,
    credential: program.credential,
    price: program.price,
    highlights: program.highlights,
    whatYouLearn: program.whatYouLearn,
    outcomes: program.outcomes,
    requirements: program.requirements,
    fundingOptions: program.fundingOptions,
    ctaPrimary: program.ctaPrimary,
    ctaSecondary: program.ctaSecondary,
  };

  return <ProgramDetailTemplate data={templateData} />;
}
