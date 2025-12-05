import programsData from "../config/programs.json";

export type Program = {
  slug: string;
  name: string;
  shortTagline: string;
  heroImage: string;
  heroImageAlt: string;
  level: string;
  duration: string;
  format: string;
  schedule: string;
  tuitionNotes: string;
  fundingOptions: string[];
  whoItIsFor: string[];
  outcomes: string[];
  highlights: string[];
  ctaPrimary: { label: string; href: string };
  ctaSecondary?: { label: string; href: string };
};

const programs = programsData as Program[];

export function getAllPrograms(): Program[] {
  return programs;
}

export function getProgramBySlug(slug: string): Program | undefined {
  return programs.find((p) => p.slug === slug);
}
