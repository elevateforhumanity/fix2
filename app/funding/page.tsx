'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';


export default function FundingPage() {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[450px] w-full overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          
        >
          <source src="/videos/getting-started-hero.mp4" type="video/mp4" />
        </video>
        
        <div className="absolute inset-0 flex items-center justify-center text-center px-4">
          <div className="max-w-4xl w-full">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white uppercase tracking-wide">
              FUNDING OPTIONS
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl font-semibold text-white mb-8">
              100% Free Training - No Student Debt
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md sm:max-w-none mx-auto">
              <Link
                href="/apply"
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-md bg-orange-500 px-8 py-4 text-lg font-bold text-white shadow-lg hover:bg-orange-600 transition-all transform hover:scale-105 uppercase"
              >
                Apply Now
              </Link>
              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-md border-2 border-white bg-transparent px-8 py-4 text-lg font-bold text-white hover:bg-white hover:text-green-900 transition-all transform hover:scale-105 uppercase"
              >
                Talk to Advisor
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-16">

        {/* FUNDING TYPES - Dropdowns */}
        <section className="mt-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 uppercase text-center">
            Federal Funding Options
          </h2>
          <p className="text-center text-lg text-gray-700 mb-12 max-w-3xl mx-auto">
            We do not offer financial aid. All training is funded through federal workforce programs.
          </p>

          <div className="space-y-4 max-w-4xl mx-auto">
            {/* WIOA Dropdown */}
            <div className="border-2 border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleSection('wioa')}
                className="w-full flex items-center justify-between p-6 bg-white hover:bg-gray-50 transition"
              >
                <h3 className="text-xl font-bold text-gray-900">WIOA (Workforce Innovation & Opportunity Act)</h3>
                <ChevronDown className={`w-6 h-6 transition-transform ${openSection === 'wioa' ? 'rotate-180' : ''}`} />
              </button>
              {openSection === 'wioa' && (
                <div className="p-6 bg-gray-50 border-t-2 border-gray-200">
                  <p className="text-gray-700 mb-4">
                    Federal workforce funding for eligible participants seeking in-demand skills and employment pathways.
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500 font-bold">•</span>
                      <span>Eligibility-based workforce funding</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500 font-bold">•</span>
                      <span>Often covers tuition and related costs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500 font-bold">•</span>
                      <span>Aligned with approved training programs</span>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* WRG Dropdown */}
            <div className="border-2 border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleSection('wrg')}
                className="w-full flex items-center justify-between p-6 bg-white hover:bg-gray-50 transition"
              >
                <h3 className="text-xl font-bold text-gray-900">WRG (Workforce Readiness & Growth)</h3>
                <ChevronDown className={`w-6 h-6 transition-transform ${openSection === 'wrg' ? 'rotate-180' : ''}`} />
              </button>
              {openSection === 'wrg' && (
                <div className="p-6 bg-gray-50 border-t-2 border-gray-200">
                  <p className="text-gray-700 mb-4">
                    Support pathways focused on readiness, retention, and successful completion of training programs.
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500 font-bold">•</span>
                      <span>Wraparound and readiness support</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500 font-bold">•</span>
                      <span>Eligibility varies by region and program</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500 font-bold">•</span>
                      <span>Designed to reduce barriers to completion</span>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* Apprenticeships Dropdown */}
            <div className="border-2 border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleSection('apprenticeships')}
                className="w-full flex items-center justify-between p-6 bg-white hover:bg-gray-50 transition"
              >
                <h3 className="text-xl font-bold text-gray-900">Registered Apprenticeships</h3>
                <ChevronDown className={`w-6 h-6 transition-transform ${openSection === 'apprenticeships' ? 'rotate-180' : ''}`} />
              </button>
              {openSection === 'apprenticeships' && (
                <div className="p-6 bg-gray-50 border-t-2 border-gray-200">
                  <p className="text-gray-700 mb-4">
                    Earn while you learn through DOL-registered apprenticeship programs with structured training and employment.
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500 font-bold">•</span>
                      <span>Get paid while training</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500 font-bold">•</span>
                      <span>DOL-registered programs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500 font-bold">•</span>
                      <span>Graduate debt-free with job experience</span>
                    </li>
                  </ul>
                  <div className="mt-4">
                    <Link
                      href="/programs/barber-apprenticeship"
                      className="inline-flex items-center text-orange-500 font-bold hover:text-orange-600"
                    >
                      View Barber Apprenticeship Program →
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* APPRENTICESHIP */}
        <section className="mt-14 rounded-3xl border border-zinc-200 bg-zinc-50 p-8 sm:p-10">
          <h2 className="text-2xl sm:text-2xl md:text-3xl font-bold text-zinc-900">
            Apprenticeship & earn-while-you-learn options
          </h2>
          <p className="mt-4 text-zinc-700 max-w-3xl">
            Some programs offer apprenticeship-aligned pathways where you gain
            hands-on experience while progressing toward completion. These
            options may include structured milestones, supervised training, and
            employment-aligned outcomes.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Link
              href="/programs"
              className="rounded-xl border border-zinc-300 bg-white px-5 py-3 font-bold hover:bg-zinc-50 text-center transition"
            >
              View Apprenticeship Programs
            </Link>
            <Link
              href="/contact"
              className="rounded-xl bg-zinc-900 text-white px-5 py-3 font-bold hover:bg-zinc-800 text-center transition"
            >
              Ask About Eligibility
            </Link>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="mt-14">
          <h2 className="text-2xl sm:text-2xl md:text-3xl font-bold text-zinc-900">
            How funding works
          </h2>

          <ol className="mt-6 space-y-4 list-decimal pl-5 text-zinc-700 max-w-3xl">
            <li>Submit a short application.</li>
            <li>We review your goals, background, and program fit.</li>
            <li>Eligibility is checked for available funding pathways.</li>
            <li>You choose a program and confirm next steps.</li>
            <li>Begin training with clarity and support.</li>
          </ol>
        </section>

        {/* IMPORTANT NOTE */}
        <section className="mt-12 max-w-3xl">
          <p className="text-sm text-zinc-600">
            Important: Funding availability is not guaranteed and depends on
            eligibility, documentation, partner requirements, and current
            program capacity. Our team helps you understand options and next
            steps.
          </p>
        </section>

        {/* FINAL CTA */}
        <section className="mt-16 rounded-3xl border border-zinc-200 bg-white p-8 sm:p-10 shadow-sm">
          <h2 className="text-2xl sm:text-2xl md:text-3xl font-bold text-zinc-900">
            Ready to explore your options?
          </h2>
          <p className="mt-3 text-zinc-700">
            Apply today and we'll help you determine program fit, timelines, and
            potential funding pathways.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Link
              href="/apply"
              className="rounded-xl bg-zinc-900 text-white px-5 py-3 font-bold hover:bg-zinc-800 text-center transition"
            >
              Start an Application
            </Link>
            <Link
              href="/programs"
              className="rounded-xl border border-zinc-300 bg-white px-5 py-3 font-bold hover:bg-zinc-50 text-center transition"
            >
              Browse Programs
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}

function FundingCard({
  title,
  description,
  bullets,
}: {
  title: string;
  description: string;
  bullets: string[];
}) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-bold text-zinc-900">{title}</h3>
      <p className="mt-2 text-zinc-700">{description}</p>
      <ul className="mt-4 space-y-2 text-sm text-zinc-700 list-disc pl-5">
        {bullets.map((b) => (
          <li key={b}>{b}</li>
        ))}
      </ul>
    </div>
  );
}
