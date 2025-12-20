import type { Metadata } from 'next';
import Link from 'next/link';
import {
  GraduationCap,
  Clock,
  DollarSign,
  MapPin,
  CheckCircle,
  Users,
  FileText,
  Award,
  TrendingUp,
  ExternalLink,
  Phone,
  Mail,
} from 'lucide-react';

export const metadata: Metadata = {
  title:
    'Barber Apprenticeship Program | Indiana Registered Apprenticeship | Elevate for Humanity',
  description:
    'U.S. DOL Registered Barber Apprenticeship in Indiana. Earn while you learn with paid on-the-job training + classroom instruction. 1,500 hours to licensure.',
};

export default function BarberApprenticeshipPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Official Badge */}
      <div className="bg-blue-900 text-white py-2">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm">
          <strong>
            U.S. Department of Labor Registered Apprenticeship Program
          </strong>{' '}
          | Approved by Indiana DWD
        </div>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="px-4 py-2 bg-brand-green-600 text-white text-sm font-bold rounded-full">
              Earn While You Learn
            </span>
            <span className="px-4 py-2 bg-brand-orange-600 text-white text-sm font-bold rounded-full">
              Free with Funding
            </span>
            <span className="px-4 py-2 bg-brand-blue-600 text-white text-sm font-bold rounded-full">
              DOL Registered
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Barber Apprenticeship Program
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-6 max-w-3xl">
            Get matched to a licensed barber shop, receive hands-on training,
            earn a paycheck, and qualify for your Indiana Barber License through
            our U.S. DOL Registered Apprenticeship.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Link
              href="/apply"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-orange-600 hover:bg-brand-orange-700 text-white font-bold text-lg rounded-lg transition shadow-lg"
            >
              Apply Now
            </Link>
            <a
              href="tel:3173143757"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-bold text-lg rounded-lg transition border-2 border-white/30"
            >
              <Phone className="w-5 h-5" />
              Call: (317) 314-3757
            </a>
          </div>

          <p className="text-sm text-white/70">
            Program Reference:{' '}
            <a
              href="https://intraining.dwd.in.gov/ProgramLocation?ProgramId=10002417"
              target="_blank"
              rel="noopener"
              className="underline hover:text-white"
            >
              INTraining Program #10002417
            </a>
          </p>
        </div>
      </section>

      {/* What is a Registered Apprenticeship */}
      <section className="py-12 md:py-16 bg-blue-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            What is a Registered Apprenticeship?
          </h2>
          <div className="bg-white border-2 border-blue-200 rounded-xl p-6 md:p-8">
            <p className="text-lg text-slate-700 mb-4">
              A <strong>Registered Apprenticeship</strong> is a structured
              talent development strategy that combines:
            </p>
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-brand-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">
                    On-the-Job Learning
                  </h3>
                  <p className="text-sm text-slate-600">
                    Paid work at a licensed barber shop
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-brand-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  2
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">
                    Classroom Learning
                  </h3>
                  <p className="text-sm text-slate-600">
                    Related Technical Instruction (RTI)
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-brand-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  3
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">Mentorship</h3>
                  <p className="text-sm text-slate-600">
                    Guidance from licensed barbers
                  </p>
                </div>
              </div>
            </div>
            <p className="text-slate-700">
              Programs are{' '}
              <strong>
                approved by the U.S. Department of Labor (U.S. DOL)
              </strong>{' '}
              and meet federal standards. Upon completion, you receive a{' '}
              <strong>nationally-recognized credential</strong> that qualifies
              you for licensure.
            </p>
            <p className="text-sm text-slate-600 mt-4">
              Source:{' '}
              <a
                href="https://www.in.gov/dwd/owbla/registered-apprenticeship-basics/"
                target="_blank"
                rel="noopener"
                className="text-brand-blue-600 hover:underline"
              >
                Indiana DWD - Registered Apprenticeship Basics{' '}
                <ExternalLink className="w-3 h-3 inline" />
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* Program At-a-Glance */}
      <section className="py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">
            Program At-a-Glance
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Clock,
                title: 'Duration',
                value: '12-18 months',
                detail: '1,500 total hours required',
              },
              {
                icon: DollarSign,
                title: 'Cost',
                value: 'Free with funding',
                detail: 'WIOA, WRG, or self-pay',
              },
              {
                icon: MapPin,
                title: 'Format',
                value: 'Hybrid',
                detail: 'Shop work + classroom',
              },
              {
                icon: Award,
                title: 'Outcome',
                value: 'Barber License',
                detail: 'Indiana state license',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-slate-50 border border-slate-200 rounded-xl p-6"
              >
                <item.icon className="w-8 h-8 text-brand-orange-600 mb-3" />
                <h3 className="font-bold text-slate-900 mb-1">{item.title}</h3>
                <p className="text-lg font-semibold text-slate-900 mb-1">
                  {item.value}
                </p>
                <p className="text-sm text-slate-600">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 md:py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">
            How the Apprenticeship Works
          </h2>

          <div className="space-y-6">
            {[
              {
                step: 1,
                title: 'Apply & Get Matched',
                description:
                  'Submit your application. We verify eligibility and match you with a licensed barber shop in Indianapolis that needs an apprentice.',
              },
              {
                step: 2,
                title: 'Start Earning & Learning',
                description:
                  'Begin working at the shop under supervision of a licensed barber. You earn a paycheck from day one while learning the trade.',
              },
              {
                step: 3,
                title: 'Complete On-the-Job Training',
                description:
                  'Work through your structured Work Process - learning cuts, fades, shaves, sanitation, customer service, and shop operations. Track your hours.',
              },
              {
                step: 4,
                title: 'Attend Related Technical Instruction (RTI)',
                description:
                  'Complete required classroom hours covering theory, safety, Indiana barber laws, sanitation standards, and exam preparation.',
              },
              {
                step: 5,
                title: 'Reach 1,500 Hours & Graduate',
                description:
                  'Once you complete 1,500 hours (on-the-job + classroom), you graduate from the apprenticeship program.',
              },
              {
                step: 6,
                title: 'Take State Licensing Exam',
                description:
                  'Your apprenticeship completion qualifies you to sit for the Indiana Barber Licensing Exam. Pass and receive your license.',
              },
            ].map((item) => (
              <div
                key={item.step}
                className="flex gap-4 bg-white border border-slate-200 rounded-xl p-6"
              >
                <div className="w-12 h-12 bg-brand-orange-600 text-white rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-slate-700">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Eligibility Requirements */}
      <section className="py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">
            Eligibility Requirements
          </h2>

          <div className="bg-white border-2 border-slate-200 rounded-xl p-6 md:p-8">
            <h3 className="text-xl font-bold text-slate-900 mb-4">
              To qualify for this apprenticeship, you must:
            </h3>
            <ul className="space-y-3">
              {[
                'Be at least 18 years old',
                'Have a high school diploma or GED',
                'Provide proof of U.S. work authorization',
                'Reside in Indiana (Indianapolis area preferred)',
                'Pass a background check',
                'Be able to commit to the training schedule',
                'Have reliable transportation to shop location',
                'Be physically able to stand for extended periods',
              ].map((req) => (
                <li key={req} className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-brand-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">{req}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Earn While You Learn */}
      <section className="py-12 md:py-16 bg-green-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            Earn While You Learn
          </h2>
          <div className="bg-white border-2 border-green-200 rounded-xl p-6 md:p-8">
            <p className="text-lg text-slate-700 mb-4">
              <strong>
                All registered apprenticeships include wage progression.
              </strong>{' '}
              You start earning from day one and receive raises as you gain
              skills.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-slate-600 mb-1">Starting Wage</p>
                <p className="text-2xl font-bold text-slate-900">$12-15/hr</p>
                <p className="text-xs text-slate-500">Months 1-6</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-slate-600 mb-1">Mid-Program</p>
                <p className="text-2xl font-bold text-slate-900">$15-18/hr</p>
                <p className="text-xs text-slate-500">Months 7-12</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-slate-600 mb-1">Licensed Barber</p>
                <p className="text-2xl font-bold text-slate-900">$25-40/hr+</p>
                <p className="text-xs text-slate-500">After licensure</p>
              </div>
            </div>
            <p className="text-sm text-slate-600 mt-4">
              <strong>Note:</strong> Wages vary by shop. Many barbers earn
              additional income through tips and commission. Licensed barbers
              can earn $40,000-$60,000+ annually.
            </p>
          </div>
        </div>
      </section>

      {/* For Shops - Brief CTA */}
      <section className="py-12 md:py-16 bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Barber Shop Owners
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Interested in hosting an apprentice? Learn about program holder
            requirements, benefits, and how to get started.
          </p>
          <Link
            href="/program-holders/barber-apprenticeship"
            className="inline-flex items-center gap-2 px-8 py-4 bg-brand-orange-600 hover:bg-brand-orange-700 text-white font-bold text-lg rounded-lg transition"
          >
            Program Holder Guidelines
          </Link>
        </div>
      </section>

      {/* Official Resources */}
      <section className="py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">
            Official Resources & Guidelines
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: 'Indiana Registered Apprenticeship Basics',
                org: 'Indiana DWD',
                url: 'https://www.in.gov/dwd/owbla/registered-apprenticeship-basics/',
              },
              {
                title: 'Barber Apprenticeship Program Listing',
                org: 'INTraining',
                url: 'https://intraining.dwd.in.gov/ProgramLocation?ProgramId=10002417',
              },
              {
                title: 'Apprenticeship Process Guide (PDF)',
                org: 'Indiana DWD',
                url: 'https://www.in.gov/dwd/owbla/files/DWD_OWBLA_Registered_Apprenticeship_Process_Guide.pdf',
              },
              {
                title: 'Career Seekers Guide',
                org: 'Apprenticeship.gov',
                url: 'https://www.apprenticeship.gov/career-seekers',
              },
            ].map((resource) => (
              <a
                key={resource.title}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 p-4 border-2 border-slate-200 rounded-lg hover:border-brand-orange-600 hover:bg-orange-50 transition group"
              >
                <FileText className="w-6 h-6 text-slate-600 group-hover:text-brand-orange-600 flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h3 className="font-bold text-slate-900 group-hover:text-brand-orange-600 mb-1">
                    {resource.title}
                  </h3>
                  <p className="text-sm text-slate-600">{resource.org}</p>
                </div>
                <ExternalLink className="w-5 h-5 text-slate-400 group-hover:text-brand-orange-600" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-orange-600 to-orange-700 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Your Barber Career?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Apply now or talk to an advisor to see if you qualify for this U.S.
            DOL Registered Apprenticeship.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/apply"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-brand-orange-600 hover:bg-slate-50 rounded-lg font-bold text-lg transition shadow-lg"
            >
              Apply Now
            </Link>
            <a
              href="tel:3173143757"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white rounded-lg font-bold text-lg transition border-2 border-white"
            >
              <Phone className="w-5 h-5" />
              (317) 314-3757
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
