'use client';

import { useState } from 'react';
import Image from 'next/image';

type HeroBannerProps = {
  title: string;
  subtitle: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  trustIndicators?: string[];
  // Video mode
  type?: 'image' | 'video';
  videoSrc?: string;
  posterSrc?: string;
  // Image mode
  heroImageSrc?: string;
  heroImageAlt?: string;
  overlay?: boolean;
};

export default function HeroBanner({
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  trustIndicators = [
    'WIOA • WRG • JRI',
    'Registered Apprenticeship',
    'Employer & Workforce Board Ready',
  ],
  type = 'image',
  videoSrc = '/video/hero-home-dec12.mp4',
  posterSrc = '/images/hero/hero-dec12-poster.jpg',
  heroImageSrc = '/images/hero/hero-main.svg',
  heroImageAlt = 'Elevate for Humanity hero banner',
  overlay = true,
}: HeroBannerProps) {
  const [isMuted, setIsMuted] = useState(true);

  const toggleMute = () => {
    const video = document.getElementById('hero-video') as HTMLVideoElement;
    if (video) {
      video.muted = !video.muted;
      setIsMuted(video.muted);
    }
  };

  return (
    <section className="relative w-full overflow-hidden rounded-3xl">
      <div className="relative h-[520px] w-full md:h-[600px]">
        {type === 'video' ? (
          <>
            <video
              id="hero-video"
              className="absolute inset-0 w-full h-full object-cover"
              src={videoSrc}
              poster={posterSrc}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
            />
            {overlay && (
              <div
                className="absolute inset-0 bg-black/45"
                aria-hidden="true"
              />
            )}
            <button
              onClick={toggleMute}
              className="absolute bottom-6 right-6 bg-black/60 text-white px-3 py-2 rounded-lg text-sm hover:bg-black/80 transition-colors"
              aria-label={isMuted ? 'Unmute video' : 'Mute video'}
            >
              {isMuted ? '🔇 Sound' : '🔊 Sound'}
            </button>
          </>
        ) : (
          <>
            <Image
              src={heroImageSrc}
              alt={heroImageAlt}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            {overlay && (
              <div
                className="absolute inset-0 bg-black/45"
                aria-hidden="true"
              />
            )}
          </>
        )}

        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto w-full max-w-6xl px-4 md:px-8">
            <div className="max-w-2xl">
              <h1 className="text-3xl font-semibold tracking-tight text-white md:text-5xl">
                {title}
              </h1>
              <p className="mt-4 text-base text-white/90 md:text-lg">
                {subtitle}
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                {primaryCta && (
                  <a
                    href={primaryCta.href}
                    className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black shadow-sm hover:bg-gray-100 transition-colors"
                  >
                    {primaryCta.label}
                  </a>
                )}
                {secondaryCta && (
                  <a
                    href={secondaryCta.href}
                    className="inline-flex items-center justify-center rounded-xl border border-white/40 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur hover:bg-white/20 transition-colors"
                  >
                    {secondaryCta.label}
                  </a>
                )}
              </div>

              {trustIndicators && trustIndicators.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-2">
                  {trustIndicators.map((indicator, index) => (
                    <span
                      key={index}
                      className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur"
                    >
                      {indicator}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
