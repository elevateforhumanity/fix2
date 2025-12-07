// app/vita/page.tsx - VITA Program (RISE Forward Foundation)
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { CountUp } from '@/components/animations/CountUp';

export const metadata: Metadata = {
  alternates: {
    canonical: "https://www.elevateforhumanity.org/vita",
  },
  title: 'VITA Program | RISE Forward Foundation | Elevate For Humanity',
  description: 'Free tax preparation through the IRS VITA program. Volunteer or get your taxes done for free. RISE Forward Foundation partnership.',
};

export default function VITAPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative h-[500px] bg-gradient-to-r from-blue-900 to-blue-700">
        <div className="absolute inset-0">
          <Image
            src="/media-backup-20251128-043832/programs/tax-prep-hd.jpg"
            alt="VITA Program - Free Tax Preparation"
            fill
            className="object-cover opacity-20"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 h-full flex items-center">
          <div className="text-white max-w-3xl">
            <div className="mb-4">
              <span className="inline-block px-4 py-2 bg-white/20 rounded-full text-sm font-semibold">
                RISE Forward Foundation Partnership
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              VITA Program
            </h1>
            <p className="text-2xl mb-8 font-light">
              Free tax preparation for individuals earning $67,000 or less
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/vita/volunteer"
                className="inline-block px-8 py-4 bg-orange-600 text-white font-bold text-lg rounded-lg hover:bg-orange-700 transition text-center"
              >
                Volunteer with VITA →
              </Link>
              <Link
                href="/vita/get-help"
                className="inline-block px-8 py-4 bg-white text-blue-900 font-bold text-lg rounded-lg hover:bg-gray-100 transition text-center"
              >
                Get Free Tax Help
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* What is VITA */}
      <ScrollReveal>
        <section className="py-20 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-8">
              What is the VITA Program?
            </h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-slate-700 mb-6">
                The <strong>IRS Volunteer Income Tax Assistance (VITA) program</strong> offers free basic tax return 
                preparation to qualified individuals who generally make $67,000 or less, persons with disabilities, 
                and limited English-speaking taxpayers.
              </p>
              <p className="text-lg text-slate-700 mb-6">
                Through our partnership with the <strong>RISE Forward Foundation</strong>, we provide IRS-certified 
                volunteers who prepare tax returns at no cost to eligible taxpayers.
              </p>
              <p className="text-lg text-slate-700">
                VITA has operated for over 50 years, with IRS-certified volunteers preparing millions of tax returns 
                annually at thousands of sites nationwide.
              </p>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Stats */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <ScrollReveal delay={0}>
              <div>
                <div className="text-5xl font-bold text-blue-600 mb-2">
                  <CountUp end={50} suffix="+" />
                </div>
                <div className="text-slate-700">Years of Service</div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <div>
                <div className="text-5xl font-bold text-blue-600 mb-2">
                  $<CountUp end={67000} />
                </div>
                <div className="text-slate-700">Income Limit</div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <div>
                <div className="text-5xl font-bold text-blue-600 mb-2">
                  <CountUp end={100} suffix="%" />
                </div>
                <div className="text-slate-700">Free Service</div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Two Paths */}
      <ScrollReveal>
        <section className="py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16">
              Choose Your Path
            </h2>
            <div className="grid md:grid-cols-2 gap-12">
              {/* Get Help */}
              <div className="bg-slate-50 p-8 rounded-lg">
                <h3 className="text-3xl font-bold mb-6 text-blue-900">
                  Need Your Taxes Done?
                </h3>
                <p className="text-lg text-slate-700 mb-6">
                  Get your taxes prepared for free by IRS-certified volunteers.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    <span>100% free tax preparation</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    <span>IRS-certified volunteers</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    <span>E-file included</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    <span>Quality review on every return</span>
                  </li>
                </ul>
                <Link
                  href="/vita/get-help"
                  className="block w-full px-8 py-4 bg-blue-600 text-white font-bold text-center rounded-lg hover:bg-blue-700 transition"
                >
                  Find a VITA Site Near You →
                </Link>
              </div>

              {/* Volunteer */}
              <div className="bg-slate-50 p-8 rounded-lg">
                <h3 className="text-3xl font-bold mb-6 text-orange-600">
                  Want to Volunteer?
                </h3>
                <p className="text-lg text-slate-700 mb-6">
                  Help your community by becoming an IRS-certified VITA volunteer.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    <span>Free IRS training provided</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    <span>Flexible hours (nights & weekends)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    <span>No prior tax experience required</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    <span>Make a real difference in your community</span>
                  </li>
                </ul>
                <Link
                  href="/vita/volunteer"
                  className="block w-full px-8 py-4 bg-orange-600 text-white font-bold text-center rounded-lg hover:bg-orange-700 transition"
                >
                  Become a VITA Volunteer →
                </Link>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Resources */}
      <section className="py-20 bg-slate-50 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">
            Official IRS Resources
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <a
              href="https://www.irs.gov/individuals/free-tax-return-preparation-for-qualifying-taxpayers"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-lg transition"
            >
              <h3 className="text-lg font-bold mb-2 text-blue-600">
                Free Tax Prep Info
              </h3>
              <p className="text-sm text-slate-600 mb-3">
                Official IRS information about VITA
              </p>
              <span className="text-blue-600 text-sm font-semibold">
                Visit IRS.gov →
              </span>
            </a>

            <a
              href="https://freetaxassistance.for.irs.gov/s/sitelocator"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-lg transition"
            >
              <h3 className="text-lg font-bold mb-2 text-blue-600">
                Find a VITA Site
              </h3>
              <p className="text-sm text-slate-600 mb-3">
                Locate VITA sites near you
              </p>
              <span className="text-blue-600 text-sm font-semibold">
                Find Sites →
              </span>
            </a>

            <a
              href="https://freetaxassistance.for.irs.gov/s/sign-up-form"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-lg transition"
            >
              <h3 className="text-lg font-bold mb-2 text-blue-600">
                Volunteer Signup
              </h3>
              <p className="text-sm text-slate-600 mb-3">
                Sign up to become a VITA volunteer
              </p>
              <span className="text-blue-600 text-sm font-semibold">
                Sign Up →
              </span>
            </a>

            <a
              href="https://apps.irs.gov/app/vita/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-lg transition"
            >
              <h3 className="text-lg font-bold mb-2 text-blue-600">
                Link & Learn Taxes
              </h3>
              <p className="text-sm text-slate-600 mb-3">
                Free online training for volunteers
              </p>
              <span className="text-blue-600 text-sm font-semibold">
                Start Training →
              </span>
            </a>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-r from-blue-900 to-blue-700 text-white px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8">
            Whether you need tax help or want to volunteer, we're here for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/vita/get-help"
              className="px-10 py-5 bg-white text-blue-900 font-bold text-xl rounded-lg hover:bg-gray-100 transition"
            >
              Get Free Tax Help
            </Link>
            <Link
              href="/vita/volunteer"
              className="px-10 py-5 bg-orange-600 text-white font-bold text-xl rounded-lg hover:bg-orange-700 transition"
            >
              Volunteer with VITA
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
