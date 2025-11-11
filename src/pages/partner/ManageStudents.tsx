/**
 * Partner Portal - Manage Students
 * View and manage students enrolled in partner programs
 */

import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Search, Filter, Download, Mail, Phone, CheckCircle, Clock, XCircle } from 'lucide-react';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';

export default function ManageStudents() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const students = [
    {
      id: '001',
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '(317) 555-0101',
      program: 'Barber Apprenticeship',
      status: 'active',
      progress: 65,
      enrolledDate: '2024-01-15',
      lastActive: '2 hours ago'
    },
    {
      id: '002',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      phone: '(317) 555-0102',
      program: 'HVAC Technician',
      status: 'active',
      progress: 82,
      enrolledDate: '2024-01-10',
      lastActive: '1 day ago'
    },
    {
      id: '003',
      name: 'Mike Johnson',
      email: 'mike.j@example.com',
      phone: '(317) 555-0103',
      program: 'Healthcare CNA/QMA',
      status: 'completed',
      progress: 100,
      enrolledDate: '2023-11-01',
      completedDate: '2024-02-15'
    },
    {
      id: '004',
      name: 'Sarah Williams',
      email: 'sarah.w@example.com',
      phone: '(317) 555-0104',
      program: 'Welding Certification',
      status: 'inactive',
      progress: 25,
      enrolledDate: '2024-02-01',
      lastActive: '2 weeks ago'
    }
  ];

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.program.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || student.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Manage Students | Partner Portal</title>
      </Helmet>

      <Navigation />

      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Manage Students</h1>
              <p className="text-gray-600">{filteredStudents.length} students</p>
            </div>
            <button className="flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition">
              <Download className="h-5 w-5" />
              Export List
            </button>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <div className="grid md:grid-cols-3 gap-4">
              {/* Search */}
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Search by name, email, or program..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              {/* Status Filter */}
              <div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>
          </div>

          {/* Students Table */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
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
                    Progress
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Active
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{student.name}</div>
                        <div className="text-sm text-gray-500 flex items-center gap-2">
                          <Mail className="h-3 w-3" />
                          {student.email}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center gap-2">
                          <Phone className="h-3 w-3" />
                          {student.phone}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{student.program}</div>
                      <div className="text-sm text-gray-500">Enrolled: {student.enrolledDate}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 mb-1">{student.progress}%</div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            student.status === 'completed' ? 'bg-green-600' : 'bg-blue-600'
                          }`}
                          style={{ width: `${student.progress}%` }}
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        student.status === 'active' ? 'bg-green-100 text-green-800' :
                        student.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {student.status === 'active' && <CheckCircle className="h-3 w-3 mr-1" />}
                        {student.status === 'completed' && <CheckCircle className="h-3 w-3 mr-1" />}
                        {student.status === 'inactive' && <XCircle className="h-3 w-3 mr-1" />}
                        {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {student.status === 'completed' ? student.completedDate : student.lastActive}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Link
                        to={`/partner/student/${student.id}`}
                        className="text-purple-600 hover:text-purple-900 mr-4"
                      >
                        View
                      </Link>
                      <button className="text-blue-600 hover:text-blue-900">
                        Contact
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {filteredStudents.length === 0 && (
            <div className="text-center py-12 bg-white rounded-lg shadow">
              <p className="text-xl text-gray-600 mb-4">No students found</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setStatusFilter('all');
                }}
                className="text-purple-600 hover:text-purple-700 font-semibold"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
