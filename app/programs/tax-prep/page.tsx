
import EnrollmentProcess from '@/components/EnrollmentProcess';
import ProgramCTA from '@/components/ProgramCTA';
import ProgramHighlights from '@/components/ProgramHighlights';

import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Tax Preparation Training | Elevate For Humanity',
  description: '100% free Tax Preparation training. Learn tax law, filing procedures, and client service. Get certified and start your business.',
};

export default function Page() {
  return (
    <div className="min-h-screen bg-white">
      <section className="relative min-h-[250px] sm:h-[300px] md:h-[350px] flex items-center">
        <div className="absolute inset-0">
          <Image
            src="/images/gallery/image6.jpg"
            alt="Tax Preparation Training"
            fill
            className="object-cover"
            priority quality={100} sizes="100vw"
          />
        </div>
        <div className="relative container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-2xl">Tax Preparation Training</h1>
            <p className="text-xl md:text-2xl mb-8 drop-shadow-lg">100% free training. Learn tax law, filing procedures, and client service. Get certified and start your business.</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/apply" className="bg-red-600 text-white px-8 py-4 rounded-full font-bold hover:bg-red-700 text-lg shadow-2xl">
                Apply Now - Free Training
              </Link>
              <Link href="/contact" className="bg-white text-slate-900 px-8 py-4 rounded-full font-bold hover:bg-slate-100 text-lg shadow-2xl">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Facts */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">4-12 Weeks</div>
              <div className="text-gray-600">Program Duration</div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">$0</div>
              <div className="text-gray-600">100% Funded</div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">85%+</div>
              <div className="text-gray-600">Job Placement</div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">$35K+</div>
              <div className="text-gray-600">Starting Salary</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Program Highlights</h2>
            <div className="grid md:grid-cols-3 gap-8">
              
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">100% Funded</h3>
                <p className="text-gray-600">All programs completely free through government funding</p>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Job Placement</h3>
                <p className="text-gray-600">We help you find employment after training</p>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Expert Training</h3>
                <p className="text-gray-600">Learn from indusstart professionals</p>
              </div>
              
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Curriculum */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">8-12 Week Tax Preparation Training</h2>
            
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-green-600">
                <h3 className="text-2xl font-bold mb-3">Weeks 1-3: Tax Fundamentals & Individual Returns</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Introduction to federal tax system and IRS regulations</li>
                  <li>• Form 1040 and individual tax returns</li>
                  <li>• Filing status and exemptions</li>
                  <li>• Income types: W-2, 1099, interest, dividends</li>
                  <li>• Standard vs. itemized deductions</li>
                  <li>• Tax credits: EITC, Child Tax Credit, Education Credits</li>
                  <li>• Tax software: TurboTax, H&R Block, Drake Tax</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-blue-600">
                <h3 className="text-2xl font-bold mb-3">Weeks 4-6: Business & Self-Employment Taxes</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Schedule C: Business income and expenses</li>
                  <li>• Self-employment tax (Schedule SE)</li>
                  <li>• Home office deduction</li>
                  <li>• Vehicle and mileage deductions</li>
                  <li>• Depreciation and Section 179</li>
                  <li>• Estimated tax payments (Form 1040-ES)</li>
                  <li>• Sole proprietor vs. LLC vs. S-Corp taxation</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-purple-600">
                <h3 className="text-2xl font-bold mb-3">Weeks 7-9: Advanced Topics & State Taxes</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Rental property income (Schedule E)</li>
                  <li>• Capital gains and losses</li>
                  <li>• Retirement account distributions (IRA, 401k)</li>
                  <li>• Indiana state tax returns (IT-40)</li>
                  <li>• Local income taxes (county taxes)</li>
                  <li>• Tax planning and strategies</li>
                  <li>• Audit representation basics</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-orange-600">
                <h3 className="text-2xl font-bold mb-3">Weeks 10-12: Certification & Practice</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• IRS Volunteer Income Tax Assistance (VITA) certification</li>
                  <li>• IRS Annual Filing Season Program (AFSP)</li>
                  <li>• Preparer Tax Identification Number (PTIN) application</li>
                  <li>• Ethics and professional standards (Circular 230)</li>
                  <li>• Client interview and communication skills</li>
                  <li>• Practice tax returns and case studies</li>
                  <li>• Job placement and business startup guidance</li>
                </ul>
              </div>
            </div>

            <div className="mt-12 bg-green-50 rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-6">Certifications & Credentials</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                  <div>
                    <h4 className="font-bold text-lg mb-1">IRS VITA Certification</h4>
                    <p className="text-gray-700">Volunteer Income Tax Assistance program certification</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                  <div>
                    <h4 className="font-bold text-lg mb-1">IRS AFSP Record of Completion</h4>
                    <p className="text-gray-700">Annual Filing Season Program credential</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                  <div>
                    <h4 className="font-bold text-lg mb-1">PTIN (Preparer Tax ID Number)</h4>
                    <p className="text-gray-700">Required IRS identification for paid preparers</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Optional: EA or CPA Path</h4>
                    <p className="text-gray-700">Foundation for Enrolled Agent or CPA credentials</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hiring Partners */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-4">Employer & Business Partners</h2>
            <p className="text-center text-gray-600 mb-12 text-lg">Work for tax firms or start your own business</p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-green-600">
                <h3 className="text-xl font-bold mb-2">H&R Block</h3>
                <p className="text-gray-700 mb-2">Tax Professional</p>
                <p className="text-green-600 font-bold text-lg">$15-$25/hour (seasonal)</p>
                <p className="text-sm text-gray-600 mt-2">Paid training • Flexible hours • Bonus opportunities</p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-green-600">
                <h3 className="text-xl font-bold mb-2">Jackson Hewitt</h3>
                <p className="text-gray-700 mb-2">Tax Preparer</p>
                <p className="text-green-600 font-bold text-lg">$14-$22/hour (seasonal)</p>
                <p className="text-sm text-gray-600 mt-2">Training provided • Commission potential • Part-time</p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-green-600">
                <h3 className="text-xl font-bold mb-2">Liberty Tax</h3>
                <p className="text-gray-700 mb-2">Tax Specialist</p>
                <p className="text-green-600 font-bold text-lg">$15-$23/hour (seasonal)</p>
                <p className="text-sm text-gray-600 mt-2">Flexible schedule • Advancement opportunities</p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-600">
                <h3 className="text-xl font-bold mb-2">Local CPA Firms</h3>
                <p className="text-gray-700 mb-2">Tax Preparation Assistant</p>
                <p className="text-green-600 font-bold text-lg">$16-$24/hour</p>
                <p className="text-sm text-gray-600 mt-2">Year-round work • Learn from CPAs • Career growth</p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-600">
                <h3 className="text-xl font-bold mb-2">VITA Sites</h3>
                <p className="text-gray-700 mb-2">Volunteer Tax Preparer</p>
                <p className="text-green-600 font-bold text-lg">Volunteer (build experience)</p>
                <p className="text-sm text-gray-600 mt-2">Free training • IRS certification • Community service</p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-purple-600">
                <h3 className="text-xl font-bold mb-2">Self-Employment</h3>
                <p className="text-gray-700 mb-2">Independent Tax Preparer</p>
                <p className="text-green-600 font-bold text-lg">$30,000-$80,000+/year</p>
                <p className="text-sm text-gray-600 mt-2">Be your own boss • Set your rates • Build clientele</p>
              </div>
            </div>

            <div className="mt-12 bg-green-50 rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-4">Business Startup Support</h3>
              <p className="text-gray-700 mb-4">We help you start your own tax preparation business</p>
              <ul className="grid md:grid-cols-2 gap-4 text-gray-700">
                <li>• Business plan development</li>
                <li>• PTIN and EFIN application assistance</li>
                <li>• Tax software selection and setup</li>
                <li>• Marketing and client acquisition strategies</li>
                <li>• Pricing and service packages</li>
                <li>• Professional liability insurance guidance</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Career Progression */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">Career Path & Earning Potential</h2>
            
            <div className="space-y-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <h3 className="text-2xl font-bold mb-2">Enstart-Level Tax Preparer (0-2 years)</h3>
                <p className="text-green-50">Work Jan-April tax season at H&R Block, Jackson Hewitt, or VITA sites. Build experience and client base.</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <h3 className="text-2xl font-bold mb-2">Experienced Preparer (2-5 years)</h3>
                <p className="text-green-50">Handle complex returns, work year-round at CPA firms, or build independent practice. Add bookkeeping services.</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <h3 className="text-2xl font-bold mb-2">Independent Tax Professional (5-10 years)</h3>
                <p className="text-green-100 text-lg mb-2">$50,000-$100,000+/year</p>
                <p className="text-green-50">Own tax business with 100-300 clients. Offer year-round services: tax planning, bookkeeping, payroll.</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <h3 className="text-2xl font-bold mb-2">Career Advancement</h3>
                <p className="text-green-100 text-lg mb-2">$60,000-$150,000+/year</p>
                <p className="text-green-50">Enrolled Agent (EA), CPA, or multi-location tax franchise owner. Specialize in business taxes or wealth management.</p>
              </div>
            </div>

            <div className="mt-12 text-center">
              <Link href="/apply" className="inline-block bg-white text-green-600 px-10 py-4 rounded-full font-bold text-lg hover:bg-green-50 shadow-2xl">
                Start Your Tax Preparation Career Today
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}