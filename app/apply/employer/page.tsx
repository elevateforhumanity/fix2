import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Building2, Users, Briefcase, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Employer Application',
  description: 'Partner with us to find qualified candidates and build your workforce.',
};

/**
 * EMPLOYER APPLICATION
 *
 * Employers register to:
 * 1. Post job openings
 * 2. Access qualified candidates
 * 3. Participate in apprenticeship programs
 *
 * After registration, they go through verification before accessing employer dashboard.
 */
export default function EmployerApplicationPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="border-b border-slate-200 bg-white">
        <div className="max-w-4xl mx-auto px-4 py-10 lg:py-14">
          <Link
            href="/apply"
            className="inline-flex items-center text-sm font-semibold text-slate-600 hover:text-slate-900 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Apply
          </Link>
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-lg bg-orange-100 text-orange-700 mb-4">
            <Building2 className="w-7 h-7" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
            Employer Registration
          </h1>
          <p className="text-lg text-slate-700 max-w-3xl">
            Partner with us to find qualified candidates, post job openings, and participate in apprenticeship programs.
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="max-w-4xl mx-auto px-4 py-8">
        <h2 className="text-xl font-bold text-slate-900 mb-4">What You Get</h2>
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white border border-slate-200 rounded-lg p-6">
            <Briefcase className="w-8 h-8 text-orange-600 mb-3" />
            <h3 className="font-semibold text-slate-900 mb-2">Post Jobs</h3>
            <p className="text-sm text-slate-600">
              Reach qualified candidates actively seeking employment.
            </p>
          </div>
          <div className="bg-white border border-slate-200 rounded-lg p-6">
            <Users className="w-8 h-8 text-orange-600 mb-3" />
            <h3 className="font-semibold text-slate-900 mb-2">Access Talent</h3>
            <p className="text-sm text-slate-600">
              Connect with trained candidates from our programs.
            </p>
          </div>
          <div className="bg-white border border-slate-200 rounded-lg p-6">
            <CheckCircle className="w-8 h-8 text-orange-600 mb-3" />
            <h3 className="font-semibold text-slate-900 mb-2">Apprenticeships</h3>
            <p className="text-sm text-slate-600">
              Participate in registered apprenticeship programs.
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white border border-slate-200 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Company Information</h2>
          
          <form action="/api/apply/employer" method="POST" className="space-y-6">
            {/* Company Details */}
            <div>
              <label htmlFor="company_name" className="block text-sm font-semibold text-slate-900 mb-2">
                Company Name *
              </label>
              <input
                type="text"
                id="company_name"
                name="company_name"
                required
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="industry" className="block text-sm font-semibold text-slate-900 mb-2">
                  Industry *
                </label>
                <select
                  id="industry"
                  name="industry"
                  required
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="">Select industry</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="manufacturing">Manufacturing</option>
                  <option value="construction">Construction</option>
                  <option value="technology">Technology</option>
                  <option value="hospitality">Hospitality</option>
                  <option value="retail">Retail</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="company_size" className="block text-sm font-semibold text-slate-900 mb-2">
                  Company Size *
                </label>
                <select
                  id="company_size"
                  name="company_size"
                  required
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="">Select size</option>
                  <option value="1-10">1-10 employees</option>
                  <option value="11-50">11-50 employees</option>
                  <option value="51-200">51-200 employees</option>
                  <option value="201-500">201-500 employees</option>
                  <option value="500+">500+ employees</option>
                </select>
              </div>
            </div>

            {/* Contact Person */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="first_name" className="block text-sm font-semibold text-slate-900 mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  id="first_name"
                  name="first_name"
                  required
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>

              <div>
                <label htmlFor="last_name" className="block text-sm font-semibold text-slate-900 mb-2">
                  Last Name *
                </label>
                <input
                  type="text"
                  id="last_name"
                  name="last_name"
                  required
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-slate-900 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-slate-900 mb-2">
                  Phone *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
            </div>

            {/* Hiring Needs */}
            <div>
              <label htmlFor="hiring_needs" className="block text-sm font-semibold text-slate-900 mb-2">
                Tell us about your hiring needs
              </label>
              <textarea
                id="hiring_needs"
                name="hiring_needs"
                rows={4}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="What positions are you looking to fill? What skills are you seeking?"
              />
            </div>

            {/* Submit */}
            <div className="flex items-center justify-between pt-4">
              <p className="text-sm text-slate-600">
                * Required fields
              </p>
              <button
                type="submit"
                className="px-8 py-3 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition-colors"
              >
                Submit Application
              </button>
            </div>
          </form>
        </div>

        {/* Next Steps */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-2">What Happens Next?</h3>
          <ol className="space-y-2 text-sm text-slate-700">
            <li className="flex items-start">
              <span className="font-semibold mr-2">1.</span>
              <span>We'll review your application within 1-2 business days</span>
            </li>
            <li className="flex items-start">
              <span className="font-semibold mr-2">2.</span>
              <span>Our team will contact you to verify your company information</span>
            </li>
            <li className="flex items-start">
              <span className="font-semibold mr-2">3.</span>
              <span>Once verified, you'll receive access to your employer dashboard</span>
            </li>
            <li className="flex items-start">
              <span className="font-semibold mr-2">4.</span>
              <span>Start posting jobs and connecting with qualified candidates</span>
            </li>
          </ol>
        </div>
      </section>
    </main>
  );
}
