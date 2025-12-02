import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Course Catalog | Elevate For Humanity',
  description: 'Browse our complete catalog of workforce development courses. 100% free training programs funded by WIOA.',
};

export default async function CoursesPage() {
  const supabase = await createClient();
  
  // Fetch published courses
  const { data: courses } = await supabase
    .from('courses')
    .select('*')
    .eq('status', 'published')
    .order('title');

  // Get course categories
  const categories = courses ? [...new Set(courses.map(c => c.category).filter(Boolean))] : [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">Course Catalog</h1>
            <p className="text-xl text-blue-100 mb-8">
              Explore our complete catalog of workforce development courses. All programs are 100% free through WIOA funding.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link 
                href="/apply" 
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                Apply Now
              </Link>
              <Link 
                href="/programs" 
                className="bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 border-2 border-white transition-colors"
              >
                View Programs
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">{courses?.length || 0}</div>
              <div className="text-gray-600">Courses Available</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">100%</div>
              <div className="text-gray-600">Free Training</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">{categories.length}</div>
              <div className="text-gray-600">Categories</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">24/7</div>
              <div className="text-gray-600">Access</div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {courses && courses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {courses.map((course) => (
                  <Link 
                    key={course.id} 
                    href={`/courses/${course.id}/enroll`}
                    className="bg-white rounded-lg shadow-sm border hover:shadow-lg transition-shadow overflow-hidden group"
                  >
                    {course.thumbnail_url ? (
                      <div className="relative h-48 bg-gradient-to-br from-blue-500 to-blue-700">
                        <Image
                          src={course.thumbnail_url}
                          alt={course.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300" quality={85} sizes="100vw"
                        />
                      </div>
                    ) : (
                      <div className="h-48 bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
                        <svg className="w-16 h-16 text-white opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      </div>
                    )}
                    
                    <div className="p-6">
                      {course.category && (
                        <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 text-xs font-semibold rounded-full mb-3">
                          {course.category}
                        </span>
                      )}
                      
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {course.title}
                      </h3>
                      
                      {course.description && (
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                          {course.description}
                        </p>
                      )}
                      
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        {course.duration_hours && (
                          <span className="flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {course.duration_hours}h
                          </span>
                        )}
                        {course.level && (
                          <span className="capitalize">{course.level}</span>
                        )}
                      </div>
                      
                      <div className="mt-4 pt-4 border-t">
                        <span className="text-green-600 font-semibold">100% Free</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Courses Available Yet</h3>
                <p className="text-gray-600 mb-6">Check back soon for new courses, or browse our programs.</p>
                <Link 
                  href="/programs" 
                  className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  View Programs
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Learning?</h2>
            <p className="text-xl text-blue-100 mb-8">
              All courses are 100% free through WIOA funding. No cost to you.
            </p>
            <Link 
              href="/apply" 
              className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-50 transition-colors"
            >
              Apply for Free Training
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
