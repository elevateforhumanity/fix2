import type { Metadata } from 'next';
import Link from 'next/link';
import { programs } from '@/app/data/programs';
import {
  Clock,
  DollarSign,
  MapPin,
  CheckCircle,
  Users,
  Award,
  TrendingUp,
  Heart,
  Briefcase,
  GraduationCap,
} from 'lucide-react';

export const metadata: Metadata = {
  title:
    'Barber Apprenticeship Indiana | Earn While You Learn | DOL Registered',
  description:
    'Get paid while you learn. Work in a real barbershop from day one, earning $10/hour plus commissions. Skip the $25,000 debt. Graduate in 15-17 months ready to own your chair.',
};

export default function BarberApprenticeshipPage() {
  const barberProgram = programs.find((p) => p.slug === 'barber-apprenticeship');

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section - Inspirational */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20 md:py-32 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Official Badge */}
          <div className="inline-flex items-center gap-2 bg-green-500/20 backdrop-blur-sm border border-green-400/30 px-4 py-2 rounded-full mb-6">
            <Award className="w-4 h-4 text-green-400" />
            <span className="text-sm font-bold text-green-400">
              U.S. Department of Labor Registered Apprenticeship
            </span>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Main Message */}
            <div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                Get Paid to
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
                  Become a Barber
                </span>
              </h1>

              <p className="text-2xl md:text-3xl text-slate-300 mb-8 leading-relaxed font-medium">
                Work in a real barbershop from day one. Earn $10/hour plus
                commissions while you learn. Skip the $25,000 debt.
              </p>

              {/* Key Benefits */}
              <div className="space-y-4 mb-10">
                {[
                  { icon: DollarSign, text: 'Earn $20,000-$30,000 while training' },
                  { icon: Clock, text: 'Graduate in 15-17 months' },
                  { icon: Award, text: 'Indiana Registered Barber License' },
                  { icon: TrendingUp, text: '73% own their chair within 2 years' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-6 h-6 text-orange-400" />
                    </div>
                    <span className="text-lg text-slate-200">{item.text}</span>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/apply"
                  className="inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition shadow-2xl hover:scale-105"
                >
                  Apply Now - It's Free
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm hover:bg-white/20 border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg transition"
                >
                  Talk to an Advisor
                </Link>
              </div>
            </div>

            {/* Right Column - Stats Card */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 md:p-10">
              <h3 className="text-2xl font-bold mb-8 text-center">
                By the Numbers
              </h3>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { number: '$0', label: 'Tuition Cost', color: 'text-green-400' },
                  { number: '2,000', label: 'Training Hours', color: 'text-blue-400' },
                  { number: '$10-12', label: 'Hourly Pay', color: 'text-orange-400' },
                  { number: '15-17', label: 'Months', color: 'text-purple-400' },
                ].map((stat, i) => (
                  <div key={i} className="text-center">
                    <div className={`text-4xl md:text-5xl font-bold mb-2 ${stat.color}`}>
                      {stat.number}
                    </div>
                    <div className="text-sm text-slate-300">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marcus's Story - Storytelling Section */}
      <section className="py-20 bg-gradient-to-br from-orange-50 to-red-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-bold mb-4">
              Real Story
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              From Warehouse Worker to Licensed Barber
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Marcus was 28, working third shift at a warehouse for $12/hour. No
              benefits. No future. Here's how the apprenticeship changed his life.
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-orange-300 transform md:-translate-x-1/2" />

            {/* Timeline Items */}
            <div className="space-y-12">
              {[
                {
                  month: 'Week 1',
                  title: 'First Day at the Shop',
                  description:
                    'Marcus clocked in at MDG Salons. Watched barbers work. Swept hair. Practiced on mannequins. Earned $10/hour for every hour.',
                  icon: MapPin,
                },
                {
                  month: 'Month 3',
                  title: 'First Real Cut',
                  description:
                    'Did his first taper. Hands shook. Mentor coached him through it. Customer tipped $5. Marcus felt like he won the lottery.',
                  icon: Users,
                },
                {
                  month: 'Month 6',
                  title: 'Building Clientele',
                  description:
                    'A customer asked for Marcus by name. He was earning commissions. Paychecks getting bigger. Building something real.',
                  icon: TrendingUp,
                },
                {
                  month: 'Month 12',
                  title: '15 Regular Clients',
                  description:
                    'Guys who only wanted him. Doing fades, beard work, hot towel shaves. Working more independently. Getting it right.',
                  icon: Heart,
                },
                {
                  month: 'Month 17',
                  title: 'Licensed Barber',
                  description:
                    'Passed state board exam first try. Rented his own chair at $250/week. Kept 100% of earnings after rent. Zero debt.',
                  icon: Award,
                },
                {
                  month: 'Today',
                  title: '$55,000/Year',
                  description:
                    '30+ regular clients. Saving to open his own shop in 2 years. Walks into work excited every day. Building something that's his.',
                  icon: Briefcase,
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`relative flex items-center gap-8 ${
                    i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Icon */}
                  <div className="absolute left-8 md:left-1/2 w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center transform md:-translate-x-1/2 z-10 shadow-lg">
                    <item.icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Content Card */}
                  <div
                    className={`flex-1 ml-24 md:ml-0 ${
                      i % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16'
                    }`}
                  >
                    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-xl border-2 border-orange-100">
                      <div className="text-sm font-bold text-orange-600 mb-2">
                        {item.month}
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-3">
                        {item.title}
                      </h3>
                      <p className="text-slate-600 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quote */}
          <div className="mt-16 bg-white rounded-3xl p-8 md:p-12 shadow-2xl border-2 border-orange-100">
            <div className="text-6xl text-orange-500 mb-4">"</div>
            <p className="text-2xl md:text-3xl text-slate-900 font-medium mb-6 leading-relaxed">
              I walk into work every day and I'm excited. I'm building something
              that's mine. This program gave me a shot I never thought I'd have.
            </p>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                M
              </div>
              <div>
                <div className="font-bold text-slate-900">Marcus</div>
                <div className="text-sm text-slate-600">
                  Licensed Barber, Indianapolis
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Funding Options - Visual Cards */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              How You Can Get Funded
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Multiple funding options available. We help you find the right one.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* WIOA Card */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 border-2 border-blue-200 hover:shadow-2xl transition">
              <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mb-6">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">WIOA</h3>
              <p className="text-slate-700 mb-6 leading-relaxed">
                <strong>Workforce Innovation & Opportunity Act.</strong> Covers
                your RTI curriculum if you qualify as low-income, dislocated
                worker, or youth ages 16-24.
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-700">
                    Pays for your 144 hours of theory
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-700">
                    Shop pays your wages ($10/hour)
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-700">
                    You graduate with zero debt
                  </span>
                </div>
              </div>
            </div>

            {/* WRG Card */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 border-2 border-green-200 hover:shadow-2xl transition">
              <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center mb-6">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">WRG</h3>
              <p className="text-slate-700 mb-6 leading-relaxed">
                <strong>Workforce Ready Grant.</strong> Indiana state grant for
                high-demand careers. No income restrictions. Available to all
                Indiana residents.
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-700">
                    Covers RTI curriculum costs
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-700">
                    Faster approval process
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-700">
                    Any income level qualifies
                  </span>
                </div>
              </div>
            </div>

            {/* JRI Card */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 border-2 border-purple-200 hover:shadow-2xl transition">
              <div className="w-16 h-16 bg-purple-500 rounded-2xl flex items-center justify-center mb-6">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">JRI</h3>
              <p className="text-slate-700 mb-6 leading-relaxed">
                <strong>Justice Reinvestment Initiative.</strong> For
                justice-involved individuals. Covers training plus wraparound
                support services.
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-700">
                    Full tuition coverage
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-700">
                    $200-$400/month stipends
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-700">
                    Transportation & childcare help
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Options */}
          <div className="mt-12 grid md:grid-cols-2 gap-8">
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
              <h4 className="font-bold text-slate-900 mb-2">
                Employer Sponsorship
              </h4>
              <p className="text-sm text-slate-600">
                Some barbershops sponsor apprentices directly. They pay your
                wages and cover training costs.
              </p>
            </div>
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
              <h4 className="font-bold text-slate-900 mb-2">Self-Pay</h4>
              <p className="text-sm text-slate-600">
                Pay for RTI curriculum yourself ($4,980). Still earn wages while
                working at the shop.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - Simple Steps */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-slate-600">
              Simple process. We guide you every step.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: '1',
                title: 'Apply',
                description: 'Fill out application. Takes 5 minutes.',
              },
              {
                step: '2',
                title: 'Get Matched',
                description: 'We match you with a licensed barbershop.',
              },
              {
                step: '3',
                title: 'Start Working',
                description: 'Clock in day one. Earn while you learn.',
              },
              {
                step: '4',
                title: 'Get Licensed',
                description: 'Pass state board. Become a registered barber.',
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-20 h-20 bg-orange-500 text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-6 shadow-lg">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-slate-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Assets You Must Have Ready */}
      <section className="py-20 bg-white border-t-4 border-orange-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Assets You Must Have Ready
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Everything you need to understand, apply, and succeed in the program.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Program Overview */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 border-2 border-blue-200">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">
                    Program Overview
                  </h3>
                  <p className="text-sm text-slate-600">
                    1-2 page summary of what it is and who it's for
                  </p>
                </div>
              </div>
              <div className="space-y-4 text-slate-700">
                <div>
                  <h4 className="font-bold text-slate-900 mb-2">What It Is:</h4>
                  <p className="text-sm leading-relaxed">
                    DOL-registered apprenticeship combining 2,000 hours of paid on-the-job training at a licensed barbershop with 144 hours of Related Technical Instruction (RTI). Graduate as an Indiana Registered Barber.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-2">Who It's For:</h4>
                  <ul className="text-sm space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span>Ages 17+ with high school diploma or GED</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span>Career changers seeking skilled trade</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span>Justice-involved individuals rebuilding</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span>Anyone wanting to earn while they learn</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-2">Timeline:</h4>
                  <p className="text-sm">15-17 months working 40 hours/week</p>
                </div>
              </div>
            </div>

            {/* Eligibility Cheat Sheet */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 border-2 border-green-200">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">
                    Eligibility Cheat Sheet
                  </h3>
                  <p className="text-sm text-slate-600">
                    WIOA/WRG funding basics
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-white rounded-xl p-4 border border-green-200">
                  <h4 className="font-bold text-slate-900 mb-2">WIOA Eligibility:</h4>
                  <ul className="text-sm text-slate-700 space-y-1">
                    <li>✓ Low-income adults</li>
                    <li>✓ Dislocated workers</li>
                    <li>✓ Youth ages 16-24</li>
                    <li>✓ Apply through WorkOne</li>
                  </ul>
                </div>
                <div className="bg-white rounded-xl p-4 border border-green-200">
                  <h4 className="font-bold text-slate-900 mb-2">WRG Eligibility:</h4>
                  <ul className="text-sm text-slate-700 space-y-1">
                    <li>✓ Indiana residents</li>
                    <li>✓ High-demand careers (barber qualifies)</li>
                    <li>✓ Any income level</li>
                    <li>✓ Apply through WorkOne</li>
                  </ul>
                </div>
                <div className="bg-white rounded-xl p-4 border border-green-200">
                  <h4 className="font-bold text-slate-900 mb-2">What Funding Covers:</h4>
                  <ul className="text-sm text-slate-700 space-y-1">
                    <li>✓ 144 hours of RTI curriculum</li>
                    <li>✓ Books and materials</li>
                    <li>✓ State board exam fees</li>
                    <li>✗ Shop pays your wages ($10/hour)</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Intake Link / Referral Form */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 border-2 border-purple-200">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">
                    Intake & Referral
                  </h3>
                  <p className="text-sm text-slate-600">
                    Start your application or refer someone
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-white rounded-xl p-6 border border-purple-200">
                  <h4 className="font-bold text-slate-900 mb-3">For Students:</h4>
                  <Link
                    href="/apply"
                    className="inline-flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-bold text-sm transition w-full"
                  >
                    Apply Now - It's Free
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                  <p className="text-xs text-slate-600 mt-3">
                    Takes 5 minutes. No commitment required.
                  </p>
                </div>
                <div className="bg-white rounded-xl p-6 border border-purple-200">
                  <h4 className="font-bold text-slate-900 mb-3">For Partners:</h4>
                  <Link
                    href="/contact?topic=referral"
                    className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-purple-600 border-2 border-purple-600 px-6 py-3 rounded-xl font-bold text-sm transition w-full"
                  >
                    Refer a Candidate
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                  <p className="text-xs text-slate-600 mt-3">
                    WorkOne, community orgs, reentry programs
                  </p>
                </div>
              </div>
            </div>

            {/* Employer Value Summary */}
            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-3xl p-8 border-2 border-orange-200">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">
                    Employer Value Summary
                  </h3>
                  <p className="text-sm text-slate-600">
                    Wages + Funding + WOTC
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-white rounded-xl p-4 border border-orange-200">
                  <h4 className="font-bold text-slate-900 mb-2">What Shop Pays:</h4>
                  <ul className="text-sm text-slate-700 space-y-1">
                    <li>• $10-12/hour base wage</li>
                    <li>• Commissions (40-60% of services)</li>
                    <li>• Tips (apprentice keeps 100%)</li>
                    <li>• Total cost: $20,000-$30,000 over 15-17 months</li>
                  </ul>
                </div>
                <div className="bg-white rounded-xl p-4 border border-orange-200">
                  <h4 className="font-bold text-slate-900 mb-2">What Funding Covers:</h4>
                  <ul className="text-sm text-slate-700 space-y-1">
                    <li>• WIOA/WRG pays for RTI curriculum</li>
                    <li>• Shop does NOT pay for training</li>
                    <li>• Shop only pays wages for work performed</li>
                  </ul>
                </div>
                <div className="bg-white rounded-xl p-4 border border-orange-200">
                  <h4 className="font-bold text-slate-900 mb-2">WOTC Tax Credits:</h4>
                  <ul className="text-sm text-slate-700 space-y-1">
                    <li>• Ex-felons: Up to $2,400</li>
                    <li>• SNAP recipients: Up to $2,400</li>
                    <li>• Veterans: Up to $9,600</li>
                    <li>• Long-term unemployed: Up to $2,400</li>
                  </ul>
                  <p className="text-xs text-slate-600 mt-2">
                    <strong>Net cost after WOTC:</strong> $17,600-$27,600 (or less)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Compliance Snapshot - Full Width */}
          <div className="mt-8 bg-gradient-to-br from-slate-50 to-slate-100 rounded-3xl p-8 border-2 border-slate-300">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-slate-700 rounded-xl flex items-center justify-center flex-shrink-0">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                  Compliance Snapshot
                </h3>
                <p className="text-sm text-slate-600">
                  RAPIDS, Wage Progression, RTI Requirements
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Award className="w-5 h-5 text-blue-600" />
                  RAPIDS Registration
                </h4>
                <ul className="text-sm text-slate-700 space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Program ID: 2025-IN-132301</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Registered with U.S. DOL</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Approved by Indiana DWD</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Meets Indiana State Board standards</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  Wage Progression
                </h4>
                <ul className="text-sm text-slate-700 space-y-2">
                  <li><strong>Months 1-6:</strong> $10/hour + tips</li>
                  <li><strong>Months 7-12:</strong> $10/hour + commissions (40-50%) + tips</li>
                  <li><strong>Months 13-17:</strong> $10-12/hour + commissions (50-60%) + tips</li>
                  <li><strong>Post-licensing:</strong> Chair rental or commission-based (60-70%)</li>
                </ul>
                <p className="text-xs text-slate-600 mt-3">
                  Wages increase as skills develop
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-purple-600" />
                  RTI Requirements
                </h4>
                <ul className="text-sm text-slate-700 space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>144 hours total</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>3-4 hours/week online</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Barbering theory, sanitation, business</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Flexible schedule (evenings/weekends)</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
              <p className="text-sm text-slate-700">
                <strong className="text-slate-900">Compliance Note:</strong> All apprentices must complete 2,000 hours of on-the-job training + 144 hours of RTI to be eligible for Indiana State Board licensing exam. Shop owners must maintain wage records and hour logs for DOL compliance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-orange-500 to-red-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-2xl mb-10 text-white/90">
            Apply now. It's 100% free. No commitment required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/apply"
              className="inline-flex items-center justify-center gap-2 bg-white text-orange-600 hover:bg-slate-100 px-10 py-5 rounded-xl font-bold text-lg transition shadow-2xl hover:scale-105"
            >
              Apply Now - It's Free
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm hover:bg-white/20 border-2 border-white text-white px-10 py-5 rounded-xl font-bold text-lg transition"
            >
              Talk to an Advisor
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
