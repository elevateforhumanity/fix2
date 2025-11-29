'use client';

import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Link from 'next/link';

export default function PartnerEnrollmentsAdminPage() {
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed' | 'pending'>('all');
  const [stats, setStats] = useState({
    total: 0,
    revenue: 0,
    owedToPartners: 0,
    profit: 0,
  });
  const supabase = createClientComponentClient();

  useEffect(() => {
    fetchEnrollments();
  }, [filter]);

  const fetchEnrollments = async () => {
    setLoading(true);
    
    let query = supabase
      .from('partner_lms_enrollments')
      .select(`
        *,
        partner_lms_providers (
          provider_name,
          provider_type
        ),
        partner_courses (
          course_name,
          wholesale_cost,
          retail_price
        )
      `)
      .order('created_at', { ascending: false });

    if (filter !== 'all') {
      query = query.eq('status', filter);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching enrollments:', error);
    } else {
      setEnrollments(data || []);
      calculateStats(data || []);
    }
    setLoading(false);
  };

  const calculateStats = (data: any[]) => {
    const paidEnrollments = data.filter(e => e.payment_status === 'paid');
    
    const revenue = paidEnrollments.reduce((sum, e) => sum + (e.payment_amount || 0), 0);
    const owedToPartners = paidEnrollments.reduce((sum, e) => {
      const wholesale = e.partner_courses?.wholesale_cost || 0;
      return sum + wholesale;
    }, 0);
    const profit = revenue - owedToPartners;

    setStats({
      total: data.length,
      revenue,
      owedToPartners,
      profit,
    });
  };

  const exportToCSV = () => {
    const csv = [
      ['Date', 'Student', 'Course', 'Provider', 'Amount', 'Status', 'Payment Status'].join(','),
      ...enrollments.map(e => [
        new Date(e.created_at).toLocaleDateString(),
        e.student_id,
        e.course_name || e.partner_courses?.course_name,
        e.partner_lms_providers.provider_name,
        e.payment_amount || 0,
        e.status,
        e.payment_status,
      ].join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `partner-enrollments-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Partner Course Enrollments
            </h1>
            <p className="text-gray-600">
              Manage enrollments and track revenue from partner courses
            </p>
          </div>
          <button
            onClick={exportToCSV}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Export CSV
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <p className="text-sm text-gray-600 mb-1">Total Enrollments</p>
            <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
            <p className="text-3xl font-bold text-green-600">
              ${stats.revenue.toFixed(2)}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <p className="text-sm text-gray-600 mb-1">Owed to Partners</p>
            <p className="text-3xl font-bold text-orange-600">
              ${stats.owedToPartners.toFixed(2)}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <p className="text-sm text-gray-600 mb-1">Your Profit</p>
            <p className="text-3xl font-bold text-blue-600">
              ${stats.profit.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="mb-6 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {['all', 'active', 'completed', 'pending'].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab as any)}
                className={`
                  py-4 px-1 border-b-2 font-medium text-sm capitalize
                  ${
                    filter === tab
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                `}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        {/* Enrollments Table */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-2 text-gray-600">Loading enrollments...</p>
          </div>
        ) : enrollments.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-gray-500">No enrollments found</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Course
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Provider
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payment
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {enrollments.map((enrollment) => (
                  <tr key={enrollment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(enrollment.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      <div className="font-medium">
                        {enrollment.course_name || enrollment.partner_courses?.course_name}
                      </div>
                      <div className="text-xs text-gray-500">
                        Student ID: {enrollment.student_id.slice(0, 8)}...
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {enrollment.partner_lms_providers.provider_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="font-medium">
                        ${enrollment.payment_amount?.toFixed(2) || '0.00'}
                      </div>
                      {enrollment.partner_courses && (
                        <div className="text-xs text-gray-500">
                          Cost: ${enrollment.partner_courses.wholesale_cost.toFixed(2)} | 
                          Profit: ${(enrollment.payment_amount - enrollment.partner_courses.wholesale_cost).toFixed(2)}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        enrollment.status === 'completed' ? 'bg-green-100 text-green-800' :
                        enrollment.status === 'active' ? 'bg-blue-100 text-blue-800' :
                        enrollment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {enrollment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        enrollment.payment_status === 'paid' ? 'bg-green-100 text-green-800' :
                        enrollment.payment_status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {enrollment.payment_status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Partner Payment Summary */}
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Partner Payment Summary
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            Amount owed to each partner for paid enrollments
          </p>
          <div className="space-y-2">
            {Object.entries(
              enrollments
                .filter(e => e.payment_status === 'paid')
                .reduce((acc: any, e) => {
                  const provider = e.partner_lms_providers.provider_name;
                  const cost = e.partner_courses?.wholesale_cost || 0;
                  acc[provider] = (acc[provider] || 0) + cost;
                  return acc;
                }, {})
            ).map(([provider, amount]: [string, any]) => (
              <div key={provider} className="flex justify-between items-center py-2 border-b">
                <span className="font-medium text-gray-900">{provider}</span>
                <span className="text-lg font-bold text-orange-600">
                  ${amount.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
