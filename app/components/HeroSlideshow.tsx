'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const slides = [
  {
    image: '/images/students-new/student-11.jpg',
    alt: 'Elevate for Humanity students in career training programs'
  },
  {
    image: '/images/gallery/image6.jpg',
    alt: 'Professional barber training'
  },
  {
    image: '/images/students-new/student-1.jpg',
    alt: 'Healthcare training program'
  },
  {
    image: '/images/students-new/student-5.jpg',
    alt: 'Hands-on technical training'
  }
];

export default function HeroSlideshow() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="absolute inset-0">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={slide.image}
            alt={slide.alt}
            fill
            className="object-cover brightness-90"
            priority={index === 0}
            quality={100}
            sizes="100vw"
          />
        </div>
      ))}
    </div>
  );
}
