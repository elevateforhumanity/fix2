import { createClient } from '@/lib/supabase/server';
import { requireRole } from '@/lib/auth/require-role';
import { redirect } from 'next/navigation';
import { getEmployerState } from '@/lib/orchestration/state-machine';
import {
  StateAwareDashboard,
  SectionCard,
} from '@/components/dashboards/StateAwareDashboard';
import {
  Briefcase,
  Users,
  FileText,
  Shield,
  Building2,
  TrendingUp,
} from 'lucide-react';

/**
 * EMPLOYER PORTAL - PROGRESSION LOGIC
 *
 * This is not a feature list. This is an operator.
 *
 * Rules:
 * - Verification gates everything
 * - Hiring tools unlock progressively
 * - Apprenticeship is optional but guided
 * - Platform protects from compliance errors
 */

export default async function EmployerDashboardOrchestrated() {
  const supabase = await createClient();

  // Require authentication
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  // Get employer profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (!profile || profile.role !== 'employer') {
    redirect('/');
  }

  // Get job postings
  const { data: postings } = await supabase
    .from('job_postings')
    .select('*')
    .eq('employer_id', user.id)
    .eq('status', 'active');

  // Get pending applications
  const { data: applications } = await supabase
    .from('job_applications')
    .select('*')
    .eq('employer_id', user.id)
    .eq('status', 'pending');

  // Get shop access for this employer
  // Schema: employer user → shop_staff → shops → apprentice_placements
  const { data: shopAccess } = await supabase
    .from('shop_staff')
    .select('shop_id, role')
    .eq('user_id', user.id);

  const shopIds = shopAccess?.map((s) => s.shop_id) || [];

  // Get shops this employer has access to
  const { data: shops } = await supabase
    .from('shops')
    .select('id, name, active')
    .in('id', shopIds);

  // Get apprentice placements for these shops
  const { data: placements } = await supabase
    .from('apprentice_placements')
    .select('id, student_id, shop_id, program_slug, status, start_date, end_date, supervisor_user_id, created_at')
    .in('shop_id', shopIds)
    .order('created_at', { ascending: false });

  const placementIds = placements?.map((p) => p.id) || [];

  // Get weekly reports for these placements
  const { data: weeklyReports } = await supabase
    .from('apprentice_weekly_reports')
    .select('id, placement_id, week_start, week_end, hours_ojt, hours_related, hours_total, status, submitted_at')
    .in('placement_id', placementIds)
    .order('submitted_at', { ascending: false });

  // Calculate state
  const stateData = getEmployerState({
    isVerified: profile.verified || false,
    activePostings: postings?.length || 0,
    hasApprenticeshipProgram: (placements?.length || 0) > 0,
    pendingApplications: applications?.length || 0,
  });

  return (
    <StateAwareDashboard
      dominantAction={stateData.dominantAction}
      availableSections={stateData.availableSections}
      lockedSections={stateData.lockedSections}
      alerts={stateData.alerts}
    >
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content - 2/3 width */}
        <div className="lg:col-span-2 space-y-6">
          {/* Metrics Dashboard */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-2">
                <Briefcase className="h-8 w-8 text-blue-600" />
                <span className="text-3xl font-bold text-slate-900">
                  {postings?.length || 0}
                </span>
              </div>
              <div className="text-sm text-slate-600">Active Job Postings</div>
            </div>

            <div
              className={`rounded-lg shadow-sm border p-6 ${
                (applications?.length || 0) > 0
                  ? 'bg-green-50 border-green-600'
                  : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <Users
                  className={`h-8 w-8 ${
                    (applications?.length || 0) > 0
                      ? 'text-green-600'
                      : 'text-slate-400'
                  }`}
                />
                <span
                  className={`text-3xl font-bold ${
                    (applications?.length || 0) > 0
                      ? 'text-green-900'
                      : 'text-slate-900'
                  }`}
                >
                  {applications?.length || 0}
                </span>
              </div>
              <div
                className={`text-sm ${
                  (applications?.length || 0) > 0
                    ? 'text-green-900'
                    : 'text-slate-600'
                }`}
              >
                Pending Applications
              </div>
            </div>

            <div
              className={`rounded-lg shadow-sm border p-6 ${
                (placements?.length || 0) > 0
                  ? 'bg-purple-50 border-purple-600'
                  : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <TrendingUp
                  className={`h-8 w-8 ${
                    (placements?.length || 0) > 0 ? 'text-purple-600' : 'text-slate-400'
                  }`}
                />
                <span
                  className={`text-3xl font-bold ${
                    (placements?.length || 0) > 0 ? 'text-purple-900' : 'text-slate-900'
                  }`}
                >
                  {placements?.length || 0}
                </span>
              </div>
              <div
                className={`text-sm ${
                  (placements?.length || 0) > 0 ? 'text-purple-900' : 'text-slate-600'
                }`}
              >
                Active Apprentice Placements
              </div>
            </div>
          </div>

          {/* Shop Setup CTA */}
          {shopIds.length === 0 && (
            <div className="bg-blue-50 border-2 border-blue-600 rounded-lg p-6">
              <h3 className="text-xl font-bold text-blue-900 mb-2">
                Set Up Your Shop
              </h3>
              <p className="text-blue-800 mb-4">
                Create a shop to start managing apprenticeships and track weekly reports.
              </p>
              <a
                href="/employer/shop/create"
                className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
              >
                Create Shop
              </a>
            </div>
          )}

          {/* Available Sections */}
          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-6">
              Available Actions
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {stateData.availableSections.includes('verification') && (
                <SectionCard
                  title="Complete Verification"
                  description="Required before posting jobs"
                  href="/employer/verification"
                  icon={<Shield className="h-6 w-6" />}
                  badge="Required"
                />
              )}

              {stateData.availableSections.includes('postings') && (
                <SectionCard
                  title="Manage Job Postings"
                  description={`${postings?.length || 0} active posting${(postings?.length || 0) !== 1 ? 's' : ''}`}
                  href="/employer/postings"
                  icon={<Briefcase className="h-6 w-6" />}
                />
              )}

              {stateData.availableSections.includes('candidates') && (
                <SectionCard
                  title="View Candidates"
                  description="Browse trained workers"
                  href="/employer/candidates"
                  icon={<Users className="h-6 w-6" />}
                  badge={
                    (applications?.length || 0) > 0
                      ? `${applications?.length} New`
                      : undefined
                  }
                />
              )}

              {stateData.availableSections.includes('apprenticeship') && (
                <SectionCard
                  title={
                    (placements?.length || 0) > 0
                      ? 'Manage Apprenticeships'
                      : 'Start Apprenticeship Program'
                  }
                  description={
                    (placements?.length || 0) > 0
                      ? `${placements?.length} active placement${(placements?.length || 0) !== 1 ? 's' : ''}`
                      : 'Build your talent pipeline'
                  }
                  href="/employer/apprenticeship"
                  icon={<TrendingUp className="h-6 w-6" />}
                  badge={(placements?.length || 0) > 0 ? 'Active' : undefined}
                />
              )}

              {stateData.availableSections.includes('compliance') && (
                <SectionCard
                  title="Compliance Dashboard"
                  description="Track apprenticeship requirements"
                  href="/employer/compliance"
                  icon={<Shield className="h-6 w-6" />}
                />
              )}

              {stateData.availableSections.includes('reports') && (
                <SectionCard
                  title="Reports & Analytics"
                  description="View hiring metrics"
                  href="/employer/reports"
                  icon={<FileText className="h-6 w-6" />}
                />
              )}
            </div>
          </div>

          {/* Recent Postings */}
          {(postings?.length || 0) > 0 && (
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-4">
                Active Job Postings
              </h3>
              <div className="space-y-3">
                {postings?.slice(0, 5).map((posting) => (
                  <div
                    key={posting.id}
                    className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
                  >
                    <div>
                      <div className="font-semibold text-slate-900">
                        {posting.title}
                      </div>
                      <div className="text-sm text-slate-600">
                        Posted:{' '}
                        {new Date(posting.created_at).toLocaleDateString()}
                      </div>
                    </div>
                    <a
                      href={`/employer/postings/${posting.id}`}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition text-sm"
                    >
                      View
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Apprentice Placements */}
          {shopIds.length > 0 && (
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-slate-900">
                  Apprentice Placements
                </h3>
                <a
                  href="/employer/apprenticeships/new"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition text-sm"
                >
                  Add Placement
                </a>
              </div>
              
              {(placements?.length || 0) === 0 ? (
                <div className="text-center py-8">
                  <p className="text-slate-600 mb-4">
                    No apprentice placements yet
                  </p>
                  <a
                    href="/employer/apprenticeships/new"
                    className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
                  >
                    Create First Placement
                  </a>
                </div>
              ) : (
                <div className="space-y-3">
                  {placements?.map((placement) => {
                    const reportsForPlacement = weeklyReports?.filter(
                      (r) => r.placement_id === placement.id
                    );
                    const totalHours = reportsForPlacement?.reduce(
                      (sum, r) => sum + (r.hours_total || 0),
                      0
                    ) || 0;
                    
                    return (
                      <div
                        key={placement.id}
                        className="flex items-center justify-between p-4 bg-slate-50 rounded-lg"
                      >
                        <div className="flex-1">
                          <div className="font-semibold text-slate-900">
                            {placement.program_slug}
                          </div>
                          <div className="text-sm text-slate-600">
                            Started: {new Date(placement.start_date).toLocaleDateString()}
                          </div>
                          <div className="text-sm text-slate-600">
                            Total Hours: {totalHours} | Reports: {reportsForPlacement?.length || 0}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <a
                            href={`/employer/apprenticeships/${placement.id}/weekly-report/new`}
                            className="px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition text-sm"
                          >
                            Submit Report
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Sidebar - 1/3 width */}
        <div className="space-y-6">
          {/* Company Info */}
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <Building2 className="h-8 w-8 text-blue-600" />
              <div>
                <h3 className="font-bold text-slate-900">
                  {profile.company_name || 'Your Company'}
                </h3>
                <div className="text-sm text-slate-600">
                  {profile.verified ? (
                    <span className="text-green-600 font-semibold">
                      ✓ Verified
                    </span>
                  ) : (
                    <span className="text-yellow-600 font-semibold">
                      Pending Verification
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4">
              Quick Actions
            </h3>
            <div className="space-y-3">
              {profile.verified && (
                <a
                  href="/employer/postings/new"
                  className="block w-full text-center px-4 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                  Post New Job
                </a>
              )}
              <a
                href="/employer/candidates"
                className="block w-full text-center px-4 py-3 bg-slate-200 text-slate-900 rounded-lg font-semibold hover:bg-slate-300 transition"
              >
                Browse Candidates
              </a>
            </div>
          </div>

          {/* Apprenticeship CTA */}
          {!apprenticeshipProgram && profile.verified && (
            <div className="bg-purple-50 rounded-lg border-2 border-purple-600 p-6">
              <h3 className="text-lg font-bold text-purple-900 mb-3">
                Build Your Talent Pipeline
              </h3>
              <p className="text-purple-800 mb-4 text-sm">
                Start an apprenticeship program and train workers specifically
                for your needs.
              </p>
              <a
                href="/employer/apprenticeship/new"
                className="block w-full text-center px-4 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition"
              >
                Learn More
              </a>
            </div>
          )}

          {/* Support Card */}
          <div className="bg-blue-50 rounded-lg border-2 border-blue-600 p-6">
            <h3 className="text-lg font-bold text-blue-900 mb-3">Need Help?</h3>
            <p className="text-blue-800 mb-4 text-sm">
              Our team is here to help you find the right candidates.
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
