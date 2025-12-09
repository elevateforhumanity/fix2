import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Export Students | Admin | Elevate For Humanity',
  description: 'Export student data and generate reports.',
};

export default async function ExportStudentsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) redirect('/login');
  
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();
  
  if (profile?.role !== 'admin' && profile?.role !== 'super_admin') {
    redirect('/unauthorized');
  }

  // Get student counts
  const { count: totalStudents } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })
    .eq('role', 'student');

  const { count: activeStudents } = await supabase
    .from('enrollments')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'active');

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link href="/admin/students" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">
            ← Back to Students
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Export Student Data</h1>
          <p className="mt-2 text-gray-600">
            Generate and download student reports in various formats.
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-3xl font-bold text-blue-600">{totalStudents || 0}</div>
            <div className="text-gray-600 text-sm">Total Students</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-3xl font-bold text-green-600">{activeStudents || 0}</div>
            <div className="text-gray-600 text-sm">Active Enrollments</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-3xl font-bold text-purple-600">Ready</div>
            <div className="text-gray-600 text-sm">Export Status</div>
          </div>
        </div>

        {/* Export Options */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Export Options</h2>
          </div>
          
          <div className="p-6 space-y-6">
            {/* Export Format */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Select Export Format
              </label>
              <div className="grid md:grid-cols-3 gap-4">
                <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-500">
                  <input type="radio" name="format" value="csv" defaultChecked className="mr-3" />
                  <div>
                    <div className="font-semibold text-gray-900">CSV</div>
                    <div className="text-xs text-gray-500">Excel compatible</div>
                  </div>
                </label>
                <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-500">
                  <input type="radio" name="format" value="excel" className="mr-3" />
                  <div>
                    <div className="font-semibold text-gray-900">Excel</div>
                    <div className="text-xs text-gray-500">.xlsx format</div>
                  </div>
                </label>
                <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-500">
                  <input type="radio" name="format" value="pdf" className="mr-3" />
                  <div>
                    <div className="font-semibold text-gray-900">PDF</div>
                    <div className="text-xs text-gray-500">Printable report</div>
                  </div>
                </label>
              </div>
            </div>

            {/* Data Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Select Data to Include
              </label>
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="rounded text-blue-600" />
                  <span className="text-sm text-gray-700">Basic Information (Name, Email, Phone)</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="rounded text-blue-600" />
                  <span className="text-sm text-gray-700">Enrollment Status</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="rounded text-blue-600" />
                  <span className="text-sm text-gray-700">Course Progress</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded text-blue-600" />
                  <span className="text-sm text-gray-700">Grades and Assessments</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded text-blue-600" />
                  <span className="text-sm text-gray-700">Attendance Records</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded text-blue-600" />
                  <span className="text-sm text-gray-700">Certificates Earned</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded text-blue-600" />
                  <span className="text-sm text-gray-700">Financial Information</span>
                </label>
              </div>
            </div>

            {/* Filter Options */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Filter Students
              </label>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Program</label>
                  <select className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                    <option value="">All Programs</option>
                    <option value="barber">Barber Training</option>
                    <option value="cna">CNA</option>
                    <option value="hvac">HVAC</option>
                    <option value="medical">Medical Assistant</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Status</label>
                  <select className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                    <option value="">All Statuses</option>
                    <option value="active">Active</option>
                    <option value="completed">Completed</option>
                    <option value="withdrawn">Withdrawn</option>
                    <option value="pending">Pending</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Start Date From</label>
                  <input type="date" className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Start Date To</label>
                  <input type="date" className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                </div>
              </div>
            </div>

            {/* Export Actions */}
            <div className="flex justify-between items-center pt-4 border-t border-gray-200">
              <div className="text-sm text-gray-600">
                Estimated records: <span className="font-semibold">{totalStudents || 0}</span>
              </div>
              <div className="flex gap-4">
                <Link
                  href="/admin/students"
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </Link>
                <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-semibold">
                  Generate Export
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Exports */}
        <div className="mt-6 bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Recent Exports</h2>
          </div>
          <div className="p-6">
            <div className="text-center text-gray-500 py-8">
              No recent exports. Generate your first export above.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
