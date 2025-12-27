import React from 'react';
"use client";

import { useEffect, useRef, useState } from 'react';

interface OptimizedVideoProps {
  src: string;
  poster?: string;
  className?: string;
}

export function OptimizedVideo({ src, poster, className = '' }: OptimizedVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Only load video when it's about to be visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
            // Delay play slightly to allow video to load
            setTimeout(() => {
              video.play().catch(() => {
                // Autoplay blocked, that's fine
              });
            }, 100);
          } else if (!entry.isIntersecting) {
            video.pause();
          }
        });
      },
      { 
        threshold: 0.1,
        rootMargin: '50px' // Start loading 50px before visible
      }
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, [isVisible]);

  return (
    <>
      {!isVisible && poster && (
        <div 
          className={`${className} bg-cover bg-center`}
          style={{ backgroundImage: `url(${poster})` }}
        />
      )}
      <video
        ref={videoRef}
        className={`${className} ${!isVisible ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`}
        loop
        muted
        playsInline
        preload="none"
        poster={poster}
      >
        {isVisible && <source src={src} type="video/mp4" />}
      </video>
    </>
  );
}
