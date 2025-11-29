import { getSupabaseServerClient } from "../../../lib/supabaseServer";
import Link from "next/link";
import { BookOpen, Award, Clock, TrendingUp, CheckCircle, ArrowRight, Calendar, Target, Flame, Trophy, Star } from "lucide-react";
import { PointsDisplay } from "@/components/gamification/PointsDisplay";
import { BadgeShowcase } from "@/components/gamification/BadgeShowcase";
import { StreakTracker } from "@/components/gamification/StreakTracker";

export const metadata = {
  title: "Student Dashboard | Elevate LMS",
  description: "Your learning dashboard - track progress, access courses, and manage your training",
};

interface EnrollmentRow {
  id: string;
  status: string;
  start_date: string | null;
  end_date: string | null;
  programs: {
    name: string;
    code: string;
  }[];
}

export default async function StudentDashboardPage() {
  const supabase = getSupabaseServerClient();

  const { data, error } = await supabase
    .from("enrollments")
    .select(
      `
      id,
      status,
      start_date,
      end_date,
      programs (
        name,
        code
      )
    `,
    )
    .order("created_at", { ascending: false })
    .limit(25);

  const enrollments = (data ?? []) as unknown as EnrollmentRow[];

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Welcome Back!</h1>
              <p className="text-slate-600 mt-1">Continue your learning journey</p>
            </div>
            <Link
              href="/programs"
              className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-full font-semibold hover:bg-orange-600 transition-all hover:scale-105 shadow-lg"
            >
              Browse Programs
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-8">
        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-md border border-slate-200">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <BookOpen size={24} className="text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{enrollments.length}</p>
                <p className="text-sm text-slate-600">Active Programs</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md border border-slate-200">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle size={24} className="text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">0</p>
                <p className="text-sm text-slate-600">Completed</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md border border-slate-200">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                <Clock size={24} className="text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">0h</p>
                <p className="text-sm text-slate-600">Learning Time</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md border border-slate-200">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                <Award size={24} className="text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">0</p>
                <p className="text-sm text-slate-600">Certificates</p>
              </div>
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-8 rounded-2xl border-2 border-red-200 bg-red-50 p-6 shadow-md">
            <p className="text-red-800 font-semibold mb-2">Unable to load enrollments</p>
            <p className="text-sm text-red-600">
              There was a problem connecting to the database. Please check your Supabase configuration.
            </p>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Your Programs */}
            <section className="bg-white rounded-2xl p-6 shadow-md border border-slate-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-900">Your Programs</h2>
                <Link href="/programs" className="text-blue-600 hover:text-blue-700 font-semibold text-sm">
                  View All →
                </Link>
              </div>

              {enrollments.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
                    <BookOpen size={32} className="text-slate-400" />
                  </div>
                  <p className="text-slate-600 mb-4">No programs enrolled yet</p>
                  <Link
                    href="/programs"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-all"
                  >
                    Browse Programs
                    <ArrowRight size={18} />
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {enrollments.map((enr) => (
                    <article
                      key={enr.id}
                      className="rounded-xl border-2 border-slate-200 bg-gradient-to-br from-white to-slate-50 p-6 hover:border-orange-300 transition-all hover:shadow-lg"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <span className="inline-block px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-bold mb-2">
                            {enr.programs?.[0]?.code ?? "PROGRAM"}
                          </span>
                          <h3 className="text-xl font-bold text-slate-900">
                            {enr.programs?.[0]?.name ?? "Program Name"}
                          </h3>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            enr.status === "active"
                              ? "bg-green-100 text-green-700"
                              : enr.status === "completed"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-slate-100 text-slate-700"
                          }`}
                        >
                          {enr.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <Calendar size={16} className="text-blue-600" />
                          <span>Start: {enr.start_date ?? "TBD"}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <Target size={16} className="text-green-600" />
                          <span>End: {enr.end_date ?? "TBD"}</span>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="mb-4">
                        <div className="flex items-center justify-between text-sm mb-2">
                          <span className="text-slate-600">Progress</span>
                          <span className="font-semibold text-slate-900">0%</span>
                        </div>
                        <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-full" style={{ width: "0%" }}></div>
                        </div>
                      </div>

                      <Link
                        href={`/student/courses`}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-full font-semibold hover:bg-orange-600 transition-all hover:scale-105 shadow-md"
                      >
                        Continue Learning
                        <ArrowRight size={18} />
                      </Link>
                    </article>
                  ))}
                </div>
              )}
            </section>

            {/* Recent Activity */}
            <section className="bg-white rounded-2xl p-6 shadow-md border border-slate-200">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Recent Activity</h2>
              <div className="text-center py-8">
                <p className="text-slate-600">No recent activity</p>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <section className="bg-white rounded-2xl p-6 shadow-md border border-slate-200">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link
                  href="/student/courses"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                    <BookOpen size={20} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">My Courses</p>
                    <p className="text-xs text-slate-600">Access learning materials</p>
                  </div>
                </Link>
                <Link
                  href="/student/certificates"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                    <Award size={20} className="text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Certificates</p>
                    <p className="text-xs text-slate-600">View your achievements</p>
                  </div>
                </Link>
                <Link
                  href="/student/profile"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                    <TrendingUp size={20} className="text-purple-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">My Profile</p>
                    <p className="text-xs text-slate-600">Update your information</p>
                  </div>
                </Link>
              </div>
            </section>

            {/* Support */}
            <section className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 shadow-md text-white">
              <h3 className="text-lg font-bold mb-2">Need Help?</h3>
              <p className="text-sm text-orange-100 mb-4">
                Our support team is here to help you succeed
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white text-orange-600 rounded-full font-semibold hover:bg-orange-50 transition-all text-sm"
              >
                Contact Support
                <ArrowRight size={16} />
              </Link>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
