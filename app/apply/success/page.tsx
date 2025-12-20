import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle, Calendar, Phone, Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Application Received - Elevate for Humanity',
  description:
    'Your application has been received. An advisor will contact you within 1-2 business days.',
  robots: 'noindex, nofollow',
};

export default function ApplicationSuccessPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const applicationId = searchParams.id as string | undefined;
  const email = searchParams.email as string | undefined;
  const program = searchParams.program as string | undefined;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-3xl mx-auto px-4 py-16">
        {/* Success Icon */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-brand-green-100 rounded-full mb-6">
            <CheckCircle className="w-12 h-12 text-brand-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Application Received!
          </h1>
          <p className="text-xl text-slate-600">
            Thank you for taking the first step toward your future.
          </p>
        </div>

        {/* Application Details */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            What Happens Next?
          </h2>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                <span className="text-brand-orange-600 font-bold">1</span>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-1">
                  Confirmation Email Sent
                </h3>
                <p className="text-slate-600 text-sm">
                  We've sent a confirmation to{' '}
                  {email ? (
                    <span className="font-semibold">{email}</span>
                  ) : (
                    'your email'
                  )}
                  . Check your inbox (and spam folder) for details.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                <span className="text-brand-orange-600 font-bold">2</span>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-1">
                  Advisor Review
                </h3>
                <p className="text-slate-600 text-sm">
                  An advisor will review your application within 24 hours.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                <span className="text-brand-orange-600 font-bold">3</span>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-1">
                  Personal Contact
                </h3>
                <p className="text-slate-600 text-sm">
                  We'll call or email you within 1-2 business days to discuss
                  your goals, funding options (WIOA, WRG, JRI), and next steps.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                <span className="text-brand-orange-600 font-bold">4</span>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-1">Get Started</h3>
                <p className="text-slate-600 text-sm">
                  We'll match you to the right program and help with enrollment.
                </p>
              </div>
            </div>
          </div>

          {applicationId && (
            <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-slate-700">
                <span className="font-semibold">Application ID:</span>{' '}
                <span className="font-mono text-brand-blue-600">
                  {applicationId}
                </span>
              </p>
              <p className="text-xs text-slate-600 mt-1">
                Save this ID to track your application status.
              </p>
            </div>
          )}

          {program && (
            <div className="mt-4 p-4 bg-purple-50 border border-purple-200 rounded-lg">
              <p className="text-sm text-slate-700">
                <span className="font-semibold">Program Interest:</span>{' '}
                <span className="text-purple-600">{program}</span>
              </p>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 text-center">
            <Calendar className="w-8 h-8 text-brand-orange-600 mx-auto mb-3" />
            <h3 className="font-bold text-slate-900 mb-2">Schedule a Call</h3>
            <p className="text-sm text-slate-600 mb-3">
              Don't want to wait? Schedule a call now.
            </p>
            <Link
              href="/contact"
              className="inline-block text-brand-orange-600 hover:text-brand-orange-700 font-semibold text-sm"
            >
              Book Appointment →
            </Link>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 text-center">
            <Phone className="w-8 h-8 text-brand-orange-600 mx-auto mb-3" />
            <h3 className="font-bold text-slate-900 mb-2">Call Us</h3>
            <p className="text-sm text-slate-600 mb-3">
              Monday-Friday, 9am-5pm
            </p>
            <a
              href="tel:3173143757"
              className="inline-block text-brand-orange-600 hover:text-brand-orange-700 font-semibold text-sm"
            >
              (317) 314-3757
            </a>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 text-center">
            <Mail className="w-8 h-8 text-brand-orange-600 mx-auto mb-3" />
            <h3 className="font-bold text-slate-900 mb-2">Email Us</h3>
            <p className="text-sm text-slate-600 mb-3">
              We respond within 24 hours
            </p>
            <a
              href="mailto:elevate4humanityedu@gmail.com"
              className="inline-block text-brand-orange-600 hover:text-brand-orange-700 font-semibold text-sm"
            >
              Send Email →
            </a>
          </div>
        </div>

        {/* Track Application */}
        {applicationId && (
          <div className="bg-white rounded-xl shadow-sm p-6 text-center mb-8">
            <h3 className="font-bold text-slate-900 mb-2">
              Track Your Application
            </h3>
            <p className="text-sm text-slate-600 mb-4">
              Check the status of your application anytime.
            </p>
            <Link
              href={`/apply/track?id=${applicationId}`}
              className="inline-block px-6 py-3 bg-brand-orange-600 text-white font-bold rounded-lg hover:bg-brand-orange-700 transition"
            >
              Track Application Status
            </Link>
          </div>
        )}

        {/* Additional Resources */}
        <div className="text-center">
          <p className="text-slate-600 mb-4">
            While you wait, explore our programs:
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/programs"
              className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition text-sm font-semibold"
            >
              View All Programs
            </Link>
            <Link
              href="/financial-aid"
              className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition text-sm font-semibold"
            >
              Funding Options
            </Link>
            <Link
              href="/"
              className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition text-sm font-semibold"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
