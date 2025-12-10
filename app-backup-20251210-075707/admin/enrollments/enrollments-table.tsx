'use client';

import Link from 'next/link';
import { useState } from 'react';

interface Enrollment {
  id: string;
  student_id: string;
  program_id: string;
  status: string;
  progress_percentage: number;
  start_date: string;
  expected_completion_date?: string;
  actual_completion_date?: string;
  created_at: string;
  student?: {
    full_name: string;
    email: string;
  };
  program?: {
    name: string;
    slug: string;
  };
  funding?: Array<{
    amount: number;
    source: string;
    status: string;
  }>;
}

export function EnrollmentsTable({ enrollments }: { enrollments: Enrollment[] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'completed' | 'pending'>('all');

  const filteredEnrollments = enrollments.filter(enrollment => {
    const studentName = enrollment.student?.full_name?.toLowerCase() || '';
    const studentEmail = enrollment.student?.email?.toLowerCase() || '';
    const programName = enrollment.program?.name?.toLowerCase() || '';
    const searchLower = searchTerm.toLowerCase();
    
    const matchesSearch = studentName.includes(searchLower) ||
                         studentEmail.includes(searchLower) ||
                         programName.includes(searchLower);
    
    const matchesFilter = filterStatus === 'all' || enrollment.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'withdrawn':
        return 'bg-red-100 text-red-800';
      case 'suspended':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      {/* Filters */}
      <div className="p-4 border-b">
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Search by student name, email, or program..."
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={filterStatus}
            onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setFilterStatus(e.target.value as string)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="withdrawn">Withdrawn</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
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
                Progress
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Start Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Funding
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredEnrollments.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                  No enrollments found
                </td>
              </tr>
            ) : (
              filteredEnrollments.map((enrollment) => (
                <tr key={enrollment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium text-gray-900">
                        {enrollment.student?.full_name || 'Unknown Student'}
                      </div>
                      <div className="text-sm text-gray-500">
                        {enrollment.student?.email || ''}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {enrollment.program?.name || 'Unknown Program'}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(enrollment.status)}`}>
                      {enrollment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-[100px]">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${enrollment.progress_percentage || 0}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-600">
                        {enrollment.progress_percentage || 0}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {new Date(enrollment.start_date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    {enrollment.funding && enrollment.funding.length > 0 ? (
                      <div className="text-sm">
                        <div className="font-medium text-gray-900">
                          ${enrollment.funding.reduce((sum, f) => sum + (f.amount || 0), 0).toLocaleString()}
                        </div>
                        <div className="text-gray-500">
                          {enrollment.funding[0].source}
                        </div>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-500">No funding</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right text-sm font-medium">
                    <Link
                      href={`/admin/enrollments/${enrollment.id}`}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      View Details
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination info */}
      <div className="px-6 py-4 border-t bg-gray-50">
        <p className="text-sm text-gray-700">
          Showing <span className="font-medium">{filteredEnrollments.length}</span> of{' '}
          <span className="font-medium">{enrollments.length}</span> enrollments
        </p>
      </div>
    </div>
  );
}
