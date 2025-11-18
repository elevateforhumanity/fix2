// app/admin/hr/leave/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Calendar, CheckCircle, XCircle, Clock, Filter } from 'lucide-react';

type LeaveRequest = {
  id: string;
  employee_id: string;
  policy_id: string;
  start_date: string;
  end_date: string;
  total_hours: number;
  reason?: string;
  status: string;
  reviewed_at?: string;
  rejection_reason?: string;
  employee: {
    id: string;
    employee_number: string;
    profile: {
      full_name: string;
      email: string;
    };
  };
  policy: {
    id: string;
    policy_name: string;
    policy_type: string;
  };
};

export default function LeaveApprovalPage() {
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('pending');

  useEffect(() => {
    loadLeaveRequests();
  }, [statusFilter]);

  async function loadLeaveRequests() {
    try {
      const params = new URLSearchParams({ status: statusFilter });
      const res = await fetch(`/api/hr/leave-requests?${params}`);
      if (!res.ok) throw new Error('Failed to load leave requests');

      const data = await res.json();
      setLeaveRequests(data.leaveRequests || []);
    } catch (error) {
      console.error('Error loading leave requests:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleApprove(id: string) {
    if (!confirm('Approve this leave request?')) return;

    try {
      const res = await fetch(`/api/hr/leave-requests/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'approved' }),
      });

      if (!res.ok) throw new Error('Failed to approve leave request');
      await loadLeaveRequests();
    } catch (error: any) {
      alert('Error: ' + error.message);
    }
  }

  async function handleReject(id: string) {
    const reason = prompt('Reason for rejection:');
    if (!reason) return;

    try {
      const res = await fetch(`/api/hr/leave-requests/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: 'rejected',
          rejection_reason: reason,
        }),
      });

      if (!res.ok) throw new Error('Failed to reject leave request');
      await loadLeaveRequests();
    } catch (error: any) {
      alert('Error: ' + error.message);
    }
  }

  const totalHours = leaveRequests.reduce(
    (sum, req) => sum + req.total_hours,
    0
  );
  const totalDays = totalHours / 8; // Assuming 8-hour workday

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <Link
                href="/admin/hr"
                className="text-sm text-gray-600 hover:text-gray-900 mb-2 inline-block"
              >
                ← Back to HR
              </Link>
              <h1 className="text-2xl font-bold text-gray-900 mt-2">
                Leave Management
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Review and approve employee leave requests
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Requests</p>
                <p className="text-2xl font-bold text-gray-900">
                  {leaveRequests.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Clock className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Hours</p>
                <p className="text-2xl font-bold text-gray-900">
                  {totalHours.toFixed(1)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <Calendar className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Days</p>
                <p className="text-2xl font-bold text-gray-900">
                  {totalDays.toFixed(1)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
          <div className="flex items-center gap-4">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Leave Requests */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4" />
              <p className="text-gray-600">Loading leave requests...</p>
            </div>
          ) : leaveRequests.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {leaveRequests.map((request) => {
                const days = request.total_hours / 8;
                const startDate = new Date(request.start_date);
                const endDate = new Date(request.end_date);

                return (
                  <div key={request.id} className="p-6 hover:bg-gray-50">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-bold text-gray-900">
                            {request.employee?.profile?.full_name || 'N/A'}
                          </h3>
                          <span
                            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              request.status === 'approved'
                                ? 'bg-green-100 text-green-800'
                                : request.status === 'rejected'
                                  ? 'bg-red-100 text-red-800'
                                  : request.status === 'cancelled'
                                    ? 'bg-gray-100 text-gray-800'
                                    : 'bg-yellow-100 text-yellow-800'
                            }`}
                          >
                            {request.status}
                          </span>
                        </div>

                        <p className="text-sm text-gray-600 mb-3">
                          {request.employee?.employee_number} •{' '}
                          {request.employee?.profile?.email}
                        </p>

                        <div className="grid gap-3 md:grid-cols-2 mb-3">
                          <div>
                            <p className="text-xs text-gray-600">Leave Type</p>
                            <p className="font-medium text-gray-900">
                              {request.policy?.policy_name || 'N/A'}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-600">Duration</p>
                            <p className="font-medium text-gray-900">
                              {days.toFixed(1)} days ({request.total_hours}{' '}
                              hours)
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-600">Start Date</p>
                            <p className="font-medium text-gray-900">
                              {startDate.toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                              })}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-600">End Date</p>
                            <p className="font-medium text-gray-900">
                              {endDate.toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                              })}
                            </p>
                          </div>
                        </div>

                        {request.reason && (
                          <div className="mb-3">
                            <p className="text-xs text-gray-600">Reason</p>
                            <p className="text-sm text-gray-900">
                              {request.reason}
                            </p>
                          </div>
                        )}

                        {request.rejection_reason && (
                          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-xs text-red-600 font-medium mb-1">
                              Rejection Reason
                            </p>
                            <p className="text-sm text-red-900">
                              {request.rejection_reason}
                            </p>
                          </div>
                        )}
                      </div>

                      {statusFilter === 'pending' && (
                        <div className="flex items-center gap-2 ml-4">
                          <button
                            onClick={() => handleApprove(request.id)}
                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
                          >
                            <CheckCircle className="h-4 w-4" />
                            Approve
                          </button>
                          <button
                            onClick={() => handleReject(request.id)}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2"
                          >
                            <XCircle className="h-4 w-4" />
                            Reject
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">
                No Leave Requests
              </h3>
              <p className="text-gray-600">
                No {statusFilter} leave requests at this time
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
