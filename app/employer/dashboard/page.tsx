import { createClient } from '@/lib/supabase/server';
import { requireRole } from '@/lib/auth/require-role';
import Link from 'next/link';
import {

  Briefcase,
  Users,
  FileText,
  TrendingUp,
  Plus,
  Search,
  Calendar,
  DollarSign,
} from 'lucide-react';

export default async function EmployerDashboard() {
  // Require admin role (employers should have admin or specific employer role)
  const { user, profile } = await requireRole([
    'admin',
    'org_admin',
    'super_admin',
  ]);

  const supabase = await createClient();

  // Get employer organization
  const { data: employer } = await supabase
    .from('employers')
    .select('*')
    .eq('user_id', user.id)
    .single();

  // Get job postings
  const { data: jobPostings } = await supabase
    .from('job_postings')
    .select('*')
    .eq('employer_id', employer?.id)
    .order('created_at', { ascending: false });

  // Get applications
  const { data: applications } = await supabase
    .from('applications')
    .select(
      `
      *,
      profiles(first_name, last_name, email)
    `
    )
    .in('job_posting_id', jobPostings?.map((j) => j.id) || [])
    .order('created_at', { ascending: false })
    .limit(10);

  const activeJobs =
    jobPostings?.filter((j) => j.status === 'active').length || 0;
  const totalApplications = applications?.length || 0;
  const pendingReview =
    applications?.filter((a) => a.status === 'pending').length || 0;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Employer Dashboard
              </h1>
              <p className="text-gray-600 mt-1">
                {employer?.company_name || 'Welcome back'}
              </p>
            </div>
            <Link
              href="/employer/jobs/new"
              className="inline-flex items-center gap-2 px-6 py-3 bg-brand-blue-600 text-white font-semibold rounded-lg hover:bg-brand-blue-700 transition"
            >
              <Plus className="w-5 h-5" />
              Post New Job
            </Link>
          </div>
        </div>
      </header>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Active Jobs</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {activeJobs}
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Briefcase className="w-6 h-6 text-brand-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">
                  Total Applications
                </p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {totalApplications}
                </p>
              </div>
              <div className="p-3 bg-brand-green-100 rounded-lg">
                <FileText className="w-6 h-6 text-brand-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">
                  Pending Review
                </p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {pendingReview}
                </p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Users className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">
                  Hires This Month
                </p>
                <p className="text-3xl font-bold text-gray-900 mt-2">0</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Applications */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">
                  Recent Applications
                </h2>
              </div>
              <div className="divide-y divide-gray-200">
                {applications && applications.length > 0 ? (
                  applications.map((app) => (
                    <div
                      key={app.id}
                      className="p-6 hover:bg-gray-50 transition"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">
                            {app.profiles?.first_name} {app.profiles?.last_name}
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">
                            {app.profiles?.email}
                          </p>
                          <div className="flex items-center gap-4 mt-3">
                            <span
                              className={`px-3 py-1 text-xs font-semibold rounded-full ${
                                app.status === 'pending'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : app.status === 'approved'
                                    ? 'bg-brand-green-100 text-green-800'
                                    : 'bg-gray-100 text-gray-800'
                              }`}
                            >
                              {app.status}
                            </span>
                            <span className="text-xs text-gray-500">
                              {new Date(app.created_at).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <Link
                          href={`/employer/applications/${app.id}`}
                          className="px-4 py-2 text-sm font-semibold text-brand-blue-600 hover:text-brand-blue-700 transition"
                        >
                          Review
                        </Link>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-12 text-center">
                    <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No applications yet</p>
                    <p className="text-sm text-gray-500 mt-2">
                      Post a job to start receiving applications
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Quick Actions
              </h2>
              <div className="space-y-3">
                <Link
                  href="/employer/jobs/new"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition"
                >
                  <Plus className="w-5 h-5 text-brand-blue-600" />
                  <span className="font-semibold text-gray-900">
                    Post New Job
                  </span>
                </Link>
                <Link
                  href="/employer/jobs"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition"
                >
                  <Briefcase className="w-5 h-5 text-brand-blue-600" />
                  <span className="font-semibold text-gray-900">
                    Manage Jobs
                  </span>
                </Link>
                <Link
                  href="/employer/candidates"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition"
                >
                  <Search className="w-5 h-5 text-brand-blue-600" />
                  <span className="font-semibold text-gray-900">
                    Search Candidates
                  </span>
                </Link>
                <Link
                  href="/employer/settings"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition"
                >
                  <DollarSign className="w-5 h-5 text-brand-blue-600" />
                  <span className="font-semibold text-gray-900">Billing</span>
                </Link>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
              <h3 className="font-bold text-blue-900 mb-2">Need Help?</h3>
              <p className="text-sm text-blue-800 mb-4">
                Our team is here to help you find the right talent for your
                organization.
              </p>
              <Link
                href="/contact"
                className="inline-block px-4 py-2 bg-brand-blue-600 text-white font-semibold rounded-lg hover:bg-brand-blue-700 transition text-sm"
              >
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
