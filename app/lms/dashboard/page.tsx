import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getCurrentUser } from "@/lib/auth";
import Link from "next/link";
import { 
  BookOpen, 
  Clock, 
  Award, 
  TrendingUp, 
  Calendar,
  MessageSquare,
  Video,
  FileText,
  CheckCircle,
  PlayCircle,
  Target,
  Users,
  Bell,
  Search
} from 'lucide-react';

type EnrollmentWithCourse = {
  id: string;
  course_id: string;
  started_at: string | null;
  courses: {
    id: string;
    title: string;
    slug: string;
    thumbnail_url: string | null;
  } | null;
};

function calculateCourseProgress(
  courseId: string,
  progressRows: { lesson_id: string; completed: boolean }[],
  lessonToCourse: Map<string, string>
): number {
  const rows = progressRows.filter((r) => lessonToCourse.get(r.lesson_id) === courseId);
  if (!rows.length) return 0;
  const done = rows.filter((r) => r.completed).length;
  return Math.round((done / rows.length) * 100);
}

export default async function LMSDashboard() {
  const supabase = await createClient();
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  // Enrollments + courses
  const { data: enrollments } = await supabase
    .from("enrollments")
    .select(
      `
      id,
      course_id,
      started_at,
      courses (
        id,
        title,
        slug,
        thumbnail_url
      )
    `
    )
    .eq("user_id", user.id)
    .order("started_at", { ascending: false })
    .limit(6);

  const { data: progressRows } = await supabase
    .from("lesson_progress")
    .select("lesson_id, completed")
    .eq("user_id", user.id);

  const { data: notifications } = await supabase
    .from("notifications")
    .select("*")
    .eq("user_id", user.id)
    .eq("read", false)
    .order("created_at", { ascending: false })
    .limit(5);

  const { data: certificates } = await supabase
    .from("certificates")
    .select("id")
    .eq("user_id", user.id);

  const { data: courses } = await supabase
    .from("courses")
    .select("id")
    .eq("status", "published");

  const activeEnrollments: EnrollmentWithCourse[] = enrollments || [];
  const progress = progressRows || [];

  // Build lesson to course mapping
  const enrolledCourseIds = activeEnrollments.map((e) => e.course_id);
  const { data: modules } = await supabase
    .from("modules")
    .select("id, course_id")
    .in("course_id", enrolledCourseIds);

  const moduleIds = modules?.map((m) => m.id) || [];
  const { data: lessons } = await supabase
    .from("lessons")
    .select("id, module_id")
    .in("module_id", moduleIds);

  const lessonToCourse = new Map<string, string>();
  lessons?.forEach((lesson) => {
    const module = modules?.find((m) => m.id === lesson.module_id);
    if (module) {
      lessonToCourse.set(lesson.id, module.course_id);
    }
  });

  // Calculate average progress
  let avgProgress = 0;
  if (activeEnrollments.length > 0) {
    const percents = activeEnrollments.map((e) =>
      calculateCourseProgress(e.course_id, progress, lessonToCourse)
    );
    avgProgress = Math.round(percents.reduce((a, b) => a + b, 0) / percents.length);
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Navigation Bar - Like Coursera */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-[1920px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <Link href="/" className="text-2xl font-bold text-red-600">
                Elevate LMS
              </Link>
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search courses, assignments..."
                  className="pl-10 pr-4 py-2 w-96 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="relative p-2 hover:bg-slate-100 rounded-lg">
                <Bell className="w-5 h-5 text-slate-600" />
                {notifications && notifications.length > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                )}
              </button>
              <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white font-semibold">
                {user.email?.charAt(0).toUpperCase() || "U"}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-[1920px] mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content - 8 columns */}
          <div className="lg:col-span-8 space-y-6">
            {/* Welcome Banner - Like Canvas */}
            <div className="bg-gradient-to-r from-red-600 to-blue-600 rounded-2xl p-8 text-white">
              <h1 className="text-3xl font-bold mb-2">Welcome back, John!</h1>
              <p className="text-emerald-50 text-lg">You have 3 assignments due this week</p>
              <div className="mt-6 flex gap-4">
                <Link href="/lms/courses" className="bg-white text-red-700 px-6 py-3 rounded-lg font-semibold hover:bg-red-50 transition">
                  View Courses
                </Link>
                <Link href="/lms/calendar" className="bg-red-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-800 transition">
                  Check Calendar
                </Link>
              </div>
            </div>

            {/* Progress Overview - Like Coursera */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-xl font-bold text-slate-900 mb-6">Your Progress</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                  <div className="flex items-center gap-3 mb-2">
                    <BookOpen className="w-5 h-5 text-red-600" />
                    <span className="text-sm font-medium text-slate-600">Active Courses</span>
                  </div>
                  <div className="text-3xl font-bold text-red-700">5</div>
                </div>
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <div className="flex items-center gap-3 mb-2">
                    <CheckCircle className="w-5 h-5 text-blue-600" />
                    <span className="text-sm font-medium text-slate-600">Completed</span>
                  </div>
                  <div className="text-3xl font-bold text-blue-700">12</div>
                </div>
                <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                  <div className="flex items-center gap-3 mb-2">
                    <Award className="w-5 h-5 text-purple-600" />
                    <span className="text-sm font-medium text-slate-600">Certificates</span>
                  </div>
                  <div className="text-3xl font-bold text-purple-700">3</div>
                </div>
                <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                  <div className="flex items-center gap-3 mb-2">
                    <TrendingUp className="w-5 h-5 text-orange-600" />
                    <span className="text-sm font-medium text-slate-600">Avg. Score</span>
                  </div>
                  <div className="text-3xl font-bold text-orange-700">87%</div>
                </div>
              </div>
            </div>

            {/* Continue Learning - Like Udemy */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-slate-900">Continue Learning</h2>
                <Link href="/lms/courses" className="text-red-600 font-semibold hover:text-red-700">
                  View All →
                </Link>
              </div>
              <div className="space-y-4">
                {[
                  { title: 'Medical Assistant Certification', progress: 65, lesson: 'Lesson 8: Vital Signs', image: '/media/programs/medical.jpg' },
                  { title: 'HVAC Fundamentals', progress: 42, lesson: 'Lesson 5: Refrigeration Cycle', image: '/media/programs/hvac.jpg' },
                  { title: 'CDL Class A Training', progress: 78, lesson: 'Lesson 12: Pre-Trip Inspection', image: '/media/programs/cdl.jpg' },
                ].map((course, i) => (
                  <div key={i} className="flex gap-4 p-4 rounded-lg border border-slate-200 hover:border-red-300 hover:bg-red-50/50 transition cursor-pointer">
                    <div className="w-32 h-20 rounded-lg bg-slate-200 flex-shrink-0 overflow-hidden">
                      <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-900">{course.title}</h3>
                      <p className="text-sm text-slate-600 mt-1">{course.lesson}</p>
                      <div className="mt-3 flex items-center gap-3">
                        <div className="flex-1 bg-slate-200 rounded-full h-2">
                          <div className="bg-red-600 h-2 rounded-full" style={{ width: `${course.progress}%` }}></div>
                        </div>
                        <span className="text-sm font-medium text-slate-700">{course.progress}%</span>
                      </div>
                    </div>
                    <button className="flex-shrink-0 w-12 h-12 rounded-full bg-red-600 flex items-center justify-center text-white hover:bg-red-700 transition">
                      <PlayCircle className="w-6 h-6" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Assignments - Like Canvas */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-xl font-bold text-slate-900 mb-6">Upcoming Assignments</h2>
              <div className="space-y-3">
                {[
                  { title: 'Medical Terminology Quiz', course: 'Medical Assistant', due: 'Due Tomorrow', urgent: true },
                  { title: 'HVAC System Design Project', course: 'HVAC Fundamentals', due: 'Due in 3 days', urgent: false },
                  { title: 'CDL Practice Test', course: 'CDL Training', due: 'Due in 5 days', urgent: false },
                ].map((assignment, i) => (
                  <div key={i} className={`flex items-center justify-between p-4 rounded-lg border ${assignment.urgent ? 'border-red-300 bg-red-50' : 'border-slate-200'}`}>
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-lg ${assignment.urgent ? 'bg-red-100' : 'bg-slate-100'} flex items-center justify-center`}>
                        <FileText className={`w-6 h-6 ${assignment.urgent ? 'text-red-600' : 'text-slate-600'}`} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900">{assignment.title}</h3>
                        <p className="text-sm text-slate-600">{assignment.course}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm font-semibold ${assignment.urgent ? 'text-red-600' : 'text-slate-600'}`}>{assignment.due}</p>
                      <Link href="/lms/assignments" className="text-sm text-red-600 hover:text-red-700 font-medium">
                        Start →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar - 4 columns */}
          <div className="lg:col-span-4 space-y-6">
            {/* Calendar Widget - Like Canvas */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-slate-900">Calendar</h3>
                <Link href="/lms/calendar" className="text-sm text-red-600 hover:text-red-700 font-medium">
                  View Full
                </Link>
              </div>
              <div className="space-y-2">
                {[
                  { date: 'Today', event: 'Live Session: Medical Ethics', time: '2:00 PM' },
                  { date: 'Tomorrow', event: 'Quiz Due: HVAC Basics', time: '11:59 PM' },
                  { date: 'Friday', event: 'Group Project Meeting', time: '3:00 PM' },
                ].map((item, i) => (
                  <div key={i} className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                    <div className="text-xs font-semibold text-red-600 mb-1">{item.date}</div>
                    <div className="text-sm font-medium text-slate-900">{item.event}</div>
                    <div className="text-xs text-slate-600 mt-1">{item.time}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements - Like Coursera */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h3 className="font-bold text-slate-900 mb-4">Recent Achievements</h3>
              <div className="space-y-3">
                {[
                  { icon: '🏆', title: 'Course Completed', desc: 'Finished Medical Assistant Module 1' },
                  { icon: '⭐', title: 'Perfect Score', desc: 'Scored 100% on HVAC Quiz' },
                  { icon: '🎯', title: 'Streak Master', desc: '7 days learning streak' },
                ].map((achievement, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-red-50 to-blue-50 border border-red-200">
                    <div className="text-2xl">{achievement.icon}</div>
                    <div>
                      <div className="text-sm font-semibold text-slate-900">{achievement.title}</div>
                      <div className="text-xs text-slate-600">{achievement.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h3 className="font-bold text-slate-900 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-3">
                <Link href="/lms/messages" className="p-4 rounded-lg border border-slate-200 hover:border-red-300 hover:bg-red-50 transition text-center">
                  <MessageSquare className="w-6 h-6 mx-auto mb-2 text-slate-600" />
                  <div className="text-sm font-medium text-slate-900">Messages</div>
                </Link>
                <Link href="/lms/grades" className="p-4 rounded-lg border border-slate-200 hover:border-red-300 hover:bg-red-50 transition text-center">
                  <Target className="w-6 h-6 mx-auto mb-2 text-slate-600" />
                  <div className="text-sm font-medium text-slate-900">Grades</div>
                </Link>
                <Link href="/lms/resources" className="p-4 rounded-lg border border-slate-200 hover:border-red-300 hover:bg-red-50 transition text-center">
                  <FileText className="w-6 h-6 mx-auto mb-2 text-slate-600" />
                  <div className="text-sm font-medium text-slate-900">Resources</div>
                </Link>
                <Link href="/lms/support" className="p-4 rounded-lg border border-slate-200 hover:border-red-300 hover:bg-red-50 transition text-center">
                  <Users className="w-6 h-6 mx-auto mb-2 text-slate-600" />
                  <div className="text-sm font-medium text-slate-900">Support</div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
