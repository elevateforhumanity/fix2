'use client';

import { useState } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { useRouter } from 'next/navigation';

interface InternalEnrollmentFormProps {
  courseId: string;
  courseName: string;
  userId: string;
}

export default function InternalEnrollmentForm({ courseId, courseName, userId }: InternalEnrollmentFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    programHolder: '',
    fundingSource: 'self',
    agreedToTerms: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );

      // Create enrollment
      const { error: enrollError } = await supabase
        .from('enrollments')
        .insert({
          user_id: userId,
          course_id: courseId,
          status: 'active',
          progress: 0,
          program_holder: formData.programHolder || null,
          funding_source: formData.fundingSource,
        });

      if (enrollError) throw enrollError;

      // Redirect to student courses
      router.push('/student/courses?enrolled=true');
    } catch (err: unknown) {
      console.error('Enrollment error:', err);
      setError(err.message || 'Failed to enroll in course');
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
      <h2 className="text-2xl font-bold mb-6">Enrollment Information</h2>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800 text-sm">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Program Holder */}
        <div>
          <label htmlFor="programHolder" className="block text-sm font-medium text-gray-700 mb-2">
            Program Holder (Optional)
          </label>
          <input
            type="text"
            id="programHolder"
            value={formData.programHolder}
            onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setFormData({ ...formData, programHolder: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter program holder name"
          />
          <p className="mt-1 text-sm text-gray-500">
            If you're enrolling through a workforce program, enter the program name
          </p>
        </div>

        {/* Funding Source */}
        <div>
          <label htmlFor="fundingSource" className="block text-sm font-medium text-gray-700 mb-2">
            Funding Source
          </label>
          <select
            id="fundingSource"
            value={formData.fundingSource}
            onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setFormData({ ...formData, fundingSource: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="self">Self-Funded</option>
            <option value="wioa">WIOA Grant</option>
            <option value="employer">Employer-Sponsored</option>
            <option value="scholarship">Scholarship</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Terms and Conditions */}
        <div className="flex items-start">
          <input
            type="checkbox"
            id="agreedToTerms"
            checked={formData.agreedToTerms}
            onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setFormData({ ...formData, agreedToTerms: e.target.checked })}
            className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            required
          />
          <label htmlFor="agreedToTerms" className="ml-3 text-sm text-gray-700">
            I agree to the{' '}
            <a href="/legal/terms" className="text-blue-600 hover:text-blue-700 underline">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="/legal/privacy" className="text-blue-600 hover:text-blue-700 underline">
              Privacy Policy
            </a>
          </label>
        </div>

        {/* Course Access Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-900 mb-2">What happens next?</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• You'll receive immediate access to course materials</li>
            <li>• Course progress will be tracked automatically</li>
            <li>• Certificates will be issued upon completion</li>
            <li>• You can access the course from your student dashboard</li>
          </ul>
        </div>

        {/* Submit Button */}
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading || !formData.agreedToTerms}
            className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {loading ? 'Enrolling...' : 'Complete Enrollment'}
          </button>
        </div>
      </form>
    </div>
  );
}
