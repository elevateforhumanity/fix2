'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';

export const metadata = {
  title: 'Elevate for Humanity | Workforce Training',
  description: 'Free workforce training and apprenticeships in Indianapolis. WIOA, WRG, and JRI funded programs.',
};

export default function TestEnrollmentPage() {
  const [students, setStudents] = useState<any[]>([]);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [programId] = useState('65310ca8-c7a8-4633-ab9c-d25684090ecc');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    // Fetch students
    fetch('/api/test-get-students')
      .then((r) => r.json())
      .then((data) => setStudents(data.students || []));
  }, []);

  const handleTest = async () => {
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/test-webhook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentId: selectedStudent,
          programId,
        }),
      });

      const data = await response.json();
      setResult(data);
    } catch (error: any) {
      setResult({ error: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">
          🧪 Test Automatic Enrollment
        </h1>
        <p className="text-slate-600 mb-8">Test the webhook without payment</p>

        <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Select Student
            </label>
            <select
              value={selectedStudent}
              onChange={(e) => setSelectedStudent(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
            >
              <option value="">-- Select a student --</option>
              {students.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.email} - {s.full_name || 'No name'}
                </option>
              ))}
            </select>
            {students.length === 0 && (
              <p className="text-xs text-slate-500 mt-1">Loading students...</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Program</label>
            <input
              type="text"
              value="Barber Apprenticeship"
              disabled
              className="w-full px-4 py-2 border rounded-lg bg-slate-50"
            />
          </div>

          <button
            onClick={handleTest}
            disabled={loading || !selectedStudent}
            className="w-full px-6 py-3 bg-brand-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-slate-300 font-semibold"
          >
            {loading ? 'Testing...' : '🚀 Test Auto-Enrollment'}
          </button>

          {result && (
            <div
              className={`mt-4 p-4 rounded-lg ${
                result.success
                  ? 'bg-green-50 border border-green-200'
                  : 'bg-red-50 border border-red-200'
              }`}
            >
              <h3 className="font-bold mb-2 text-lg">
                {result.success ? '✅ Success!' : '❌ Error'}
              </h3>
              {result.success && (
                <div className="space-y-2 text-sm">
                  <p>
                    <strong>Action:</strong> {result.action}
                  </p>
                  <p>
                    <strong>Enrollment ID:</strong> {result.enrollmentId}
                  </p>
                  <p>
                    <strong>Message:</strong> {result.message}
                  </p>
                </div>
              )}
              <details className="mt-3">
                <summary className="cursor-pointer text-xs text-slate-600">
                  View raw response
                </summary>
                <pre className="text-xs overflow-auto mt-2 bg-white p-2 rounded">
                  {JSON.stringify(result, null, 2)}
                </pre>
              </details>
            </div>
          )}
        </div>

        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-bold text-blue-900 mb-2">ℹ️ How This Works:</h3>
          <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
            <li>Simulates the Stripe webhook</li>
            <li>Creates or activates enrollment instantly</li>
            <li>No payment required</li>
            <li>Student gets immediate access</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
