'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function HSIEnrollPage() {
  const params = useParams();
  const router = useRouter();
  const supabase = createClient();
  const courseType = params.courseType as string;

  const [course, setCourse] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    loadData();
  }, [courseType]);

  async function loadData() {
    // Get current user
    const { data: { user: currentUser } } = await supabase.auth.getUser();
    
    if (!currentUser) {
      router.push('/login?redirect=' + window.location.pathname);
      return;
    }

    setUser(currentUser);

    // Get user profile
    const { data: userProfile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', currentUser.id)
      .single();

    setProfile(userProfile);

    // Get course
    const { data: courseData } = await supabase
      .from('hsi_course_products')
      .select('*')
      .eq('course_type', courseType)
      .eq('is_active', true)
      .single();

    setCourse(courseData);
    setLoading(false);
  }

  async function handleEnroll() {
    if (!user || !profile || !course) return;

    setProcessing(true);

    try {
      // Create Stripe checkout session
      const response = await fetch('/api/hsi/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          courseType: courseType,
          studentId: user.id,
          studentEmail: profile.email,
          studentName: profile.full_name || profile.email,
          studentPhone: profile.phone || '',
          studentAddress: profile.address || '',
        }),
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      // Redirect to Stripe checkout
      const stripe = await stripePromise;
      if (!stripe) throw new Error('Stripe failed to load');

      const { error: stripeError } = await stripe.redirectToCheckout({
        sessionId: data.sessionId,
      });

      if (stripeError) {
        throw stripeError;
      }
    } catch (err: any) {
      alert('Error: ' + err.message);
      setProcessing(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brandPrimary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Course Not Found</h2>
          <a href="/courses/hsi" className="text-brandPrimary hover:underline">
            ← Back to HSI Courses
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <div className="mb-8">
          <a href="/courses/hsi" className="text-brandPrimary hover:underline text-sm">
            ← Back to HSI Courses
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {course.course_name}
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              {course.description}
            </p>

            {/* What's Included */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">What's Included</h2>
              <div className="space-y-3">
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <div className="font-semibold text-gray-900">Online Training Videos</div>
                    <div className="text-sm text-gray-600">Self-paced video instruction</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <div className="font-semibold text-gray-900">Remote Skills Verification</div>
                    <div className="text-sm text-gray-600">Complete from home via video call</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <div className="font-semibold text-gray-900">Training Supplies Shipped</div>
                    <div className="text-sm text-gray-600">All materials delivered to your door</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <div className="font-semibold text-gray-900">2-Year Certification</div>
                    <div className="text-sm text-gray-600">Nationally recognized digital card</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <div className="font-semibold text-gray-900">Flexible Scheduling</div>
                    <div className="text-sm text-gray-600">Choose your skills session time</div>
                  </div>
                </div>
              </div>
            </div>

            {/* How It Works */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <h3 className="font-semibold text-blue-900 mb-4">What Happens After Enrollment?</h3>
              <ol className="list-decimal list-inside space-y-2 text-sm text-blue-800">
                <li>You'll receive a confirmation email from us</li>
                <li>HSI will email you from info@hsi.com with training access</li>
                <li>Complete online training videos at your own pace</li>
                <li>Schedule your remote skills verification session</li>
                <li>Enter your shipping address for training supplies</li>
                <li>Complete skills verification via video call</li>
                <li>Receive your digital certification card</li>
              </ol>
              <div className="mt-4 text-sm text-blue-700">
                <strong>Important:</strong> You have 60 days from enrollment to complete all steps.
              </div>
            </div>
          </div>

          {/* Sidebar - Order Summary */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-xl shadow-lg border-2 border-gray-200 p-6 sticky top-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h3>
              
              <div className="mb-6">
                <div className="text-sm text-gray-600 mb-2">Course</div>
                <div className="font-semibold text-gray-900">{course.course_name}</div>
              </div>

              <div className="border-t border-gray-200 pt-4 mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Course Price</span>
                  <span className="font-semibold">${course.price}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Supplies & Shipping</span>
                  <span className="font-semibold text-green-600">Included</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-200">
                  <span>Total</span>
                  <span className="text-brandPrimary">${course.price}</span>
                </div>
              </div>

              <button
                onClick={handleEnroll}
                disabled={processing}
                className="w-full py-4 bg-brandPrimary text-white font-semibold rounded-lg hover:bg-brandPrimaryDark transition-colors disabled:opacity-50 disabled:cursor-not-allowed mb-4"
              >
                {processing ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  'Proceed to Payment'
                )}
              </button>

              <div className="text-xs text-gray-500 text-center mb-4">
                Secure payment powered by Stripe
              </div>

              <div className="flex items-center justify-center space-x-4 text-gray-400">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3v-8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="text-xs text-gray-600 space-y-2">
                  <div className="flex items-start">
                    <svg className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Instant access after payment</span>
                  </div>
                  <div className="flex items-start">
                    <svg className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>No hidden fees</span>
                  </div>
                  <div className="flex items-start">
                    <svg className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>60 days to complete</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
