'use client';

import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function HeroSlideshow() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    // Try to auto-play video with sound
    if (videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.play().catch(() => {
        // If autoplay with sound fails, try muted
        if (videoRef.current) {
          videoRef.current.muted = true;
          setIsMuted(true);
          videoRef.current.play();
        }
      });
    }
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <div className="absolute inset-0 w-full h-full">
      <video
        ref={videoRef}
        autoPlay
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ 
          objectFit: 'cover',
          width: '100%',
          height: '100%',
          filter: 'contrast(1.05) saturate(1.1)',
          imageRendering: 'high-quality'
        }}
      >
        <source src="/videos/success-stories-video-with-narration.mp4" type="video/mp4" />
      </video>

      {/* Subtle dark overlay like Industrious */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Audio control button */}
      <button
        onClick={toggleMute}
        className="absolute bottom-8 right-8 z-20 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all hover:scale-105"
        aria-label={isMuted ? 'Unmute video' : 'Mute video'}
      >
        {isMuted ? (
          <VolumeX className="w-5 h-5 text-slate-900" />
        ) : (
          <Volume2 className="w-5 h-5 text-slate-900" />
        )}
      </button>
    </div>
  );
}
