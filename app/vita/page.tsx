'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function VITAPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* Hero */}
      <section className="py-20 border-b border-slate-800">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-emerald-400/10 border border-emerald-400/30 rounded-full px-4 py-2 mb-6">
              <span className="text-orange-400 text-sm font-semibold">IRS VITA Partner Site</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              FREE Tax Preparation Services
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Get your taxes done FREE by IRS-certified volunteers. Available to individuals and families earning $64,000 or less.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Link
              href="#get-help"
              className="bg-red-500 hover:bg-emerald-400 text-slate-950 font-bold py-6 px-8 rounded-xl text-center transition text-lg"
            >
              Get FREE Tax Help
            </Link>
            <Link
              href="#volunteer"
              className="bg-slate-800 hover:bg-slate-700 border-2 border-emerald-400 text-white font-bold py-6 px-8 rounded-xl text-center transition text-lg"
            >
              Become a Volunteer
            </Link>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="get-help" className="py-20 border-b border-slate-800">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <h2 className="text-3xl font-bold mb-12 text-center">What We Offer</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-900 rounded-xl p-6">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-bold mb-3">100% FREE</h3>
              <p className="text-slate-300">No fees, no charges. Completely free tax preparation and e-filing.</p>
            </div>
            <div className="bg-slate-900 rounded-xl p-6">
              <div className="text-4xl mb-4">✅</div>
              <h3 className="text-xl font-bold mb-3">IRS Certified</h3>
              <p className="text-slate-300">All volunteers are IRS-certified and trained in tax law.</p>
            </div>
            <div className="bg-slate-900 rounded-xl p-6">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-bold mb-3">Fast Refunds</h3>
              <p className="text-slate-300">E-filing gets your refund in 2-3 weeks with direct deposit.</p>
            </div>
          </div>

          <div className="mt-12 bg-slate-900 rounded-xl p-8">
            <h3 className="text-2xl font-bold mb-6">Who Qualifies?</h3>
            <ul className="space-y-3 text-slate-300">
              <li className="flex items-start gap-3">
                <span className="text-orange-400 text-xl">✓</span>
                <span>Individuals and families earning $64,000 or less</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-400 text-xl">✓</span>
                <span>Persons with disabilities</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-400 text-xl">✓</span>
                <span>Limited English speakers</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-400 text-xl">✓</span>
                <span>Elderly taxpayers</span>
              </li>
            </ul>
          </div>

          <div className="mt-12 text-center">
            <p className="text-xl mb-6">Ready to get your taxes done?</p>
            <a
              href="tel:3177607908"
              className="inline-block bg-red-500 hover:bg-emerald-400 text-slate-950 font-bold py-4 px-8 rounded-xl transition"
            >
              Call (317) 314-3757 to Schedule
            </a>
          </div>
        </div>
      </section>

      {/* Volunteer Section */}
      <section id="volunteer" className="py-20 border-b border-slate-800 bg-slate-900/50">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <h2 className="text-3xl font-bold mb-6 text-center">Become a VITA Volunteer</h2>
          <p className="text-xl text-slate-300 text-center mb-12 max-w-3xl mx-auto">
            Help your community and earn IRS certifications. No experience required - we provide FREE training!
          </p>

          <div className="grid md:grid-cols-2 gap-12 mb-12">
            <div>
              <h3 className="text-2xl font-bold mb-6">Benefits</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-orange-400 text-xl">✓</span>
                  <div>
                    <strong>FREE IRS Certification</strong>
                    <p className="text-slate-400 text-sm">Earn credentials in tax preparation</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-orange-400 text-xl">✓</span>
                  <div>
                    <strong>Career Pathway</strong>
                    <p className="text-slate-400 text-sm">Launch a career in tax preparation or accounting</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-orange-400 text-xl">✓</span>
                  <div>
                    <strong>Community Impact</strong>
                    <p className="text-slate-400 text-sm">Help families get thousands in refunds</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-orange-400 text-xl">✓</span>
                  <div>
                    <strong>Flexible Schedule</strong>
                    <p className="text-slate-400 text-sm">Volunteer during tax season (Jan-Apr)</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-slate-800 rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-6">Training Required</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="font-bold text-orange-400 mb-2">1. IRS Link & Learn Taxes</h4>
                  <p className="text-slate-300 text-sm mb-3">FREE online training at your own pace - Start here!</p>
                  <a
                    href="https://www.irs.gov/individuals/irs-tax-volunteers"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-red-500 hover:bg-emerald-400 text-slate-950 font-semibold py-2 px-4 rounded-lg text-sm transition mb-2"
                  >
                    Go to IRS.gov Training →
                  </a>
                  <p className="text-xs text-slate-400">Step 1: Create account on IRS.gov</p>
                </div>
                <div>
                  <h4 className="font-bold text-orange-400 mb-2">2. Volunteer Standards of Conduct</h4>
                  <p className="text-slate-300 text-sm">Ethics and confidentiality (1-2 hours)</p>
                </div>
                <div>
                  <h4 className="font-bold text-orange-400 mb-2">3. Tax Law Certification</h4>
                  <p className="text-slate-300 text-sm">Basic, Intermediate, or Advanced (10-20 hours)</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-emerald-900/30 border-2 border-emerald-400 rounded-xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Ready to Volunteer?</h3>
            <p className="text-slate-300 mb-6">Join our team and make a difference in your community!</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:elevate4humanityedu@gmail.com?subject=VITA Volunteer Interest"
                className="bg-red-500 hover:bg-emerald-400 text-slate-950 font-bold py-3 px-8 rounded-xl transition"
              >
                Email to Sign Up
              </a>
              <a
                href="tel:3177607908"
                className="bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 px-8 rounded-xl transition"
              >
                Call (317) 314-3757
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Tax Prep Course */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <h2 className="text-3xl font-bold mb-6 text-center">Tax Preparation Certificate Program</h2>
          <p className="text-xl text-slate-300 text-center mb-12 max-w-3xl mx-auto">
            8-week program to become an IRS-certified tax preparer. FREE for eligible students!
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-slate-900 rounded-xl p-8">
              <h3 className="text-xl font-bold mb-4">What You'll Learn</h3>
              <ul className="space-y-3 text-slate-300">
                <li>• Tax law fundamentals</li>
                <li>• IRS certification (Basic, Intermediate, Advanced)</li>
                <li>• Tax software (TaxSlayer/TaxWise)</li>
                <li>• Client interview skills</li>
                <li>• Quality review process</li>
                <li>• Hands-on tax preparation</li>
              </ul>
            </div>

            <div className="bg-slate-900 rounded-xl p-8">
              <h3 className="text-xl font-bold mb-4">Program Details</h3>
              <ul className="space-y-3 text-slate-300">
                <li><strong>Duration:</strong> 8 weeks</li>
                <li><strong>Schedule:</strong> January - February</li>
                <li><strong>Format:</strong> Online + In-person</li>
                <li><strong>Cost:</strong> FREE (WIOA/WRG funded)</li>
                <li><strong>Certification:</strong> IRS credentials</li>
                <li><strong>Career:</strong> Tax preparer pathway</li>
              </ul>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/directory"
              className="inline-block bg-red-500 hover:bg-emerald-400 text-slate-950 font-bold py-4 px-8 rounded-xl transition"
            >
              Enroll in Tax Prep Course
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
