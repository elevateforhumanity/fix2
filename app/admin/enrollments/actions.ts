'use server';

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export async function createEnrollment(formData: FormData) {
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

  const student_id = formData.get('student_id') as string;
  const program_id = formData.get('program_id') as string;
  const start_date = formData.get('start_date') as string;
  const expected_completion_date = formData.get('expected_completion_date') as string;
  const funding_source = formData.get('funding_source') as string;
  const funding_amount = formData.get('funding_amount') as string;
  const notes = formData.get('notes') as string;

  // Create enrollment
  const { data: enrollment, error: enrollmentError } = await supabase
    .from('student_enrollments')
    .insert({
      student_id,
      program_id,
      start_date,
      expected_completion_date: expected_completion_date || null,
      status: 'active',
      progress_percentage: 0,
      notes,
    })
    .select()
    .single();

  if (enrollmentError) {
    throw new Error(enrollmentError.message);
  }

  // Create funding record if provided
  if (funding_source && funding_amount) {
    const { error: fundingError } = await supabase
      .from('funding_records')
      .insert({
        enrollment_id: enrollment.id,
        source: funding_source,
        amount: parseFloat(funding_amount),
        status: 'approved',
      });

    if (fundingError) {
      console.error('Failed to create funding record:', fundingError);
    }
  }

  revalidatePath('/admin/enrollments');
  redirect('/admin/enrollments');
}

export async function updateEnrollmentStatus(enrollmentId: string, status: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error('Unauthorized');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();
  
  if (profile?.role !== 'admin' && profile?.role !== 'super_admin') {
    throw new Error('Unauthorized');
  }

  const { error } = await supabase
    .from('student_enrollments')
    .update({
      status,
      updated_at: new Date().toISOString(),
    })
    .eq('id', enrollmentId);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath('/admin/enrollments');
  revalidatePath(`/admin/enrollments/${enrollmentId}`);
}

export async function deleteEnrollment(enrollmentId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error('Unauthorized');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();
  
  if (profile?.role !== 'admin' && profile?.role !== 'super_admin') {
    throw new Error('Unauthorized');
  }

  const { error } = await supabase
    .from('student_enrollments')
    .delete()
    .eq('id', enrollmentId);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath('/admin/enrollments');
}
