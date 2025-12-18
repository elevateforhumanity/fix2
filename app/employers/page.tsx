import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  Briefcase,
  Users,
  TrendingUp,
  DollarSign,
  CheckCircle,
  Calendar,
  FileText,
  Award,
  Target,
  Handshake,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Employer Services - Hire Qualified Talent | Elevate for Humanity',
  description:
    'Partner with us to access pre-screened, trained candidates. No recruitment fees, tax incentives available, and customized training programs.',
};

export default function EmployersPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section with Video */}
      <section className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="absolute inset-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover"
          >
            <source src="/videos/employer-partner-hero.mp4" type="video/mp4" />
          </video>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Briefcase className="w-5 h-5" />
              <span className="text-sm font-semibold">Employer Services</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Find Qualified Talent.
              <br />
              Build Your Team.
            </h1>
            <p className="text-base md:text-lg text-blue-100 mb-8 leading-relaxed">
              Access pre-screened, trained candidates ready to work. No
              recruitment fees. Tax incentives available. Customized training
              programs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#post-job"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-blue-600 bg-white rounded-lg hover:bg-slate-50 transition shadow-lg"
              >
                Post a Job Opening
              </Link>
              <Link
                href="#contact"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-white/10 backdrop-blur-sm border-2 border-white rounded-lg hover:bg-white/20 transition"
              >
                Schedule a Meeting
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
              Why Partner with Elevate for Humanity?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold mb-3">
                  Pre-Screened Candidates
                </h3>
                <p className="text-slate-600">
                  All candidates are vetted, trained, and certified.
                  They&apos;re job-ready from day one with industry-recognized
                  credentials.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-lg font-bold mb-3">
                  Zero Recruitment Fees
                </h3>
                <p className="text-slate-600">
                  No placement fees, no hidden costs. Access qualified
                  candidates at no charge to your organization.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-bold mb-3">Tax Incentives</h3>
                <p className="text-slate-600">
                  Qualify for WOTC (Work Opportunity Tax Credit) and other
                  incentives when hiring our graduates.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-lg font-bold mb-3">Customized Training</h3>
                <p className="text-slate-600">
                  Need specific skills? We can customize training programs to
                  meet your exact hiring needs.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Handshake className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-lg font-bold mb-3">Ongoing Support</h3>
                <p className="text-slate-600">
                  We support both you and your new hires through the first 90
                  days to ensure successful placement.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-indigo-600" />
                </div>
                <h3 className="text-lg font-bold mb-3">Reduced Turnover</h3>
                <p className="text-slate-600">
                  Our graduates have 85% retention rates after one
                  year—significantly higher than industry average.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
              How It Works
            </h2>
            <div className="space-y-8">
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-base flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 className="text-lg md:text-lg font-bold mb-2">
                    Post Your Job Opening
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    Submit your job requirements through our simple form.
                    Include position details, required skills, schedule, and
                    compensation. We&apos;ll match you with qualified candidates
                    from our current students and recent graduates.
                  </p>
                </div>
              </div>
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-base flex-shrink-0">
                  2
                </div>
                <div>
                  <h3 className="text-lg md:text-lg font-bold mb-2">
                    We Match Qualified Candidates
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    Our career services team reviews your requirements and
                    matches you with candidates who have the right skills,
                    certifications, and work ethic. We pre-screen all candidates
                    and send you only the best matches.
                  </p>
                </div>
              </div>
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-base flex-shrink-0">
                  3
                </div>
                <div>
                  <h3 className="text-lg md:text-lg font-bold mb-2">
                    Interview & Hire with Confidence
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    Interview candidates and make your hiring decision. We
                    provide ongoing support during onboarding and the first 90
                    days of employment to ensure success for both you and your
                    new hire.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Available Talent */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
              Available Talent Pools
            </h2>
            <p className="text-base md:text-lg text-slate-600 text-center mb-12">
              Access trained, certified candidates across multiple industries
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-slate-50 rounded-lg p-6">
                <h3 className="font-bold text-lg mb-2">Healthcare</h3>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li>• Certified Nursing Assistants (CNA)</li>
                  <li>• Medical Assistants</li>
                  <li>• CPR Certified Staff</li>
                </ul>
              </div>
              <div className="bg-slate-50 rounded-lg p-6">
                <h3 className="font-bold text-lg mb-2">Transportation</h3>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li>• CDL Class A Drivers</li>
                  <li>• CDL Class B Drivers</li>
                  <li>• Delivery Drivers</li>
                </ul>
              </div>
              <div className="bg-slate-50 rounded-lg p-6">
                <h3 className="font-bold text-lg mb-2">Skilled Trades</h3>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li>• HVAC Technicians</li>
                  <li>• Building Maintenance</li>
                  <li>• Building Technicians</li>
                </ul>
              </div>
              <div className="bg-slate-50 rounded-lg p-6">
                <h3 className="font-bold text-lg mb-2">Other Services</h3>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li>• Licensed Barbers</li>
                  <li>• Customer Service</li>
                  <li>• Entry-Level Positions</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tax Incentives */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">
              Tax Incentives & Credits
            </h2>
            <p className="text-base md:text-lg text-slate-600 text-center mb-12">
              Hiring our graduates may qualify you for significant tax benefits
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  Work Opportunity Tax Credit (WOTC)
                </h3>
                <p className="text-slate-600 mb-4">
                  Receive up to $9,600 per eligible hire. Many of our graduates
                  qualify as WOTC-eligible, including veterans, ex-felons, and
                  long-term unemployed individuals.
                </p>
                <Link
                  href="#contact"
                  className="text-blue-600 font-semibold hover:text-blue-700"
                >
                  Learn More →
                </Link>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  Federal Bonding Program
                </h3>
                <p className="text-slate-600 mb-4">
                  Free fidelity bonding coverage for at-risk job applicants.
                  Protects employers against theft, forgery, larceny, and
                  embezzlement for the first 6 months of employment.
                </p>
                <Link
                  href="#contact"
                  className="text-blue-600 font-semibold hover:text-blue-700"
                >
                  Learn More →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hiring Events */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Calendar className="w-16 h-16 text-blue-600 mx-auto mb-6" />
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              Hiring Events
            </h2>
            <p className="text-base md:text-lg text-slate-600 mb-8">
              Meet multiple qualified candidates in one convenient location. We
              host quarterly hiring events where you can interview pre-screened
              candidates on-site.
            </p>
            <div className="bg-slate-50 rounded-lg p-8 mb-8">
              <h3 className="text-lg md:text-lg font-bold mb-4">
                Next Hiring Event
              </h3>
              <p className="text-lg text-slate-700 mb-2">
                <strong>Date:</strong> Third Thursday of each month
              </p>
              <p className="text-lg text-slate-700 mb-2">
                <strong>Time:</strong> 10:00 AM - 2:00 PM
              </p>
              <p className="text-lg text-slate-700 mb-6">
                <strong>Location:</strong> Elevate for Humanity Training Center
              </p>
              <Link
                href="#contact"
                className="inline-block px-8 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition"
              >
                Register for Next Event
              </Link>
            </div>
            <p className="text-slate-600">
              Can&apos;t make our scheduled event? We can arrange a private
              hiring event for your organization.
            </p>
          </div>
        </div>
      </section>

      {/* Job Posting Form */}
      <section id="post-job" className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <FileText className="w-16 h-16 text-blue-600 mx-auto mb-6" />
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Post a Job Opening
              </h2>
              <p className="text-base md:text-lg text-slate-600">
                Fill out the form below and we&apos;ll match you with qualified
                candidates
              </p>
            </div>
            <form className="bg-white rounded-lg shadow-lg p-8 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Contact Name *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Job Title *
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Industry/Field *
                </label>
                <select
                  required
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Industry</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="transportation">
                    Transportation/Logistics
                  </option>
                  <option value="trades">Skilled Trades</option>
                  <option value="manufacturing">Manufacturing</option>
                  <option value="hospitality">Hospitality</option>
                  <option value="retail">Retail</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Number of Positions *
                  </label>
                  <input
                    type="number"
                    min="1"
                    required
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Salary Range *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., $15-18/hour"
                    required
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Job Description *
                </label>
                <textarea
                  rows={6}
                  required
                  placeholder="Describe the position, responsibilities, and requirements..."
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Required Certifications/Skills
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g., CNA certification, CDL Class A, HVAC EPA 608..."
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>
              <div>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="w-5 h-5" />
                  <span className="text-sm text-slate-700">
                    I&apos;m interested in learning about tax incentives (WOTC)
                  </span>
                </label>
              </div>
              <button
                type="submit"
                className="w-full px-8 py-4 bg-blue-600 text-white font-bold text-lg rounded-lg hover:bg-blue-700 transition"
              >
                Submit Job Posting
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
              What Employers Say
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-slate-50 rounded-lg p-6">
                <p className="text-slate-700 italic mb-4">
                  &quot;We&apos;ve hired 15 graduates from Elevate for Humanity
                  over the past year. Every single one has been professional,
                  skilled, and ready to work. This partnership has been
                  invaluable.&quot;
                </p>
                <div className="font-bold">— Sarah Johnson</div>
                <div className="text-sm text-slate-600">
                  HR Director, Community Health Network
                </div>
              </div>
              <div className="bg-slate-50 rounded-lg p-6">
                <p className="text-slate-700 italic mb-4">
                  &quot;The WOTC tax credits alone saved us over $50,000 last
                  year. Plus, we got great employees who are loyal and
                  hardworking. Win-win.&quot;
                </p>
                <div className="font-bold">— Mike Rodriguez</div>
                <div className="text-sm text-slate-600">
                  Owner, Rodriguez Trucking
                </div>
              </div>
              <div className="bg-slate-50 rounded-lg p-6">
                <p className="text-slate-700 italic mb-4">
                  &quot;Finding qualified HVAC techs is tough. Elevate for
                  Humanity provides us with certified technicians who are ready
                  to work from day one. Highly recommend.&quot;
                </p>
                <div className="font-bold">— Tom Williams</div>
                <div className="text-sm text-slate-600">
                  Operations Manager, Comfort Systems
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section
        id="contact"
        className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              Ready to Build Your Team?
            </h2>
            <p className="text-base md:text-lg text-blue-100 mb-8">
              Let&apos;s discuss your hiring needs and how we can help you find
              the right talent.
            </p>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <h3 className="font-bold text-lg mb-2">Call Us</h3>
                <a
                  href="tel:317-314-3757"
                  className="text-2xl font-bold hover:text-blue-200 transition"
                >
                  317-314-3757
                </a>
                <p className="text-sm text-blue-100 mt-2">
                  Monday-Friday, 8am-5pm
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <h3 className="font-bold text-lg mb-2">Email Us</h3>
                <a
                  href="mailto:employers@elevateforhumanity.org"
                  className="text-xl font-bold hover:text-blue-200 transition break-all"
                >
                  employers@elevateforhumanity.org
                </a>
                <p className="text-sm text-blue-100 mt-2">
                  We respond within 24 hours
                </p>
              </div>
            </div>
            <Link
              href="/contact"
              className="inline-block px-8 py-4 bg-white text-blue-600 font-bold text-lg rounded-lg hover:bg-slate-50 transition shadow-lg"
            >
              Schedule a Meeting
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
