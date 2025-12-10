'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createEnrollment } from './actions';

interface Program {
  id: string;
  name: string;
  slug: string;
  duration_hours?: number;
}

interface Student {
  id: string;
  full_name: string;
  email: string;
}

interface EnrollmentWizardProps {
  programs: Program[];
  students: Student[];
}

export function EnrollmentWizard({ programs, students }: EnrollmentWizardProps) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    student_id: '',
    program_id: '',
    start_date: new Date().toISOString().split('T')[0],
    expected_completion_date: '',
    funding_source: '',
    funding_amount: '',
    notes: '',
  });

  const selectedProgram = programs.find(p => p.id === formData.program_id);
  const selectedStudent = students.find(s => s.id === formData.student_id);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const formDataObj = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataObj.append(key, value);
      });

      await createEnrollment(formDataObj);
      router.push('/admin/enrollments');
      router.refresh();
    } catch (err: unknown) {
      setError(err.message || 'Failed to create enrollment');
      setLoading(false);
    }
  }

  function nextStep() {
    if (step === 1 && !formData.student_id) {
      setError('Please select a student');
      return;
    }
    if (step === 2 && !formData.program_id) {
      setError('Please select a program');
      return;
    }
    setError(null);
    setStep(step + 1);
  }

  function prevStep() {
    setError(null);
    setStep(step - 1);
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border">
      {/* Progress Steps */}
      <div className="px-6 py-4 border-b">
        <div className="flex items-center justify-between">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  s === step
                    ? 'bg-blue-600 text-white'
                    : s < step
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {s < step ? '✓' : s}
              </div>
              {s < 3 && (
                <div
                  className={`w-24 h-1 mx-2 ${
                    s < step ? 'bg-green-600' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2 text-sm">
          <span className={step === 1 ? 'font-semibold text-blue-600' : 'text-gray-600'}>
            Select Student
          </span>
          <span className={step === 2 ? 'font-semibold text-blue-600' : 'text-gray-600'}>
            Select Program
          </span>
          <span className={step === 3 ? 'font-semibold text-blue-600' : 'text-gray-600'}>
            Details & Funding
          </span>
        </div>
      </div>

      {error && (
        <div className="mx-6 mt-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div className="p-6">
        {/* Step 1: Select Student */}
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">Select Student</h2>
            <p className="text-gray-600">Choose the student to enroll</p>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Students
              </label>
              <select
                value={formData.student_id}
                onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setFormData({ ...formData, student_id: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">-- Select a student --</option>
                {students.map((student) => (
                  <option key={student.id} value={student.id}>
                    {student.full_name} ({student.email})
                  </option>
                ))}
              </select>
            </div>

            {selectedStudent && (
              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h3 className="font-semibold text-blue-900">Selected Student</h3>
                <p className="text-blue-800">{selectedStudent.full_name}</p>
                <p className="text-sm text-blue-600">{selectedStudent.email}</p>
              </div>
            )}
          </div>
        )}

        {/* Step 2: Select Program */}
        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">Select Program</h2>
            <p className="text-gray-600">Choose the training program</p>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Available Programs
              </label>
              <select
                value={formData.program_id}
                onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setFormData({ ...formData, program_id: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">-- Select a program --</option>
                {programs.map((program) => (
                  <option key={program.id} value={program.id}>
                    {program.name}
                    {program.duration_hours && ` (${program.duration_hours}h)`}
                  </option>
                ))}
              </select>
            </div>

            {selectedProgram && (
              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h3 className="font-semibold text-blue-900">Selected Program</h3>
                <p className="text-blue-800">{selectedProgram.name}</p>
                {selectedProgram.duration_hours && (
                  <p className="text-sm text-blue-600">
                    Duration: {selectedProgram.duration_hours} hours
                  </p>
                )}
              </div>
            )}
          </div>
        )}

        {/* Step 3: Details & Funding */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Enrollment Details</h2>
              <p className="text-gray-600">Set dates and funding information</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Date *
                </label>
                <input
                  type="date"
                  value={formData.start_date}
                  onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setFormData({ ...formData, start_date: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Expected Completion Date
                </label>
                <input
                  type="date"
                  value={formData.expected_completion_date}
                  onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setFormData({ ...formData, expected_completion_date: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="pt-4 border-t">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Funding Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Funding Source
                  </label>
                  <select
                    value={formData.funding_source}
                    onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setFormData({ ...formData, funding_source: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">-- Select source --</option>
                    <option value="WIOA">WIOA</option>
                    <option value="Pell Grant">Pell Grant</option>
                    <option value="Scholarship">Scholarship</option>
                    <option value="Employer">Employer Sponsored</option>
                    <option value="Self-Pay">Self-Pay</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Funding Amount ($)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.funding_amount}
                    onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setFormData({ ...formData, funding_amount: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="0.00"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Notes
              </label>
              <textarea
                value={formData.notes}
                onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setFormData({ ...formData, notes: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Additional notes about this enrollment..."
              />
            </div>

            {/* Summary */}
            <div className="p-4 bg-gray-50 border rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Enrollment Summary</h3>
              <div className="space-y-1 text-sm">
                <p><span className="font-medium">Student:</span> {selectedStudent?.full_name}</p>
                <p><span className="font-medium">Program:</span> {selectedProgram?.name}</p>
                <p><span className="font-medium">Start Date:</span> {new Date(formData.start_date).toLocaleDateString()}</p>
                {formData.funding_source && (
                  <p><span className="font-medium">Funding:</span> {formData.funding_source}
                    {formData.funding_amount && ` - $${parseFloat(formData.funding_amount).toLocaleString()}`}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="px-6 py-4 border-t bg-gray-50 flex items-center justify-between">
        <button
          type="button"
          onClick={() => step === 1 ? router.back() : prevStep()}
          className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 font-medium"
        >
          {step === 1 ? 'Cancel' : 'Back'}
        </button>

        {step < 3 ? (
          <button
            type="button"
            onClick={nextStep}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
          >
            Next
          </button>
        ) : (
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating...' : 'Create Enrollment'}
          </button>
        )}
      </div>
    </form>
  );
}
