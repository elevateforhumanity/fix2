import Link from 'next/link';

export default function ApplyPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-r from-orange-50 to-white border-b border-orange-200">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
            Apply Now
          </h1>
          <p className="mt-4 text-lg text-gray-600 leading-relaxed max-w-2xl">
            Start your career journey with 100% funded training programs.
          </p>
        </div>
      </section>
      {/* Application Steps */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Application Process
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-blue-600">1</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Choose Program</h3>
            <p className="text-sm text-gray-600">
              Select the career path that interests you
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-blue-600">2</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">
              Submit Application
            </h3>
            <p className="text-sm text-gray-600">
              Complete the online application form
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-blue-600">3</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Interview</h3>
            <p className="text-sm text-gray-600">
              Meet with our admissions team
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-blue-600">4</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Start Learning</h3>
            <p className="text-sm text-gray-600">Begin your training program</p>
          </div>
        </div>
        {/* Application Form */}
        <div className="max-w-3xl mx-auto bg-white border border-gray-200 rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Application Form
          </h2>
          <form className="space-y-6">
            {/* Personal Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>
            {/* Program Selection */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Program Selection
              </h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Program *
                </label>
                <select
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="">Choose a program</option>
                  <option value="barber">Barber Apprenticeship</option>
                  <option value="building-services">
                    Building Services Technician
                  </option>
                  <option value="hvac-welding">HVAC & Welding</option>
                  <option value="healthcare">Healthcare (CNA/QMA)</option>
                  <option value="drug-testing">Drug Testing Business</option>
                  <option value="digital-skills">Digital Skills</option>
                  <option value="leadership">Leadership Development</option>
                  <option value="peer-recovery">
                    Certified Peer Recovery Specialist
                  </option>
                </select>
              </div>
            </div>
            {/* Background */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Background
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Highest Education Level *
                  </label>
                  <select
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="">Select education level</option>
                    <option value="high-school">High School Diploma/GED</option>
                    <option value="some-college">Some College</option>
                    <option value="associates">Associate's Degree</option>
                    <option value="bachelors">Bachelor's Degree</option>
                    <option value="graduate">Graduate Degree</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Employment Status *
                  </label>
                  <select
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="">Select status</option>
                    <option value="employed">Employed</option>
                    <option value="unemployed">Unemployed</option>
                    <option value="student">Student</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Why are you interested in this program? *
                  </label>
                  <textarea
                    required
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
            {/* Funding */}
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                💰 Funding Information
              </h3>
              <p className="text-gray-600 mb-4">
                All our programs are 100% funded through WIOA and WRG. Our team
                will help you determine eligibility and complete the funding
                application.
              </p>
              <label className="flex items-start">
                <input
                  type="checkbox"
                  required
                  className="mt-1 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                />
                <span className="ml-2 text-sm text-gray-700">
                  I understand that I will need to complete a funding
                  application with WorkOne Indiana to determine eligibility for
                  WIOA/WRG funding.
                </span>
              </label>
            </div>
            {/* Submit */}
            <div className="pt-6">
              <button
                type="submit"
                className="w-full bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors"
              >
                Submit Application
              </button>
              <p className="mt-4 text-sm text-gray-600 text-center">
                By submitting this form, you agree to our{' '}
                <Link
                  href="/legal/terms"
                  className="text-orange-600 hover:text-orange-700"
                >
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link
                  href="/legal/privacy"
                  className="text-orange-600 hover:text-orange-700"
                >
                  Privacy Policy
                </Link>
              </p>
            </div>
          </form>
        </div>
      </section>
      {/* Help Section */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Need Help?</h2>
          <p className="text-lg text-gray-600 mb-8">
            Our admissions team is here to answer your questions and guide you
            through the application process.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-block bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors border border-gray-300"
            >
              Contact Us
            </Link>
            <a
              href="tel:+13175551234"
              className="inline-block bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors"
            >
              Call (317) 555-1234
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
