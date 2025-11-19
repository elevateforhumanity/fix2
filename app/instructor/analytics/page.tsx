import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

async function getInstructorMetrics(instructorId: string) {
  const supabase = await createClient();

  const { data: courses } = await supabase
    .from('courses')
    .select(
      `
      id,
      title,
      enrollments:enrollments(
        id,
        status,
        progress
      )
    `
    )
    .eq('instructor_id', instructorId);

  return (courses || []).map((c: any) => {
    const enrollments = c.enrollments || [];
    const completed = enrollments.filter(
      (e: any) => e.status === 'completed'
    ).length;
    const completionRate =
      enrollments.length === 0 ? 0 : (completed / enrollments.length) * 100;
    const avgProgress =
      enrollments.length === 0
        ? 0
        : enrollments.reduce(
            (sum: number, e: any) => sum + (e.progress || 0),
            0
          ) / enrollments.length;

    return {
      id: c.id,
      title: c.title,
      enrollments: enrollments.length,
      completionRate,
      avgProgress,
    };
  });
}

export default async function InstructorAnalyticsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Check if user is instructor
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (profile?.role !== 'instructor') {
    redirect('/');
  }

  const metrics = await getInstructorMetrics(user.id);

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="mx-auto max-w-5xl px-4 py-10">
        <h1 className="text-2xl font-semibold text-slate-900">
          Instructor Analytics
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          View enrollment, completion, and pacing for your courses.
        </p>

        <div className="mt-6 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500">
                  Course
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500">
                  Enrollments
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500">
                  Avg Progress
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500">
                  Completion Rate
                </th>
              </tr>
            </thead>
            <tbody>
              {metrics.map((m) => (
                <tr key={m.id} className="border-t border-slate-100">
                  <td className="px-4 py-3 text-slate-800">{m.title}</td>
                  <td className="px-4 py-3 text-slate-800">{m.enrollments}</td>
                  <td className="px-4 py-3 text-slate-800">
                    {m.avgProgress.toFixed(1)}%
                  </td>
                  <td className="px-4 py-3 text-slate-800">
                    {m.completionRate.toFixed(1)}%
                  </td>
                </tr>
              ))}
              {metrics.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="px-4 py-6 text-center text-sm text-slate-500"
                  >
                    No courses found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
