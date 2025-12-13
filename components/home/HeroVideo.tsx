"use client";

import { useRef, useState, useEffect } from "react";

type HeroVideoProps = {
  src: string;
  poster?: string;
  className?: string;
  autoplay?: boolean;
};

export default function HeroVideo({ src, poster, className, autoplay = false }: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);

  // Attempt autoplay on mount
  useEffect(() => {
    if (!autoplay) return;
    
    const attemptAutoplay = async () => {
      const v = videoRef.current;
      if (!v) return;
      
      try {
        // Try with sound first
        v.muted = false;
        await v.play();
        setStarted(true);
        setUserInteracted(true);
      } catch {
        // If blocked, try muted autoplay
        try {
          v.muted = true;
          await v.play();
          setStarted(true);
        } catch {
          // Autoplay blocked completely, show play button
        }
      }
    };

    // Small delay to ensure video is loaded
    const timer = setTimeout(attemptAutoplay, 100);
    return () => clearTimeout(timer);
  }, [autoplay]);

  const playWithSound = async () => {
    const v = videoRef.current;
    if (!v) return;
    try {
      v.muted = false;
      await v.play();
      setStarted(true);
      setUserInteracted(true);
    } catch {
      setStarted(true);
      setUserInteracted(true);
    }
  };

  return (
    <div className={`relative w-full ${className ?? ""}`}>
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        preload="auto"
        playsInline
        loop
        controls={started}
        className="w-full rounded-2xl shadow-sm border border-zinc-200 bg-black"
      />

      {!started && (
        <button
          type="button"
          onClick={playWithSound}
          className="absolute inset-0 m-auto h-14 w-56 rounded-full bg-white/95 hover:bg-white text-zinc-900 font-extrabold shadow-md border border-zinc-200 transition-all hover:scale-105"
          aria-label="Play video with sound"
        >
          ▶ Play with Sound
        </button>
      )}

      {started && !userInteracted && (
        <button
          type="button"
          onClick={playWithSound}
          className="absolute bottom-4 right-4 px-4 py-2 rounded-full bg-white/95 hover:bg-white text-zinc-900 font-bold shadow-md border border-zinc-200 transition-all text-sm"
          aria-label="Unmute video"
        >
          🔇 Tap for Sound
        </button>
      )}
    </div>
  );
}
