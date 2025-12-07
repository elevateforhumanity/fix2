import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import EnrollmentForm from './EnrollmentForm';

export const metadata: Metadata = {
  title: 'Enroll in Course | Elevate For Humanity',
  description: 'Complete your enrollment in this partner course',
};

export default async function PartnerEnrollPage({ params }: { params: { courseId: string } }) {
  const supabase = await createClient();

  // Get current user
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect('/auth/login?redirect=/courses/partners/' + params.courseId + '/enroll');
  }

  // Fetch course details
  const { data: course } = await supabase
    .from('partner_courses')
    .select('*, partner_lms_providers(provider_name, logo_url)')
    .eq('id', params.courseId)
    .single();

  if (!course) {
    redirect('/courses/partners');
  }

  // Check if already enrolled
  const { data: existingEnrollment } = await supabase
    .from('partner_enrollments')
    .select('*')
    .eq('user_id', user.id)
    .eq('partner_course_id', params.courseId)
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
                      <h3 className="font-semibold text-gray-900">{course.course_name}</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {course.partner_lms_providers?.provider_name}
                      </p>
                    </div>
                    
                    {course.duration_hours && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Duration:</span>
                        <span className="font-medium">{course.duration_hours} hours</span>
                      </div>
                    )}
                    
                    {course.price && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Price:</span>
                        <span className="font-medium text-blue-600">${course.price}</span>
                      </div>
                    )}
                    
                    {course.certification_name && (
                      <div className="pt-4 border-t">
                        <p className="text-sm text-gray-600">Certification:</p>
                        <p className="font-medium text-sm">{course.certification_name}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Enrollment Form */}
              <div className="md:col-span-2">
                <EnrollmentForm 
                  courseId={params.courseId}
                  courseName={course.course_name}
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
