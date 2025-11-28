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

          <div className="mt-12">
            <h3 className="text-2xl font-bold mb-6 text-center">Schedule Your FREE Tax Appointment</h3>
            
            <div className="bg-slate-800 rounded-xl p-6 max-w-2xl mx-auto">
              <form className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">First Name *</label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white focus:border-orange-400 focus:outline-none"
                      placeholder="First name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Last Name *</label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white focus:border-orange-400 focus:outline-none"
                      placeholder="Last name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Email Address *</label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white focus:border-orange-400 focus:outline-none"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    className="w-full px-4 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white focus:border-orange-400 focus:outline-none"
                    placeholder="(317) 555-0123"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Household Income (2024) *</label>
                  <select
                    required
                    className="w-full px-4 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white focus:border-orange-400 focus:outline-none"
                  >
                    <option value="">Select income range...</option>
                    <option value="under-20k">Under $20,000</option>
                    <option value="20k-35k">$20,000 - $35,000</option>
                    <option value="35k-50k">$35,000 - $50,000</option>
                    <option value="50k-64k">$50,000 - $64,000</option>
                    <option value="over-64k">Over $64,000 (may not qualify)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Filing Status *</label>
                  <select
                    required
                    className="w-full px-4 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white focus:border-orange-400 focus:outline-none"
                  >
                    <option value="">Select filing status...</option>
                    <option value="single">Single</option>
                    <option value="married-joint">Married Filing Jointly</option>
                    <option value="married-separate">Married Filing Separately</option>
                    <option value="head-of-household">Head of Household</option>
                    <option value="qualifying-widow">Qualifying Widow(er)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Number of Dependents</label>
                  <input
                    type="number"
                    min="0"
                    className="w-full px-4 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white focus:border-orange-400 focus:outline-none"
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Preferred Appointment Time</label>
                  <select
                    className="w-full px-4 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white focus:border-orange-400 focus:outline-none"
                  >
                    <option value="">Select preferred time...</option>
                    <option value="weekday-morning">Weekday Morning (9am-12pm)</option>
                    <option value="weekday-afternoon">Weekday Afternoon (1pm-5pm)</option>
                    <option value="weekday-evening">Weekday Evening (5pm-8pm)</option>
                    <option value="saturday">Saturday</option>
                    <option value="sunday">Sunday</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Special Needs or Accommodations</label>
                  <textarea
                    rows={3}
                    className="w-full px-4 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white focus:border-orange-400 focus:outline-none"
                    placeholder="Language assistance, wheelchair access, etc."
                  />
                </div>

                <div className="bg-orange-500/10 border border-orange-400/30 rounded-lg p-4">
                  <p className="text-sm text-slate-300 mb-3">
                    <strong className="text-orange-400">What to bring to your appointment:</strong>
                  </p>
                  <ul className="text-sm text-slate-300 space-y-1 list-disc pl-5">
                    <li>Photo ID (driver's license, state ID, passport)</li>
                    <li>Social Security cards for you, spouse, and dependents</li>
                    <li>W-2 forms from all employers</li>
                    <li>1099 forms (interest, dividends, unemployment, etc.)</li>
                    <li>Prior year tax return (if available)</li>
                    <li>Bank account info for direct deposit</li>
                  </ul>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-red-500 hover:bg-orange-400 text-slate-950 font-bold py-3 px-8 rounded-xl transition"
                  >
                    Request Appointment
                  </button>
                  <a
                    href="tel:3173143757"
                    className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 px-8 rounded-xl text-center transition"
                  >
                    Or Call (317) 314-3757
                  </a>
                </div>
              </form>
            </div>
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

          <div className="bg-emerald-900/30 border-2 border-emerald-400 rounded-xl p-8">
            <h3 className="text-2xl font-bold mb-6 text-center">Ready to Volunteer?</h3>
            <p className="text-slate-300 mb-8 text-center">Join our team and make a difference in your community!</p>
            
            {/* Volunteer Application Form */}
            <div className="bg-slate-800 rounded-xl p-6 mb-6">
              <h4 className="text-xl font-bold mb-4">VITA Volunteer Application</h4>
              <form className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">First Name *</label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white focus:border-emerald-400 focus:outline-none"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Last Name *</label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white focus:border-emerald-400 focus:outline-none"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Email Address *</label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white focus:border-emerald-400 focus:outline-none"
                    placeholder="john.doe@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    className="w-full px-4 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white focus:border-emerald-400 focus:outline-none"
                    placeholder="(317) 555-0123"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Volunteer Role Interest *</label>
                  <select
                    required
                    className="w-full px-4 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white focus:border-emerald-400 focus:outline-none"
                  >
                    <option value="">Select a role...</option>
                    <option value="tax-preparer">Tax Preparer (IRS Certified)</option>
                    <option value="greeter">Greeter/Intake Specialist</option>
                    <option value="quality-reviewer">Quality Reviewer</option>
                    <option value="site-coordinator">Site Coordinator</option>
                    <option value="interpreter">Interpreter/Translator</option>
                    <option value="tech-support">Technology Support</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Previous Tax Experience</label>
                  <select
                    className="w-full px-4 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white focus:border-emerald-400 focus:outline-none"
                  >
                    <option value="none">No experience</option>
                    <option value="personal">Personal tax filing only</option>
                    <option value="vita-volunteer">Previous VITA volunteer</option>
                    <option value="professional">Professional tax preparer</option>
                    <option value="accounting">Accounting/Finance background</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Availability (Check all that apply)</label>
                  <div className="space-y-2 text-sm">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" />
                      <span>Weekday mornings (9am-12pm)</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" />
                      <span>Weekday afternoons (1pm-5pm)</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" />
                      <span>Weekday evenings (5pm-8pm)</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" />
                      <span>Saturdays</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" />
                      <span>Sundays</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Why do you want to volunteer with VITA?</label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white focus:border-emerald-400 focus:outline-none"
                    placeholder="Tell us about your interest in volunteering..."
                  />
                </div>

                <div className="bg-emerald-900/20 border border-emerald-400/30 rounded-lg p-4">
                  <label className="flex items-start gap-3">
                    <input type="checkbox" required className="mt-1" />
                    <span className="text-sm text-slate-300">
                      I understand that I will need to complete IRS certification training and pass required exams before preparing tax returns. I commit to maintaining confidentiality and following IRS standards of conduct. *
                    </span>
                  </label>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-red-500 hover:bg-emerald-400 text-slate-950 font-bold py-3 px-8 rounded-xl transition"
                  >
                    Submit Volunteer Application
                  </button>
                  <a
                    href="tel:3173143757"
                    className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 px-8 rounded-xl text-center transition"
                  >
                    Or Call (317) 314-3757
                  </a>
                </div>
              </form>
            </div>

            <div className="text-center text-sm text-slate-400">
              <p>Questions? Email us at <a href="mailto:elevate4humanityedu@gmail.com" className="text-emerald-400 hover:underline">elevate4humanityedu@gmail.com</a></p>
            </div>
          </div>
        </div>
      </section>

      {/* Tax Prep Course */}
      <section className="py-20 border-b border-slate-800">
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
              href="/programs/tax-vita"
              className="inline-block bg-red-500 hover:bg-emerald-400 text-slate-950 font-bold py-4 px-8 rounded-xl transition"
            >
              Enroll in Tax Prep Course
            </Link>
          </div>
        </div>
      </section>

      {/* Paid Service Option */}
      <section className="py-20 bg-gradient-to-br from-slate-900 to-slate-950">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-400/30 rounded-full px-4 py-2 mb-6">
                <span className="text-blue-400 text-sm font-semibold">PAID SERVICE OPTION</span>
              </div>
              <h2 className="text-3xl font-bold mb-4">Need Your Taxes Done Faster?</h2>
              <p className="text-xl text-slate-300">
                SupersonicFastCash offers expedited tax preparation services for a fee
              </p>
            </div>

            <div className="bg-slate-800 border-2 border-blue-500/30 rounded-2xl p-8">
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-xl font-bold mb-4 text-blue-400">SupersonicFastCash Features</h3>
                  <ul className="space-y-3 text-slate-300">
                    <li className="flex items-start gap-3">
                      <span className="text-blue-400">✓</span>
                      <span>Same-day or next-day service</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-400">✓</span>
                      <span>Professional tax preparers</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-400">✓</span>
                      <span>Complex returns accepted</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-400">✓</span>
                      <span>Refund advance options</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-slate-900 rounded-xl p-6">
                  <h4 className="font-bold mb-4">Important Notice</h4>
                  <p className="text-slate-300 text-sm mb-4">
                    SupersonicFastCash is a <strong className="text-blue-400">separate paid service</strong> and is NOT affiliated with our FREE VITA program.
                  </p>
                  <p className="text-slate-300 text-sm mb-4">
                    <strong>Fees apply</strong> based on return complexity. Contact them directly for pricing.
                  </p>
                  <div className="bg-orange-500/10 border border-orange-400/30 rounded-lg p-4">
                    <p className="text-orange-400 text-xs font-semibold">
                      ⚠️ If you qualify for FREE VITA services (income $64,000 or less), we recommend using our FREE option above.
                    </p>
                  </div>
                </div>
              </div>

              <div className="text-center pt-6 border-t border-slate-700">
                <a
                  href="https://supersonicfastcash.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-8 rounded-xl transition"
                >
                  Visit SupersonicFastCash →
                </a>
                <p className="text-slate-400 text-sm mt-3">
                  External paid service - opens in new window
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
