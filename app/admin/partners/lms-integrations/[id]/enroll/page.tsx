'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';

export default function EnrollStudentPage() {
  const router = useRouter();
  const params = useParams();
  const providerId = params.id as string;
  const supabase = createClient();

  const [provider, setProvider] = useState<any>(null);
  const [students, setStudents] = useState<any[]>([]);
  const [programs, setPrograms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    student_id: '',
    program_id: '',
    send_welcome_email: true,
    auto_enroll: true,
  });

  useEffect(() => {
    loadData();
  }, [providerId]);

  async function loadData() {
    try {
      // Load provider
      const { data: providerData } = await supabase
        .from('partner_lms_providers')
        .select('*')
        .eq('id', providerId)
        .single();
      
      setProvider(providerData);

      // Load students
      const { data: studentsData } = await supabase
        .from('profiles')
        .select('id, full_name, email')
        .eq('role', 'student')
        .order('full_name');
      
      setStudents(studentsData || []);

      // Load programs that use this provider
      const { data: programsData } = await supabase
        .from('program_partner_lms')
        .select('program_id, programs(id, title)')
        .eq('provider_id', providerId);
      
      const programsList = programsData?.map(p => p.programs).filter(Boolean) || [];
      setPrograms(programsList);

      setLoading(false);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      // Create enrollment
      const { data: enrollment, error: enrollError } = await supabase
        .from('partner_lms_enrollments')
        .insert({
          provider_id: providerId,
          student_id: formData.student_id,
          program_id: formData.program_id || null,
          status: 'pending',
          enrolled_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (enrollError) throw enrollError;

      // Send welcome email if requested
      if (formData.send_welcome_email) {
        await supabase.functions.invoke('send-partner-welcome-email', {
          body: {
            enrollment_id: enrollment.id,
            provider_id: providerId,
            student_id: formData.student_id,
          },
        });
      }

      // Auto-enroll if requested and provider supports it
      if (formData.auto_enroll && provider.api_endpoint) {
        await supabase.functions.invoke('partner-lms-enroll', {
          body: {
            enrollment_id: enrollment.id,
            provider_id: providerId,
            student_id: formData.student_id,
          },
        });
      }

      router.push(`/admin/partners/lms-integrations/${providerId}?enrolled=success`);
    } catch (err: any) {
      setError(err.message);
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brandPrimary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
            <Link href="/admin/partners/lms-integrations" className="hover:text-brandPrimary">
              LMS Integrations
            </Link>
            <span>/</span>
            <Link href={`/admin/partners/lms-integrations/${providerId}`} className="hover:text-brandPrimary">
              {provider?.provider_name}
            </Link>
            <span>/</span>
            <span className="text-gray-900">Enroll Student</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Enroll Student</h1>
          <p className="mt-2 text-gray-600">
            Enroll a student in {provider?.provider_name}
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Student Selection */}
            <div>
              <label htmlFor="student_id" className="block text-sm font-medium text-gray-700 mb-2">
                Select Student *
              </label>
              <select
                id="student_id"
                required
                value={formData.student_id}
                onChange={(e) => setFormData({ ...formData, student_id: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brandPrimary focus:border-transparent"
              >
                <option value="">Choose a student...</option>
                {students.map((student) => (
                  <option key={student.id} value={student.id}>
                    {student.full_name} ({student.email})
                  </option>
                ))}
              </select>
            </div>

            {/* Program Selection */}
            {programs.length > 0 && (
              <div>
                <label htmlFor="program_id" className="block text-sm font-medium text-gray-700 mb-2">
                  Associated Program (Optional)
                </label>
                <select
                  id="program_id"
                  value={formData.program_id}
                  onChange={(e) => setFormData({ ...formData, program_id: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brandPrimary focus:border-transparent"
                >
                  <option value="">No program association</option>
                  {programs.map((program: any) => (
                    <option key={program.id} value={program.id}>
                      {program.title}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Options */}
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="send_welcome_email"
                    type="checkbox"
                    checked={formData.send_welcome_email}
                    onChange={(e) => setFormData({ ...formData, send_welcome_email: e.target.checked })}
                    className="h-4 w-4 text-brandPrimary focus:ring-brandPrimary border-gray-300 rounded"
                  />
                </div>
                <div className="ml-3">
                  <label htmlFor="send_welcome_email" className="font-medium text-gray-700">
                    Send Welcome Email
                  </label>
                  <p className="text-sm text-gray-500">
                    Send enrollment instructions and login details to the student
                  </p>
                </div>
              </div>

              {provider?.api_endpoint && (
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="auto_enroll"
                      type="checkbox"
                      checked={formData.auto_enroll}
                      onChange={(e) => setFormData({ ...formData, auto_enroll: e.target.checked })}
                      className="h-4 w-4 text-brandPrimary focus:ring-brandPrimary border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3">
                    <label htmlFor="auto_enroll" className="font-medium text-gray-700">
                      Auto-Enroll via API
                    </label>
                    <p className="text-sm text-gray-500">
                      Automatically create account in {provider.provider_name} system
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Provider Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">Provider Information</h3>
              <div className="space-y-1 text-sm text-blue-800">
                {provider?.enrollment_url && (
                  <div>Enrollment URL: {provider.enrollment_url}</div>
                )}
                {provider?.promo_code && (
                  <div>Promo Code: <span className="font-mono font-semibold">{provider.promo_code}</span></div>
                )}
                {provider?.requires_payment && (
                  <div>Payment Required: ${provider.payment_amount}</div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 px-6 py-3 bg-brandPrimary text-white font-semibold rounded-lg hover:bg-brandPrimaryDark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? 'Enrolling...' : 'Enroll Student'}
              </button>
              <Link
                href={`/admin/partners/lms-integrations/${providerId}`}
                className="px-6 py-3 bg-white text-gray-700 font-semibold rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
