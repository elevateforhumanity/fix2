import { createClient } from '@/lib/supabase/server';
import { requireRole } from '@/lib/auth/require-role';
import { redirect } from 'next/navigation';
import { getStudentState } from '@/lib/orchestration/state-machine';
import {
  StateAwareDashboard,
  SectionCard,
  ProgressIndicator,
} from '@/components/dashboards/StateAwareDashboard';
import {
  Book,
  Award,
  Briefcase,
  FileText,
  Users,
  HelpCircle,
} from 'lucide-react';

/**
 * STUDENT PORTAL - ORCHESTRATED
 *
 * This is the nervous system. Not a skeleton.
 *
 * Rules:
 * - State determines everything
 * - One dominant action per state
 * - Locked sections until prerequisites met
 * - Cannot mess up - system carries you
 */

export default async function StudentDashboardOrchestrated() {
  const supabase = await createClient();

  // Require authentication
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  // Get user profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (!profile) redirect('/onboarding');

  // Get enrollment data
  const { data: enrollments } = await supabase
    .from('enrollments')
    .select('*, programs(*)')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  const activeEnrollment = enrollments?.find(
    (e) => e.status === 'active' || e.status === 'pending'
  );

  // Get course progress
  let courseProgress = 0;
  if (activeEnrollment) {
    const { data: progress } = await supabase
      .from('course_progress')
      .select('progress_percentage')
      .eq('enrollment_id', activeEnrollment.id)
      .single();

    courseProgress = progress?.progress_percentage || 0;
  }

  // Get certifications
  const { data: certifications } = await supabase
    .from('certifications')
    .select('*')
    .eq('user_id', user.id);

  // Get job placements
  const { data: placements } = await supabase
    .from('job_placements')
    .select('*')
    .eq('user_id', user.id);

  // Calculate state
  const stateData = getStudentState({
    hasCompletedOrientation: profile.orientation_completed || false,
    isEligibilityVerified: profile.eligibility_verified || false,
    hasActiveEnrollment: !!activeEnrollment,
    enrollmentStatus: activeEnrollment?.status,
    courseProgress,
    hasCertification: (certifications?.length || 0) > 0,
    hasJobPlacement: (placements?.length || 0) > 0,
  });

  // Build progress steps
  const progressSteps = [
    {
      label: 'Complete Orientation',
      status: profile.orientation_completed
        ? ('completed' as const)
        : ('current' as const),
    },
    {
      label: 'Verify Eligibility',
      status: !profile.orientation_completed
        ? ('locked' as const)
        : profile.eligibility_verified
          ? ('completed' as const)
          : ('current' as const),
    },
    {
      label: 'Enroll in Program',
      status: !profile.eligibility_verified
        ? ('locked' as const)
        : activeEnrollment
          ? ('completed' as const)
          : ('current' as const),
    },
    {
      label: 'Complete Coursework',
      status: !activeEnrollment
        ? ('locked' as const)
        : activeEnrollment.status === 'completed'
          ? ('completed' as const)
          : ('current' as const),
    },
    {
      label: 'Earn Certification',
      status:
        activeEnrollment?.status !== 'completed'
          ? ('locked' as const)
          : (certifications?.length || 0) > 0
            ? ('completed' as const)
            : ('current' as const),
    },
    {
      label: 'Find Employment',
      status:
        (certifications?.length || 0) === 0
          ? ('locked' as const)
          : (placements?.length || 0) > 0
            ? ('completed' as const)
            : ('current' as const),
    },
  ];

  return (
    <StateAwareDashboard
      dominantAction={stateData.dominantAction}
      availableSections={stateData.availableSections}
      lockedSections={stateData.lockedSections}
      progressPercentage={stateData.progressPercentage}
      alerts={stateData.alerts}
    >
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content - 2/3 width */}
        <div className="lg:col-span-2 space-y-6">
          {/* Available Sections */}
          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-6">
              Available Now
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {stateData.availableSections.includes('orientation') && (
                <SectionCard
                  title="Orientation"
                  description="Get started with your training journey"
                  href="/lms/orientation"
                  icon={<Book className="h-6 w-6" />}
                  badge={
                    !profile.orientation_completed ? 'Required' : undefined
                  }
                />
              )}

              {stateData.availableSections.includes('eligibility') && (
                <SectionCard
                  title="Eligibility Check"
                  description="Verify you qualify for free training"
                  href="/lms/eligibility"
                  icon={<FileText className="h-6 w-6" />}
                  badge={!profile.eligibility_verified ? 'Required' : undefined}
                />
              )}

              {stateData.availableSections.includes('programs') && (
                <SectionCard
                  title="Browse Programs"
                  description="Explore 20+ training programs"
                  href="/programs"
                  icon={<Book className="h-6 w-6" />}
                />
              )}

              {stateData.availableSections.includes('programs-view') && (
                <SectionCard
                  title="View Programs"
                  description="See what's available (enroll after eligibility)"
                  href="/programs"
                  icon={<Book className="h-6 w-6" />}
                />
              )}

              {stateData.availableSections.includes('funding') && (
                <SectionCard
                  title="Funding Options"
                  description="Learn about WIOA, WRG, and other funding"
                  href="/how-it-works#funding"
                  icon={<FileText className="h-6 w-6" />}
                />
              )}

              {stateData.availableSections.includes('courses') && (
                <SectionCard
                  title="My Courses"
                  description={`Continue learning (${courseProgress}% complete)`}
                  href="/lms/courses"
                  icon={<Book className="h-6 w-6" />}
                  badge={courseProgress < 100 ? 'In Progress' : 'Complete'}
                />
              )}

              {stateData.availableSections.includes('progress') && (
                <SectionCard
                  title="Track Progress"
                  description="View your learning analytics"
                  href="/lms/progress"
                  icon={<Award className="h-6 w-6" />}
                />
              )}

              {stateData.availableSections.includes('certificates') && (
                <SectionCard
                  title="My Certificates"
                  description="View and download your credentials"
                  href="/lms/certificates"
                  icon={<Award className="h-6 w-6" />}
                />
              )}

              {stateData.availableSections.includes('certification') && (
                <SectionCard
                  title="Certification Exam"
                  description="Schedule your final exam"
                  href="/lms/certification"
                  icon={<Award className="h-6 w-6" />}
                  badge="Ready"
                />
              )}

              {stateData.availableSections.includes('placement') && (
                <SectionCard
                  title="Job Placement"
                  description="Connect with employers"
                  href="/lms/placement"
                  icon={<Briefcase className="h-6 w-6" />}
                />
              )}

              {stateData.availableSections.includes('support') && (
                <SectionCard
                  title="Get Support"
                  description="Contact your advisor"
                  href="/lms/support"
                  icon={<HelpCircle className="h-6 w-6" />}
                />
              )}

              {stateData.availableSections.includes('alumni') && (
                <SectionCard
                  title="Alumni Network"
                  description="Connect with graduates"
                  href="/lms/alumni"
                  icon={<Users className="h-6 w-6" />}
                />
              )}
            </div>
          </div>

          {/* Current Enrollment Info */}
          {activeEnrollment && (
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-4">
                Current Program
              </h3>
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <h4 className="font-semibold text-slate-900 mb-2">
                    {activeEnrollment.programs?.name || 'Program'}
                  </h4>
                  <div className="space-y-2 text-sm text-slate-600">
                    <div>
                      <span className="font-semibold">Status:</span>{' '}
                      <span className="capitalize">
                        {activeEnrollment.status}
                      </span>
                    </div>
                    <div>
                      <span className="font-semibold">Progress:</span>{' '}
                      {courseProgress}%
                    </div>
                    <div>
                      <span className="font-semibold">Enrolled:</span>{' '}
                      {new Date(
                        activeEnrollment.created_at
                      ).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar - 1/3 width */}
        <div className="space-y-6">
          {/* Progress Indicator */}
          <ProgressIndicator steps={progressSteps} />

          {/* Quick Stats */}
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4">
              Your Stats
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Programs Enrolled</span>
                <span className="font-bold text-slate-900">
                  {enrollments?.length || 0}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Certificates Earned</span>
                <span className="font-bold text-slate-900">
                  {certifications?.length || 0}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Overall Progress</span>
                <span className="font-bold text-slate-900">
                  {stateData.progressPercentage}%
                </span>
              </div>
            </div>
          </div>

          {/* Support Card */}
          <div className="bg-blue-50 rounded-lg border-2 border-blue-600 p-6">
            <h3 className="text-lg font-bold text-blue-900 mb-3">Need Help?</h3>
            <p className="text-blue-800 mb-4 text-sm">
              Your advisor is here to support you every step of the way.
            </p>
            <a
              href="tel:+13173143757"
              className="block w-full text-center px-4 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Call (317) 314-3757
            </a>
          </div>
        </div>
      </div>
    </StateAwareDashboard>
  );
}
