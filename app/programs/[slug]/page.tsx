import EnrollmentProcess from '@/components/EnrollmentProcess';
import { createClient } from '@/lib/supabase/server';
import ProgramCTA from '@/components/ProgramCTA';
import ProgramHighlights from '@/components/ProgramHighlights';
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";

async function getProgram(slug: string) {
  const supabase = await createClient();
  const { data: program, error } = await supabase
    .from("programs")
    .select("*")
    .eq("slug", slug)
    .eq("is_active", true)
    .single();

  if (error || !program) {
    return null;
  }

  return program;
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const program = await getProgram(params.slug);
  
  if (!program) {
    return {
      title: 'Program Not Found | Elevate For Humanity',
      description: 'The requested program could not be found.'
    };
  }

  return {
    title: `${program.name} | Elevate For Humanity`,
    description: program.description || `Learn about ${program.name} training program at Elevate For Humanity.`,
    alternates: {
      canonical: `https://www.elevateforhumanity.org/programs/${params.slug}`
    }
  };
}

export async function generateStaticParams() {
  // Return empty array to enable dynamic rendering
  // Pages will be generated on-demand
  return [];
}

export default async function ProgramPage({ params }: { params: { slug: string } }) {
  const program = await getProgram(params.slug);

  if (!program) {
    notFound();
  }

  const supabase = await createClient();
  const { data: courses } = await supabase
    .from("courses")
    .select("*")
    .eq("slug", slug)
    .eq("is_active", true)
    .single();

  if (error || !program) {
    return null;
  }

  return program;
}

function getProgramImage(slug: string, category: string): string {
  const customImages: Record<string, string> = {
    "medical-assistant": "/media-backup-20251128-043832/programs/healthcare-hd.jpg",
    "phlebotomy-technician": "/media-backup-20251128-043832/programs/healthcare-hd.jpg",
    "pharmacy-technician": "/media-backup-20251128-043832/programs/healthcare-hd.jpg",
    "dental-assistant": "/media-backup-20251128-043832/programs/healthcare-hd.jpg",
    "it-support-specialist": "/media-backup-20251128-043832/programs/healthcare-hd.jpg",
    "cybersecurity-analyst": "/media-backup-20251128-043832/programs/healthcare-hd.jpg",
    "web-development": "/media-backup-20251128-043832/programs/healthcare-hd.jpg",
    "data-analytics": "/media-backup-20251128-043832/programs/healthcare-hd.jpg",
    "customer-service-representative": "/media-backup-20251128-043832/programs/healthcare-hd.jpg",
    "administrative-assistant": "/media-backup-20251128-043832/programs/healthcare-hd.jpg",
    "bookkeeping": "/media-backup-20251128-043832/programs/healthcare-hd.jpg",
    "real-estate-agent": "/media-backup-20251128-043832/programs/healthcare-hd.jpg",
    "insurance-agent": "/media-backup-20251128-043832/programs/healthcare-hd.jpg",
    "solar-panel-installation": "/media-backup-20251128-043832/programs/healthcare-hd.jpg",
    "automotive-technician": "/media-backup-20251128-043832/programs/healthcare-hd.jpg",
    "diesel-mechanic": "/media-backup-20251128-043832/programs/healthcare-hd.jpg",
    "forklift-operator": "/media-backup-20251128-043832/programs/healthcare-hd.jpg",
    "manufacturing-technician": "/media-backup-20251128-043832/programs/healthcare-hd.jpg",
    "entrepreneurship-small-business": "/media-backup-20251128-043832/programs/healthcare-hd.jpg"
  };

  if (customImages[slug]) {
    return customImages[slug];
  }

  const categoryImages: Record<string, string> = {
    "Healthcare": "/media-backup-20251128-043832/programs/healthcare-hd.jpg",
    "Technology": "/media-backup-20251128-043832/programs/healthcare-hd.jpg",
    "Business": "/media-backup-20251128-043832/programs/healthcare-hd.jpg",
    "Sales": "/media-backup-20251128-043832/programs/healthcare-hd.jpg",
    "Skilled Trades": "/media-backup-20251128-043832/programs/healthcare-hd.jpg"
  };

  return categoryImages[category] || "/media-backup-20251128-043832/programs/healthcare-hd.jpg";
}

export default async function ProgramPage(props: { params: Promise<{ [key: string]: string }> })
