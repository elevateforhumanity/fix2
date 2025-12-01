"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    image: "/images/gallery/image1.jpg",
    title: "Welcome to Elevate For Humanity",
    text: "Where everyday people turn real life into real careers",
  },
  {
    image: "/images/gallery/image2.jpg",
    title: "Free Workforce Training",
    text: "State and Federal Funded - WIOA, Workforce Ready Grants, and registered apprenticeships",
  },
  {
    image: "/images/gallery/image3.jpg",
    title: "Healthcare Careers",
    text: "CNA, medical assisting, and phlebotomy get you job-ready in just weeks",
  },
  {
    image: "/images/gallery/image4.jpg",
    title: "Skilled Trades",
    text: "Learn HVAC and building maintenance skills that pay well",
  },
  {
    image: "/images/gallery/image5.jpg",
    title: "Transportation Careers",
    text: "CDL and logistics training open doors to stable, high-demand careers",
  },
  {
    image: "/images/gallery/image6.jpg",
    title: "Support and Advising",
    text: "Our team walks with you through funding, enrollment, and getting started",
  },
  {
    image: "/images/gallery/image7.jpg",
    title: "Mental Wellness Support",
    text: "We see the whole person - mental wellness and life support are part of your journey",
  },
  {
    image: "/images/gallery/image8.jpg",
    title: "Real Outcomes",
    text: "Our graduates move from stuck to hired with real certifications and real paychecks",
  },
  {
    image: "/images/gallery/image9.jpg",
    title: "Community and Family",
    text: "When one person elevates, the whole family and community feel it",
  },
  {
    image: "/images/gallery/image10.jpg",
    title: "Ready for a Fresh Start?",
    text: "Click apply and let's see what funding you qualify for",
  },
];

export default function HeroSlideshow() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

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
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            className="object-cover"
            priority={index === 0}
            quality={100}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/50 to-transparent" />
          
          <div className="relative h-full flex items-center">
            <div className="mx-auto max-w-7xl px-6 lg:px-8 w-full">
              <div className="max-w-3xl">
                <h1 className="text-5xl md:text-6xl font-light text-white mb-6 leading-tight">
                  {slide.title}
                </h1>
                <p className="text-xl md:text-2xl text-slate-200 font-light mb-8 leading-relaxed">
                  {slide.text}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/apply"
                    className="inline-flex items-center justify-center px-8 py-4 bg-orange-500 text-white font-semibold rounded hover:bg-orange-600 transition-colors shadow-lg"
                  >
                    Apply Now
                  </Link>
                  <Link
                    href="/programs"
                    className="inline-flex items-center justify-center px-8 py-4 bg-white text-slate-900 font-semibold rounded border-2 border-white hover:bg-slate-50 transition-colors shadow-lg"
                  >
                    Explore Programs
                  </Link>
                </div>
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
