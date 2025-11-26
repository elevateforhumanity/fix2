'use client';

import { useState, useEffect } from 'react';
import { Clock, Calendar, User, Plus } from 'lucide-react';

interface AttendanceRecord {
  id: string;
  enrollment_id: string;
  date: string;
  hours: number;
  notes: string | null;
  created_at: string;
  enrollments: {
    profiles: {
      full_name: string;
      email: string;
    };
    courses: {
      title: string;
    };
  };
}

interface Enrollment {
  id: string;
  user_id: string;
  course_id: string;
  profiles: {
    full_name: string;
    email: string;
  };
  courses: {
    title: string;
  };
}

export default function PartnerAttendancePage() {
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Form state
  const [enrollmentId, setEnrollmentId] = useState('');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [hours, setHours] = useState('4');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    try {
      // Fetch attendance records
      const recordsRes = await fetch('/api/partner/attendance');
      const recordsData = await recordsRes.json();
      if (recordsData.records) {
        setRecords(recordsData.records);
      }

      // Fetch enrollments for the dropdown
      const enrollmentsRes = await fetch('/api/partner/enrollments');
      const enrollmentsData = await enrollmentsRes.json();
      if (enrollmentsData.enrollments) {
        setEnrollments(enrollmentsData.enrollments);
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch('/api/partner/attendance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          enrollmentId,
          date,
          hours: Number(hours),
          notes: notes || null,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        alert(data.error || 'Failed to record attendance');
        return;
      }

      // Reset form
      setEnrollmentId('');
      setDate(new Date().toISOString().slice(0, 10));
      setHours('4');
      setNotes('');
      setShowForm(false);

      // Refresh list
      fetchData();
    } catch (error) {
      console.error('Failed to record attendance:', error);
      alert('Failed to record attendance');
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="p-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4" />
          <div className="h-4 bg-gray-200 rounded w-1/2" />
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Attendance Tracking</h1>
          <p className="text-gray-600">
            Record contact hours for your learners
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2 bg-brandPrimary text-white rounded-lg hover:bg-brandPrimaryDark transition-colors"
        >
          <Plus className="w-4 h-4" />
          Record Attendance
        </button>
      </div>

      {/* Record Attendance Form */}
      {showForm && (
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Record Attendance</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Learner / Course *
                </label>
                <select
                  value={enrollmentId}
                  onChange={(e) => setEnrollmentId(e.target.value)}
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select a learner...</option>
                  {enrollments.map((enrollment) => (
                    <option key={enrollment.id} value={enrollment.id}>
                      {enrollment.profiles.full_name} - {enrollment.courses.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date *
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Hours *
                </label>
                <input
                  type="number"
                  step="0.25"
                  min="0.25"
                  max="24"
                  value={hours}
                  onChange={(e) => setHours(e.target.value)}
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="md:col-span-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notes (optional)
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Additional details about this session..."
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={submitting}
                className="px-4 py-2 bg-brandPrimary text-white rounded-lg hover:bg-brandPrimaryDark transition-colors disabled:opacity-50"
              >
                {submitting ? 'Recording...' : 'Record Attendance'}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Attendance Records */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {records.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <Clock className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p>No attendance records yet. Record your first session to get started.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Learner
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Course
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hours
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Notes
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {records.map((record) => (
                  <tr key={record.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {record.enrollments.profiles.full_name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {record.enrollments.profiles.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {record.enrollments.courses.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(record.date).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4 text-brandPrimary" />
                        <span className="text-sm font-medium text-gray-900">
                          {record.hours}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {record.notes || '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
