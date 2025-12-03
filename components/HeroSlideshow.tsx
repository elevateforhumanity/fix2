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
    image: "/images/artlist/hero-training-3.jpg",
    title: "Elevate for Humanity",
    text: "State-approved, federally aligned workforce training that opens doors to high-wage careers.",
    cta: {
      text: "Explore Programs",
      href: "/programs/barber-apprenticeship"
    }
  },
  {
    image: "/images/artlist/hero-training-1.jpg",
    title: "DOL Registered Barber Apprenticeship",
    text: "2,000-hour apprenticeship or 1,500-hour program with financial aid. Earn while you learn. WIOA, WRG, and JRI fundable.",
    cta: {
      text: "Learn More",
      href: "/programs/barber-apprenticeship"
    }
  },
  {
    image: "/images/artlist/hero-training-7.jpg",
    title: "Healthcare Training Programs",
    text: "CNA certification through Choice Medical Institute. State-approved, workforce fundable, high-demand careers.",
    cta: {
      text: "Explore Healthcare",
      href: "/programs/barber-apprenticeship"
    }
  },
  {
    image: "/images/artlist/hero-training-8.jpg",
    title: "Skilled Trades & Building Technician",
    text: "HVAC, electrical, plumbing. Hands-on training for high-wage careers in construction and maintenance.",
    cta: {
      text: "View Programs",
      href: "/programs/barber-apprenticeship"
    }
  },
  {
    image: "/images/artlist/hero-training-4.jpg",
    title: "100% Fundable Programs",
    text: "WIOA, Workforce Ready Grant, Justice Reinvestment Initiative. Most students pay $0 out of pocket.",
    cta: {
      text: "Explore Funding",
      href: "/funding"
    }
  },
  {
    image: "/images/artlist/hero-training-6.jpg",
    title: "Whole-Person Support Services",
    text: "Life coaching, mental health partnerships, and wraparound support to help you succeed.",
    cta: {
      text: "Learn About Support",
      href: "/support"
    }
  },
  {
    image: "/images/artlist/hero-training-5.png",
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
    </section>
  );
}
