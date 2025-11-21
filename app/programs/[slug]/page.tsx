// app/programs/[slug]/page.tsx
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { createServerSupabaseClient } from '@/lib/auth';
import { getEcdCourseBySlug, ecdCourses } from '@/content/courses/ecdCatalog';

// Manifest not needed for static generation
const getManifest = () => ({});

// Generate static params for ECD courses
export function generateStaticParams() {
  return ecdCourses.map((c) => ({ slug: c.slug }));
}

type Program = {
  id: string;
  slug: string;
  title: string;
  tagline?: string | null;
  summary?: string | null;
  description?: string | null;
  bullets?: string[] | null;
  funding?: string[] | null;
  hero_image?: string | null;
  cip_code?: string | null;
  soc_code?: string | null;
  funding_eligibility?: string[] | null;
};

type Course = {
  id: string;
  slug?: string | null;
  title: string;
  subtitle?: string | null;
  description?: string | null;
  duration_hours?: number | null;
  metadata?: any;
};

export const dynamic = 'force-dynamic';

export default async function ProgramDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const supabase = await createServerSupabaseClient();

  // Check if this is one of our ECD courses
  const ecdCourse = getEcdCourseBySlug(params.slug);
  
  // If it's an ECD course, render the ECD template
  if (ecdCourse) {
    const manifest = getManifest();
    const coverSrc = (manifest as Record<string, string>)[ecdCourse.coverImageKey] ?? '/placeholder-course-cover.svg';
    
    return (
      <main className="mx-auto max-w-5xl px-4 py-10 space-y-8">
        <div className="grid gap-8 md:grid-cols-[2fr,3fr] items-start">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
            <Image
              src={coverSrc}
              alt={ecdCourse.title}
              fill
              className="object-cover"
            />
          </div>

          <header className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-red-600">
              Elevate for Humanity Program
            </p>
            <h1 className="text-3xl font-bold text-slate-900">
              {ecdCourse.title}
            </h1>
            <p className="text-sm text-slate-600">{ecdCourse.shortDescription}</p>

            <div className="rounded-xl bg-red-50 p-4 text-xs text-blue-900">
              Many learners may qualify for tuition support through WIOA and
              other state workforce grants. After you apply, our team and
              partners will help you review funding options and enrollment
              steps.
            </div>
            
            <div className="flex gap-3">
              <Link
                href="/apply"
                className="elevate-btn-primary"
              >
                Apply Now
              </Link>
              <Link
                href="/contact"
                className="elevate-btn-secondary"
              >
                Learn More
              </Link>
            </div>
          </header>
        </div>

        {ecdCourse.aiVideoUrl && (
          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-slate-900">
              Program overview with AI instructor
            </h2>
            <div className="aspect-video w-full overflow-hidden rounded-2xl border border-slate-200 bg-black">
              <video
                src={ecdCourse.aiVideoUrl}
                className="h-full w-full"
                controls
              >
                <track
                  kind="captions"
                  src={ecdCourse.aiVideoUrl.replace('.mp4', '.vtt')}
                  srcLang="en"
                  label="English"
                />
              </video>
            </div>
          </section>
        )}

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">Program Details</h2>
          <div className="prose prose-slate max-w-none">
            <p>
              This program is part of the Elevate for Humanity, connecting learners 
              with high-demand training and workforce funding opportunities.
            </p>
          </div>
        </section>
      </main>
    );
  }
  
  // Otherwise, load from database (existing programs)
  const { data: program, error: programError } = await supabase
    .from('programs')
    .select(
      'id, slug, title, tagline, summary, description, bullets, funding, hero_image, cip_code, soc_code, funding_eligibility'
    )
    .eq('slug', params.slug)
    .single();

  // If not in database and not an ECD course, 404
  if (programError) {
    console.error('Program not found:', programError);
    notFound();
  }
  
  const manifest = getManifest();
  const coverSrc = null;

  // Load courses - try to match by program slug in metadata
  const { data: coursesData, error: coursesError } = await supabase
    .from('courses')
    .select('id, slug, title, subtitle, description, duration_hours, metadata')
    .eq('status', 'published');

  if (coursesError) {
    console.error('Error fetching courses:', coursesError);
  }

  // Filter courses that match this program (basic matching by slug similarity)
  const courses: Course[] = (coursesData || []).filter(
    (c) =>
      c.slug?.includes(program.slug) ||
      c.metadata?.program_slug === program.slug
  );

  const internalCourses = courses.filter((c) => !c.metadata?.external_url);
  const externalCourses = courses.filter((c) => !!c.metadata?.external_url);

  const fundingTags = program.funding || [];

  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Hero */}
      <section className="elevate-gradient-red-orange border-b border-white/10">
        <div className="relative mx-auto flex max-w-6xl flex-col gap-6 px-4 py-16 sm:px-6 lg:flex-row lg:items-center lg:py-20">
          <div className="flex-1 space-y-4">
            <p className="text-sm font-semibold text-white/90 uppercase tracking-wide">
              Elevate for Humanity · Elevate for Humanity
            </p>
            <h1 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl text-white">
              {program.title}
            </h1>
            {program.tagline && (
              <p className="text-xl font-semibold text-white/90 italic">
                {program.tagline}
              </p>
            )}
            <p className="max-w-xl text-sm sm:text-base text-white/90">
              {program.summary || 'Explore program details, courses, and funding options.'}
            </p>
            <div className="flex flex-wrap gap-2">
              {fundingTags.map((tag) => (
                <span
                  key={tag}
                  className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide text-white"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href={`/enroll?program=${program.slug}`}
                className="elevate-btn-primary"
              >
                Start Enrollment Inquiry
              </Link>
              <Link
                href="/programs"
                className="elevate-btn-secondary bg-white/10 border-white text-white hover:bg-white/20"
              >
                Back to All Programs
              </Link>
            </div>
          </div>
          <div className="flex-1">
            <div className="elevate-card relative aspect-video w-full overflow-hidden bg-white">
              <div className="absolute inset-0 flex items-center justify-center px-6 text-center text-sm text-gray-700">
                <div>
                  <p className="text-efh-orange font-semibold mb-2">
                    Program Video Placeholder
                  </p>
                  <p className="text-xs">Add program-specific video here</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Body */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.2fr)]">
          {/* Left column */}
          <div>
            <h2 className="mb-4 text-2xl font-bold">Program Overview</h2>
            <p className="mb-6 text-sm sm:text-base text-gray-700">
              {program.description ||
                program.summary ||
                "This program is part of Elevate for Humanity's workforce ecosystem."}
            </p>
            {program.bullets && program.bullets.length > 0 && (
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-3">Program Highlights</h3>
                <ul className="space-y-2">
                  {program.bullets.map((bullet, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-efh-teal text-xl">✓</span>
                      <span className="text-sm text-gray-700">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {/* Internal Courses */}
            <div className="mt-8">
              <h3 className="text-xl font-bold">Courses in This Program</h3>
              {internalCourses.length === 0 ? (
                <p className="mt-3 text-sm text-gray-600">
                  Courses for this program will appear here once database
                  migrations are complete.
                </p>
              ) : (
                <div className="mt-4 space-y-4">
                  {internalCourses.map((course) => (
                    <div key={course.id} className="elevate-card p-4">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <h4 className="text-sm font-semibold text-gray-900">
                          {course.title}
                        </h4>
                        {course.duration_hours && (
                          <span className="elevate-badge elevate-badge-blue">
                            {course.duration_hours} hours
                          </span>
                        )}
                      </div>
                      {course.subtitle && (
                        <p className="mt-2 text-xs sm:text-sm text-efh-orange font-medium">
                          {course.subtitle}
                        </p>
                      )}
                      {course.description && (
                        <p className="mt-2 text-xs sm:text-sm text-gray-600">
                          {course.description}
                        </p>
                      )}
                      <div className="mt-3 flex flex-wrap gap-2">
                        <Link
                          href={`/lms/courses/${course.id}`}
                          className="elevate-btn-primary text-xs"
                        >
                          View in LMS
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {/* External Courses */}
            {externalCourses.length > 0 && (
              <div className="mt-10">
                <h3 className="text-xl font-bold">
                  External Certifications & Partner Platforms
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  These modules are delivered on external platforms (JRI, NRF
                  RISE Up, Milady RISE).
                </p>
                <div className="mt-4 space-y-4">
                  {externalCourses.map((course) => (
                    <div
                      key={course.id}
                      className="elevate-card elevate-card-blue p-4"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <h4 className="text-sm font-semibold text-gray-900">
                          {course.title}
                        </h4>
                        {course.metadata?.external_platform && (
                          <span className="elevate-badge elevate-badge-purple">
                            {course.metadata.external_platform}
                          </span>
                        )}
                      </div>
                      {course.description && (
                        <p className="mt-2 text-xs sm:text-sm text-gray-600">
                          {course.description}
                        </p>
                      )}
                      <div className="mt-3 flex flex-wrap gap-2">
                        {course.metadata?.external_url && (
                          <a
                            href={course.metadata.external_url}
                            target="_blank"
                            rel="noreferrer"
                            className="elevate-btn-secondary text-xs"
                          >
                            Go to External Platform
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          {/* Right column */}
          <aside className="space-y-5">
            {/* Workforce Codes */}
            {(program.cip_code || program.soc_code) && (
              <div className="elevate-card p-5 bg-gradient-to-br from-blue-50 to-white border-2 border-blue-200">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">
                  Workforce Alignment Codes
                </h3>
                <div className="space-y-3">
                  {program.cip_code && (
                    <div>
                      <dt className="text-xs font-semibold text-blue-900 uppercase tracking-wide">
                        CIP Code
                      </dt>
                      <dd className="mt-1 text-sm font-medium text-gray-800">
                        {program.cip_code}
                      </dd>
                    </div>
                  )}
                  {program.soc_code && (
                    <div>
                      <dt className="text-xs font-semibold text-blue-900 uppercase tracking-wide">
                        SOC Code
                      </dt>
                      <dd className="mt-1 text-sm font-medium text-gray-800">
                        {program.soc_code}
                      </dd>
                    </div>
                  )}
                </div>
              </div>
            )}
            {/* Funding Eligibility Badges */}
            {program.funding_eligibility &&
              program.funding_eligibility.length > 0 && (
                <div className="elevate-card p-5">
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">
                    Eligible Funding Types
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {program.funding_eligibility.map((funding) => {
                      const colorMap: Record<string, string> = {
                        WIOA: 'bg-red-600',
                        'WRG-style': 'bg-orange-600',
                        JRI: 'bg-green-600',
                        Apprenticeship: 'bg-purple-600',
                        SEAL: 'bg-indigo-600',
                        Reentry: 'bg-teal-600',
                        Youth: 'bg-pink-600',
                        'SNAP/TANF': 'bg-yellow-600',
                        Healthcare: 'bg-red-600',
                      };
                      const bgColor = colorMap[funding] || 'bg-gray-600';
                      return (
                        <span
                          key={funding}
                          className={`${bgColor} text-white px-3 py-1 rounded-full text-xs font-semibold`}
                        >
                          {funding}
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}
            <div className="elevate-card p-5">
              <h3 className="text-sm font-semibold text-gray-900">
                Quick Facts
              </h3>
              <dl className="mt-3 space-y-2 text-sm text-gray-700">
                <div className="flex justify-between gap-4">
                  <dt className="text-gray-500">Program</dt>
                  <dd className="text-right font-medium">{program.title}</dd>
                </div>
              </dl>
            </div>
            <div className="elevate-card p-5">
              <h3 className="text-sm font-semibold text-gray-900">
                Funding & Support Options
              </h3>
              <ul className="mt-3 space-y-1.5 text-xs sm:text-sm text-gray-700">
                <li>• WIOA training funds (where eligible)</li>
                <li>• Workforce Ready Grant / Next Level Jobs</li>
                <li>• Job Ready Indy for youth skills</li>
                <li>• Registered Apprenticeship pathways</li>
              </ul>
              <p className="mt-3 text-xs text-gray-500">
                Eligibility depends on location, age, income, and partner agency
                rules.
              </p>
            </div>
            <div className="elevate-card p-5">
              <h3 className="text-sm font-semibold text-gray-900">
                Need Help?
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-gray-700">
                Contact{' '}
                <Link href="/contact" className="text-efh-red underline">
                  Elevate for Humanity
                </Link>{' '}
                for assistance.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
