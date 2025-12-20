import { notFound } from 'next/navigation';
import Link from 'next/link';
import { programs } from '@/app/data/programs';
import {
  Clock,
  Calendar,
  MapPin,
  Award,
  DollarSign,
  Users,
  CheckCircle2,
  Phone,
  Mail,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  return programs.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  const program = programs.find((p) => p.slug === slug);

  if (!program) {
    return { title: 'Program Not Found' };
  }

  return {
    title: `${program.name} | Free Training | Elevate for Humanity`,
    description: `Get trained, get funded (if eligible), and move into real work. ${program.shortDescription}`,
  };
}

export default async function ProgramDetailPage({
  params,
}: {
  params: Params;
}) {
  const { slug } = await params;
  const program = programs.find((p) => p.slug === slug);

  if (!program) {
    return notFound();
  }

  return (
    <main className="bg-white">
      {/* Hero Section - Instant Clarity */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 text-white py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm text-white/70 mb-6">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/programs" className="hover:text-white">
              Programs
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">{program.name}</span>
          </nav>

          <div className="grid lg:grid-cols-[1fr,400px] gap-8 items-start">
            <div>
              {/* Title */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                {program.name}
              </h1>

              {/* Outcome Line */}
              <p className="text-xl md:text-2xl text-white/90 mb-6 font-medium">
                Get trained, get funded (if eligible), and move into real work.
              </p>

              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-8">
                <span className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-semibold border border-white/20">
                  <Clock className="w-4 h-4 inline mr-1" />
                  {program.duration || '10-12 weeks'}
                </span>
                <span className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-semibold border border-white/20">
                  <MapPin className="w-4 h-4 inline mr-1" />
                  Hybrid (Online + In-Person)
                </span>
                <span className="px-4 py-2 bg-brand-orange-600 rounded-full text-sm font-bold">
                  <DollarSign className="w-4 h-4 inline mr-1" />
                  Free with funding (if eligible)
                </span>
                <span className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-semibold border border-white/20">
                  <Award className="w-4 h-4 inline mr-1" />
                  Industry Credential
                </span>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/apply"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-orange-600 hover:bg-brand-orange-700 text-white rounded-lg font-bold text-lg transition shadow-lg"
                >
                  Start Application
                  <ChevronRight className="w-5 h-5" />
                </Link>
                <a
                  href="tel:3173143757"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white rounded-lg font-bold text-lg transition border-2 border-white/30"
                >
                  <Phone className="w-5 h-5" />
                  Talk to Advisor
                </a>
              </div>

              {/* Microtext */}
              <p className="text-sm text-white/60 mt-4">
                Appointment-based advising • We confirm eligibility before
                enrollment
              </p>
            </div>

            {/* Program Snapshot Card */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
              <h3 className="text-lg font-bold mb-4">Program Snapshot</h3>
              <dl className="space-y-3 text-sm">
                <div>
                  <dt className="text-white/70 mb-1">Duration</dt>
                  <dd className="font-semibold">
                    {program.duration || '10-12 weeks'}
                  </dd>
                </div>
                <div>
                  <dt className="text-white/70 mb-1">Start Dates</dt>
                  <dd className="font-semibold">Rolling enrollment</dd>
                </div>
                <div>
                  <dt className="text-white/70 mb-1">Format</dt>
                  <dd className="font-semibold">
                    Hybrid - Online coursework + In-person skills training
                  </dd>
                </div>
                <div>
                  <dt className="text-white/70 mb-1">Cost</dt>
                  <dd className="font-semibold">
                    Funded options available. We confirm eligibility with you.
                  </dd>
                </div>
                <div>
                  <dt className="text-white/70 mb-1">Credential</dt>
                  <dd className="font-semibold">
                    {program.credential || 'Industry-recognized certification'}
                  </dd>
                </div>
                <div>
                  <dt className="text-white/70 mb-1">Who it's for</dt>
                  <dd className="font-semibold">
                    {program.whoItsFor || 'Anyone ready to start a new career'}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* What You'll Learn */}
      <section className="py-12 md:py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">
            What You'll Learn
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {(
              program.skills || [
                'Core technical skills',
                'Industry best practices',
                'Safety and compliance',
                'Professional communication',
                'Job readiness training',
                'Certification exam prep',
              ]
            ).map((skill, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 bg-white p-4 rounded-lg border border-slate-200"
              >
                <CheckCircle2 className="w-5 h-5 text-brand-green-600 flex-shrink-0 mt-0.5" />
                <span className="font-medium text-slate-900">{skill}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How This Program Works */}
      <section className="py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">
            How Training Works
          </h2>

          <div className="space-y-6 mb-12">
            {[
              {
                step: 1,
                title: 'You apply / request advising',
                desc: 'Fill out a quick application or call us directly',
              },
              {
                step: 2,
                title: 'We confirm funding + match your path',
                desc: 'We check eligibility for WIOA, WRG, or other funding options',
              },
              {
                step: 3,
                title: 'We enroll you + issue access',
                desc: 'Once approved, we handle enrollment and give you login credentials',
              },
              {
                step: 4,
                title: 'Training happens through our approved partner platform',
                desc: 'Complete online coursework at your pace, attend in-person skills training in Indianapolis',
              },
              {
                step: 5,
                title: 'We track progress + support you through completion',
                desc: 'We stay with you until you earn your credential and find work',
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-4 items-start">
                <div className="w-10 h-10 bg-brand-orange-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">
                    {item.title}
                  </h3>
                  <p className="text-slate-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Partner Course Access Card */}
          <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-slate-900 mb-3">
              Partner Course Access
            </h3>
            <p className="text-slate-700 mb-4">
              Training content is delivered through our approved partner
              platform. After enrollment, you'll receive:
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-brand-green-600" />
                <span>Login credentials and course access</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-brand-green-600" />
                <span>All course modules and materials</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-brand-green-600" />
                <span>Technical support from partner</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-brand-green-600" />
                <span>Progress tracking and advisor check-ins</span>
              </li>
            </ul>
            <p className="text-sm text-slate-600">
              <strong>Note:</strong> Training content may be delivered through
              approved partner platforms. Access is issued after enrollment.
            </p>
          </div>
        </div>
      </section>

      {/* Funding & Support */}
      <section className="py-12 md:py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">
            Funding & Support
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Funding Options */}
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">
                Funding Options We Help You Explore
              </h3>
              <div className="space-y-3">
                {[
                  {
                    name: 'WIOA',
                    desc: 'Workforce Innovation & Opportunity Act funding',
                  },
                  { name: 'WRG', desc: 'State training grants' },
                  { name: 'JRI', desc: 'Justice-involved supports' },
                  {
                    name: 'Employer Sponsorship',
                    desc: 'Your employer may cover training',
                  },
                  { name: 'Self-Pay', desc: 'Available for select programs' },
                ].map((option) => (
                  <div
                    key={option.name}
                    className="bg-white p-4 rounded-lg border border-slate-200"
                  >
                    <h4 className="font-bold text-slate-900">{option.name}</h4>
                    <p className="text-sm text-slate-600">{option.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Support Services */}
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">
                Support Services
              </h3>
              <div className="space-y-3">
                {[
                  'Document help',
                  'Transportation referrals',
                  'Childcare referrals',
                  'Case management coordination',
                  'Progress tracking',
                  'Job placement assistance',
                ].map((service) => (
                  <div
                    key={service}
                    className="flex items-center gap-3 bg-white p-4 rounded-lg border border-slate-200"
                  >
                    <CheckCircle2 className="w-5 h-5 text-brand-green-600 flex-shrink-0" />
                    <span className="font-medium text-slate-900">
                      {service}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <p className="text-sm text-slate-600 bg-white p-4 rounded-lg border border-slate-200">
            <strong>Important:</strong> Eligibility and funding are confirmed
            during advising. Not all applicants qualify.
          </p>
        </div>
      </section>

      {/* Next Steps */}
      <section className="py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8 text-center">
            Next Steps
          </h2>

          <div className="space-y-4 mb-12">
            {[
              { step: 1, title: 'Submit your inquiry', time: '2-3 minutes' },
              {
                step: 2,
                title: 'Book advising appointment',
                time: 'Same day or next',
              },
              { step: 3, title: 'Upload documents', time: 'If requested' },
              {
                step: 4,
                title: 'Eligibility confirmation',
                time: '1-2 business days',
              },
              {
                step: 5,
                title: 'Enrollment + partner access issued',
                time: 'Within 24 hours',
              },
            ].map((item) => (
              <div
                key={item.step}
                className="flex items-center gap-4 bg-slate-50 p-4 rounded-lg border border-slate-200"
              >
                <div className="w-8 h-8 bg-brand-orange-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0 text-sm">
                  {item.step}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-slate-900">{item.title}</h3>
                  <p className="text-sm text-slate-600">{item.time}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/apply"
              className="inline-flex items-center gap-2 px-8 py-4 bg-brand-orange-600 hover:bg-brand-orange-700 text-white rounded-lg font-bold text-lg transition shadow-lg"
            >
              Start Application Now
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Still Not Sure */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Still Not Sure?
          </h2>
          <p className="text-lg text-white/90 mb-8">
            Talk to an advisor. We'll answer your questions and help you figure
            out if this program is right for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:3173143757"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-slate-900 hover:bg-slate-100 rounded-lg font-bold text-lg transition"
            >
              <Phone className="w-5 h-5" />
              Call: (317) 314-3757
            </a>
            <a
              href="mailto:elevate4humanityedu@gmail.com"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white rounded-lg font-bold text-lg transition border-2 border-white/30"
            >
              <Mail className="w-5 h-5" />
              Email Us
            </a>
          </div>
          <p className="text-sm text-white/60 mt-6">
            Monday-Friday, 9am-5pm EST • Usually respond within 24 hours
          </p>
        </div>
      </section>

      {/* Sticky Mobile CTA */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 shadow-lg z-40">
        <Link
          href="/apply"
          className="block w-full text-center px-6 py-4 bg-brand-orange-600 hover:bg-brand-orange-700 text-white rounded-lg font-bold text-lg transition"
        >
          Start Application
        </Link>
      </div>
    </main>
  );
}
