// app/page.tsx - Humanized Homepage That Tells Your Story
import EnrollmentProcess from '@/components/EnrollmentProcess';
import Link from "next/link";
import Image from "next/image";
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { CountUp } from '@/components/animations/CountUp';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Urgent Banner */}
      <section className="bg-orange-600 text-white py-3 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm sm:text-base font-semibold">
            🎓 Government-Funded Training • No Cost to You • Start Earning While You Learn
          </p>
        </div>
      </section>

      {/* HERO - Tell the Story */}
      <section className="relative h-[700px] sm:h-[800px] w-full overflow-hidden bg-white">
        <div className="absolute inset-0">
          <Image
            src="/media-backup-20251128-043832/homepage-hero.jpg"
            alt="Real people building real careers through government-funded training"
            fill
            className="object-cover brightness-110"
            priority
            quality={95}
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/30"></div>
        
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight">
              Get Paid to Learn a New Career
            </h1>
            
            <p className="text-xl sm:text-2xl md:text-3xl text-white font-bold mb-4">
              100% Government-Funded Training
            </p>
            
            <p className="text-lg sm:text-xl text-gray-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Through WIOA, WRG, and DOL-registered apprenticeships, you can earn $15-20/hour while learning a skilled trade. 
              No tuition. No debt. Just real training that leads to real careers.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link
                href="/apply"
                className="px-10 py-5 bg-orange-600 text-white font-bold text-xl rounded-full hover:bg-orange-700 transition-all shadow-2xl hover:scale-105"
              >
                Check Your Eligibility →
              </Link>
              <Link
                href="/programs"
                className="px-10 py-5 bg-white text-slate-900 font-bold text-xl rounded-full hover:bg-gray-100 transition-all shadow-2xl hover:scale-105"
              >
                See All Programs
              </Link>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 text-white">
              <div className="text-center">
                <div className="text-4xl sm:text-5xl font-black text-orange-500">
                  <CountUp end={33} />
                </div>
                <div className="text-sm text-gray-200">Career Programs</div>
              </div>
              <div className="text-center">
                <div className="text-4xl sm:text-5xl font-black text-orange-500">
                  <CountUp end={0} prefix="$" />
                </div>
                <div className="text-sm text-gray-200">Out of Pocket</div>
              </div>
              <div className="text-center">
                <div className="text-4xl sm:text-5xl font-black text-orange-500">
                  <CountUp end={15} prefix="$" />-<CountUp end={20} />
                </div>
                <div className="text-sm text-gray-200">Per Hour While Training</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS - Clear Process */}
      <ScrollReveal>
        <section className="py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                How It Works
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                We connect you with government-funded training programs. Here's exactly what happens:
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              {/* Step 1 */}
              <div className="text-center">
                <div className="w-20 h-20 bg-orange-600 text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4">
                  1
                </div>
                <h3 className="text-xl font-bold mb-3">Check Eligibility</h3>
                <p className="text-slate-600">
                  Most people qualify for WIOA or WRG funding. We'll check if you're eligible in under 5 minutes.
                </p>
              </div>

              {/* Step 2 */}
              <div className="text-center">
                <div className="w-20 h-20 bg-orange-600 text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4">
                  2
                </div>
                <h3 className="text-xl font-bold mb-3">Choose Your Path</h3>
                <p className="text-slate-600">
                  Pick from 33 career programs in healthcare, skilled trades, IT, beauty, and more.
                </p>
              </div>

              {/* Step 3 */}
              <div className="text-center">
                <div className="w-20 h-20 bg-orange-600 text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4">
                  3
                </div>
                <h3 className="text-xl font-bold mb-3">Start Training</h3>
                <p className="text-slate-600">
                  Begin your DOL-registered apprenticeship or training program. Earn $15-20/hour while you learn.
                </p>
              </div>

              {/* Step 4 */}
              <div className="text-center">
                <div className="w-20 h-20 bg-orange-600 text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4">
                  4
                </div>
                <h3 className="text-xl font-bold mb-3">Get Hired</h3>
                <p className="text-slate-600">
                  Graduate with industry certifications and job placement support. Start your new career.
                </p>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* WHAT IS WIOA/WRG - Explain It */}
      <ScrollReveal>
        <section className="py-20 px-4 bg-slate-50">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold text-slate-900 mb-6">
                  What is WIOA & WRG?
                </h2>
                <p className="text-lg text-slate-700 mb-4">
                  <strong>WIOA (Workforce Innovation and Opportunity Act)</strong> is a federal program that pays for your training. 
                  If you're unemployed, underemployed, or looking to change careers, you likely qualify.
                </p>
                <p className="text-lg text-slate-700 mb-4">
                  <strong>WRG (Workforce Readiness Grant)</strong> provides additional funding for specific high-demand careers 
                  like healthcare, skilled trades, and technology.
                </p>
                <p className="text-lg text-slate-700 mb-6">
                  Together, these programs cover 100% of your training costs. You pay nothing out of pocket.
                </p>
                <Link
                  href="/wioa-eligibility"
                  className="inline-block px-8 py-4 bg-orange-600 text-white font-bold rounded-lg hover:bg-orange-700 transition"
                >
                  Check If You Qualify →
                </Link>
              </div>
              <div className="relative h-96">
                <Image
                  src="/media-backup-20251128-043832/state-funding-hero.jpg"
                  alt="Government funding for career training"
                  fill
                  className="object-cover rounded-lg shadow-xl"
                />
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* EARN WHILE YOU LEARN - The Big Benefit */}
      <ScrollReveal>
        <section className="py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                Earn While You Learn
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Unlike traditional schools, our DOL-registered apprenticeships pay you to train.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-slate-50 p-8 rounded-lg">
                <div className="text-5xl font-black text-orange-600 mb-4">$15-20</div>
                <h3 className="text-xl font-bold mb-3">Per Hour While Training</h3>
                <p className="text-slate-600">
                  Apprenticeships pay you $15-20/hour while you learn on the job. That's $2,400-$3,200 per month.
                </p>
              </div>

              <div className="bg-slate-50 p-8 rounded-lg">
                <div className="text-5xl font-black text-orange-600 mb-4">$35K-65K</div>
                <h3 className="text-xl font-bold mb-3">Starting Salary After</h3>
                <p className="text-slate-600">
                  Graduates earn $35,000-$65,000 per year in their new careers. Many earn more with experience.
                </p>
              </div>

              <div className="bg-slate-50 p-8 rounded-lg">
                <div className="text-5xl font-black text-orange-600 mb-4">$0</div>
                <h3 className="text-xl font-bold mb-3">Student Debt</h3>
                <p className="text-slate-600">
                  No tuition means no student loans. You graduate debt-free and ready to earn.
                </p>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* PROGRAMS - Organized by Category */}
      <ScrollReveal>
        <section className="py-20 px-4 bg-slate-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                Choose Your Career Path
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                All programs are WIOA-approved and include job placement support.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Healthcare */}
              <Link href="/programs?category=healthcare" className="group">
                <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all">
                  <div className="relative h-48">
                    <Image
                      src="/media-backup-20251128-043832/programs/healthcare-hd.jpg"
                      alt="Healthcare careers"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-2">Healthcare</h3>
                    <p className="text-slate-600 mb-4">
                      CNA, Medical Assistant, Phlebotomy, Dental Assistant, and more
                    </p>
                    <div className="text-orange-600 font-bold">
                      8 Programs Available →
                    </div>
                  </div>
                </div>
              </Link>

              {/* Skilled Trades */}
              <Link href="/programs?category=trades" className="group">
                <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all">
                  <div className="relative h-48">
                    <Image
                      src="/media-backup-20251128-043832/programs/welding-hd.jpg"
                      alt="Skilled trades careers"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-2">Skilled Trades</h3>
                    <p className="text-slate-600 mb-4">
                      Welding, HVAC, Electrical, Plumbing, Construction, and more
                    </p>
                    <div className="text-orange-600 font-bold">
                      10 Programs Available →
                    </div>
                  </div>
                </div>
              </Link>

              {/* Beauty & Barber */}
              <Link href="/programs?category=beauty" className="group">
                <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all">
                  <div className="relative h-48">
                    <Image
                      src="/media-backup-20251128-043832/programs/barber.jpg"
                      alt="Beauty and barber careers"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-2">Beauty & Barber</h3>
                    <p className="text-slate-600 mb-4">
                      Cosmetology, Barbering, Esthetics, Nail Technology
                    </p>
                    <div className="text-orange-600 font-bold">
                      4 Programs Available →
                    </div>
                  </div>
                </div>
              </Link>

              {/* Transportation */}
              <Link href="/programs?category=transportation" className="group">
                <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all">
                  <div className="relative h-48">
                    <Image
                      src="/media-backup-20251128-043832/programs/cdl-hd.jpg"
                      alt="Transportation careers"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-2">Transportation</h3>
                    <p className="text-slate-600 mb-4">
                      CDL (Commercial Driver's License), Forklift Operator
                    </p>
                    <div className="text-orange-600 font-bold">
                      2 Programs Available →
                    </div>
                  </div>
                </div>
              </Link>

              {/* IT & Technology */}
              <Link href="/programs?category=technology" className="group">
                <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all">
                  <div className="relative h-48">
                    <Image
                      src="/media-backup-20251128-043832/programs/it-hd.jpg"
                      alt="IT and technology careers"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-2">IT & Technology</h3>
                    <p className="text-slate-600 mb-4">
                      IT Support, Cybersecurity, Network Administration
                    </p>
                    <div className="text-orange-600 font-bold">
                      3 Programs Available →
                    </div>
                  </div>
                </div>
              </Link>

              {/* Business & Professional */}
              <Link href="/programs?category=business" className="group">
                <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all">
                  <div className="relative h-48">
                    <Image
                      src="/media-backup-20251128-043832/programs/tax-prep-hd.jpg"
                      alt="Business and professional careers"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-2">Business & Professional</h3>
                    <p className="text-slate-600 mb-4">
                      Tax Preparation (VITA), Medical Billing, Office Administration
                    </p>
                    <div className="text-orange-600 font-bold">
                      6 Programs Available →
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            <div className="text-center mt-12">
              <Link
                href="/programs"
                className="inline-block px-10 py-5 bg-orange-600 text-white font-bold text-xl rounded-full hover:bg-orange-700 transition-all shadow-2xl hover:scale-105"
              >
                View All 33 Programs →
              </Link>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* WHO QUALIFIES - Clear Eligibility */}
      <ScrollReveal>
        <section className="py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                Who Qualifies for Free Training?
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Most people qualify for WIOA or WRG funding. You likely qualify if you are:
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <div className="flex items-start gap-4 bg-slate-50 p-6 rounded-lg">
                <div className="text-3xl">✓</div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Unemployed or Underemployed</h3>
                  <p className="text-slate-600">Looking for work or earning less than you need</p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-slate-50 p-6 rounded-lg">
                <div className="text-3xl">✓</div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Changing Careers</h3>
                  <p className="text-slate-600">Want to learn a new skill or switch industries</p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-slate-50 p-6 rounded-lg">
                <div className="text-3xl">✓</div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Low Income</h3>
                  <p className="text-slate-600">Household income below certain thresholds</p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-slate-50 p-6 rounded-lg">
                <div className="text-3xl">✓</div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Veteran</h3>
                  <p className="text-slate-600">Served in the U.S. military</p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-slate-50 p-6 rounded-lg">
                <div className="text-3xl">✓</div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Displaced Worker</h3>
                  <p className="text-slate-600">Lost your job due to layoffs or company closure</p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-slate-50 p-6 rounded-lg">
                <div className="text-3xl">✓</div>
                <div>
                  <h3 className="font-bold text-lg mb-2">18+ Years Old</h3>
                  <p className="text-slate-600">Adult learners ready for career training</p>
                </div>
              </div>
            </div>

            <div className="text-center mt-12">
              <Link
                href="/apply"
                className="inline-block px-10 py-5 bg-orange-600 text-white font-bold text-xl rounded-full hover:bg-orange-700 transition-all shadow-2xl hover:scale-105"
              >
                Check Your Eligibility Now →
              </Link>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* REAL STORIES - Testimonials */}
      <ScrollReveal>
        <section className="py-20 px-4 bg-slate-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                Real People, Real Results
              </h2>
              <p className="text-xl text-slate-600">
                Hear from graduates who changed their lives through our programs
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <p className="text-lg text-slate-700 mb-6 italic">
                  "I was unemployed for 8 months. WIOA paid for my CNA training, and I earned $18/hour during my apprenticeship. 
                  Now I'm a full-time nurse assistant making $42,000 a year with benefits."
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-orange-500 rounded-full"></div>
                  <div>
                    <div className="font-bold">Sarah M.</div>
                    <div className="text-sm text-slate-600">CNA Graduate, 2024</div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-lg">
                <p className="text-lg text-slate-700 mb-6 italic">
                  "The barber apprenticeship changed my life. I earned while I learned, graduated debt-free, 
                  and now I own my own shop. Best decision I ever made."
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-orange-500 rounded-full"></div>
                  <div>
                    <div className="font-bold">Marcus J.</div>
                    <div className="text-sm text-slate-600">Barber Graduate, 2023</div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-lg">
                <p className="text-lg text-slate-700 mb-6 italic">
                  "I was working minimum wage with no future. WRG funded my welding training. 
                  Now I make $55,000 a year and have a career I'm proud of."
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-orange-500 rounded-full"></div>
                  <div>
                    <div className="font-bold">David R.</div>
                    <div className="text-sm text-slate-600">Welding Graduate, 2024</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* FINAL CTA - Clear Next Steps */}
      <section className="py-20 px-4 bg-orange-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Start Your New Career?
          </h2>
          <p className="text-xl mb-8">
            Check your eligibility in under 5 minutes. Most people qualify for 100% free training.
          </p>
          <Link
            href="/apply"
            className="inline-block px-12 py-6 bg-white text-orange-600 font-bold text-xl rounded-full hover:bg-gray-100 transition-all shadow-2xl hover:scale-105"
          >
            Apply Now - It's Free →
          </Link>
          <p className="mt-6 text-sm opacity-90">
            Questions? Call us at (555) 123-4567 or email info@elevateforhumanity.org
          </p>
        </div>
      </section>

      {/* Enrollment Process Component */}
      <EnrollmentProcess />
    </main>
  );
}
