# AUTOPILOT-12: Create Carousel Component (Zero Dependencies)

## Mission
Create a testimonial carousel with auto-play, touch gestures, and smooth transitions using pure CSS and JavaScript.

## File to Create
`components/animations/Carousel.tsx`

## Requirements
- ✅ ZERO external dependencies
- ✅ Auto-play with pause on hover
- ✅ Touch/swipe gestures for mobile
- ✅ Dot indicators
- ✅ Smooth CSS transitions
- ✅ Keyboard navigation (arrow keys)
- ✅ TypeScript with proper types

## Complete Implementation

```tsx
'use client';
import { useState, useEffect, useRef, ReactNode, TouchEvent } from 'react';

interface CarouselProps {
  children: ReactNode[];
  autoPlayInterval?: number;
  className?: string;
}

export function Carousel({ 
  children, 
  autoPlayInterval = 5000,
  className = ''
}: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const timerRef = useRef<NodeJS.Timeout>();

  const totalSlides = children.length;

  // Auto-play functionality
  useEffect(() => {
    if (!isPaused && autoPlayInterval > 0) {
      timerRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % totalSlides);
      }, autoPlayInterval);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isPaused, autoPlayInterval, totalSlides]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        goToPrevious();
      } else if (e.key === 'ArrowRight') {
        goToNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex]);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Touch gesture handlers
  const handleTouchStart = (e: TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      // Swiped left
      goToNext();
    }

    if (touchStart - touchEnd < -75) {
      // Swiped right
      goToPrevious();
    }
  };

  return (
    <div 
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slides Container */}
      <div 
        className="flex transition-transform duration-500 ease-out"
        style={{ 
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {children.map((child, index) => (
          <div 
            key={index}
            className="min-w-full"
          >
            {child}
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110"
        aria-label="Previous slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110"
        aria-label="Next slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {children.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-orange-500 w-8' 
                : 'bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
```

## Usage Example

```tsx
// In app/page.tsx
import { Carousel } from '@/components/animations/Carousel';

<section className="py-20 bg-gray-50">
  <div className="max-w-7xl mx-auto px-4">
    <h2 className="text-4xl font-bold text-center mb-12">
      What Our Students Say
    </h2>
    
    <Carousel autoPlayInterval={5000}>
      <div className="bg-white p-8 rounded-xl shadow-lg mx-4">
        <p className="text-lg mb-4">
          "This program changed my life. I went from unemployed to a career in healthcare in just 6 months!"
        </p>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-orange-500 rounded-full" />
          <div>
            <p className="font-bold">Sarah Johnson</p>
            <p className="text-sm text-gray-600">Medical Assistant Graduate</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-lg mx-4">
        <p className="text-lg mb-4">
          "The instructors were amazing and the job placement support was incredible."
        </p>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-orange-500 rounded-full" />
          <div>
            <p className="font-bold">Michael Chen</p>
            <p className="text-sm text-gray-600">Welding Graduate</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-lg mx-4">
        <p className="text-lg mb-4">
          "100% free training with no debt. I couldn't believe it was real!"
        </p>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-orange-500 rounded-full" />
          <div>
            <p className="font-bold">Jessica Martinez</p>
            <p className="text-sm text-gray-600">CDL Graduate</p>
          </div>
        </div>
      </div>
    </Carousel>
  </div>
</section>
```

## Testing Checklist
- [ ] Auto-play works (slides change every 5 seconds)
- [ ] Pause on hover works
- [ ] Touch swipe works on mobile (left/right)
- [ ] Arrow buttons work
- [ ] Dot indicators work
- [ ] Keyboard navigation works (arrow keys)
- [ ] Smooth transitions
- [ ] No layout shift
- [ ] Accessible (aria-labels)

## Success Criteria
✅ Component created with zero dependencies  
✅ Auto-play with pause on hover  
✅ Touch gestures for mobile  
✅ Dot indicators  
✅ Keyboard navigation  
✅ Smooth CSS transitions  
✅ TypeScript types included  
✅ Accessible  

## Status
⏳ READY TO IMPLEMENT
