import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Bulk Certificate Issuance | Admin',
  description: 'Issue certificates to multiple students at once',
};

export default function BulkCertificatesPage() {
  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <Link
            href="/admin/certificates"
            className="text-red-600 hover:underline mb-4 inline-block"
          >
            ← Back to Certificates
          </Link>
          <h1 className="text-3xl font-bold text-slate-900">
            Bulk Certificate Issuance
          </h1>
          <p className="text-slate-600 mt-2">
            Issue certificates to multiple students who completed a course
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Select Course
              </label>
              <select className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent">
                <option value="">Choose a course...</option>
                <option value="hvac">HVAC Technician</option>
                <option value="cdl">CDL Truck Driving</option>
                <option value="barber">Barber Apprenticeship</option>
                <option value="medical">Medical Assistant</option>
                <option value="building">Building Maintenance</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Completion Date
              </label>
              <input
                type="date"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Select Students
              </label>
              <div className="border border-slate-300 rounded-lg p-4 max-h-96 overflow-y-auto">
                <div className="space-y-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <label
                      key={i}
                      className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded"
                    >
                      <input type="checkbox" className="w-4 h-4 text-red-600" />
                      <span className="text-slate-700">Student Name {i}</span>
                      <span className="text-slate-500 text-sm ml-auto">
                        student{i}@example.com
                      </span>
                    </label>
                  ))}
                </div>
              </div>
              <p className="text-sm text-slate-500 mt-2">
                Select all students who completed the course
              </p>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-semibold"
              >
                Issue Certificates
              </button>
              <button
                type="button"
                className="px-6 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition font-semibold"
              >
                Preview
              </button>
            </div>
          </form>
        </div>

        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-semibold text-blue-900 mb-2">💡 Tip</h3>
          <p className="text-blue-800 text-sm">
            Certificates will be automatically emailed to students and available
            in their dashboard. You can also download a ZIP file of all
            certificates.
          </p>
        </div>
      </div>
    </div>
  );
}
