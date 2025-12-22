import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import {
  Users,
  Briefcase,
  Building2,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  FileText,
  Shield,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Admin Dashboard | Elevate For Humanity',
  description: 'System oversight and compliance monitoring',
};

/**
 * ADMIN OVERSIGHT DASHBOARD
 *
 * This is not a feature list. This is instrumentation.
 *
 * What agencies/funders/regulators need to see:
 * - Volume (counts, status)
 * - Progress (bottlenecks, at-risk)
 * - Outcomes (placements, completions)
 * - Control (without micromanagement)
 *
 * This dashboard screams: "This system can be audited."
 */

export default async function AdminDashboardOrchestrated() {
  const supabase = await createClient();

  // Require authentication
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  // Get admin profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (
    !profile ||
    (profile.role !== 'admin' && profile.role !== 'super_admin')
  ) {
    redirect('/');
  }

  // SNAPSHOT METRICS

  // Students
  const { count: totalStudents } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })
    .eq('role', 'student');

  const { count: activeStudents } = await supabase
    .from('enrollments')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'active');

  const { count: atRiskStudents } = await supabase
    .from('enrollments')
    .select('*', { count: 'exact', head: true })
    .eq('at_risk', true);

  const { count: completedStudents } = await supabase
    .from('enrollments')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'completed');

  // Program Holders
  const { count: totalProgramHolders } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })
    .eq('role', 'program_holder');

  const { count: verifiedProgramHolders } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })
    .eq('role', 'program_holder')
    .eq('verified', true);

  const { count: overdueReports } = await supabase
    .from('compliance_reports')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'overdue');

  // Employers
  const { count: totalEmployers } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })
    .eq('role', 'employer');

  const { count: activeJobPostings } = await supabase
    .from('job_postings')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'active');

  const { count: jobPlacements } = await supabase
    .from('job_placements')
    .select('*', { count: 'exact', head: true });

  // Programs
  const { count: totalPrograms } = await supabase
    .from('programs')
    .select('*', { count: 'exact', head: true });

  const { count: activePrograms } = await supabase
    .from('programs')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'active');

  // Compliance
  const { data: lowComplianceHolders } = await supabase
    .from('compliance_scores')
    .select('*, profiles(*)')
    .lt('score', 70);

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="bg-white border-b border-slate-200 py-6">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-slate-900">
            System Oversight Dashboard
          </h1>
          <p className="text-slate-600 mt-2">
            Real-time monitoring and compliance tracking
          </p>
        </div>
      </section>

      {/* Critical Alerts */}
      {((atRiskStudents || 0) > 0 ||
        (overdueReports || 0) > 0 ||
        (lowComplianceHolders?.length || 0) > 0) && (
        <section className="max-w-7xl mx-auto px-4 py-6">
          <div className="bg-red-50 border-2 border-red-600 rounded-lg p-6">
            <div className="flex items-start gap-4">
              <AlertTriangle className="h-8 w-8 text-red-600 flex-shrink-0" />
              <div className="flex-1">
                <h2 className="text-xl font-bold text-red-900 mb-3">
                  Critical Issues Requiring Attention
                </h2>
                <div className="space-y-2">
                  {(atRiskStudents || 0) > 0 && (
                    <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                      <span className="text-red-900 font-semibold">
                        {atRiskStudents} student
                        {(atRiskStudents || 0) > 1 ? 's' : ''} at risk of
                        dropping out
                      </span>
                      <Link
                        href="/admin/students?filter=at-risk"
                        className="px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition"
                      >
                        Review
                      </Link>
                    </div>
                  )}
                  {(overdueReports || 0) > 0 && (
                    <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                      <span className="text-red-900 font-semibold">
                        {overdueReports} overdue compliance report
                        {(overdueReports || 0) > 1 ? 's' : ''}
                      </span>
                      <Link
                        href="/admin/compliance?filter=overdue"
                        className="px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition"
                      >
                        Review
                      </Link>
                    </div>
                  )}
                  {(lowComplianceHolders?.length || 0) > 0 && (
                    <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                      <span className="text-red-900 font-semibold">
                        {lowComplianceHolders?.length} program holder
                        {(lowComplianceHolders?.length || 0) > 1 ? 's' : ''}{' '}
                        below 70% compliance
                      </span>
                      <Link
                        href="/admin/program-holders?filter=low-compliance"
                        className="px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition"
                      >
                        Review
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Snapshot Metrics */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">
          System Snapshot
        </h2>

        {/* Students */}
        <div className="mb-8">
          <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Users className="h-5 w-5 text-blue-600" />
            Students
          </h3>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
              <div className="text-3xl font-bold text-slate-900 mb-2">
                {totalStudents || 0}
              </div>
              <div className="text-sm text-slate-600">Total Enrolled</div>
            </div>
            <div className="bg-green-50 rounded-lg shadow-sm border border-green-600 p-6">
              <div className="text-3xl font-bold text-green-900 mb-2">
                {activeStudents || 0}
              </div>
              <div className="text-sm text-green-900">Active</div>
            </div>
            <div
              className={`rounded-lg shadow-sm border p-6 ${
                (atRiskStudents || 0) > 0
                  ? 'bg-yellow-50 border-yellow-600'
                  : 'bg-white border-slate-200'
              }`}
            >
              <div
                className={`text-3xl font-bold mb-2 ${
                  (atRiskStudents || 0) > 0
                    ? 'text-yellow-900'
                    : 'text-slate-900'
                }`}
              >
                {atRiskStudents || 0}
              </div>
              <div
                className={`text-sm ${
                  (atRiskStudents || 0) > 0
                    ? 'text-yellow-900'
                    : 'text-slate-600'
                }`}
              >
                At Risk
              </div>
            </div>
            <div className="bg-blue-50 rounded-lg shadow-sm border border-blue-600 p-6">
              <div className="text-3xl font-bold text-blue-900 mb-2">
                {completedStudents || 0}
              </div>
              <div className="text-sm text-blue-900">Completed</div>
            </div>
          </div>
        </div>

        {/* Program Holders */}
        <div className="mb-8">
          <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Building2 className="h-5 w-5 text-purple-600" />
            Program Holders
          </h3>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
              <div className="text-3xl font-bold text-slate-900 mb-2">
                {totalProgramHolders || 0}
              </div>
              <div className="text-sm text-slate-600">Total Registered</div>
            </div>
            <div className="bg-green-50 rounded-lg shadow-sm border border-green-600 p-6">
              <div className="text-3xl font-bold text-green-900 mb-2">
                {verifiedProgramHolders || 0}
              </div>
              <div className="text-sm text-green-900">Verified</div>
            </div>
            <div
              className={`rounded-lg shadow-sm border p-6 ${
                (overdueReports || 0) > 0
                  ? 'bg-red-50 border-red-600'
                  : 'bg-white border-slate-200'
              }`}
            >
              <div
                className={`text-3xl font-bold mb-2 ${
                  (overdueReports || 0) > 0 ? 'text-red-900' : 'text-slate-900'
                }`}
              >
                {overdueReports || 0}
              </div>
              <div
                className={`text-sm ${
                  (overdueReports || 0) > 0 ? 'text-red-900' : 'text-slate-600'
                }`}
              >
                Overdue Reports
              </div>
            </div>
            <div
              className={`rounded-lg shadow-sm border p-6 ${
                (lowComplianceHolders?.length || 0) > 0
                  ? 'bg-yellow-50 border-yellow-600'
                  : 'bg-white border-slate-200'
              }`}
            >
              <div
                className={`text-3xl font-bold mb-2 ${
                  (lowComplianceHolders?.length || 0) > 0
                    ? 'text-yellow-900'
                    : 'text-slate-900'
                }`}
              >
                {lowComplianceHolders?.length || 0}
              </div>
              <div
                className={`text-sm ${
                  (lowComplianceHolders?.length || 0) > 0
                    ? 'text-yellow-900'
                    : 'text-slate-600'
                }`}
              >
                Low Compliance
              </div>
            </div>
          </div>
        </div>

        {/* Employers & Placements */}
        <div className="mb-8">
          <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-green-600" />
            Employers & Placements
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
              <div className="text-3xl font-bold text-slate-900 mb-2">
                {totalEmployers || 0}
              </div>
              <div className="text-sm text-slate-600">Total Employers</div>
            </div>
            <div className="bg-blue-50 rounded-lg shadow-sm border border-blue-600 p-6">
              <div className="text-3xl font-bold text-blue-900 mb-2">
                {activeJobPostings || 0}
              </div>
              <div className="text-sm text-blue-900">Active Job Postings</div>
            </div>
            <div className="bg-green-50 rounded-lg shadow-sm border border-green-600 p-6">
              <div className="text-3xl font-bold text-green-900 mb-2">
                {jobPlacements || 0}
              </div>
              <div className="text-sm text-green-900">Total Placements</div>
            </div>
          </div>
        </div>

        {/* Programs */}
        <div className="mb-8">
          <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-orange-600" />
            Programs
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
              <div className="text-3xl font-bold text-slate-900 mb-2">
                {totalPrograms || 0}
              </div>
              <div className="text-sm text-slate-600">Total Programs</div>
            </div>
            <div className="bg-green-50 rounded-lg shadow-sm border border-green-600 p-6">
              <div className="text-3xl font-bold text-green-900 mb-2">
                {activePrograms || 0}
              </div>
              <div className="text-sm text-green-900">Active Programs</div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">
          Quick Actions
        </h2>
        <div className="grid md:grid-cols-4 gap-4">
          <Link
            href="/admin/students"
            className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 hover:border-blue-600 hover:shadow-lg transition"
          >
            <Users className="h-8 w-8 text-blue-600 mb-3" />
            <h3 className="font-bold text-slate-900 mb-2">Manage Students</h3>
            <p className="text-sm text-slate-600">View all enrollments</p>
          </Link>

          <Link
            href="/admin/program-holders"
            className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 hover:border-purple-600 hover:shadow-lg transition"
          >
            <Building2 className="h-8 w-8 text-purple-600 mb-3" />
            <h3 className="font-bold text-slate-900 mb-2">Program Holders</h3>
            <p className="text-sm text-slate-600">Monitor compliance</p>
          </Link>

          <Link
            href="/admin/employers"
            className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 hover:border-green-600 hover:shadow-lg transition"
          >
            <Briefcase className="h-8 w-8 text-green-600 mb-3" />
            <h3 className="font-bold text-slate-900 mb-2">Employers</h3>
            <p className="text-sm text-slate-600">Track placements</p>
          </Link>

          <Link
            href="/admin/reports"
            className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 hover:border-orange-600 hover:shadow-lg transition"
          >
            <FileText className="h-8 w-8 text-orange-600 mb-3" />
            <h3 className="font-bold text-slate-900 mb-2">Generate Reports</h3>
            <p className="text-sm text-slate-600">Export data</p>
          </Link>
        </div>
      </section>
    </main>
  );
}
