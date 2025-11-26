import { redirect } from 'next/navigation';
import { createServerSupabaseClient } from '@/lib/auth';
import Link from 'next/link';

export const metadata = {
  title: 'Milady LMS - Barber Training | Student Portal',
  description: 'Access your Milady Standard Barbering coursework and track apprenticeship hours',
  openGraph: {
    images: ["/images/students-new/student-28.jpg"],
    type: "website",
  }};

export default async function MiladyLMSPage() {
  const supabase = await createServerSupabaseClient();
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session) {
    redirect('/login?redirect=/student/milady-lms');
  }

  // Check if student is enrolled in barber program
  const { data: enrollment } = await supabase
    .from('enrollments')
    .select('*, courses(name, slug)')
    .eq('user_id', session.user.id)
    .or('courses.slug.eq.barber-apprenticeship,courses.slug.eq.barber')
    .single();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Milady Standard Barbering</h1>
              <p className="text-gray-600">Your online barber education platform</p>
            </div>
          </div>
        </div>

        {enrollment ? (
          <>
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="text-sm text-gray-600 mb-1">Apprenticeship Hours</div>
                <div className="text-3xl font-bold text-gray-900">487</div>
                <div className="text-xs text-gray-500 mt-1">of 1,500 required</div>
                <div className="mt-3 bg-gray-200 rounded-full h-2">
                  <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '32%' }} />
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="text-sm text-gray-600 mb-1">Modules Completed</div>
                <div className="text-3xl font-bold text-gray-900">8</div>
                <div className="text-xs text-gray-500 mt-1">of 24 total modules</div>
                <div className="mt-3 bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '33%' }} />
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="text-sm text-gray-600 mb-1">Quiz Average</div>
                <div className="text-3xl font-bold text-gray-900">87%</div>
                <div className="text-xs text-gray-500 mt-1">Passing: 75%</div>
                <div className="mt-3">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    On Track
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="text-sm text-gray-600 mb-1">State Exam Prep</div>
                <div className="text-3xl font-bold text-gray-900">62%</div>
                <div className="text-xs text-gray-500 mt-1">Practice test score</div>
                <div className="mt-3">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    Keep Practicing
                  </span>
                </div>
              </div>
            </div>

            {/* Current Module */}
            <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl p-8 mb-8 text-white">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="text-sm font-medium text-indigo-200 mb-2">CONTINUE LEARNING</div>
                  <h2 className="text-2xl font-bold mb-3">Module 9: Advanced Fading Techniques</h2>
                  <p className="text-indigo-100 mb-6">
                    Master the art of seamless fades, tapers, and blending. Learn clipper-over-comb techniques and how to work with different hair textures.
                  </p>
                  <div className="flex items-center gap-4">
                    <button className="px-6 py-3 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-indigo-50 transition-colors">
                      Continue Module
                    </button>
                    <div className="text-sm text-indigo-200">
                      45 minutes remaining
                    </div>
                  </div>
                </div>
                <div className="ml-6">
                  <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Course Modules */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Course Modules</h3>
              
              <div className="space-y-3">
                {/* Module 1 - Completed */}
                <div className="flex items-center gap-4 p-4 rounded-lg border border-gray-200 bg-green-50">
                  <div className="flex-shrink-0 w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
                    ✓
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">Module 1: Sanitation & Safety</div>
                    <div className="text-sm text-gray-600">Completed • Quiz: 92%</div>
                  </div>
                  <button className="text-sm text-green-600 font-medium hover:text-green-700">
                    Review
                  </button>
                </div>

                {/* Module 2 - Completed */}
                <div className="flex items-center gap-4 p-4 rounded-lg border border-gray-200 bg-green-50">
                  <div className="flex-shrink-0 w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
                    ✓
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">Module 2: Tools & Equipment</div>
                    <div className="text-sm text-gray-600">Completed • Quiz: 88%</div>
                  </div>
                  <button className="text-sm text-green-600 font-medium hover:text-green-700">
                    Review
                  </button>
                </div>

                {/* Module 3-8 - Completed (collapsed) */}
                <div className="flex items-center gap-4 p-4 rounded-lg border border-gray-200 bg-gray-50">
                  <div className="flex-1">
                    <div className="text-sm text-gray-600">Modules 3-8 completed</div>
                  </div>
                  <button className="text-sm text-indigo-600 font-medium hover:text-indigo-700">
                    View All
                  </button>
                </div>

                {/* Module 9 - In Progress */}
                <div className="flex items-center gap-4 p-4 rounded-lg border-2 border-indigo-600 bg-indigo-50">
                  <div className="flex-shrink-0 w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                    9
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">Module 9: Advanced Fading Techniques</div>
                    <div className="text-sm text-gray-600">In Progress • 65% complete</div>
                  </div>
                  <button className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700">
                    Continue
                  </button>
                </div>

                {/* Module 10 - Locked */}
                <div className="flex items-center gap-4 p-4 rounded-lg border border-gray-200 bg-gray-50 opacity-60">
                  <div className="flex-shrink-0 w-10 h-10 bg-gray-400 rounded-full flex items-center justify-center text-white">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">Module 10: Razor Work & Shaving</div>
                    <div className="text-sm text-gray-600">Complete Module 9 to unlock</div>
                  </div>
                </div>

                {/* Remaining modules */}
                <div className="flex items-center gap-4 p-4 rounded-lg border border-gray-200 bg-gray-50 opacity-60">
                  <div className="flex-1">
                    <div className="text-sm text-gray-600">14 more modules to complete</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Apprenticeship Hours Tracker */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Apprenticeship Hours Log</h3>
                <button className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700">
                  Log Hours
                </button>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200">
                  <div>
                    <div className="font-semibold text-gray-900">Week of Nov 18-24, 2024</div>
                    <div className="text-sm text-gray-600">Classic Cuts Barbershop</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-gray-900">32 hours</div>
                    <div className="text-sm text-green-600">Verified ✓</div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200">
                  <div>
                    <div className="font-semibold text-gray-900">Week of Nov 11-17, 2024</div>
                    <div className="text-sm text-gray-600">Classic Cuts Barbershop</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-gray-900">28 hours</div>
                    <div className="text-sm text-green-600">Verified ✓</div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg border border-yellow-300 bg-yellow-50">
                  <div>
                    <div className="font-semibold text-gray-900">Week of Nov 4-10, 2024</div>
                    <div className="text-sm text-gray-600">Classic Cuts Barbershop</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-gray-900">30 hours</div>
                    <div className="text-sm text-yellow-600">Pending Verification</div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <Link href="/student/apprenticeship-hours" className="text-indigo-600 font-medium hover:text-indigo-700">
                  View Full Hours Log →
                </Link>
              </div>
            </div>

            {/* State Exam Prep */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Indiana State Board Exam Prep</h3>
              <p className="text-gray-600 mb-6">
                Practice tests and study materials to help you pass the Indiana barber licensing exam.
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <button className="p-4 border-2 border-gray-200 rounded-lg hover:border-indigo-600 hover:bg-indigo-50 transition-colors text-left">
                  <div className="font-semibold text-gray-900 mb-1">Written Exam Practice</div>
                  <div className="text-sm text-gray-600">100 practice questions</div>
                </button>

                <button className="p-4 border-2 border-gray-200 rounded-lg hover:border-indigo-600 hover:bg-indigo-50 transition-colors text-left">
                  <div className="font-semibold text-gray-900 mb-1">Practical Exam Guide</div>
                  <div className="text-sm text-gray-600">Video demonstrations</div>
                </button>

                <button className="p-4 border-2 border-gray-200 rounded-lg hover:border-indigo-600 hover:bg-indigo-50 transition-colors text-left">
                  <div className="font-semibold text-gray-900 mb-1">Study Flashcards</div>
                  <div className="text-sm text-gray-600">500+ terms and concepts</div>
                </button>

                <button className="p-4 border-2 border-gray-200 rounded-lg hover:border-indigo-600 hover:bg-indigo-50 transition-colors text-left">
                  <div className="font-semibold text-gray-900 mb-1">Exam Registration Help</div>
                  <div className="text-sm text-gray-600">Step-by-step guide</div>
                </button>
              </div>
            </div>
          </>
        ) : (
          /* Not Enrolled Message */
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-8 text-center">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Milady LMS Access Required
            </h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              You need to be enrolled in the Barber Apprenticeship Program to access Milady Standard Barbering coursework.
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                href="/programs/barber-apprenticeship"
                className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700"
              >
                Learn About Barber Program
              </Link>
              <Link
                href="/apply?program=barber-apprenticeship"
                className="px-6 py-3 bg-white text-indigo-600 font-semibold rounded-lg border-2 border-indigo-600 hover:bg-indigo-50"
              >
                Apply Now
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
