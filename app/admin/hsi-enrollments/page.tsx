'use client';

import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

interface HSIEnrollment {
  id: string;
  student_id: string;
  course_type: string;
  stripe_payment_id: string;
  stripe_session_id: string;
  amount_paid: number;
  student_email: string;
  student_name: string;
  student_phone: string;
  student_address: string;
  hsi_enrollment_link: string;
  enrollment_status: string;
  hsi_student_id: string | null;
  enrolled_at: string | null;
  created_at: string;
  notes: string | null;
}

export default function HSIEnrollmentsPage() {
  const [enrollments, setEnrollments] = useState<HSIEnrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'enrolled' | 'failed'>('pending');
  const supabase = createClientComponentClient();

  useEffect(() => {
    fetchEnrollments();
  }, [filter]);

  const fetchEnrollments = async () => {
    setLoading(true);
    let query = supabase
      .from('hsi_enrollment_queue')
      .select('*')
      .order('created_at', { ascending: false });

    if (filter !== 'all') {
      query = query.eq('enrollment_status', filter);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching enrollments:', error);
    } else {
      setEnrollments(data || []);
    }
    setLoading(false);
  };

  const updateEnrollmentStatus = async (
    id: string,
    status: string,
    hsiStudentId?: string,
    notes?: string
  ) => {
    const updates: any = {
      enrollment_status: status,
    };

    if (status === 'enrolled') {
      updates.enrolled_at = new Date().toISOString();
    }

    if (hsiStudentId) {
      updates.hsi_student_id = hsiStudentId;
    }

    if (notes) {
      updates.notes = notes;
    }

    const { error } = await supabase
      .from('hsi_enrollment_queue')
      .update(updates)
      .eq('id', id);

    if (error) {
      console.error('Error updating enrollment:', error);
      alert('Failed to update enrollment');
    } else {
      alert('Enrollment updated successfully');
      fetchEnrollments();
    }
  };

  const handleMarkEnrolled = async (enrollment: HSIEnrollment) => {
    const hsiStudentId = prompt('Enter HSI Student ID:');
    if (hsiStudentId) {
      await updateEnrollmentStatus(enrollment.id, 'enrolled', hsiStudentId);
    }
  };

  const handleMarkFailed = async (enrollment: HSIEnrollment) => {
    const notes = prompt('Enter failure reason:');
    if (notes) {
      await updateEnrollmentStatus(enrollment.id, 'failed', undefined, notes);
    }
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      enrolled: 'bg-green-100 text-green-800',
      failed: 'bg-red-100 text-red-800',
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getCourseDisplayName = (courseType: string) => {
    const names: Record<string, string> = {
      'cpr-aed': 'Adult CPR/AED',
      'first-aid': 'Adult First Aid',
      'cpr-first-aid': 'Adult CPR/AED + First Aid',
      'bls': 'BLS for Healthcare Providers',
    };
    return names[courseType] || courseType;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            HSI Enrollment Queue
          </h1>
          <p className="text-gray-600">
            Manage pending HSI course enrollments and track enrollment status
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="mb-6 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {['all', 'pending', 'enrolled', 'failed'].map((tab) => (
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

        {/* Enrollments List */}
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
          <div className="space-y-4">
            {enrollments.map((enrollment) => (
              <div
                key={enrollment.id}
                className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {enrollment.student_name}
                      </h3>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(
                          enrollment.enrollment_status
                        )}`}
                      >
                        {enrollment.enrollment_status}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Course</p>
                        <p className="font-medium text-gray-900">
                          {getCourseDisplayName(enrollment.course_type)}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600">Amount Paid</p>
                        <p className="font-medium text-gray-900">
                          ${enrollment.amount_paid.toFixed(2)}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600">Email</p>
                        <p className="font-medium text-gray-900">
                          {enrollment.student_email}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600">Phone</p>
                        <p className="font-medium text-gray-900">
                          {enrollment.student_phone || 'N/A'}
                        </p>
                      </div>
                      {enrollment.student_address && (
                        <div className="col-span-2">
                          <p className="text-gray-600">Address</p>
                          <p className="font-medium text-gray-900">
                            {enrollment.student_address}
                          </p>
                        </div>
                      )}
                      <div>
                        <p className="text-gray-600">Payment Date</p>
                        <p className="font-medium text-gray-900">
                          {new Date(enrollment.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      {enrollment.hsi_student_id && (
                        <div>
                          <p className="text-gray-600">HSI Student ID</p>
                          <p className="font-medium text-gray-900">
                            {enrollment.hsi_student_id}
                          </p>
                        </div>
                      )}
                      {enrollment.enrolled_at && (
                        <div>
                          <p className="text-gray-600">Enrolled Date</p>
                          <p className="font-medium text-gray-900">
                            {new Date(enrollment.enrolled_at).toLocaleDateString()}
                          </p>
                        </div>
                      )}
                      {enrollment.notes && (
                        <div className="col-span-2">
                          <p className="text-gray-600">Notes</p>
                          <p className="font-medium text-gray-900">
                            {enrollment.notes}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="mt-4">
                      <a
                        href={enrollment.hsi_enrollment_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        Open HSI Enrollment Link →
                      </a>
                    </div>
                  </div>

                  {enrollment.enrollment_status === 'pending' && (
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => handleMarkEnrolled(enrollment)}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                      >
                        Mark Enrolled
                      </button>
                      <button
                        onClick={() => handleMarkFailed(enrollment)}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                      >
                        Mark Failed
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
