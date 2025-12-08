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
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ 
          objectFit: 'cover',
          width: '100%',
          height: '100%'
        }}
      >
        <source src="https://cms-artifacts.artlist.io/content/generated-video-v1/video__9/video-5599b9e1-fe1f-4f31-a821-c5d9b2af60e8.mp4?Expires=2080573361&Key-Pair-Id=K2ZDLYDZI2R1DF&Signature=rI5UHv2UMlBfkBpaDuFVenGCGZbCO1Zv7QRUZimnYwDokGC798BlmiMVc1UB8TGa4XS1eR0gOwVCWZ9~BC-it~Guvkj2PXZWKaSOWjtn30JLTKegCoF5hI3Pw1aNVmrYTygFnkCKSfbKWIMklY6-xgaH6r6YWeFGECxocy2csm8~wVW2xre-OWDasUP9tvJ-Uecc5vV9qtQVSgxaqQ604KJZnTOq6Wgh~jgCl8nl2EqXn0ZbMfwuyzZS1-ytRtgVz2qPWSNjtPiqrsvesfBIvqqFv4wot5gpv4FH1uIEv-noKxQ~tSDqd9f3M~nH4o0tDzD4~~q1tO6b3einm1xbzw__" type="video/mp4" />
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
