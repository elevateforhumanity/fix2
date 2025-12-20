import Link from 'next/link';
import Image from 'next/image';
import { programs } from '@/app/data/programs';
import { Metadata } from 'next';
// @ts-expect-error TS2614: Module '"@/components/StructuredData"' has no exported member 'StructuredData...
import { StructuredData } from '@/components/StructuredData';
import { generateSEOMetadata, generateStructuredData } from '@/lib/seo';

export const metadata: Metadata = generateSEOMetadata({
  title: '30+ Free Career Training Programs',
  description:
    'Access 30+ free career training programs. 100% funded through WIOA. Earn industry certifications in healthcare, skilled trades, beauty, and business. Enroll today.',
  path: '/programs',
  keywords: [
    'free training programs',
    'career training',
    'WIOA programs',
    'healthcare training',
    'skilled trades',
    'certification programs',
    'job training',
    'workforce development',
    'free courses',
    'career certificates',
  ],
});

export default function ProgramsPage() {
  const organizationSchema = generateStructuredData({
    type: 'Organization',
    data: {
      offers: {
        '@type': 'AggregateOffer',
        priceCurrency: 'USD',
        price: '0',
        offerCount: programs.length.toString(),
      },
    },
  });

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: programs.map((program, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Course',
        // @ts-expect-error TS2339: Property 'title' does not exist on type 'Program'.
        name: program.title,
        // @ts-expect-error TS2339: Property 'description' does not exist on type 'Program'.
        description: program.description,
        provider: {
          '@type': 'Organization',
          name: 'Elevate For Humanity',
          url: 'https://www.elevateforhumanity.org',
        },
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
        },
        url: `https://www.elevateforhumanity.org/programs/${program.slug}`,
      },
    })),
  };
  // Categorize programs
  const skillsTrades = programs.filter(
    (p) =>
      p.slug.includes('hvac') ||
      p.slug.includes('building') ||
      p.slug.includes('cdl')
  );

  const healthcare = programs.filter(
    (p) =>
      p.slug.includes('cna') ||
      p.slug.includes('medical') ||
      p.slug.includes('health')
  );

  const beautyWellness = programs.filter(
    (p) =>
      p.slug.includes('barber') ||
      p.slug.includes('beauty') ||
      p.slug.includes('esthetician')
  );

  const businessFinance = programs.filter(
    (p) => p.slug.includes('tax') || p.slug.includes('business')
  );

  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      <main className="bg-white overflow-hidden">
        {/* Hero Image - Diagonal Cut */}
        <section className="relative w-full h-[500px] md:h-[600px] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-transparent z-10" />
          <Image
            src="/images/heroes/programs.jpg"
            alt="Career Training Programs"
            fill
            className="object-cover"
            priority
            quality={75}
            sizes="100vw"
          />
          {/* Diagonal shape overlay */}
          <div
            className="absolute bottom-0 left-0 right-0 h-32 bg-white"
            style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 0)' }}
          />
        </section>

        {/* Skilled Trades Section - Asymmetric Layout with Circles */}
        <section className="py-20 bg-white relative">
          {/* Decorative circle shapes */}
          <div className="absolute top-20 right-0 w-96 h-96 bg-orange-100 rounded-full opacity-20 blur-3xl" />
          <div className="absolute bottom-20 left-0 w-64 h-64 bg-blue-100 rounded-full opacity-20 blur-3xl" />

          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-1 bg-brand-orange-600 rounded-full" />
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                Skilled Trades
              </h2>
            </div>
            <p className="text-base md:text-lg text-slate-600 mb-12 max-w-3xl">
              High-demand careers with excellent pay and job security.
            </p>

            <div className="grid md:grid-cols-2 gap-12">
              {skillsTrades.map((program, idx) => (
                <Link
                  key={program.slug}
                  href={`/programs/${program.slug}`}
                  className="group"
                >
                  <div
                    className={`relative ${idx % 2 === 0 ? 'md:mt-0' : 'md:mt-12'}`}
                  >
                    {/* Colored accent shape */}
                    <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-orange-400 to-orange-600 rounded-3xl opacity-10 group-hover:opacity-20 transition-opacity" />

                    <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-100">
                      <div className="relative h-80 overflow-hidden">
                        <Image
                          src={program.heroImage}
                          alt={program.heroImageAlt}
                          fill
                          className="object-cover group-hover:scale-110 group-hover:rotate-2 transition-all duration-700"
                          quality={75}
                        />
                        {/* Gradient overlay on hover */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      <div className="p-8">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center group-hover:bg-brand-orange-600 group-hover:scale-110 transition-all duration-300">
                            <span className="text-2xl group-hover:scale-110 transition-transform">
                              🛠️
                            </span>
                          </div>
                          <span className="text-sm font-bold text-brand-orange-600 uppercase tracking-wider">
                            {program.duration}
                          </span>
                        </div>
                        <h3 className="text-lg md:text-lg font-bold text-slate-900 mb-3 group-hover:text-brand-orange-600 transition">
                          {program.name}
                        </h3>
                        <p className="text-slate-700 mb-6 leading-relaxed">
                          {program.heroSubtitle}
                        </p>
                        {program.highlights
                          .slice(0, 2)
                          .map((highlight, idx) => (
                            <div
                              key={idx}
                              className="flex items-start gap-2 mb-2"
                            >
                              <div className="w-5 h-5 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                <span className="text-brand-orange-600 text-xs font-bold">
                                  ✓
                                </span>
                              </div>
                              <span className="text-sm text-slate-600">
                                {highlight}
                              </span>
                            </div>
                          ))}
                        <div className="mt-6 inline-flex items-center text-brand-orange-600 font-bold group-hover:gap-2 transition-all">
                          Explore Program
                          <span className="ml-2 group-hover:ml-4 transition-all">
                            →
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Healthcare Section - Wave Pattern Background */}
        <section className="py-20 bg-gradient-to-br from-teal-50 via-blue-50 to-slate-50 relative overflow-hidden">
          {/* Wave SVG background */}
          <div className="absolute top-0 left-0 right-0 h-32 opacity-30">
            <svg
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
              className="w-full h-full"
            >
              <path
                d="M0,0 C300,80 600,80 900,0 L1200,0 L1200,120 L0,120 Z"
                fill="currentColor"
                className="text-teal-200"
              />
            </svg>
          </div>

          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <div className="inline-block px-6 py-2 bg-teal-100 rounded-full mb-4">
                <span className="text-teal-700 font-bold text-sm uppercase tracking-wider">
                  Healthcare
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                Healthcare Careers
              </h2>
              <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto">
                Start your healthcare career in weeks, not years.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {healthcare.map((program, idx) => (
                <Link
                  key={program.slug}
                  href={`/programs/${program.slug}`}
                  className="group"
                >
                  <div className="relative">
                    {/* Hexagon shape behind card */}
                    <div
                      className="absolute -top-6 -right-6 w-32 h-32 bg-teal-200 opacity-20 group-hover:opacity-30 transition-opacity"
                      style={{
                        clipPath:
                          'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                      }}
                    />

                    <div className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 transform group-hover:-translate-y-2">
                      <div className="relative h-64 overflow-hidden">
                        <Image
                          src={program.heroImage}
                          alt={program.heroImageAlt}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                          quality={75}
                        />
                        {/* Corner accent */}
                        <div className="absolute top-4 right-4 w-16 h-16 bg-teal-500 rounded-2xl opacity-80 flex items-center justify-center">
                          <span className="text-white text-2xl">🏥</span>
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-teal-600 transition">
                          {program.name}
                        </h3>
                        <div className="flex items-center gap-2 mb-4">
                          <div className="h-1 w-12 bg-teal-500 rounded-full" />
                          <span className="text-sm text-slate-600 font-semibold">
                            {program.duration}
                          </span>
                        </div>
                        <p className="text-slate-700 text-sm mb-4 leading-relaxed line-clamp-3">
                          {program.heroSubtitle}
                        </p>
                        <div className="inline-flex items-center text-teal-600 font-bold text-sm group-hover:gap-2 transition-all">
                          Learn More
                          <span className="ml-2 group-hover:ml-4 transition-all">
                            →
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Beauty & Wellness Section */}
        {beautyWellness.length > 0 && (
          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                Beauty & Wellness
              </h2>
              <p className="text-base md:text-lg text-slate-600 mb-12 max-w-3xl">
                Build your own business or work in top salons and spas.
              </p>

              <div className="grid md:grid-cols-2 gap-8">
                {beautyWellness.map((program) => (
                  <Link
                    key={program.slug}
                    href={`/programs/${program.slug}`}
                    className="group"
                  >
                    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-slate-200">
                      <div className="relative h-80 overflow-hidden">
                        <Image
                          src={program.heroImage}
                          alt={program.heroImageAlt}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          quality={75}
                        />
                      </div>
                      <div className="p-8">
                        <h3 className="text-lg md:text-lg font-bold text-slate-900 mb-3 group-hover:text-brand-orange-600 transition">
                          {program.name}
                        </h3>
                        <p className="text-slate-700 mb-6 leading-relaxed">
                          {program.heroSubtitle}
                        </p>
                        {program.highlights
                          .slice(0, 3)
                          .map((highlight, idx) => (
                            <div
                              key={idx}
                              className="flex items-start gap-2 mb-2"
                            >
                              <span className="text-brand-orange-600 font-bold">
                                ✓
                              </span>
                              <span className="text-sm text-slate-600">
                                {highlight}
                              </span>
                            </div>
                          ))}
                        <div className="mt-6 inline-flex items-center text-brand-orange-600 font-bold group-hover:gap-2 transition-all">
                          Explore {program.name} →
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Business & Finance Section */}
        {businessFinance.length > 0 && (
          <section className="py-20 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                Business & Finance
              </h2>
              <p className="text-base md:text-lg text-slate-600 mb-12 max-w-3xl">
                Start your own business or work for established firms.
              </p>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {businessFinance.map((program) => (
                  <Link
                    key={program.slug}
                    href={`/programs/${program.slug}`}
                    className="group"
                  >
                    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300">
                      <div className="relative h-64 overflow-hidden">
                        <Image
                          src={program.heroImage}
                          alt={program.heroImageAlt}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          quality={75}
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-brand-orange-600 transition">
                          {program.name}
                        </h3>
                        <p className="text-sm text-slate-600 mb-4">
                          {program.duration}
                        </p>
                        <p className="text-slate-700 text-sm mb-4 leading-relaxed line-clamp-2">
                          {program.heroSubtitle}
                        </p>
                        <div className="inline-flex items-center text-brand-orange-600 font-semibold text-sm group-hover:gap-2 transition-all">
                          Learn More →
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-20 bg-orange-50">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
              Need help choosing a program?
            </h2>
            <p className="text-base md:text-lg text-slate-700 mb-8">
              Talk to an advisor about your goals, funding options, and which
              program is right for you.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-brand-orange-600 text-white px-10 py-4 rounded-lg font-bold text-lg hover:bg-brand-orange-700 transition shadow-lg"
            >
              Talk to an Advisor
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
