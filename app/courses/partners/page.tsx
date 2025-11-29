import { createServerSupabaseClient } from '@/lib/auth';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import CourseSearch from './CourseSearch';

export const metadata = {
  title: 'Professional Certifications | Elevate for Humanity',
  description: 'Browse 1200+ professional certifications and training courses',
};

export default async function PartnerCoursesPage() {
  const supabase = await createServerSupabaseClient();
  
  // Get all partner courses
  const { data: courses } = await supabase
    .from('partner_courses_catalog')
    .select('*')
    .eq('is_active', true)
    .order('provider_name', { ascending: true });

  // Group by provider
  const coursesByProvider = courses?.reduce((acc: any, course: any) => {
    if (!acc[course.provider_name]) {
      acc[course.provider_name] = [];
    }
    acc[course.provider_name].push(course);
    return acc;
  }, {});

  // Get categories
  const categories = [...new Set(courses?.map(c => c.category))].filter(Boolean);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Professional Certifications
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            1,200+ industry-recognized certifications from leading training providers
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 text-center">
            <div className="text-3xl font-bold text-brandPrimary mb-2">
              {courses?.length || 0}
            </div>
            <div className="text-sm text-gray-600">Courses Available</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 text-center">
            <div className="text-3xl font-bold text-brandPrimary mb-2">
              {Object.keys(coursesByProvider || {}).length}
            </div>
            <div className="text-sm text-gray-600">Training Partners</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 text-center">
            <div className="text-3xl font-bold text-brandPrimary mb-2">
              {categories.length}
            </div>
            <div className="text-sm text-gray-600">Categories</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 text-center">
            <div className="text-3xl font-bold text-brandPrimary mb-2">
              100%
            </div>
            <div className="text-sm text-gray-600">Online</div>
          </div>
        </div>

        {/* Course Search and Filter Component */}
        <CourseSearch courses={courses || []} />

        {/* CTA */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Advance Your Career?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Choose from 1,200+ industry-recognized certifications
          </p>
          <Link
            href="/apply"
            className="inline-block px-8 py-4 bg-white text-brandPrimary font-bold rounded-lg hover:bg-gray-100 transition-colors"
          >
            Get Started Today
          </Link>
        </div>
      </div>
    </div>
  );
}
