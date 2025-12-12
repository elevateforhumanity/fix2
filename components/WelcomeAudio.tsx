'use client';
import { useEffect, useRef, useState } from 'react';
export function WelcomeAudio() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [hasPlayed, setHasPlayed] = useState(false);
  
  useEffect(() => {
    // Play on every visit (removed session storage check)
    if (audioRef.current) {
      // Small delay to ensure page is loaded
      const timer = setTimeout(() => {
        audioRef.current?.play().catch((error) => {
          // Autoplay might be blocked by browser
          console.log('Autoplay blocked - user interaction required');
        });
        setHasPlayed(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, []);
  
  return (
    <audio
      ref={audioRef}
      src="/videos/voiceover.mp3"
      preload="auto"
      // No loop - plays once per page load
    />
  );
}
