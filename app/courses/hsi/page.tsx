import { createServerSupabaseClient } from '@/lib/auth';
import Link from 'next/link';

export const metadata = {
  title: 'CPR & First Aid Certifications | HSI',
  description: 'Get certified in CPR, AED, and First Aid with remote skills verification',
};

export default async function HSICoursesPage() {
  const supabase = await createServerSupabaseClient();
  
  const { data: courses } = await supabase
    .from('hsi_course_products')
    .select('*')
    .eq('is_active', true)
    .order('price', { ascending: true });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-2 bg-red-100 text-red-800 rounded-full text-sm font-semibold mb-4">
            Health & Safety Institute (HSI)
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            CPR & First Aid Certifications
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get certified from home with Remote Skills Verification. 
            Nationally recognized, 2-year certifications.
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 text-center">
            <div className="text-4xl mb-3">🏠</div>
            <div className="font-semibold text-gray-900 mb-2">100% Remote</div>
            <div className="text-sm text-gray-600">Complete from home</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 text-center">
            <div className="text-4xl mb-3">📦</div>
            <div className="font-semibold text-gray-900 mb-2">Supplies Shipped</div>
            <div className="text-sm text-gray-600">All materials included</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 text-center">
            <div className="text-4xl mb-3">🎓</div>
            <div className="font-semibold text-gray-900 mb-2">2-Year Cert</div>
            <div className="text-sm text-gray-600">Nationally recognized</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 text-center">
            <div className="text-4xl mb-3">⏰</div>
            <div className="font-semibold text-gray-900 mb-2">Flexible</div>
            <div className="text-sm text-gray-600">Schedule your session</div>
          </div>
        </div>

        {/* Courses */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {courses?.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-2xl shadow-lg border-2 border-gray-200 overflow-hidden hover:border-brandPrimary transition-all"
            >
              {course.course_type === 'first_aid_cpr_all_ages' && (
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white text-center py-2 font-semibold">
                  ⭐ MOST POPULAR
                </div>
              )}
              
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {course.course_name}
                </h3>
                <p className="text-gray-600 mb-6">
                  {course.description}
                </p>

                <div className="mb-6">
                  <div className="text-4xl font-bold text-brandPrimary mb-2">
                    ${course.price}
                  </div>
                  <div className="text-sm text-gray-500">
                    One-time payment, 2-year certification
                  </div>
                </div>

                <div className="space-y-3 mb-8">
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-gray-700">Online training videos</span>
                  </div>
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-gray-700">Remote skills verification</span>
                  </div>
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-gray-700">Training supplies shipped to you</span>
                  </div>
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-gray-700">Digital certification card</span>
                  </div>
                </div>

                <Link
                  href={`/courses/hsi/${course.course_type}/enroll`}
                  className="block w-full py-4 bg-brandPrimary text-white text-center font-semibold rounded-lg hover:bg-brandPrimaryDark transition-colors"
                >
                  Enroll Now
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* How It Works */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            How Remote Skills Verification Works
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-brandPrimary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Enroll & Pay</h3>
              <p className="text-sm text-gray-600">
                Complete secure payment and receive confirmation
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-brandPrimary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Get Email</h3>
              <p className="text-sm text-gray-600">
                Receive training email from info@hsi.com with all steps
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-brandPrimary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Complete Training</h3>
              <p className="text-sm text-gray-600">
                Watch videos, schedule skills session, receive supplies
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-brandPrimary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                4
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Get Certified</h3>
              <p className="text-sm text-gray-600">
                Receive your 2-year certification card
              </p>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-gray-100 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4 max-w-3xl mx-auto">
            <details className="bg-white rounded-lg p-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Is this certification nationally recognized?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                Yes! HSI certifications are nationally recognized and accepted by employers, schools, and healthcare facilities across the United States.
              </p>
            </details>
            <details className="bg-white rounded-lg p-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                How long does the certification last?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                Your certification is valid for 2 years from the date of completion. You'll need to recertify before it expires.
              </p>
            </details>
            <details className="bg-white rounded-lg p-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                What's included in the price?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                Everything! Online training, remote skills verification, all training supplies shipped to you, and your digital certification card. No hidden fees.
              </p>
            </details>
            <details className="bg-white rounded-lg p-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                How long does it take to complete?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                Most students complete the online portion in 2-4 hours. The skills verification session takes about 30-60 minutes. You have 60 days from enrollment to complete everything.
              </p>
            </details>
          </div>
        </div>
      </div>
    </div>
  );
}
