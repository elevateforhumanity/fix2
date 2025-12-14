'use client';

import Image from 'next/image';
import type { Program } from '@/app/data/programs';

export function ProgramHero({ program }: { program: Program }) {
  const isBarberProgram = program.slug === 'barber-apprenticeship';
  const isHVACProgram = program.slug === 'hvac-technician';
  const isCDLProgram = program.slug === 'cdl';
  const isCNAProgram = program.slug === 'cna';
  const isWorkforceProgram = program.slug === 'workforce-readiness';
  const isMedicalAssistant = program.slug === 'medical-assistant';
  const isBuildingTech = program.slug === 'building-technician';
  const hasVideo =
    isBarberProgram ||
    isHVACProgram ||
    isCDLProgram ||
    isCNAProgram ||
    isWorkforceProgram ||
    isMedicalAssistant ||
    isBuildingTech;

  // Get icon for program
  const getIcon = () => {
    if (program.slug.includes('barber')) return '✂️';
    if (program.slug.includes('cna') || program.slug.includes('health'))
      return '🏥';
    if (program.slug.includes('medical')) return '🩺';
    if (program.slug.includes('hvac')) return '🛠️';
    if (program.slug.includes('cdl')) return '🚚';
    if (program.slug.includes('tax') || program.slug.includes('business'))
      return '💼';
    if (program.slug.includes('beauty') || program.slug.includes('esthetician'))
      return '💅';
    if (program.slug.includes('building')) return '🏗️';
    return '📚';
  };

  return (
    <>
      {/* Hero with Image/Video Background */}
      <section className="relative bg-slate-900">
        <div className="relative w-full min-h-[500px] md:min-h-[600px] overflow-hidden">
          {hasVideo ? (
            <>
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
                      ? 'https://cms-artifacts.artlist.io/content/generated-video-v1/video__3/video-7b329d1f-3f92-4ec5-acdf-9d2d7ff6de5f.mp4?Expires=2081035443&Key-Pair-Id=K2ZDLYDZI2R1DF&Signature=2KDgdkukV1l5tUykhY0SBZu0ZYxEp6Xp86bQjcsHKxNbWwEjUxfu5OSCKMrGG2~xv00hDGlPIxaSaE~zClb9YFcW6WXYwa1sWpZcuqovnSTb5HBs5Vv13W-uCiEqd9-UenNmOCUQAsx70OYANXHY4d6qQBaVtMl9XkB9~mNfUYbV0hognViSLyI~7uK~gpA-bSCss8NZAAlwASn8vmgi8HrY3NQNfAvXKp0GaVi5RSb5L58PuRfb0S5GPV-B5UeImUvIxTCNfDG9ZOsVAvl8J7FxmgQcxc8-M6BGHoJR~2DndDRStF272N8p7yOiJI6NEt-KZxym~WceY3RZ6jKjJQ__'
                      : isCDLProgram
                        ? '/videos/cdl-hero.mp4'
                        : isCNAProgram
                          ? '/videos/cna-hero.mp4'
                          : isWorkforceProgram
                            ? '/videos/business-hero.mp4'
                            : isMedicalAssistant
                              ? '/videos/medical-assistant-hero.mp4'
                              : isBuildingTech
                                ? '/videos/building-technician-hero.mp4'
                                : '/videos/hvac-hero-final.mp4'
                  }
                  type="video/mp4"
                />
              </video>
              {isBarberProgram && (
                <audio
                  autoPlay
                  loop
                  src="/videos/barber-voiceover.mp3"
                  className="hidden"
                />
              )}
            </>
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
          <div className="absolute inset-0 bg-black/50 flex items-end">
            <div className="container mx-auto px-4 pb-12">
              <div className="max-w-4xl">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-5xl text-3xl md:text-4xl lg:text-5xl">
                    {getIcon()}
                  </span>
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
                    href={`/apply?program=${program.slug}`}
                    className="inline-flex items-center justify-center bg-orange-500 text-white px-8 py-4 rounded-lg font-bold hover:bg-orange-600 transition shadow-lg"
                  >
                    Apply Now
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
