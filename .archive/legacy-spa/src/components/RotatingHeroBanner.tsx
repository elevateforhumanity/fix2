/**
 * Rotating Hero Banner Component
 * Beautiful animated hero section with rotating slides
 * Features: Auto-rotation, smooth transitions, parallax effects
 */

import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Play, ArrowRight } from 'lucide-react';

interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  ctaText: string;
  ctaLink: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  gradient: string;
}

const heroSlides: HeroSlide[] = [
  {
    id: 'workforce-training',
    title: 'Transform Your Career',
    subtitle: '100% Free Workforce Training',
    description: 'Get certified in high-demand careers. No cost to you - fully funded through WIOA grants.',
    image: '/images/hero-training.jpg',
    ctaText: 'Start Learning',
    ctaLink: '/apply',
    secondaryCtaText: 'View Programs',
    secondaryCtaLink: '/programs',
    gradient: 'from-blue-600/90 via-blue-700/80 to-purple-800/90',
  },
  {
    id: 'healthcare',
    title: 'Healthcare Careers',
    subtitle: 'CNA & Medical Assistant Training',
    description: 'Launch your healthcare career with industry-recognized certifications and hands-on training.',
    image: '/images/efh-cna-hero.jpg',
    ctaText: 'Explore Healthcare',
    ctaLink: '/programs/healthcare',
    secondaryCtaText: 'Apply Now',
    secondaryCtaLink: '/apply',
    gradient: 'from-green-600/90 via-teal-700/80 to-cyan-800/90',
  },
  {
    id: 'skilled-trades',
    title: 'Skilled Trades',
    subtitle: 'Building Technology & Construction',
    description: 'Master in-demand trade skills with NCCER certification and apprenticeship opportunities.',
    image: '/images/efh-building-tech-card.jpg',
    ctaText: 'Learn a Trade',
    ctaLink: '/programs/building-tech',
    secondaryCtaText: 'See All Programs',
    secondaryCtaLink: '/programs',
    gradient: 'from-orange-600/90 via-red-700/80 to-pink-800/90',
  },
  {
    id: 'barber',
    title: 'Barber & Cosmetology',
    subtitle: 'Licensed Professional Training',
    description: 'Get your barber license with Milady curriculum and start your own business.',
    image: '/images/efh-barber-card.jpg',
    ctaText: 'Start Your Journey',
    ctaLink: '/programs/barber',
    secondaryCtaText: 'Learn More',
    secondaryCtaLink: '/programs',
    gradient: 'from-purple-600/90 via-indigo-700/80 to-blue-800/90',
  },
];

interface RotatingHeroBannerProps {
  autoRotate?: boolean;
  rotationInterval?: number;
  showControls?: boolean;
  showIndicators?: boolean;
  className?: string;
}

export default function RotatingHeroBanner({
  autoRotate = true,
  rotationInterval = 6000,
  showControls = true,
  showIndicators = true,
  className = '',
}: RotatingHeroBannerProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    setTimeout(() => setIsAnimating(false), 600);
  }, [isAnimating]);

  const prevSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
    setTimeout(() => setIsAnimating(false), 600);
  }, [isAnimating]);

  const goToSlide = useCallback((index: number) => {
    if (isAnimating || index === currentSlide) return;
    setIsAnimating(true);
    setCurrentSlide(index);
    setTimeout(() => setIsAnimating(false), 600);
  }, [isAnimating, currentSlide]);

  // Auto-rotation
  useEffect(() => {
    if (!autoRotate || isPaused) return;

    const interval = setInterval(nextSlide, rotationInterval);
    return () => clearInterval(interval);
  }, [autoRotate, isPaused, nextSlide, rotationInterval]);

  const slide = heroSlides[currentSlide];

  return (
    <div
      className={`relative w-full h-[600px] md:h-[700px] lg:h-[800px] overflow-hidden bg-gray-900 ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Images with Parallax */}
      {heroSlides.map((s, index) => (
        <div
          key={s.id}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
            index === currentSlide
              ? 'opacity-100 scale-100'
              : 'opacity-0 scale-110'
          }`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center transform transition-transform duration-[8000ms] ease-out"
            style={{
              backgroundImage: `url(${s.image})`,
              transform: index === currentSlide ? 'scale(1.1)' : 'scale(1)',
            }}
          />
          {/* Gradient Overlay */}
          <div className={`absolute inset-0 bg-gradient-to-r ${s.gradient}`} />
        </div>
      ))}

      {/* Content */}
      <div className="relative h-full container mx-auto px-4 flex items-center">
        <div className="max-w-3xl">
          {/* Animated Content */}
          <div
            className={`transform transition-all duration-700 ${
              isAnimating
                ? 'opacity-0 translate-y-8'
                : 'opacity-100 translate-y-0'
            }`}
          >
            {/* Subtitle */}
            <div className="mb-4 animate-fade-in-up">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm font-medium border border-white/20">
                <Play className="w-4 h-4" />
                {slide.subtitle}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight animate-fade-in-up animation-delay-100">
              {slide.title}
            </h1>

            {/* Description */}
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed animate-fade-in-up animation-delay-200">
              {slide.description}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up animation-delay-300">
              <Link
                to={slide.ctaLink}
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-gray-900 rounded-lg font-semibold text-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl"
              >
                {slide.ctaText}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              {slide.secondaryCtaText && slide.secondaryCtaLink && (
                <Link
                  to={slide.secondaryCtaLink}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-lg font-semibold text-lg hover:bg-white/20 border-2 border-white/30 hover:border-white/50 transform hover:scale-105 transition-all duration-300"
                >
                  {slide.secondaryCtaText}
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      {showControls && (
        <>
          <button
            onClick={prevSlide}
            disabled={isAnimating}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed border border-white/20"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6 md:w-7 md:h-7" />
          </button>

          <button
            onClick={nextSlide}
            disabled={isAnimating}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed border border-white/20"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6 md:w-7 md:h-7" />
          </button>
        </>
      )}

      {/* Slide Indicators */}
      {showIndicators && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
          {heroSlides.map((s, index) => (
            <button
              key={s.id}
              onClick={() => goToSlide(index)}
              disabled={isAnimating}
              className={`group relative h-2 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'w-12 bg-white'
                  : 'w-8 bg-white/40 hover:bg-white/60'
              } disabled:cursor-not-allowed`}
              aria-label={`Go to slide ${index + 1}`}
            >
              {/* Progress bar for current slide */}
              {index === currentSlide && autoRotate && !isPaused && (
                <div
                  className="absolute inset-0 bg-white/50 rounded-full origin-left animate-progress"
                  style={{
                    animationDuration: `${rotationInterval}ms`,
                  }}
                />
              )}
            </button>
          ))}
        </div>
      )}

      {/* Pause Indicator */}
      {isPaused && autoRotate && (
        <div className="absolute top-4 right-4 px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm border border-white/20">
          Paused
        </div>
      )}
    </div>
  );
}
