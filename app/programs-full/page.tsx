import Link from 'next/link';
import {
  CheckCircle,
  Users,
  Award,
  TrendingUp,
  BookOpen,
  Briefcase,
  GraduationCap,
  Building2,
} from 'lucide-react';

export const metadata = {
  title: 'Workforce Training Programs | Elevate for Humanity',
  description:
    'WIOA, WRG, JRI, DOL Registered Apprenticeships, EmployIndy partnerships. Free workforce training across Indiana.',
};

export default function ProgramsFullPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="elevate-nav">
        <div className="elevate-logo">
          <div className="elevate-logo-mark">E</div>
          <div className="flex flex-col">
            <span className="font-bold text-lg">Elevate for Humanity</span>
            <span className="text-xs text-gray-600">
              Elevate Connects Directory
            </span>
          </div>
        </div>
        <div className="flex gap-3 items-center">
          <Link
            href="/"
            className="text-gray-700 hover:text-red-600 font-medium"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="text-gray-700 hover:text-red-600 font-medium"
          >
            About
          </Link>
          <Link href="/login" className="elevate-btn-secondary">
            Sign In
          </Link>
          <Link href="/signup" className="elevate-btn-primary">
            Get Started
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-blue-700 text-white py-20">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '40px 40px',
            }}
          ></div>
        </div>

        <div className="elevate-container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Elevate Connects Directory
            </h1>
            <p className="text-2xl font-semibold mb-4 text-orange-300">
              Workforce Training • Apprenticeships • Employer Partnerships
            </p>
            <p className="text-xl mb-8 text-white/90">
              Where Innovation Meets Opportunity.
            </p>
            <p className="text-lg mb-8 text-white/80 max-w-3xl mx-auto">
              Elevate for Humanity connects learners, employers, and training
              providers through a powerful workforce ecosystem aligned with
              Indiana's most impactful initiatives — WIOA, WRG, JRI, EmployIndy,
              and Registered Apprenticeships.
            </p>
            <div className="inline-block px-6 py-3 bg-white/20 backdrop-blur-sm rounded-lg text-xl font-bold">
              Innovate pathways. Elevate communities. Reset the workforce.
            </div>
          </div>
        </div>
      </section>

      {/* Featured Workforce Pathways */}
      <section className="py-20 bg-gray-50">
        <div className="elevate-container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Featured Workforce Pathways
            </h2>
            <p className="text-xl text-gray-600">
              Multiple funding sources. One powerful platform.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* WIOA */}
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <Award className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                WIOA-Funded Training
              </h3>
              <p className="text-gray-600 mb-4">
                Workforce Innovation & Opportunity Act provides eligible
                individuals with free or low-cost job training, career support,
                and direct employer connections.
              </p>
              <div className="mb-4">
                <p className="font-semibold text-gray-900 mb-2">
                  Eligible training includes:
                </p>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Barbering</li>
                  <li>• HVAC / Skilled Trades</li>
                  <li>• CNA / Healthcare</li>
                  <li>• CDL / Transportation</li>
                  <li>• IT & Digital Skills</li>
                  <li>• Apprenticeship Programs</li>
                </ul>
              </div>
              <p className="text-sm text-gray-600 italic">
                We partner with WorkOne, EmployIndy, and state-approved ETPL
                providers.
              </p>
            </div>

            {/* WRG */}
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition-shadow">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                <GraduationCap className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                WRG - Workforce Ready Grant
              </h3>
              <p className="text-gray-600 mb-4">
                Next Level Jobs program helps Indiana residents gain high-value,
                high-demand certifications at no out-of-pocket cost.
              </p>
              <div className="mb-4">
                <p className="font-semibold text-gray-900 mb-2">
                  Eligible industries:
                </p>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Advanced Manufacturing</li>
                  <li>• Building Trades & HVAC</li>
                  <li>• Health & Human Services</li>
                  <li>• Transportation & Logistics</li>
                  <li>• IT & Business Support</li>
                </ul>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold">
                  Tuition-free
                </span>
                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold">
                  Industry credentials
                </span>
              </div>
            </div>

            {/* JRI */}
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition-shadow">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-6">
                <Users className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                JRI - Job Ready Indy
              </h3>
              <p className="text-gray-600 mb-4">
                Youth-focused credential from EmployIndy helps young adults
                develop workplace skills and connect to work experience
                opportunities.
              </p>
              <div className="mb-4">
                <p className="font-semibold text-gray-900 mb-2">
                  JRI focuses on:
                </p>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Professionalism & reliability</li>
                  <li>• Teamwork & communication</li>
                  <li>• Problem solving</li>
                  <li>• Digital skills</li>
                  <li>• Work ethic & responsibility</li>
                </ul>
              </div>
              <p className="text-sm text-gray-600 italic">
                Perfect for young adults entering apprenticeship or first-time
                employment.
              </p>
            </div>

            {/* DOL Apprenticeships */}
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition-shadow">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mb-6">
                <Briefcase className="h-8 w-8 text-teal-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Registered Apprenticeships
              </h3>
              <p className="text-gray-600 mb-4">
                DOL & Apprenticeship Indiana. Earn while you learn. Combine
                on-the-job training + classroom instruction with portable,
                nationally recognized credentials.
              </p>
              <div className="mb-4">
                <p className="font-semibold text-gray-900 mb-2">
                  We support apprenticeships in:
                </p>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Barbering</li>
                  <li>• Building Maintenance</li>
                  <li>• HVAC & Skilled Trades</li>
                  <li>• Healthcare Support</li>
                  <li>• IT & Digital Services</li>
                  <li>• CDL / Transportation</li>
                </ul>
              </div>
              <a
                href="https://www.in.gov/dwd/apprenticeship-indiana/home/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-600 hover:text-teal-700 font-semibold text-sm"
              >
                Learn More →
              </a>
            </div>

            {/* WEX/OJT */}
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition-shadow">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
                <Building2 className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                WEX & OJT
              </h3>
              <p className="text-gray-600 mb-4">
                Work Experience / On-the-Job Training. Employers receive wage
                reimbursement for training new hires, while jobseekers gain
                real-world experience.
              </p>
              <div className="mb-4">
                <p className="font-semibold text-gray-900 mb-2">Benefits:</p>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• 50–75% wage reimbursement</li>
                  <li>• Strengthened employer pipelines</li>
                  <li>• Work experience for youth & adults</li>
                  <li>• Smooth transition to employment</li>
                </ul>
              </div>
              <p className="text-sm text-gray-600">
                Works with: Barber shops • HVAC companies • CNA facilities • CDL
                carriers • Tech firms
              </p>
            </div>

            {/* EmployIndy */}
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition-shadow">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-6">
                <TrendingUp className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                EmployIndy & MAP
              </h3>
              <p className="text-gray-600 mb-4">
                Modern Apprenticeship Program and EmployIndy initiatives build
                career pathways through youth programs, JAG partnerships, and
                opportunity youth support.
              </p>
              <div className="mb-4">
                <p className="font-semibold text-gray-900 mb-2">Includes:</p>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Modern Apprenticeship (high school youth)</li>
                  <li>• JAG partnerships</li>
                  <li>• Opportunity Youth programs</li>
                  <li>• Career coaching + employer match</li>
                </ul>
              </div>
              <a
                href="https://employindy.org/modern-apprenticeship/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:text-indigo-700 font-semibold text-sm"
              >
                Learn More →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Serve */}
      <section className="py-20 bg-white">
        <div className="elevate-container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Who We Serve
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Students & Jobseekers
              </h3>
              <p className="text-gray-600">
                Find WIOA-eligible programs, WRG certifications,
                apprenticeships, youth programs & employer partners.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-10 w-10 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Training Providers
              </h3>
              <p className="text-gray-600">
                List your barber, HVAC, CNA, CDL, IT, apprenticeship, or
                workforce training program.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="h-10 w-10 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Employers
              </h3>
              <p className="text-gray-600">
                Hire apprentices, host WEX/OJT students, and build a funded
                training pipeline.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building2 className="h-10 w-10 text-teal-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Community Organizations
              </h3>
              <p className="text-gray-600">
                Connect youth & adults to coordinated workforce pathways with
                strong wraparound supports.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why It Works */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="elevate-container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Elevate Connects Directory Works
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <CheckCircle className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                One Central Platform
              </h3>
              <p className="text-gray-600">
                For programs, apprenticeships, providers, and jobseekers.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg">
              <CheckCircle className="h-12 w-12 text-purple-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Funding-Aligned
              </h3>
              <p className="text-gray-600">
                Programs aligned with WIOA, WRG, JRI, DOL Apprenticeships, and
                EmployIndy.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg">
              <CheckCircle className="h-12 w-12 text-orange-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Employer-Driven
              </h3>
              <p className="text-gray-600">
                Businesses post openings, sponsor apprenticeships, request
                WEX/OJT talent.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg">
              <CheckCircle className="h-12 w-12 text-teal-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Student-Ready
              </h3>
              <p className="text-gray-600">
                Clear enrollment steps, progress tracking, and digital
                credentials.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg">
              <CheckCircle className="h-12 w-12 text-red-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Community-Built
              </h3>
              <p className="text-gray-600">
                Powered by Elevate for Humanity's commitment to opportunity,
                equity, and transformation.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg">
              <CheckCircle className="h-12 w-12 text-indigo-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Results-Focused
              </h3>
              <p className="text-gray-600">
                Track outcomes, measure impact, and celebrate success stories.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-700 text-white">
        <div className="elevate-container">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl text-white/90">Choose your pathway below</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4 max-w-6xl mx-auto">
            <Link
              href="/programs"
              className="bg-white text-blue-600 px-6 py-4 rounded-lg font-bold text-center hover:bg-gray-100 transition-colors"
            >
              Explore Programs
            </Link>
            <Link
              href="/program-holder/apply"
              className="bg-white text-purple-600 px-6 py-4 rounded-lg font-bold text-center hover:bg-gray-100 transition-colors"
            >
              Training Provider
            </Link>
            <Link
              href="/enroll"
              className="bg-white text-orange-600 px-6 py-4 rounded-lg font-bold text-center hover:bg-gray-100 transition-colors"
            >
              Employer Partnerships
            </Link>
            <Link
              href="/programs"
              className="bg-white text-teal-600 px-6 py-4 rounded-lg font-bold text-center hover:bg-gray-100 transition-colors"
            >
              View Apprenticeships
            </Link>
            <Link
              href="/enroll"
              className="bg-white text-red-600 px-6 py-4 rounded-lg font-bold text-center hover:bg-gray-100 transition-colors"
            >
              Youth / JRI Pathway
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="elevate-container">
          <div className="text-center">
            <p className="text-2xl font-bold mb-2">Elevate for Humanity</p>
            <p className="text-gray-400 mb-4">Innovate. Elevate. Reset.</p>
            <p className="text-sm text-gray-500">
              Building the workforce of tomorrow, today.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
