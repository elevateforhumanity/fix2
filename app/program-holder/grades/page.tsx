// app/program-holder/grades/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Award, CheckCircle, TrendingUp, Users } from 'lucide-react';

type GradeSummary = {
  total_grades: number;
  passed_grades: number;
  average_score: number;
};

type StudentGrades = {
  student_id: string;
  student_name: string;
  student_email: string;
  grades: any[];
  average: number;
  passed: number;
  total: number;
};

export default function ProgramHolderGradesPage() {
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState<GradeSummary | null>(null);
  const [students, setStudents] = useState<StudentGrades[]>([]);
  const [recentGrades, setRecentGrades] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchGrades();
  }, []);

  async function fetchGrades() {
    try {
      const res = await fetch('/api/program-holder/grades');
      if (!res.ok) {
        throw new Error('Failed to fetch grades');
      }
      const data = await res.json();
      setSummary(data.summary);
      setStudents(data.students);
      setRecentGrades(data.recent_grades);
    } catch (e: any) {
      setError(e.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-50">
        <p className="text-sm text-slate-400">Loading grades…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-50">
        <div className="text-center">
          <p className="text-sm text-red-400">{error}</p>
          <Link
            href="/program-holder/dashboard"
            className="mt-4 inline-block text-xs text-sky-400 hover:underline"
          >
            ← Back to dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <main className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8 md:px-8">
        <header>
          <Link
            href="/program-holder/dashboard"
            className="inline-block text-xs text-sky-400 hover:underline"
          >
            ← Back to dashboard
          </Link>
          <p className="mt-3 text-xs uppercase tracking-[0.2em] text-sky-400">
            Elevate for Humanity · Student Grades
          </p>
          <h1 className="mt-1 text-2xl font-semibold md:text-3xl">
            Student Performance & Grades
          </h1>
          <p className="mt-2 text-xs text-slate-300 md:text-sm">
            Track quiz scores, assignment grades, and overall student
            performance across all your programs.
          </p>
        </header>

        {/* Summary Stats */}
        {summary && (
          <section className="grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-sky-950 p-3">
                  <Award className="h-5 w-5 text-sky-400" />
                </div>
                <div>
                  <p className="text-xs text-slate-400">Average Score</p>
                  <p className="text-2xl font-bold text-slate-50">
                    {summary.average_score}%
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-green-950 p-3">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                </div>
                <div>
                  <p className="text-xs text-slate-400">Pass Rate</p>
                  <p className="text-2xl font-bold text-slate-50">
                    {summary.total_grades > 0
                      ? Math.round(
                          (summary.passed_grades / summary.total_grades) * 100
                        )
                      : 0}
                    %
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-purple-950 p-3">
                  <TrendingUp className="h-5 w-5 text-purple-400" />
                </div>
                <div>
                  <p className="text-xs text-slate-400">Total Assessments</p>
                  <p className="text-2xl font-bold text-slate-50">
                    {summary.total_grades}
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Student Performance */}
        <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
          <div className="mb-4 flex items-center gap-2">
            <Users className="h-5 w-5 text-sky-400" />
            <h2 className="text-sm font-semibold text-slate-50">
              Student Performance
            </h2>
          </div>

          {students.length > 0 ? (
            <div className="space-y-3">
              {students.map((student) => (
                <div
                  key={student.student_id}
                  className="rounded-xl border border-slate-800 bg-slate-950/60 p-4"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-slate-100">
                        {student.student_name}
                      </p>
                      <p className="text-xs text-slate-400">
                        {student.student_email}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-slate-50">
                        {student.average}%
                      </p>
                      <p className="text-xs text-slate-400">
                        {student.passed}/{student.total} passed
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-8 text-center">
              <Award className="mx-auto h-12 w-12 text-slate-600" />
              <p className="mt-3 text-sm text-slate-400">
                No grades recorded yet
              </p>
            </div>
          )}
        </section>

        {/* Recent Grades */}
        <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
          <h2 className="mb-4 text-sm font-semibold text-slate-50">
            Recent Grades
          </h2>

          {recentGrades.length > 0 ? (
            <div className="space-y-2">
              {recentGrades.map((grade) => {
                const percentage = Math.round(
                  (grade.score / grade.max_score) * 100
                );
                const assessmentTitle =
                  grade.quiz_title || grade.assignment_title || 'Assessment';

                return (
                  <div
                    key={grade.id}
                    className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-950/60 px-3 py-2 text-xs"
                  >
                    <div className="flex items-center gap-3">
                      {grade.passed ? (
                        <CheckCircle className="h-4 w-4 text-green-400" />
                      ) : (
                        <div className="h-4 w-4 rounded-full border-2 border-red-400" />
                      )}
                      <div>
                        <p className="font-medium text-slate-200">
                          {grade.student_name}
                        </p>
                        <p className="text-slate-400">
                          {assessmentTitle} · {grade.course_title}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-slate-100">
                        {grade.score}/{grade.max_score}
                      </p>
                      <p
                        className={`text-[10px] font-medium ${
                          grade.passed ? 'text-green-400' : 'text-red-400'
                        }`}
                      >
                        {percentage}%
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-8 text-center">
              <p className="text-sm text-slate-400">No recent grades</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
