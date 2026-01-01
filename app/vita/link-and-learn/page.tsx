import { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowLeft,
  Home,
  BookOpen,
  Video,
  FileText,
  Award,
  ExternalLink,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Link & Learn Taxes - VITA Training | Elevate For Humanity',
  description:
    'Free IRS online training for VITA volunteers. Learn tax preparation through Link & Learn Taxes certification program.',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/vita/link-and-learn',
  },
};

export default function LinkAndLearnPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm">
            <Link
              href="/"
              className="text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              <Home className="h-4 w-4" />
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <Link
              href="/vita"
              className="text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              <ArrowLeft className="h-4 w-4" />
              VITA Program
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-black font-semibold">Link & Learn Taxes</span>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <BookOpen className="h-20 w-20 text-white mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6">
              Link & Learn Taxes
            </h1>
            <p className="text-xl md:text-2xl text-white max-w-3xl mx-auto mb-8">
              Free IRS online training program for VITA volunteers. Get
              certified to prepare taxes and help your community.
            </p>
            <a
              href="https://apps.irs.gov/app/vita/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-xl text-lg font-bold hover:bg-gray-100 transition-colors"
            >
              Access Link & Learn Portal
              <ExternalLink className="h-5 w-5" />
            </a>
          </div>
        </div>
      </section>

      {/* What is Link & Learn */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-black text-black mb-8 text-center">
              What is Link & Learn Taxes?
            </h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-black mb-6">
                <strong>Link & Learn Taxes</strong> is the IRS's free online
                training and certification program for VITA volunteers. The
                program provides comprehensive tax law training and prepares
                volunteers to assist taxpayers with basic tax return
                preparation.
              </p>
              <p className="text-lg text-black mb-6">
                The training covers fundamental tax topics including filing
                status, dependents, income, adjustments, deductions, credits,
                and tax computation. Volunteers must pass certification tests to
                become IRS-certified tax preparers.
              </p>
              <p className="text-lg text-black">
                All training materials, practice exercises, and certification
                exams are available online at no cost through the IRS Link &
                Learn Taxes portal.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Training Modules */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-black text-black mb-12 text-center">
            Training Modules
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
              <Video className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold text-black mb-3">
                Basic Course
              </h3>
              <p className="text-black mb-4">
                Fundamental tax law and preparation for simple returns. Required
                for all volunteers.
              </p>
              <ul className="space-y-2 text-sm text-black">
                <li>• Filing Status</li>
                <li>• Dependents</li>
                <li>• Income Types</li>
                <li>• Standard Deduction</li>
              </ul>
            </div>

            <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
              <FileText className="h-12 w-12 text-green-600 mb-4" />
              <h3 className="text-xl font-bold text-black mb-3">
                Intermediate Course
              </h3>
              <p className="text-black mb-4">
                Advanced topics for more complex returns including credits and
                adjustments.
              </p>
              <ul className="space-y-2 text-sm text-black">
                <li>• Education Credits</li>
                <li>• Retirement Income</li>
                <li>• Self-Employment</li>
                <li>• Itemized Deductions</li>
              </ul>
            </div>

            <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
              <Award className="h-12 w-12 text-purple-600 mb-4" />
              <h3 className="text-xl font-bold text-black mb-3">
                Advanced Course
              </h3>
              <p className="text-black mb-4">
                Specialized training for complex tax situations and business
                returns.
              </p>
              <ul className="space-y-2 text-sm text-black">
                <li>• Schedule C Business</li>
                <li>• Rental Property</li>
                <li>• Capital Gains</li>
                <li>• Foreign Income</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Certification Levels */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-black text-black mb-12 text-center">
            Certification Levels
          </h2>

          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-white border-l-4 border-blue-600 rounded-lg p-6">
              <h3 className="text-2xl font-bold text-black mb-2">
                Basic Certification
              </h3>
              <p className="text-black mb-3">
                Prepare simple returns with W-2 income, standard deduction, and
                basic credits.
              </p>
              <p className="text-sm text-black">
                <strong>Required:</strong> Basic course + certification exam
              </p>
            </div>

            <div className="bg-white border-l-4 border-green-600 rounded-lg p-6">
              <h3 className="text-2xl font-bold text-black mb-2">
                Intermediate Certification
              </h3>
              <p className="text-black mb-3">
                Handle more complex returns including education credits,
                retirement income, and itemized deductions.
              </p>
              <p className="text-sm text-black">
                <strong>Required:</strong> Basic + Intermediate courses +
                certification exams
              </p>
            </div>

            <div className="bg-white border-l-4 border-purple-600 rounded-lg p-6">
              <h3 className="text-2xl font-bold text-black mb-2">
                Advanced Certification
              </h3>
              <p className="text-black mb-3">
                Prepare complex returns with business income, rental property,
                and capital gains.
              </p>
              <p className="text-sm text-black">
                <strong>Required:</strong> Basic + Intermediate + Advanced
                courses + certification exams
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How to Get Started */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-black text-black mb-12 text-center">
            How to Get Started
          </h2>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-bold text-black mb-2">
                    Sign Up as a VITA Volunteer
                  </h3>
                  <p className="text-black">
                    Register with Elevate for Humanity's VITA program or sign up
                    directly through the IRS VITA portal.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-bold text-black mb-2">
                    Access Link & Learn Portal
                  </h3>
                  <p className="text-black">
                    Visit the IRS Link & Learn Taxes website and create your
                    account to begin training.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-bold text-black mb-2">
                    Complete Training Modules
                  </h3>
                  <p className="text-black">
                    Work through the training materials at your own pace. Most
                    volunteers complete basic training in 10-15 hours.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                  4
                </div>
                <div>
                  <h3 className="text-xl font-bold text-black mb-2">
                    Pass Certification Exams
                  </h3>
                  <p className="text-black">
                    Take and pass the certification tests for your desired
                    level. You can retake exams if needed.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-teal-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                  5
                </div>
                <div>
                  <h3 className="text-xl font-bold text-black mb-2">
                    Start Volunteering
                  </h3>
                  <p className="text-black">
                    Once certified, begin helping taxpayers at your local VITA
                    site during tax season.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-6">
            Ready to Start Training?
          </h2>
          <p className="text-xl text-white mb-8">
            Access the IRS Link & Learn Taxes portal to begin your volunteer
            training today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://apps.irs.gov/app/vita/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-xl text-lg font-bold hover:bg-gray-100 transition-colors"
            >
              Access Training Portal
              <ExternalLink className="h-5 w-5" />
            </a>
            <Link
              href="/vita"
              className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-white/10 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              Back to VITA Program
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
