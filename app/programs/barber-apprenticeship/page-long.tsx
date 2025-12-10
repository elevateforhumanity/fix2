import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle, Clock, DollarSign, TrendingUp, Zap, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Barber Apprenticeship Training | Elevate For Humanity',
  description: 'Start your barber apprenticeship career with free training. AI-powered learning, hands-on practice, and job placement support.',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/programs/barber-apprenticeship',
  },
};

export default function BarberApprenticeshipPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section with Video Banner */}
      <section className="relative h-[500px] sm:h-[600px] md:h-[700px] w-full overflow-hidden">
        {/* Video Background - NO OVERLAY */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/barber-hero.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Content */}
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
            <div className="max-w-4xl">
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-6 drop-shadow-2xl">
                Become a Licensed Barber
              </h1>
              <p className="text-2xl sm:text-3xl md:text-4xl text-white mb-4 drop-shadow-lg font-bold">
                Get PAID While You Learn
              </p>
              <p className="text-xl sm:text-2xl text-white/90 mb-8 drop-shadow-lg">
                Work in real barbershops. Earn money. Graduate debt-free.
              </p>
              
              {/* Clear Path Options */}
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 mb-6 shadow-2xl">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Choose Your Path:</h3>
                
                <div className="space-y-4">
                  {/* Option 1: Free Training */}
                  <div className="border-2 border-green-500 rounded-xl p-4 bg-green-50">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">OPTION 1</div>
                      <div className="text-2xl font-bold text-green-700">100% FREE</div>
                    </div>
                    <p className="text-slate-700 mb-3">
                      If you qualify for government funding (WIOA, WRG, or JRI), your training is completely free. No tuition. No debt. Ever.
                    </p>
                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center w-full px-8 py-4 text-lg font-bold text-white bg-green-600 rounded-full hover:bg-green-700 transition-all hover:scale-105 shadow-lg"
                    >
                      Apply for Free Training →
                    </Link>
                  </div>

                  {/* Option 2: Self-Pay */}
                  <div className="border-2 border-blue-500 rounded-xl p-4 bg-blue-50">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold">OPTION 2</div>
                      <div className="text-2xl font-bold text-blue-700">$4,890 Total</div>
                    </div>
                    <p className="text-slate-700 mb-2">
                      Don't qualify for free training? No problem. Pay $4,890 and start immediately.
                    </p>
                    <ul className="text-sm text-slate-600 mb-3 space-y-1">
                      <li>✓ Split into 13 payments (Affirm, Klarna, Afterpay)</li>
                      <li>✓ Use PayPal, Venmo, Cash App, or ACH</li>
                      <li>✓ Start earning money while training</li>
                      <li>✓ Includes FREE Milady RISE certification ($29.95 value)</li>
                    </ul>
                    <Link
                      href="/checkout/prog-barber-apprentice"
                      className="inline-flex items-center justify-center w-full px-8 py-4 text-lg font-bold text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-all hover:scale-105 shadow-lg"
                    >
                      Enroll Now - See Payment Options →
                    </Link>
                  </div>
                </div>
              </div>

              <p className="text-center text-white text-sm drop-shadow">
                Questions? Call us at <a href="tel:3173143757" className="font-bold underline">(317) 314-3757</a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - Earn While You Learn */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Here's How It Works
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              This isn't classroom-only training. You'll work in real barbershops, serve real clients, and earn real money while completing your 2,000 hours.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Step 1 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="bg-orange-500 text-white w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold mb-4">
                1
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Enroll & Start Learning</h3>
              <p className="text-slate-600 mb-4">
                Complete online coursework at your own pace. Learn theory, safety, sanitation, and techniques through our AI-powered platform.
              </p>
              <div className="text-sm text-slate-500">
                <Clock className="w-4 h-4 inline mr-1" />
                Flexible schedule - study anytime
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="bg-green-500 text-white w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold mb-4">
                2
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Work in Barbershops</h3>
              <p className="text-slate-600 mb-4">
                We connect you with licensed barbershops where you'll work under a master barber. You'll practice on real clients and earn money.
              </p>
              <div className="text-sm text-slate-500">
                <DollarSign className="w-4 h-4 inline mr-1" />
                Earn tips + hourly pay while training
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="bg-blue-500 text-white w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold mb-4">
                3
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Get Licensed & Hired</h3>
              <p className="text-slate-600 mb-4">
                After 2,000 hours, take your state licensing exam. We help you find full-time employment at top barbershops.
              </p>
              <div className="text-sm text-slate-500">
                <TrendingUp className="w-4 h-4 inline mr-1" />
                Average starting salary: $35K-$50K
              </div>
            </div>
          </div>

          {/* Key Stats */}
          <div className="bg-white rounded-2xl p-8 shadow-xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-4xl font-bold text-orange-500 mb-2">2,000</div>
                <div className="text-sm text-slate-600">Training Hours</div>
                <div className="text-xs text-slate-500">12-18 months</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-green-500 mb-2">$0</div>
                <div className="text-sm text-slate-600">Student Debt</div>
                <div className="text-xs text-slate-500">If you qualify for free training</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-blue-500 mb-2">100%</div>
                <div className="text-sm text-slate-600">Job Placement</div>
                <div className="text-xs text-slate-500">We don't stop until you're hired</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-purple-500 mb-2">$45K</div>
                <div className="text-sm text-slate-600">Avg. First Year</div>
                <div className="text-xs text-slate-500">Salary + tips</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Inspirational Story Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 to-slate-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="/images/gallery/image7.jpg"
            alt="Success story background"
            fill
            className="object-cover"
          />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Your Past Doesn't Define Your Future
            </h2>
            <p className="text-xl md:text-2xl mb-8 leading-relaxed">
              Maybe you've been turned down for jobs. Maybe you're working two jobs and still can't pay rent. 
              Maybe you're coming home from incarceration and nobody will give you a chance.
            </p>
            <p className="text-2xl md:text-3xl font-bold mb-8 text-orange-400">
              We see your potential, not your past.
            </p>
            <p className="text-lg md:text-xl mb-12 leading-relaxed">
              This program was built for people who deserve a second chance. No judgment. No barriers. 
              Just real training, real skills, and real jobs waiting for you on the other side.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-10 py-5 text-xl font-bold text-slate-900 bg-white rounded-full hover:bg-gray-100 transition-all hover:scale-105 shadow-2xl"
              >
                I'm Ready to Start
              </Link>
              <Link
                href="tel:3173143757"
                className="inline-flex items-center justify-center px-10 py-5 text-xl font-bold text-white bg-orange-500 rounded-full hover:bg-orange-600 transition-all hover:scale-105 shadow-2xl border-2 border-white"
              >
                Call Us: (317) 314-3757
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Funding Options - Detailed */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              How to Pay for Training
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              We've made it easy to afford this program. Choose the option that works best for you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Free Training Option */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 border-2 border-green-500 shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-green-500 text-white px-4 py-2 rounded-full text-lg font-bold">
                  100% FREE
                </div>
                <div className="text-sm text-green-700 font-semibold">Most Popular</div>
              </div>
              
              <h3 className="text-3xl font-bold text-slate-900 mb-4">
                Government-Funded Training
              </h3>
              
              <p className="text-lg text-slate-700 mb-6">
                If you qualify for WIOA, Workforce Ready Grant (WRG), or Justice Reinvestment Initiative (JRI) funding, 
                your entire training is paid for by the government. Zero cost to you.
              </p>

              <div className="bg-white rounded-xl p-6 mb-6">
                <h4 className="font-bold text-slate-900 mb-3">You May Qualify If You:</h4>
                <ul className="space-y-2 text-slate-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Are unemployed or underemployed</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Live in Marion County or surrounding Indiana counties</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Are eligible to work in the US</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Have been impacted by the justice system (JRI)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Meet income requirements (we'll help you check)</span>
                  </li>
                </ul>
              </div>

              <Link
                href="/contact"
                className="block w-full text-center px-8 py-4 bg-green-600 text-white text-lg font-bold rounded-full hover:bg-green-700 transition-all hover:scale-105 shadow-lg"
              >
                Apply for Free Training →
              </Link>
              
              <p className="text-sm text-slate-600 text-center mt-4">
                We'll check your eligibility and help you apply for funding
              </p>
            </div>

            {/* Self-Pay Option */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 border-2 border-blue-500 shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-blue-500 text-white px-4 py-2 rounded-full text-lg font-bold">
                  $4,890
                </div>
                <div className="text-sm text-blue-700 font-semibold">Start Immediately</div>
              </div>
              
              <h3 className="text-3xl font-bold text-slate-900 mb-4">
                Self-Pay with Financing
              </h3>
              
              <p className="text-lg text-slate-700 mb-6">
                Don't qualify for free training? No problem. Pay $4,890 total and start your training right away. 
                We offer flexible payment options so you can afford it.
              </p>

              <div className="bg-white rounded-xl p-6 mb-6">
                <h4 className="font-bold text-slate-900 mb-3">Payment Options:</h4>
                <ul className="space-y-3 text-slate-700">
                  <li className="flex items-start gap-2">
                    <DollarSign className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold">Buy Now, Pay Later</div>
                      <div className="text-sm text-slate-600">Split into 13 payments with Affirm, Klarna, or Afterpay</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <DollarSign className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold">Digital Wallets</div>
                      <div className="text-sm text-slate-600">PayPal, Venmo, Cash App Pay</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <DollarSign className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold">Bank Transfer</div>
                      <div className="text-sm text-slate-600">ACH Direct Debit from your checking account</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <DollarSign className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold">Credit/Debit Cards</div>
                      <div className="text-sm text-slate-600">All major cards accepted</div>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-orange-100 border-2 border-orange-400 rounded-xl p-4 mb-6">
                <p className="text-sm font-bold text-orange-900 mb-2">💰 BONUS INCLUDED:</p>
                <p className="text-sm text-orange-800">
                  FREE Milady RISE Certification ($29.95 value) - Professional safety & client care certification
                </p>
              </div>

              <Link
                href="/checkout/prog-barber-apprentice"
                className="block w-full text-center px-8 py-4 bg-blue-600 text-white text-lg font-bold rounded-full hover:bg-blue-700 transition-all hover:scale-105 shadow-lg"
              >
                See All Payment Options →
              </Link>
              
              <p className="text-sm text-slate-600 text-center mt-4">
                Start earning money while training - offset your tuition!
              </p>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-8 text-center text-white shadow-2xl">
            <h3 className="text-3xl font-bold mb-4">Not Sure Which Option Is Right for You?</h3>
            <p className="text-xl mb-6">
              Call us at <a href="tel:3173143757" className="font-bold underline">(317) 314-3757</a> and we'll help you figure it out. 
              No pressure, no sales pitch—just honest advice about what works best for your situation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-orange-600 bg-white rounded-full hover:bg-gray-100 transition-all hover:scale-105 shadow-lg"
              >
                Apply Now
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-transparent border-2 border-white rounded-full hover:bg-white hover:text-orange-600 transition-all hover:scale-105"
              >
                Talk to an Advisor
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Real Success Story with Image */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/testimonials/student-marcus.jpg"
                alt="Marcus - Barber Graduate Success Story"
                fill
                className="object-cover"
                quality={100}
              />
            </div>
            <div>
              <div className="text-orange-500 font-bold text-sm uppercase tracking-wider mb-3">
                Success Story
              </div>
              <h2 className="text-4xl font-bold text-slate-900 mb-6">
                "I Went From Unemployed to Making $50K a Year"
              </h2>
              <p className="text-xl text-slate-700 mb-6 leading-relaxed">
                "I was unemployed for 18 months after getting out. Nobody would hire me. Elevate didn't just train me—they believed in me. 
                Now I'm a licensed barber making $50,000 a year, and I can finally support my family."
              </p>
              <div className="bg-white rounded-xl p-6 mb-6 shadow-lg">
                <div className="font-bold text-slate-900 mb-2">Marcus, Age 34</div>
                <div className="text-slate-600 text-sm mb-4">Barber Apprenticeship Graduate, Class of 2023</div>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-orange-500">18 months</div>
                    <div className="text-xs text-slate-600">Unemployed before</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-500">$50K</div>
                    <div className="text-xs text-slate-600">Annual income now</div>
                  </div>
                </div>
              </div>
              <Link
                href="/contact"
                className="inline-block px-8 py-4 bg-orange-500 text-white font-bold rounded-full hover:bg-orange-600 transition-all hover:scale-105 shadow-lg"
              >
                Start Your Success Story
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* What You'll Learn - Detailed Curriculum */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              What You'll Actually Learn
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              This isn't just theory. You'll master real skills that clients pay for—from classic cuts to modern fades, beard grooming to straight razor shaves.
            </p>
          </div>

          {/* Timeline Overview */}
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-8 mb-12 border-2 border-orange-300">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-5xl font-bold text-orange-600 mb-2">2,000</div>
                <div className="text-lg font-semibold text-slate-900 mb-1">Total Hours</div>
                <div className="text-sm text-slate-600">State requirement for licensing</div>
              </div>
              <div>
                <div className="text-5xl font-bold text-orange-600 mb-2">12-18</div>
                <div className="text-lg font-semibold text-slate-900 mb-1">Months</div>
                <div className="text-sm text-slate-600">Complete at your own pace</div>
              </div>
              <div>
                <div className="text-5xl font-bold text-orange-600 mb-2">100%</div>
                <div className="text-lg font-semibold text-slate-900 mb-1">Hands-On</div>
                <div className="text-sm text-slate-600">Work with real clients in real shops</div>
              </div>
            </div>
          </div>

          {/* Curriculum Modules */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Module 1 */}
            <div className="bg-white border-2 border-slate-200 rounded-2xl p-8 hover:border-orange-400 transition-all hover:shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-orange-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">
                  1
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Foundations (Months 1-3)</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold text-slate-900">Barbering History & Ethics</div>
                    <div className="text-sm text-slate-600">Understand the profession and professional standards</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold text-slate-900">Safety & Sanitation</div>
                    <div className="text-sm text-slate-600">State board requirements, infection control, sterilization</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold text-slate-900">Tools & Equipment</div>
                    <div className="text-sm text-slate-600">Clippers, trimmers, scissors, razors—how to use and maintain them</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold text-slate-900">Basic Cutting Techniques</div>
                    <div className="text-sm text-slate-600">Clipper work, scissor cuts, blending fundamentals</div>
                  </div>
                </li>
              </ul>
            </div>

            {/* Module 2 */}
            <div className="bg-white border-2 border-slate-200 rounded-2xl p-8 hover:border-orange-400 transition-all hover:shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-orange-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">
                  2
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Core Skills (Months 4-8)</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold text-slate-900">Classic Haircuts</div>
                    <div className="text-sm text-slate-600">Tapers, fades, crew cuts, flat tops, pompadours</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold text-slate-900">Modern Styles</div>
                    <div className="text-sm text-slate-600">Skin fades, drop fades, burst fades, textured cuts</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold text-slate-900">Beard Grooming</div>
                    <div className="text-sm text-slate-600">Trimming, shaping, line-ups, beard design</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold text-slate-900">Straight Razor Shaves</div>
                    <div className="text-sm text-slate-600">Hot towel prep, lather application, shaving techniques</div>
                  </div>
                </li>
              </ul>
            </div>

            {/* Module 3 */}
            <div className="bg-white border-2 border-slate-200 rounded-2xl p-8 hover:border-orange-400 transition-all hover:shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-orange-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">
                  3
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Advanced Techniques (Months 9-12)</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold text-slate-900">Hair & Scalp Science</div>
                    <div className="text-sm text-slate-600">Hair types, growth patterns, scalp conditions, treatments</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold text-slate-900">Color & Chemical Services</div>
                    <div className="text-sm text-slate-600">Hair coloring, highlights, relaxers (where licensed)</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold text-slate-900">Specialty Cuts</div>
                    <div className="text-sm text-slate-600">Kids cuts, senior cuts, ethnic hair textures</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold text-slate-900">Design & Artistry</div>
                    <div className="text-sm text-slate-600">Hair designs, patterns, creative line work</div>
                  </div>
                </li>
              </ul>
            </div>

            {/* Module 4 */}
            <div className="bg-white border-2 border-slate-200 rounded-2xl p-8 hover:border-orange-400 transition-all hover:shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-orange-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">
                  4
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Business & Career (Months 13-18)</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold text-slate-900">Client Communication</div>
                    <div className="text-sm text-slate-600">Consultations, managing expectations, building loyalty</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold text-slate-900">Business Skills</div>
                    <div className="text-sm text-slate-600">Pricing, booking, retail sales, booth rental basics</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold text-slate-900">State Board Prep</div>
                    <div className="text-sm text-slate-600">Practice exams, practical test preparation</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold text-slate-900">Job Placement Support</div>
                    <div className="text-sm text-slate-600">Resume, portfolio, interview prep, shop connections</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Bonus Certification */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white text-center">
            <h3 className="text-3xl font-bold mb-4">BONUS: FREE Milady RISE Certification</h3>
            <p className="text-xl mb-6 max-w-3xl mx-auto">
              Every student gets FREE access to Milady's professional certification program ($29.95 value). 
              Learn client safety, domestic violence awareness, human trafficking recognition, and infection control.
            </p>
            <div className="inline-block bg-white text-blue-700 px-6 py-3 rounded-full font-bold">
              Included with your enrollment
            </div>
          </div>
        </div>
      </section>

      {/* AI-Powered Learning */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Your Personal AI Instructor
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Never feel stuck or alone. Get instant help, personalized guidance, and encouragement 24/7
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <Zap className="w-12 h-12 text-blue-500 mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">Available 24/7</h3>
              <p className="text-slate-600">
                Questions at 2am? Your AI instructor is always awake and ready to help you succeed
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <Users className="w-12 h-12 text-purple-500 mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">Personalized Learning</h3>
              <p className="text-slate-600">
                Learn at your own pace with a curriculum that adapts to your needs and progress
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <TrendingUp className="w-12 h-12 text-green-500 mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">Instant Feedback</h3>
              <p className="text-slate-600">
                Get immediate answers, corrections, and encouragement to keep you moving forward
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Your Learning Journey
            </h2>
            <p className="text-xl text-slate-600">
              Four simple steps to your new career
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Apply Free</h3>
              <p className="text-slate-600">
                Simple 5-minute application. No experience needed. Get accepted in 24 hours.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Learn Online</h3>
              <p className="text-slate-600">
                Self-paced video lessons with AI instructor support available 24/7.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Hands-On Practice</h3>
              <p className="text-slate-600">
                Real equipment and tools at local training facilities with expert supervision.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                4
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Get Hired</h3>
              <p className="text-slate-600">
                Earn your credential and get job placement support to start your career.
              </p>
            </div>
          </div>
          <div className="text-center mt-12">
            <Link
              href="/contact"
              className="inline-block px-10 py-5 bg-orange-500 text-white text-xl font-bold rounded-full hover:bg-orange-600 transition-all hover:scale-105 shadow-xl"
            >
              Start Step 1 - Apply Now
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-32 overflow-hidden">
        <Image
          src="/images/gallery/image6.jpg"
          alt="Start your career"
          fill
          className="object-cover"
          quality={100}
        
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-5xl font-bold text-white mb-6">
            Ready to Start Your New Career?
          </h2>
          <p className="text-2xl text-white mb-8">
            Join students learning barber apprenticeship with free training and AI support
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-block px-12 py-6 bg-orange-500 text-white text-2xl font-bold rounded-full hover:bg-orange-600 transition-all hover:scale-105 shadow-2xl"
            >
              Apply Now - It's Free
            </Link>
            <Link
              href="/contact"
              className="inline-block px-12 py-6 bg-white text-slate-900 text-2xl font-bold rounded-full hover:bg-slate-100 transition-all hover:scale-105 shadow-2xl"
            >
              Questions? Contact Us
            </Link>
          </div>
          <p className="text-white mt-6 text-lg">
            Application takes 5 minutes • Get started today • Call 317-314-3757
          </p>
        </div>
      </section>
    </main>
  );
}
