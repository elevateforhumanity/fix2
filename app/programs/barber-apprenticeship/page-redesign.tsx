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
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
