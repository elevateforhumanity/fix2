// app/page.tsx - Industrious-Style Homepage with Full WIOA/WRG Story
import EnrollmentProcess from '@/components/EnrollmentProcess';
import Link from "next/link";
import Image from "next/image";
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { CountUp } from '@/components/animations/CountUp';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Top Banner - Urgent Message */}
      <section className="bg-orange-600 text-white py-2 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm font-semibold">
            🎓 100% Government-Funded Training • Earn $15-20/Hour While You Learn • No Tuition, No Debt
          </p>
        </div>
      </section>

      {/* HERO - Clean, Minimal, Industrious Style */}
      <section className="relative h-[600px] sm:h-[700px] w-full overflow-hidden bg-gradient-to-br from-blue-600 to-blue-800">
        <div className="absolute inset-0">
          <Image
            src="/media-backup-20251128-043832/hero-elevate-learners.jpg"
            alt="Career training that changes lives"
            fill
            className="object-cover brightness-105"
            priority
            quality={95}
            sizes="100vw"
            unoptimized
          />
        </div>
        {/* Minimal overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-black/20"></div>
        
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
            {/* Simple, powerful headline */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
              The <em className="italic">best</em> career training, period.
            </h1>
            
            {/* Clear value proposition */}
            <p className="text-xl sm:text-2xl text-white mb-8 font-light max-w-3xl mx-auto">
              100% government-funded training. Earn while you learn. No tuition, no debt.
            </p>
            
            {/* Single, clear CTA */}
            <div className="mb-12">
              <Link
                href="/apply"
                className="inline-block px-12 py-5 bg-orange-600 text-white font-bold text-xl rounded-full hover:bg-orange-700 transition-all shadow-2xl hover:scale-105"
              >
                Check Your Eligibility →
              </Link>
            </div>

            {/* Clean stats */}
            <div className="flex flex-wrap justify-center gap-12 text-white">
              <div className="text-center">
                <div className="text-5xl font-bold mb-1">33</div>
                <div className="text-sm font-light">Career Programs</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold mb-1">$0</div>
                <div className="text-sm font-light">Tuition Cost</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold mb-1">$15-20/hr</div>
                <div className="text-sm font-light">While Training</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT WE DO - Simple Explanation */}
      <ScrollReveal>
        <section className="py-16 px-4 bg-white">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Government-funded career training for everyone
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Through WIOA (Workforce Innovation and Opportunity Act) and WRG (Workforce Readiness Grant), 
              we connect you with 100% free training in high-demand careers. Most people qualify.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* PROGRAMS - Clean Grid, Industrious Style */}
      <ScrollReveal>
        <section className="py-16 px-4 bg-slate-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                Career training for teams of all sizes
              </h2>
              <p className="text-xl text-slate-600">
                From healthcare to skilled trades, find the right path for you
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Healthcare */}
              <Link href="/programs?category=healthcare" className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all">
                <div className="relative h-64">
                  <Image
                    src="/media-backup-20251128-043832/programs/healthcare-hd.jpg"
                    alt="Healthcare careers"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-3">Healthcare</h3>
                  <p className="text-slate-600 mb-4">
                    CNA, Medical Assistant, Phlebotomy, and more. Start earning $35K-45K per year.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center gap-2 text-sm">
                      <svg className="w-5 h-5 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                      4-12 weeks training
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <svg className="w-5 h-5 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                      Clinical placement included
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <svg className="w-5 h-5 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                      100% free through WIOA
                    </li>
                  </ul>
                  <div className="text-orange-600 font-bold">
                    View Healthcare Programs →
                  </div>
                </div>
              </Link>

              {/* Skilled Trades */}
              <Link href="/programs?category=trades" className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all">
                <div className="relative h-64">
                  <Image
                    src="/media-backup-20251128-043832/programs/welding-hd.jpg"
                    alt="Skilled trades careers"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-3">Skilled Trades</h3>
                  <p className="text-slate-600 mb-4">
                    Welding, HVAC, Electrical, Plumbing. DOL-registered apprenticeships available.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center gap-2 text-sm">
                      <svg className="w-5 h-5 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                      Earn $15-20/hour while training
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <svg className="w-5 h-5 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                      On-the-job training
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <svg className="w-5 h-5 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                      Nationally recognized credentials
                    </li>
                  </ul>
                  <div className="text-orange-600 font-bold">
                    View Trades Programs →
                  </div>
                </div>
              </Link>

              {/* Beauty & Barber */}
              <Link href="/programs?category=beauty" className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all">
                <div className="relative h-64">
                  <Image
                    src="/media-backup-20251128-043832/programs/barber.jpg"
                    alt="Beauty and barber careers"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-3">Beauty & Barber</h3>
                  <p className="text-slate-600 mb-4">
                    Cosmetology, Barbering, Esthetics. State-licensed programs with apprenticeships.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center gap-2 text-sm">
                      <svg className="w-5 h-5 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                      Earn while you learn
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <svg className="w-5 h-5 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                      State licensing exam prep
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <svg className="w-5 h-5 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                      Own your own business
                    </li>
                  </ul>
                  <div className="text-orange-600 font-bold">
                    View Beauty Programs →
                  </div>
                </div>
              </Link>
            </div>

            <div className="text-center mt-12">
              <Link
                href="/programs"
                className="inline-block px-10 py-4 bg-orange-600 text-white font-bold text-lg rounded-full hover:bg-orange-700 transition-all"
              >
                Explore All 33 Programs
              </Link>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* TRUSTED BY - Social Proof */}
      <section className="py-16 px-4 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-sm text-slate-500 mb-8 uppercase tracking-wider">
            Approved and Funded By
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-60">
            <div className="text-2xl font-bold text-slate-700">U.S. Department of Labor</div>
            <div className="text-2xl font-bold text-slate-700">WIOA</div>
            <div className="text-2xl font-bold text-slate-700">WRG</div>
            <div className="text-2xl font-bold text-slate-700">State Workforce Boards</div>
          </div>
        </div>
      </section>

      {/* VALUE PROPS - Clean, Minimal */}
      <ScrollReveal>
        <section className="py-16 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-3 gap-16">
              {/* Prop 1 */}
              <div>
                <div className="relative h-64 mb-6 rounded-lg overflow-hidden">
                  <Image
                    src="/media-backup-20251128-043832/hero-elevate-learners.jpg"
                    alt="Success is the training you receive"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-2xl font-bold mb-4">Success is the training you receive</h3>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Thoroughly professional and thoughtfully designed, our training programs support learners of all backgrounds — 
                  from career changers to first-time job seekers. And thanks to government funding, it's 100% free.
                </p>
                <Link href="/programs" className="text-orange-600 font-bold hover:underline">
                  See Programs →
                </Link>
              </div>

              {/* Prop 2 */}
              <div>
                <div className="relative h-64 mb-6 rounded-lg overflow-hidden">
                  <Image
                    src="/media-backup-20251128-043832/students-hero.jpg"
                    alt="Earn while you learn"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-2xl font-bold mb-4">Earn while you learn</h3>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Through DOL-registered apprenticeships, you can earn $15-20 per hour while training. 
                  That's $2,400-$3,200 per month while building your new career.
                </p>
                <Link href="/programs?type=apprenticeship" className="text-orange-600 font-bold hover:underline">
                  View Apprenticeships →
                </Link>
              </div>

              {/* Prop 3 */}
              <div>
                <div className="relative h-64 mb-6 rounded-lg overflow-hidden">
                  <Image
                    src="/media-backup-20251128-043832/homepage-hero.jpg"
                    alt="Training that works from anywhere"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-2xl font-bold mb-4">Training that works from anywhere</h3>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Whether you're in the city or suburbs, we have training locations near you. 
                  Our programs are available across multiple states with flexible schedules.
                </p>
                <Link href="/locations" className="text-orange-600 font-bold hover:underline">
                  View Locations →
                </Link>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* TESTIMONIALS - Clean Design */}
      <ScrollReveal>
        <section className="py-24 px-4 bg-slate-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16">See what our graduates are saying</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  ))}
                </div>
                <p className="text-slate-700 mb-6 leading-relaxed">
                  "I was unemployed for 8 months. WIOA paid for my CNA training, and I earned $18/hour during my apprenticeship. 
                  Now I'm making $42,000 a year with full benefits."
                </p>
                <div className="font-bold">Sarah M.</div>
                <div className="text-sm text-slate-500">CNA Graduate, 2024</div>
              </div>

              <div className="bg-white p-8 rounded-lg">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  ))}
                </div>
                <p className="text-slate-700 mb-6 leading-relaxed">
                  "The barber apprenticeship changed my life. I earned while I learned, graduated debt-free, 
                  and now I own my own shop. Best decision I ever made."
                </p>
                <div className="font-bold">Marcus J.</div>
                <div className="text-sm text-slate-500">Barber Graduate, 2023</div>
              </div>

              <div className="bg-white p-8 rounded-lg">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  ))}
                </div>
                <p className="text-slate-700 mb-6 leading-relaxed">
                  "I was working minimum wage with no future. WRG funded my welding training. 
                  Now I make $55,000 a year and have a career I'm proud of."
                </p>
                <div className="font-bold">David R.</div>
                <div className="text-sm text-slate-500">Welding Graduate, 2024</div>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* FINAL CTA - Clean, Simple */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Ready to start your new career?
          </h2>
          <p className="text-xl text-slate-600 mb-8">
            Check your eligibility in under 5 minutes. Most people qualify for 100% free training.
          </p>
          <Link
            href="/apply"
            className="inline-block px-12 py-5 bg-orange-600 text-white font-bold text-xl rounded-full hover:bg-orange-700 transition-all shadow-2xl hover:scale-105"
          >
            Apply Now - It's Free
          </Link>
          <p className="mt-6 text-sm text-slate-500">
            Questions? Call (555) 123-4567 or email info@elevateforhumanity.org
          </p>
        </div>
      </section>

      {/* Enrollment Process */}
      <EnrollmentProcess />
    </main>
  );
}
