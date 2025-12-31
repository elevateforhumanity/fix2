import Link from 'next/link';
import Image from 'next/image';
import { programs } from '@/app/data/programs';
import { Metadata } from 'next';
import { 
  ChevronRight, 
  Phone, 
  Mail, 
  MapPin,
  GraduationCap,
  Briefcase,
  DollarSign,
  Clock,
  CheckCircle,
  ArrowRight,
  Award,
  Users,
  TrendingUp
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Free Career Training Programs in Indiana | Indiana Career Connect',
  description:
    'Find your path to a better career. 100% free training programs in healthcare, skilled trades, and business. Funded by Indiana Career Connect and WIOA. Start today.',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/programs',
  },
};

export default function ProgramsPage() {
  return (
    <main className="bg-white">
      {/* Breadcrumbs */}
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <nav
            role="navigation"
            aria-label="Main navigation"
            className="flex items-center gap-2 text-sm text-slate-600"
          >
            <Link
              href="/"
              aria-label="Link"
              className="hover:text-brand-orange-600 transition"
            >
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-slate-900 font-medium">Programs</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative text-white py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://burst.shopifycdn.com/photos/students-in-class.jpg?width=1920&format=pjpg&exif=1&iptc=1"
            alt="Career Training Programs"
            fill
            className="object-cover"
            quality={100}
            priority
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-green-500/20 backdrop-blur-sm px-6 py-3 rounded-full border border-green-500/30 mb-6">
              <Award className="w-5 h-5 text-green-400" />
              <span className="text-green-100 font-semibold">WIOA & Indiana Career Connect Funded</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black mb-6 uppercase tracking-tight">
              Free Career Training
            </h1>
            <p className="text-2xl md:text-3xl font-bold text-gray-100 mb-8 max-w-4xl mx-auto">
              50+ Programs in Healthcare, Skilled Trades & Business
            </p>
            <p className="text-xl text-gray-200 mb-10 max-w-3xl mx-auto">
              100% funded training. No tuition, no debt. Get trained, get certified, get hired.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#programs"
                className="group inline-flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 px-10 py-5 text-lg font-black text-white shadow-2xl hover:from-orange-600 hover:to-orange-700 transition-all transform hover:scale-105 uppercase"
              >
                Browse Programs
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/apply"
                className="group inline-flex items-center justify-center gap-3 rounded-xl border-3 border-white bg-white/10 backdrop-blur-sm px-10 py-5 text-lg font-black text-white hover:bg-white hover:text-green-900 transition-all transform hover:scale-105 uppercase"
              >
                Apply Now
                <GraduationCap className="w-5 h-5" />
              </Link>
            </div>

            {/* Quick Stats */}
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <DollarSign className="w-10 h-10 text-green-400 mx-auto mb-2" />
                <div className="text-2xl font-black mb-1">100% Free</div>
                <div className="text-sm text-gray-200">No Tuition</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <Clock className="w-10 h-10 text-orange-400 mx-auto mb-2" />
                <div className="text-2xl font-black mb-1">Flexible</div>
                <div className="text-sm text-gray-200">Schedule Options</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <Award className="w-10 h-10 text-blue-400 mx-auto mb-2" />
                <div className="text-2xl font-black mb-1">Certified</div>
                <div className="text-sm text-gray-200">Industry Credentials</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <Briefcase className="w-10 h-10 text-yellow-400 mx-auto mb-2" />
                <div className="text-2xl font-black mb-1">Job Ready</div>
                <div className="text-sm text-gray-200">Career Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Internal Navigation */}
      <section className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex overflow-x-auto gap-1 py-2">
            <a href="#healthcare" className="px-6 py-3 text-sm font-semibold text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition whitespace-nowrap">
              Healthcare
            </a>
            <a href="#trades" className="px-6 py-3 text-sm font-semibold text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition whitespace-nowrap">
              Skilled Trades
            </a>
            <a href="#business" className="px-6 py-3 text-sm font-semibold text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition whitespace-nowrap">
              Business & Finance
            </a>
            <a href="#beauty" className="px-6 py-3 text-sm font-semibold text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition whitespace-nowrap">
              Beauty & Wellness
            </a>
            <a href="#transportation" className="px-6 py-3 text-sm font-semibold text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition whitespace-nowrap">
              Transportation
            </a>
            <a href="#apprenticeships" className="px-6 py-3 text-sm font-semibold text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition whitespace-nowrap">
              Apprenticeships
            </a>
          </nav>
        </div>
      </section>

      {/* How It Works - Simple & Clear */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              We make it simple. Here's what happens when you apply:
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: '1',
                title: 'Apply',
                description:
                  'Fill out a quick application. Takes 5 minutes. No commitment.',
              },
              {
                step: '2',
                title: 'Talk to Us',
                description:
                  'An advisor calls you within 24 hours to discuss your goals and options.',
              },
              {
                step: '3',
                title: 'Get Enrolled',
                description:
                  'We handle the paperwork, funding, and enrollment. You just show up.',
              },
              {
                step: '4',
                title: 'Start Training',
                description:
                  'Begin your program with full support. Graduate with a real credential.',
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-16 h-16 bg-brand-orange-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-slate-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Funding Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          {/* Funding Section */}
          <div className="bg-blue-50 rounded-2xl p-8 md:p-12 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center uppercase">
              100% Free - No Student Debt
            </h2>
            <p className="text-lg text-gray-700 text-center mb-8 max-w-3xl mx-auto">
              All training is funded through federal workforce programs. You pay
              nothing.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  WIOA Funding
                </h3>
                <p className="text-gray-600">
                  Workforce Innovation & Opportunity Act covers tuition and
                  training costs for eligible participants
                </p>
              </div>
              <div className="bg-white rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  WRG Support
                </h3>
                <p className="text-gray-600">
                  Workforce Readiness & Growth provides wraparound support to
                  help you complete training
                </p>
              </div>
              <div className="bg-white rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Apprenticeships
                </h3>
                <p className="text-gray-600">
                  Earn while you learn through DOL-registered apprenticeship
                  programs
                </p>
              </div>
            </div>
            <div className="text-center mt-8">
              <Link
                href="/funding"
                className="inline-flex items-center justify-center rounded-md bg-blue-600 px-8 py-4 text-lg font-bold text-white shadow-lg hover:bg-blue-700 transition-all"
              >
                Learn More About Funding
              </Link>
            </div>
          </div>

          {/* What You Get Section */}
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center uppercase">
              What You Get
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-green-200">
                  <Image
                    src="/images/programs/efh-cpr-aed-first-aid-card.jpg"
                    alt="Certifications"
                    width={48}
                    height={48}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Industry Certifications
                  </h3>
                  <p className="text-gray-600">
                    Earn credentials that employers recognize and trust
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-green-200">
                  <Image
                    src="/images/programs/efh-building-tech-card.jpg"
                    alt="Training"
                    width={48}
                    height={48}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Hands-On Training
                  </h3>
                  <p className="text-gray-600">
                    Real-world experience, not just classroom learning
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-green-200">
                  <Image
                    src="/images/programs/efh-esthetician-client-services-card.jpg"
                    alt="Career Services"
                    width={48}
                    height={48}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Career Services
                  </h3>
                  <p className="text-gray-600">
                    Resume help, interview prep, and job placement support
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-green-200">
                  <Image
                    src="/images/programs/efh-public-safety-reentry-card.jpg"
                    alt="Employers"
                    width={48}
                    height={48}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Employer Connections
                  </h3>
                  <p className="text-gray-600">
                    Direct access to 500+ hiring partners
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 uppercase">
              Choose Your Industry
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Explore our four main industries and find the right career path
              for you
            </p>
          </div>

          {/* Main Industries Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Healthcare */}
            <Link
              href="/industries/healthcare"
              className="group block bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="aspect-video relative overflow-hidden bg-gray-900">
                <Image
                  src="/images/programs/healthcare.jpg"
                  alt="Healthcare Programs"
                  fill
                  className="object-cover group-hover:scale-110 transition-all duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-2xl font-bold text-white mb-1">
                    Healthcare
                  </h3>
                  <p className="text-sm text-white/90">7 Programs Available</p>
                </div>
              </div>
              <div className="p-6 bg-white">
                <h4 className="font-bold text-gray-900 mb-2">
                  What You'll Do:
                </h4>
                <p className="text-gray-700 mb-3">
                  Help people every day in hospitals, nursing homes, and home
                  health settings. Make a real difference in your community.
                </p>
                <h4 className="font-bold text-gray-900 mb-2">
                  Programs Include:
                </h4>
                <p className="text-gray-600 text-sm mb-4">
                  CNA, Medical Assistant, Home Health Aide, Phlebotomy, CPR &
                  First Aid, Peer Recovery Coach
                </p>
                <p className="text-orange-500 font-bold text-lg group-hover:text-orange-600 transition-colors flex items-center gap-2">
                  View Healthcare Programs
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </p>
              </div>
            </Link>

            {/* Industrial & Trades */}
            <Link
              href="/industries/industrial"
              className="group block bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="aspect-video relative overflow-hidden bg-gray-900">
                <Image
                  src="/images/programs/construction.jpg"
                  alt="Industrial & Trades Programs"
                  fill
                  className="object-cover group-hover:scale-110 transition-all duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-2xl font-bold text-white mb-1">
                    Industrial & Trades
                  </h3>
                  <p className="text-sm text-white/90">3 Programs Available</p>
                </div>
              </div>
              <div className="p-6 bg-white">
                <h4 className="font-bold text-gray-900 mb-2">
                  What You'll Do:
                </h4>
                <p className="text-gray-700 mb-3">
                  Build, fix, and maintain essential systems. Work with your
                  hands and earn excellent pay with strong job security.
                </p>
                <h4 className="font-bold text-gray-900 mb-2">
                  Programs Include:
                </h4>
                <p className="text-gray-600 text-sm mb-4">
                  HVAC Technician, Building Maintenance, CDL Training
                </p>
                <p className="text-orange-500 font-bold text-lg group-hover:text-orange-600 transition-colors flex items-center gap-2">
                  View Industrial Programs
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </p>
              </div>
            </Link>

            {/* Beauty & Wellness */}
            <Link
              href="/industries/beauty-wellness"
              className="group block bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="aspect-video relative overflow-hidden bg-gray-900">
                <Image
                  src="/images/programs/entrepreneurship.jpg"
                  alt="Beauty & Wellness Programs"
                  fill
                  className="object-cover group-hover:scale-110 transition-all duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-2xl font-bold text-white mb-1">
                    Beauty & Wellness
                  </h3>
                  <p className="text-sm text-white/90">3 Programs Available</p>
                </div>
              </div>
              <div className="p-6 bg-white">
                <h4 className="font-bold text-gray-900 mb-2">
                  What You'll Do:
                </h4>
                <p className="text-gray-700 mb-3">
                  Creative work with flexible schedules. Build your own
                  clientele and be your own boss with unlimited earning
                  potential.
                </p>
                <h4 className="font-bold text-gray-900 mb-2">
                  Programs Include:
                </h4>
                <p className="text-gray-600 text-sm mb-4">
                  Barber Apprenticeship, Professional Esthetician, Beauty Career
                  Educator
                </p>
                <p className="text-orange-500 font-bold text-lg group-hover:text-orange-600 transition-colors flex items-center gap-2">
                  View Beauty Programs
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </p>
              </div>
            </Link>

            {/* Business & Finance */}
            <Link
              href="/industries/business"
              className="group block bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="aspect-video relative overflow-hidden bg-gray-900">
                <Image
                  src="/images/programs/business.jpg"
                  alt="Business & Finance Programs"
                  fill
                  className="object-cover group-hover:scale-110 transition-all duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-2xl font-bold text-white mb-1">
                    Business & Finance
                  </h3>
                  <p className="text-sm text-white/90">2 Programs Available</p>
                </div>
              </div>
              <div className="p-6 bg-white">
                <h4 className="font-bold text-gray-900 mb-2">
                  What You'll Do:
                </h4>
                <p className="text-gray-700 mb-3">
                  Start your own business or help others succeed. Learn skills
                  that open doors to entrepreneurship and financial
                  independence.
                </p>
                <h4 className="font-bold text-gray-900 mb-2">
                  Programs Include:
                </h4>
                <p className="text-gray-600 text-sm mb-4">
                  Business Startup & Marketing, Tax Preparation & Financial
                  Services
                </p>
                <p className="text-orange-500 font-bold text-lg group-hover:text-orange-600 transition-colors flex items-center gap-2">
                  View Business Programs
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section - Modern & Encouraging */}
      <section className="py-20 bg-brand-orange-600 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-white/10" />

        <div className="relative max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Change Your Life?
          </h2>
          <p className="text-xl md:text-2xl text-white/90 mb-6 leading-relaxed max-w-3xl mx-auto">
            You don't need to figure this out alone. Our advisors are here to
            help you find the right program, get funding, and start training.
          </p>
          <p className="text-lg text-white/80 mb-10 max-w-2xl mx-auto">
            Call us today or apply online. Either way, we'll be in touch within
            24 hours to help you get started.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Link
              href="/apply"
              className="inline-flex items-center gap-2 bg-white text-orange-600 hover:bg-orange-50 px-10 py-5 rounded-xl font-bold text-lg transition shadow-2xl hover:scale-105"
            >
              Apply Now - It's Free
              <ChevronRight className="w-5 h-5" />
            </Link>
            <a
              href="tel:3173143757"
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md hover:bg-white/20 border-2 border-white text-white px-10 py-5 rounded-xl font-bold text-lg transition"
            >
              <Phone className="w-5 h-5" />
              (317) 314-3757
            </a>
            <a
              href="mailto:info@elevateforhumanity.org"
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md hover:bg-white/20 border-2 border-white text-white px-10 py-5 rounded-xl font-bold text-lg transition"
            >
              <Mail className="w-5 h-5" />
              Email Us
            </a>
          </div>

          {/* Trust Signals */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6">
              <div className="text-4xl font-bold mb-2">24hrs</div>
              <div className="text-white/80">Response Time</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6">
              <div className="text-4xl font-bold mb-2">$0</div>
              <div className="text-white/80">Out of Pocket</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6">
              <div className="text-4xl font-bold mb-2">90%</div>
              <div className="text-white/80">Job Placement</div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/20">
            <p className="text-sm text-white/70">
              Funded by Indiana Career Connect and WIOA • Serving Indianapolis
              and surrounding areas • Equal Opportunity Provider
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
