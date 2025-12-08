'use client';

import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function HeroSlideshow() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showButton, setShowButton] = useState(true);

  useEffect(() => {
    // Try to autoplay audio
    const playAudio = () => {
      if (audioRef.current) {
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
            setShowButton(false);
          })
          .catch(() => {
            // Autoplay blocked - show button
            setShowButton(true);
          });
      }
    };

    const timer = setTimeout(playAudio, 500);
    return () => clearTimeout(timer);
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
    <div className="absolute inset-0">
      <video
        autoPlay
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover brightness-90"
      >
        <source src="https://cms-artifacts.artlist.io/content/generated-video-v1/video__9/video-5599b9e1-fe1f-4f31-a821-c5d9b2af60e8.mp4?Expires=2080573361&Key-Pair-Id=K2ZDLYDZI2R1DF&Signature=rI5UHv2UMlBfkBpaDuFVenGCGZbCO1Zv7QRUZimnYwDokGC798BlmiMVc1UB8TGa4XS1eR0gOwVCWZ9~BC-it~Guvkj2PXZWKaSOWjtn30JLTKegCoF5hI3Pw1aNVmrYTygFnkCKSfbKWIMklY6-xgaH6r6YWeFGECxocy2csm8~wVW2xre-OWDasUP9tvJ-Uecc5vV9qtQVSgxaqQ604KJZnTOq6Wgh~jgCl8nl2EqXn0ZbMfwuyzZS1-ytRtgVz2qPWSNjtPiqrsvesfBIvqqFv4wot5gpv4FH1uIEv-noKxQ~tSDqd9f3M~nH4o0tDzD4~~q1tO6b3einm1xbzw__" type="video/mp4" />
      </video>
      
      {/* Voiceover audio */}
      <audio ref={audioRef} loop>
        <source src="/videos/voiceover.mp3" type="audio/mpeg" />
      </audio>

      {/* Audio control button */}
      {showButton && (
        <button
          onClick={toggleAudio}
          className="absolute bottom-8 right-8 z-20 bg-white/90 hover:bg-white p-4 rounded-full shadow-2xl transition-all hover:scale-110"
          aria-label={isPlaying ? 'Mute audio' : 'Play audio'}
        >
          {isPlaying ? (
            <Volume2 className="w-6 h-6 text-slate-900" />
          ) : (
            <VolumeX className="w-6 h-6 text-slate-900" />
          )}
        </button>
      )}
    </div>
  );
}
