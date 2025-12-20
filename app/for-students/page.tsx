import { Metadata } from 'next';
import Link from 'next/link';
import {
  GraduationCap,
  DollarSign,
  Users,
  FileCheck,
  Phone,
  ArrowRight,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'For Students | Training, Funding & Career Support',
  description:
    'Access training programs, workforce funding, and career support. WIOA, apprenticeships, and more.',
};

export default function ForStudentsPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-white text-white py-20">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <GraduationCap className="w-16 h-16 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold mb-6">For Students</h1>
          <p className="text-xl text-blue-100 mb-8">
            Access training, funding, and career support to build your future.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/apply"
              className="px-8 py-4 bg-white text-brand-blue-600 rounded-lg font-bold hover:bg-blue-50"
            >
              Apply Now
            </Link>
            <a
              href="tel:+13173143757"
              className="px-8 py-4 bg-brand-blue-700 text-white rounded-lg font-bold hover:bg-brand-blue-600 border-2 border-white"
            >
              Call (317) 314-3757
            </a>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            What We Offer
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <GraduationCap className="w-10 h-10 text-brand-blue-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Training Programs</h3>
              <p className="text-gray-700 mb-4">
                Access to accredited training in barbering, HVAC, CDL, medical
                assistant, welding, and more.
              </p>
              <Link
                href="/programs"
                className="text-brand-blue-600 font-semibold hover:underline"
              >
                Browse Programs →
              </Link>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <DollarSign className="w-10 h-10 text-brand-green-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Funding Support</h3>
              <p className="text-gray-700 mb-4">
                Help securing WIOA, WRG, JRI, apprenticeship funding, and other
                workforce development resources.
              </p>
              <Link
                href="/resources#students"
                className="text-brand-blue-600 font-semibold hover:underline"
              >
                Learn About Funding →
              </Link>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Users className="w-10 h-10 text-purple-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Advisor Support</h3>
              <p className="text-gray-700 mb-4">
                Work with a real advisor who guides you through eligibility,
                enrollment, and completion.
              </p>
              <a
                href="tel:+13173143757"
                className="text-brand-blue-600 font-semibold hover:underline"
              >
                Call (317) 314-3757 →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works for Students */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Your Path to Success
          </h2>
          <div className="space-y-6">
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 bg-brand-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Apply (Free)</h3>
                <p className="text-gray-700">
                  Submit an application. No payment required. This is inquiry,
                  not enrollment.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 bg-brand-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Advisor Review</h3>
                <p className="text-gray-700">
                  An advisor contacts you within 1-2 business days to discuss
                  options and eligibility.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 bg-brand-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Funding Coordination</h3>
                <p className="text-gray-700">
                  We help secure workforce funding or discuss self-pay options
                  if needed.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 bg-brand-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                4
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">
                  Enrollment & Training
                </h3>
                <p className="text-gray-700">
                  Once approved, you're enrolled with an accredited training
                  provider.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 bg-brand-green-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                5
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">
                  Complete & Earn Credentials
                </h3>
                <p className="text-gray-700">
                  Finish training, earn your credential, and launch your career.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Important to Know */}
      <section className="py-16 bg-blue-50">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Important to Know
          </h2>
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-bold text-lg mb-2">
                ✅ We Coordinate Access
              </h3>
              <p className="text-gray-700">
                We connect you to training providers, funding sources, and
                career opportunities.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-bold text-lg mb-2">✅ Advisor-Led Process</h3>
              <p className="text-gray-700">
                Every student works with a real advisor. No instant checkout or
                automated enrollment.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-bold text-lg mb-2">
                ✅ No Payment Until Approved
              </h3>
              <p className="text-gray-700">
                You are not charged until funding is confirmed or you approve
                self-pay terms.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-bold text-lg mb-2">
                ❌ We Don't Issue Credentials
              </h3>
              <p className="text-gray-700">
                Certifications come from state boards, industry bodies, and
                accredited institutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start?</h2>
          <p className="text-xl text-gray-700 mb-8">
            Apply now or call to speak with an advisor.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/apply"
              className="px-8 py-4 bg-brand-blue-600 text-white rounded-lg font-bold hover:bg-brand-blue-700"
            >
              Apply Now
            </Link>
            <a
              href="tel:+13173143757"
              className="px-8 py-4 bg-gray-200 text-gray-900 rounded-lg font-bold hover:bg-gray-300"
            >
              Call (317) 314-3757
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
