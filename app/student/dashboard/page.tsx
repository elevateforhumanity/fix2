'use client';

import Link from 'next/link';
import { BookOpen, FileText, Award, Calendar, TrendingUp, Clock, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';

export default function StudentDashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Simple Header */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, John!</h1>
          <p className="text-gray-600 mt-1">HVAC Technician Training</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Progress Card */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 mb-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Your Progress</h2>
              <p className="text-blue-100">Keep up the great work!</p>
            </div>
            <div className="text-right">
              <div className="text-5xl font-bold">67%</div>
              <p className="text-blue-100 mt-1">Complete</p>
            </div>
          </div>
          <div className="mt-6 bg-white/20 rounded-full h-3">
            <div className="bg-white rounded-full h-3" style={{ width: '67%' }}></div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-slate-600">Courses</div>
                  <div className="text-2xl font-bold text-slate-900 mt-1">3</div>
                </div>
                <BookOpen className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-slate-600">Certificates</div>
                  <div className="text-2xl font-bold text-slate-900 mt-1">2</div>
                </div>
                <Award className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-slate-600">GPA</div>
                  <div className="text-2xl font-bold text-slate-900 mt-1">3.8</div>
                </div>
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-slate-600">Attendance</div>
                  <div className="text-2xl font-bold text-slate-900 mt-1">98%</div>
                </div>
                <CheckCircle className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Next Class */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Next Class</h3>
                  <Calendar className="h-5 w-5 text-slate-400" />
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-slate-900">HVAC Systems Installation</h4>
                      <p className="text-sm text-slate-600 mt-1">Module 3: Ductwork Design</p>
                      <div className="flex items-center gap-4 mt-3 text-sm text-slate-600">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>Today, 2:00 PM</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>2 hours</span>
                        </div>
                      </div>
                    </div>
                    <Link
                      href="/courses/hvac-systems"
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
                    >
                      Join Class
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Active Courses */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Active Courses</h3>
                <div className="space-y-4">
                  <CourseCard
                    title="HVAC Systems Installation"
                    progress={75}
                    nextLesson="Ductwork Design"
                    href="/courses/hvac-systems"
                  />
                  <CourseCard
                    title="Electrical Fundamentals"
                    progress={60}
                    nextLesson="Circuit Analysis"
                    href="/courses/electrical"
                  />
                  <CourseCard
                    title="Safety & Compliance"
                    progress={90}
                    nextLesson="Final Assessment"
                    href="/courses/safety"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Upcoming Assignments */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Upcoming Assignments</h3>
                <div className="space-y-3">
                  <AssignmentItem
                    title="Module 3 Quiz"
                    course="HVAC Systems"
                    dueDate="Tomorrow"
                    urgent
                  />
                  <AssignmentItem
                    title="Circuit Diagram"
                    course="Electrical"
                    dueDate="3 days"
                  />
                  <AssignmentItem
                    title="Safety Report"
                    course="Safety"
                    dueDate="1 week"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Recent Achievements */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Recent Achievements</h3>
                <div className="space-y-3">
                  <AchievementItem
                    title="Perfect Attendance"
                    description="30 days streak"
                    icon="🎯"
                  />
                  <AchievementItem
                    title="Quick Learner"
                    description="Completed 5 modules"
                    icon="⚡"
                  />
                  <AchievementItem
                    title="Top Performer"
                    description="95% average score"
                    icon="🏆"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

function CourseCard({
  title,
  progress,
  nextLesson,
  href,
}: {
  title: string;
  progress: number;
  nextLesson: string;
  href: string;
}) {
  return (
    <div className="border rounded-lg p-4 hover:border-blue-300 transition-colors">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h4 className="font-semibold text-slate-900">{title}</h4>
          <p className="text-sm text-slate-600 mt-1">Next: {nextLesson}</p>
        </div>
        <span className="text-sm font-medium text-blue-600">{progress}%</span>
      </div>
      <div className="bg-slate-200 rounded-full h-2 mb-3">
        <div
          className="bg-blue-600 rounded-full h-2"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <Link
        href={href}
        className="text-sm text-blue-600 hover:text-blue-700 font-medium"
      >
        Continue Learning →
      </Link>
    </div>
  );
}

function AssignmentItem({
  title,
  course,
  dueDate,
  urgent,
}: {
  title: string;
  course: string;
  dueDate: string;
  urgent?: boolean;
}) {
  return (
    <div className="flex items-start gap-3">
      <FileText className={`h-5 w-5 mt-0.5 ${urgent ? 'text-red-500' : 'text-slate-400'}`} />
      <div className="flex-1">
        <h4 className="font-medium text-slate-900 text-sm">{title}</h4>
        <p className="text-xs text-slate-600">{course}</p>
        <p className={`text-xs mt-1 ${urgent ? 'text-red-600 font-medium' : 'text-slate-500'}`}>
          Due {dueDate}
        </p>
      </div>
    </div>
  );
}

function AchievementItem({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="text-2xl">{icon}</div>
      <div className="flex-1">
        <h4 className="font-medium text-slate-900 text-sm">{title}</h4>
        <p className="text-xs text-slate-600">{description}</p>
      </div>
    </div>
  );
}
