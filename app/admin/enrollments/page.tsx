import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import { listEnrollments } from "@/lib/db/enrollments";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Enrollments | Admin | Elevate for Humanity",
  description:
    "View active enrollments and auto-assigned courses for Elevate for Humanity programs.",
};

type EnrollmentRow = {
  id: string;
  created_at: string;
  program_id: string;
  email: string;
  stripe_checkout_session_id: string | null;
  status: string;
};

type StudentCourseRow = {
  id: string;
  created_at: string;
  program_id: string;
  email: string;
  course_slug: string;
  enrollment_id: string | null;
};

export default async function AdminEnrollmentsPage() {
  // Try Supabase first, fallback to in-memory
  if (supabase) {
    const { data: enrollmentsData, error: enrollmentsError } = await supabase
      .from("enrollments")
      .select("id, created_at, program_id, email, stripe_checkout_session_id, status")
      .order("created_at", { ascending: false });

    if (enrollmentsError) {
      console.error("[AdminEnrollments] Supabase error (enrollments):", enrollmentsError);
    }

    const { data: studentCoursesData, error: scError } = await supabase
      .from("student_courses")
      .select("id, created_at, program_id, email, course_slug, enrollment_id");

    if (scError) {
      console.error("[AdminEnrollments] Supabase error (student_courses):", scError);
    }

    const enrollments = (enrollmentsData || []) as EnrollmentRow[];
    const studentCourses = (studentCoursesData || []) as StudentCourseRow[];

    // Attach courses to each enrollment by enrollment_id and fallback by email+program
    const coursesByEnrollmentId = new Map<string, string[]>();
    const coursesByEmailProgram = new Map<string, string[]>();

    for (const sc of studentCourses) {
      if (sc.enrollment_id) {
        const list = coursesByEnrollmentId.get(sc.enrollment_id) || [];
        list.push(sc.course_slug);
        coursesByEnrollmentId.set(sc.enrollment_id, list);
      }
      const key = `${sc.email}|${sc.program_id}`;
      const list2 = coursesByEmailProgram.get(key) || [];
      list2.push(sc.course_slug);
      coursesByEmailProgram.set(key, list2);
    }

    const enrollmentWithCourses = enrollments.map((enr) => {
      const direct = coursesByEnrollmentId.get(enr.id);
      const key = `${enr.email}|${enr.program_id}`;
      const byKey = coursesByEmailProgram.get(key);
      const courseSlugs = direct && direct.length ? direct : byKey || [];
      return { ...enr, courseSlugs };
    });

    return (
      <main className="min-h-screen bg-slate-950 text-white">
        <section className="border-b border-slate-800 bg-slate-950">
          <div className="mx-auto max-w-6xl px-4 py-6">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-orange-400">
              Admin – Enrollments
            </p>
            <h1 className="mt-1 text-2xl font-bold">Active Enrollments</h1>
            <p className="mt-2 text-xs text-slate-300">
              These records are created automatically when Stripe confirms payment.
              The course list shows what was auto-assigned based on the program.
            </p>
            <div className="mt-3 flex flex-wrap gap-2 text-[11px]">
              <Link
                href="/admin/applicants-live"
                className="rounded-md border border-slate-700 px-4 py-2 font-semibold text-slate-100 hover:bg-slate-900"
              >
                View Applicants
              </Link>
              <Link
                href="/admin/analytics/programs"
                className="rounded-md border border-slate-700 px-4 py-2 font-semibold text-slate-100 hover:bg-slate-900"
              >
                Program Analytics
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-slate-900">
          <div className="mx-auto max-w-6xl px-4 py-6 text-xs">
            {enrollmentWithCourses.length === 0 ? (
              <p className="text-slate-300">
                No enrollments yet. When a learner completes a Stripe checkout for
                a program (with metadata.programId set), enrollments and course
                access will appear here.
              </p>
            ) : (
              <div className="space-y-3">
                {enrollmentWithCourses.map((enr) => (
                  <article
                    key={enr.id}
                    className="rounded-xl border border-slate-800 bg-slate-950/90 p-3"
                  >
                    <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                      <div>
                        <p className="text-[11px] font-semibold text-slate-100">
                          {enr.email}
                        </p>
                        <p className="text-[10px] text-slate-400">
                          Program:{" "}
                          <span className="font-mono text-slate-100">
                            {enr.program_id}
                          </span>
                        </p>
                        <p className="text-[10px] text-slate-400">
                          Enrolled: {new Date(enr.created_at).toLocaleString()}
                        </p>
                        <p className="mt-1 text-[10px] text-slate-400">
                          Status:{" "}
                          <span className="font-semibold text-slate-100">
                            {enr.status}
                          </span>
                        </p>
                        {enr.stripe_checkout_session_id && (
                          <p className="mt-1 text-[10px] text-slate-500">
                            Stripe Session ID: {enr.stripe_checkout_session_id}
                          </p>
                        )}
                        <div className="mt-2 text-[10px] text-slate-300">
                          <p className="font-semibold text-slate-100">
                            Course Access:
                          </p>
                          {enr.courseSlugs.length > 0 ? (
                            <ul className="mt-1 list-disc pl-5">
                              {enr.courseSlugs.map((slug) => (
                                <li key={slug}>
                                  <Link
                                    href={`/courses/${slug}`}
                                    className="font-mono text-orange-300 hover:text-orange-200"
                                  >
                                    {slug}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="mt-1 text-slate-400">
                              No courses assigned yet. Check{" "}
                              <code className="bg-slate-900 px-1">
                                enrollmentMappings.ts
                              </code>{" "}
                              for this program.
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col items-start gap-2 text-[10px] md:items-end">
                        <Link
                          href={`/admin/applicants-live?programId=${encodeURIComponent(
                            enr.program_id
                          )}`}
                          className="rounded-md border border-slate-700 px-3 py-1 font-semibold text-slate-100 hover:bg-slate-900"
                        >
                          View Applicants (Filtered)
                        </Link>
                        <Link
                          href="/courses"
                          className="rounded-md border border-slate-700 px-3 py-1 font-semibold text-slate-100 hover:bg-slate-900"
                        >
                          Go to Courses List
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    );
  }

  // Fallback to in-memory enrollments
  const enrollments = await listEnrollments();

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 text-slate-900">
      <h1 className="text-2xl font-bold">Program Enrollments</h1>
      <p className="mt-2 text-sm text-slate-600">
        This is a basic view backed by an in-memory store. Replace with your real DB.
      </p>

      <table className="mt-6 w-full text-left text-xs">
        <thead>
          <tr className="border-b border-slate-200 text-[11px] uppercase text-slate-500">
            <th className="py-2">Enrollment ID</th>
            <th className="py-2">Student</th>
            <th className="py-2">Program</th>
            <th className="py-2">Funding</th>
            <th className="py-2">Status</th>
            <th className="py-2">Stripe Ref</th>
          </tr>
        </thead>
        <tbody>
          {enrollments.map((e) => (
            <tr key={e.id} className="border-b border-slate-100">
              <td className="py-2 pr-2 align-top text-[11px]">{e.id}</td>
              <td className="py-2 pr-2 align-top text-[11px]">{e.studentId}</td>
              <td className="py-2 pr-2 align-top text-[11px]">{e.programId}</td>
              <td className="py-2 pr-2 align-top text-[11px]">{e.fundingSource}</td>
              <td className="py-2 pr-2 align-top text-[11px]">{e.status}</td>
              <td className="py-2 pr-2 align-top text-[11px]">
                {e.stripeRefId ?? "—"}
              </td>
            </tr>
          ))}
          {enrollments.length === 0 && (
            <tr>
              <td colSpan={6} className="py-4 text-[11px] text-slate-500">
                No enrollments yet. Once Stripe checkouts complete and the webhook
                runs, new enrollments will appear here.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
