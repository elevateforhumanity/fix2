import Image from 'next/image';
import Link from 'next/link';
import {
  GraduationCap,
  Briefcase,
  Building2,
  CheckCircle,
  ArrowRight,
  Users,
  DollarSign,
  Award,
} from 'lucide-react';

export default function HomePage() {
  return (
    <main className="bg-white">
      {/* HERO - Beautiful, Professional, Above the Fold */}
      <section className="relative h-[600px] flex items-center justify-center text-white overflow-hidden">
        <Image
          src="/images/hero-workforce.jpg"
          alt="Workforce training"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-700/70" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Free Job Training.
            <br />
            Real Careers. No Debt.
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
            We connect people to careers through training, funding, and employer
            partnerships across Indiana.
          </p>
          <Link
            href="/apply"
            className="inline-block px-10 py-5 bg-orange-500 text-white rounded-lg font-bold text-xl hover:bg-orange-600 transition shadow-2xl"
          >
            Apply Now
          </Link>
        </div>
      </section>

      {/* WHO WE SERVE - Intelligent Routing (Looks Like Website) */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-slate-900 mb-4">
            Who We Serve
          </h2>
          <p className="text-xl text-center text-slate-600 mb-16 max-w-3xl mx-auto">
            Choose your path to see how we can help you succeed
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {/* For Students */}
            <Link
              href="/for-students"
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
            >
              <div className="relative h-64">
                <Image
                  src="/images/students-hero.jpg"
                  alt="Students learning"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <GraduationCap className="h-12 w-12 text-white mb-3" />
                  <h3 className="text-2xl font-bold text-white mb-2">
                    For Students
                  </h3>
                </div>
              </div>
              <div className="p-8">
                <p className="text-slate-700 mb-6 text-lg leading-relaxed">
                  Get trained for free. Earn industry credentials. Start your
                  career in healthcare, skilled trades, or technology.
                </p>
                <div className="flex items-center gap-2 text-blue-600 font-semibold group-hover:gap-3 transition-all">
                  <span>Learn More</span>
                  <ArrowRight className="h-5 w-5" />
                </div>
              </div>
            </Link>

            {/* For Employers */}
            <Link
              href="/for-employers"
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
            >
              <div className="relative h-64">
                <Image
                  src="/images/employers-hero.jpg"
                  alt="Employers hiring"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/90 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <Briefcase className="h-12 w-12 text-white mb-3" />
                  <h3 className="text-2xl font-bold text-white mb-2">
                    For Employers
                  </h3>
                </div>
              </div>
              <div className="p-8">
                <p className="text-slate-700 mb-6 text-lg leading-relaxed">
                  Hire trained workers. Build apprenticeship programs. No
                  recruiting fees. Access job-ready candidates.
                </p>
                <div className="flex items-center gap-2 text-purple-600 font-semibold group-hover:gap-3 transition-all">
                  <span>Learn More</span>
                  <ArrowRight className="h-5 w-5" />
                </div>
              </div>
            </Link>

            {/* For Agencies */}
            <Link
              href="/for-agencies"
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
            >
              <div className="relative h-64">
                <Image
                  src="/images/agencies-hero.jpg"
                  alt="Agencies and partners"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-green-900/90 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <Building2 className="h-12 w-12 text-white mb-3" />
                  <h3 className="text-2xl font-bold text-white mb-2">
                    For Agencies
                  </h3>
                </div>
              </div>
              <div className="p-8">
                <p className="text-slate-700 mb-6 text-lg leading-relaxed">
                  License our platform. Track compliance. Monitor outcomes.
                  Government-aligned workforce infrastructure.
                </p>
                <div className="flex items-center gap-2 text-green-600 font-semibold group-hover:gap-3 transition-all">
                  <span>Learn More</span>
                  <ArrowRight className="h-5 w-5" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURED PROGRAMS */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-slate-900 mb-4">
            Featured Programs
          </h2>
          <p className="text-xl text-center text-slate-600 mb-16">
            All programs are $0 tuition for eligible participants
          </p>

          <div className="grid md:grid-cols-4 gap-6 mb-12">
            {[
              {
                name: 'Barber Apprenticeship',
                salary: '$45,000/year',
                duration: '15-17 months',
                slug: 'barber-apprenticeship',
                image: '/images/programs/barber.jpg',
              },
              {
                name: 'HVAC Technician',
                salary: '$52,000/year',
                duration: '6-12 months',
                slug: 'hvac-technician',
                image: '/images/programs/hvac.jpg',
              },
              {
                name: 'CNA Healthcare',
                salary: '$37,000/year',
                duration: '4-6 weeks',
                slug: 'cna-certified-nursing-assistant',
                image: '/images/programs/cna.jpg',
              },
              {
                name: 'CDL Truck Driver',
                salary: '$60,000/year',
                duration: '3-4 weeks',
                slug: 'cdl-commercial-drivers-license',
                image: '/images/programs/cdl.jpg',
              },
            ].map((program) => (
              <Link
                key={program.slug}
                href={`/programs/${program.slug}`}
                className="group bg-slate-50 rounded-xl overflow-hidden hover:shadow-xl transition-all"
              >
                <div className="relative h-48">
                  <Image
                    src={program.image}
                    alt={program.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition">
                    {program.name}
                  </h3>
                  <div className="space-y-2 text-sm text-slate-600">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-green-600" />
                      <span className="font-semibold">{program.salary}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-blue-600" />
                      <span>{program.duration}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/programs"
              className="inline-flex items-center gap-2 text-blue-600 font-semibold text-lg hover:gap-3 transition-all"
            >
              <span>View All 20 Programs</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* BY THE NUMBERS */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold mb-2">1,500+</div>
              <div className="text-blue-100 text-lg">Graduates Since 2020</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">200+</div>
              <div className="text-blue-100 text-lg">Employer Partners</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">20</div>
              <div className="text-blue-100 text-lg">Training Programs</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">$0</div>
              <div className="text-blue-100 text-lg">Tuition for Eligible</div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-slate-900 mb-6">
            Ready to Start Your Career?
          </h2>
          <p className="text-xl text-slate-600 mb-8">
            Apply now. An advisor will call you within 24 hours.
          </p>
          <Link
            href="/apply"
            className="inline-block px-10 py-5 bg-blue-600 text-white rounded-lg font-bold text-xl hover:bg-blue-700 transition shadow-xl"
          >
            Apply Now
          </Link>
          <p className="mt-6 text-slate-600">
            Questions?{' '}
            <a
              href="tel:+13173143757"
              className="text-blue-600 font-semibold hover:underline"
            >
              Call (317) 314-3757
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}
