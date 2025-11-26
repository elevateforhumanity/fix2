// app/page.tsx

import Link from "next/link";
import { allCourses } from "@/lms-data/courses";

export default function HomePage() {
  const highlightCourses = allCourses.slice(0, 3);

  return (
    <div className="min-h-screen w-full bg-white">
      {/* HERO SECTION */}
      <section className="w-full bg-white border-b-4 border-brandPrimary">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-16 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl">
            <p className="text-xs uppercase tracking-wide text-gray-600">
              Elevate For Humanity · Workforce · Education · Community
            </p>
            <h1 className="mt-2 text-4xl font-bold text-brandBlack md:text-5xl">
              Training, funding, and support that actually fit real life.
            </h1>
            <p className="mt-3 text-base text-gray-700">
              Elevate For Humanity connects people to{" "}
              <span className="font-semibold">
                career training, state and federal workforce funding, and real
                employers
              </span>{" "}
              so you&apos;re not stuck figuring it out alone. We work with
              WIOA, Workforce Ready Grant (WRG), JRI, WEX, apprenticeships, and
              more.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/programs"
                className="inline-flex items-center justify-center rounded-md bg-brandPrimary px-6 py-3 text-sm font-semibold text-white shadow-lg hover:bg-brandPrimaryDark transition-colors"
              >
                Explore Programs
              </Link>
              <Link
                href="/funding"
                className="inline-flex items-center justify-center rounded-md border-2 border-brandPrimary bg-white px-6 py-3 text-sm font-semibold text-brandPrimary hover:bg-red-50 transition-colors"
              >
                See How Funding Works
              </Link>
            </div>
          </div>

          {/* Right side hero card */}
          <div className="w-full max-w-sm rounded-xl border-2 border-gray-200 bg-white p-6 shadow-lg">
            <h2 className="text-lg font-bold text-brandBlack">
              Who We Serve
            </h2>
            <ul className="mt-3 space-y-2 text-sm text-gray-700">
              <li className="flex items-start">
                <span className="mr-2 text-brandPrimary">•</span>
                <span>Adults ready for a career change</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-brandPrimary">•</span>
                <span>Youth 18–24 who need a real plan</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-brandPrimary">•</span>
                <span>Justice-involved individuals rebuilding their lives</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-brandPrimary">•</span>
                <span>Employers who want trained, supported talent</span>
              </li>
            </ul>
            <p className="mt-4 text-sm text-gray-600 border-t border-gray-200 pt-4">
              Our job is to connect training, funding, and employers so you have
              a real path — not just a brochure.
            </p>
          </div>
        </div>
      </section>

      {/* PROGRAM HIGHLIGHTS */}
      <section className="mx-auto max-w-6xl px-4 py-8">
        <div className="mb-4 flex items-center justify-between gap-2">
          <div>
            <h2 className="text-sm font-semibold text-slate-900">
              Career Programs Built With Employers
            </h2>
            <p className="mt-1 text-xs text-slate-600">
              From CNA and barbering to HVAC, CDL, IT support, and
              entrepreneurship — every program connects to real job pathways.
            </p>
          </div>
          <Link
            href="/programs"
            className="text-xs font-semibold text-brandPrimary hover:underline"
          >
            View All Programs
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {highlightCourses.map((course) => (
            <article
              key={course.id}
              className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-4 text-xs text-slate-800 shadow-sm"
            >
              <div>
                <h3 className="text-sm font-semibold text-slate-900">
                  {course.title}
                </h3>
                <p className="mt-1 line-clamp-3 text-[11px] text-slate-600">
                  {course.description}
                </p>
              </div>
              <div className="mt-3 space-y-1">
                <p className="text-[11px] text-slate-500">
                  {course.hoursTotal} hours ·{" "}
                  {course.deliveryMode === "IN_PERSON"
                    ? "In-Person"
                    : course.deliveryMode === "HYBRID"
                    ? "Hybrid"
                    : "Online"}
                </p>
                <Link
                  href={`/courses/${course.slug}`}
                  className="inline-flex w-full items-center justify-center rounded-md bg-brandPrimary px-3 py-1.5 text-[11px] font-semibold text-white hover:bg-brandPrimaryDark"
                >
                  View Program
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* FUNDING + EMPLOYER STRIP */}
      <section className="w-full bg-slate-50">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 md:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-white p-4 text-xs text-slate-800 shadow-sm">
            <h2 className="text-sm font-semibold text-slate-900">
              Students: How Funding Works
            </h2>
            <p className="mt-1 text-[11px] text-slate-600">
              We help you match with funding like{" "}
              <span className="font-semibold">
                WIOA, WRG, JRI, WEX, apprenticeships, and employer-sponsored
                training
              </span>
              . You won&apos;t be left to figure it out alone or read through
              government websites by yourself.
            </p>
            <Link
              href="/funding"
              className="mt-3 inline-flex items-center text-[11px] font-semibold text-brandPrimary hover:underline"
            >
              Learn more about funding options
            </Link>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4 text-xs text-slate-800 shadow-sm">
            <h2 className="text-sm font-semibold text-slate-900">
              Employers: Hire With Support
            </h2>
            <p className="mt-1 text-[11px] text-slate-600">
              Employers can access{" "}
              <span className="font-semibold">
                OJT reimbursements, WEX placements, JRI hiring incentives, and
                upskilling support
              </span>{" "}
              when they partner with Elevate For Humanity. We bring you
              pre-trained candidates and help support them on the job.
            </p>
            <Link
              href="/employers"
              className="mt-3 inline-flex items-center text-[11px] font-semibold text-brandPrimary hover:underline"
            >
              See employer partnership options
            </Link>
          </div>
        </div>
      </section>

      {/* PHILANTHROPY / COMMUNITY */}
      <section className="mx-auto max-w-6xl px-4 pb-10 pt-4">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h2 className="text-sm font-semibold text-slate-900">
              More Than Classes. This Is Community.
            </h2>
            <p className="mt-1 text-xs text-slate-600">
              Through our nonprofit arm, Selfish Inc., we support mental
              wellness, financial literacy, tax help, and community-led projects
              for people who are normally left out of the conversation.
            </p>
            <Link
              href="/philanthropy"
              className="mt-3 inline-flex items-center text-xs font-semibold text-brandPrimary hover:underline"
            >
              Learn about our community & philanthropy work
            </Link>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-xs text-slate-800">
            <h3 className="text-sm font-semibold text-slate-900">
              Ready To Talk To A Human?
            </h3>
            <p className="mt-1 text-[11px] text-slate-600">
              If you&apos;re overwhelmed, that&apos;s normal. You don&apos;t have to
              organize all of this alone. Click below and let us know where you
              are in life right now — we&apos;ll help you sort out options.
            </p>
            <Link
              href="/contact"
              className="mt-3 inline-flex items-center justify-center rounded-md bg-brandPrimary px-4 py-2 text-xs font-semibold text-white hover:bg-brandPrimaryDark"
            >
              Contact Us / Get Started
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
