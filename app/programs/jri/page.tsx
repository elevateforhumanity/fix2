import Link from 'next/link';
import Image from 'next/image';
import { programs } from '@/app/data/programs';
import { Heart, Shield, TrendingUp, Users } from 'lucide-react';

export const metadata = {
  title: 'JRI Programs - Second Chance Career Training | Elevate For Humanity',
  description:
    'Justice Reinvestment Initiative programs provide free career training and support for individuals with justice involvement.',
};

const jriProgramSlugs = [
  'cna',
  'phlebotomy-technician',
  'home-health-aide',
  'direct-support-professional',
  'cdl',
  'workforce-readiness',
  'peer-recovery-coach',
];

export default function JRIProgramsPage() {
  const jriPrograms = programs.filter((p) => jriProgramSlugs.includes(p.slug));

  return (
    <main className="bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-indigo-600 to-indigo-800 text-white px-6 sm:px-10 lg:px-12 py-20 lg:py-28">
        <div className="mx-auto max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <Heart className="w-5 h-5" />
            <span className="text-sm font-semibold">JRI Programs</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-6">
            Everyone Deserves
            <br />A Second Chance
          </h1>

          <p className="text-xl sm:text-2xl text-indigo-100 leading-relaxed max-w-3xl mx-auto">
            The Justice Reinvestment Initiative (JRI) provides 100% free career
            training and wraparound support for individuals with justice
            involvement. Your past doesn't define your future.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="px-6 sm:px-10 lg:px-12 py-16 lg:py-20 bg-gray-50">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl sm:text-4xl font-bold text-black text-center leading-tight mb-12">
            Why JRI Works
          </h2>

          <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
            <p>
              Returning to society after incarceration is one of the hardest
              challenges anyone can face. Without job skills, stable employment,
              and support, the cycle of recidivism continues. JRI breaks that
              cycle.
            </p>

            <p>
              <span className="font-bold text-black">
                This isn't just training—it's a complete support system.
              </span>{' '}
              JRI provides free career training in high-demand fields, plus case
              management, transportation assistance, childcare support, and job
              placement services.
            </p>

            <p>
              We believe in second chances. Your past mistakes don't define who
              you are or what you can become. With the right training and
              support, you can build a stable career, support your family, and
              contribute to your community.
            </p>

            <p className="text-xl font-bold text-black">
              This is your opportunity to rewrite your story. We're here to help
              you succeed.
            </p>
          </div>
        </div>
      </section>

      {/* What JRI Provides */}
      <section className="px-6 sm:px-10 lg:px-12 py-16 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold text-black text-center mb-12">
            What JRI Provides
          </h2>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 text-indigo-600 mb-4">
                <Shield className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-black mb-2">Free Training</h3>
              <p className="text-gray-600">
                100% free career training in high-demand fields
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-4">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-black mb-2">Case Management</h3>
              <p className="text-gray-600">
                Dedicated support coordinator to help you succeed
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mb-4">
                <TrendingUp className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-black mb-2">Job Placement</h3>
              <p className="text-gray-600">
                Direct connections to employers ready to hire
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 text-purple-600 mb-4">
                <Heart className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-black mb-2">Wraparound Support</h3>
              <p className="text-gray-600">
                Transportation, childcare, and other assistance
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="px-6 sm:px-10 lg:px-12 py-16 lg:py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold text-black text-center mb-12">
            Available JRI Programs
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {jriPrograms.map((program) => (
              <Link
                key={program.slug}
                href={`/programs/${program.slug}`}
                className="group block bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all"
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={program.heroImage}
                    alt={program.heroImageAlt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-black mb-2">
                    {program.name}
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-full">
                      {program.duration}
                    </span>
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                      JRI Funded
                    </span>
                  </div>
                  <span className="inline-flex items-center font-semibold text-indigo-600 group-hover:underline text-sm">
                    Learn More →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Eligibility */}
      <section className="px-6 sm:px-10 lg:px-12 py-16 lg:py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-black text-center mb-12">
            Who Can Participate
          </h2>

          <div className="bg-indigo-50 border-2 border-indigo-200 rounded-xl p-8">
            <h3 className="text-xl font-bold text-black mb-4">
              JRI Eligibility
            </h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-indigo-600 font-bold">•</span>
                <span>Individuals with prior justice system involvement</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-indigo-600 font-bold">•</span>
                <span>
                  Currently on probation, parole, or recently released
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-indigo-600 font-bold">•</span>
                <span>
                  Committed to completing training and finding employment
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-indigo-600 font-bold">•</span>
                <span>Willing to work with case manager and support team</span>
              </li>
            </ul>

            <div className="mt-6 pt-6 border-t border-indigo-200">
              <p className="text-sm text-gray-600">
                <strong>Note:</strong> Eligibility requirements may vary by
                program and location. Contact us to discuss your specific
                situation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 sm:px-10 lg:px-12 py-16 lg:py-20 bg-gray-50">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-black mb-6">
            Ready to Start Your New Career?
          </h2>
          <p className="text-xl text-gray-700 mb-8">
            Apply now to see if you qualify for JRI-funded training.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/apply"
              className="inline-flex px-8 py-4 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition text-lg"
            >
              Apply Now
            </Link>
            <Link
              href="/jri"
              className="inline-flex px-8 py-4 bg-white border-2 border-indigo-600 text-indigo-600 font-bold rounded-lg hover:bg-indigo-50 transition text-lg"
            >
              Learn More About JRI
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
