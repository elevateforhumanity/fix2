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
        {/* Hero Section - Enterprise LMS Style */}
        <section className="relative bg-gradient-to-br from-slate-50 to-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left Column - Content */}
              <div>
                <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight text-slate-900">
                  Close workforce gaps faster with DOL-aligned Elevate
                </h1>

                <p className="text-xl text-slate-600 mb-10 leading-relaxed">
                  Need workforce training backed by industry-leading compliance and partners? Your best student, employer, and agency experience awaits.
                </p>

                <Link 
                  href="/apply"
                  className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-10 py-4 rounded-lg transition-all text-lg"
                >
                  Get Started
                </Link>
              </div>

              {/* Right Column - Hero Image */}
              <div className="relative hidden lg:block">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="/media/hero/homepage.jpg"
                    alt="Workforce training in action"
                    width={700}
                    height={500}
                    className="w-full h-auto object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Partner Logos */}
        <section className="py-12 bg-white border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center justify-center gap-12 opacity-60">
              <div className="flex flex-col items-center">
                <Award className="w-12 h-12 text-slate-600 mb-2" />
                <span className="text-sm font-semibold text-slate-700">U.S. DOL</span>
              </div>
              <div className="flex flex-col items-center">
                <Award className="w-12 h-12 text-slate-600 mb-2" />
                <span className="text-sm font-semibold text-slate-700">DWD Indiana</span>
              </div>
              <div className="flex flex-col items-center">
                <Briefcase className="w-12 h-12 text-slate-600 mb-2" />
                <span className="text-sm font-semibold text-slate-700">WorkOne</span>
              </div>
              <div className="flex flex-col items-center">
                <Users className="w-12 h-12 text-slate-600 mb-2" />
                <span className="text-sm font-semibold text-slate-700">EmployIndy</span>
              </div>
              <div className="flex flex-col items-center">
                <CheckCircle className="w-12 h-12 text-slate-600 mb-2" />
                <span className="text-sm font-semibold text-slate-700">ETPL Approved</span>
              </div>
            </div>
          </div>
        </section>

        {/* Make Strategic Learning Your Advantage */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
                Make workforce training your advantage
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Equip your community with the key pillars of a future-proof workforce development experience.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Bridge Gaps */}
              <div className="text-center">
                <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <TrendingUp className="w-10 h-10 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Bridge Gaps</h3>
                <p className="text-slate-600 leading-relaxed">
                  Close skill gaps faster with DOL-registered apprenticeships and ETPL-approved programs.
                </p>
              </div>

              {/* Engage Learners */}
              <div className="text-center">
                <div className="w-20 h-20 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Users className="w-10 h-10 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Engage Learners</h3>
                <p className="text-slate-600 leading-relaxed">
                  Hands-on training in real facilities with industry partners and job placement support.
                </p>
              </div>

              {/* Reduce Admin */}
              <div className="text-center">
                <div className="w-20 h-20 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Reduce Admin</h3>
                <p className="text-slate-600 leading-relaxed">
                  Automated reporting for WorkOne, EmployIndy, and DWD with seamless compliance tracking.
                </p>
              </div>

              {/* Reliable Support */}
              <div className="text-center">
                <div className="w-20 h-20 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Award className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Reliable Support</h3>
                <p className="text-slate-600 leading-relaxed">
                  Dedicated support for students, employers, and workforce agencies throughout the journey.
                </p>
              </div>
            </div>

            <div className="text-center mt-12">
              <Link 
                href="/apply"
                className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-10 py-4 rounded-lg transition-all text-lg"
              >
                Get Started
              </Link>
            </div>
          </div>
        </section>

        {/* Solutions for Every Learning Program */}
        <section className="py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
                Programs for every workforce need
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Healthcare */}
              <div className="bg-white rounded-xl p-8 hover:shadow-xl transition-all">
                <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                  <CheckCircle className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">Healthcare</h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  CNA training with state certification and immediate job placement in hospitals and nursing homes.
                </p>
                <Link href="/programs/cna" className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:gap-3 transition-all">
                  Explore Program
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Skilled Trades */}
              <div className="bg-white rounded-xl p-8 hover:shadow-xl transition-all">
                <div className="w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center mb-6">
                  <Briefcase className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">Skilled Trades</h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  HVAC, Barber, and Building Maintenance programs with DOL-registered apprenticeships.
                </p>
                <Link href="/programs" className="inline-flex items-center gap-2 text-orange-600 font-semibold hover:gap-3 transition-all">
                  Explore Programs
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Transportation */}
              <div className="bg-white rounded-xl p-8 hover:shadow-xl transition-all">
                <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                  <TrendingUp className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">Transportation</h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  CDL Class A training in 4 weeks with companies offering sign-on bonuses up to $10K.
                </p>
                <Link href="/programs/truck-driving" className="inline-flex items-center gap-2 text-green-600 font-semibold hover:gap-3 transition-all">
                  Explore Program
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* For Employers */}
              <div className="bg-white rounded-xl p-8 hover:shadow-xl transition-all">
                <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                  <Users className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">For Employers</h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  Host apprentices, access OJT/WEX programs, and build your skilled talent pipeline.
                </p>
                <Link href="/employers" className="inline-flex items-center gap-2 text-purple-600 font-semibold hover:gap-3 transition-all">
                  Partner With Us
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* For Agencies */}
              <div className="bg-white rounded-xl p-8 hover:shadow-xl transition-all">
                <div className="w-16 h-16 bg-indigo-100 rounded-xl flex items-center justify-center mb-6">
                  <Award className="w-8 h-8 text-indigo-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">For Agencies</h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  ETPL, WRG, WIOA, and JRI compliance with automated reporting for WorkOne and EmployIndy.
                </p>
                <Link href="/agencies" className="inline-flex items-center gap-2 text-indigo-600 font-semibold hover:gap-3 transition-all">
                  Agency Portal
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* For Students */}
              <div className="bg-white rounded-xl p-8 hover:shadow-xl transition-all">
                <div className="w-16 h-16 bg-cyan-100 rounded-xl flex items-center justify-center mb-6">
                  <Star className="w-8 h-8 text-cyan-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">For Students</h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  Free training through WIOA, hands-on learning, and job placement assistance.
                </p>
                <Link href="/apply" className="inline-flex items-center gap-2 text-cyan-600 font-semibold hover:gap-3 transition-all">
                  Apply Now
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>



        {/* Final CTA */}
        <section className="py-20 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Ready to start your workforce training?
            </h2>
            <p className="text-xl text-blue-100 mb-10">
              Apply now to see if you qualify for free training through WIOA, WRG, or JRI.
            </p>
            <Link
              href="/apply"
              className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 hover:bg-blue-50 font-semibold px-12 py-5 rounded-lg text-lg transition-all"
            >
              Apply Now
              <ArrowRight className="w-6 h-6" />
            </Link>
            <p className="mt-6 text-blue-100 text-sm">
              Takes 2 minutes • No commitment required • Find out if you qualify
            </p>
          </div>
        </section>

        {/* Success Stories */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">
                Real Students, Real Success
              </h2>
              <p className="text-xl text-slate-300">
                See what our graduates are saying about their training experience
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Success Story 1 */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden hover:bg-white/15 transition-all">
                <div className="relative aspect-video bg-slate-700">
                  <Image
                    src="/media/testimonials/student1.jpg"
                    alt="CNA Graduate Success Story"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                    <div>
                      <div className="text-sm font-semibold text-blue-400 mb-1">CNA Graduate</div>
                      <h3 className="font-bold text-white text-lg">From Unemployed to Healthcare Hero</h3>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-slate-300 text-sm leading-relaxed">
                    "I went from no job to working at a hospital in just 8 weeks. The training was hands-on and the job placement team got me interviews before I even graduated."
                  </p>
                  <div className="mt-4 flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  </div>
                </div>
              </div>

              {/* Success Story 2 */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden hover:bg-white/15 transition-all">
                <div className="relative aspect-video bg-slate-700">
                  <Image
                    src="/media/programs/barber.jpg"
                    alt="Barber Apprentice Success Story"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                    <div>
                      <div className="text-sm font-semibold text-purple-400 mb-1">Barber Apprentice</div>
                      <h3 className="font-bold text-white text-lg">Building My Own Business</h3>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-slate-300 text-sm leading-relaxed">
                    "I'm earning money while I learn. My mentor taught me the business side too. Now I'm planning to open my own shop next year."
                  </p>
                  <div className="mt-4 flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  </div>
                </div>
              </div>

              {/* Success Story 3 */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden hover:bg-white/15 transition-all">
                <div className="relative aspect-video bg-slate-700">
                  <Image
                    src="/media/testimonials/student3.jpg"
                    alt="HVAC Graduate Success Story"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                    <div>
                      <div className="text-sm font-semibold text-orange-400 mb-1">HVAC Graduate</div>
                      <h3 className="font-bold text-white text-lg">Career Change at 35</h3>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-slate-300 text-sm leading-relaxed">
                    "Best decision I ever made. I doubled my income and have job security. Companies are constantly calling me with opportunities."
                  </p>
                  <div className="mt-4 flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  </div>
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

        {/* Workforce Funding Section */}
        <section className="py-20 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold mb-6">
                  Free Training Through Workforce Funding
                </h2>
                <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                  Most students pay $0 for training through WIOA, WRG, and JRI programs. We handle all the paperwork.
                </p>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-4 bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">WIOA Funding</h3>
                      <p className="text-blue-100 text-sm">Covers full tuition for eligible students</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <DollarSign className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">Workforce Ready Grant (WRG)</h3>
                      <p className="text-blue-100 text-sm">Up to $5,000 for high-demand careers</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">Job Ready Indiana (JRI)</h3>
                      <p className="text-blue-100 text-sm">State-funded training for career advancement</p>
                    </div>
                  </div>
                </div>

                <Link 
                  href="/apply"
                  className="inline-flex items-center gap-2 bg-white text-blue-600 hover:bg-blue-50 font-bold px-8 py-4 rounded-lg transition-all"
                >
                  Check Your Eligibility
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>

              <div className="relative">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                      <div className="text-4xl font-bold mb-2">$0</div>
                      <div className="text-sm text-blue-100">Average Cost for Students</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                      <div className="text-4xl font-bold mb-2">$5K</div>
                      <div className="text-sm text-blue-100">Max WRG Grant</div>
                    </div>
                  </div>
                  <div className="space-y-4 mt-8">
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                      <div className="text-4xl font-bold mb-2">100%</div>
                      <div className="text-sm text-blue-100">WIOA Coverage</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                      <div className="text-4xl font-bold mb-2">2 min</div>
                      <div className="text-sm text-blue-100">Application Time</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Programs Showcase */}
        <section className="py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">
                Our Training Programs
              </h2>
              <p className="text-xl text-slate-600">
                Fast-track your career with hands-on training in high-demand fields
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* CNA Program */}
              <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all group">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src="/media/programs/cna.jpg"
                    alt="CNA Training Program"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <div className="text-sm font-semibold text-blue-600 mb-2">Healthcare</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Certified Nursing Assistant</h3>
                  <div className="flex items-center gap-4 text-sm text-slate-600 mb-4">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      6-8 weeks
                    </span>
                    <span className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />
                      $32K+ starting
                    </span>
                  </div>
                  <Link href="/programs/cna" className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:gap-3 transition-all">
                    Learn More
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* HVAC Program */}
              <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all group">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src="/media/programs/hvac.jpg"
                    alt="HVAC Training Program"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <div className="text-sm font-semibold text-orange-600 mb-2">Skilled Trades</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">HVAC Technician</h3>
                  <div className="flex items-center gap-4 text-sm text-slate-600 mb-4">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      12 weeks
                    </span>
                    <span className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />
                      $48K+ starting
                    </span>
                  </div>
                  <Link href="/programs/hvac" className="inline-flex items-center gap-2 text-orange-600 font-semibold hover:gap-3 transition-all">
                    Learn More
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Barber Program */}
              <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all group">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src="/media/programs/barber.jpg"
                    alt="Barber Apprenticeship Program"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <div className="text-sm font-semibold text-purple-600 mb-2">Skilled Trades</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Barber Apprenticeship</h3>
                  <div className="flex items-center gap-4 text-sm text-slate-600 mb-4">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      12-18 months
                    </span>
                    <span className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />
                      $35K+ starting
                    </span>
                  </div>
                  <Link href="/programs/barber" className="inline-flex items-center gap-2 text-purple-600 font-semibold hover:gap-3 transition-all">
                    Learn More
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* CDL Program */}
              <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all group">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src="/media/programs/cdl.jpg"
                    alt="CDL Training Program"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <div className="text-sm font-semibold text-green-600 mb-2">Transportation</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Commercial Truck Driving</h3>
                  <div className="flex items-center gap-4 text-sm text-slate-600 mb-4">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      4 weeks
                    </span>
                    <span className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />
                      $55K+ starting
                    </span>
                  </div>
                  <Link href="/programs/truck-driving" className="inline-flex items-center gap-2 text-green-600 font-semibold hover:gap-3 transition-all">
                    Learn More
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>

            <div className="text-center mt-12">
              <Link 
                href="/programs"
                className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold px-8 py-4 rounded-lg transition-all"
              >
                View All Programs
                <ArrowRight className="w-5 h-5" />
              </Link>
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
