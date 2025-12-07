import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import InternalEnrollmentForm from './InternalEnrollmentForm';

export const metadata: Metadata = {
  alternates: {
    canonical: "https://www.elevateforhumanity.org/courses/[courseId]/enroll",
  },
  title: 'Enroll in Course | Elevate For Humanity',
  description: 'Complete your enrollment in this course',
};

export default async function InternalEnrollPage({ params }: { params: { courseId: string } }) {
  const supabase = await createClient();

  // Get current user
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect('/auth/login?redirect=/courses/' + params.courseId + '/enroll');
  }

  // Fetch course details
  const { data: course } = await supabase
    .from('courses')
    .select('*')
    .eq('id', params.courseId)
    .eq('is_published', true)
    .single();

  if (!course) {
    redirect('/courses/catalog');
  }

  // Check if already enrolled
  const { data: existingEnrollment } = await supabase
    .from('enrollments')
    .select('*')
    .eq('user_id', user.id)
    .eq('course_id', params.courseId)
    .single();

  if (existingEnrollment) {
    redirect('/student/courses');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-blue-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Enroll in Course</h1>
            <p className="text-xl text-blue-100">
              Complete your enrollment to start learning
            </p>
          </div>
        </div>
      </section>

      {/* Enrollment Form */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Course Summary */}
              <div className="md:col-span-1">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-4">
                  <h2 className="text-xl font-bold mb-4">Course Summary</h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-gray-900">{course.title}</h3>
                      {course.subtitle && (
                        <p className="text-sm text-gray-600 mt-1">{course.subtitle}</p>
                      )}
                    </div>
                    
                    {course.duration && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Duration:</span>
                        <span className="font-medium">{course.duration}</span>
                      </div>
                    )}
                    
                    {course.level && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Level:</span>
                        <span className="font-medium capitalize">{course.level}</span>
                      </div>
                    )}
                    
                    {course.category && (
                      <div className="pt-4 border-t">
                        <p className="text-sm text-gray-600">Category:</p>
                        <p className="font-medium text-sm">{course.category}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Enrollment Form */}
              <div className="md:col-span-2">
                <InternalEnrollmentForm 
                  courseId={params.courseId}
                  courseName={course.title}
                  userId={user.id}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
