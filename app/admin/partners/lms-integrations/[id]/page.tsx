'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';

export default function ProviderDetailsPage() {
  const params = useParams();
  const providerId = params.id as string;
  const supabase = createClient();

  const [provider, setProvider] = useState<any>(null);
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    completed: 0,
    pending: 0,
    failed: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [providerId]);

  async function loadData() {
    try {
      // Load provider
      const { data: providerData } = await supabase
        .from('partner_lms_providers')
        .select('*')
        .eq('id', providerId)
        .single();
      
      setProvider(providerData);

      // Load enrollments
      const { data: enrollmentsData } = await supabase
        .from('partner_lms_enrollments')
        .select(`
          *,
          student:profiles(id, full_name, email),
          program:programs(id, title)
        `)
        .eq('provider_id', providerId)
        .order('enrolled_at', { ascending: false });
      
      setEnrollments(enrollmentsData || []);

      // Calculate stats
      const total = enrollmentsData?.length || 0;
      const active = enrollmentsData?.filter(e => e.status === 'active').length || 0;
      const completed = enrollmentsData?.filter(e => e.status === 'completed').length || 0;
      const pending = enrollmentsData?.filter(e => e.status === 'pending').length || 0;
      const failed = enrollmentsData?.filter(e => e.status === 'failed').length || 0;

      setStats({ total, active, completed, pending, failed });
      setLoading(false);
    } catch (err) {
      console.error('Error loading data:', err);
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brandPrimary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!provider) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Provider Not Found</h2>
          <Link href="/admin/partners/lms-integrations" className="mt-4 text-brandPrimary hover:underline">
            Back to Integrations
          </Link>
        </div>
      </div>
    );
  }

  const statusColors: Record<string, string> = {
    active: 'bg-green-100 text-green-800',
    completed: 'bg-blue-100 text-blue-800',
    pending: 'bg-yellow-100 text-yellow-800',
    failed: 'bg-red-100 text-red-800',
    payment_pending: 'bg-orange-100 text-orange-800',
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
          <Link href="/admin/partners" className="hover:text-brandPrimary">Partners</Link>
          <span>/</span>
          <Link href="/admin/partners/lms-integrations" className="hover:text-brandPrimary">
            LMS Integrations
          </Link>
          <span>/</span>
          <span className="text-gray-900">{provider.provider_name}</span>
        </div>

        {/* Header */}
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{provider.provider_name}</h1>
            <p className="mt-2 text-gray-600">
              {provider.provider_type} • {provider.is_active ? 'Active' : 'Inactive'}
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              href={`/admin/partners/lms-integrations/${providerId}/enroll`}
              className="px-6 py-3 bg-brandPrimary text-white font-semibold rounded-lg hover:bg-brandPrimaryDark transition-colors"
            >
              Enroll Student
            </Link>
            <Link
              href={`/admin/partners/lms-integrations/${providerId}/edit`}
              className="px-6 py-3 bg-white text-gray-700 font-semibold rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              Edit Provider
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="text-sm text-gray-600 mb-1">Total Enrollments</div>
            <div className="text-3xl font-bold text-gray-900">{stats.total}</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="text-sm text-gray-600 mb-1">Active</div>
            <div className="text-3xl font-bold text-green-600">{stats.active}</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="text-sm text-gray-600 mb-1">Completed</div>
            <div className="text-3xl font-bold text-blue-600">{stats.completed}</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="text-sm text-gray-600 mb-1">Pending</div>
            <div className="text-3xl font-bold text-yellow-600">{stats.pending}</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="text-sm text-gray-600 mb-1">Failed</div>
            <div className="text-3xl font-bold text-red-600">{stats.failed}</div>
          </div>
        </div>

        {/* Provider Details */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Provider Information</h2>
            <div className="space-y-3">
              {provider.contact_name && (
                <div>
                  <div className="text-sm text-gray-600">Contact Name</div>
                  <div className="text-gray-900">{provider.contact_name}</div>
                </div>
              )}
              {provider.contact_email && (
                <div>
                  <div className="text-sm text-gray-600">Contact Email</div>
                  <div className="text-gray-900">{provider.contact_email}</div>
                </div>
              )}
              {provider.contact_phone && (
                <div>
                  <div className="text-sm text-gray-600">Contact Phone</div>
                  <div className="text-gray-900">{provider.contact_phone}</div>
                </div>
              )}
              {provider.enrollment_url && (
                <div>
                  <div className="text-sm text-gray-600">Enrollment URL</div>
                  <a href={provider.enrollment_url} target="_blank" rel="noopener noreferrer" className="text-brandPrimary hover:underline">
                    {provider.enrollment_url}
                  </a>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Integration Details</h2>
            <div className="space-y-3">
              {provider.api_endpoint && (
                <div>
                  <div className="text-sm text-gray-600">API Endpoint</div>
                  <div className="text-gray-900 font-mono text-sm">{provider.api_endpoint}</div>
                </div>
              )}
              {provider.promo_code && (
                <div>
                  <div className="text-sm text-gray-600">Promo Code</div>
                  <div className="text-gray-900 font-mono font-semibold">{provider.promo_code}</div>
                </div>
              )}
              {provider.requires_payment && (
                <div>
                  <div className="text-sm text-gray-600">Payment Required</div>
                  <div className="text-gray-900">${provider.payment_amount}</div>
                </div>
              )}
              <div>
                <div className="text-sm text-gray-600">SSO Enabled</div>
                <div className="text-gray-900">{provider.sso_enabled ? 'Yes' : 'No'}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Enrollments List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Student Enrollments</h2>
          </div>
          
          {enrollments.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Student
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Program
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Enrolled
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Progress
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {enrollments.map((enrollment) => (
                    <tr key={enrollment.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {enrollment.student?.full_name || 'Unknown'}
                        </div>
                        <div className="text-sm text-gray-500">
                          {enrollment.student?.email}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {enrollment.program?.title || 'No program'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[enrollment.status] || 'bg-gray-100 text-gray-800'}`}>
                          {enrollment.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(enrollment.enrolled_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                            <div
                              className="bg-brandPrimary h-2 rounded-full"
                              style={{ width: `${enrollment.progress_percentage || 0}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-600">
                            {enrollment.progress_percentage || 0}%
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link
                          href={`/admin/partners/lms-integrations/${providerId}/enrollments/${enrollment.id}`}
                          className="text-brandPrimary hover:text-blue-900"
                        >
                          View Details
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="px-6 py-12 text-center">
              <p className="text-gray-500">No enrollments yet</p>
              <Link
                href={`/admin/partners/lms-integrations/${providerId}/enroll`}
                className="mt-4 inline-block text-brandPrimary hover:underline"
              >
                Enroll your first student
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
