// app/portal/student/dashboard/page.tsx - STUDENT DASHBOARD
import Link from "next/link";
import { BookOpen, Award, Calendar, MessageSquare, FileText, TrendingUp, Clock, CheckCircle } from "lucide-react";

export const metadata = {
  title: "Student Dashboard | Elevate For Humanity",
  description: "Your learning dashboard",
};

export default function StudentDashboard() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Welcome back, Student!</h1>
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
            <p className="text-3xl font-bold text-slate-900">3</p>
            <p className="text-xs text-slate-500 mt-1">Active enrollments</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm ring-1 ring-slate-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-600">Progress</span>
              <TrendingUp className="text-blue-500" size={20} />
            </div>
            <p className="text-3xl font-bold text-slate-900">67%</p>
            <p className="text-xs text-slate-500 mt-1">Overall completion</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm ring-1 ring-slate-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-600">Certificates</span>
              <Award className="text-orange-500" size={20} />
            </div>
            <p className="text-3xl font-bold text-slate-900">2</p>
            <p className="text-xs text-slate-500 mt-1">Earned so far</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm ring-1 ring-slate-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-600">Hours</span>
              <Clock className="text-purple-500" size={20} />
            </div>
            <p className="text-3xl font-bold text-slate-900">48</p>
            <p className="text-xs text-slate-500 mt-1">Learning time</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Current Courses */}
            <div className="bg-white rounded-xl p-6 shadow-sm ring-1 ring-slate-200">
              <h2 className="text-lg font-bold text-slate-900 mb-4">My Courses</h2>
              <div className="space-y-4">
                <CourseCard
                  title="Medical Assistant Fundamentals"
                  progress={75}
                  nextLesson="Module 4: Vital Signs"
                  href="/lms/courses/medical-assistant"
                />
                <CourseCard
                  title="HVAC Technician Training"
                  progress={60}
                  nextLesson="Module 3: Refrigeration Basics"
                  href="/lms/courses/hvac"
                />
                <CourseCard
                  title="Workforce Readiness"
                  progress={100}
                  nextLesson="Course Complete!"
                  href="/lms/courses/workforce-readiness"
                  completed
                />
              </div>
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
