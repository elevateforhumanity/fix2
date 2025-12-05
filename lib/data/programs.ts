/**
 * Hybrid Program Data Service
 * Integrates Supabase database with centralized programs.ts fallback
 */

import { createClient } from "@/lib/supabase/server";
import { programs as staticPrograms, type Program } from "@/app/data/programs";

/**
 * Get a single program by slug
 * Priority: Supabase → Static programs.ts
 */
export async function getProgram(slug: string): Promise<Program | null> {
  try {
    // Try Supabase first
    const supabase = await createClient();
    const { data: supabaseProgram, error } = await supabase
      .from("programs")
      .select("*")
      .eq("slug", slug)
      .eq("is_active", true)
      .single();

    if (!error && supabaseProgram) {
      // Map Supabase data to Program type
      return mapSupabaseProgramToProgram(supabaseProgram);
    }
  } catch (error) {
    console.warn("Supabase query failed, falling back to static data:", error);
  }

  // Fallback to static programs.ts
  return staticPrograms.find((p) => p.slug === slug) || null;
}

/**
 * Get all active programs
 * Priority: Supabase → Static programs.ts
 */
export async function getAllPrograms(): Promise<Program[]> {
  try {
    // Try Supabase first
    const supabase = await createClient();
    const { data: supabasePrograms, error } = await supabase
      .from("programs")
      .select("*")
      .eq("is_active", true)
      .order("featured", { ascending: false })
      .order("name", { ascending: true });

    if (!error && supabasePrograms && supabasePrograms.length > 0) {
      // Map Supabase data to Program type
      return supabasePrograms.map(mapSupabaseProgramToProgram);
    }
  } catch (error) {
    console.warn("Supabase query failed, falling back to static data:", error);
  }

  // Fallback to static programs.ts
  return staticPrograms;
}

/**
 * Map Supabase program data to Program type
 * Handles field name differences and ensures type compatibility
 */
function mapSupabaseProgramToProgram(supabaseData: any): Program {
  return {
    slug: supabaseData.slug,
    name: supabaseData.name || supabaseData.title,
    heroTitle: supabaseData.hero_title || supabaseData.title || supabaseData.name,
    heroSubtitle: supabaseData.hero_subtitle || supabaseData.description || "",
    shortDescription: supabaseData.short_description || supabaseData.description || "",
    longDescription: supabaseData.long_description || supabaseData.description || "",
    heroImage: supabaseData.hero_image || supabaseData.image_url || getDefaultHeroImage(supabaseData.slug),
    heroImageAlt: supabaseData.hero_image_alt || `${supabaseData.name} program`,
    duration: supabaseData.duration || formatDuration(supabaseData.duration_weeks),
    schedule: supabaseData.schedule || "Flexible scheduling available",
    delivery: supabaseData.delivery || "Hybrid: Online + In-person",
    credential: supabaseData.credential || "Program completion certificate",
    approvals: supabaseData.approvals || [],
    fundingOptions: supabaseData.funding_options || [],
    highlights: supabaseData.highlights || [],
    whatYouLearn: supabaseData.what_you_learn || [],
    outcomes: supabaseData.outcomes || [],
    requirements: supabaseData.requirements || [],
    ctaPrimary: {
      label: "Start Application",
      href: `/apply?program=${supabaseData.slug}`,
    },
    ctaSecondary: {
      label: "Talk to a Career Coach",
      href: `/contact?topic=${supabaseData.slug}`,
    },
  };
}

/**
 * Get default hero image based on slug
 */
function getDefaultHeroImage(slug: string): string {
  const imageMap: Record<string, string> = {
    "hvac-technician": "/images/programs/hvac-hero.jpg",
    "barber-apprenticeship": "/images/programs/barber-hero.jpg",
    "cna": "/images/programs/cna-hero.jpg",
    "cdl": "/images/programs/cdl-hero.jpg",
    "building-maintenance": "/images/programs/building-maintenance-hero.jpg",
    "building-technician": "/images/programs/building-technician-hero.jpg",
    "workforce-readiness": "/images/programs/workforce-readiness-hero.jpg",
  };

  return imageMap[slug] || "/images/artlist/hero-training-1.jpg";
}

/**
 * Format duration from weeks to readable string
 */
function formatDuration(weeks?: number): string {
  if (!weeks) return "Varies by program";
  if (weeks < 4) return `${weeks} weeks`;
  if (weeks < 12) return `${weeks} weeks`;
  return `${Math.floor(weeks / 4)}–${Math.ceil(weeks / 4)} months`;
}
