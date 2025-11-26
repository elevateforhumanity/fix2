import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getCurrentUser } from "@/lib/auth";
import { 
  BookOpen, Calendar, MessageSquare, FileText, Award, 
  BarChart3, Video, Users, HelpCircle, Library, 
  CheckCircle, Clock, TrendingUp, Target, Zap,
  GraduationCap, Briefcase, Heart, Star
} from "lucide-react";

export const metadata = {
  title: "Student Dashboard | Elevate For Humanity",
  description: "Your complete learning hub",
  openGraph: {
    images: ["/images/programs-new/program-19.jpg"],
    type: "website",
  }};

export const dynamic = 'force-dynamic';

export default async function EnhancedStudentDashboard() {
  const supabase = await createClient();
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  // Get student data
  const { data: enrollments } = await supabase
    .from("enrollments")
    .select("*, courses(*)")
    .eq("student_id", user.id);

  const { data: certificates } = await supabase
    .from("certificates")
    .select("*")
    .eq("student_id", user.id);

  const { data: badges } = await supabase
    .from("student_badges")
    .select("*, badges(*)")
    .eq("student_id", user.id);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-slate-900">Welcome back, {user.email?.split('@')[0]}!</h1>
          <p className="text-slate-600 mt-1">Your complete learning dashboard</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Active Courses</p>
                <p className="text-3xl font-bold text-slate-900 mt-1">{enrollments?.length || 0}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <BookOpen className="text-blue-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Certificates</p>
                <p className="text-3xl font-bold text-slate-900 mt-1">{certificates?.length || 0}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Award className="text-green-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Badges Earned</p>
                <p className="text-3xl font-bold text-slate-900 mt-1">{badges?.length || 0}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Star className="text-purple-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Overall Progress</p>
                <p className="text-3xl font-bold text-slate-900 mt-1">75%</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="text-orange-600" size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Continue Learning */}
          <div className="lg:col-span-2 space-y-6">
            {/* Continue Learning */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              <h2 className="text-xl font-bold text-slate-900 mb-4">Continue Learning</h2>
              {enrollments && enrollments.length > 0 ? (
                <div className="space-y-4">
                  {enrollments.slice(0, 3).map((enrollment: any) => (
                    <Link
                      key={enrollment.id}
                      href={`/lms/courses/${enrollment.courses?.slug}`}
                      className="block p-4 border border-slate-200 rounded-lg hover:border-red-500 hover:shadow-md transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-slate-100 rounded-lg flex items-center justify-center">
                          <BookOpen className="text-slate-600" size={24} />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-slate-900">{enrollment.courses?.title}</h3>
                          <div className="mt-2">
                            <div className="w-full bg-slate-200 rounded-full h-2">
                              <div 
                                className="bg-green-600 h-2 rounded-full" 
                                style={{ width: `${enrollment.progress_percentage || 0}%` }}
                              />
                            </div>
                            <p className="text-sm text-slate-600 mt-1">{enrollment.progress_percentage || 0}% complete</p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <BookOpen className="mx-auto text-slate-300 mb-4" size={48} />
                  <p className="text-slate-600 mb-4">No courses yet</p>
                  <Link
                    href="/lms/courses"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition"
                  >
                    Browse Courses
                  </Link>
                </div>
              )}
            </div>

            {/* All Features Grid */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              <h2 className="text-xl font-bold text-slate-900 mb-4">All Features</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {/* Learning Features */}
                <Link href="/lms/courses" className="p-4 border border-slate-200 rounded-lg hover:border-red-500 hover:shadow-md transition-all group">
                  <BookOpen className="text-red-600 mb-2 group-hover:scale-110 transition-transform" size={24} />
                  <p className="font-semibold text-slate-900">My Courses</p>
                  <p className="text-xs text-slate-600 mt-1">View all courses</p>
                </Link>

                <Link href="/lms/assignments" className="p-4 border border-slate-200 rounded-lg hover:border-red-500 hover:shadow-md transition-all group">
                  <FileText className="text-blue-600 mb-2 group-hover:scale-110 transition-transform" size={24} />
                  <p className="font-semibold text-slate-900">Assignments</p>
                  <p className="text-xs text-slate-600 mt-1">Submit work</p>
                </Link>

                <Link href="/lms/quizzes" className="p-4 border border-slate-200 rounded-lg hover:border-red-500 hover:shadow-md transition-all group">
                  <CheckCircle className="text-green-600 mb-2 group-hover:scale-110 transition-transform" size={24} />
                  <p className="font-semibold text-slate-900">Quizzes</p>
                  <p className="text-xs text-slate-600 mt-1">Take assessments</p>
                </Link>

                <Link href="/lms/calendar" className="p-4 border border-slate-200 rounded-lg hover:border-red-500 hover:shadow-md transition-all group">
                  <Calendar className="text-purple-600 mb-2 group-hover:scale-110 transition-transform" size={24} />
                  <p className="font-semibold text-slate-900">Calendar</p>
                  <p className="text-xs text-slate-600 mt-1">Schedule & events</p>
                </Link>

                <Link href="/lms/messages" className="p-4 border border-slate-200 rounded-lg hover:border-red-500 hover:shadow-md transition-all group">
                  <MessageSquare className="text-orange-600 mb-2 group-hover:scale-110 transition-transform" size={24} />
                  <p className="font-semibold text-slate-900">Messages</p>
                  <p className="text-xs text-slate-600 mt-1">Chat with staff</p>
                </Link>

                <Link href="/lms/forums" className="p-4 border border-slate-200 rounded-lg hover:border-red-500 hover:shadow-md transition-all group">
                  <Users className="text-teal-600 mb-2 group-hover:scale-110 transition-transform" size={24} />
                  <p className="font-semibold text-slate-900">Forums</p>
                  <p className="text-xs text-slate-600 mt-1">Discuss with peers</p>
                </Link>

                <Link href="/lms/library" className="p-4 border border-slate-200 rounded-lg hover:border-red-500 hover:shadow-md transition-all group">
                  <Library className="text-indigo-600 mb-2 group-hover:scale-110 transition-transform" size={24} />
                  <p className="font-semibold text-slate-900">Library</p>
                  <p className="text-xs text-slate-600 mt-1">Resources</p>
                </Link>

                <Link href="/lms/grades" className="p-4 border border-slate-200 rounded-lg hover:border-red-500 hover:shadow-md transition-all group">
                  <BarChart3 className="text-pink-600 mb-2 group-hover:scale-110 transition-transform" size={24} />
                  <p className="font-semibold text-slate-900">Grades</p>
                  <p className="text-xs text-slate-600 mt-1">View scores</p>
                </Link>

                <Link href="/lms/certificates" className="p-4 border border-slate-200 rounded-lg hover:border-red-500 hover:shadow-md transition-all group">
                  <Award className="text-yellow-600 mb-2 group-hover:scale-110 transition-transform" size={24} />
                  <p className="font-semibold text-slate-900">Certificates</p>
                  <p className="text-xs text-slate-600 mt-1">Earned credentials</p>
                </Link>

                <Link href="/lms/progress" className="p-4 border border-slate-200 rounded-lg hover:border-red-500 hover:shadow-md transition-all group">
                  <TrendingUp className="text-green-600 mb-2 group-hover:scale-110 transition-transform" size={24} />
                  <p className="font-semibold text-slate-900">Progress</p>
                  <p className="text-xs text-slate-600 mt-1">Track learning</p>
                </Link>

                <Link href="/lms/achievements" className="p-4 border border-slate-200 rounded-lg hover:border-red-500 hover:shadow-md transition-all group">
                  <Star className="text-purple-600 mb-2 group-hover:scale-110 transition-transform" size={24} />
                  <p className="font-semibold text-slate-900">Achievements</p>
                  <p className="text-xs text-slate-600 mt-1">Badges & awards</p>
                </Link>

                <Link href="/lms/help" className="p-4 border border-slate-200 rounded-lg hover:border-red-500 hover:shadow-md transition-all group">
                  <HelpCircle className="text-slate-600 mb-2 group-hover:scale-110 transition-transform" size={24} />
                  <p className="font-semibold text-slate-900">Help</p>
                  <p className="text-xs text-slate-600 mt-1">Get support</p>
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column - Quick Actions & Info */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              <h2 className="text-lg font-bold text-slate-900 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <Link
                  href="/lms/courses"
                  className="block w-full px-4 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition text-center"
                >
                  Browse Courses
                </Link>
                <Link
                  href="/lms/messages"
                  className="block w-full px-4 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition text-center"
                >
                  Send Message
                </Link>
                <Link
                  href="/lms/calendar"
                  className="block w-full px-4 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition text-center"
                >
                  View Calendar
                </Link>
                <Link
                  href="/lms/help"
                  className="block w-full px-4 py-3 bg-slate-600 text-white rounded-lg font-semibold hover:bg-slate-700 transition text-center"
                >
                  Get Help
                </Link>
              </div>
            </div>

            {/* Recent Achievements */}
            {badges && badges.length > 0 && (
              <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                <h2 className="text-lg font-bold text-slate-900 mb-4">Recent Badges</h2>
                <div className="space-y-3">
                  {badges.slice(0, 3).map((badge: any) => (
                    <div key={badge.id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                      <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                        <Star className="text-yellow-600" size={20} />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900 text-sm">{badge.badges?.name}</p>
                        <p className="text-xs text-slate-600">{new Date(badge.earned_date).toLocaleDateString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Support */}
            <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-6 border border-red-200">
              <h2 className="text-lg font-bold text-slate-900 mb-2">Need Help?</h2>
              <p className="text-sm text-slate-600 mb-4">
                Our support team is here to help you succeed.
              </p>
              <Link
                href="/lms/support"
                className="inline-flex items-center gap-2 text-red-600 font-semibold hover:text-red-700"
              >
                Contact Support
                <Heart size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
