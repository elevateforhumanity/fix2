'use client';
import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export function WelcomeAudio() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    // Try to autoplay
    if (audioRef.current) {
      const timer = setTimeout(() => {
        audioRef.current
          ?.play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch(() => {
            // Autoplay blocked - show button
            setShowButton(true);
          });
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="/videos/voiceover.mp3?v=2"
        preload="auto"
        onEnded={() => setIsPlaying(false)}
      />

      {/* Audio Control Button */}
      {showButton && (
        <button
          onClick={toggleAudio}
          className="fixed bottom-6 right-6 z-50 bg-orange-600 text-white p-4 rounded-full shadow-2xl hover:bg-orange-700 transition-all hover:scale-110 animate-pulse"
          aria-label={isPlaying ? 'Pause audio' : 'Play welcome message'}
        >
          {isPlaying ? (
            <VolumeX className="w-6 h-6" />
          ) : (
            <Volume2 className="w-6 h-6" />
          )}
        </button>
      )}
    </>
  );
}
