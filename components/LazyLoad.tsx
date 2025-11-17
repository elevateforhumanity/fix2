'use client';

import { useEffect, useRef, useState } from 'react';

interface LazyLoadProps {
  children: React.ReactNode;
  threshold?: number;
  rootMargin?: string;
  placeholder?: React.ReactNode;
}

export function LazyLoad({ 
  children, 
  threshold = 0.1, 
  rootMargin = '50px',
  placeholder 
}: LazyLoadProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return (
    <div ref={ref}>
      {isVisible ? children : (placeholder || <div className="min-h-[200px]" />)}
    </div>
  );
}
