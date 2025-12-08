import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export const metadata: Metadata = {
  alternates: {
    canonical: "https://www.elevateforhumanity.org/admin/courses",
  },
  title: 'Course Management | Admin',
  description: 'Manage all courses and curriculum',
};

export default async function AdminCoursesPage() {
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
  const { data: courses, count } = await supabase
    .from('courses')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false });

  // Calculate stats
  const publishedCount = courses?.filter(c => c.is_published).length || 0;
  const draftCount = courses?.filter(c => !c.is_published).length || 0;

  // Get enrollment counts
  const { data: enrollmentCounts } = await supabase
    .from('enrollments')
    .select('course_id');

  const enrollmentMap = enrollmentCounts?.reduce((acc: any, e) => {
    acc[e.course_id] = (acc[e.course_id] || 0) + 1;
    return acc;
  }, {}) || {};

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-blue-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold mb-4">Course Management</h1>
            <p className="text-xl text-blue-100">Manage all courses and curriculum</p>
          </div>
        </div>
      </section>

      <div className="container mx-auto py-8 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-600">Total Courses</h3>
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <p className="text-3xl font-bold text-gray-900">{count || 0}</p>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-sm font-medium text-gray-600 mb-2">Published</h3>
              <p className="text-3xl font-bold text-green-600">{publishedCount}</p>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-sm font-medium text-gray-600 mb-2">Drafts</h3>
              <p className="text-3xl font-bold text-orange-600">{draftCount}</p>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-sm font-medium text-gray-600 mb-2">Total Enrollments</h3>
              <p className="text-3xl font-bold text-purple-600">{enrollmentCounts?.length || 0}</p>
            </div>
          </div>

          {/* Course Table */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6 border-b flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold">All Courses</h2>
                <p className="text-sm text-gray-600 mt-1">Manage course content and settings</p>
              </div>
              <div className="flex gap-3">
                <input 
                  type="search" 
                  placeholder="Search courses..." 
                  className="px-4 py-2 border rounded-lg text-sm"
                />
                <Link 
                  href="/admin/course-builder"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
                >
                  Create Course
                </Link>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Course</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Enrollments</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Duration</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Level</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {courses && courses.length > 0 ? courses.map((course: any) => (
                    <tr key={course.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          {course.thumbnail_url ? (
                            <img 
                              src={course.thumbnail_url} 
                              alt={course.title}
                              className="w-12 h-12 rounded object-cover"
                            />
                          ) : (
                            <div className="w-12 h-12 rounded bg-blue-100 flex items-center justify-center">
                              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                              </svg>
                            </div>
                          )}
                          <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900">{course.title}</p>
                            <p className="text-xs text-gray-500">{course.id.slice(0, 8)}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          course.is_published 
                            ? 'bg-blue-100 text-green-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}>
                          {course.is_published ? 'Published' : 'Draft'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {enrollmentMap[course.id] || 0} students
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {course.duration_weeks ? `${course.duration_weeks} weeks` : '—'}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        {course.difficulty_level && (
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            course.difficulty_level === 'beginner' ? 'bg-blue-100 text-green-700' :
                            course.difficulty_level === 'intermediate' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {course.difficulty_level}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-right">
                        <Link 
                          href={`/admin/courses/${course.id}`}
                          className="text-blue-600 hover:text-blue-700 mr-3"
                        >
                          View
                        </Link>
                        <Link 
                          href={`/admin/courses/${course.id}/edit`}
                          className="text-gray-600 hover:text-gray-700 mr-3"
                        >
                          Edit
                        </Link>
                        <button className="text-red-600 hover:text-red-700">Delete</button>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                        <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        <p className="mb-4">No courses found</p>
                        <Link 
                          href="/admin/course-builder"
                          className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                          Create Your First Course
                        </Link>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            {courses && courses.length > 0 && (
              <div className="px-6 py-4 border-t bg-gray-50 flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  Showing {courses.length} of {count || 0} courses
                </p>
                <div className="flex gap-2">
                  <button className="px-3 py-1 border rounded text-sm hover:bg-white" disabled>
                    Previous
                  </button>
                  <button className="px-3 py-1 border rounded text-sm hover:bg-white">
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
