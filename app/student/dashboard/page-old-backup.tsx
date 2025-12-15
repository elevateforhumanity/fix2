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
} from 'lucide-react';
import MiladyAppDownload from '@/components/student/MiladyAppDownload';

export const metadata: Metadata = {
  title: 'Student Dashboard | Elevate For Humanity',
  description: 'Track your progress, access courses, and manage your training',
};

export default async function DashboardPage() {
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
  const { data: enrollments, error: enrollmentsError } = await supabase
    .from('enrollments')
    .select(
      `
      *,
      program:programs(*)
    `
    )
    .eq('student_id', user.id)
    .order('created_at', { ascending: false });

  if (enrollmentsError) {
    // Error: $1
  }

  // Get Milady RISE enrollments (with error handling)
  let miladyEnrollments = null;
  try {
    const { data: providerData } = await supabase
      .from('partner_lms_providers')
      .select('id')
      .eq('provider_type', 'milady')
      .single();

    const miladyProviderId = providerData?.id;

    if (miladyProviderId) {
      const { data } = await supabase
        .from('partner_lms_enrollments')
        .select(
          `
          *,
          course:partner_lms_courses(*)
        `
        )
        .eq('student_id', user.id)
        .eq('provider_id', miladyProviderId);

      miladyEnrollments = data;
    }
  } catch (error) {
    // Error: $1
  }

  const activeEnrollment = enrollments?.[0];
  const programProgress = activeEnrollment?.progress_percentage || 0;

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
                      Welcome back, {profile?.full_name || 'Student'}!
                    </h1>
                    <p className="text-slate-200 text-lg">
                      {activeEnrollment
                        ? `${activeEnrollment.program?.name}`
                        : 'Your Learning Dashboard'}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Link
                      href="/student/profile"
                      className="px-4 py-2 bg-white/10 backdrop-blur-sm text-white rounded-lg hover:bg-white/20 font-semibold transition-all border border-white/30"
                    >
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

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {/* Overall Progress */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <span className="text-3xl font-bold text-blue-600">
                {programProgress}%
              </span>
            </div>
            <h3 className="text-sm font-semibold text-slate-600 uppercase tracking-wide">
              Overall Progress
            </h3>
            <div className="mt-3 bg-slate-100 rounded-full h-2 overflow-hidden">
              <div
                className="bg-blue-600 h-full transition-all duration-500"
                style={{ width: `${programProgress}%` }}
              />
            </div>
          </div>

          {/* Hours Logged (from Milady) */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <span className="text-3xl font-bold text-green-600">
                {miladyEnrollments
                  ?.reduce((sum, e) => sum + (e.time_spent_hours || 0), 0)
                  .toFixed(0) || 0}
              </span>
            </div>
            <h3 className="text-sm font-semibold text-slate-600 uppercase tracking-wide">
              Theory Hours
            </h3>
            <p className="text-xs text-slate-500 mt-2">
              Tracked by Milady CIMA
            </p>
          </div>

          {/* Last Activity */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm font-bold text-purple-600">
                {miladyEnrollments?.[0]?.last_accessed_at
                  ? new Date(
                      miladyEnrollments[0].last_accessed_at
                    ).toLocaleDateString()
                  : 'Never'}
              </span>
            </div>
            <h3 className="text-sm font-semibold text-slate-600 uppercase tracking-wide">
              Last Active
            </h3>
            <p className="text-xs text-slate-500 mt-2">In Milady CIMA</p>
          </div>

          {/* Certificates */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center">
                <Award className="w-6 h-6 text-white" />
              </div>
              <span className="text-3xl font-bold text-orange-600">
                {miladyEnrollments?.filter((e) => e.status === 'completed')
                  .length || 0}
              </span>
            </div>
            <h3 className="text-sm font-semibold text-slate-600 uppercase tracking-wide">
              Certificates Earned
            </h3>
            <p className="text-xs text-slate-500 mt-2">
              {miladyEnrollments?.length || 0} courses enrolled
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* My Courses */}
            <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden">
              <div className="bg-blue-700 px-6 py-4">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  My Courses
                </h2>
              </div>
              <div className="p-6 space-y-4">
                {enrollments && enrollments.length > 0 ? (
                  enrollments.map((enrollment) => (
                    <div
                      key={enrollment.id}
                      className="border border-slate-200 rounded-lg p-5 hover:shadow-lg transition-all hover:border-blue-300"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-slate-900 mb-1">
                            {enrollment.program?.name}
                          </h3>
                          <div className="flex items-center gap-4 text-sm text-slate-600">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              Started{' '}
                              {new Date(
                                enrollment.enrolled_at
                              ).toLocaleDateString()}
                            </span>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                enrollment.status === 'active'
                                  ? 'bg-green-100 text-green-700'
                                  : enrollment.status === 'completed'
                                    ? 'bg-blue-100 text-blue-700'
                                    : 'bg-slate-100 text-slate-700'
                              }`}
                            >
                              {enrollment.status}
                            </span>
                          </div>
                        </div>
                        <Link
                          href={`/student/courses/${enrollment.program?.slug}`}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold transition-all hover:scale-105 flex items-center gap-2"
                        >
                          <PlayCircle className="w-4 h-4" />
                          Continue
                        </Link>
                      </div>

                      {/* Progress Bar */}
                      <div className="mt-4">
                        <div className="flex items-center justify-between text-sm mb-2">
                          <span className="text-slate-600 font-medium">
                            Progress
                          </span>
                          <span className="text-blue-600 font-bold">
                            {enrollment.progress_percentage || 0}%
                          </span>
                        </div>
                        <div className="bg-slate-100 rounded-full h-3 overflow-hidden">
                          <div
                            className="bg-blue-600 h-full transition-all duration-500"
                            style={{
                              width: `${enrollment.progress_percentage || 0}%`,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <GraduationCap className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                    <p className="text-slate-600 mb-4">
                      You're not enrolled in any courses yet
                    </p>
                    <Link
                      href="/programs"
                      className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold transition-all"
                    >
                      Browse Programs
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* RISE Certifications - Milady Integration */}
            {miladyEnrollments && miladyEnrollments.length > 0 && (
              <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden">
                <div className="bg-orange-700 px-6 py-4">
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Award className="w-5 h-5" />
                    RISE Certifications (Milady)
                  </h2>
                </div>
                <div className="p-6 space-y-4">
                  {miladyEnrollments.map((enrollment) => (
                    <div
                      key={enrollment.id}
                      className="border border-slate-200 rounded-lg p-5 hover:shadow-lg transition-all hover:border-orange-300"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-slate-900 mb-1">
                            {enrollment.course_name ||
                              enrollment.course?.course_name}
                          </h3>
                          <div className="flex items-center gap-4 text-sm text-slate-600">
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {enrollment.course?.duration_hours} hours
                            </span>
                            {enrollment.last_accessed_at && (
                              <span className="text-slate-500">
                                Last accessed{' '}
                                {new Date(
                                  enrollment.last_accessed_at
                                ).toLocaleDateString()}
                              </span>
                            )}
                          </div>
                        </div>
                        <Link
                          href={`/student/milady/launch/${enrollment.id}`}
                          className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 font-semibold transition-all hover:scale-105 flex items-center gap-2"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Launch Course
                        </Link>
                      </div>

                      {/* Progress Bar */}
                      <div className="mt-4">
                        <div className="flex items-center justify-between text-sm mb-2">
                          <span className="text-slate-600 font-medium">
                            Progress
                          </span>
                          <span className="text-orange-600 font-bold">
                            {enrollment.progress_percentage || 0}%
                          </span>
                        </div>
                        <div className="bg-slate-100 rounded-full h-3 overflow-hidden">
                          <div
                            className="bg-orange-600 h-full transition-all duration-500"
                            style={{
                              width: `${enrollment.progress_percentage || 0}%`,
                            }}
                          />
                        </div>
                      </div>

                      {enrollment.status === 'completed' &&
                        enrollment.certificate_id && (
                          <div className="mt-4 flex items-center gap-2 text-green-600">
                            <CheckCircle className="w-5 h-5" />
                            <span className="font-semibold">
                              Certificate Available
                            </span>
                            <Link
                              href={`/student/certificates/${enrollment.certificate_id}`}
                              className="ml-auto text-blue-600 hover:text-blue-700 font-semibold"
                            >
                              Download →
                            </Link>
                          </div>
                        )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Launch Milady CIMA */}
            <div className="bg-orange-600 rounded-xl shadow-lg p-8 text-white">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ExternalLink className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Milady CIMA</h3>
                <p className="text-orange-100 text-sm">
                  Access your training platform
                </p>
              </div>

              {miladyEnrollments && miladyEnrollments.length > 0 ? (
                <div className="space-y-3">
                  {miladyEnrollments.map((enrollment) => (
                    <Link
                      key={enrollment.id}
                      href={`/student/milady/launch/${enrollment.id}`}
                      className="block w-full px-6 py-4 bg-white text-orange-600 rounded-lg hover:bg-orange-50 font-bold transition-all hover:scale-105 text-center shadow-md"
                    >
                      Launch {enrollment.course_name || 'Course'} →
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-orange-100 text-sm mb-4">
                    No courses assigned yet
                  </p>
                  <Link
                    href="/contact"
                    className="inline-block px-6 py-3 bg-white text-orange-600 rounded-lg hover:bg-orange-50 font-semibold transition-all"
                  >
                    Contact Support
                  </Link>
                </div>
              )}

              <div className="mt-6 pt-6 border-t border-white/20 text-center">
                <p className="text-orange-100 text-xs">
                  All training, time tracking, and service logging
                  <br />
                  happens in Milady CIMA
                </p>
              </div>
            </div>

            {/* Mobile App Download */}
            {miladyEnrollments && miladyEnrollments.length > 0 && (
              <MiladyAppDownload />
            )}

            {/* Quick Links */}
            <div className="bg-white rounded-xl shadow-md border border-slate-200 p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-4">
                Quick Links
              </h3>
              <div className="space-y-3">
                <Link
                  href="/student/hours-tracking"
                  className="block w-full px-4 py-3 bg-orange-50 text-orange-700 rounded-lg hover:bg-orange-100 font-semibold transition-all text-center border border-orange-200"
                >
                  <Clock className="w-4 h-4 inline mr-2" />
                  Log Hours
                </Link>
                <Link
                  href="/student/ai-tutor"
                  className="block w-full px-4 py-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 font-semibold transition-all text-center border border-green-200"
                >
                  <MessageCircle className="w-4 h-4 inline mr-2" />
                  AI Tutor - Ask Questions
                </Link>
                <Link
                  href="/student/certificates"
                  className="block w-full px-4 py-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 font-semibold transition-all text-center border border-blue-200"
                >
                  <Award className="w-4 h-4 inline mr-2" />
                  My Certificates
                </Link>
                <Link
                  href="/student/schedule"
                  className="block w-full px-4 py-3 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 font-semibold transition-all text-center border border-purple-200"
                >
                  <Calendar className="w-4 h-4 inline mr-2" />
                  View Schedule
                </Link>
                {miladyEnrollments && miladyEnrollments.length > 0 && (
                  <Link
                    href="/student/mobile-app"
                    className="block w-full px-4 py-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 font-semibold transition-all text-center border border-blue-200"
                  >
                    📱 Download Mobile App
                  </Link>
                )}
              </div>
            </div>

            {/* Support */}
            <div className="bg-blue-700 rounded-xl shadow-md p-6 text-white">
              <h3 className="text-lg font-bold mb-2">Need Help?</h3>
              <p className="text-blue-100 text-sm mb-4">
                Our support team is here to help you succeed
              </p>
              <Link
                href="/contact"
                className="block w-full px-4 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 font-semibold transition-all text-center"
              >
                Contact Support
              </Link>
              <p className="text-blue-100 text-xs mt-3 text-center">
                📞 317-314-3757
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
