// app/student/enroll/[slug]/page.tsx

import { notFound } from "next/navigation";
import Link from "next/link";
import { courses, getCourseBySlug } from "@/lms-data/courses";

interface EnrollPageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return courses.map((course) => ({ slug: course.slug }));
}

function formatFundingLabel(code: string): string {
  switch (code) {
    case "WIOA_ADULT":
      return "WIOA Adult";
    case "WIOA_YOUTH":
      return "WIOA Youth";
    case "WIOA_DW":
      return "WIOA Dislocated Worker";
    case "WRG":
      return "Workforce Ready Grant (WRG)";
    case "JRI":
      return "Justice Reinvestment Initiative (JRI)";
    case "WEX":
      return "Paid Work Experience (WEX)";
    case "APPRENTICESHIP":
      return "Registered Apprenticeship";
    case "SELF_PAY":
      return "Self-Pay / Employer-Sponsored";
    default:
      return code;
  }
}

export default function EnrollPage({ params }: EnrollPageProps) {
  const course = getCourseBySlug(params.slug);

  if (!course) {
    notFound();
  }

  return (
    <div className="min-h-screen w-full bg-slate-50">
      <header className="w-full border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-4xl px-4 py-6">
          <p className="text-[11px] uppercase tracking-wide text-slate-500">
            Elevate For Humanity · Enrollment Steps
          </p>
          <h1 className="mt-1 text-xl font-bold text-slate-900">
            Get Started With: {course.title}
          </h1>
          <p className="mt-2 text-xs text-slate-600">
            You are in the right place. This page walks you through{" "}
            <span className="font-semibold">
              what this program is, how funding might work, and what happens
              next
            </span>{" "}
            so you&apos;re not guessing.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-6">
        <div className="grid gap-4 md:grid-cols-3">
          {/* LEFT: program snapshot */}
          <section className="md:col-span-2 rounded-xl border border-slate-200 bg-white p-4 text-xs text-slate-800 shadow-sm">
            <h2 className="text-sm font-semibold text-slate-900">
              Quick Program Snapshot
            </h2>
            <p className="mt-1 text-[11px] text-slate-600">
              {course.shortDescription || "Program details"}
            </p>

            <div className="mt-3 flex flex-wrap gap-2 text-[11px]">
              <span className="inline-flex items-center rounded-full bg-slate-100 px-2 py-1 text-slate-700">
                {course.title}
              </span>
            </div>

            <div className="mt-4">
              <h3 className="text-[11px] font-semibold text-slate-900">
                Program Information
              </h3>
              <p className="mt-1 text-[11px] text-slate-700">
                Complete this enrollment form to get started with {course.title}.
              </p>
            </div>
          </section>

          {/* RIGHT: funding + actions */}
          <aside className="space-y-4">
            <section className="rounded-xl border border-slate-200 bg-white p-4 text-xs text-slate-800 shadow-sm">
              <h2 className="text-sm font-semibold text-slate-900">
                Funding Options
              </h2>
              <p className="mt-2 text-[11px] text-slate-700">
                Many programs are eligible for WIOA, WRG, or employer-sponsored funding.
              </p>
              <p className="mt-2 text-[11px] text-slate-600">
                We&apos;ll talk with you about your situation and help match you
                with the best option available in your area.
              </p>
              <Link
                href="/funding"
                className="mt-2 inline-flex items-center text-[11px] font-semibold text-brandPrimary hover:underline"
              >
                Learn more about funding options
              </Link>
            </section>

            <section className="rounded-xl border border-slate-200 bg-white p-4 text-xs text-slate-800 shadow-sm">
              <h2 className="text-sm font-semibold text-slate-900">
                Next Steps To Get Started
              </h2>
              <ol className="mt-1 list-decimal space-y-1 pl-4 text-[11px] text-slate-700">
                <li>Submit a quick interest form with your contact info.</li>
                <li>
                  An Elevate For Humanity team member follows up to confirm
                  details and funding.
                </li>
                <li>
                  Complete any paperwork needed through WorkOne, partners, or
                  our portal.
                </li>
                <li>Get your official start date and course access.</li>
              </ol>

              <div className="mt-3 space-y-2">
                <a
                  href="/contact"
                  className="inline-flex w-full items-center justify-center rounded-md bg-brandPrimary px-4 py-2 text-[11px] font-semibold text-white hover:bg-brandPrimaryDark"
                >
                  Submit Interest &amp; Request Follow-Up
                </a>
                <a
                  href="/contact"
                  className="inline-flex w-full items-center justify-center rounded-md border border-slate-200 bg-white px-4 py-2 text-[11px] font-semibold text-slate-800 hover:bg-slate-50"
                >
                  I Need To Talk To Someone First
                </a>
              </div>
            </section>
          </aside>
        </div>

        {/* Optional: link back to public info */}
        <div className="mt-6 text-[11px] text-slate-500">
          <p>
            Want to re-read the full public overview for this program?{" "}
            <a
              href={`/courses/${course.slug}`}
              className="font-semibold text-brandPrimary hover:underline"
            >
              View program details here.
            </a>
          </p>
        </div>
      </main>
    </div>
  );
}
