'use client';

import Link from 'next/link';

export default function AdminProgramsPage() {
  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <Link href="/admin/dashboard" className="text-blue-600 hover:underline">
            ← Back to Admin Dashboard
          </Link>
          <Link 
            href="/admin/courses/create"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            + Add New Program
          </Link>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-8">Program Management</h1>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <input
              type="text"
              placeholder="Search programs..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div className="divide-y divide-gray-200">
            {[
              { name: 'Medical Assistant', students: 45, status: 'Active' },
              { name: 'HVAC Technician', students: 32, status: 'Active' },
              { name: 'Barber Apprenticeship', students: 28, status: 'Active' },
              { name: 'Tax Prep & Financial Services', students: 38, status: 'Active' },
              { name: 'Truck Driving (CDL)', students: 25, status: 'Active' },
            ].map((program, idx) => (
              <div key={idx} className="p-6 hover:bg-gray-50 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{program.name}</h3>
                  <p className="text-sm text-gray-600">{program.students} enrolled students</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                    {program.status}
                  </span>
                  <Link 
                    href={`/admin/courses`}
                    className="text-blue-600 hover:underline"
                  >
                    Manage
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
