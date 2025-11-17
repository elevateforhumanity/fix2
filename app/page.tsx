import Link from 'next/link';
import Image from 'next/image';
import { CheckCircle, ArrowRight, Clock, DollarSign, Briefcase, Star, TrendingUp, Users, Award, Calendar } from 'lucide-react';
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
      description: 'Start your healthcare career in weeks, not years. Get hands-on training in real medical facilities. State certification included.',
      urgency: 'Next class starts Feb 5th - Only 8 spots left',
      highlights: [
        'Train in actual hospitals and nursing homes',
        'State certification exam included',
        'Job placement assistance guaranteed',
        'Financial aid available - most students pay $0'
      ],
      realBenefits: [
        'Work 3 days/week, earn full-time pay',
        'Hospitals hiring immediately after graduation',
        'Flexible schedules - perfect for parents',
        'Step into nursing degree programs'
      ],
      image: '/media/programs/healthcare-1.jpg',
      slug: 'cna',
      color: 'from-blue-600 to-cyan-600'
    },
    {
      id: 2,
      title: 'HVAC Technician',
      category: 'Skilled Trades',
      duration: '12 weeks',
      startingSalary: '$48,000+',
      description: 'High-demand trade with immediate job openings. Master heating, cooling, and refrigeration. Start your own business or work for top companies.',
      urgency: 'Companies pre-hiring our graduates - Apply now',
      highlights: [
        'EPA certification included in training',
        'Work with real HVAC systems, not just books',
        'Tool kit provided - $2,000 value',
        'Partner companies hiring before graduation'
      ],
      realBenefits: [
        'Year-round work - AC in summer, heat in winter',
        'Start your own business after 2 years',
        'Overtime pay during peak seasons',
        'Technology-focused - smart home systems'
      ],
      image: '/media/programs/trades-1.jpg',
      slug: 'hvac',
      color: 'from-orange-600 to-red-600'
    },
    {
      id: 3,
      title: 'Barber Apprenticeship',
      category: 'Skilled Trades',
      duration: '12-18 months',
      startingSalary: '$35,000+',
      description: 'Earn while you learn in a real barbershop. Build your clientele while training. State license and business skills included.',
      urgency: 'Barbershops waiting for apprentices - Limited spots',
      highlights: [
        'Get paid while training in real shops',
        'Build your client base from day one',
        'State license exam prep included',
        'Business and marketing training'
      ],
      realBenefits: [
        'Set your own schedule as licensed barber',
        'Cash tips on top of hourly pay',
        'Rent a chair or open your own shop',
        'Recession-proof - people always need haircuts'
      ],
      image: '/media/programs/barber-hero.jpg',
      slug: 'barber',
      color: 'from-purple-600 to-pink-600'
    },
    {
      id: 4,
      title: 'Commercial Truck Driving (CDL)',
      category: 'Transportation',
      duration: '4 weeks',
      startingSalary: '$55,000+',
      description: 'Get your CDL Class A in 4 weeks. Trucking companies offering sign-on bonuses up to $10,000. Start earning immediately.',
      urgency: 'Trucking shortage - Companies hiring NOW',
      highlights: [
        'CDL Class A license in just 4 weeks',
        'Train on 18-wheelers, not simulators',
        'Companies offering $5K-$10K sign-on bonuses',
        'Job placement with major carriers'
      ],
      realBenefits: [
        'Home weekly or regional routes available',
        'Benefits from day one with major carriers',
        'Paid training programs after graduation',
        'See the country while earning'
      ],
      image: '/media/programs/truck-driving.jpg',
      slug: 'truck-driving',
      color: 'from-green-600 to-emerald-600'
    }
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
                  <span className="text-sm font-medium text-slate-700">High-Demand Careers • Start in Weeks</span>
                </div>

                <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight text-slate-900">
                  Workforce Training & Apprenticeships That Transform Communities
                </h1>

                <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                  DOL & DWD-aligned training for students, employers, and workforce partners.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Link 
                    href="/apply"
                    className="inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold px-8 py-4 rounded-lg transition-all"
                  >
                    Apply as a Student
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                  <Link 
                    href="/agencies"
                    className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-900 font-semibold px-8 py-4 rounded-lg border-2 border-slate-200 transition-all"
                  >
                    Become a Workforce Partner
                  </Link>
                </div>

                <div className="grid grid-cols-3 gap-6 pt-6 border-t border-slate-200">
                  <div>
                    <div className="text-3xl font-bold text-slate-900 mb-1">4-12</div>
                    <div className="text-sm text-slate-600">Weeks to Complete</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-slate-900 mb-1">$0</div>
                    <div className="text-sm text-slate-600">For Most Students</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-slate-900 mb-1">$35K+</div>
                    <div className="text-sm text-slate-600">Starting Salaries</div>
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

        {/* Who We Help Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">
                Who We Help
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Students */}
              <div className="bg-white rounded-xl p-8 border-2 border-slate-200 hover:border-blue-300 transition-all">
                <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Students</h3>
                <p className="text-slate-700 leading-relaxed">
                  Hands-on job training, certifications, apprenticeships
                </p>
              </div>

              {/* Employers */}
              <div className="bg-white rounded-xl p-8 border-2 border-slate-200 hover:border-orange-300 transition-all">
                <div className="w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center mb-6">
                  <Briefcase className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Employers</h3>
                <p className="text-slate-700 leading-relaxed">
                  Skilled talent pipeline, subsidized training
                </p>
              </div>

              {/* Agencies */}
              <div className="bg-white rounded-xl p-8 border-2 border-slate-200 hover:border-purple-300 transition-all">
                <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                  <Award className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Agencies</h3>
                <p className="text-slate-700 leading-relaxed">
                  ETPL, WRG, WIOA, JRI, and Apprenticeship compliance
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How Elevate Works */}
        <section className="py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">
                How Elevate Works
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-12">
              {/* Step 1 */}
              <div className="text-center">
                <div className="w-24 h-24 bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-4xl font-bold text-white">1</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Enroll</h3>
                <p className="text-slate-700 leading-relaxed">
                  Apply and get matched to the right program for your goals
                </p>
              </div>

              {/* Step 2 */}
              <div className="text-center">
                <div className="w-24 h-24 bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-4xl font-bold text-white">2</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Train</h3>
                <p className="text-slate-700 leading-relaxed">
                  Complete hands-on training with industry partners
                </p>
              </div>

              {/* Step 3 */}
              <div className="text-center">
                <div className="w-24 h-24 bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-4xl font-bold text-white">3</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Get Certified & Employed</h3>
                <p className="text-slate-700 leading-relaxed">
                  Earn your credential and start your new career
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
            </div>

            <div className="grid grid-cols-2 md:grid-cols-6 gap-8 items-center mb-12">
              <div className="text-center">
                <div className="text-5xl mb-2">🇺🇸</div>
                <p className="text-sm font-semibold text-slate-700">U.S. DOL</p>
              </div>
              <div className="text-center">
                <div className="text-5xl mb-2">🏛️</div>
                <p className="text-sm font-semibold text-slate-700">DWD Indiana</p>
              </div>
              <div className="text-center">
                <div className="text-5xl mb-2">💼</div>
                <p className="text-sm font-semibold text-slate-700">WorkOne</p>
              </div>
              <div className="text-center">
                <div className="text-5xl mb-2">🤝</div>
                <p className="text-sm font-semibold text-slate-700">EmployIndy</p>
              </div>
              <div className="text-center">
                <div className="text-5xl mb-2">🎓</div>
                <p className="text-sm font-semibold text-slate-700">ETPL Provider</p>
              </div>
              <div className="text-center">
                <div className="text-5xl mb-2">⚙️</div>
                <p className="text-sm font-semibold text-slate-700">Apprenticeships</p>
              </div>
            </div>

            <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              <div className="text-center">
                <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="text-sm font-semibold text-slate-700">ETPL-Approved</p>
              </div>
              <div className="text-center">
                <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="text-sm font-semibold text-slate-700">DOL-Registered Barber Apprenticeship</p>
              </div>
              <div className="text-center">
                <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="text-sm font-semibold text-slate-700">WRG & JRI Eligible</p>
              </div>
              <div className="text-center">
                <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="text-sm font-semibold text-slate-700">CNA Licensed by IDOH</p>
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
                  <h3 className="font-bold text-slate-900 mb-2">CNA Training</h3>
                  <p className="text-sm text-slate-600">Watch how our students train in real medical facilities</p>
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
                  <h3 className="font-bold text-slate-900 mb-2">Barber Apprenticeship</h3>
                  <p className="text-sm text-slate-600">See apprentices earning while they learn</p>
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
                  <h3 className="font-bold text-slate-900 mb-2">HVAC Technician</h3>
                  <p className="text-sm text-slate-600">Hands-on training with real equipment</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What We Offer - Our Programs & Training */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
                Who We Help
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Workforce training and apprenticeships that transform communities through partner-powered pathways.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Students Card */}
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 border-2 border-blue-100 hover:border-blue-300 transition-all">
                <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mb-6">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Students</h3>
                <p className="text-slate-700 mb-6 leading-relaxed">
                  Hands-on job training, industry certifications, and DOL-registered apprenticeships. Most students qualify for 100% free training through WIOA.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">4-12 week programs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">$0 cost for most students</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Job placement assistance</span>
                  </li>
                </ul>
                <Link href="/apply" className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:gap-3 transition-all">
                  Apply Now
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Employers Card */}
              <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-8 border-2 border-orange-100 hover:border-orange-300 transition-all">
                <div className="w-16 h-16 bg-orange-600 rounded-xl flex items-center justify-center mb-6">
                  <Briefcase className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Employers</h3>
                <p className="text-slate-700 mb-6 leading-relaxed">
                  Skilled talent pipeline with subsidized training. Host apprentices, access OJT/WEX programs, and hire job-ready graduates.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Pre-screened candidates</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Subsidized training costs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Apprenticeship support</span>
                  </li>
                </ul>
                <Link href="/employers" className="inline-flex items-center gap-2 text-orange-600 font-semibold hover:gap-3 transition-all">
                  Partner With Us
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Agencies Card */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border-2 border-purple-100 hover:border-purple-300 transition-all">
                <div className="w-16 h-16 bg-purple-600 rounded-xl flex items-center justify-center mb-6">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Workforce Agencies</h3>
                <p className="text-slate-700 mb-6 leading-relaxed">
                  ETPL-approved training with full compliance for WRG, JRI, WIOA, and DOL-registered apprenticeships. Seamless reporting for WorkOne and EmployIndy.
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
                    <span className="text-slate-700">Client progress tracking</span>
                  </li>
                </ul>
                <Link href="/agencies" className="inline-flex items-center gap-2 text-purple-600 font-semibold hover:gap-3 transition-all">
                  Agency Portal
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* How Elevate Works - 3-Step Process */}
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
                  <span className="text-red-600 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-4 text-slate-700 leading-relaxed">
                  Most students qualify through WIOA (Workforce Innovation and Opportunity Act) funding. If you're unemployed, underemployed, or looking to change careers, you likely qualify. We handle all the paperwork - just fill out our 2-minute application and we'll check your eligibility.
                </p>
              </details>

              <details className="group bg-slate-50 rounded-lg p-6 cursor-pointer">
                <summary className="flex justify-between items-center font-bold text-slate-900 text-lg">
                  When do classes start?
                  <span className="text-red-600 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-4 text-slate-700 leading-relaxed">
                  We have rolling start dates throughout the year. Current upcoming classes: CNA (Feb 5th), HVAC (Feb 12th), CDL (Feb 1st), Barber (ongoing apprenticeships). Apply now to secure your spot in the next available class.
                </p>
              </details>

              <details className="group bg-slate-50 rounded-lg p-6 cursor-pointer">
                <summary className="flex justify-between items-center font-bold text-slate-900 text-lg">
                  What if I already have a job?
                  <span className="text-red-600 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-4 text-slate-700 leading-relaxed">
                  Many of our programs offer evening and weekend options. We also work with employers who allow employees to train during work hours. If you're looking to switch careers or increase your income, we can work with your schedule.
                </p>
              </details>

              <details className="group bg-slate-50 rounded-lg p-6 cursor-pointer">
                <summary className="flex justify-between items-center font-bold text-slate-900 text-lg">
                  Do you really help with job placement?
                  <span className="text-red-600 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-4 text-slate-700 leading-relaxed">
                  Yes! We partner with employers who are actively hiring. Many students receive job offers before graduation. We provide resume help, interview prep, and direct introductions to hiring managers. Our goal is to get you employed, not just certified.
                </p>
              </details>

              <details className="group bg-slate-50 rounded-lg p-6 cursor-pointer">
                <summary className="flex justify-between items-center font-bold text-slate-900 text-lg">
                  What's the catch? Why is it free?
                  <span className="text-red-600 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-4 text-slate-700 leading-relaxed">
                  There's no catch. WIOA is a federal program designed to help people get job training. The government pays for your training because they want you employed and paying taxes. We're an approved WIOA provider, so we can offer this at no cost to eligible students.
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
              Classes starting soon. Spots are limited. Apply now to see if you qualify for free training.
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
