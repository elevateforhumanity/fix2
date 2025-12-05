import { Metadata } from 'next';
import Link from 'next/link';
import ProgramHero from '@/components/ProgramHero';

export const metadata: Metadata = {
  title: 'Barber Apprenticeship Program | Elevate For Humanity',
  description: '100% free barber apprenticeship. Learn while you earn. Get licensed and start your own business.',
};

export default function Page() {
  return (
    <div className="min-h-screen bg-white">
      <ProgramHero
        title="Barber Apprenticeship Program"
        description="100% free barber apprenticeship. Learn while you earn. Get licensed and start your own business."
        imageSrc="/images/artlist/hero-training-1.jpg"
        imageAlt="Barber Apprenticeship Program"
        duration="12-24 Months"
        cost="$0"
        placement="90%+"
        salary="$40K+"
      />

      {/* Quick Facts */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">1500 Hours</div>
              <div className="text-gray-600">Required Training</div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">Get Paid</div>
              <div className="text-gray-600">While You Learn</div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">DOL Registered</div>
              <div className="text-gray-600">Official Apprenticeship</div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">$15-20/hr</div>
              <div className="text-gray-600">Starting Wage</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">How It Works</h2>
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Apply to the Program</h3>
                  <p className="text-gray-600">
                    Submit your application and complete our orientation. We'll help you understand the requirements and what to expect.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Get Matched with a Barbershop</h3>
                  <p className="text-gray-600">
                    We'll connect you with one of our partner barbershops where you'll work and learn. You'll start earning a paycheck from day one.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Complete Theory Training</h3>
                  <p className="text-gray-600">
                    Take online courses covering safety, sanitation, and professional skills. All courses are free and can be completed on your schedule.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                  4
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Log Your Hours</h3>
                  <p className="text-gray-600">
                    Use our mobile app to check in/out daily. Track your progress toward the 1500-hour requirement. Your employer approves your hours.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                  5
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Get Licensed</h3>
                  <p className="text-gray-600">
                    After completing 1500 hours and all coursework, you're eligible to take the Indiana State Board exam. We'll help you prepare and register.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Required Courses */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">Required Courses</h2>
            <div className="grid md:grid-cols-2 gap-6">
              
              {/* JRI Soft Skills */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">JRI Soft Skills</h3>
                    <p className="text-gray-600 mb-3">
                      Professional development courses covering communication, workplace behavior, and career management.
                    </p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Communication Skills</li>
                      <li>• Professionalism</li>
                      <li>• Career Management</li>
                    </ul>
                    <span className="inline-block mt-3 px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
                      FREE - Online
                    </span>
                  </div>
                </div>
              </div>

              {/* Milady RISE */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Milady RISE Safety</h3>
                    <p className="text-gray-600 mb-3">
                      Industry-standard safety and wellness training required by Indiana State Board.
                    </p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Domestic Violence Awareness</li>
                      <li>• Human Trafficking Recognition</li>
                      <li>• Infection Control</li>
                    </ul>
                    <span className="inline-block mt-3 px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
                      FREE - Online
                    </span>
                  </div>
                </div>
              </div>

              {/* HSI Safety */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">HSI Bloodborne Pathogens</h3>
                    <p className="text-gray-600 mb-3">
                      OSHA-compliant safety training for handling blood and bodily fluids in barbering services.
                    </p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Bloodborne Pathogens</li>
                      <li>• Universal Precautions</li>
                      <li>• Exposure Control</li>
                    </ul>
                    <span className="inline-block mt-3 px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
                      $50 - Online
                    </span>
                  </div>
                </div>
              </div>

              {/* On-the-Job Training */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">On-the-Job Training</h3>
                    <p className="text-gray-600 mb-3">
                      1500 hours of hands-on training at a licensed barbershop under supervision of a master barber.
                    </p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Haircuts & Styling</li>
                      <li>• Shaving & Beard Trimming</li>
                      <li>• Customer Service</li>
                    </ul>
                    <span className="inline-block mt-3 px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
                      PAID - Get Paid to Learn
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">Why Choose Apprenticeship?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">No Student Debt</h3>
                <p className="text-gray-600">
                  Unlike traditional barber school, you'll earn money while learning instead of paying tuition. Start your career debt-free.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Real Experience</h3>
                <p className="text-gray-600">
                  Work with real clients from day one. Build your skills, confidence, and clientele while you're still learning.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Fast Track to Success</h3>
                <p className="text-gray-600">
                  Complete your training in 12-24 months while earning income. Many apprentices stay with their shop after licensing.
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Your Barber Career?</h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Join our DOL-registered apprenticeship program and start earning while you learn. No tuition, no debt, just real skills and real paychecks.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/apply" 
              className="px-8 py-4 bg-white text-purple-600 font-bold rounded-lg hover:bg-gray-100 transition text-lg"
            >
              Apply Now
            </Link>
            <Link 
              href="/contact" 
              className="px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-purple-600 transition text-lg"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            <div className="space-y-6">
              
              <div className="border-b pb-6">
                <h3 className="text-xl font-bold mb-3">How much will I get paid?</h3>
                <p className="text-gray-600">
                  Starting wages typically range from $15-20/hour, depending on the barbershop and your experience. As you gain skills, your pay increases. Many apprentices earn $25-30/hour by the time they complete the program.
                </p>
              </div>

              <div className="border-b pb-6">
                <h3 className="text-xl font-bold mb-3">How long does it take?</h3>
                <p className="text-gray-600">
                  The program requires 1500 hours of on-the-job training. Working full-time (40 hours/week), you can complete this in about 9-12 months. Part-time apprentices typically finish in 18-24 months.
                </p>
              </div>

              <div className="border-b pb-6">
                <h3 className="text-xl font-bold mb-3">Do I need any experience?</h3>
                <p className="text-gray-600">
                  No prior experience required! We'll teach you everything from basic sanitation to advanced cutting techniques. All you need is a willingness to learn and a professional attitude.
                </p>
              </div>

              <div className="border-b pb-6">
                <h3 className="text-xl font-bold mb-3">What if I don't have a barbershop to work at?</h3>
                <p className="text-gray-600">
                  We partner with barbershops throughout Indianapolis who are looking for apprentices. We'll help match you with a shop that fits your schedule and location preferences.
                </p>
              </div>

              <div className="border-b pb-6">
                <h3 className="text-xl font-bold mb-3">Will I be licensed after completing the program?</h3>
                <p className="text-gray-600">
                  After completing 1500 hours and all required coursework, you'll be eligible to take the Indiana State Board exam. We'll help you prepare and register. Once you pass, you'll receive your barber license.
                </p>
              </div>

              <div className="pb-6">
                <h3 className="text-xl font-bold mb-3">Can I work while in the program?</h3>
                <p className="text-gray-600">
                  Yes! The apprenticeship IS your job. You'll work at a barbershop and get paid while completing your training hours. Many apprentices work full-time, but part-time schedules are also available.
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
