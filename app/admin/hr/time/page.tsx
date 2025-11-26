// app/admin/hr/time/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Clock, CheckCircle, XCircle, Calendar, Filter } from 'lucide-react';

type TimeEntry = {
  id: string;
  employee_id: string;
  entry_date: string;
  clock_in: string;
  clock_out: string;
  regular_hours: number;
  overtime_hours: number;
  break_minutes: number;
  lunch_minutes: number;
  status: string;
  notes?: string;
  employee: {
    id: string;
    employee_number: string;
    profile: {
      full_name: string;
      email: string;
    };
  };
};

export default function TimeApprovalPage() {
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('pending');
  const [dateFilter, setDateFilter] = useState({
    start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split('T')[0],
    end: new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    loadTimeEntries();
  }, [statusFilter, dateFilter]);

  async function loadTimeEntries() {
    try {
      const params = new URLSearchParams({
        status: statusFilter,
        start: dateFilter.start,
        end: dateFilter.end,
      });

      const res = await fetch(`/api/hr/time-entries?${params}`);
      if (!res.ok) throw new Error('Failed to load time entries');

      const data = await res.json();
      setTimeEntries(data.timeEntries || []);
    } catch (error) {
      console.error('Error loading time entries:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleApprove(id: string) {
    try {
      const res = await fetch(`/api/hr/time-entries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'approved' }),
      });

      if (!res.ok) throw new Error('Failed to approve time entry');
      await loadTimeEntries();
    } catch (error: any) {
      alert('Error: ' + error.message);
    }
  }

  async function handleReject(id: string) {
    const reason = prompt('Reason for rejection:');
    if (!reason) return;

    try {
      const res = await fetch(`/api/hr/time-entries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: 'rejected',
          notes: reason,
        }),
      });

      if (!res.ok) throw new Error('Failed to reject time entry');
      await loadTimeEntries();
    } catch (error: any) {
      alert('Error: ' + error.message);
    }
  }

  async function handleBulkApprove() {
    if (!confirm(`Approve all ${timeEntries.length} pending time entries?`))
      return;

    try {
      await Promise.all(
        timeEntries.map((entry) =>
          fetch(`/api/hr/time-entries/${entry.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: 'approved' }),
          })
        )
      );

      await loadTimeEntries();
    } catch (error: any) {
      alert('Error: ' + error.message);
    }
  }

  const totalHours = timeEntries.reduce(
    (sum, entry) => sum + entry.regular_hours + entry.overtime_hours,
    0
  );
  const totalRegular = timeEntries.reduce(
    (sum, entry) => sum + entry.regular_hours,
    0
  );
  const totalOvertime = timeEntries.reduce(
    (sum, entry) => sum + entry.overtime_hours,
    0
  );

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
                Time & Attendance
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Review and approve employee time entries
              </p>
            </div>
            {statusFilter === 'pending' && timeEntries.length > 0 && (
              <button
                onClick={handleBulkApprove}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
              >
                <CheckCircle className="h-4 w-4" />
                Approve All
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid gap-6 md:grid-cols-4 mb-8">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Clock className="h-6 w-6 text-brandPrimary" />
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
                <Clock className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Regular Hours</p>
                <p className="text-2xl font-bold text-gray-900">
                  {totalRegular.toFixed(1)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-100 rounded-lg">
                <Clock className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Overtime Hours</p>
                <p className="text-2xl font-bold text-gray-900">
                  {totalOvertime.toFixed(1)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Calendar className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Entries</p>
                <p className="text-2xl font-bold text-gray-900">
                  {timeEntries.length}
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
            </select>

            <input
              type="date"
              value={dateFilter.start}
              onChange={(e) =>
                setDateFilter({ ...dateFilter, start: e.target.value })
              }
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
            <span className="text-gray-600">to</span>
            <input
              type="date"
              value={dateFilter.end}
              onChange={(e) =>
                setDateFilter({ ...dateFilter, end: e.target.value })
              }
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Time Entries Table */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4" />
              <p className="text-gray-600">Loading time entries...</p>
            </div>
          ) : timeEntries.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                      Employee
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                      Date
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                      Clock In
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                      Clock Out
                    </th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">
                      Regular
                    </th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">
                      Overtime
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                      Status
                    </th>
                    {statusFilter === 'pending' && (
                      <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">
                        Actions
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {timeEntries.map((entry) => (
                    <tr
                      key={entry.id}
                      className="border-t border-gray-100 hover:bg-gray-50"
                    >
                      <td className="py-3 px-4">
                        <div>
                          <p className="font-medium text-gray-900">
                            {entry.employee?.profile?.full_name || 'N/A'}
                          </p>
                          <p className="text-sm text-gray-600">
                            {entry.employee?.employee_number || 'N/A'}
                          </p>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">
                        {new Date(entry.entry_date).toLocaleDateString(
                          'en-US',
                          {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          }
                        )}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">
                        {entry.clock_in
                          ? new Date(entry.clock_in).toLocaleTimeString(
                              'en-US',
                              {
                                hour: 'numeric',
                                minute: '2-digit',
                              }
                            )
                          : '-'}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">
                        {entry.clock_out
                          ? new Date(entry.clock_out).toLocaleTimeString(
                              'en-US',
                              {
                                hour: 'numeric',
                                minute: '2-digit',
                              }
                            )
                          : '-'}
                      </td>
                      <td className="py-3 px-4 text-right text-sm font-medium text-gray-900">
                        {entry.regular_hours.toFixed(2)}h
                      </td>
                      <td className="py-3 px-4 text-right text-sm font-medium text-gray-900">
                        {entry.overtime_hours.toFixed(2)}h
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            entry.status === 'approved'
                              ? 'bg-green-100 text-green-800'
                              : entry.status === 'rejected'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {entry.status}
                        </span>
                      </td>
                      {statusFilter === 'pending' && (
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleApprove(entry.id)}
                              className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition"
                              title="Approve"
                            >
                              <CheckCircle className="h-5 w-5" />
                            </button>
                            <button
                              onClick={() => handleReject(entry.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                              title="Reject"
                            >
                              <XCircle className="h-5 w-5" />
                            </button>
                          </div>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <Clock className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">No Time Entries</h3>
              <p className="text-gray-600">
                No {statusFilter} time entries found for the selected date range
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
