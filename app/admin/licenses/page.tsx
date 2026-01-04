'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import {
  Key,
  Users,
  Calendar,
  CheckCircle,
  XCircle,
  AlertCircle,
} from 'lucide-react';

interface License {
  id: string;
  license_key: string;
  license_type: string;
  lms_model: string;
  max_enrollments: number;
  current_enrollments: number;
  status: string;
  expires_at: string | null;
  created_at: string;
  license_holder: {
    email: string;
    full_name: string;
  };
}

export default function AdminLicensesPage() {
  const [licenses, setLicenses] = useState<License[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const supabase = createClient();

  useEffect(() => {
    loadLicenses();
  }, [filter]);

  const loadLicenses = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('program_licenses')
        .select(
          `
          *,
          license_holder:profiles!license_holder_id(email, full_name)
        `
        )
        .order('created_at', { ascending: false });

      if (filter !== 'all') {
        query = query.eq('status', filter);
      }

      const { data, error } = await query;
      if (error) throw error;

      setLicenses(data || []);
    } catch (error: any) {
      console.error('Error loading licenses:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateLicenseStatus = async (licenseId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('program_licenses')
        .update({ status: newStatus })
        .eq('id', licenseId);

      if (error) throw error;
      await loadLicenses();
    } catch (error: any) {
      console.error('Error updating license:', error);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'suspended':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case 'expired':
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'suspended':
        return 'bg-yellow-100 text-yellow-800';
      case 'expired':
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const stats = {
    total: licenses.length,
    active: licenses.filter((l) => l.status === 'active').length,
    suspended: licenses.filter((l) => l.status === 'suspended').length,
    expired: licenses.filter(
      (l) => l.status === 'expired' || l.status === 'cancelled'
    ).length,
  };

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-6 md:py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            License Management
          </h1>
          <p className="mt-1 sm:mt-2 text-sm sm:text-base text-gray-600">
            Manage all platform licenses
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8">
          <div className="bg-white rounded-lg shadow p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-600">
                  Total Licenses
                </p>
                <p className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
                  {stats.total}
                </p>
              </div>
              <Key className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-blue-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-600">Active</p>
                <p className="text-xl sm:text-2xl md:text-3xl font-bold text-green-600">
                  {stats.active}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-green-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-600">Suspended</p>
                <p className="text-xl sm:text-2xl md:text-3xl font-bold text-yellow-600">
                  {stats.suspended}
                </p>
              </div>
              <AlertCircle className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-yellow-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-600">Expired</p>
                <p className="text-xl sm:text-2xl md:text-3xl font-bold text-red-600">
                  {stats.expired}
                </p>
              </div>
              <XCircle className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-red-500" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-4 sm:p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                All Licenses
              </h2>
              <div className="flex flex-wrap gap-2">
                {['all', 'active', 'suspended', 'expired'].map((status) => (
                  <button
                    key={status}
                    onClick={() => setFilter(status)}
                    className={`px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base rounded-lg font-medium transition-colors ${
                      filter === status
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {loading ? (
            <div className="p-8 sm:p-12 text-center">
              <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-600">
                Loading licenses...
              </p>
            </div>
          ) : licenses.length === 0 ? (
            <div className="p-8 sm:p-12 text-center">
              <Key className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-3 sm:mb-4" />
              <p className="text-sm sm:text-base text-gray-600">
                No licenses found
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px]">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      License Key
                    </th>
                    <th className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Holder
                    </th>
                    <th className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Model
                    </th>
                    <th className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Enrollments
                    </th>
                    <th className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {licenses.map((license) => (
                    <tr key={license.id} className="hover:bg-gray-50">
                      <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 whitespace-nowrap">
                        <div className="flex items-center gap-1 sm:gap-2">
                          <Key className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                          <span className="text-xs sm:text-sm font-mono text-gray-900">
                            {license.license_key}
                          </span>
                        </div>
                      </td>
                      <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 whitespace-nowrap">
                        <div className="text-xs sm:text-sm text-gray-900">
                          {license.license_holder?.full_name || 'Unknown'}
                        </div>
                        <div className="text-xs sm:text-sm text-gray-500">
                          {license.license_holder?.email}
                        </div>
                      </td>
                      <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 whitespace-nowrap">
                        <span className="text-xs sm:text-sm text-gray-900 capitalize">
                          {license.license_type.replace(/_/g, ' ')}
                        </span>
                      </td>
                      <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 whitespace-nowrap">
                        <span className="text-xs sm:text-sm text-gray-900 capitalize">
                          {license.lms_model}
                        </span>
                      </td>
                      <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 whitespace-nowrap">
                        <div className="flex items-center gap-1 sm:gap-2">
                          <Users className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                          <span className="text-xs sm:text-sm text-gray-900">
                            {license.current_enrollments}/
                            {license.max_enrollments}
                          </span>
                        </div>
                      </td>
                      <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 whitespace-nowrap">
                        <div className="flex items-center gap-1 sm:gap-2">
                          {getStatusIcon(license.status)}
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(license.status)}`}
                          >
                            {license.status}
                          </span>
                        </div>
                      </td>
                      <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm">
                        <select
                          value={license.status}
                          onChange={(e) =>
                            updateLicenseStatus(license.id, e.target.value)
                          }
                          className="px-2 sm:px-3 py-1 text-xs sm:text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="active">Active</option>
                          <option value="suspended">Suspended</option>
                          <option value="expired">Expired</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
