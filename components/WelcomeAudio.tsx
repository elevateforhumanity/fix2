'use client';
import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export function WelcomeAudio() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showButton, setShowButton] = useState(true);
  
  useEffect(() => {
    // Check if already played this session
    const hasPlayedBefore = sessionStorage.getItem('welcomeAudioPlayed');
    if (hasPlayedBefore) {
      setShowButton(false);
    }
  }, []);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
          sessionStorage.setItem('welcomeAudioPlayed', 'true');
        }).catch((error) => {
          console.log('Audio play failed:', error);
        });
      }
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setShowButton(false);
  };
  
  if (!showButton) return null;

  return (
    <>
      <audio
        ref={audioRef}
        src="/videos/voiceover.mp3"
        preload="auto"
        onEnded={handleEnded}
      />
      
      {/* Floating Audio Button */}
      <button
        onClick={toggleAudio}
        className="fixed bottom-6 left-6 z-50 bg-red-600 hover:bg-red-700 text-white p-4 rounded-full shadow-2xl transition-all hover:scale-110 flex items-center gap-2"
        aria-label={isPlaying ? "Pause welcome message" : "Play welcome message"}
      >
        {isPlaying ? (
          <>
            <VolumeX className="w-6 h-6" />
            <span className="hidden sm:inline text-sm font-semibold">Pause Message</span>
          </>
        ) : (
          <>
            <Volume2 className="w-6 h-6" />
            <span className="hidden sm:inline text-sm font-semibold">Hear from Elizabeth</span>
          </>
        )}
      </button>
    </>
  );
}
