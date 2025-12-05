'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';

export default function AdminApprenticeships() {
  const supabase = createClient();
  const [apprenticeships, setApprenticeships] = useState<any[]>([]);
  const [pendingApprovals, setPendingApprovals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    loadData();
  }, [filter]);

  async function loadData() {
    // Load all apprenticeships with student and program info
    let query = supabase
      .from('apprenticeship_enrollments')
      .select(`
        *,
        student:profiles!apprenticeship_enrollments_student_id_fkey(full_name, email),
        program:programs(name, slug)
      `)
      .order('created_at', { ascending: false });

    if (filter !== 'all') {
      query = query.eq('status', filter);
    }

    const { data: apprenticeshipData } = await query;
    setApprenticeships(apprenticeshipData || []);

    // Load pending hour approvals
    const { data: pendingData } = await supabase
      .from('ojt_hours_log')
      .select(`
        *,
        student:profiles!ojt_hours_log_student_id_fkey(full_name),
        apprenticeship:apprenticeship_enrollments(employer_name)
      `)
      .eq('approved', false)
      .order('work_date', { ascending: false })
      .limit(20);

    setPendingApprovals(pendingData || []);
    setLoading(false);
  }

  async function approveHours(logId: string) {
    const { error } = await supabase
      .from('ojt_hours_log')
      .update({ 
        approved: true,
        approved_at: new Date().toISOString(),
        approved_by: (await supabase.auth.getUser()).data.user?.id
      })
      .eq('id', logId);

    if (!error) {
      await loadData();
    }
  }

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold">Apprenticeship Management</h1>
          <p className="text-gray-600 mt-2">Monitor and manage all apprenticeships</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm text-gray-600">Total Apprentices</p>
            <p className="text-3xl font-bold">{apprenticeships.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm text-gray-600">Active</p>
            <p className="text-3xl font-bold text-green-600">
              {apprenticeships.filter(a => a.status === 'active').length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm text-gray-600">Pending Approvals</p>
            <p className="text-3xl font-bold text-orange-600">{pendingApprovals.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm text-gray-600">Completed</p>
            <p className="text-3xl font-bold text-blue-600">
              {apprenticeships.filter(a => a.status === 'completed').length}
            </p>
          </div>
        </div>

        {/* Pending Approvals */}
        {pendingApprovals.length > 0 && (
          <div className="bg-white rounded-lg shadow mb-8">
            <div className="p-6 border-b">
              <h2 className="text-xl font-bold">Pending Hour Approvals</h2>
            </div>
            <div className="divide-y">
              {pendingApprovals.map((log) => (
                <div key={log.id} className="p-6 flex justify-between items-center">
                  <div>
                    <p className="font-semibold">{log.student?.full_name}</p>
                    <p className="text-sm text-gray-600">{log.apprenticeship?.employer_name}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(log.work_date).toLocaleDateString()} - {log.total_hours?.toFixed(1)} hours
                    </p>
                    {log.student_notes && (
                      <p className="text-sm text-gray-600 mt-2">Notes: {log.student_notes}</p>
                    )}
                  </div>
                  <button
                    onClick={() => approveHours(log.id)}
                    className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
                  >
                    Approve
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Filter Tabs */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="flex border-b">
            {['all', 'active', 'completed', 'suspended'].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-6 py-3 font-semibold capitalize ${
                  filter === status
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Apprenticeships List */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <h2 className="text-xl font-bold">All Apprenticeships</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Program</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Employer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Hours</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Progress</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {apprenticeships.map((apprenticeship) => {
                  const progress = (apprenticeship.total_hours_completed / apprenticeship.total_hours_required) * 100;
                  return (
                    <tr key={apprenticeship.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-semibold">{apprenticeship.student?.full_name}</p>
                          <p className="text-sm text-gray-600">{apprenticeship.student?.email}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-medium">{apprenticeship.program?.name}</p>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium">{apprenticeship.employer_name}</p>
                          <p className="text-sm text-gray-600">{apprenticeship.supervisor_name}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-bold">{apprenticeship.total_hours_completed.toFixed(1)}</p>
                        <p className="text-sm text-gray-600">/ {apprenticeship.total_hours_required}</p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${Math.min(progress, 100)}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-gray-600 mt-1">{progress.toFixed(0)}%</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          apprenticeship.status === 'active' ? 'bg-green-100 text-green-800' :
                          apprenticeship.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {apprenticeship.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <Link
                          href={`/admin/apprenticeships/${apprenticeship.id}`}
                          className="text-blue-600 hover:text-blue-800 font-medium"
                        >
                          View Details
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
