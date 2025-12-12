'use client';

import Image from 'next/image';
import type { Program } from '@/app/data/programs';

export function ProgramHero({ program }: { program: Program }) {
  const isBarberProgram = program.slug === 'barber-apprenticeship';
  const isHVACProgram = program.slug === 'hvac-technician';
  const isCDLProgram = program.slug === 'cdl';
  const hasVideo = isBarberProgram || isHVACProgram || isCDLProgram;

  // Get icon for program
  const getIcon = () => {
    if (program.slug.includes('barber')) return '✂️';
    if (program.slug.includes('cna') || program.slug.includes('health')) return '🏥';
    if (program.slug.includes('medical')) return '🩺';
    if (program.slug.includes('hvac')) return '🛠️';
    if (program.slug.includes('cdl')) return '🚚';
    if (program.slug.includes('tax') || program.slug.includes('business')) return '💼';
    if (program.slug.includes('beauty') || program.slug.includes('esthetician')) return '💅';
    if (program.slug.includes('building')) return '🏗️';
    return '📚';
  };

  return (
    <>
      {/* Hero with Image/Video Background */}
      <section className="relative bg-slate-900">
        <div className="relative w-full min-h-[500px] md:min-h-[600px] overflow-hidden">
          {hasVideo ? (
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source
                src={
                  isBarberProgram
                    ? '/videos/barber-hero-final.mp4'
                    : isCDLProgram
                    ? '/videos/cdl-hero.mp4'
                    : '/videos/hvac-hero-final.mp4'
                }
                type="video/mp4"
              />
            </video>
          ) : (
            <Image
              src={program.heroImage}
              alt={program.heroImageAlt}
              fill
              quality={70}
              className="object-cover"
              priority
            />
          )}
          
          {/* Overlay Content */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end">
            <div className="container mx-auto px-4 pb-12">
              <div className="max-w-4xl">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-5xl">{getIcon()}</span>
                  <p className="text-sm uppercase tracking-wide text-orange-400 font-semibold">
                    Elevate Workforce Pathway
                  </p>
                </div>
                <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
                  {program.name}
                </h1>
                <p className="text-xl md:text-2xl mb-8 text-slate-200 max-w-3xl">
                  {program.heroSubtitle}
                </p>
                <div className="flex flex-wrap gap-4">
                  <a
                    href={program.ctaPrimary.href}
                    className="inline-flex items-center justify-center bg-orange-500 text-white px-8 py-4 rounded-lg font-bold hover:bg-orange-600 transition shadow-lg"
                  >
                    {program.ctaPrimary.label}
                  </a>
                  {program.ctaSecondary && (
                    <a
                      href={program.ctaSecondary.href}
                      className="inline-flex items-center justify-center bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-bold hover:bg-white/20 transition border-2 border-white/30"
                    >
                      {program.ctaSecondary.label}
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Facts Bar */}
      <section className="py-8 bg-slate-50 border-b border-slate-200">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-sm text-slate-600 mb-1">Duration</div>
                <div className="text-3xl font-bold text-orange-500">
                  {program.duration}
                </div>
              </div>
              <div className="text-center">
                <div className="text-sm text-slate-600 mb-1">Cost</div>
                <div className="text-3xl font-bold text-orange-500">$0</div>
              </div>
              <div className="text-center">
                <div className="text-sm text-slate-600 mb-1">Format</div>
                <div className="text-3xl font-bold text-orange-500">
                  {program.format}
                </div>
              </div>
              <div className="text-center">
                <div className="text-sm text-slate-600 mb-1">Level</div>
                <div className="text-3xl font-bold text-orange-500">
                  {program.level}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
