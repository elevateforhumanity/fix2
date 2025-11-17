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
        {/* Hero Section - Mostly White, Clean Design */}
        <section className="relative bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Column - Content */}
              <div>
                <div className="inline-flex items-center gap-2 bg-slate-100 rounded-full px-4 py-2 mb-6">
                  <TrendingUp className="w-4 h-4 text-slate-600" />
                  <span className="text-sm font-medium text-slate-700">
                    High-Demand Careers • Start in Weeks
                  </span>
                </div>

                <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight text-slate-900">
                  Get Certified.
                  <br />
                  Get Hired.
                  <br />
                  Get Paid.
                </h1>

                <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                  From unemployed to employed in 4-12 weeks. Free training for
                  most students through WIOA. Real jobs waiting.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Link
                    href="/apply"
                    className="inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold px-8 py-4 rounded-lg transition-all"
                  >
                    Check If You Qualify for Free Training
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                  <Link
                    href="/programs"
                    className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-900 font-semibold px-8 py-4 rounded-lg border-2 border-slate-200 transition-all"
                  >
                    View All Programs
                  </Link>
                </div>

                <div className="grid grid-cols-3 gap-6 pt-6 border-t border-slate-200">
                  <div>
                    <div className="text-3xl font-bold text-slate-900 mb-1">
                      4-12
                    </div>
                    <div className="text-sm text-slate-600">
                      Weeks to Complete
                    </div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-slate-900 mb-1">
                      $0
                    </div>
                    <div className="text-sm text-slate-600">
                      For Most Students
                    </div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-slate-900 mb-1">
                      $35K+
                    </div>
                    <div className="text-sm text-slate-600">
                      Starting Salaries
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Hero Image */}
              <div className="relative hidden lg:block">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="/media/hero/homepage.jpg"
                    alt="Students in training"
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Video Highlights Section */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                See Our Programs in Action
              </h2>
              <p className="text-lg text-slate-600">
                Real students, real training, real results.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Video Snippet 1 */}
              <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all">
                <div className="relative aspect-video bg-slate-200">
                  <Image
                    src="/images/programs/efh-cna-hero.jpg"
                    alt="CNA Training"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
                      <div className="w-0 h-0 border-l-[16px] border-l-slate-900 border-y-[10px] border-y-transparent ml-1"></div>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-slate-900 mb-2">
                    CNA Training
                  </h3>
                  <p className="text-sm text-slate-600">
                    Watch how our students train in real medical facilities
                  </p>
                </div>
              </div>

              {/* Video Snippet 2 */}
              <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all">
                <div className="relative aspect-video bg-slate-200">
                  <Image
                    src="/media/programs/barber-hero.jpg"
                    alt="Barber Training"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
                      <div className="w-0 h-0 border-l-[16px] border-l-slate-900 border-y-[10px] border-y-transparent ml-1"></div>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-slate-900 mb-2">
                    Barber Apprenticeship
                  </h3>
                  <p className="text-sm text-slate-600">
                    See apprentices earning while they learn
                  </p>
                </div>
              </div>

              {/* Video Snippet 3 */}
              <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all">
                <div className="relative aspect-video bg-slate-200">
                  <Image
                    src="/media/programs/trades-1.jpg"
                    alt="HVAC Training"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
                      <div className="w-0 h-0 border-l-[16px] border-l-slate-900 border-y-[10px] border-y-transparent ml-1"></div>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-slate-900 mb-2">
                    HVAC Technician
                  </h3>
                  <p className="text-sm text-slate-600">
                    Hands-on training with real equipment
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Who We Help Section - Enterprise LMS Pattern */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
                Who We Help
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Workforce training and apprenticeships that transform
                communities through partner-powered pathways.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Students Card */}
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 border-2 border-blue-100 hover:border-blue-300 transition-all">
                <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mb-6">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  Students
                </h3>
                <p className="text-slate-700 mb-6 leading-relaxed">
                  Hands-on job training, industry certifications, and
                  DOL-registered apprenticeships. Most students qualify for 100%
                  free training through WIOA.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">4-12 week programs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">
                      $0 cost for most students
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">
                      Job placement assistance
                    </span>
                  </li>
                </ul>
                <Link
                  href="/apply"
                  className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:gap-3 transition-all"
                >
                  Apply Now
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Employers Card */}
              <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-8 border-2 border-orange-100 hover:border-orange-300 transition-all">
                <div className="w-16 h-16 bg-orange-600 rounded-xl flex items-center justify-center mb-6">
                  <Briefcase className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  Employers
                </h3>
                <p className="text-slate-700 mb-6 leading-relaxed">
                  Skilled talent pipeline with subsidized training. Host
                  apprentices, access OJT/WEX programs, and hire job-ready
                  graduates.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">
                      Pre-screened candidates
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">
                      Subsidized training costs
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">
                      Apprenticeship support
                    </span>
                  </li>
                </ul>
                <Link
                  href="/employers"
                  className="inline-flex items-center gap-2 text-orange-600 font-semibold hover:gap-3 transition-all"
                >
                  Partner With Us
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Agencies Card */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border-2 border-purple-100 hover:border-purple-300 transition-all">
                <div className="w-16 h-16 bg-purple-600 rounded-xl flex items-center justify-center mb-6">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  Workforce Agencies
                </h3>
                <p className="text-slate-700 mb-6 leading-relaxed">
                  ETPL-approved training with full compliance for WRG, JRI,
                  WIOA, and DOL-registered apprenticeships. Seamless reporting
                  for WorkOne and EmployIndy.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">ETPL & WRG eligible</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Automated reporting</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">
                      Client progress tracking
                    </span>
                  </li>
                </ul>
                <Link
                  href="/agencies"
                  className="inline-flex items-center gap-2 text-purple-600 font-semibold hover:gap-3 transition-all"
                >
                  Agency Portal
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* How Elevate Works - 3-Step Process */}
        <section className="py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
                How Elevate Works
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                From enrollment to employment in three simple steps.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-12">
              {/* Step 1 */}
              <div className="text-center">
                <div className="relative mb-8">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-full flex items-center justify-center mx-auto shadow-xl">
                    <span className="text-4xl font-bold text-white">1</span>
                  </div>
                  <div
                    className="absolute top-1/2 left-1/2 w-full h-1 bg-gradient-to-r from-blue-600 to-orange-600 transform -translate-y-1/2 hidden md:block"
                    style={{
                      width: 'calc(100% + 3rem)',
                      left: 'calc(50% + 3rem)',
                    }}
                  ></div>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  Enroll
                </h3>
                <p className="text-slate-700 leading-relaxed">
                  Apply in minutes. Check your eligibility for free training
                  through WIOA, WRG, or JRI. Get matched to the right program
                  for your goals.
                </p>
              </div>

              {/* Step 2 */}
              <div className="text-center">
                <div className="relative mb-8">
                  <div className="w-24 h-24 bg-gradient-to-br from-orange-600 to-red-600 rounded-full flex items-center justify-center mx-auto shadow-xl">
                    <span className="text-4xl font-bold text-white">2</span>
                  </div>
                  <div
                    className="absolute top-1/2 left-1/2 w-full h-1 bg-gradient-to-r from-orange-600 to-green-600 transform -translate-y-1/2 hidden md:block"
                    style={{
                      width: 'calc(100% + 3rem)',
                      left: 'calc(50% + 3rem)',
                    }}
                  ></div>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  Train
                </h3>
                <p className="text-slate-700 leading-relaxed">
                  Complete hands-on training with industry partners. Attend live
                  support sessions. Pass your certifications. Track your
                  progress every step of the way.
                </p>
              </div>

              {/* Step 3 */}
              <div className="text-center">
                <div className="relative mb-8">
                  <div className="w-24 h-24 bg-gradient-to-br from-green-600 to-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-xl">
                    <span className="text-4xl font-bold text-white">3</span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  Get Certified & Employed
                </h3>
                <p className="text-slate-700 leading-relaxed">
                  Earn your industry credential and Elevate Certificate of
                  Completion. Get connected to hiring employers. Start your new
                  career.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Approved & Aligned Section */}
        <section className="py-16 bg-white border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                Approved & Aligned
              </h2>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                Fully compliant with federal and state workforce development
                standards.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-6 gap-8 items-center mb-12">
              <div className="text-center">
                <div className="text-5xl mb-2">🇺🇸</div>
                <p className="text-sm font-semibold text-slate-700">U.S. DOL</p>
              </div>
              <div className="text-center">
                <div className="text-5xl mb-2">🏛️</div>
                <p className="text-sm font-semibold text-slate-700">
                  DWD Indiana
                </p>
              </div>
              <div className="text-center">
                <div className="text-5xl mb-2">💼</div>
                <p className="text-sm font-semibold text-slate-700">WorkOne</p>
              </div>
              <div className="text-center">
                <div className="text-5xl mb-2">🤝</div>
                <p className="text-sm font-semibold text-slate-700">
                  EmployIndy
                </p>
              </div>
              <div className="text-center">
                <div className="text-5xl mb-2">🎓</div>
                <p className="text-sm font-semibold text-slate-700">
                  ETPL Provider
                </p>
              </div>
              <div className="text-center">
                <div className="text-5xl mb-2">⚙️</div>
                <p className="text-sm font-semibold text-slate-700">
                  Apprenticeships
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              <div className="text-center">
                <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="text-sm font-semibold text-slate-700">
                  ETPL-Approved
                </p>
              </div>
              <div className="text-center">
                <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="text-sm font-semibold text-slate-700">
                  DOL-Registered Apprenticeships
                </p>
              </div>
              <div className="text-center">
                <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="text-sm font-semibold text-slate-700">
                  WRG & JRI Eligible
                </p>
              </div>
              <div className="text-center">
                <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="text-sm font-semibold text-slate-700">
                  OJT/WEX Ready
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Student Success Stories with Photos */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">
                Real Students, Real Success
              </h2>
              <p className="text-xl text-slate-600">
                Hear from graduates who transformed their lives in weeks, not
                years.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Testimonial 1 */}
              <div className="bg-white rounded-xl p-8 shadow-lg border border-slate-200">
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden">
                    <Image
                      src="/media/testimonials/student1.jpg"
                      alt="Marcus J."
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">Marcus J.</p>
                    <p className="text-sm text-slate-600">HVAC Graduate</p>
                  </div>
                </div>
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-slate-700 leading-relaxed">
                  "I went from unemployed to earning $48K in 12 weeks. The
                  training was hands-on and the job placement team connected me
                  with a great company."
                </p>
              </div>

              {/* Testimonial 2 */}
              <div className="bg-white rounded-xl p-8 shadow-lg border border-slate-200">
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden">
                    <Image
                      src="/media/testimonials/student2.jpg"
                      alt="Sarah M."
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">Sarah M.</p>
                    <p className="text-sm text-slate-600">CNA Graduate</p>
                  </div>
                </div>
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-slate-700 leading-relaxed">
                  "As a single mom, I needed something fast and affordable.
                  Elevate's CNA program was free through WIOA and I started
                  working at a hospital 8 weeks later."
                </p>
              </div>

              {/* Testimonial 3 */}
              <div className="bg-white rounded-xl p-8 shadow-lg border border-slate-200">
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden">
                    <Image
                      src="/media/testimonials/student3.jpg"
                      alt="James T."
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">James T.</p>
                    <p className="text-sm text-slate-600">Barber Apprentice</p>
                  </div>
                </div>
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-slate-700 leading-relaxed">
                  "I'm getting paid while I learn. Building my client base and
                  working toward my license. Best decision I ever made."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Urgency Banner */}
        <section className="bg-slate-900 text-white py-4">
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

        {/* Employer Partners Section */}
        <section className="py-16 bg-white border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">
                Our Hiring Partners
              </h2>
              <p className="text-slate-600">
                Companies actively hiring our graduates
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-60">
              <div className="text-center">
                <div className="text-4xl mb-2">🏥</div>
                <p className="text-sm font-semibold text-slate-700">
                  Healthcare Facilities
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2">🔧</div>
                <p className="text-sm font-semibold text-slate-700">
                  HVAC Companies
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2">✂️</div>
                <p className="text-sm font-semibold text-slate-700">
                  Barbershop Chains
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2">🚛</div>
                <p className="text-sm font-semibold text-slate-700">
                  Trucking Companies
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Success Stories */}
        <section className="py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
                Real Students. Real Results.
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                See how our graduates transformed their lives in weeks, not
                years.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="bg-white rounded-xl p-8 shadow-lg">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    MJ
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">Marcus J.</h3>
                    <p className="text-sm text-slate-600">HVAC Graduate</p>
                  </div>
                </div>
                <p className="text-slate-700 italic mb-4">
                  "I went from unemployed to earning $48K in just 12 weeks. The
                  hands-on training was exactly what I needed. Now I'm working
                  for a top HVAC company with full benefits."
                </p>
                <div className="flex items-center gap-2 text-sm text-green-600 font-semibold">
                  <CheckCircle className="w-4 h-4" />
                  Hired within 2 weeks of graduation
                </div>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-lg">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    TA
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">Taylor A.</h3>
                    <p className="text-sm text-slate-600">CNA Graduate</p>
                  </div>
                </div>
                <p className="text-slate-700 italic mb-4">
                  "As a single mom, I needed something fast. The CNA program was
                  perfect - 6 weeks and I had my certification. Now I work 3
                  days a week and make enough to support my family."
                </p>
                <div className="flex items-center gap-2 text-sm text-green-600 font-semibold">
                  <CheckCircle className="w-4 h-4" />
                  Training was 100% free through WIOA
                </div>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-lg">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    JR
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">Jordan R.</h3>
                    <p className="text-sm text-slate-600">CDL Graduate</p>
                  </div>
                </div>
                <p className="text-slate-700 italic mb-4">
                  "Got my CDL in 4 weeks and received a $7,500 sign-on bonus
                  from my first employer. I'm home every weekend and making more
                  than I ever did in retail."
                </p>
                <div className="flex items-center gap-2 text-sm text-green-600 font-semibold">
                  <CheckCircle className="w-4 h-4" />
                  $55K first year + bonuses
                </div>
              </div>
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

        {/* Comparison Table */}
        <section className="py-20 bg-slate-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">
                Traditional College vs Elevate Connects
              </h2>
              <p className="text-xl text-slate-600">
                See the difference for yourself
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-200">
                <div className="p-8">
                  <h3 className="text-lg font-bold text-slate-900 mb-6">
                    Factor
                  </h3>
                  <div className="space-y-6">
                    <div className="font-semibold text-slate-700">
                      Time to Complete
                    </div>
                    <div className="font-semibold text-slate-700">
                      Total Cost
                    </div>
                    <div className="font-semibold text-slate-700">Outcome</div>
                    <div className="font-semibold text-slate-700">
                      Job Assistance
                    </div>
                    <div className="font-semibold text-slate-700">
                      Start Earning
                    </div>
                  </div>
                </div>

                <div className="p-8 bg-slate-50">
                  <h3 className="text-lg font-bold text-slate-600 mb-6">
                    Traditional College
                  </h3>
                  <div className="space-y-6 text-slate-600">
                    <div>4 years</div>
                    <div>$40,000 - $100,000+</div>
                    <div>Degree (maybe)</div>
                    <div>Career center only</div>
                    <div>After 4+ years</div>
                  </div>
                </div>

                <div className="p-8 bg-gradient-to-br from-red-50 to-orange-50">
                  <h3 className="text-lg font-bold text-red-600 mb-6">
                    Elevate Connects
                  </h3>
                  <div className="space-y-6 text-slate-900 font-semibold">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      4-12 weeks
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      $0 (WIOA funded)
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      Job + Certification
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      Direct placement
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      Within weeks
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-4">
              <details className="group bg-slate-50 rounded-lg p-6 cursor-pointer">
                <summary className="flex justify-between items-center font-bold text-slate-900 text-lg">
                  How do I qualify for free training?
                  <span className="text-red-600 group-open:rotate-180 transition-transform">
                    ▼
                  </span>
                </summary>
                <p className="mt-4 text-slate-700 leading-relaxed">
                  Most students qualify through WIOA (Workforce Innovation and
                  Opportunity Act) funding. If you're unemployed, underemployed,
                  or looking to change careers, you likely qualify. We handle
                  all the paperwork - just fill out our 2-minute application and
                  we'll check your eligibility.
                </p>
              </details>

              <details className="group bg-slate-50 rounded-lg p-6 cursor-pointer">
                <summary className="flex justify-between items-center font-bold text-slate-900 text-lg">
                  When do classes start?
                  <span className="text-red-600 group-open:rotate-180 transition-transform">
                    ▼
                  </span>
                </summary>
                <p className="mt-4 text-slate-700 leading-relaxed">
                  We have rolling start dates throughout the year. Current
                  upcoming classes: CNA (Feb 5th), HVAC (Feb 12th), CDL (Feb
                  1st), Barber (ongoing apprenticeships). Apply now to secure
                  your spot in the next available class.
                </p>
              </details>

              <details className="group bg-slate-50 rounded-lg p-6 cursor-pointer">
                <summary className="flex justify-between items-center font-bold text-slate-900 text-lg">
                  What if I already have a job?
                  <span className="text-red-600 group-open:rotate-180 transition-transform">
                    ▼
                  </span>
                </summary>
                <p className="mt-4 text-slate-700 leading-relaxed">
                  Many of our programs offer evening and weekend options. We
                  also work with employers who allow employees to train during
                  work hours. If you're looking to switch careers or increase
                  your income, we can work with your schedule.
                </p>
              </details>

              <details className="group bg-slate-50 rounded-lg p-6 cursor-pointer">
                <summary className="flex justify-between items-center font-bold text-slate-900 text-lg">
                  Do you really help with job placement?
                  <span className="text-red-600 group-open:rotate-180 transition-transform">
                    ▼
                  </span>
                </summary>
                <p className="mt-4 text-slate-700 leading-relaxed">
                  Yes! We partner with employers who are actively hiring. Many
                  students receive job offers before graduation. We provide
                  resume help, interview prep, and direct introductions to
                  hiring managers. Our goal is to get you employed, not just
                  certified.
                </p>
              </details>

              <details className="group bg-slate-50 rounded-lg p-6 cursor-pointer">
                <summary className="flex justify-between items-center font-bold text-slate-900 text-lg">
                  What's the catch? Why is it free?
                  <span className="text-red-600 group-open:rotate-180 transition-transform">
                    ▼
                  </span>
                </summary>
                <p className="mt-4 text-slate-700 leading-relaxed">
                  There's no catch. WIOA is a federal program designed to help
                  people get job training. The government pays for your training
                  because they want you employed and paying taxes. We're an
                  approved WIOA provider, so we can offer this at no cost to
                  eligible students.
                </p>
              </details>
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
