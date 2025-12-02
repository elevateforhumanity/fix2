import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";

async function getPrograms() {
  const supabase = await createClient();
  
  const { data: programs, error } = await supabase
    .from("programs")
    .select("slug, name, title, description, category, duration_weeks, salary_min, salary_max, image_url, featured")
    .eq("is_active", true)
    .order("featured", { ascending: false })
    .order("name", { ascending: true });

  if (error) {
    console.error("Error fetching programs:", error);
    return [];
  }

  return programs || [];
}

// Map program categories to appropriate placeholder images
function getProgramImage(slug: string, category: string): string {
  // If program has custom image, use it
  const customImages: Record<string, string> = {
    "medical-assistant": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop",
    "phlebotomy-technician": "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=800&h=600&fit=crop",
    "pharmacy-technician": "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800&h=600&fit=crop",
    "dental-assistant": "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800&h=600&fit=crop",
    "it-support-specialist": "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&h=600&fit=crop",
    "cybersecurity-analyst": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=600&fit=crop",
    "web-development": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop",
    "data-analytics": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    "customer-service-representative": "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
    "administrative-assistant": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop",
    "bookkeeping": "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop",
    "real-estate-agent": "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop",
    "insurance-agent": "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=600&fit=crop",
    "solar-panel-installation": "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=600&fit=crop",
    "automotive-technician": "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&h=600&fit=crop",
    "diesel-mechanic": "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=800&h=600&fit=crop",
    "forklift-operator": "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=600&fit=crop",
    "manufacturing-technician": "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop",
    "entrepreneurship-small-business": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop",
  };

  if (customImages[slug]) {
    return customImages[slug];
  }

  // Fallback based on category
  const categoryImages: Record<string, string> = {
    "Healthcare": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop",
    "Technology": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop",
    "Business": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop",
    "Sales": "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
    "Skilled Trades": "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop",
    "Transportation": "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=800&h=600&fit=crop",
  };

  return categoryImages[category] || "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop";
}

export const metadata = {
  title: "Programs | Elevate For Humanity",
  description:
    "Explore free career training programs in healthcare, trades, transportation, and workforce readiness funded through WIOA, WRG, and partner programs.",
};

export default async function ProgramsPage() {
  const programs = await getPrograms();

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-3 text-[11px] text-slate-500 uppercase tracking-wide">
        © {new Date().getFullYear()} Elevate For Humanity • All Rights Reserved
      </div>

      <header className="mb-8 space-y-3">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">
          Free Career Training Programs
        </h1>
        <p className="text-base sm:text-lg text-slate-700 max-w-3xl">
          Elevate For Humanity partners with workforce boards and employers to
          offer no-cost training that leads to in-demand jobs. Most programs can
          be fully funded through WIOA, Workforce Ready Grant, or employer
          partners.
        </p>
        <div className="flex flex-wrap gap-3 pt-2">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-50 text-teal-700 rounded-full text-sm font-medium">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
              <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"/>
            </svg>
            {programs.length} Programs Available
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 text-orange-700 rounded-full text-sm font-medium">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
            </svg>
            100% Free Training
          </div>
        </div>
      </header>

      {programs.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-slate-600">No programs available at this time.</p>
        </div>
      ) : (
        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {programs.map((program) => {
            const imageUrl = getProgramImage(program.slug, program.category || "Business");
            const displayName = program.title || program.name;
            
            return (
              <Link
                key={program.slug}
                href={`/programs/${program.slug}`}
                className="group rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm hover:border-orange-400 hover:shadow-lg transition-all duration-200"
              >
                <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                  <Image
                    src={imageUrl}
                    alt={displayName}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-200"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    unoptimized
                  />
                  {program.featured && (
                    <div className="absolute top-3 right-3 bg-orange-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                      Featured
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h2 className="text-lg font-semibold text-slate-900 group-hover:text-orange-700 transition-colors">
                      {displayName}
                    </h2>
                  </div>
                  
                  {program.category && (
                    <div className="inline-block px-2 py-1 bg-slate-100 text-slate-700 text-xs font-medium rounded mb-3">
                      {program.category}
                    </div>
                  )}
                  
                  <p className="text-sm text-slate-600 line-clamp-2 mb-3">
                    {program.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                    {program.duration_weeks && (
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
                        </svg>
                        {program.duration_weeks} weeks
                      </span>
                    )}
                    {program.salary_min && program.salary_max && (
                      <span className="flex items-center gap-1 font-medium text-teal-700">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"/>
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd"/>
                        </svg>
                        ${(program.salary_min / 1000).toFixed(0)}k-${(program.salary_max / 1000).toFixed(0)}k
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center text-sm font-semibold text-orange-700 group-hover:text-orange-800">
                    Learn more
                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            );
          })}
        </section>
      )}

      <section className="mt-12 rounded-xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-8 shadow-sm">
        <div className="max-w-2xl">
          <h2 className="text-xl font-bold text-slate-900 mb-3">
            Unsure which program fits you best?
          </h2>
          <p className="text-slate-700 mb-5">
            You don&apos;t have to figure it out alone. Our team can help you
            explore options based on your interests, work history, and funding
            eligibility.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-orange-600 px-6 py-3 text-sm font-semibold text-white hover:bg-orange-700 transition-colors shadow-sm"
            >
              Get matched to a program
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center rounded-full border-2 border-slate-300 px-6 py-3 text-sm font-semibold text-slate-800 hover:border-orange-500 hover:text-orange-700 transition-colors"
            >
              Learn how funding works
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
