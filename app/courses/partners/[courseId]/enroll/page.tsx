'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { loadStripe } from '@stripe/stripe-js';
import Link from 'next/link';

export default function PartnerEnrollPage() {
  const params = useParams();
  const router = useRouter();
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClientComponentClient();

  useEffect(() => {
    fetchCourse();
  }, [params.courseId]);

  const fetchCourse = async () => {
    const { data, error } = await supabase
      .from('partner_courses')
      .select(`
        *,
        partner_lms_providers (
          provider_name,
          provider_type
        )
      `)
      .eq('id', params.courseId)
      .single();

    if (error) {
      console.error('Error fetching course:', error);
    } else {
      setCourse(data);
      
      // If course has external URL, redirect after 3 seconds
      if (data.course_url) {
        setTimeout(() => {
          window.open(data.course_url, '_blank');
        }, 3000);
      }
    }
    setLoading(false);
  };

  const handleEnrollNow = async () => {
    if (!course.requires_payment) {
      // Direct enrollment - just open partner site
      window.open(course.course_url, '_blank');
      return;
    }

    // Paid course - go through Stripe checkout
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        alert('Please sign in to enroll');
        router.push('/login');
        return;
      }

      const response = await fetch('/api/partner-courses/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          courseId: course.id,
          studentId: user.id,
          studentEmail: user.email,
          studentName: user.user_metadata?.full_name || user.email,
          studentPhone: user.user_metadata?.phone || '',
          studentAddress: user.user_metadata?.address || '',
        }),
      });

      const { sessionId, error } = await response.json();
      
      if (error) {
        alert('Error creating checkout: ' + error);
        return;
      }

      // Redirect to Stripe Checkout
      const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
      await stripe?.redirectToCheckout({ sessionId });
    } catch (error) {
      console.error('Enrollment error:', error);
      alert('Failed to start enrollment process');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">Loading course details...</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Course Not Found</h1>
          <Link
            href="/courses/partners"
            className="text-blue-600 hover:text-blue-800 font-semibold"
          >
            ← Back to Courses
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Course Info Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg
                className="h-6 w-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">
                Industry-Recognized Certification
              </h3>
              <p className="mt-2 text-sm text-blue-700">
                This course provides an industry-recognized certification upon completion. 
                You'll receive course access details via email within 24 hours of enrollment.
              </p>
            </div>
          </div>
        </div>

        {/* Course Details */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <div className="mb-4">
            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm font-semibold rounded-full">
              {course.category}
            </span>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {course.course_name}
          </h1>

          <div className="flex items-center gap-4 mb-6 text-sm text-gray-600">
            {course.duration_hours && (
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {course.duration_hours} hours
              </div>
            )}
            <div className="flex items-center">
              <svg
                className="w-5 h-5 mr-2 text-green-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              Industry-Recognized Certification
            </div>
          </div>

          <p className="text-gray-600 mb-6">{course.description}</p>

          <div className="border-t border-gray-200 pt-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Course Price</p>
                <p className="text-3xl font-bold text-blue-600">
                  {course.retail_price === 0 ? 'Free' : `$${course.retail_price}`}
                </p>
                {course.requires_payment && course.retail_price > 0 && (
                  <p className="text-sm text-gray-500 mt-1">
                    or 4 interest-free payments with Buy Now Pay Later
                  </p>
                )}
              </div>
              <button
                onClick={handleEnrollNow}
                disabled={loading}
                className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Processing...' : 'Enroll Now →'}
              </button>
            </div>
            
            {course.requires_payment && course.retail_price > 0 && (
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm font-semibold text-gray-700 mb-2">
                  Payment Options Available:
                </p>
                <div className="flex flex-wrap gap-3">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z"/>
                      <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd"/>
                    </svg>
                    Credit/Debit Card
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z"/>
                      <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9z" clipRule="evenodd"/>
                    </svg>
                    Bank Account (ACH)
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                    Affirm
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                    Afterpay
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                    Klarna
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Choose your preferred payment method at checkout. Buy Now Pay Later options available for eligible purchases.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* What Happens Next */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            What Happens Next?
          </h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-3">
                1
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  Receive Course Access
                </h3>
                <p className="text-gray-600 text-sm">
                  You'll receive an email with your course login credentials
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-3">
                2
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  Set Up Your Account
                </h3>
                <p className="text-gray-600 text-sm">
                  Create your account and set your password
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-3">
                3
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  Access Course Materials
                </h3>
                <p className="text-gray-600 text-sm">
                  Start learning immediately on our training platform
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-3">
                4
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  Earn Your Certificate
                </h3>
                <p className="text-gray-600 text-sm">
                  Complete the course and receive your certification
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-8 text-center">
          <Link
            href="/courses/partners"
            className="text-blue-600 hover:text-blue-800 font-semibold"
          >
            ← Back to All Courses
          </Link>
        </div>
      </div>
    </div>
  );
}
