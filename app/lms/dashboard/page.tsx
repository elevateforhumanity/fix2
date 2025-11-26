import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getCurrentUser } from "@/lib/auth";
import Link from "next/link";
import Image from "next/image";
import { 
  BookOpen, 
  Clock, 
  Award, 
  TrendingUp, 
  Calendar,
  MessageSquare,
  PlayCircle,
  Target,
  Users,
  Bell,
  Search,
  ChevronRight
} from 'lucide-react';

// Add page-level caching
export const revalidate = 300; // Cache for 5 minutes

export default async function LMSDashboard() {
  const supabase = await createClient();
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  // Execute all queries in parallel for faster loading
  const [
    { data: enrollments },
    { data: notifications },
    { data: certificates },
  ] = await Promise.all([
    supabase
      .from("enrollments")
      .select(
        `
        id,
        course_id,
        started_at,
        courses (
          id,
          title,
          slug
        )
      `
      )
      .eq("user_id", user.id)
      .eq("status", "active")
      .order("started_at", { ascending: false })
      .limit(3),
    supabase
      .from("notifications")
      .select("*")
      .eq("user_id", user.id)
      .eq("read", false)
      .order("created_at", { ascending: false })
      .limit(3),
    supabase
      .from("certificates")
      .select("id")
      .eq("user_id", user.id),
  ]);

  const activeEnrollments = enrollments || [];
  const unreadNotifications = notifications || [];
  const certificateCount = certificates?.length || 0;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Simplified Top Navigation */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Link href="/" className="text-xl font-bold text-blue-600">
                Elevate LMS
              </Link>
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search courses..."
                  className="pl-10 pr-4 py-2 w-80 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="relative p-2 hover:bg-slate-100 rounded-lg transition">
                <Bell className="w-5 h-5 text-slate-600" />
                {unreadNotifications.length > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                )}
              </button>
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
                {user.email?.charAt(0).toUpperCase() || "U"}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section - Primary Block 1 */}
        <div className="relative bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl overflow-hidden mb-8">
          <div className="absolute inset-0">
            <Image
              src="/media/hero/hero-student-dashboard.jpg"
              alt="Student learning environment"
              fill
              className="object-cover opacity-20"
              priority
            />
          </div>
          <div className="relative p-8 text-white">
            <h1 className="text-3xl font-bold mb-2">Welcome back!</h1>
            <p className="text-red-50 text-lg mb-6">Continue your learning journey</p>
            <div className="flex gap-4">
              <Link 
                href="/lms/courses" 
                className="bg-white text-red-700 px-6 py-3 rounded-lg font-semibold hover:bg-red-50 transition"
              >
                Browse Courses
              </Link>
              <Link 
                href="/lms/calendar" 
                className="bg-red-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-800 transition"
              >
                View Calendar
              </Link>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content - 2 columns */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Stats - Primary Block 2 */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-xl font-bold text-slate-900 mb-6">Your Progress</h2>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <BookOpen className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-blue-700">{activeEnrollments.length}</div>
                  <div className="text-sm text-slate-600">Active Courses</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <Award className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-purple-700">{certificateCount}</div>
                  <div className="text-sm text-slate-600">Certificates</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-700">87%</div>
                  <div className="text-sm text-slate-600">Avg. Score</div>
                </div>
              </div>
            </div>

            {/* Continue Learning - Primary Block 3 */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-slate-900">Continue Learning</h2>
                <Link href="/lms/courses" className="text-blue-600 font-semibold hover:text-blue-700 flex items-center gap-1">
                  View All <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="space-y-4">
                {activeEnrollments.length > 0 ? (
                  activeEnrollments.map((enrollment: any) => (
                    <Link
                      key={enrollment.id}
                      href={`/lms/courses/${enrollment.courses?.slug || enrollment.course_id}`}
                      className="flex gap-4 p-4 rounded-lg border border-slate-200 hover:border-blue-300 hover:bg-blue-50/50 transition"
                    >
                      <div className="w-24 h-16 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-700 flex-shrink-0 flex items-center justify-center">
                        <BookOpen className="text-white/40" size={32} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-slate-900">{enrollment.courses?.title || 'Untitled Course'}</h3>
                        <p className="text-sm text-slate-600 mt-1">Continue where you left off</p>
                        <div className="mt-2 flex items-center gap-2">
                          <div className="flex-1 bg-slate-200 rounded-full h-2">
                            <div className="bg-blue-600 h-2 rounded-full" style={{ width: '45%' }} />
                          </div>
                          <span className="text-sm font-medium text-slate-700">45%</span>
                        </div>
                      </div>
                      <button className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white hover:bg-blue-700 transition">
                        <PlayCircle className="w-5 h-5" />
                      </button>
                    </Link>
                  ))
                ) : (
                  <div className="text-center py-8 text-slate-600">
                    <BookOpen className="w-12 h-12 mx-auto mb-3 text-slate-400" />
                    <p>No active courses yet</p>
                    <Link href="/lms/courses" className="text-blue-600 hover:text-blue-700 font-medium mt-2 inline-block">
                      Browse Courses →
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Links - Primary Block 4 */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-xl font-bold text-slate-900 mb-4">Quick Access</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <Link href="/lms/forums" className="p-4 rounded-lg border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition text-center">
                  <MessageSquare className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                  <div className="text-sm font-medium text-slate-900">Forums</div>
                </Link>
                <Link href="/lms/study-groups" className="p-4 rounded-lg border border-slate-200 hover:border-purple-300 hover:bg-purple-50 transition text-center">
                  <Users className="w-6 h-6 mx-auto mb-2 text-purple-600" />
                  <div className="text-sm font-medium text-slate-900">Study Groups</div>
                </Link>
                <Link href="/lms/chat" className="p-4 rounded-lg border border-slate-200 hover:border-green-300 hover:bg-green-50 transition text-center">
                  <MessageSquare className="w-6 h-6 mx-auto mb-2 text-green-600" />
                  <div className="text-sm font-medium text-slate-900">AI Tutor</div>
                </Link>
                <Link href="/lms/analytics" className="p-4 rounded-lg border border-slate-200 hover:border-orange-300 hover:bg-orange-50 transition text-center">
                  <TrendingUp className="w-6 h-6 mx-auto mb-2 text-orange-600" />
                  <div className="text-sm font-medium text-slate-900">Analytics</div>
                </Link>
              </div>
            </div>
          </div>

          {/* Sidebar - 1 column */}
          <div className="space-y-6">
            {/* Upcoming Events - Primary Block 5 */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-slate-900">Upcoming</h3>
                <Link href="/lms/calendar" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                  View All
                </Link>
              </div>
              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
                  <div className="text-xs font-semibold text-blue-600 mb-1">Today</div>
                  <div className="text-sm font-medium text-slate-900">Live Session</div>
                  <div className="text-xs text-slate-600 mt-1">2:00 PM</div>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <div className="text-xs font-semibold text-slate-600 mb-1">Tomorrow</div>
                  <div className="text-sm font-medium text-slate-900">Quiz Due</div>
                  <div className="text-xs text-slate-600 mt-1">11:59 PM</div>
                </div>
              </div>
            </div>

            {/* Achievements - Primary Block 6 */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h3 className="font-bold text-slate-900 mb-4">Recent Achievements</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200">
                  <div className="text-2xl">🏆</div>
                  <div>
                    <div className="text-sm font-semibold text-slate-900">Course Completed</div>
                    <div className="text-xs text-slate-600">Module 1 finished</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200">
                  <div className="text-2xl">⭐</div>
                  <div>
                    <div className="text-sm font-semibold text-slate-900">Perfect Score</div>
                    <div className="text-xs text-slate-600">100% on quiz</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
