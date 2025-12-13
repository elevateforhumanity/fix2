import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import {
  Clock,
  ExternalLink,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  RefreshCw,
} from 'lucide-react';
import ServiceLoggingForm from '@/components/student/ServiceLoggingForm';

export const metadata: Metadata = {
  title: 'Hour Tracking | Student Dashboard',
  description: 'Track your program hours and progress',
};

export default async function HoursTrackingPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login?next=/student/hours-tracking');
  }

  // Get student profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  // Get active enrollment
  const { data: enrollment } = await supabase
    .from('enrollments')
    .select(
      `
      *,
      program:programs(*)
    `
    )
    .eq('student_id', user.id)
    .eq('status', 'active')
    .single();

  if (!enrollment) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">
            No Active Enrollment
          </h1>
          <p className="text-slate-600 mb-6">
            You are not currently enrolled in a program.
          </p>
          <Link
            href="/programs"
            className="text-blue-600 hover:text-blue-700 font-semibold"
          >
            Browse Programs
          </Link>
        </div>
      </div>
    );
  }

  // Get Milady provider ID
  const { data: miladyProvider } = await supabase
    .from('partner_lms_providers')
    .select('id')
    .eq('provider_type', 'milady')
    .single();

  // Get Milady enrollments and progress
  const { data: miladyEnrollments } = miladyProvider
    ? await supabase
        .from('partner_lms_enrollments')
        .select(
          `
      *,
      course:partner_lms_courses(*)
    `
        )
        .eq('student_id', user.id)
        .eq('provider_id', miladyProvider.id)
    : { data: [] };

  // Get internal hour tracking (practical hours)
  const { data: practicalHours } = await supabase
    .from('student_hours')
    .select('*')
    .eq('student_id', user.id)
    .eq('enrollment_id', enrollment.id);

  // Calculate totals
  const miladyTheoryHours =
    miladyEnrollments?.reduce((sum, e) => sum + (e.hours_completed || 0), 0) ||
    0;
  const practicalHoursTotal =
    practicalHours?.reduce((sum, h) => sum + (h.hours || 0), 0) || 0;
  const totalHours = miladyTheoryHours + practicalHoursTotal;
  const requiredHours = enrollment.program?.total_hours || 0;
  const progressPercentage =
    requiredHours > 0 ? Math.round((totalHours / requiredHours) * 100) : 0;

  // Calculate theory vs practical breakdown
  const theoryRequired = Math.round(requiredHours * 0.4); // 40% theory
  const practicalRequired = Math.round(requiredHours * 0.6); // 60% practical
  const theoryProgress =
    theoryRequired > 0
      ? Math.round((miladyTheoryHours / theoryRequired) * 100)
      : 0;
  const practicalProgress =
    practicalRequired > 0
      ? Math.round((practicalHoursTotal / practicalRequired) * 100)
      : 0;

  // Estimate completion date
  const weeksRemaining =
    requiredHours > totalHours
      ? Math.ceil((requiredHours - totalHours) / 20)
      : 0;
  const estimatedCompletion = new Date();
  estimatedCompletion.setDate(
    estimatedCompletion.getDate() + weeksRemaining * 7
  );

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">
                Hour Tracking Dashboard
              </h1>
              <p className="text-slate-600 mt-1">{enrollment.program?.name}</p>
            </div>
            <div className="flex items-center gap-4">
              <button
                className="flex items-center gap-2 px-4 py-2 text-slate-700 hover:text-slate-900 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
                title="Sync with Milady"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Sync Now</span>
              </button>
              <Link
                href="/student/dashboard"
                className="px-4 py-2 text-slate-700 hover:text-slate-900 font-medium transition-colors"
              >
                Back to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Overall Progress */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-8 text-white mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Overall Progress</h2>
              <p className="text-blue-100">
                {totalHours} of {requiredHours} hours completed
              </p>
            </div>
            <div className="text-center">
              <div className="text-6xl font-bold text-4xl md:text-5xl lg:text-6xl">
                {progressPercentage}%
              </div>
              <div className="text-blue-100 mt-2">Complete</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-blue-900 rounded-full h-4 overflow-hidden">
            <div
              className="bg-white h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.min(progressPercentage, 100)}%` }}
            />
          </div>

          {/* Completion Estimate */}
          {weeksRemaining > 0 && (
            <div className="mt-4 text-blue-100">
              <p className="text-sm">
                Estimated completion:{' '}
                {estimatedCompletion.toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}{' '}
                ({weeksRemaining} weeks remaining at current pace)
              </p>
            </div>
          )}
        </div>

        {/* Side-by-Side Comparison */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Milady Theory Hours */}
          <div className="bg-white rounded-xl shadow-sm border">
            <div className="px-6 py-4 border-b bg-gradient-to-r from-purple-50 to-purple-100">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-900">
                  Milady CIMA (Theory)
                </h3>
                <span className="text-sm text-purple-700 font-semibold">
                  Automatic Tracking
                </span>
              </div>
            </div>
            <div className="p-6">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-700 font-medium">
                    Theory Hours
                  </span>
                  <span className="text-2xl font-bold text-purple-600">
                    {miladyTheoryHours} / {theoryRequired}
                  </span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-purple-600 h-full rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(theoryProgress, 100)}%` }}
                  />
                </div>
                <div className="text-right mt-1">
                  <span className="text-sm text-slate-600">
                    {theoryProgress}% Complete
                  </span>
                </div>
              </div>

              {/* Milady Courses */}
              <div className="space-y-3">
                <h4 className="font-semibold text-slate-900 mb-3">
                  Active Courses
                </h4>
                {miladyEnrollments && miladyEnrollments.length > 0 ? (
                  miladyEnrollments.map((enrollment) => (
                    <div
                      key={enrollment.id}
                      className="p-4 bg-purple-50 rounded-lg"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h5 className="font-semibold text-slate-900">
                            {enrollment.course?.name}
                          </h5>
                          <p className="text-sm text-slate-600 mt-1">
                            {enrollment.hours_completed || 0} hours completed
                          </p>
                        </div>
                        {enrollment.status === 'completed' ? (
                          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                        ) : (
                          <Clock className="w-5 h-5 text-purple-600 flex-shrink-0" />
                        )}
                      </div>
                      <div className="w-full bg-purple-200 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-purple-600 h-full rounded-full"
                          style={{
                            width: `${enrollment.progress_percentage || 0}%`,
                          }}
                        />
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-slate-600">
                          {enrollment.progress_percentage || 0}% complete
                        </span>
                        <a
                          href={`/student/milady-lms?course=${enrollment.id}`}
                          className="text-xs text-purple-600 hover:text-purple-700 font-semibold flex items-center gap-1"
                        >
                          Launch Course
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6 text-slate-500">
                    <p>No Milady courses enrolled</p>
                    <Link
                      href="/student/courses"
                      className="text-purple-600 hover:text-purple-700 text-sm font-semibold mt-2 inline-block"
                    >
                      Browse Courses
                    </Link>
                  </div>
                )}
              </div>

              <div className="mt-6 pt-6 border-t">
                <p className="text-xs text-slate-600 mb-3">
                  <strong>Last synced:</strong> {new Date().toLocaleString()}
                </p>
                <a
                  href="https://www.miladytraining.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Open Milady CIMA</span>
                </a>
              </div>
            </div>
          </div>

          {/* Internal Practical Hours */}
          <div className="bg-white rounded-xl shadow-sm border">
            <div className="px-6 py-4 border-b bg-gradient-to-r from-green-50 to-green-100">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-900">
                  Practical Hours (Internal)
                </h3>
                <span className="text-sm text-green-700 font-semibold">
                  Manual Tracking
                </span>
              </div>
            </div>
            <div className="p-6">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-700 font-medium">
                    Practical Hours
                  </span>
                  <span className="text-2xl font-bold text-green-600">
                    {practicalHoursTotal} / {practicalRequired}
                  </span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-green-600 h-full rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(practicalProgress, 100)}%` }}
                  />
                </div>
                <div className="text-right mt-1">
                  <span className="text-sm text-slate-600">
                    {practicalProgress}% Complete
                  </span>
                </div>
              </div>

              {/* Recent Practical Hours */}
              <div className="space-y-3">
                <h4 className="font-semibold text-slate-900 mb-3">
                  Recent Activity
                </h4>
                {practicalHours && practicalHours.length > 0 ? (
                  practicalHours.slice(0, 5).map((hour) => (
                    <div key={hour.id} className="p-4 bg-green-50 rounded-lg">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h5 className="font-semibold text-slate-900">
                            {hour.activity_type}
                          </h5>
                          <p className="text-sm text-slate-600 mt-1">
                            {new Date(hour.date).toLocaleDateString()}
                          </p>
                        </div>
                        <span className="text-lg font-bold text-green-600">
                          {hour.hours}h
                        </span>
                      </div>
                      {hour.notes && (
                        <p className="text-xs text-slate-600 mt-2">
                          {hour.notes}
                        </p>
                      )}
                      {hour.approved && (
                        <div className="flex items-center gap-1 mt-2 text-xs text-green-700">
                          <CheckCircle className="w-3 h-3" />
                          <span>Approved by supervisor</span>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6 text-slate-500">
                    <p>No practical hours logged yet</p>
                  </div>
                )}
              </div>

              <div className="mt-6 pt-6 border-t">
                <div className="mb-6">
                  <ServiceLoggingForm enrollmentId={enrollment.id} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* State Board Requirements */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h3 className="text-xl font-bold text-slate-900 mb-4">
            State Board Requirements
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-slate-50 rounded-lg">
              <div className="text-3xl font-bold text-slate-900 mb-1">
                {theoryRequired}
              </div>
              <div className="text-sm text-slate-600">
                Theory Hours Required
              </div>
              <div className="mt-2">
                {theoryProgress >= 100 ? (
                  <span className="inline-flex items-center gap-1 text-green-600 text-sm font-semibold">
                    <CheckCircle className="w-4 h-4" />
                    Complete
                  </span>
                ) : (
                  <span className="text-purple-600 text-sm font-semibold">
                    {theoryRequired - miladyTheoryHours} hours remaining
                  </span>
                )}
              </div>
            </div>

            <div className="text-center p-4 bg-slate-50 rounded-lg">
              <div className="text-3xl font-bold text-slate-900 mb-1">
                {practicalRequired}
              </div>
              <div className="text-sm text-slate-600">
                Practical Hours Required
              </div>
              <div className="mt-2">
                {practicalProgress >= 100 ? (
                  <span className="inline-flex items-center gap-1 text-green-600 text-sm font-semibold">
                    <CheckCircle className="w-4 h-4" />
                    Complete
                  </span>
                ) : (
                  <span className="text-green-600 text-sm font-semibold">
                    {practicalRequired - practicalHoursTotal} hours remaining
                  </span>
                )}
              </div>
            </div>

            <div className="text-center p-4 bg-slate-50 rounded-lg">
              <div className="text-3xl font-bold text-slate-900 mb-1">
                {requiredHours}
              </div>
              <div className="text-sm text-slate-600">Total Hours Required</div>
              <div className="mt-2">
                {progressPercentage >= 100 ? (
                  <span className="inline-flex items-center gap-1 text-green-600 text-sm font-semibold">
                    <CheckCircle className="w-4 h-4" />
                    Complete
                  </span>
                ) : (
                  <span className="text-blue-600 text-sm font-semibold">
                    {requiredHours - totalHours} hours remaining
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                How Hour Tracking Works
              </h3>
              <ul className="space-y-2 text-blue-800 text-sm">
                <li>
                  • <strong>Milady CIMA:</strong> Theory hours are tracked
                  automatically as you complete video lessons and assessments
                </li>
                <li>
                  • <strong>Practical Hours:</strong> You must manually log
                  practical services performed (haircuts, fades, etc.)
                </li>
                <li>
                  • <strong>Supervisor Approval:</strong> Practical hours
                  require supervisor approval before counting toward
                  requirements
                </li>
                <li>
                  • <strong>Sync:</strong> Milady hours sync automatically every
                  24 hours. Click "Sync Now" for immediate update
                </li>
                <li>
                  • <strong>State Board:</strong> Both theory and practical
                  hours are required for state board eligibility
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
