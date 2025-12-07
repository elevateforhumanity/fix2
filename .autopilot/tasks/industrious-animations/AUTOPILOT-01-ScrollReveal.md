# AUTOPILOT-01: Create ScrollReveal Component (Zero Dependencies)

## Mission
Create a reusable ScrollReveal component using pure React and native IntersectionObserver API.

## File to Create
`components/animations/ScrollReveal.tsx`

## Requirements
- ✅ ZERO external dependencies
- ✅ Use native IntersectionObserver API
- ✅ TypeScript with proper types
- ✅ Configurable animation delay
- ✅ Configurable threshold
- ✅ Clean up observer on unmount

## Complete Implementation

```tsx
'use client';
import { useEffect, useRef, useState, ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  threshold?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade';
}

export function ScrollReveal({ 
  children, 
  className = '',
  delay = 0,
  threshold = 0.1,
  direction = 'up'
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
          observer.unobserve(entry.target);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [delay, threshold]);

  const getTransform = () => {
    if (isVisible) return 'translate(0, 0)';
    
    switch (direction) {
      case 'up':
        return 'translate(0, 40px)';
      case 'down':
        return 'translate(0, -40px)';
      case 'left':
        return 'translate(40px, 0)';
      case 'right':
        return 'translate(-40px, 0)';
      case 'fade':
        return 'translate(0, 0)';
      default:
        return 'translate(0, 40px)';
    }
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
        transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
      }}
    >
      {children}
    </div>
  );
}
```

## Usage Example

```tsx
// In app/page.tsx
import { ScrollReveal } from '@/components/animations/ScrollReveal';

<ScrollReveal>
  <h2>This fades in when scrolled into view</h2>
</ScrollReveal>

<ScrollReveal delay={100} direction="left">
  <div className="card">Card 1</div>
</ScrollReveal>

<ScrollReveal delay={200} direction="left">
  <div className="card">Card 2</div>
</ScrollReveal>
```

## Testing Checklist
- [ ] Component renders without errors
- [ ] Animation triggers when scrolled into view
- [ ] Delay prop works correctly
- [ ] Different directions work (up, down, left, right, fade)
- [ ] Observer cleans up on unmount
- [ ] Works on mobile devices
- [ ] No console errors

## Success Criteria
✅ Component created with zero dependencies  
✅ Uses native IntersectionObserver  
✅ Smooth 0.7s transition  
✅ Configurable delay and direction  
✅ TypeScript types included  
✅ Clean up on unmount  

## Status
⏳ READY TO IMPLEMENT
