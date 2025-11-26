import Link from 'next/link';
import { PROGRAMS } from '@/lib/programs-data';

export const metadata = {
  title: 'Directory | Elevate for Humanity',
  description: 'Browse all programs, resources, and services at Elevate for Humanity',
};

export default function DirectoryPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-red-600 to-indigo-700 text-white py-16">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <h1 className="text-5xl font-bold mb-4">Directory</h1>
          <p className="text-xl text-blue-100">
            Browse all programs, resources, and services
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 md:px-12 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Training Programs */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Training Programs</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {PROGRAMS.map((program) => (
                  <Link
                    key={program.slug}
                    href={`/programs/${program.slug}`}
                    className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow"
                  >
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{program.name}</h3>
                    <p className="text-sm text-gray-600 mb-3">{program.duration}</p>
                    <div className="flex items-center text-brandPrimary font-medium text-sm">
                      Learn More
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            {/* Student Resources */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Student Resources</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <Link href="/student/dashboard" className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-gray-900 mb-1">Student Portal</h3>
                  <p className="text-sm text-gray-600">Access your courses and progress</p>
                </Link>
                <Link href="/student/milady-lms" className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-gray-900 mb-1">Milady LMS</h3>
                  <p className="text-sm text-gray-600">Barber apprenticeship coursework</p>
                </Link>
                <Link href="/student/calendar" className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-gray-900 mb-1">My Calendar</h3>
                  <p className="text-sm text-gray-600">View classes and deadlines</p>
                </Link>
                <Link href="/student/certificates/generate" className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-gray-900 mb-1">Certificates</h3>
                  <p className="text-sm text-gray-600">Generate completion certificates</p>
                </Link>
                <Link href="/student/career-counseling" className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-gray-900 mb-1">Career Counseling</h3>
                  <p className="text-sm text-gray-600">AI-powered career guidance</p>
                </Link>
                <Link href="/financial-aid" className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-gray-900 mb-1">Financial Aid</h3>
                  <p className="text-sm text-gray-600">WIOA, WRG, and JRI funding</p>
                </Link>
              </div>
            </section>

            {/* Employer & Partner Resources */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Employers & Partners</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <Link href="/employers" className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-gray-900 mb-1">For Employers</h3>
                  <p className="text-sm text-gray-600">Hire trained workers</p>
                </Link>
                <Link href="/partners" className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-gray-900 mb-1">Become a Partner</h3>
                  <p className="text-sm text-gray-600">Training sites and sponsors</p>
                </Link>
                <Link href="/partners/portal" className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-gray-900 mb-1">Partner Portal</h3>
                  <p className="text-sm text-gray-600">Industry partnership access</p>
                </Link>
                <Link href="/employer/analytics" className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-gray-900 mb-1">Workforce Analytics</h3>
                  <p className="text-sm text-gray-600">Track hiring and training</p>
                </Link>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Links */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Links</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/apply" className="text-brandPrimary hover:text-brandPrimary font-medium">
                    Apply for Training
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-brandPrimary hover:text-brandPrimary font-medium">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-brandPrimary hover:text-brandPrimary font-medium">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-brandPrimary hover:text-brandPrimary font-medium">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/success-stories" className="text-brandPrimary hover:text-brandPrimary font-medium">
                    Success Stories
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div className="bg-blue-50 rounded-xl border border-blue-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Need Help?</h3>
              <p className="text-sm text-gray-700 mb-4">
                Our team is here to help you navigate funding, programs, and enrollment.
              </p>
              <Link
                href="/contact"
                className="block w-full text-center px-4 py-2 bg-brandPrimary text-white font-semibold rounded-lg hover:bg-brandPrimaryDark transition-colors"
              >
                Get Support
              </Link>
            </div>

            {/* Funding Info */}
            <div className="bg-green-50 rounded-xl border border-green-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">100% Funded Training</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  <span>WIOA Funding</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  <span>WRG Grants</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  <span>JRI Program</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  <span>DOL Apprenticeships</span>
                </li>
              </ul>
              <Link
                href="/financial-aid"
                className="block mt-4 text-green-700 font-medium text-sm hover:text-green-800"
              >
                Learn More About Funding →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
