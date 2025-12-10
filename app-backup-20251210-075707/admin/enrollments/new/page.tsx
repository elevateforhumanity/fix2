import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { EnrollmentWizard } from '../enrollment-wizard';

export const metadata: Metadata = {
  title: 'Create Enrollment | Admin',
  description: 'Enroll a student in a program',
};

export default async function NewEnrollmentPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    redirect('/login');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();
  
  if (profile?.role !== 'admin' && profile?.role !== 'super_admin') {
    redirect('/unauthorized');
  }

  // Fetch programs for selection
  const { data: programs } = await supabase
    .from('programs')
    .select('id, name, slug, duration_hours')
    .eq('is_active', true)
    .order('name');

  // Fetch students for selection
  const { data: students } = await supabase
    .from('profiles')
    .select('id, full_name, email')
    .eq('role', 'student')
    .order('full_name');

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Create New Enrollment</h1>
          <p className="text-gray-600 mt-1">Enroll a student in a training program</p>
        </div>

        <EnrollmentWizard programs={programs || []} students={students || []} />
      </div>
    </div>
  );
}
