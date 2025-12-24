import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Users, GraduationCap, Heart, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Staff / Instructor Application',
  description: 'Join our team to support student success and workforce development.',
};

/**
 * STAFF / INSTRUCTOR APPLICATION
 *
 * Staff and instructors apply to join the team.
 * Applications require admin approval before account creation.
 *
 * After approval:
 * - Staff → /staff-portal/dashboard
 * - Instructor → /instructor/dashboard
 */
export default function StaffApplicationPage() {
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
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-lg bg-purple-100 text-purple-700 mb-4">
            <Users className="w-7 h-7" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
            Join Our Team
          </h1>
          <p className="text-lg text-slate-700 max-w-3xl">
            Apply to become a staff member or instructor and help students achieve their career goals.
          </p>
        </div>
      </section>

      {/* Role Selection */}
      <section className="max-w-4xl mx-auto px-4 py-8">
        <h2 className="text-xl font-bold text-slate-900 mb-4">Choose Your Role</h2>
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <div className="bg-white border-2 border-slate-200 rounded-lg p-6">
            <Users className="w-8 h-8 text-purple-600 mb-3" />
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Staff Member</h3>
            <p className="text-sm text-slate-600 mb-4">
              Support students with enrollment, case management, and program coordination.
            </p>
            <ul className="space-y-1 text-sm text-slate-600 mb-4">
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                <span>Student support and case management</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                <span>Enrollment and onboarding</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                <span>Program coordination</span>
              </li>
            </ul>
          </div>

          <div className="bg-white border-2 border-slate-200 rounded-lg p-6">
            <GraduationCap className="w-8 h-8 text-purple-600 mb-3" />
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Instructor</h3>
            <p className="text-sm text-slate-600 mb-4">
              Teach courses, track student progress, and provide hands-on training.
            </p>
            <ul className="space-y-1 text-sm text-slate-600 mb-4">
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                <span>Course instruction and curriculum delivery</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                <span>Student assessment and grading</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                <span>Hands-on skills training</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Application Form */}
        <div className="bg-white border border-slate-200 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Application</h2>
          
          <form action="/api/apply/staff" method="POST" className="space-y-6">
            {/* Role Selection */}
            <div>
              <label htmlFor="role" className="block text-sm font-semibold text-slate-900 mb-2">
                Position Applying For *
              </label>
              <select
                id="role"
                name="role"
                required
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              >
                <option value="">Select position</option>
                <option value="staff">Staff Member</option>
                <option value="instructor">Instructor</option>
              </select>
            </div>

            {/* Personal Information */}
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
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
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
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
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
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
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
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
            </div>

            {/* Qualifications */}
            <div>
              <label htmlFor="qualifications" className="block text-sm font-semibold text-slate-900 mb-2">
                Relevant Experience and Qualifications *
              </label>
              <textarea
                id="qualifications"
                name="qualifications"
                rows={4}
                required
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                placeholder="Tell us about your relevant experience, education, certifications, and why you'd be a great fit..."
              />
            </div>

            {/* Resume Upload */}
            <div>
              <label htmlFor="resume" className="block text-sm font-semibold text-slate-900 mb-2">
                Resume / CV
              </label>
              <input
                type="file"
                id="resume"
                name="resume"
                accept=".pdf,.doc,.docx"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
              <p className="text-xs text-slate-500 mt-1">PDF, DOC, or DOCX (max 5MB)</p>
            </div>

            {/* Submit */}
            <div className="flex items-center justify-between pt-4">
              <p className="text-sm text-slate-600">
                * Required fields
              </p>
              <button
                type="submit"
                className="px-8 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors"
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
              <span>Our team will review your application and qualifications</span>
            </li>
            <li className="flex items-start">
              <span className="font-semibold mr-2">2.</span>
              <span>If selected, we'll contact you to schedule an interview</span>
            </li>
            <li className="flex items-start">
              <span className="font-semibold mr-2">3.</span>
              <span>After approval, you'll receive onboarding instructions and account access</span>
            </li>
            <li className="flex items-start">
              <span className="font-semibold mr-2">4.</span>
              <span>Complete onboarding and start making an impact!</span>
            </li>
          </ol>
        </div>
      </section>
    </main>
  );
}
