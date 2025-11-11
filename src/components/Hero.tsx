/**
 * Hero Component
 * Matches elevateforhumanity.org hero section exactly
 * Extracted from: https://www.elevateforhumanity.org
 */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface HeroProps {
  title: string;
  subtitle: string;
  badges?: Array<{
    icon: string;
    text: string;
  }>;
  primaryButton?: {
    text: string;
    href: string;
  };
  secondaryButton?: {
    text: string;
    href: string;
  };
  showCarousel?: boolean;
  backgroundImage?: string;
  className?: string;
}

const carouselImages = [
  {
    src: '/images/hero-1.jpg',
    alt: 'Black businessman talking to large group of entrepreneurs during an education event in conference hall',
    fallback:
      'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="1200" height="600"%3E%3Crect fill="%234a3728" width="1200" height="600"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" fill="%23fff" font-size="32"%3EEducation Event%3C/text%3E%3C/svg%3E',
  },
  {
    src: '/images/hero-2.jpg',
    alt: 'Webinar E-learning Skills Business Internet Technology Concepts Training Webinar E-learning Skills',
    fallback:
      'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="1200" height="600"%3E%3Crect fill="%2300a544" width="1200" height="600"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" fill="%23fff" font-size="32"%3EE-Learning%3C/text%3E%3C/svg%3E',
  },
  {
    src: '/images/hero-3.jpg',
    alt: 'Corporate Training Presentation In Classroom',
    fallback:
      'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="1200" height="600"%3E%3Crect fill="%23f5f1e8" width="1200" height="600"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" fill="%234a3728" font-size="32"%3ETraining Classroom%3C/text%3E%3C/svg%3E',
  },
];

export default function Hero({
  title,
  subtitle,
  badges = [],
  primaryButton,
  secondaryButton,
  showCarousel = false,
  backgroundImage,
  className = '',
}: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (!showCarousel) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [showCarousel]);

  return (
    <section className={`hero ${className}`}>
      {showCarousel && (
        <div className="hero-carousel relative w-full h-[500px] overflow-hidden">
          {carouselImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = image.fallback;
                }}
              />
            </div>
          ))}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
            {carouselImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentSlide ? 'bg-white' : 'bg-white/50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <div className="container text-center text-white">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">{title}</h1>
              <p className="text-xl md:text-2xl mb-8 max-w-[800px] mx-auto">
                {subtitle}
              </p>
              {primaryButton && (
                <Link
                  to={primaryButton.href}
                  className="button-white text-lg px-8 py-4"
                >
                  {primaryButton.text}
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
      {!showCarousel && backgroundImage && (
        <div
          className="relative w-full min-h-[500px] bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${backgroundImage})`,
          }}
        >
          <div className="container h-full flex items-center justify-center py-20">
            <div className="hero-content text-center text-white max-w-4xl">
              <h1 className="hero-title text-white text-5xl md:text-6xl font-bold mb-6">
                {title}
              </h1>
              <p className="hero-subtitle text-white text-xl md:text-2xl mb-8">
                {subtitle}
              </p>
              {badges.length > 0 && (
                <div className="flex flex-wrap gap-6 justify-center mb-8">
                  {badges.map((badge, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 rounded bg-white/90 text-[var(--color-brown)] font-medium"
                    >
                      {badge.icon} {badge.text}
                    </span>
                  ))}
                </div>
              )}
              {(primaryButton || secondaryButton) && (
                <div className="flex flex-wrap gap-6 justify-center">
                  {primaryButton && (
                    <Link
                      to={primaryButton.href}
                      className="button-white text-lg px-8 py-4"
                    >
                      {primaryButton.text}
                    </Link>
                  )}
                  {secondaryButton && (
                    <Link
                      to={secondaryButton.href}
                      className="button-outline-white text-lg px-8 py-4"
                    >
                      {secondaryButton.text}
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {!showCarousel && !backgroundImage && (
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">{title}</h1>
            <p className="hero-subtitle">{subtitle}</p>
            {badges.length > 0 && (
              <div className="flex flex-wrap gap-6 justify-center mb-8">
                {badges.map((badge, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 rounded bg-[var(--color-beige)] text-[var(--color-brown)] font-medium"
                  >
                    {badge.icon} {badge.text}
                  </span>
                ))}
              </div>
            )}
            {(primaryButton || secondaryButton) && (
              <div className="flex flex-wrap gap-6 justify-center">
                {primaryButton && (
                  <Link to={primaryButton.href} className="button">
                    {primaryButton.text}
                  </Link>
                )}
                {secondaryButton && (
                  <Link to={secondaryButton.href} className="button-secondary">
                    {secondaryButton.text}
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
