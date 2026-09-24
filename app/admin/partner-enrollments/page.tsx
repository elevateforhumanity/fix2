import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: 'Partner Enrollments | Admin',
};

export default async function PartnerEnrollmentsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();
  if (profile?.role !== 'admin' && profile?.role !== 'super_admin')
    redirect('/unauthorized');

  const { data: enrollmentRows, count, error: enrollmentError } = await supabase
    .from('partner_course_enrollments')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false });

  if (enrollmentError) throw enrollmentError;

  const userIds = [...new Set((enrollmentRows ?? []).map((row: any) => row.user_id).filter(Boolean))];
  const courseIds = [...new Set((enrollmentRows ?? []).map((row: any) => row.partner_course_id).filter(Boolean))];

  const [{ data: students, error: studentsError }, { data: courses, error: coursesError }] = await Promise.all([
    userIds.length ? supabase.from('profiles').select('id, full_name, email').in('id', userIds) : Promise.resolve({ data: [], error: null }),
    courseIds.length ? supabase.from('partner_lms_courses').select('id, course_name').in('id', courseIds) : Promise.resolve({ data: [], error: null }),
  ]);

  if (studentsError) throw studentsError;
  if (coursesError) throw coursesError;

  const studentsById = new Map((students ?? []).map((row: any) => [row.id, row]));
  const coursesById = new Map((courses ?? []).map((row: any) => [row.id, row]));
  const enrollments = (enrollmentRows ?? []).map((row: any) => ({
    ...row,
    student: studentsById.get(row.user_id),
    course: coursesById.get(row.partner_course_id),
  }));

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Partner Course Enrollments</h1>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 mb-4">Total: {count || 0}</p>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Student
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Course
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Progress
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {enrollments?.map((e: any) => (
                  <tr key={e.id}>
                    <td className="px-6 py-4">{e.student?.full_name}</td>
                    <td className="px-6 py-4">{e.course?.course_name}</td>
                    <td className="px-6 py-4">{e.status}</td>
                    <td className="px-6 py-4">{e.progress_percent || 0}%</td>
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
