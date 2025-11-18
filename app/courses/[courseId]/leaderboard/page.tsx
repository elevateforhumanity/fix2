// app/courses/[courseId]/leaderboard/page.tsx
import { getCourseLeaderboard } from '@/lib/gamification/points';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function LeaderboardPage({
  params,
}: {
  params: { courseId: string };
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const scores = await getCourseLeaderboard(params.courseId);

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="mx-auto max-w-3xl px-4 py-8">
        <h1 className="text-xl font-semibold text-slate-900">Leaderboard</h1>
        <p className="mt-1 text-xs text-slate-600">
          Top learners in this course based on activity and completion.
        </p>

        <div className="mt-4 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-slate-500">
                  Rank
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-slate-500">
                  Learner
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-slate-500">
                  Points
                </th>
              </tr>
            </thead>
            <tbody>
              {scores.map((s: any, i: number) => (
                <tr key={s.id} className="border-t border-slate-100">
                  <td className="px-4 py-2 text-slate-700">{i + 1}</td>
                  <td className="px-4 py-2 text-slate-800">
                    {s.profiles?.full_name ?? s.profiles?.email ?? 'Unknown'}
                  </td>
                  <td className="px-4 py-2 text-slate-800">{s.points}</td>
                </tr>
              ))}
              {scores.length === 0 && (
                <tr>
                  <td
                    colSpan={3}
                    className="px-4 py-6 text-center text-sm text-slate-500"
                  >
                    No points awarded yet.
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
