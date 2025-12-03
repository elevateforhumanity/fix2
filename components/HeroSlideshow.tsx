"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Slide {
  image: string;
  title: string;
  text: string;
  cta?: {
    text: string;
    href: string;
  };
}

const slides: Slide[] = [
  {
    image: "/images/elizabeth-greene-founder.jpg",
    title: "Meet Elizabeth Greene, CEO & Founder",
    text: "Visionary workforce architect committed to creating equitable pathways for individuals and families across Indiana.",
    cta: {
      text: "Meet Our Team",
      href: "/team"
    }
  },
  {
    image: "/images/efh-barber-hero.jpg",
    title: "DOL Registered Barber Apprenticeship",
    text: "2,000-hour apprenticeship or 1,500-hour program with financial aid. Earn while you learn. WIOA, WRG, and JRI fundable.",
    cta: {
      text: "Learn More",
      href: "/programs/barber-apprenticeship"
    }
  },
  {
    image: "/images/efh-cna-hero.jpg",
    title: "Healthcare Training Programs",
    text: "CNA certification through Choice Medical Institute. State-approved, workforce fundable, high-demand careers.",
    cta: {
      text: "Explore Healthcare",
      href: "/programs/barber-apprenticeship"
    }
  },
  {
    image: "/images/carlina-wilkes.jpg",
    title: "Dr. Carlina Wilkes, Executive Director",
    text: "24+ years federal service. Leading financial operations and organizational compliance with integrity.",
    cta: {
      text: "Meet Our Leadership",
      href: "/team/carlina-wilkes"
    }
  },
  {
    image: "/images/efh-building-tech-hero.jpg",
    title: "Skilled Trades & Building Technician",
    text: "HVAC, electrical, plumbing. Hands-on training for high-wage careers in construction and maintenance.",
    cta: {
      text: "View Programs",
      href: "/programs/barber-apprenticeship"
    }
  },
  {
    image: "/images/clystjah-woodley.jpg",
    title: "Clystjah Woodley, Life Coach",
    text: "Empowering students with mindset coaching, accountability, and emotional wellness support.",
    cta: {
      text: "Learn About Support",
      href: "/support"
    }
  },
  {
    image: "/images/hero-banner.jpg",
    title: "100% Fundable Programs",
    text: "WIOA, Workforce Ready Grant, Justice Reinvestment Initiative. Most students pay $0 out of pocket.",
    cta: {
      text: "Explore Funding",
      href: "/funding"
    }
  },
  {
    image: "/images/delores-reynolds.jpg",
    title: "Delores Reynolds, Social Media Director",
    text: "Amplifying our mission through digital storytelling and community connection.",
    cta: {
      text: "Follow Our Story",
      href: "/team"
    }
  },
  {
    image: "/images/alina-smith.jpg",
    title: "Mental Health Partnership",
    text: "Alina Perfect, PMHNP provides psychiatric evaluation and wellness support through Perfect Wellness Behavioral Health.",
    cta: {
      text: "Learn More",
      href: "/team/alina-perfect"
    }
  },
  {
    image: "/images/hero-training.jpg",
    title: "State & Federal Alignment",
    text: "DOL Registered Apprenticeship Sponsor. ETPL Approved. Indiana Workforce Development Partner.",
    cta: {
      text: "Apply Now",
      href: "/apply"
    }
  }
];

export default function HeroSlideshow() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative h-[700px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          {slide.image ? (
            <>
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover"
                priority={index === 0}
                quality={100}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-900/40 via-slate-900/20 to-transparent" />
            </>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-blue-600" />
          )}
          
          <div className="relative h-full flex items-center">
            <div className="mx-auto max-w-7xl px-6 lg:px-8 w-full">
              <div className="max-w-3xl">
                <h1 className="text-5xl md:text-6xl font-light text-white mb-6 leading-tight">
                  {slide.title}
                </h1>
                <p className="text-xl md:text-2xl text-slate-200 font-light mb-8 leading-relaxed">
                  {slide.text}
                </p>
                {slide.cta && (
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                      href={slide.cta.href}
                      className="inline-flex items-center justify-center px-8 py-4 bg-white text-slate-900 font-semibold rounded hover:bg-slate-100 transition-colors shadow-lg"
                    >
                      {slide.cta.text}
                    </Link>
                    <Link
                      href="/apply"
                      className="inline-flex items-center justify-center px-8 py-4 bg-transparent text-white font-semibold rounded border-2 border-white hover:bg-white/10 transition-colors"
                    >
                      Apply Now
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all z-10"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all z-10"
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide
                ? "bg-white w-8"
                : "bg-white/50 hover:bg-white/75"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
