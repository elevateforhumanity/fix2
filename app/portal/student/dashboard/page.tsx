// app/portal/student/dashboard/page.tsx - STUDENT DASHBOARD
import Link from "next/link";
import { BookOpen, Award, Calendar, MessageSquare, FileText, TrendingUp, Clock, CheckCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Student Dashboard | Elevate For Humanity",
  description: "Your learning dashboard",
};

export default async function StudentDashboard() {
  // Get current user
  const user = await getCurrentUser();
  
  if (!user) {
    redirect("/portal/student");
  }

  const supabase = await createClient();
  
  // Fetch real courses
  const { data: courses } = await supabase
    .from("courses")
    .select("id, title, slug")
    .limit(5);
  
  // Try to fetch enrollments (may not exist yet)
  const { data: enrollments } = await supabase
    .from("enrollments")
    .select("*, courses(title, slug)")
    .eq("user_id", user.id);
  
  // Try to fetch certificates
  const { data: certificates } = await supabase
    .from("certificates")
    .select("*")
    .eq("user_id", user.id);
  
  const userName = user.profile?.name || user.email?.split("@")[0] || "Student";
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Welcome back, {userName}!</h1>
              <p className="text-sm text-slate-600 mt-1">Continue your learning journey</p>
            </div>
            <Link
              href="/portal/student"
              className="text-sm text-slate-600 hover:text-slate-900 transition"
            >
              Log out
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm ring-1 ring-slate-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-600">Courses</span>
              <BookOpen className="text-emerald-500" size={20} />
            </div>
            <p className="text-3xl font-bold text-slate-900">{enrollments?.length || 0}</p>
            <p className="text-xs text-slate-500 mt-1">Active enrollments</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm ring-1 ring-slate-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-600">Progress</span>
              <TrendingUp className="text-blue-500" size={20} />
            </div>
            <p className="text-3xl font-bold text-slate-900">
              {enrollments?.length ? Math.round(enrollments.reduce((acc, e) => acc + (e.progress || 0), 0) / enrollments.length) : 0}%
            </p>
            <p className="text-xs text-slate-500 mt-1">Overall completion</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm ring-1 ring-slate-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-600">Certificates</span>
              <Award className="text-orange-500" size={20} />
            </div>
            <p className="text-3xl font-bold text-slate-900">{certificates?.length || 0}</p>
            <p className="text-xs text-slate-500 mt-1">Earned so far</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm ring-1 ring-slate-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-600">Available</span>
              <Clock className="text-purple-500" size={20} />
            </div>
            <p className="text-3xl font-bold text-slate-900">{courses?.length || 0}</p>
            <p className="text-xs text-slate-500 mt-1">Courses to explore</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Current Courses */}
            <div className="bg-white rounded-xl p-6 shadow-sm ring-1 ring-slate-200">
              <h2 className="text-lg font-bold text-slate-900 mb-4">My Courses</h2>
              {enrollments && enrollments.length > 0 ? (
                <div className="space-y-4">
                  {enrollments.map((enrollment) => (
                    <CourseCard
                      key={enrollment.id}
                      title={enrollment.courses?.title || "Course"}
                      progress={enrollment.progress || 0}
                      nextLesson={enrollment.progress === 100 ? "Course Complete!" : "Continue learning"}
                      href={`/lms/courses/${enrollment.courses?.slug || enrollment.course_id}`}
                      completed={enrollment.progress === 100}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <BookOpen className="mx-auto text-slate-300 mb-3" size={48} />
                  <p className="text-slate-600 mb-4">You're not enrolled in any courses yet</p>
                  <Link
                    href="/programs"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-lg font-semibold hover:bg-emerald-600 transition"
                  >
                    Browse Programs
                  </Link>
                </div>
              )}
            </div>

            {/* Upcoming Assignments */}
            <div className="bg-white rounded-xl p-6 shadow-sm ring-1 ring-slate-200">
              <h2 className="text-lg font-bold text-slate-900 mb-4">Upcoming Assignments</h2>
              <div className="space-y-3">
                <AssignmentItem
                  title="Quiz: Medical Terminology"
                  course="Medical Assistant"
                  dueDate="Due in 2 days"
                  urgent
                />
                <AssignmentItem
                  title="Lab Report: HVAC Systems"
                  course="HVAC Technician"
                  dueDate="Due in 5 days"
                />
                <AssignmentItem
                  title="Resume Review"
                  course="Workforce Readiness"
                  dueDate="Due in 1 week"
                />
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl p-6 shadow-sm ring-1 ring-slate-200">
              <h3 className="text-sm font-bold text-slate-900 mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <Link
                  href="/lms/courses"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition text-sm"
                >
                  <BookOpen size={18} className="text-emerald-500" />
                  <span className="text-slate-700">Browse Courses</span>
                </Link>
                <Link
                  href="/lms/assignments"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition text-sm"
                >
                  <FileText size={18} className="text-blue-500" />
                  <span className="text-slate-700">View Assignments</span>
                </Link>
                <Link
                  href="/lms/certificates"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition text-sm"
                >
                  <Award size={18} className="text-orange-500" />
                  <span className="text-slate-700">My Certificates</span>
                </Link>
                <Link
                  href="/lms/messages"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition text-sm"
                >
                  <MessageSquare size={18} className="text-purple-500" />
                  <span className="text-slate-700">Messages</span>
                </Link>
              </div>
            </div>

            {/* Calendar */}
            <div className="bg-white rounded-xl p-6 shadow-sm ring-1 ring-slate-200">
              <div className="flex items-center gap-2 mb-4">
                <Calendar size={18} className="text-slate-600" />
                <h3 className="text-sm font-bold text-slate-900">Upcoming Events</h3>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-12 text-center">
                    <div className="text-xs text-slate-500">Nov</div>
                    <div className="text-lg font-bold text-slate-900">25</div>
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">Live Session: HVAC</p>
                    <p className="text-xs text-slate-500">2:00 PM - 3:30 PM</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-12 text-center">
                    <div className="text-xs text-slate-500">Nov</div>
                    <div className="text-lg font-bold text-slate-900">27</div>
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">Quiz Deadline</p>
                    <p className="text-xs text-slate-500">11:59 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function CourseCard({ title, progress, nextLesson, href, completed = false }: {
  title: string;
  progress: number;
  nextLesson: string;
  href: string;
  completed?: boolean;
}) {
  return (
    <Link
      href={href}
      className="block p-4 rounded-lg border border-slate-200 hover:border-emerald-500 hover:shadow-md transition"
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-semibold text-slate-900">{title}</h3>
          <p className="text-sm text-slate-600 mt-1">{nextLesson}</p>
        </div>
        {completed && <CheckCircle className="text-emerald-500" size={20} />}
      </div>
      <div className="flex items-center gap-3">
        <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-emerald-500 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-sm font-medium text-slate-700">{progress}%</span>
      </div>
    </Link>
  );
}

function AssignmentItem({ title, course, dueDate, urgent = false }: {
  title: string;
  course: string;
  dueDate: string;
  urgent?: boolean;
}) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-lg border border-slate-200">
      <div className={`flex-shrink-0 w-2 h-2 rounded-full mt-2 ${urgent ? 'bg-red-500' : 'bg-blue-500'}`} />
      <div className="flex-1 min-w-0">
        <p className="font-medium text-slate-900 text-sm">{title}</p>
        <p className="text-xs text-slate-500 mt-1">{course}</p>
      </div>
      <span className={`text-xs font-medium ${urgent ? 'text-red-600' : 'text-slate-600'}`}>
        {dueDate}
      </span>
    </div>
  );
}
