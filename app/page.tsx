import Link from 'next/link';
import Image from 'next/image';
import {
  CheckCircle,
  ArrowRight,
  Clock,
  DollarSign,
  Briefcase,
  Star,
  TrendingUp,
  Users,
  Award,
  Calendar,
} from 'lucide-react';
import { Header } from '@/components/ui/Header';
import { Footer } from '@/components/ui/Footer';

export default function HomePage() {
  const programs = [
    {
      id: 1,
      title: 'Certified Nursing Assistant (CNA)',
      category: 'Healthcare',
      duration: '6-8 weeks',
      startingSalary: '$32,000+',
      description:
        'Start your healthcare career in weeks, not years. Get hands-on training in real medical facilities. State certification included.',
      urgency: 'Next class starts Feb 5th - Only 8 spots left',
      highlights: [
        'Train in actual hospitals and nursing homes',
        'State certification exam included',
        'Job placement assistance guaranteed',
        'Financial aid available - most students pay $0',
      ],
      realBenefits: [
        'Work 3 days/week, earn full-time pay',
        'Hospitals hiring immediately after graduation',
        'Flexible schedules - perfect for parents',
        'Step into nursing degree programs',
      ],
      image: '/media/programs/healthcare-1.jpg',
      slug: 'cna',
      color: 'from-blue-600 to-cyan-600',
    },
    {
      id: 2,
      title: 'HVAC Technician',
      category: 'Skilled Trades',
      duration: '12 weeks',
      startingSalary: '$48,000+',
      description:
        'High-demand trade with immediate job openings. Master heating, cooling, and refrigeration. Start your own business or work for top companies.',
      urgency: 'Companies pre-hiring our graduates - Apply now',
      highlights: [
        'EPA certification included in training',
        'Work with real HVAC systems, not just books',
        'Tool kit provided - $2,000 value',
        'Partner companies hiring before graduation',
      ],
      realBenefits: [
        'Year-round work - AC in summer, heat in winter',
        'Start your own business after 2 years',
        'Overtime pay during peak seasons',
        'Technology-focused - smart home systems',
      ],
      image: '/media/programs/trades-1.jpg',
      slug: 'hvac',
      color: 'from-orange-600 to-red-600',
    },
    {
      id: 3,
      title: 'Barber Apprenticeship',
      category: 'Skilled Trades',
      duration: '12-18 months',
      startingSalary: '$35,000+',
      description:
        'Earn while you learn in a real barbershop. Build your clientele while training. State license and business skills included.',
      urgency: 'Barbershops waiting for apprentices - Limited spots',
      highlights: [
        'Get paid while training in real shops',
        'Build your client base from day one',
        'State license exam prep included',
        'Business and marketing training',
      ],
      realBenefits: [
        'Set your own schedule as licensed barber',
        'Cash tips on top of hourly pay',
        'Rent a chair or open your own shop',
        'Recession-proof - people always need haircuts',
      ],
      image: '/media/programs/barber-hero.jpg',
      slug: 'barber',
      color: 'from-purple-600 to-pink-600',
    },
    {
      id: 4,
      title: 'Commercial Truck Driving (CDL)',
      category: 'Transportation',
      duration: '4 weeks',
      startingSalary: '$55,000+',
      description:
        'Get your CDL Class A in 4 weeks. Trucking companies offering sign-on bonuses up to $10,000. Start earning immediately.',
      urgency: 'Trucking shortage - Companies hiring NOW',
      highlights: [
        'CDL Class A license in just 4 weeks',
        'Train on 18-wheelers, not simulators',
        'Companies offering $5K-$10K sign-on bonuses',
        'Job placement with major carriers',
      ],
      realBenefits: [
        'Home weekly or regional routes available',
        'Benefits from day one with major carriers',
        'Paid training programs after graduation',
        'See the country while earning',
      ],
      image: '/media/programs/truck-driving.jpg',
      slug: 'truck-driving',
      color: 'from-green-600 to-emerald-600',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main>
        {/* Hero Section - Powerful and Direct */}
        <section className="relative bg-gradient-to-br from-slate-900 via-red-900 to-slate-900 text-white overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 bg-red-600/20 border border-red-500/30 rounded-full px-4 py-2 mb-6">
                <TrendingUp className="w-4 h-4 text-red-400" />
                <span className="text-sm font-medium text-red-300">
                  High-Demand Careers • Start in Weeks
                </span>
              </div>

              <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
                Stop Waiting.
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">
                  Start Earning.
                </span>
              </h1>

              <p className="text-xl lg:text-2xl text-slate-300 mb-8 leading-relaxed">
                No 4-year degree required. No massive debt. Just real skills,
                real training, and real jobs waiting for you.
                <span className="block mt-4 text-red-400 font-semibold">
                  Most students qualify for 100% free training through WIOA.
                </span>
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link
                  href="/apply"
                  className="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-4 rounded-lg transition-all transform hover:scale-105 shadow-xl"
                >
                  Check If You Qualify for Free Training
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/programs"
                  className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-lg border-2 border-white/30 transition-all"
                >
                  View All Programs
                </Link>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-400 mb-1">
                    4-12
                  </div>
                  <div className="text-sm text-slate-400">
                    Weeks to Complete
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-400 mb-1">$0</div>
                  <div className="text-sm text-slate-400">
                    For Most Students
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-400 mb-1">
                    $35K-$55K
                  </div>
                  <div className="text-sm text-slate-400">
                    Starting Salaries
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-400 mb-1">
                    100%
                  </div>
                  <div className="text-sm text-slate-400">Job Assistance</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Urgency Banner */}
        <section className="bg-red-600 text-white py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Calendar className="w-6 h-6" />
                <span className="font-bold text-lg">
                  Next Classes Starting Soon
                </span>
              </div>
              <div className="flex items-center gap-6 text-sm">
                <span>CNA: Feb 5th</span>
                <span>HVAC: Feb 12th</span>
                <span>CDL: Feb 1st</span>
                <Link
                  href="/apply"
                  className="bg-white text-red-600 px-6 py-2 rounded-lg font-bold hover:bg-slate-100 transition-colors"
                >
                  Apply Now
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Programs Section - Detailed and Compelling */}
        <section className="py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
                Choose Your Career Path
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Real training. Real jobs. Real future. Pick the program that
                fits your life and start in weeks.
              </p>
            </div>

            <div className="space-y-12">
              {programs.map((program, index) => (
                <div
                  key={program.id}
                  className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all"
                >
                  <div className="grid lg:grid-cols-2 gap-0">
                    {/* Image Side */}
                    <div
                      className={`relative h-80 lg:h-auto ${index % 2 === 1 ? 'lg:order-2' : ''}`}
                    >
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${program.color} opacity-90`}
                      ></div>
                      <Image
                        src={program.image}
                        alt={program.title}
                        fill
                        className="object-cover mix-blend-overlay"
                      />
                      <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-sm rounded-lg px-4 py-2">
                        <div className="text-2xl font-bold text-slate-900">
                          {program.startingSalary}
                        </div>
                        <div className="text-xs text-slate-600">
                          Starting Salary
                        </div>
                      </div>
                      <div className="absolute bottom-6 left-6 right-6">
                        <div className="bg-red-600 text-white px-4 py-3 rounded-lg font-bold text-center">
                          {program.urgency}
                        </div>
                      </div>
                    </div>

                    {/* Content Side */}
                    <div className="p-8 lg:p-12">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm font-medium">
                          {program.category}
                        </span>
                        <span className="flex items-center gap-1 text-slate-600 text-sm">
                          <Clock className="w-4 h-4" />
                          {program.duration}
                        </span>
                      </div>

                      <h3 className="text-3xl font-bold text-slate-900 mb-4">
                        {program.title}
                      </h3>

                      <p className="text-lg text-slate-700 mb-6 leading-relaxed">
                        {program.description}
                      </p>

                      <div className="mb-6">
                        <h4 className="font-bold text-slate-900 mb-3">
                          What You'll Get:
                        </h4>
                        <ul className="space-y-2">
                          {program.highlights.map((highlight, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                              <span className="text-slate-700">
                                {highlight}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mb-8">
                        <h4 className="font-bold text-slate-900 mb-3">
                          Why This Career:
                        </h4>
                        <ul className="space-y-2">
                          {program.realBenefits.map((benefit, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <Star className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                              <span className="text-slate-700">{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3">
                        <Link
                          href={`/enroll/${program.slug}`}
                          className="flex-1 inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-4 rounded-lg transition-all"
                        >
                          Enroll Now
                          <ArrowRight className="w-5 h-5" />
                        </Link>
                        <Link
                          href={`/programs/${program.slug}`}
                          className="flex-1 inline-flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-900 font-semibold px-6 py-4 rounded-lg transition-all"
                        >
                          Learn More
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us - Real Benefits */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
                Why Elevate Connects Works
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                We're not a traditional school. We're a direct path to
                employment.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-slate-50 rounded-xl p-8">
                <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                  <DollarSign className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  Most Students Pay $0
                </h3>
                <p className="text-slate-700 leading-relaxed">
                  WIOA funding covers tuition for eligible students. We handle
                  all the paperwork. You focus on training.
                </p>
                <Link
                  href="/wioa-eligibility"
                  className="inline-flex items-center gap-2 text-red-600 font-semibold mt-4 hover:gap-3 transition-all"
                >
                  Check Your Eligibility
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="bg-slate-50 rounded-xl p-8">
                <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                  <Briefcase className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  Jobs Waiting for You
                </h3>
                <p className="text-slate-700 leading-relaxed">
                  We partner with employers who need workers NOW. Many students
                  have job offers before graduation.
                </p>
                <Link
                  href="/employers"
                  className="inline-flex items-center gap-2 text-red-600 font-semibold mt-4 hover:gap-3 transition-all"
                >
                  See Our Partners
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="bg-slate-50 rounded-xl p-8">
                <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                  <Clock className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  Fast Track to Career
                </h3>
                <p className="text-slate-700 leading-relaxed">
                  4-12 weeks, not 4 years. Get certified, get hired, get
                  earning. Life doesn't wait - neither should your career.
                </p>
                <Link
                  href="/programs"
                  className="inline-flex items-center gap-2 text-red-600 font-semibold mt-4 hover:gap-3 transition-all"
                >
                  View Programs
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 bg-gradient-to-br from-red-600 to-orange-600 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Ready to Change Your Life?
            </h2>
            <p className="text-xl text-red-100 mb-8">
              Classes starting soon. Spots are limited. Apply now to see if you
              qualify for free training.
            </p>
            <Link
              href="/apply"
              className="inline-flex items-center justify-center gap-2 bg-white text-red-600 hover:bg-slate-100 font-bold px-12 py-5 rounded-lg text-lg transition-all transform hover:scale-105 shadow-xl"
            >
              Start Your Application
              <ArrowRight className="w-6 h-6" />
            </Link>
            <p className="mt-6 text-red-100 text-sm">
              Takes 2 minutes • No commitment required • Find out if you qualify
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
