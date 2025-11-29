import { getSupabaseServerClient } from "../../../lib/supabaseServer";
import Link from "next/link";
import { BookOpen, Award, Clock, TrendingUp, CheckCircle, ArrowRight, Flame, Trophy, Star, Target } from "lucide-react";

export const metadata = {
  title: "Student Dashboard | Elevate LMS",
  description: "Your learning dashboard - track progress, access courses, and manage your training",
};

export default async function StudentDashboardPage() {
  const supabase = getSupabaseServerClient();

  // Fetch enrollments
  const { data: enrollments } = await supabase
    .from("enrollments")
    .select(`
      id,
      status,
      start_date,
      end_date,
      programs (name, code)
    `)
    .order("created_at", { ascending: false })
    .limit(25);

  // Fetch user points (gamification)
  const { data: userPoints } = await supabase
    .from("user_points")
    .select("*")
    .single();

  // Fetch user badges
  const { data: userBadges } = await supabase
    .from("user_badges")
    .select(`
      *,
      badges (name, description, icon, badge_type)
    `)
    .order("earned_at", { ascending: false })
    .limit(6);

  // Fetch learning streak
  const { data: streak } = await supabase
    .from("learning_streaks")
    .select("*")
    .single();

  // Fetch user progress
  const { data: progress } = await supabase
    .from("user_progress")
    .select("*")
    .limit(5);

  // Fetch course recommendations
  const { data: recommendations } = await supabase
    .from("course_recommendations")
    .select(`
      *,
      programs (name, code, description)
    `)
    .order("score", { ascending: false })
    .limit(3);

  const totalPoints = userPoints?.total_points || 0;
  const currentLevel = userPoints?.current_level || 1;
  const currentStreak = streak?.current_streak || 0;
  const longestStreak = streak?.longest_streak || 0;

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
        {/* Gamification Row - Points, Level, Streak */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Points Display */}
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 shadow-lg text-white">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                  <Star size={24} className="text-white" />
                </div>
                <div>
                  <p className="text-sm text-orange-100">Total Points</p>
                  <p className="text-3xl font-bold">{totalPoints.toLocaleString()}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-orange-100">Level {currentLevel}</span>
              <Link href="/student/leaderboard" className="text-white font-semibold hover:underline">
                View Leaderboard →
              </Link>
            </div>
          </div>

          {/* Streak Tracker */}
          <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-2xl p-6 shadow-lg text-white">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                  <Flame size={24} className="text-white" />
                </div>
                <div>
                  <p className="text-sm text-red-100">Current Streak</p>
                  <p className="text-3xl font-bold">{currentStreak} days</p>
                </div>
              </div>
            </div>
            <div className="text-sm text-red-100">
              Longest: {longestStreak} days
            </div>
          </div>

          {/* Badges */}
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 shadow-lg text-white">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                  <Trophy size={24} className="text-white" />
                </div>
                <div>
                  <p className="text-sm text-purple-100">Badges Earned</p>
                  <p className="text-3xl font-bold">{userBadges?.length || 0}</p>
                </div>
              </div>
            </div>
            <Link href="/student/badges" className="text-sm text-white font-semibold hover:underline">
              View All Badges →
            </Link>
          </div>
        </div>

        {/* Badge Showcase */}
        {userBadges && userBadges.length > 0 && (
          <div className="bg-white rounded-2xl p-6 shadow-md border border-slate-200 mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Recent Badges</h2>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
              {userBadges.map((badge: any) => (
                <div key={badge.id} className="text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center mx-auto mb-2 shadow-lg">
                    <span className="text-2xl">{badge.badges?.icon || "🏆"}</span>
                  </div>
                  <p className="text-xs font-semibold text-slate-900">{badge.badges?.name}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content - Your Programs */}
          <div className="lg:col-span-2 space-y-6">
            <section className="bg-white rounded-2xl p-6 shadow-md border border-slate-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-900">Your Programs</h2>
                <Link href="/programs" className="text-blue-600 hover:text-blue-700 font-semibold text-sm">
                  View All →
                </Link>
              </div>

              {!enrollments || enrollments.length === 0 ? (
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
                  {enrollments.map((enr: any) => {
                    const userProgress = progress?.find((p: any) => p.enrollment_id === enr.id);
                    const progressPercent = userProgress?.progress_percentage || 0;

                    return (
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
                                : "bg-slate-100 text-slate-700"
                            }`}
                          >
                            {enr.status}
                          </span>
                        </div>

                        {/* Progress Bar */}
                        <div className="mb-4">
                          <div className="flex items-center justify-between text-sm mb-2">
                            <span className="text-slate-600">Progress</span>
                            <span className="font-semibold text-slate-900">{progressPercent.toFixed(0)}%</span>
                          </div>
                          <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-full transition-all"
                              style={{ width: `${progressPercent}%` }}
                            ></div>
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
                    );
                  })}
                </div>
              )}
            </section>
          </div>

          {/* Sidebar - Recommendations */}
          <div className="space-y-6">
            {/* Recommended Courses */}
            {recommendations && recommendations.length > 0 && (
              <section className="bg-white rounded-2xl p-6 shadow-md border border-slate-200">
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Target size={20} className="text-blue-600" />
                  Recommended For You
                </h3>
                <div className="space-y-3">
                  {recommendations.map((rec: any) => (
                    <Link
                      key={rec.id}
                      href={`/programs/${rec.programs?.code?.toLowerCase()}`}
                      className="block p-4 rounded-lg hover:bg-slate-50 transition-colors border border-slate-200"
                    >
                      <p className="font-semibold text-slate-900 mb-1">{rec.programs?.name}</p>
                      <p className="text-xs text-slate-600 line-clamp-2">{rec.programs?.description}</p>
                      <p className="text-xs text-blue-600 font-semibold mt-2">
                        {(rec.score * 100).toFixed(0)}% match
                      </p>
                    </Link>
                  ))}
                </div>
              </section>
            )}

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
                  href="/community"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                    <Trophy size={20} className="text-purple-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Community</p>
                    <p className="text-xs text-slate-600">Join discussions</p>
                  </div>
                </Link>
                <Link
                  href="/career-center"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                    <Award size={20} className="text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Career Center</p>
                    <p className="text-xs text-slate-600">Build your resume</p>
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
