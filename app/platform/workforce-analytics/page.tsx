// app/platform/workforce-analytics/page.tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Workforce Analytics - Real-Time Outcomes & Reporting",
  description: "Workforce analytics dashboard for WIOA, WRG, and JRI programs. Track enrollment, completion rates, job placements, and compliance metrics in real-time.",
  keywords: ["workforce analytics", "WIOA reporting", "outcome tracking", "compliance metrics", "program performance"],
  openGraph: {
    title: "Workforce Analytics | Elevate for Humanity",
    description: "Track enrollment, completion rates, job placements, and compliance metrics in real-time.",
    images: ["/images/hero-banner-new.png"],
    type: "website",
  },
};

export default function WorkforceAnalyticsPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 px-6 py-16 sm:px-10 lg:px-24">
      <div className="max-w-4xl mx-auto">
        <p className="text-xs font-semibold tracking-wide text-orange-400 uppercase">
          Platform • Workforce Boards & Admin
        </p>
        <h1 className="mt-2 text-3xl sm:text-4xl font-bold">
          Workforce Analytics – real-time outcomes for WIOA, WRG, and JRI.
        </h1>
        <p className="mt-4 text-sm sm:text-base text-slate-200">
          Elevate For Humanity was built around workforce reporting from the
          beginning. Administrators and workforce boards can see enrollment,
          progress, completion, and employment outcomes across all programs and
          partners in one place.
        </p>

        <section className="mt-8 space-y-4">
          <h2 className="text-xl sm:text-2xl font-semibold">
            What administrators can see
          </h2>
          <ul className="space-y-2 text-sm text-slate-200">
            <li>• Active enrollments by program, funding source, and site.</li>
            <li>
              • Attendance, progress, and credential completion trends over
              time.
            </li>
            <li>
              • Employment and wage outcomes where data sharing agreements
              allow.
            </li>
            <li>
              • Employer participation and repeat engagement with OJT/WEX and
              upskilling.
            </li>
            <li>
              • Data slices by population focus, such as re-entry, youth, and
              justice-involved learners.
            </li>
          </ul>
        </section>

        <section className="mt-8 space-y-3">
          <h2 className="text-xl sm:text-2xl font-semibold">
            Reporting for grants and oversight
          </h2>
          <p className="text-sm sm:text-base text-slate-200">
            Instead of chasing spreadsheets and email threads, administrators
            can export clean, consistent reports for board packets, grant
            renewals, and state or federal partners. The goal is simple:
            Elevate handles the data plumbing so partners can focus on outcomes.
          </p>
        </section>
      </div>
    </main>
  );
}
