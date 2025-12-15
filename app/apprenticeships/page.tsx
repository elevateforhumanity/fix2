'use client';

import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { programs } from '@/app/data/programs';

const apprenticeshipPrograms = programs.filter(
  (p) =>
    p.slug.includes('apprenticeship') ||
    p.slug === 'barber-apprenticeship' ||
    p.fundingOptions.some((f) => f.toLowerCase().includes('apprenticeship'))
);

export default function ApprenticeshipsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[500px] lg:h-[600px] flex items-center justify-center text-white overflow-hidden">
        <Image
          src="/images/gallery/image8.jpg"
          alt="Registered Apprenticeship Programs"
          fill
          className="object-cover"
          quality={100}
          priority
          sizes="100vw"
        />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center drop-shadow-lg">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 drop-shadow-md">
            Registered Apprenticeship Programs
          </h1>
          <p className="text-base md:text-lg mb-8 text-white drop-shadow-md">
            Earn while you learn. Get paid on-the-job training with industry
            certifications.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/apply"
              className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors shadow-lg"
            >
              Apply Now
            </Link>
            <Link
              href="/programs"
              className="bg-white hover:bg-gray-100 text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold transition-colors shadow-lg"
            >
              View All Programs
            </Link>
          </div>
        </div>
      </section>

      {/* What is an Apprenticeship */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            What is a Registered Apprenticeship?
          </h2>
          <p className="text-lg text-slate-700 mb-6">
            A Registered Apprenticeship is a proven model of job training that
            combines on-the-job learning with classroom instruction. You get
            paid while you learn, earn industry certifications, and graduate
            with zero debt.
          </p>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-green-50 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-3 text-green-900">
                ✓ Earn While You Learn
              </h3>
              <p className="text-slate-700">
                Get paid from day one. Work with a real employer while
                completing your training.
              </p>
            </div>
            <div className="bg-green-50 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-3 text-green-900">
                ✓ Industry Certifications
              </h3>
              <p className="text-slate-700">
                Graduate with nationally recognized credentials that employers
                value.
              </p>
            </div>
            <div className="bg-green-50 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-3 text-green-900">
                ✓ Zero Debt
              </h3>
              <p className="text-slate-700">
                No tuition. No loans. Just training that leads to a career.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Apprenticeship Programs */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">
            Available Apprenticeship Programs
          </h2>

          {apprenticeshipPrograms.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {apprenticeshipPrograms.map((program) => (
                <div
                  key={program.slug}
                  className="bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="relative h-48">
                    <Image
                      src={program.heroImage}
                      alt={program.heroImageAlt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold mb-2">{program.name}</h3>
                    <p className="text-slate-600 mb-4">
                      {program.shortDescription}
                    </p>
                    <div className="space-y-2 mb-4">
                      <p className="text-sm text-slate-700">
                        <strong>Duration:</strong> {program.duration}
                      </p>
                      <p className="text-sm text-slate-700">
                        <strong>Delivery:</strong> {program.delivery}
                      </p>
                      {program.price && (
                        <p className="text-sm text-slate-700">
                          <strong>Self-Pay:</strong> $
                          {program.price.toLocaleString()}
                          <br />
                          <span className="text-xs text-slate-500">
                            If funding not available, split over 6 months: $
                            {(program.price / 6).toFixed(2)}/month
                          </span>
                        </p>
                      )}
                    </div>
                    <div className="bg-green-50 rounded p-3 mb-4">
                      <p className="text-sm font-semibold text-green-900 mb-1">
                        Funding Options:
                      </p>
                      <ul className="text-xs text-slate-700 space-y-1">
                        {program.fundingOptions.map((option, idx) => (
                          <li key={idx}>• {option}</li>
                        ))}
                      </ul>
                    </div>
                    <Link
                      href={`/programs/${program.slug}`}
                      className="block w-full text-center bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg p-8 text-center">
              <p className="text-slate-600 mb-4">
                We're currently developing new apprenticeship programs. Check
                back soon or contact us to learn about upcoming opportunities.
              </p>
              <Link
                href="/contact"
                className="inline-block bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Contact Us
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-base md:text-lg text-blue-100 mb-8">
              Join thousands who have launched successful careers through our
              programs.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-white text-blue-700 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 text-lg"
              >
                Apply Now
              </Link>
              <Link
                href="/programs"
                className="bg-blue-800 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-900 border-2 border-white text-lg"
              >
                Browse Programs
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
