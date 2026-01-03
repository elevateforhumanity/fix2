'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react';

interface VideoHeroBannerProps {
  videoSrc?: string;
  withAudio?: boolean;
  voiceoverSrc?: string;
}

export default function VideoHeroBanner({
  videoSrc = 'https://cms-artifacts.artlist.io/content/generated-video-v1/video__9/video-5599b9e1-fe1f-4f31-a821-c5d9b2af60e8.mp4?Expires=2082667268&Key-Pair-Id=K2ZDLYDZI2R1DF&Signature=SgaKIZgPcRuDhT0UyP-QqK5LBBEybeAAgC9mLwNU5hh81dPz55Koufjp723VwPXjc9r1vPDEmPS9Q6RHGHR7iqUcHAjGB55fkxWlB39EHcIbkfAaWrnq4p3BalAdAUwDkiFTEOIWfTjp3zYl-K3-bsH1FpdjbNZSNdJXMPVEn01BXyXjrRbbWIh70bEwCWaVVcrFu2T3dzn4XMdJtviDk6yOUUn3dexJscKNsCcebc87AfYwKvPqrm6dbeKAv-5ZmVzEnb~irCGt4e1jq2rLorD3M23DegbE4VLVsnXTMVNQTCszXArFMyiIaKx7IoRey3k5umlahzdCadDbqM-aSA__',
  withAudio = false,
  voiceoverSrc,
}: VideoHeroBannerProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(!withAudio);
  const [showControls, setShowControls] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Set loaded state when video can play
    const handleCanPlay = () => {
      setIsLoaded(true);
      video.play().catch(() => {
        setIsPlaying(false);
      });
    };

    const handleError = () => {
      console.error('Video failed to load:', videoSrc);
      setHasError(true);
      setIsLoaded(true); // Show fallback
    };

    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('error', handleError);

    // Auto-play voiceover if provided (unmuted)
    if (audioRef.current && voiceoverSrc) {
      audioRef.current.muted = false;
      audioRef.current.volume = 1.0;
      audioRef.current.play().catch(() => {
        console.log('Voiceover autoplay blocked, waiting for user interaction');
      });
    }

    return () => {
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('error', handleError);
    };
  }, [voiceoverSrc]);

  // Ensure audio plays on any user interaction
  const handleUserInteraction = () => {
    if (audioRef.current && voiceoverSrc && audioRef.current.paused) {
      audioRef.current.play().catch(console.error);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        if (audioRef.current) {
          audioRef.current.pause();
        }
      } else {
        videoRef.current.play();
        if (audioRef.current) {
          audioRef.current.play();
        }
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        videoRef.current.requestFullscreen();
      }
    }
  };

  return (
    <section
      className="relative w-full bg-gradient-to-br from-blue-900 to-purple-900"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
      onClick={handleUserInteraction}
    >
      {/* Video Container - Mobile First */}
      <div className="relative w-full min-h-[400px] md:min-h-[500px] lg:min-h-[600px]">
        {/* Video Background - Shows when loaded */}
        {isLoaded && (
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover z-0"
            loop
            muted={isMuted}
            playsInline
            preload="auto"
            autoPlay
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        )}

        {/* Text Content - Always Visible on Top */}
        <div className="absolute inset-0 flex items-center justify-center text-white p-6 text-center z-10">
          <div className="max-w-4xl">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 drop-shadow-lg">
              Elevate for Humanity
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl drop-shadow-lg">
              Free, Funded Workforce Training
            </p>
          </div>
        </div>

        {/* Loading indicator */}
        {!isLoaded && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20">
            <div className="w-8 h-8 border-4 border-white/20 border-t-white rounded-full animate-spin" />
          </div>
        )}

        {/* Voiceover Audio (plays independently of video mute) */}
        {voiceoverSrc && (
          <audio ref={audioRef} loop muted={false}>
            <source src={voiceoverSrc} type="audio/mpeg" />
          </audio>
        )}

        {/* Video Controls - Only show when video loaded */}
        {isLoaded && (
          <div
            className={`absolute bottom-4 right-4 flex items-center gap-2 transition-opacity duration-300 ${
              showControls ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <button
              onClick={togglePlay}
              className="p-2 bg-black/70 backdrop-blur-sm text-white rounded-full hover:bg-black/90 transition-colors"
              aria-label={isPlaying ? 'Pause video' : 'Play video'}
            >
              {isPlaying ? (
                <Pause className="w-4 h-4" />
              ) : (
                <Play className="w-4 h-4" />
              )}
            </button>

            <button
              onClick={toggleMute}
              className="p-2 bg-black/70 backdrop-blur-sm text-white rounded-full hover:bg-black/90 transition-colors"
              aria-label={isMuted ? 'Unmute video' : 'Mute video'}
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </button>

            <button
              onClick={toggleFullscreen}
              className="p-2 bg-black/70 backdrop-blur-sm text-white rounded-full hover:bg-black/90 transition-colors"
              aria-label="Fullscreen"
            >
              <Maximize className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
