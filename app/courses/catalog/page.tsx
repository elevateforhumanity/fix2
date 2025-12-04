import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Complete Course Catalog | Elevate For Humanity',
  description: 'Browse all internal and partner courses',
};

export default async function CompleteCatalogPage() {
  const supabase = await createClient();

  // Fetch internal courses
  const { data: internalCourses } = await supabase
    .from('courses')
    .select('*')
    .eq('is_published', true)
    .order('title');

  // Fetch partner courses
  const { data: partnerCourses } = await supabase
    .from('partner_courses')
    .select('*, partner_lms_providers(provider_name)')
    .eq('is_active', true)
    .order('course_name')
    .limit(12);

  const totalInternal = internalCourses?.length || 0;
  const { count: totalPartner } = await supabase
    .from('partner_courses')
    .select('*', { count: 'exact', head: true })
    .eq('is_active', true);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">Complete Course Catalog</h1>
            <p className="text-xl mb-8 text-blue-100">
              Explore our full range of training programs and certifications
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <div className="bg-blue-700 px-6 py-3 rounded-lg">
                <span className="text-3xl font-bold">{totalInternal + (totalPartner || 0)}</span>
                <span className="text-sm ml-2">Total Courses</span>
              </div>
              <div className="bg-blue-700 px-6 py-3 rounded-lg">
                <span className="text-3xl font-bold">{totalInternal}</span>
                <span className="text-sm ml-2">Internal Courses</span>
              </div>
              <div className="bg-blue-700 px-6 py-3 rounded-lg">
                <span className="text-3xl font-bold">{totalPartner || 0}</span>
                <span className="text-sm ml-2">Partner Courses</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Internal Courses */}
          {internalCourses && internalCourses.length > 0 && (
            <div className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold">Our Training Programs</h2>
                <Link href="/student/courses" className="text-blue-600 hover:text-blue-700">
                  View All →
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {internalCourses.map((course: any) => (
                  <div key={course.id} className="bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow">
                    {course.thumbnail_url ? (
                      <img src={course.thumbnail_url} alt={course.title} className="w-full h-48 object-cover" />
                    ) : (
                      <div className="w-full h-48 bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
                        <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">{course.description}</p>
                      <div className="flex items-center justify-between text-sm mb-4">
                        {course.duration_weeks && (
                          <span className="text-gray-600">{course.duration_weeks} weeks</span>
                        )}
                        {course.difficulty_level && (
                          <span className={`px-2 py-1 rounded text-xs ${
                            course.difficulty_level === 'beginner' ? 'bg-blue-100 text-green-700' :
                            course.difficulty_level === 'intermediate' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {course.difficulty_level}
                          </span>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Link 
                          href={`/courses/${course.id}`}
                          className="flex-1 text-center px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50"
                        >
                          View
                        </Link>
                        <Link 
                          href={`/courses/${course.id}/enroll`}
                          className="flex-1 text-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                          Enroll
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Partner Courses Preview */}
          {partnerCourses && partnerCourses.length > 0 && (
            <div className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold">Partner Certifications</h2>
                <Link href="/courses/partners" className="text-purple-600 hover:text-purple-700">
                  View All {totalPartner}+ Courses →
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {partnerCourses.slice(0, 8).map((course: any) => (
                  <div key={course.id} className="bg-white rounded-lg shadow-sm border p-4 hover:shadow-md transition-shadow">
                    <div className="text-xs text-purple-600 font-semibold mb-2">
                      {course.partner_lms_providers?.provider_name}
                    </div>
                    <h3 className="font-semibold mb-2 line-clamp-2 text-sm">{course.course_name}</h3>
                    <div className="flex items-center justify-between text-xs mb-3">
                      {course.duration_hours && (
                        <span className="text-gray-600">{course.duration_hours}h</span>
                      )}
                      {course.retail_price && (
                        <span className="font-semibold text-green-600">${course.retail_price}</span>
                      )}
                    </div>
                    <Link 
                      href={`/courses/partners/${course.id}/enroll`}
                      className="block w-full text-center px-3 py-2 bg-blue-600 text-white rounded text-xs hover:bg-blue-700"
                    >
                      Enroll
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Browse by Category */}
          <div className="bg-white rounded-lg shadow-sm border p-8">
            <h2 className="text-2xl font-bold mb-6">Browse by Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link href="/courses?category=healthcare" className="p-4 border rounded-lg hover:bg-gray-50 text-center">
                <div className="text-2xl mb-2">🏥</div>
                <div className="font-semibold">Healthcare</div>
              </Link>
              <Link href="/courses?category=technology" className="p-4 border rounded-lg hover:bg-gray-50 text-center">
                <div className="text-2xl mb-2">💻</div>
                <div className="font-semibold">Technology</div>
              </Link>
              <Link href="/courses?category=trades" className="p-4 border rounded-lg hover:bg-gray-50 text-center">
                <div className="text-2xl mb-2">🔧</div>
                <div className="font-semibold">Skilled Trades</div>
              </Link>
              <Link href="/courses?category=business" className="p-4 border rounded-lg hover:bg-gray-50 text-center">
                <div className="text-2xl mb-2">💼</div>
                <div className="font-semibold">Business</div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
