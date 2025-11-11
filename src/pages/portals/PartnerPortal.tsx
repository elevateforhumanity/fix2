/**
 * Partner Portal
 * Partner organizations manage their programs and students
 */

import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Users, FileText, TrendingUp, Calendar, Download, Upload, Settings, BarChart } from 'lucide-react';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';

export default function PartnerPortal() {
  // Mock partner data - replace with real auth/data
  const partner = {
    name: 'WorkOne Indianapolis',
    type: 'Workforce Development Agency',
    activePrograms: 12,
    totalStudents: 156,
    completions: 89,
    pendingApplications: 23
  };

  const programs = [
    {
      id: 'barber-2024',
      name: 'Barber Apprenticeship',
      students: 45,
      capacity: 50,
      startDate: '2024-01-15',
      endDate: '2024-12-15',
      status: 'Active'
    },
    {
      id: 'hvac-2024',
      name: 'HVAC Technician Training',
      students: 38,
      capacity: 40,
      startDate: '2024-02-01',
      endDate: '2024-11-30',
      status: 'Active'
    },
    {
      id: 'cna-2024',
      name: 'Healthcare CNA/QMA',
      students: 52,
      capacity: 60,
      startDate: '2024-03-01',
      endDate: '2024-06-30',
      status: 'Active'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Partner Portal | Elevate for Humanity</title>
        <meta name="description" content="Manage your workforce development programs and track student progress" />
      </Helmet>

      <Navigation />

      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Partner Header */}
          <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-lg p-8 text-white mb-8">
            <h1 className="text-3xl font-bold mb-2">{partner.name}</h1>
            <p className="text-xl opacity-90">{partner.type}</p>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-4 gap-4 mt-6">
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-2xl font-bold">{partner.activePrograms}</div>
                <div className="text-sm opacity-90">Active Programs</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-2xl font-bold">{partner.totalStudents}</div>
                <div className="text-sm opacity-90">Total Students</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-2xl font-bold">{partner.completions}</div>
                <div className="text-sm opacity-90">Completions</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-2xl font-bold">{partner.pendingApplications}</div>
                <div className="text-sm opacity-90">Pending Apps</div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Link
              to="/partner/students"
              className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition text-center"
            >
              <Users className="h-12 w-12 text-blue-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-1">Manage Students</h3>
              <p className="text-sm text-gray-600">View & track students</p>
            </Link>

            <Link
              to="/partner/applications"
              className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition text-center"
            >
              <FileText className="h-12 w-12 text-green-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-1">Applications</h3>
              <p className="text-sm text-gray-600">Review & approve</p>
            </Link>

            <Link
              to="/partner/reports"
              className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition text-center"
            >
              <BarChart className="h-12 w-12 text-purple-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-1">Reports</h3>
              <p className="text-sm text-gray-600">Analytics & data</p>
            </Link>

            <Link
              to="/partner/settings"
              className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition text-center"
            >
              <Settings className="h-12 w-12 text-gray-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-1">Settings</h3>
              <p className="text-sm text-gray-600">Configure portal</p>
            </Link>
          </div>

          {/* Active Programs */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Active Programs</h2>
              <Link
                to="/partner/programs/new"
                className="bg-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-purple-700 transition"
              >
                + New Program
              </Link>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Program Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Students
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Duration
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {programs.map((program) => (
                    <tr key={program.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{program.name}</div>
                        <div className="text-sm text-gray-500">ID: {program.id}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{program.students} / {program.capacity}</div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${(program.students / program.capacity) * 100}%` }}
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {program.startDate} to {program.endDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {program.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <Link
                          to={`/partner/program/${program.id}`}
                          className="text-purple-600 hover:text-purple-900 mr-4"
                        >
                          View
                        </Link>
                        <Link
                          to={`/partner/program/${program.id}/edit`}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          Edit
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Document Management */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Download className="h-5 w-5 text-blue-600" />
                Download Reports
              </h3>
              <div className="space-y-3">
                <button className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition">
                  <div className="font-semibold text-gray-900">Student Roster</div>
                  <div className="text-sm text-gray-600">Current enrolled students</div>
                </button>
                <button className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition">
                  <div className="font-semibold text-gray-900">Completion Report</div>
                  <div className="text-sm text-gray-600">Program completions & certificates</div>
                </button>
                <button className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition">
                  <div className="font-semibold text-gray-900">Funding Summary</div>
                  <div className="text-sm text-gray-600">WIOA/WRG/JRI allocations</div>
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Upload className="h-5 w-5 text-green-600" />
                Upload Documents
              </h3>
              <div className="space-y-3">
                <button className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition">
                  <div className="font-semibold text-gray-900">Student Applications</div>
                  <div className="text-sm text-gray-600">Bulk upload applications</div>
                </button>
                <button className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition">
                  <div className="font-semibold text-gray-900">Attendance Records</div>
                  <div className="text-sm text-gray-600">Upload attendance sheets</div>
                </button>
                <button className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition">
                  <div className="font-semibold text-gray-900">Completion Certificates</div>
                  <div className="text-sm text-gray-600">Submit completion documentation</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
