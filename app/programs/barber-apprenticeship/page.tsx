// app/programs/barber-apprenticeship/page.tsx
import Link from "next/link";
import Image from "next/image";

export default function BarberApprenticeshipPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Banner - Clean, No Overlay */}
      <section className="relative h-[250px] sm:h-[300px] md:h-[350px] w-full overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=2400&h=1350&fit=crop&q=95"
          alt="Professional barber training and apprenticeship"
          fill
          className="object-cover"
          priority
          quality={95}
          sizes="100vw"
        />
      </section>

      {/* Hero Content - Below Image */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-wide text-orange-500 mb-2 sm:mb-3">
            Your Path to Success
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-slate-900 mb-4 sm:mb-6 leading-tight">
            Become a Barber
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-700 mb-6 sm:mb-8 max-w-3xl mx-auto">
            Get paid to learn your craft. No tuition. Real barbershops. Real future.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link href="/apply" className="bg-orange-500 text-white px-6 sm:px-8 py-3 rounded-full font-bold hover:bg-orange-600 transition-all text-center shadow-xl">
              Apply Now
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 py-16">
        {/* Highlights Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Why Choose This Program</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-all">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Earn While You Learn</h3>
              <p className="text-sm text-slate-600">Start earning $15-18/hour from day one, plus tips</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-all">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-slate-900 mb-2">State Licensed</h3>
              <p className="text-sm text-slate-600">Graduate with your Indiana barber license</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-all">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Real Experience</h3>
              <p className="text-sm text-slate-600">Train in actual barbershops with real clients</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-all">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Job Placement</h3>
              <p className="text-sm text-slate-600">Connect with hiring barbershops before you graduate</p>
            </div>
          </div>
        </section>

        {/* Visual Timeline */}
        <section className="mb-16 bg-slate-50 p-8 rounded-lg">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Your Journey to Success</h2>
          <div className="relative">
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-orange-200 transform -translate-y-1/2"></div>
            <div className="grid md:grid-cols-4 gap-8 relative">
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold relative z-10">1</div>
                <h3 className="font-bold text-slate-900 mb-2">Apply</h3>
                <p className="text-sm text-slate-600">Submit your application and meet with an advisor</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold relative z-10">2</div>
                <h3 className="font-bold text-slate-900 mb-2">Get Funded</h3>
                <p className="text-sm text-slate-600">We help you secure WIOA, WRG, or JRI funding</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold relative z-10">3</div>
                <h3 className="font-bold text-slate-900 mb-2">Start Training</h3>
                <p className="text-sm text-slate-600">Begin earning while learning in real barbershops</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold relative z-10">4</div>
                <h3 className="font-bold text-slate-900 mb-2">Launch Career</h3>
                <p className="text-sm text-slate-600">Get licensed and start your career earning $35K-55K</p>
              </div>
            </div>
          </div>
        </section>

        {/* Program Overview */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Here's How It Works</h2>
          <p className="text-lg text-slate-700 mb-6">
            You'll train in real barbershops alongside experienced barbers who remember what it's like 
            to start out. You'll earn money from day one—wages plus tips—while learning everything 
            from classic cuts to modern styles. After 2,000 hours (about 12-18 months working full-time), 
            you'll be ready to take your state exam and start your own career.
          </p>
          
          <div className="grid md:grid-cols-4 gap-6 mt-8">
            <div className="bg-slate-50 p-6 rounded-lg">
              <div className="text-3xl font-bold text-orange-600 mb-2">12-18</div>
              <div className="text-sm text-slate-600">Months to complete (2,000 hours)</div>
            </div>
            <div className="bg-slate-50 p-6 rounded-lg">
              <div className="text-3xl font-bold text-orange-600 mb-2">$0</div>
              <div className="text-sm text-slate-600">You pay nothing</div>
            </div>
            <div className="bg-slate-50 p-6 rounded-lg">
              <div className="text-3xl font-bold text-orange-600 mb-2">Day 1</div>
              <div className="text-sm text-slate-600">Start earning immediately</div>
            </div>
            <div className="bg-slate-50 p-6 rounded-lg">
              <div className="text-3xl font-bold text-orange-600 mb-2">40+</div>
              <div className="text-sm text-slate-600">Hours per week training</div>
            </div>
          </div>
        </section>

        {/* What You'll Learn */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">What You'll Master</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-slate-900 mb-3">The Craft</h3>
              <ul className="space-y-2 text-slate-700">
                <li>• Every cut from classic to modern</li>
                <li>• Beard shaping and straight razor shaves</li>
                <li>• Color, highlights, and chemical treatments</li>
                <li>• How to keep your clients safe and comfortable</li>
                <li>• Reading what your client really wants</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-3">The Business</h3>
              <ul className="space-y-2 text-slate-700">
                <li>• Running your own chair or shop</li>
                <li>• Building relationships that bring clients back</li>
                <li>• Products that work (and how to recommend them)</li>
                <li>• Managing your schedule and income</li>
                <li>• Growing from zero clients to fully booked</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Funding Options */}
        <section className="mb-16 bg-blue-50 p-8 rounded-lg">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Yes, It's Really Free</h2>
          <p className="text-lg text-slate-700 mb-4">
            We know "free training" sounds too good to be true. But this is real. 
            Government workforce programs pay for everything because they want you to succeed:
          </p>
          <ul className="space-y-2 text-slate-700">
            <li>• <strong>WIOA</strong> - for anyone looking to start a new career</li>
            <li>• <strong>Workforce Ready Grant</strong> - Indiana residents</li>
            <li>• <strong>JRI</strong> - second chance opportunities</li>
          </ul>
          <p className="text-sm text-slate-600 mt-4">
            Don't worry about the paperwork—we'll walk you through every step and help you qualify.
          </p>
        </section>

        {/* Career Outcomes */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">What Happens After You Graduate</h2>
          <div className="bg-slate-50 p-8 rounded-lg">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-slate-900 mb-3">Your First Year</h3>
                <p className="text-2xl font-bold text-orange-600 mb-2">$35,000 - $55,000</p>
                <p className="text-sm text-slate-600">That's your base pay plus tips. Many of our grads do even better.</p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-3">Where You Can Go</h3>
                <ul className="text-slate-700 space-y-1">
                  <li>• Work in any barbershop you choose</li>
                  <li>• Open your own shop</li>
                  <li>• Become a master barber</li>
                  <li>• Teach the next generation</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Prerequisites */}
        <section className="mb-16 bg-blue-50 p-8 rounded-lg">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Who Can Apply</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-slate-900 mb-3">Requirements:</h3>
              <ul className="space-y-2 text-slate-700">
                <li>✓ At least 18 years old</li>
                <li>✓ High school diploma or GED</li>
                <li>✓ Valid driver's license or state ID</li>
                <li>✓ Able to stand for long periods</li>
                <li>✓ No prior experience needed</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-3">Ideal for:</h3>
              <ul className="space-y-2 text-slate-700">
                <li>• Career changers looking for stable income</li>
                <li>• People who enjoy working with their hands</li>
                <li>• Those who want to be their own boss</li>
                <li>• Anyone seeking a creative, social career</li>
                <li>• Second chance seekers (JRI eligible)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Day in the Life */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">A Day in Your Training</h2>
          <div className="bg-white border-2 border-slate-200 rounded-lg p-8">
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="w-20 flex-shrink-0 font-bold text-orange-600">8:00 AM</div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-1">Shop Opens</h4>
                  <p className="text-slate-600">Set up your station, prep tools, review the day's appointments</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-20 flex-shrink-0 font-bold text-orange-600">9:00 AM</div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-1">First Clients</h4>
                  <p className="text-slate-600">Start with basic cuts under supervision, gradually taking on more complex styles</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-20 flex-shrink-0 font-bold text-orange-600">12:00 PM</div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-1">Lunch Break</h4>
                  <p className="text-slate-600">Connect with other apprentices, watch technique videos, practice on mannequins</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-20 flex-shrink-0 font-bold text-orange-600">1:00 PM</div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-1">Afternoon Sessions</h4>
                  <p className="text-slate-600">More client work, learn beard trims, practice fades, master the straight razor</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-20 flex-shrink-0 font-bold text-orange-600">5:00 PM</div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-1">Clean Up & Review</h4>
                  <p className="text-slate-600">Sanitize tools, log your hours, get feedback from your mentor barber</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What Happens After You Apply */}
        <section className="mb-16 bg-green-50 p-8 rounded-lg">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">What Happens After You Apply</h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold mr-4 flex-shrink-0">1</div>
              <div>
                <h4 className="font-semibold text-slate-900 mb-1">Within 24 Hours</h4>
                <p className="text-slate-600">An advisor calls you to discuss your goals and answer questions</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold mr-4 flex-shrink-0">2</div>
              <div>
                <h4 className="font-semibold text-slate-900 mb-1">Week 1</h4>
                <p className="text-slate-600">We help you apply for WIOA, WRG, or JRI funding (we handle the paperwork)</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold mr-4 flex-shrink-0">3</div>
              <div>
                <h4 className="font-semibold text-slate-900 mb-1">Week 2-3</h4>
                <p className="text-slate-600">Funding approved, we match you with a barbershop near you</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold mr-4 flex-shrink-0">4</div>
              <div>
                <h4 className="font-semibold text-slate-900 mb-1">Week 4</h4>
                <p className="text-slate-600">You start training and earning money on day one</p>
              </div>
            </div>
          </div>
          <p className="text-sm text-slate-600 mt-6 italic">
            Average time from application to first day: 3-4 weeks
          </p>
        </section>

        {/* Testimonials */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Success Stories</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-start mb-4">
                <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center text-2xl font-bold text-slate-600 mr-4">
                  MJ
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Marcus Johnson</h3>
                  <p className="text-sm text-slate-600">Class of 2024</p>
                </div>
              </div>
              <p className="text-slate-700 italic mb-4">
                "I went from working minimum wage to earning $45,000 my first year. The apprenticeship let me earn while I learned, so I never had to worry about bills. Now I'm opening my own shop."
              </p>
              <div className="text-sm text-orange-600 font-semibold">Now earning: $45K/year</div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-start mb-4">
                <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center text-2xl font-bold text-slate-600 mr-4">
                  TR
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Tasha Rodriguez</h3>
                  <p className="text-sm text-slate-600">Class of 2023</p>
                </div>
              </div>
              <p className="text-slate-700 italic mb-4">
                "I was skeptical about 'free training' but it's real. WIOA covered everything. I trained at a busy shop downtown and they hired me before I even graduated. Best decision I ever made."
              </p>
              <div className="text-sm text-orange-600 font-semibold">Now earning: $52K/year</div>
            </div>
          </div>
        </section>

        {/* How to Apply */}
        <section className="bg-orange-50 p-8 rounded-lg text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Let's Get You Started</h2>
          <p className="text-lg text-slate-700 mb-6">
            No experience needed. No money down. Just bring yourself and we'll handle the rest.
          </p>
          <Link 
            href="/apply" 
            className="inline-block bg-orange-500 text-white px-10 py-4 rounded-md font-semibold hover:bg-orange-600 transition-all text-lg"
          >
            Start Your Application
          </Link>
          <p className="text-sm text-slate-600 mt-4">
            Questions? Call us at (317) 123-4567 or stop by—we'd love to meet you.
          </p>
        </section>
      </div>
    </main>
  );
}
