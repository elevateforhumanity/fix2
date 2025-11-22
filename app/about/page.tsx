import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: 'About Elevate for Humanity | Workforce Training Provider',
  description: 'Learn about Elevate for Humanity, an ETPL-approved workforce training provider connecting Indiana residents to 100% funded career training through WIOA, WRG, and JRI programs.',
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* HERO */}
      <section className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold mb-6">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
              </svg>
              Marion County, Indiana
            </div>
            <h1 className="text-5xl font-bold mb-6">
              About Elevate for Humanity
            </h1>
            <p className="text-xl text-blue-100 leading-relaxed">
              We're an ETPL-approved workforce training provider connecting Indiana residents to 100% funded career training through government programs.
            </p>
          </div>
        </div>
      </section>

      {/* MISSION */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              {/* Feature Video with Voiceover */}
              <div className="mb-8 rounded-2xl overflow-hidden shadow-xl">
                <video
                  controls
                  loop
                  playsInline
                  className="w-full h-auto"
                >
                  <source src="/videos/hero-video-with-audio.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Elevate for Humanity is a <strong>government-contracted workforce training provider</strong> and operates as a program of <strong>Selfish Inc</strong>, a 501(c)(3) nonprofit organization dedicated to community empowerment through education and workforce development.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                As a <strong>certified government contractor</strong>, we bridge the gap between education and employment by connecting Indiana residents to 100% funded career training through WIOA, WRG, JRI, and DOL programs. We hold active contracts with EmployIndy, the State of Indiana, and the U.S. Department of Labor.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                We're not a traditional school. We're a <strong>connector</strong>—working directly with workforce boards, case managers, re-entry programs, and employer partners to remove barriers and get people trained for high-demand careers that actually pay.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                When someone is ready to move—out of survival, into training, into work—there's a simple, trusted place people can send them: <strong>Elevate for Humanity</strong>.
              </p>
            </div>
            <div className="bg-blue-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">By the Numbers</h3>
              <div className="space-y-6">
                <div>
                  <div className="text-4xl font-bold text-blue-600 mb-2">2,500+</div>
                  <div className="text-gray-700">Students trained since inception</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-green-600 mb-2">95%</div>
                  <div className="text-gray-700">Job placement rate</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-orange-600 mb-2">$0</div>
                  <div className="text-gray-700">Out-of-pocket cost for eligible students</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-purple-600 mb-2">12+</div>
                  <div className="text-gray-700">Career training programs</div>
                </div>
              </div>
              
              <div className="mt-8 pt-8 border-t border-blue-200">
                <h4 className="text-lg font-bold text-gray-900 mb-4">Credentials & Partnerships</h4>
                <div className="space-y-2 text-sm text-gray-700">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                    <span>501(c)(3) Nonprofit (Selfish Inc)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                    <span>ETPL-Approved Provider</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                    <span>Government Contractor (WIOA, DOL)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                    <span>EmployIndy Partner</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHO WE SERVE */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Who We Serve
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We specialize in helping people who face barriers to employment
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Re-Entry Participants</h3>
              <p className="text-gray-600">
                Justice-involved individuals rebuilding their lives through JRI and second-chance employment programs.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Career Changers</h3>
              <p className="text-gray-600">
                Dislocated workers, low-income adults, and people ready to transition into skilled trades and healthcare careers.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Youth & Young Adults</h3>
              <p className="text-gray-600">
                Ages 16-24 seeking their first career opportunity through WIOA youth programs and apprenticeships.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW WE WORK */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How We Work
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're the bridge between you, funding, and employment
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-blue-50 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">For Students</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  <span>We help you register with INconnect and apply for WIOA/WRG funding</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  <span>We connect you to training at real job sites (barbershops, clinics, HVAC companies)</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  <span>We provide case management, coaching, and support services</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  <span>We help you get certified, licensed, and employed</span>
                </li>
              </ul>
            </div>

            <div className="bg-green-50 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">For Employers</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  <span>We send you pre-screened, motivated candidates</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  <span>We handle training documentation and compliance paperwork</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  <span>We provide ongoing support to ensure successful placements</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  <span>We connect you to workforce funding and tax credits</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* COMMUNITY IMPACT & PHILANTHROPY */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Community Impact & Philanthropy
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Beyond workforce training, we're committed to serving our community through philanthropic initiatives and partnerships that create lasting change.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Re-Entry Support</h3>
              <p className="text-gray-700 leading-relaxed">
                We specialize in helping justice-involved individuals rebuild their lives through JRI-funded training, wraparound support services, and second-chance employer partnerships.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Barrier Removal</h3>
              <p className="text-gray-700 leading-relaxed">
                Through WIOA support services, we help remove barriers to employment by providing transportation assistance, childcare support, work clothing, and tools needed for training success.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Employer Partnerships</h3>
              <p className="text-gray-700 leading-relaxed">
                We work with employers committed to hiring from underserved communities, creating pathways to family-sustaining careers for those who need them most.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-lg border-l-4 border-green-600">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Commitment to Marion County</h3>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Every student we train represents a family lifted, a community strengthened, and a future transformed. We measure our success not just in job placements, but in lives changed and communities rebuilt.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Through partnerships with local nonprofits, faith-based organizations, and community groups, we ensure that workforce development reaches those who need it most—including individuals experiencing homelessness, domestic violence survivors, and those overcoming addiction.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="mx-auto max-w-4xl px-6 md:px-12 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Whether you're looking for training or hiring trained workers, we're here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/apply"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-all shadow-lg"
            >
              Apply for Training
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-blue-700 text-white font-semibold rounded-xl hover:bg-blue-800 transition-all border-2 border-white"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
