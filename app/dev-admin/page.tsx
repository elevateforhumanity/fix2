import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'Dev Admin - No Login Required',
  description: 'Development admin panel for quick access',
};

export default async function DevAdmin() {
  const supabase = await createClient();
  
  // Fetch all courses without auth check
  const { data: allCourses, error: coursesError } = await supabase
    .from('courses')
    .select('*')
    .order('created_at', { ascending: false });
  
  // Fetch barber courses specifically
  const { data: barberCourses } = await supabase
    .from('courses')
    .select('*')
    .or('title.ilike.%barber%,description.ilike.%barber%,slug.ilike.%barber%');
  
  // Get course count
  const { count: totalCourses } = await supabase
    .from('courses')
    .select('*', { count: 'exact', head: true });
  
  // Get enrollment count
  const { count: totalEnrollments } = await supabase
    .from('enrollments')
    .select('*', { count: 'exact', head: true });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-lg border-b-4 border-blue-600">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">
                🔧 Dev Admin Panel
              </h1>
              <p className="text-gray-600 mt-2">
                No login required - Development access only
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-blue-600">{totalCourses || 0}</div>
              <div className="text-sm text-gray-600">Total Courses</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-600">
            <div className="text-3xl font-bold text-blue-600">{totalCourses || 0}</div>
            <div className="text-gray-600 mt-1">Total Courses</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-600">
            <div className="text-3xl font-bold text-green-600">{barberCourses?.length || 0}</div>
            <div className="text-gray-600 mt-1">Barber Courses</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-600">
            <div className="text-3xl font-bold text-purple-600">{totalEnrollments || 0}</div>
            <div className="text-gray-600 mt-1">Total Enrollments</div>
          </div>
        </div>

        {/* Barber Courses Section */}
        {barberCourses && barberCourses.length > 0 && (
          <div className="mb-12">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-xl shadow-lg p-6 mb-6">
              <h2 className="text-3xl font-bold text-white mb-2">
                🪒 Barber Courses Found!
              </h2>
              <p className="text-orange-100">
                {barberCourses.length} barber course(s) in database
              </p>
            </div>

            <div className="grid gap-6">
              {barberCourses.map((course: Record<string, any>) => (
                <div key={course.id} className="bg-white rounded-xl shadow-lg overflow-hidden border-2 border-orange-500">
                  <div className="bg-gradient-to-r from-orange-500 to-red-500 px-6 py-4">
                    <h3 className="text-2xl font-bold text-white">{course.title}</h3>
                    <p className="text-orange-100 text-sm mt-1">ID: {course.id}</p>
                  </div>
                  
                  <div className="p-6">
                    <div className="mb-4">
                      <p className="text-gray-700">{course.description}</p>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4 mb-6 text-sm">
                      <div>
                        <span className="font-semibold text-gray-700">Slug:</span>
                        <span className="ml-2 text-gray-600">{course.slug || 'N/A'}</span>
                      </div>
                      <div>
                        <span className="font-semibold text-gray-700">Status:</span>
                        <span className="ml-2 text-gray-600">{course.status || 'N/A'}</span>
                      </div>
                      <div>
                        <span className="font-semibold text-gray-700">Duration:</span>
                        <span className="ml-2 text-gray-600">{course.duration || 'N/A'}</span>
                      </div>
                      <div>
                        <span className="font-semibold text-gray-700">Level:</span>
                        <span className="ml-2 text-gray-600">{course.level || 'N/A'}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-3">
                      <Link 
                        href={`/lms/courses/${course.id}`}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                      >
                        📚 View in LMS
                      </Link>
                      <Link 
                        href={`/admin/courses/${course.id}`}
                        className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                      >
                        ✏️ Edit (requires login)
                      </Link>
                      <Link 
                        href={`/admin/course-builder?id=${course.id}`}
                        className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                      >
                        🔨 Course Builder
                      </Link>
                      <a 
                        href={`https://supabase.com/dashboard/project/_/editor/courses?filter=id%3Deq%3D${course.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                      >
                        🗄️ Edit in Supabase
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* All Courses Section */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            📚 All Courses ({allCourses?.length || 0})
          </h2>

          {coursesError && (
            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6 mb-6">
              <p className="text-red-800 font-semibold">Error loading courses:</p>
              <p className="text-red-600 text-sm mt-2">{coursesError.message}</p>
            </div>
          )}

          {allCourses && allCourses.length === 0 && (
            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-8 text-center">
              <p className="text-yellow-800 text-lg font-semibold mb-2">
                No courses found in database
              </p>
              <p className="text-yellow-700">
                Check your Supabase connection or create courses in the admin panel.
              </p>
            </div>
          )}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allCourses?.map((course: Record<string, any>) => (
              <div key={course.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3">
                  <h3 className="text-lg font-bold text-white truncate">{course.title}</h3>
                </div>
                
                <div className="p-4">
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {course.description || 'No description'}
                  </p>
                  
                  <div className="text-xs text-gray-500 mb-4">
                    <div>ID: {course.id}</div>
                    {course.slug && <div>Slug: {course.slug}</div>}
                  </div>
                  
                  <div className="flex gap-2">
                    <Link 
                      href={`/lms/courses/${course.id}`}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-sm font-semibold text-center transition-colors"
                    >
                      View
                    </Link>
                    <Link 
                      href={`/admin/courses/${course.id}`}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded text-sm font-semibold text-center transition-colors"
                    >
                      Edit
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">🔗 Quick Links</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href="/admin" className="bg-blue-100 hover:bg-blue-200 p-4 rounded-lg text-center transition-colors">
              <div className="font-semibold text-blue-900">Admin Dashboard</div>
              <div className="text-sm text-blue-700">(requires login)</div>
            </Link>
            <Link href="/lms" className="bg-green-100 hover:bg-green-200 p-4 rounded-lg text-center transition-colors">
              <div className="font-semibold text-green-900">LMS Dashboard</div>
              <div className="text-sm text-green-700">(requires login)</div>
            </Link>
            <Link href="/admin/courses/create" className="bg-purple-100 hover:bg-purple-200 p-4 rounded-lg text-center transition-colors">
              <div className="font-semibold text-purple-900">Create Course</div>
              <div className="text-sm text-purple-700">(requires login)</div>
            </Link>
            <a href="https://supabase.com/dashboard" target="_blank" rel="noopener noreferrer" className="bg-gray-100 hover:bg-gray-200 p-4 rounded-lg text-center transition-colors">
              <div className="font-semibold text-gray-900">Supabase Dashboard</div>
              <div className="text-sm text-gray-700">(direct database access)</div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
