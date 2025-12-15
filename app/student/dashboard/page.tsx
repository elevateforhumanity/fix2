import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  BookOpen,
  Clock,
  Award,
  TrendingUp,
  Calendar,
  ExternalLink,
  CheckCircle,
  PlayCircle,
  Scissors,
  GraduationCap,
  MessageCircle,
  Target,
  FileText,
  Users,
  Briefcase,
  DollarSign,
  Bell,
  Settings,
  LogOut,
  ChevronRight,
  Star,
  BarChart3,
} from 'lucide-react';
import MiladyAppDownload from '@/components/student/MiladyAppDownload';
import { StudentDashboardAISection } from '@/components/student/StudentDashboardAISection';
import { OnboardingChecklist } from '@/components/student/OnboardingChecklist';

export const metadata: Metadata = {
  title: 'Student Dashboard | Elevate For Humanity',
  description: 'Track your progress, access courses, and manage your training',
};

export default async function StudentDashboard() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login?next=/student/dashboard');
  }

  // Get student profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  // Get enrollments with program details
  const { data: enrollments } = await supabase
    .from('enrollments')
    .select(
      `
      *,
      program:programs(*)
    `
    )
    .eq('student_id', user.id)
    .order('enrolled_at', { ascending: false });

  // Get Milady enrollments
  const { data: miladyEnrollments } = await supabase
    .from('partner_lms_enrollments')
    .select(
      `
      *,
      course:partner_lms_courses(*)
    `
    )
    .eq('student_id', user.id);

  // Get AI instructor assignment
  const { data: aiAssignment } = await supabase
    .from('student_ai_assignments')
    .select(`
      *,
      ai_instructors(name, role, specialty)
    `)
    .eq('student_id', user.id)
    .single();

  // Get onboarding status
  const { data: onboarding } = await supabase
    .from('student_onboarding')
    .select('*')
    .eq('student_id', user.id)
    .single();

  // Get total hours logged
  const { data: hoursData } = await supabase
    .from('student_hours')
    .select('hours')
    .eq('student_id', user.id);

  const totalHours = hoursData?.reduce((sum, record) => sum + (record.hours || 0), 0) || 0;

  const activeEnrollment = enrollments?.[0];
  const programProgress = activeEnrollment?.progress_percentage || 0;
  const requiredHours = 1500; // Barber apprenticeship requirement
  const hoursProgress = Math.min((totalHours / requiredHours) * 100, 100);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Banner with Image */}
      <section className="relative bg-slate-900">
        <div className="relative w-full h-[300px] sm:h-[400px] overflow-hidden">
          <Image
            src="/images/beauty/hero-barber-training.jpg"
            alt="Barber cutting hair"
            fill
            className="object-cover"
            priority
            quality={90}
          />

          {/* Overlay Content */}
          <div className="absolute inset-0 bg-black/40 flex items-end">
            <div className="w-full px-4 sm:px-6 pb-8">
              <div className="max-w-7xl mx-auto">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                      Welcome back, {profile?.full_name || profile?.first_name || 'Student'}!
                    </h1>
                    <div className="flex items-center gap-3">
                      <p className="text-slate-200 text-lg">
                        {activeEnrollment?.program?.name || 'Your Learning Dashboard'}
                      </p>
                      {activeEnrollment?.state_code === 'IN' && (
                        <span className="px-3 py-1 text-xs font-semibold bg-blue-600 text-white rounded-full">
                          Indiana Apprenticeship
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Link
                      href="/student/profile"
                      className="px-4 py-2 bg-white/10 backdrop-blur-sm text-white rounded-lg hover:bg-white/20 font-semibold transition-all border border-white/30"
                    >
                      <Settings className="w-4 h-4 inline mr-2" />
                      Profile
                    </Link>
                    <Link
                      href="/student/certificates"
                      className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 font-semibold transition-all shadow-lg"
                    >
                      <Award className="w-4 h-4 inline mr-2" />
                      Certificates
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Onboarding Checklist */}
            {onboarding && <OnboardingChecklist onboarding={onboarding} />}

            {/* Progress Overview */}
            <div className="bg-white rounded-xl shadow-md border border-slate-200 p-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Target className="w-6 h-6 text-blue-600" />
                Your Progress
              </h2>

              <div className="grid sm:grid-cols-2 gap-6">
                {/* Program Progress */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-700">
                      Program Completion
                    </span>
                    <span className="text-sm font-bold text-blue-600">
                      {Math.round(programProgress)}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-3">
                    <div
                      className="bg-blue-600 h-3 rounded-full transition-all"
                      style={{ width: `${programProgress}%` }}
                    />
                  </div>
                  <p className="text-xs text-slate-500 mt-2">
                    {miladyEnrollments?.length || 0} of 19 courses completed
                  </p>
                </div>

                {/* Hours Progress */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-700">
                      Training Hours
                    </span>
                    <span className="text-sm font-bold text-green-600">
                      {totalHours} / {requiredHours}
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-3">
                    <div
                      className="bg-green-600 h-3 rounded-full transition-all"
                      style={{ width: `${hoursProgress}%` }}
                    />
                  </div>
                  <p className="text-xs text-slate-500 mt-2">
                    {requiredHours - totalHours} hours remaining
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid sm:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl shadow-md border border-slate-200 p-4">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-3">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-slate-900">
                  {miladyEnrollments?.length || 0}
                </div>
                <div className="text-sm text-slate-600">Active Courses</div>
              </div>

              <div className="bg-white rounded-xl shadow-md border border-slate-200 p-4">
                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-3">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-slate-900">{totalHours}</div>
                <div className="text-sm text-slate-600">Hours Logged</div>
              </div>

              <div className="bg-white rounded-xl shadow-md border border-slate-200 p-4">
                <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-3">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-slate-900">0</div>
                <div className="text-sm text-slate-600">Certificates</div>
              </div>

              <div className="bg-white rounded-xl shadow-md border border-slate-200 p-4">
                <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center mb-3">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-slate-900">
                  {Math.round(programProgress)}%
                </div>
                <div className="text-sm text-slate-600">Complete</div>
              </div>
            </div>

            {/* Milady RISE Courses */}
            {miladyEnrollments && miladyEnrollments.length > 0 && (
              <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden">
                <div className="p-6 border-b border-slate-200">
                  <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                    <GraduationCap className="w-6 h-6 text-blue-600" />
                    Milady RISE Courses
                  </h2>
                </div>

                <div className="divide-y divide-slate-200">
                  {miladyEnrollments.slice(0, 5).map((enrollment: any) => (
                    <div
                      key={enrollment.id}
                      className="p-4 hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-slate-900">
                            {enrollment.course?.course_name || 'Course'}
                          </h3>
                          <p className="text-sm text-slate-600">
                            {enrollment.course?.duration_hours || 0} hours
                          </p>
                        </div>
                        <Link
                          href={`/student/milady/launch/${enrollment.id}`}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold transition-all flex items-center gap-2"
                        >
                          <PlayCircle className="w-4 h-4" />
                          Launch
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>

                {miladyEnrollments.length > 5 && (
                  <div className="p-4 bg-slate-50 text-center">
                    <Link
                      href="/student/courses"
                      className="text-blue-600 hover:text-blue-700 font-semibold inline-flex items-center gap-1"
                    >
                      View all {miladyEnrollments.length} courses
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                )}
              </div>
            )}

            {/* AI Instructor */}
            {activeEnrollment?.program?.slug && (
              <StudentDashboardAISection
                programSlug={activeEnrollment.program.slug}
                programName={activeEnrollment.program.name}
              />
            )}

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-md border border-slate-200 p-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <BarChart3 className="w-6 h-6 text-blue-600" />
                Recent Activity
              </h2>

              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Enrolled in Program</p>
                    <p className="text-sm text-slate-600">
                      {activeEnrollment?.program?.name}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      {new Date(activeEnrollment?.enrolled_at || '').toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {totalHours > 0 && (
                  <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                    <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <Clock className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">Hours Logged</p>
                      <p className="text-sm text-slate-600">{totalHours} training hours</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-orange-600 to-orange-700 rounded-xl shadow-lg p-6 text-white">
              <h3 className="text-lg font-bold mb-4">Quick Actions</h3>

              <div className="space-y-3">
                <Link
                  href="/student/log-hours"
                  className="block w-full px-4 py-3 bg-white/20 hover:bg-white/30 rounded-lg font-semibold transition-all text-center backdrop-blur-sm"
                >
                  <Clock className="w-4 h-4 inline mr-2" />
                  Log Hours
                </Link>

                <Link
                  href="/student/ai-tutor"
                  className="block w-full px-4 py-3 bg-white/20 hover:bg-white/30 rounded-lg font-semibold transition-all text-center backdrop-blur-sm"
                >
                  <MessageCircle className="w-4 h-4 inline mr-2" />
                  AI Tutor
                </Link>

                <Link
                  href="/student/schedule"
                  className="block w-full px-4 py-3 bg-white/20 hover:bg-white/30 rounded-lg font-semibold transition-all text-center backdrop-blur-sm"
                >
                  <Calendar className="w-4 h-4 inline mr-2" />
                  View Schedule
                </Link>

                {miladyEnrollments && miladyEnrollments.length > 0 && (
                  <Link
                    href="/student/mobile-app"
                    className="block w-full px-4 py-3 bg-white/20 hover:bg-white/30 rounded-lg font-semibold transition-all text-center backdrop-blur-sm"
                  >
                    📱 Download Mobile App
                  </Link>
                )}
              </div>
            </div>

            {/* Mobile App Download */}
            {miladyEnrollments && miladyEnrollments.length > 0 && (
              <MiladyAppDownload />
            )}

            {/* Support */}
            <div className="bg-white rounded-xl shadow-md border border-slate-200 p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Need Help?</h3>

              <div className="space-y-3 text-sm">
                <a
                  href="tel:317-314-3757"
                  className="flex items-center gap-2 text-slate-700 hover:text-blue-600"
                >
                  📞 317-314-3757
                </a>
                <a
                  href="mailto:elevate4humanityedu@gmail.com"
                  className="flex items-center gap-2 text-slate-700 hover:text-blue-600"
                >
                  📧 elevate4humanityedu@gmail.com
                </a>
                <Link
                  href="/contact"
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold"
                >
                  Contact Support
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Program Info */}
            {activeEnrollment && (
              <div className="bg-white rounded-xl shadow-md border border-slate-200 p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">
                  Program Details
                </h3>

                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-slate-600">Status:</span>
                    <span className="ml-2 font-semibold text-green-600 capitalize">
                      {activeEnrollment.status}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-600">Enrolled:</span>
                    <span className="ml-2 font-semibold text-slate-900">
                      {new Date(activeEnrollment.enrolled_at).toLocaleDateString()}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-600">Payment:</span>
                    <span className="ml-2 font-semibold text-slate-900 capitalize">
                      {activeEnrollment.payment_status || 'Waived'}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
