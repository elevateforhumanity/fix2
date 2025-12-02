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

// Map program categories to high-quality, properly sized images
function getProgramImage(slug: string, category: string): string {
  // High-quality program-specific images (600x400 aspect ratio)
  const customImages: Record<string, string> = {
    "medical-assistant": "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&h=400&fit=crop&q=80",
    "phlebotomy-technician": "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=600&h=400&fit=crop&q=80",
    "pharmacy-technician": "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=600&h=400&fit=crop&q=80",
    "dental-assistant": "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=600&h=400&fit=crop&q=80",
    "it-support-specialist": "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=600&h=400&fit=crop&q=80",
    "cybersecurity-analyst": "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&h=400&fit=crop&q=80",
    "web-development": "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop&q=80",
    "data-analytics": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop&q=80",
    "customer-service-representative": "https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=600&h=400&fit=crop&q=80",
    "administrative-assistant": "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?w=600&h=400&fit=crop&q=80",
    "bookkeeping": "https://images.unsplash.com/photo-1554224311-beee4ece3c5d?w=600&h=400&fit=crop&q=80",
    "real-estate-agent": "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=600&h=400&fit=crop&q=80",
    "insurance-agent": "https://images.unsplash.com/photo-1556742111-a301076d9d18?w=600&h=400&fit=crop&q=80",
    "solar-panel-installation": "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=600&h=400&fit=crop&q=80",
    "automotive-technician": "https://images.unsplash.com/photo-1625047509168-a7026f36de04?w=600&h=400&fit=crop&q=80",
    "diesel-mechanic": "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=600&h=400&fit=crop&q=80",
    "forklift-operator": "https://images.unsplash.com/photo-1553413077-190dd305871c?w=600&h=400&fit=crop&q=80",
    "manufacturing-technician": "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=600&h=400&fit=crop&q=80",
    "entrepreneurship-small-business": "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&h=400&fit=crop&q=80",
    // Additional programs
    "cna": "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=600&h=400&fit=crop&q=80",
    "certified-nursing-assistant": "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=600&h=400&fit=crop&q=80",
    "hvac-technician": "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&h=400&fit=crop&q=80",
    "cdl": "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=600&h=400&fit=crop&q=80",
    "commercial-truck-driving": "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=600&h=400&fit=crop&q=80",
    "barber-apprenticeship": "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=600&h=400&fit=crop&q=80",
    "building-maintenance-technician": "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600&h=400&fit=crop&q=80",
  };

  if (customImages[slug]) {
    return customImages[slug];
  }

  // High-quality category fallback images
  const categoryImages: Record<string, string> = {
    "Healthcare": "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=600&h=400&fit=crop&q=80",
    "Technology": "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop&q=80",
    "Business": "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&h=400&fit=crop&q=80",
    "Sales": "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&h=400&fit=crop&q=80",
    "Skilled Trades": "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600&h=400&fit=crop&q=80",
    "Transportation": "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=600&h=400&fit=crop&q=80",
    "trades": "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600&h=400&fit=crop&q=80",
    "healthcare": "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=600&h=400&fit=crop&q=80",
    "transportation": "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=600&h=400&fit=crop&q=80",
    "barber_beauty": "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=600&h=400&fit=crop&q=80",
    "professional": "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&h=400&fit=crop&q=80",
  };

  return categoryImages[category] || "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&h=400&fit=crop&q=80";
}

export const metadata = {
  title: "Programs | Elevate For Humanity",
  description:
    "Explore free career training programs in healthcare, trades, transportation, and workforce readiness funded through WIOA, WRG, and partner programs.",
};

export default async function ProgramsPage() {
  const programs = await getPrograms();

  return (
    <main className="min-h-screen bg-white">
      {/* HERO BANNER */}
      <section className="relative h-[400px] w-full overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1920&h=800&fit=crop"
            alt="Students learning together"
            fill
            className="object-cover"
            priority
            unoptimized
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/85 to-slate-900/75" />
        </div>

        {/* Content */}
        <div className="relative h-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center">
          <div className="max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-full text-sm font-semibold">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3z"/>
              </svg>
              Career Training Programs
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Transform Your Future with Free Career Training
            </h1>

            <p className="text-xl sm:text-2xl text-slate-200 leading-relaxed">
              Choose from {programs.length} workforce development programs. 100% funded through WIOA, grants, and employer partnerships.
            </p>

            <div className="flex flex-wrap gap-6 text-white pt-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                </div>
                <div>
                  <div className="text-2xl font-bold">{programs.length}</div>
                  <div className="text-sm text-slate-300">Programs</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                </div>
                <div>
                  <div className="text-2xl font-bold">100%</div>
                  <div className="text-sm text-slate-300">Free Training</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"/>
                  </svg>
                </div>
                <div>
                  <div className="text-2xl font-bold">10k+</div>
                  <div className="text-sm text-slate-300">Students Trained</div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-orange-600 text-white text-lg font-semibold rounded-full hover:bg-orange-700 transition-colors shadow-xl"
              >
                Get Started Today
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white text-lg font-semibold rounded-full hover:bg-white/20 transition-colors border-2 border-white/30"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* PROGRAMS GRID */}
      <section className="py-16 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Explore Our Programs</h2>
            <p className="text-lg text-slate-700 max-w-2xl mx-auto">
              Choose from healthcare, technology, skilled trades, and business programs designed to get you hired fast.
            </p>
          </div>

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
                <div className="relative w-full overflow-hidden bg-slate-100" style={{ aspectRatio: '3/2' }}>
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
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border-2 border-orange-200 bg-gradient-to-br from-orange-50 via-white to-blue-50 p-8 lg:p-12 shadow-lg">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                Unsure Which Program Fits You Best?
              </h2>
              <p className="text-lg text-slate-700 mb-8">
                You don&apos;t have to figure it out alone. Our team can help you
                explore options based on your interests, work history, and funding
                eligibility.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full bg-orange-600 px-8 py-4 text-lg font-semibold text-white hover:bg-orange-700 transition-colors shadow-lg"
                >
                  Get Matched to a Program
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center justify-center rounded-full border-2 border-orange-600 px-8 py-4 text-lg font-semibold text-orange-600 hover:bg-orange-50 transition-colors"
                >
                  Learn How Funding Works
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
