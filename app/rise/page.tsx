import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  alternates: {
    canonical: "https://www.elevateforhumanity.org/rise",
  },
  title: 'RISE Foundation | Empowering Communities Through Education',
  description: 'RISE Foundation is a non-profit organization dedicated to providing educational opportunities and workforce development programs.',
};

export default function RiseFoundationPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[600px] overflow-hidden bg-slate-900">
        <Image
          src="/images/programs/barber-hero.jpg"
          alt="RISE Foundation"
          fill
          className="object-cover opacity-40"
          priority
          quality={100}
        />
        <div className="relative z-10 flex h-full items-center">
          <div className="mx-auto max-w-7xl px-12 text-center text-white">
            <h1 className="mb-6 text-6xl font-light md:text-8xl">
              RISE Foundation
            </h1>
            <p className="mb-8 text-2xl font-light">
              Recognizing Indusstart Safety & Empowerment
            </p>
            <p className="mx-auto max-w-3xl text-xl text-slate-200">
              A non-profit organization dedicated to providing free educational opportunities,
              workforce development, and community empowerment programs.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-40 px-12">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-24">
            <h2 className="text-5xl font-light text-slate-900 mb-6">Our Mission</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              To empower individuals and communities through accessible education,
              workforce training, and comprehensive support services.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-slate-900 mb-4">Education</h3>
              <p className="text-slate-600">
                Free training programs in healthcare, beauty, trades, and technology
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-slate-900 mb-4">Community</h3>
              <p className="text-slate-600">
                Building stronger communities through support services and partnerships
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-slate-900 mb-4">Empowerment</h3>
              <p className="text-slate-600">
                Helping individuals achieve economic independence and career success
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-40 px-12 bg-slate-50">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-24">
            <h2 className="text-5xl font-light text-slate-900 mb-6">Our Programs</h2>
            <p className="text-xl text-slate-600">
              Comprehensive training and support services
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white rounded-lg p-8 shadow-md hover:shadow-xl transition-all duration-700">
              <h3 className="text-3xl font-semibold text-slate-900 mb-4">Workforce Training</h3>
              <p className="text-slate-600 mb-6">
                Free career training programs in high-demand industries including healthcare,
                skilled trades, beauty services, and technology.
              </p>
              <Link href="/programs" className="text-orange-500 font-semibold hover:underline">
                View Programs →
              </Link>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-md hover:shadow-xl transition-all duration-700">
              <h3 className="text-3xl font-semibold text-slate-900 mb-4">Support Services</h3>
              <p className="text-slate-600 mb-6">
                Comprehensive wraparound services including housing assistance, mental health
                support, childcare, and transportation.
              </p>
              <Link href="/students" className="text-orange-500 font-semibold hover:underline">
                Learn More →
              </Link>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-md hover:shadow-xl transition-all duration-700">
              <h3 className="text-3xl font-semibold text-slate-900 mb-4">Apprenticeships</h3>
              <p className="text-slate-600 mb-6">
                DOL-registered apprenticeship programs where students earn while they learn,
                gaining real-world experience and indusstart credentials.
              </p>
              <Link href="/programs/barber-apprenticeship" className="text-orange-500 font-semibold hover:underline">
                Explore Apprenticeships →
              </Link>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-md hover:shadow-xl transition-all duration-700">
              <h3 className="text-3xl font-semibold text-slate-900 mb-4">Community Partnerships</h3>
              <p className="text-slate-600 mb-6">
                Collaborating with employers, educational institutions, and community organizations
                to create pathways to success.
              </p>
              <Link href="/employers" className="text-orange-500 font-semibold hover:underline">
                Partner With Us →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-40 px-12 bg-slate-900 text-white">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-5xl font-light mb-6">
            Support Our Mission
          </h2>
          <p className="text-xl text-slate-300 mb-12">
            Help us empower more individuals and strengthen communities through education and opportunity.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="/contact"
              className="px-8 py-4 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition text-lg"
            >
              Get Involved
            </Link>
            <Link
              href="/about"
              className="px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-slate-900 transition text-lg"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
