import { createServerSupabaseClient, getCurrentUser } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import {
  Users,
  TrendingUp,
  Award,
  Briefcase,
  FileText,
  AlertCircle,
  CheckCircle,
  Clock,
  DollarSign,
  Target,
  Calendar,
  Download
} from 'lucide-react';

export const metadata = {
  title: 'Workforce Board Dashboard | Elevate for Humanity',
  description: 'Case management and reporting dashboard for workforce development boards',
};

export default async function WorkforceBoardDashboard() {
  const user = await getCurrentUser();
  
  if (!user || !['case_manager', 'workforce_board', 'admin'].includes(user.profile?.role)) {
    redirect('/unauthorized');
  }

  const supabase = await createServerSupabaseClient();

  // Fetch dashboard metrics in parallel
  const [
    { data: participants },
    { data: pendingEligibility },
    { data: activeTraining },
    { data: recentEmployment },
    { data: pendingSupportiveServices },
    { data: upcomingFollowUps }
  ] = await Promise.all([
    // Total participants
    supabase
      .from('wioa_participants')
      .select('id, eligibility_status, wioa_program, created_at')
      .order('created_at', { ascending: false })
      .limit(100),
    
    // Pending eligibility determinations
    supabase
      .from('wioa_participants')
      .select('id, user_id, created_at, profiles!inner(first_name, last_name, email)')
      .eq('eligibility_status', 'Pending')
      .order('created_at', { ascending: true })
      .limit(10),
    
    // Active training enrollments
    supabase
      .from('wioa_training_enrollments')
      .select('id, training_status, training_start_date, expected_completion_date')
      .in('training_status', ['Enrolled', 'In Training'])
      .limit(100),
    
    // Recent employment placements (last 30 days)
    supabase
      .from('employment_outcomes')
      .select('id, hire_date, job_title, hourly_wage')
      .gte('hire_date', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString())
      .order('hire_date', { ascending: false }),
    
    // Pending supportive services requests
    supabase
      .from('supportive_services')
      .select('id, service_type, amount_requested, requested_date')
      .eq('request_status', 'Pending')
      .order('requested_date', { ascending: true })
      .limit(10),
    
    // Upcoming follow-ups
    supabase
      .from('case_notes')
      .select('id, participant_id, follow_up_date, note_type')
      .eq('requires_follow_up', true)
      .eq('follow_up_completed', false)
      .gte('follow_up_date', new Date().toISOString())
      .order('follow_up_date', { ascending: true })
      .limit(10)
  ]);

  // Calculate metrics
  const totalParticipants = participants?.length || 0;
  const eligibleParticipants = participants?.filter(p => p.eligibility_status === 'Eligible').length || 0;
  const activeInTraining = activeTraining?.length || 0;
  const recentPlacements = recentEmployment?.length || 0;
  const pendingRequests = pendingSupportiveServices?.length || 0;
  const upcomingFollowUpCount = upcomingFollowUps?.length || 0;

  // Calculate average wage for recent placements
  const avgWage = recentEmployment && recentEmployment.length > 0
    ? (recentEmployment.reduce((sum, emp) => sum + (emp.hourly_wage || 0), 0) / recentEmployment.length).toFixed(2)
    : '0.00';

  // Program distribution
  const programCounts = participants?.reduce((acc, p) => {
    const program = p.wioa_program || 'Unassigned';
    acc[program] = (acc[program] || 0) + 1;
    return acc;
  }, {} as Record<string, number>) || {};

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Workforce Board Dashboard</h1>
              <p className="mt-1 text-sm text-slate-600">
                Case management and WIOA compliance tracking
              </p>
            </div>
            <div className="flex gap-3">
              <Link
                href="/workforce-board/reports"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                <Download size={16} />
                Export Reports
              </Link>
              <Link
                href="/workforce-board/participants/new"
                className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 rounded-lg text-sm font-semibold text-white hover:bg-red-700"
              >
                <Users size={16} />
                Add Participant
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Total Participants"
            value={totalParticipants}
            subtitle={`${eligibleParticipants} eligible`}
            icon={<Users className="text-blue-600" size={24} />}
            trend="+12% this month"
            trendUp={true}
          />
          <MetricCard
            title="Active in Training"
            value={activeInTraining}
            subtitle="Currently enrolled"
            icon={<Award className="text-green-600" size={24} />}
            trend="+8% this month"
            trendUp={true}
          />
          <MetricCard
            title="Recent Placements"
            value={recentPlacements}
            subtitle="Last 30 days"
            icon={<Briefcase className="text-purple-600" size={24} />}
            trend={`Avg $${avgWage}/hr`}
            trendUp={true}
          />
          <MetricCard
            title="Pending Actions"
            value={pendingEligibility?.length || 0}
            subtitle={`${pendingRequests} support requests`}
            icon={<AlertCircle className="text-orange-600" size={24} />}
            trend="Needs attention"
            trendUp={false}
          />
        </div>

        {/* Program Distribution */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Program Distribution</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(programCounts).map(([program, count]) => (
              <div key={program} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-slate-600">{program}</p>
                  <p className="text-2xl font-bold text-slate-900">{count}</p>
                </div>
                <div className="text-slate-400">
                  <Target size={32} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Pending Eligibility Determinations */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200">
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-slate-900">Pending Eligibility</h2>
                <Link
                  href="/workforce-board/eligibility"
                  className="text-sm font-medium text-red-600 hover:text-red-700"
                >
                  View All →
                </Link>
              </div>
            </div>
            <div className="divide-y divide-slate-200">
              {pendingEligibility && pendingEligibility.length > 0 ? (
                pendingEligibility.map((participant: any) => (
                  <Link
                    key={participant.id}
                    href={`/workforce-board/participants/${participant.id}`}
                    className="block p-4 hover:bg-slate-50 transition"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-slate-900">
                          {participant.profiles?.first_name} {participant.profiles?.last_name}
                        </p>
                        <p className="text-sm text-slate-600">{participant.profiles?.email}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-slate-500">
                          Applied {new Date(participant.created_at).toLocaleDateString()}
                        </p>
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-orange-100 text-orange-700 text-xs font-medium rounded-full mt-1">
                          <Clock size={12} />
                          Pending
                        </span>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="p-8 text-center text-slate-500">
                  <CheckCircle size={48} className="mx-auto mb-2 text-green-500" />
                  <p>No pending eligibility determinations</p>
                </div>
              )}
            </div>
          </div>

          {/* Pending Supportive Services */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200">
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-slate-900">Supportive Services Requests</h2>
                <Link
                  href="/workforce-board/supportive-services"
                  className="text-sm font-medium text-red-600 hover:text-red-700"
                >
                  View All →
                </Link>
              </div>
            </div>
            <div className="divide-y divide-slate-200">
              {pendingSupportiveServices && pendingSupportiveServices.length > 0 ? (
                pendingSupportiveServices.map((service: any) => (
                  <Link
                    key={service.id}
                    href={`/workforce-board/supportive-services/${service.id}`}
                    className="block p-4 hover:bg-slate-50 transition"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-slate-900">{service.service_type}</p>
                        <p className="text-sm text-slate-600">
                          Requested {new Date(service.requested_date).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold text-slate-900">
                          ${service.amount_requested?.toFixed(2)}
                        </p>
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-full mt-1">
                          <DollarSign size={12} />
                          Pending Approval
                        </span>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="p-8 text-center text-slate-500">
                  <CheckCircle size={48} className="mx-auto mb-2 text-green-500" />
                  <p>No pending supportive services requests</p>
                </div>
              )}
            </div>
          </div>

          {/* Upcoming Follow-ups */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200">
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-slate-900">Upcoming Follow-ups</h2>
                <Link
                  href="/workforce-board/follow-ups"
                  className="text-sm font-medium text-red-600 hover:text-red-700"
                >
                  View All →
                </Link>
              </div>
            </div>
            <div className="divide-y divide-slate-200">
              {upcomingFollowUps && upcomingFollowUps.length > 0 ? (
                upcomingFollowUps.map((followUp: any) => (
                  <Link
                    key={followUp.id}
                    href={`/workforce-board/participants/${followUp.participant_id}`}
                    className="block p-4 hover:bg-slate-50 transition"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-slate-900">{followUp.note_type}</p>
                        <p className="text-sm text-slate-600">
                          Due {new Date(followUp.follow_up_date).toLocaleDateString()}
                        </p>
                      </div>
                      <Calendar size={20} className="text-slate-400" />
                    </div>
                  </Link>
                ))
              ) : (
                <div className="p-8 text-center text-slate-500">
                  <CheckCircle size={48} className="mx-auto mb-2 text-green-500" />
                  <p>No upcoming follow-ups scheduled</p>
                </div>
              )}
            </div>
          </div>

          {/* Recent Employment Placements */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200">
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-slate-900">Recent Placements</h2>
                <Link
                  href="/workforce-board/employment"
                  className="text-sm font-medium text-red-600 hover:text-red-700"
                >
                  View All →
                </Link>
              </div>
            </div>
            <div className="divide-y divide-slate-200">
              {recentEmployment && recentEmployment.length > 0 ? (
                recentEmployment.slice(0, 5).map((employment: any) => (
                  <div key={employment.id} className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-slate-900">{employment.job_title}</p>
                        <p className="text-sm text-slate-600">
                          Hired {new Date(employment.hire_date).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold text-green-600">
                          ${employment.hourly_wage?.toFixed(2)}/hr
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-slate-500">
                  <Briefcase size={48} className="mx-auto mb-2 text-slate-300" />
                  <p>No recent employment placements</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <QuickActionButton
              href="/workforce-board/participants"
              icon={<Users size={20} />}
              label="Manage Participants"
            />
            <QuickActionButton
              href="/workforce-board/reports/pirl"
              icon={<FileText size={20} />}
              label="PIRL Reports"
            />
            <QuickActionButton
              href="/workforce-board/reports/performance"
              icon={<TrendingUp size={20} />}
              label="Performance Metrics"
            />
            <QuickActionButton
              href="/workforce-board/training"
              icon={<Award size={20} />}
              label="Training Programs"
            />
          </div>
        </div>
      </main>
    </div>
  );
}

function MetricCard({
  title,
  value,
  subtitle,
  icon,
  trend,
  trendUp
}: {
  title: string;
  value: number | string;
  subtitle: string;
  icon: React.ReactNode;
  trend: string;
  trendUp: boolean;
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 bg-slate-50 rounded-lg">
          {icon}
        </div>
        <span className={`text-xs font-medium ${trendUp ? 'text-green-600' : 'text-orange-600'}`}>
          {trend}
        </span>
      </div>
      <h3 className="text-sm font-medium text-slate-600 mb-1">{title}</h3>
      <p className="text-3xl font-bold text-slate-900 mb-1">{value}</p>
      <p className="text-sm text-slate-500">{subtitle}</p>
    </div>
  );
}

function QuickActionButton({
  href,
  icon,
  label
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="flex flex-col items-center justify-center p-4 border border-slate-200 rounded-lg hover:border-red-300 hover:bg-red-50 transition group"
    >
      <div className="p-3 bg-slate-100 rounded-lg group-hover:bg-red-100 transition mb-2">
        {icon}
      </div>
      <span className="text-sm font-medium text-slate-700 group-hover:text-red-700 text-center">
        {label}
      </span>
    </Link>
  );
}
