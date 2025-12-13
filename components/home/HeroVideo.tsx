"use client";

import { useRef, useState } from "react";

type HeroVideoProps = {
  src: string;
  poster?: string;
  className?: string;
};

export default function HeroVideo({ src, poster, className }: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);

  const playWithSound = async () => {
    const v = videoRef.current;
    if (!v) return;
    try {
      v.muted = false;
      await v.play();
      setStarted(true);
    } catch {
      // If browser blocks for any reason, user can still hit native controls if you enable them later.
      setStarted(true);
    }
  };

  return (
    <div className={`relative w-full ${className ?? ""}`}>
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        preload="metadata"
        playsInline
        muted
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

      <div className="mt-2 text-xs text-zinc-600">
        Tip: Sound starts when you tap Play (modern browser rule).
      </div>
    </div>
  );
}
