# AUTOPILOT-05: Create CountUp Component (Zero Dependencies)

## Mission
Create a counter animation component using pure JavaScript with requestAnimationFrame.

## File to Create
`components/animations/CountUp.tsx`

## Requirements
- ✅ ZERO external dependencies
- ✅ Use requestAnimationFrame for smooth animation
- ✅ Trigger on scroll into view (IntersectionObserver)
- ✅ Easing function for natural movement
- ✅ Support for suffixes (%, $, +, etc.)
- ✅ TypeScript with proper types

## Complete Implementation

```tsx
'use client';
import { useEffect, useRef, useState } from 'react';

interface CountUpProps {
  end: number;
  start?: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  threshold?: number;
  className?: string;
}

export function CountUp({ 
  end,
  start = 0,
  duration = 2000,
  suffix = '',
  prefix = '',
  decimals = 0,
  threshold = 0.5,
  className = ''
}: CountUpProps) {
  const [count, setCount] = useState(start);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const frameRef = useRef<number>();

  // Easing function for smooth animation
  const easeOutQuart = (t: number): number => {
    return 1 - Math.pow(1 - t, 4);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          
          const startTime = performance.now();
          const range = end - start;

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = easeOutQuart(progress);
            const current = start + (range * easedProgress);

            setCount(current);

            if (progress < 1) {
              frameRef.current = requestAnimationFrame(animate);
            } else {
              setCount(end);
            }
          };

          frameRef.current = requestAnimationFrame(animate);
          observer.unobserve(entry.target);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      observer.disconnect();
    };
  }, [end, start, duration, threshold, hasAnimated]);

  const formatNumber = (num: number): string => {
    return num.toFixed(decimals);
  };

  return (
    <span ref={ref} className={className}>
      {prefix}{formatNumber(count)}{suffix}
    </span>
  );
}
```

## Usage Example

```tsx
// In app/page.tsx - Stats section
import { CountUp } from '@/components/animations/CountUp';

<div className="text-4xl sm:text-5xl font-black text-orange-500">
  <CountUp end={33} />
</div>
<div className="text-sm sm:text-base text-gray-300 font-semibold">
  Career Programs
</div>

<div className="text-4xl sm:text-5xl font-black text-orange-500">
  <CountUp end={0} prefix="$" />
</div>
<div className="text-sm sm:text-base text-gray-300 font-semibold">
  Tuition Cost
</div>

<div className="text-4xl sm:text-5xl font-black text-orange-500">
  <CountUp end={100} suffix="%" />
</div>
<div className="text-sm sm:text-base text-gray-300 font-semibold">
  Funded Training
</div>
```

## Testing Checklist
- [ ] Counter animates from 0 to target number
- [ ] Easing function creates smooth acceleration
- [ ] Triggers when scrolled into view
- [ ] Suffix and prefix display correctly
- [ ] Decimals work for float numbers
- [ ] Animation only runs once
- [ ] requestAnimationFrame cleans up properly
- [ ] No performance issues

## Success Criteria
✅ Component created with zero dependencies  
✅ Uses requestAnimationFrame for 60fps  
✅ Smooth easing function  
✅ IntersectionObserver trigger  
✅ Supports prefix/suffix  
✅ TypeScript types included  
✅ Cleans up animation frame  

## Status
⏳ READY TO IMPLEMENT
