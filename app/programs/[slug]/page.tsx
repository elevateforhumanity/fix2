
import EnrollmentProcess from '@/components/EnrollmentProcess';
import ProgramCTA from '@/components/ProgramCTA';
import ProgramHighlights from '@/components/ProgramHighlights';

import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export async function generateStaticParams() {
  // Return empty array to enable dynamic rendering
  // Pages will be generated on-demand
  return [];
}

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
    "entrepreneurship-small-business": "/media-backup-20251128-043832/programs/healthcare-hd.jpg",
  };

  if (customImages[slug]) {
    return customImages[slug];
  }

  const categoryImages: Record<string, string> = {
    "Healthcare": "/media-backup-20251128-043832/programs/healthcare-hd.jpg",
    "Technology": "/media-backup-20251128-043832/programs/healthcare-hd.jpg",
    "Business": "/media-backup-20251128-043832/programs/healthcare-hd.jpg",
    "Sales": "/media-backup-20251128-043832/programs/healthcare-hd.jpg",
    "Skilled Trades": "/media-backup-20251128-043832/programs/healthcare-hd.jpg",
  };

  return categoryImages[category] || "/media-backup-20251128-043832/programs/healthcare-hd.jpg";
}

export default async function ProgramPage({ params }: { params: { slug: string } }) {
  const program = await getProgram(params.slug);

  if (!program) return notFound();
  
  const imageUrl = getProgramImage(program.slug, program.category || "Business");
  const displayName = program.title || program.name;

  return (
    <div className="min-h-screen bg-white text-slate-900">

      {/* HERO BANNER WITH FULL IMAGE */}
      <section className="relative h-[250px] sm:h-[300px] md:h-[350px] w-full overflow-hidden">
        {/* Background Image */}
        <Image
          src={imageUrl}
          alt={displayName}
          fill
          className="object-cover brightness-110"
          priority
          quality={100}
          sizes="100vw"
        />
        

        {/* Content */}
        <div className="relative h-full mx-auto max-w-7xl px-8 md:px-12 flex items-center">
          <div className="max-w-3xl space-y-6">
            {/* Category Badge */}
            {program.category && (
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-full text-sm font-semibold">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
                </svg>
                {program.category}
              </div>
            )}

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">
              {displayName}
            </h1>

            {/* Description */}
            <p className="text-lg sm:text-xl text-slate-700 leading-relaxed">
              {program.full_description || program.description}
            </p>

            {/* Stats Row */}
            <div className="flex flex-wrap gap-6 text-slate-900">
              {program.duration_weeks && (
                <div className="flex items-center gap-2">
                  <svg className="w-6 h-6 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-lg font-semibold">{program.duration_weeks} Weeks</span>
                </div>
              )}
              {program.salary_min && program.salary_max && (
                <div className="flex items-center gap-2">
                  <svg className="w-6 h-6 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"/>
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-lg font-semibold">${(program.salary_min / 1000).toFixed(0)}k - ${(program.salary_max / 1000).toFixed(0)}k/year</span>
                </div>
              )}
              {program.credential_name && (
                <div className="flex items-center gap-2">
                  <svg className="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-lg font-semibold">{program.credential_name}</span>
                </div>
              )}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                href={`/contact?program=${program.slug}`}
                className="inline-flex items-center justify-center px-8 py-4 bg-orange-500 text-white text-lg font-semibold rounded-md hover:bg-orange-600 transition-colors"
              >
                Enroll Now - 100% Free
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link
                href={`/contact?program=${program.slug}`}
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-slate-900 text-lg font-semibold rounded-md hover:bg-slate-50 transition-colors border-2 border-slate-300"
              >
                Talk to an Advisor
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* AT A GLANCE */}
      <section className="py-20 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Program at a Glance</h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {program.duration_weeks && (
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <div className="flex items-center gap-3 mb-2">
                  <svg className="w-6 h-6 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
                  </svg>
                  <p className="text-xs uppercase text-slate-500 font-semibold">Duration</p>
                </div>
                <p className="text-2xl font-bold text-slate-900">{program.duration_weeks} Weeks</p>
                {program.training_hours && (
                  <p className="text-sm text-slate-600 mt-1">{program.training_hours} hours total</p>
                )}
              </div>
            )}

            {program.delivery_method && (
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <div className="flex items-center gap-3 mb-2">
                  <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3z"/>
                  </svg>
                  <p className="text-xs uppercase text-slate-500 font-semibold">Format</p>
                </div>
                <p className="text-lg font-bold text-slate-900">{program.delivery_method}</p>
              </div>
            )}

            {program.credential_name && (
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <div className="flex items-center gap-3 mb-2">
                  <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  <p className="text-xs uppercase text-slate-500 font-semibold">Credential</p>
                </div>
                <p className="text-lg font-bold text-slate-900">{program.credential_name}</p>
                {program.credential_type && (
                  <p className="text-sm text-slate-600 mt-1">{program.credential_type}</p>
                )}
              </div>
            )}

            {program.salary_min && program.salary_max && (
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <div className="flex items-center gap-3 mb-2">
                  <svg className="w-6 h-6 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"/>
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd"/>
                  </svg>
                  <p className="text-xs uppercase text-slate-500 font-semibold">Salary Range</p>
                </div>
                <p className="text-2xl font-bold text-slate-900">
                  ${(program.salary_min / 1000).toFixed(0)}k - ${(program.salary_max / 1000).toFixed(0)}k
                </p>
                <p className="text-sm text-slate-600 mt-1">per year</p>
              </div>
            )}
          </div>

          {/* Additional Info Row */}
          {(program.placement_rate || program.completion_rate || program.total_cost) && (
            <div className="mt-6 grid gap-6 sm:grid-cols-3">
              {program.placement_rate && (
                <div className="bg-green-50 p-6 rounded-xl border border-green-200">
                  <p className="text-sm text-green-700 font-semibold mb-1">Placement Rate</p>
                  <p className="text-3xl font-bold text-green-900">{program.placement_rate}%</p>
                </div>
              )}
              {program.completion_rate && (
                <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
                  <p className="text-sm text-blue-700 font-semibold mb-1">Completion Rate</p>
                  <p className="text-3xl font-bold text-blue-900">{program.completion_rate}%</p>
                </div>
              )}
              {program.total_cost !== undefined && (
                <div className="bg-orange-50 p-6 rounded-xl border border-orange-200">
                  <p className="text-sm text-orange-700 font-semibold mb-1">Program Cost</p>
                  <p className="text-3xl font-bold text-orange-900">
                    {program.total_cost === 0 ? "FREE" : `$${program.total_cost.toLocaleString()}`}
                  </p>
                  {program.wioa_approved && (
                    <p className="text-xs text-orange-700 mt-1">100% covered by WIOA</p>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* WHAT YOU'LL LEARN & DAY IN THE LIFE */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">

            {/* WHAT YOU'LL LEARN */}
            {program.what_you_learn && program.what_you_learn.length > 0 && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3z"/>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">What You'll Learn</h3>
                </div>
                <ul className="space-y-4">
                  {program.what_you_learn.map((item, index) => (
                    <li key={index} className="flex gap-4 items-start">
                      <div className="flex-shrink-0 w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                        ✓
                      </div>
                      <span className="text-slate-700 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* DAY IN THE LIFE */}
            {program.day_in_life && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">A Day in the Life</h3>
                </div>
                <div className="prose prose-slate max-w-none">
                  <p className="text-slate-700 leading-relaxed whitespace-pre-line">
                    {program.day_in_life}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* EMPLOYERS & CAREER PATHS */}
      {(program.employers || program.career_outcomes) && (
        <section className="py-20 bg-slate-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2">

              {/* WHERE YOU CAN WORK */}
              {program.employers && program.employers.length > 0 && (
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd"/>
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900">Where You Can Work</h3>
                  </div>
                  <div className="grid gap-3">
                    {program.employers.map((employer, index) => (
                      <div key={index} className="flex items-center gap-3 bg-white p-4 rounded-lg border border-slate-200">
                        <svg className="w-5 h-5 text-teal-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                        </svg>
                        <span className="text-slate-700">{employer}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* CAREER ADVANCEMENT */}
              {program.career_outcomes && program.career_outcomes.length > 0 && (
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900">Career Advancement</h3>
                  </div>
                  <div className="space-y-3">
                    {program.career_outcomes.map((outcome, index) => (
                      <div key={index} className="flex items-start gap-3 bg-white p-4 rounded-lg border border-slate-200">
                        <div className="flex-shrink-0 w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-bold">
                          {index + 1}
                        </div>
                        <span className="text-slate-700 pt-1">{outcome}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* FUNDING OPTIONS */}
      {program.funding_pathways && program.funding_pathways.length > 0 && (
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">100% Free Training Available</h2>
              <p className="text-xl text-slate-700 max-w-3xl mx-auto">
                Multiple funding pathways mean you can train at no cost to you
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
                {program.funding_pathways.map((pathway, index) => (
                  <div key={index} className="flex items-center gap-3 p-4 bg-gradient-to-br from-orange-50 to-blue-50 rounded-xl border-2 border-orange-200">
                    <svg className="w-8 h-8 text-orange-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                    <span className="font-semibold text-slate-900">{pathway}</span>
                  </div>
                ))}
              </div>

              {program.prerequisites && (
                <div className="bg-slate-50 p-6 rounded-xl mb-6">
                  <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                    <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
                    </svg>
                    Prerequisites
                  </h4>
                  <p className="text-slate-700">{program.prerequisites}</p>
                </div>
              )}

              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  href={`/contact?program=${program.slug}`}
                  className="inline-flex items-center justify-center px-8 py-4 bg-orange-600 text-white text-lg font-semibold rounded-full hover:bg-orange-700 transition-colors shadow-lg"
                >
                  Check My Eligibility
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-orange-600 text-lg font-semibold rounded-full hover:bg-slate-50 transition-colors border-2 border-orange-600"
                >
                  Learn About Funding
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* INDUSTRY DEMAND */}
      {program.indusstart_demand && (
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-8 lg:p-12 border-2 border-green-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Indusstart Demand & Job Outlook</h3>
              </div>
              <div className="prose prose-lg max-w-none">
                <p className="text-slate-700 leading-relaxed whitespace-pre-line">
                  {program.indusstart_demand}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* READY TO START */}
      <section className="py-20 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Start Your Career?</h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Join thousands of students who have transformed their lives through our free training programs
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center mb-12">
            <Link
              href={`/contact?program=${program.slug}`}
              className="inline-flex items-center justify-center px-8 py-4 bg-orange-600 text-white text-lg font-semibold rounded-full hover:bg-orange-700 transition-colors shadow-xl"
            >
              Enroll Now - 100% Free
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link
              href={`/contact?program=${program.slug}`}
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-slate-900 text-lg font-semibold rounded-full hover:bg-slate-100 transition-colors"
            >
              Talk to an Advisor
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-4 max-w-4xl mx-auto">
            {[
              ["1", "Contact Us", "Reach out to discuss your goals"],
              ["2", "Check Eligibility", "We'll help you find funding"],
              ["3", "Enroll", "Complete simple enrollment"],
              ["4", "Start Training", "Begin your new career path"],
            ].map(([step, title, desc]) => (
              <div key={step} className="text-center">
                <div className="w-12 h-12 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-3">
                  {step}
                </div>
                <h4 className="font-semibold mb-1">{title}</h4>
                <p className="text-sm text-slate-400">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      
      {/* Indiana Career Connect Enrollment Process */}
      <EnrollmentProcess />
      
      {/* Program Highlights */}
      <ProgramHighlights />
      
      {/* Call to Action */}
      <ProgramCTA programName="this program" />
    </div>
  );
}
