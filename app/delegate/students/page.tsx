import { Metadata } from 'next';
import Link from 'next/link';
import { Users, Search } from 'lucide-react';

export const metadata: Metadata = {
  title: 'My Students | Delegate Dashboard',
  description: 'View and manage your assigned students',
};

export default function DelegateStudentsPage() {
  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <Link
            href="/delegate/dashboard"
            className="text-red-600 hover:underline mb-4 inline-block"
          >
            ← Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
            <Users className="h-8 w-8 text-red-600" />
            My Students
          </h1>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="mb-6 flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search students..."
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
            <select className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500">
              <option>All Programs</option>
              <option>HVAC</option>
              <option>CDL</option>
              <option>Barber</option>
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-4 font-semibold text-slate-700">
                    Name
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-700">
                    Program
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-700">
                    Progress
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-700">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3, 4, 5].map((i) => (
                  <tr key={i} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-3 px-4">
                      <div>
                        <div className="font-medium text-slate-900">
                          Student Name {i}
                        </div>
                        <div className="text-sm text-slate-500">
                          student{i}@gmail.com
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-slate-700">HVAC Technician</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-slate-200 rounded-full h-2">
                          <div
                            className="bg-red-600 h-2 rounded-full"
                            style={{ width: `${i * 20}%` }}
                          />
                        </div>
                        <span className="text-sm text-slate-600">{i * 20}%</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                        Active
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <Link
                        href={`/admin/learner/${i}`}
                        className="text-red-600 hover:underline text-sm"
                      >
                        View Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
