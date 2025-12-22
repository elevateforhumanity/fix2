import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import {
  CheckCircle,
  Clock,
  AlertCircle,
  User,
  Phone,
  Upload,
  FileText,
  Calendar,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'My Dashboard',
  description: 'Track your progress and complete your requirements',
};

interface Requirement {
  id: string;
  requirement_type: string;
  title: string;
  description: string;
  due_date: string | null;
  priority: string;
  status: string;
  evidence_url: string | null;
}

interface RiskStatus {
  status: string;
  progress_percentage: number;
  overdue_count: number;
  pending_count: number;
  completed_count: number;
}

export default async function StudentDashboardNew() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login?next=/student/dashboard-new');
  }

  // Fetch student data
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  // Fetch enrollments with funding info
  const { data: enrollments } = await supabase
    .from('enrollments')
    .select(
      `
      *,
      programs (
        id,
        name,
        duration_weeks
      ),
      student_funding_assignments (
        funding_sources (
          name,
          code
        )
      )
    `
    )
    .eq('student_id', user.id)
    .order('created_at', { ascending: false });

  // Get active enrollment
  const activeEnrollment =
    enrollments?.find((e) => e.status === 'active') || enrollments?.[0];

  // Fetch requirements for active enrollment
  const { data: requirements } = await supabase
    .from('student_requirements')
    .select('*')
    .eq('enrollment_id', activeEnrollment?.id)
    .order('priority', { ascending: false })
    .order('due_date', { ascending: true });

  // Fetch risk status
  const { data: riskStatus } = await supabase
    .from('student_risk_status')
    .select('*')
    .eq('enrollment_id', activeEnrollment?.id)
    .single();

  const progress = riskStatus?.progress_percentage || 0;
  const statusBadge = riskStatus?.status || 'on_track';

  // Get funding sources
  const fundingSources =
    activeEnrollment?.student_funding_assignments
      ?.map((a: any) => a.funding_sources?.code)
      .filter(Boolean) || [];

  // Prioritize requirements: overdue first, then by due date
  const sortedRequirements =
    requirements?.sort((a, b) => {
      const aOverdue = a.due_date && new Date(a.due_date) < new Date();
      const bOverdue = b.due_date && new Date(b.due_date) < new Date();

      if (aOverdue && !bOverdue) return -1;
      if (!aOverdue && bOverdue) return 1;

      if (a.due_date && b.due_date) {
        return new Date(a.due_date).getTime() - new Date(b.due_date).getTime();
      }

      return 0;
    }) || [];

  // Helper function to get status badge
  const getStatusBadge = () => {
    switch (statusBadge) {
      case 'on_track':
        return {
          icon: <CheckCircle className="w-5 h-5 text-brand-green-600" />,
          text: 'On Track',
          color: 'text-brand-green-600',
          bgColor: 'bg-brand-green-600',
        };
      case 'needs_action':
        return {
          icon: <AlertCircle className="w-5 h-5 text-yellow-600" />,
          text: 'Needs Action',
          color: 'text-yellow-600',
          bgColor: 'bg-yellow-600',
        };
      case 'at_risk':
        return {
          icon: <AlertCircle className="w-5 h-5 text-brand-orange-600" />,
          text: 'At Risk - Action Required',
          color: 'text-brand-orange-600',
          bgColor: 'bg-brand-orange-600',
        };
      default:
        return {
          icon: <Clock className="w-5 h-5 text-gray-600" />,
          text: 'Getting Started',
          color: 'text-gray-600',
          bgColor: 'bg-gray-600',
        };
    }
  };

  const badge = getStatusBadge();

  // Helper function to get requirement icon
  const getRequirementIcon = (type: string) => {
    switch (type) {
      case 'document':
        return <Upload className="w-5 h-5" />;
      case 'hours':
        return <Clock className="w-5 h-5" />;
      case 'appointment':
        return <Calendar className="w-5 h-5" />;
      case 'course':
        return <FileText className="w-5 h-5" />;
      default:
        return <CheckCircle className="w-5 h-5" />;
    }
  };

  // Helper function to get action link
  const getActionLink = (req: Requirement) => {
    switch (req.requirement_type) {
      case 'course':
        return '/student/courses';
      case 'document':
        return '/student/documents';
      case 'hours':
        return '/student/hours-tracking';
      case 'appointment':
        return '/student/appointments';
      default:
        return '#';
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-6xl px-4">
        {/* TOP SECTION - Program Status */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {activeEnrollment?.programs?.name || 'No Active Program'}
              </h1>
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                  {badge.icon}
                  <span className={`font-semibold ${badge.color}`}>
                    {badge.text}
                  </span>
                </div>
                {fundingSources.length > 0 && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">Funding:</span>
                    <span className="text-sm font-medium text-gray-900">
                      {fundingSources.join(' + ')}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {activeEnrollment && (
              <div className="text-right">
                <div className="text-sm text-gray-500">Progress</div>
                <div className="text-3xl font-bold text-brand-blue-600">
                  {progress}%
                </div>
              </div>
            )}
          </div>

          {/* Progress Bar */}
          {activeEnrollment && (
            <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
              <div
                className={`h-3 rounded-full ${badge.bgColor}`}
                style={{ width: `${progress}%` }}
              />
            </div>
          )}

          {!activeEnrollment && (
            <div className="text-center py-8">
              <p className="text-gray-600 mb-4">
                You're not enrolled in a program yet.
              </p>
              <Link
                href="/programs"
                className="inline-block px-6 py-3 bg-brand-blue-600 text-white rounded-lg font-semibold hover:bg-brand-blue-700"
              >
                Browse Programs
              </Link>
            </div>
          )}
        </div>

        {activeEnrollment && (
          <>
            {/* REQUIREMENTS CHECKLIST - This is the Heart */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                What You Need to Do
              </h2>

              {sortedRequirements.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <p>No requirements yet. Check back soon!</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {sortedRequirements.map((req) => {
                    const isOverdue =
                      req.due_date && new Date(req.due_date) < new Date();
                    const isCompleted =
                      req.status === 'completed' || req.status === 'verified';
                    const isPending =
                      req.status === 'pending' || req.status === 'in_progress';

                    let borderColor = 'border-gray-300';
                    let bgColor = 'bg-gray-50';
                    let iconColor = 'text-gray-600';

                    if (isCompleted) {
                      borderColor = 'border-green-300';
                      bgColor = 'bg-green-50';
                      iconColor = 'text-brand-green-600';
                    } else if (isOverdue) {
                      borderColor = 'border-red-500';
                      bgColor = 'bg-red-50';
                      iconColor = 'text-brand-orange-600';
                    } else if (
                      req.priority === 'urgent' ||
                      req.priority === 'high'
                    ) {
                      borderColor = 'border-yellow-500';
                      bgColor = 'bg-yellow-50';
                      iconColor = 'text-yellow-600';
                    } else if (isPending) {
                      borderColor = 'border-blue-500';
                      bgColor = 'bg-blue-50';
                      iconColor = 'text-brand-blue-600';
                    }

                    return (
                      <div
                        key={req.id}
                        className={`flex items-start gap-4 p-4 ${bgColor} border-l-4 ${borderColor} rounded ${isCompleted ? 'opacity-60' : ''}`}
                      >
                        <div className={`flex-shrink-0 mt-0.5 ${iconColor}`}>
                          {isCompleted ? (
                            <CheckCircle className="w-5 h-5" />
                          ) : (
                            getRequirementIcon(req.requirement_type)
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-1">
                            {isCompleted && '✓ '}
                            {req.title}
                          </h3>
                          {req.description && (
                            <p className="text-sm text-gray-600 mb-2">
                              {req.description}
                            </p>
                          )}
                          {req.due_date && (
                            <p
                              className={`text-sm mb-2 ${isOverdue ? 'text-brand-orange-600 font-semibold' : 'text-gray-600'}`}
                            >
                              Due:{' '}
                              {new Date(req.due_date).toLocaleDateString(
                                'en-US',
                                {
                                  month: 'long',
                                  day: 'numeric',
                                  year: 'numeric',
                                }
                              )}
                              {isOverdue && ' (OVERDUE)'}
                            </p>
                          )}
                          {!isCompleted && (
                            <Link
                              href={getActionLink(req)}
                              className="text-sm text-brand-blue-600 hover:underline font-semibold"
                            >
                              {req.requirement_type === 'document' &&
                                'Upload Document →'}
                              {req.requirement_type === 'hours' &&
                                'Log Hours →'}
                              {req.requirement_type === 'appointment' &&
                                'Schedule Appointment →'}
                              {req.requirement_type === 'course' &&
                                'Start Course →'}
                              {![
                                'document',
                                'hours',
                                'appointment',
                                'course',
                              ].includes(req.requirement_type) && 'Complete →'}
                            </Link>
                          )}
                          {isCompleted && req.status === 'verified' && (
                            <p className="text-sm text-brand-green-600">
                              Verified and approved
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* SUPPORT BOX */}
            <div className="bg-blue-50 rounded-lg shadow-sm p-6 border-2 border-blue-200">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Your Support Team
              </h2>

              <div className="bg-white p-4 rounded-lg mb-4">
                <div className="flex items-center gap-3 mb-3">
                  <User className="w-6 h-6 text-brand-blue-600" />
                  <h3 className="font-semibold text-gray-900 text-lg">
                    Elevate for Humanity
                  </h3>
                </div>
                <p className="text-gray-700 mb-3">
                  Our team of advisors and case managers is here to support you
                  throughout your journey.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Phone className="w-5 h-5 text-brand-blue-600" />
                    <a
                      href="tel:+13173143757"
                      className="text-lg text-brand-blue-600 hover:underline font-bold"
                    >
                      (317) 314-3757
                    </a>
                  </div>
                  <p className="text-sm text-gray-600 ml-7">
                    Call us for advising, support services, or any questions
                  </p>
                </div>
              </div>

              {/* Need Help Button */}
              <Link
                href="/contact"
                className="block w-full text-center px-6 py-3 bg-brand-orange-600 hover:bg-brand-orange-600 text-white font-bold rounded-lg transition-colors"
              >
                Need Help? Contact Us
              </Link>
            </div>
          </>
        )}

        {/* Quick Links */}
        <div className="mt-6 grid md:grid-cols-4 gap-4">
          <Link
            href="/student/lessons"
            className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center"
          >
            <div className="text-2xl mb-2">📚</div>
            <div className="font-semibold text-gray-900">My Lessons</div>
          </Link>

          <Link
            href="/student/hours"
            className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center"
          >
            <div className="text-2xl mb-2">⏱️</div>
            <div className="font-semibold text-gray-900">Log Hours</div>
          </Link>

          <Link
            href="/student/documents"
            className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center"
          >
            <div className="text-2xl mb-2">📄</div>
            <div className="font-semibold text-gray-900">Documents</div>
          </Link>

          <Link
            href="/student/profile"
            className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center"
          >
            <div className="text-2xl mb-2">⚙️</div>
            <div className="font-semibold text-gray-900">Settings</div>
          </Link>
        </div>
      </div>
    </main>
  );
}
