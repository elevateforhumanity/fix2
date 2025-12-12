'use client';
import { useEffect, useRef, useState } from 'react';
export function WelcomeAudio() {
  // DISABLED: Robot voiceover - waiting for human voice recording
  // TODO: Replace /videos/voiceover.mp3 with human voice
  // Script available at: /public/videos/homepage-voiceover-natural.txt
  return null;
  
  /* Original code - re-enable when human voiceover is ready
  const audioRef = useRef<HTMLAudioElement>(null);
  const [hasPlayed, setHasPlayed] = useState(false);
  useEffect(() => {
    // Only play once per session
    const hasPlayedBefore = sessionStorage.getItem('welcomeAudioPlayed');
    if (!hasPlayedBefore && audioRef.current) {
      // Small delay to ensure page is loaded
      const timer = setTimeout(() => {
        audioRef.current?.play().catch((error) => {
          // Autoplay might be blocked by browser
        });
        sessionStorage.setItem('welcomeAudioPlayed', 'true');
        setHasPlayed(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, []);
  return (
    <audio
      ref={audioRef}
      src="/videos/voiceover.mp3"
      preload="none"
      // No loop - plays once
    />
  );
  */
}
