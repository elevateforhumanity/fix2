"use client";

import Image from "next/image";
import type { Program } from "@/lib/programs";

export function ProgramHero({ program }: { program: Program }) {
  const isBarberProgram = program.slug === 'barber-apprenticeship';
  
  return (
    <>
      {/* Clean White Hero - No Gradient, No Stretch */}
      <section className="bg-white py-16 border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-sm uppercase tracking-wide text-orange-600 mb-2">
              Elevate Workforce Pathway
            </p>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">{program.name}</h1>
            <p className="text-lg md:text-xl mb-8 text-gray-700">
              {program.shortTagline}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href={program.ctaPrimary.href}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition"
              >
                {program.ctaPrimary.label}
              </a>
              {program.ctaSecondary ? (
                <a
                  href={program.ctaSecondary.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-100 text-gray-900 px-8 py-3 rounded-lg font-bold hover:bg-gray-200 transition border-2 border-gray-300"
                >
                  {program.ctaSecondary.label}
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      {/* Program Image/Video & Quick Facts */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Video for Barber, Image for others */}
            <div className="mb-8 rounded-lg overflow-hidden shadow-lg">
              {isBarberProgram ? (
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-auto"
                  style={{ maxHeight: '600px' }}
                >
                  <source src="/videos/barber-hero.mp4" type="video/mp4" />
                </video>
              ) : (
                <Image
                  src={program.heroImage}
                  alt={program.heroImageAlt}
                  width={1200}
                  height={600}
                  className="w-full h-auto object-cover"
                  priority
                />
              )}
            </div>

            {/* Quick Facts */}
            <div className="grid md:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
                <div className="text-sm text-gray-600 mb-1">Duration</div>
                <div className="text-2xl font-bold text-purple-600">{program.duration}</div>
              </div>
              <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
                <div className="text-sm text-gray-600 mb-1">Cost</div>
                <div className="text-2xl font-bold text-green-600">$0</div>
              </div>
              <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
                <div className="text-sm text-gray-600 mb-1">Format</div>
                <div className="text-2xl font-bold text-blue-600">{program.format}</div>
              </div>
              <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
                <div className="text-sm text-gray-600 mb-1">Level</div>
                <div className="text-2xl font-bold text-orange-600">{program.level}</div>
              </div>
            </div>

            <p className="mt-4 text-xs text-gray-500 text-center">
              Schedule: {program.schedule} | * Images are illustrative. Actual training locations may vary by partner.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
