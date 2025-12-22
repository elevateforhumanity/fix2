import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle2, Circle, Clock, ExternalLink, Download } from 'lucide-react';

export const metadata = {
  title: 'My Progress | Student Portal',
};

export default async function StudentProgressPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login?next=/student/progress');
  }

  const { data: enrollments } = await supabase
    .from('enrollments')
    .select(`
      id,
      status,
      created_at,
      completed_at,
      program:programs(id, name, description),
      steps:enrollment_steps(
        id,
        sequence_order,
        status,
        started_at,
        completed_at,
        provider:partner_lms_providers(
          id,
          provider_name,
          logo_url,
          website_url
        )
      )
    `)
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            My Training Progress
          </h1>
          <p className="text-gray-600">
            Track your progress through each training partner
          </p>
        </div>

        {!enrollments || enrollments.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <Circle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              No Active Enrollments
            </h2>
            <p className="text-gray-600 mb-6">
              You haven't been enrolled in any programs yet.
            </p>
            <Link
              href="/programs"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Browse Programs
            </Link>
          </div>
        ) : (
          <div>Progress dashboard content here</div>
        )}
      </div>
    </main>
  );
}
