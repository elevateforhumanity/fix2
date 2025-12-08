import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { redirect, notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  alternates: {
    canonical: "https://www.elevateforhumanity.org/lms/course/[courseId]"
  },
  title: '[courseId] | Elevate For Humanity',
  description: 'Explore [courseId] and discover opportunities for career growth and development at Elevate For Humanity.'
};

type Props = {
  params: Promise<{ courseId: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { courseId } = await params;
  
  
  const { data: course } = await supabase
    .from('courses')
    .select('title, description')
    .eq('slug', courseId)
    .single();

  return {
    title: course ? `${course.title} | Elevate For Humanity` : 'Course | Elevate For Humanity',
    description: course?.description || 'Discover more about this course inside the Elevate For Humanity workforce ecosystem.'
  };
}

export default async function Page({ params }: Props) {
  const { courseId } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  // Fetch course data
  const { data: course, error } = await supabase
    .from('courses')
    .select('*')
    .eq('slug', courseId)
    .single();

  if (error || !course) {
    notFound();
  }

  // Check if user is enrolled
  const { data: enrollment } = await supabase
    .from('enrollments')
    .select('*')
    .eq('user_id', user.id)
    .eq('course_id', course.id)
    .single();

  return (
    <div className="min-h-screen bg-white">
      
      {/* Stats Section */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6">
                <p className="text-4xl font-bold text-blue-600 mb-2">{activeCourses || 0}</p>
                <p className="text-gray-600">Active Courses</p>
              </div>
              <div className="text-center p-6">
                <p className="text-4xl font-bold text-green-600 mb-2">{completedCourses || 0}</p>
                <p className="text-gray-600">Completed</p>
              </div>
              <div className="text-center p-6">
                <p className="text-4xl font-bold text-purple-600 mb-2">{recentProgress?.length || 0}</p>
                <p className="text-gray-600">Recent Activity</p>
              </div>
            </div>
          </div>
        </div>
      </section>

<section className="relative h-[350px] sm:h-[400px] md:h-[450px] w-full overflow-hidden">
        {course.thumbnail_url && (
          <Image
            src={course.thumbnail_url}
            alt={course.title}
            fill
            className="object-cover brightness-90"
            priority
            sizes="100vw"
          
          quality={100}
        /
          quality={100}
        >
        )}
        
        
        <div className="relative z-10 container mx-auto px-4 sm:px-6 h-full flex items-center">
          <div className="max-w-4xl w-full">
            <div className="flex flex-wrap items-center gap-2 mb-3 sm:mb-4">
              {course.category && (
                <span className="px-2 sm:px-3 py-1 bg-blue-500 text-white text-xs sm:text-sm rounded-full">
                  {course.category}
                </span>
              )}
              {course.level && (
                <span className="px-2 sm:px-3 py-1 bg-orange-500 text-white text-xs sm:text-sm rounded-full">
                  {course.level}
                </span>
              )}
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-white leading-tight">{course.title}</h1>
            <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 text-blue-100">{course.description}</p>
            {course.duration && (
              <p className="text-white mb-4 sm:mb-6 text-sm sm:text-base">
                <span className="font-semibold">Duration:</span> {course.duration}
              </p>
            )}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              {enrollment ? (
                <Link 
                  href={`/lms/course/${courseId}/learn`} 
                  className="bg-green-600 text-white px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-green-700 text-base sm:text-lg text-center min-h-[48px] flex items-center justify-center"
                >
                  Continue Learning
                </Link>
              ) : (
                <Link 
                  href={`/lms/enroll?course=${courseId}`} 
                  className="bg-orange-500 text-white px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 text-base sm:text-lg text-center min-h-[48px] flex items-center justify-center"
                >
                  Enroll Now
                </Link>
              )}
              <Link 
                href="/lms/courses" 
                className="bg-white text-blue-600 px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 text-base sm:text-lg text-center min-h-[48px] flex items-center justify-center"
              >
                Browse Courses
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Course Details - Mobile Optimized */}
      <section className="py-8 sm:py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12">
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Learn Anywhere</h3>
                <p className="text-gray-600">Access course content on any device, anytime</p>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Track Progress</h3>
                <p className="text-gray-600">Monitor your learning journey and achievements</p>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Get Certified</h3>
                <p className="text-gray-600">Earn industry-standard-recognized certifications</p>
              </div>
            </div>

            {enrollment && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
                <h3 className="text-xl font-semibold mb-4">Your Progress</h3>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="w-full bg-gray-200 rounded-full h-4">
                      <div 
                        className="bg-blue-600 h-4 rounded-full transition-all" 
                        style={{ width: `${enrollment.progress_percentage || 0}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-lg font-semibold">{enrollment.progress_percentage || 0}%</span>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Status: <span className="font-semibold capitalize">{enrollment.status}</span>
                </p>
              </div>
            )}

            <div className="bg-gray-50 rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-4">About This Course</h2>
              <p className="text-gray-700 leading-relaxed mb-6">{course.description}</p>
              
              {course.learning_objectives && course.learning_objectives.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-3">What You'll Learn</h3>
                  <ul className="space-y-2">
                    {course.learning_objectives.map((objective: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <svg className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{objective}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-700 to-purple-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl mb-8 text-blue-100">
              Take the first step toward a better career today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/apply"
                className="bg-white text-blue-700 px-8 py-4 rounded-lg font-bold hover:bg-blue-50 text-lg"
              >
                Apply Now
              </Link>
              <Link
                href="/programs"
                className="bg-blue-800 text-white px-8 py-4 rounded-lg font-bold hover:bg-blue-900 border-2 border-white text-lg"
              >
                View Programs
              </Link>
            </div>
          </div>
        </div>
      </section>

  </div>
  );
}