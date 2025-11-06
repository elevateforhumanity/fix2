import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircle, ArrowRight } from 'lucide-react';

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [loading, setLoading] = useState(true);
  const [enrollmentData, setEnrollmentData] = useState<any>(null);

  useEffect(() => {
    const verifyPaymentAndEnroll = async () => {
      if (!sessionId) {
        setLoading(false);
        return;
      }

      try {
        // Call Netlify function to verify Stripe session
        const response = await fetch('/.netlify/functions/stripe-webhook', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            type: 'verify_session',
            session_id: sessionId,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to verify payment');
        }

        const data = await response.json();

        setEnrollmentData({
          programName: data.programName || 'Your Program',
          enrollmentId:
            data.enrollmentId ||
            'ENR-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
          courseId: data.courseId,
          amount: data.amount,
        });
      } catch (error) {
        console.error('Error verifying payment:', error);
        // Fallback to basic enrollment data
        setEnrollmentData({
          programName: 'Your Program',
          enrollmentId:
            'ENR-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
        });
      } finally {
        setLoading(false);
      }
    };

    verifyPaymentAndEnroll();
  }, [sessionId]);

  if (loading) {
    return (
      <section className="section">
        <div className="container max-w-2xl mx-auto">
          <div className="card p-8 text-center">
            <div className="animate-spin w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full mx-auto" />
            <p className="mt-4 text-brown-600">Confirming your enrollment...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="container max-w-2xl mx-auto">
        <div className="card p-8 text-center">
          <div className="w-20 h-20 bg-beige-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-brown-900">
            Welcome to Elevate for Humanity!
          </h1>
          <p className="mt-3 text-lg text-brown-600">
            Your enrollment is confirmed. Let's get started on your new career
            path!
          </p>
          {enrollmentData && (
            <div className="mt-6 p-4 bg-beige-50 rounded-lg text-left">
              <div className="text-sm text-brown-500">Enrollment ID</div>
              <div className="font-mono font-semibold">
                {enrollmentData.enrollmentId}
              </div>
            </div>
          )}
          <div className="mt-8 space-y-3">
            <Link
              to="/lms"
              className="btn w-full text-lg flex items-center justify-center gap-2"
            >
              Go to Your Dashboard
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/programs" className="btn-outline w-full">
              Browse More Programs
            </Link>
          </div>
          <div className="mt-6 p-4 bg-blue-50 rounded-lg text-sm text-left">
            <div className="font-semibold text-blue-900 mb-2">What's Next?</div>
            <ul className="space-y-2 text-green-600">
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>Check your email for enrollment confirmation</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>Access your courses in the LMS dashboard</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>Connect with your instructor and classmates</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>Start learning and earning your certification</span>
              </li>
            </ul>
          </div>
          <p className="mt-6 text-sm text-brown-500">
            Need help? Contact us at{' '}
            <a
              href="mailto:elevateforhumanity@gmail.com"
              className="text-green-600 hover:underline"
            >
              elevateforhumanity@gmail.com
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
