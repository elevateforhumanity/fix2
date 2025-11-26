import Link from 'next/link';

export const metadata = {
  title: 'Become a Training Provider | Elevate for Humanity',
  description: 'Partner with Elevate for Humanity to provide workforce training. Learn what it means to be a training provider and how to get started.',
  openGraph: {
    images: ["/images/team-new/team-3.jpg"],
    type: "website",
  }};

export default function TrainingProviderPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-purple-600 to-indigo-700 text-white py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-6">
              Become a Training Provider
            </h1>
            <p className="text-xl text-purple-100 leading-relaxed mb-8">
              Partner with Elevate for Humanity to deliver workforce training. We handle funding, students, and compliance—you focus on teaching.
            </p>
            <Link
              href="/program-holder/apply"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-purple-600 font-semibold rounded-xl hover:bg-purple-50 transition-all shadow-lg"
            >
              Apply to Partner
            </Link>
          </div>
        </div>
      </section>

      {/* What is a Training Provider */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">What is a Training Provider?</h2>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              A <strong>training provider</strong> is an organization or business that delivers hands-on career training to students enrolled through Elevate for Humanity. Training providers are the experts in their field—barbershops, HVAC companies, healthcare facilities, construction firms—who teach real-world skills in actual work environments.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-3">In Simple Terms:</h3>
              <p className="text-gray-700 mb-0">
                <strong>Elevate for Humanity</strong> finds students, secures funding (WIOA, WRG, JRI), handles paperwork, and manages compliance. <strong>You (the training provider)</strong> teach the skills, provide the workspace, and train students in your trade or profession.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Types of Training Providers */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Types of Training Providers</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Businesses</h3>
              <p className="text-gray-700 mb-4">
                Barbershops, HVAC companies, construction firms, healthcare clinics, restaurants, and other businesses that train apprentices or interns.
              </p>
              <p className="text-sm text-gray-600">
                <strong>Examples:</strong> Classic Cuts Barbershop, ABC HVAC Services, Marion Medical Clinic
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Training Centers</h3>
              <p className="text-gray-700 mb-4">
                Dedicated training facilities with classrooms, labs, and equipment for teaching specific trades or skills.
              </p>
              <p className="text-sm text-gray-600">
                <strong>Examples:</strong> Technical schools, trade academies, certification centers
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Community Organizations</h3>
              <p className="text-gray-700 mb-4">
                Nonprofits, community centers, and workforce development organizations that provide training and support services.
              </p>
              <p className="text-sm text-gray-600">
                <strong>Examples:</strong> Community action agencies, re-entry programs, workforce boards
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What You Provide */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">What Training Providers Do</h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-purple-50 rounded-xl p-8 border border-purple-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">✅ Your Responsibilities</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-purple-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  <span><strong>Provide training space</strong> (shop, lab, classroom, or work site)</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-purple-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  <span><strong>Teach hands-on skills</strong> in your trade or profession</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-purple-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  <span><strong>Supervise students</strong> during training hours</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-purple-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  <span><strong>Track attendance and progress</strong> (we provide tools)</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-purple-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  <span><strong>Maintain safe training environment</strong></span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-purple-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  <span><strong>Sign off on completed hours/competencies</strong></span>
                </li>
              </ul>
            </div>

            <div className="bg-blue-50 rounded-xl p-8 border border-blue-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">✅ What Elevate Handles</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  <span><strong>Student recruitment</strong> and enrollment</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  <span><strong>WIOA/WRG/JRI funding</strong> applications and paperwork</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  <span><strong>Compliance and reporting</strong> to state/federal agencies</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  <span><strong>Case management</strong> and student support services</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  <span><strong>Payment processing</strong> (we pay you for training)</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  <span><strong>Marketing and outreach</strong></span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Benefits of Becoming a Training Provider</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="font-bold text-gray-900 mb-2">💰 Get Paid to Train</h3>
              <p className="text-sm text-gray-700">
                Receive payment for providing training. We handle all billing and funding—you get paid for your expertise.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="font-bold text-gray-900 mb-2">👥 Pipeline of Workers</h3>
              <p className="text-sm text-gray-700">
                Train future employees. Many training providers hire their best apprentices after completion.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="font-bold text-gray-900 mb-2">📋 No Paperwork Hassle</h3>
              <p className="text-sm text-gray-700">
                We handle WIOA, WRG, and compliance paperwork. You focus on teaching, not bureaucracy.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="font-bold text-gray-900 mb-2">🤝 Community Impact</h3>
              <p className="text-sm text-gray-700">
                Help transform lives. Train people who face barriers to employment and give them a second chance.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="font-bold text-gray-900 mb-2">📈 Grow Your Business</h3>
              <p className="text-sm text-gray-700">
                Expand capacity with apprentices. Get help with work while training the next generation.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="font-bold text-gray-900 mb-2">🎯 Ongoing Support</h3>
              <p className="text-sm text-gray-700">
                We provide ongoing support, training materials, and help with any student issues.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Requirements to Become a Training Provider</h2>
          
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-3">1. Expertise in Your Field</h3>
              <p className="text-gray-700">
                You must have professional experience and credentials in the trade or skill you'll be teaching (e.g., licensed barber, certified HVAC technician, registered nurse).
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-3">2. Safe Training Environment</h3>
              <p className="text-gray-700">
                Provide a safe, professional workspace that meets OSHA and industry standards. This could be your shop, facility, or work site.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-3">3. Ability to Supervise</h3>
              <p className="text-gray-700">
                Commit to supervising and mentoring students during training hours. This includes providing feedback and tracking progress.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-3">4. Background Check</h3>
              <p className="text-gray-700">
                Pass a background check (required for working with students and receiving government funding).
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-3">5. Sign MOU (Memorandum of Understanding)</h3>
              <p className="text-gray-700">
                Sign a partnership agreement outlining roles, responsibilities, and payment terms. We make this simple and straightforward.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How to Apply */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">How to Become a Training Provider</h2>
          
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-purple-600">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                  1
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Submit Application</h3>
                  <p className="text-gray-700">
                    Fill out our training provider application. Tell us about your business, expertise, and what you can teach.
                  </p>
                  <Link href="/program-holder/apply" className="inline-block mt-3 text-purple-600 font-semibold hover:text-purple-700">
                    Apply Now →
                  </Link>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-purple-600">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                  2
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Site Visit & Interview</h3>
                  <p className="text-gray-700">
                    We'll visit your location to see your training space and discuss the partnership. This is a conversation, not an interrogation!
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-purple-600">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                  3
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Sign MOU & Onboarding</h3>
                  <p className="text-gray-700">
                    Sign the partnership agreement and complete onboarding. We'll train you on our systems and processes.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-purple-600">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                  4
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Start Training Students</h3>
                  <p className="text-gray-700">
                    We'll send you pre-screened, motivated students. You start training and we handle everything else!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-purple-600 text-white">
        <div className="mx-auto max-w-4xl px-6 md:px-12 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Partner With Us?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Join our network of training providers making a difference in Marion County
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/program-holder/apply"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-purple-600 font-semibold rounded-xl hover:bg-purple-50 transition-all shadow-lg"
            >
              Apply to Partner
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-purple-700 text-white font-semibold rounded-xl hover:bg-purple-800 transition-all border-2 border-white"
            >
              Ask Questions
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
