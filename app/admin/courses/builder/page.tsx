import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export const metadata: Metadata = {
  alternates: {
    canonical: "https://www.elevateforhumanity.org/admin/courses/builder",
  },
  title: 'Course Builder | Admin',
  description: 'Build and edit courses with visual editor',
};

export default async function CourseBuilderPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (profile?.role !== 'admin' && profile?.role !== 'super_admin') {
    redirect('/unauthorized');
  }

  // Fetch all courses
  const { data: courses } = await supabase
    .from('courses')
    .select('*')
    .order('title');

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-blue-700 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold mb-4">Course Builder</h1>
            <p className="text-xl text-blue-100">Build and edit courses with visual editor</p>
          </div>
        </div>
      </section>

      <div className="container mx-auto py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-2xl font-bold">Your Courses</h2>
            <Link
              href="/admin/courses/create"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
            >
              Create New Course
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses?.map((course) => (
              <div key={course.id} className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{course.description}</p>
                <div className="flex gap-2">
                  <Link
                    href={`/admin/courses/${course.id}/content`}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-center text-sm"
                  >
                    Edit Content
                  </Link>
                  <Link
                    href={`/lms/courses/${course.id}`}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded text-center text-sm"
                  >
                    Preview
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {(!courses || courses.length === 0) && (
            <div className="bg-white rounded-lg shadow-sm border p-12 text-center">
              <p className="text-gray-500 mb-4">No courses yet</p>
              <Link
                href="/admin/courses/create"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
              >
                Create Your First Course
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}