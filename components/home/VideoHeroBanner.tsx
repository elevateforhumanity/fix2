'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react';

interface VideoHeroBannerProps {
  videoSrc?: string;
  withAudio?: boolean;
}

export default function VideoHeroBanner({
  videoSrc = '/videos/hero-home.mp4',
  withAudio = false,
}: VideoHeroBannerProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(!withAudio);
  const [showControls, setShowControls] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Auto-play video when component mounts
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Auto-play failed, user interaction required
        setIsPlaying(false);
      });
    }
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
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
      className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      {/* Video Background */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        loop
        muted={isMuted}
        playsInline
        poster="/images/heroes/hero-homepage.jpg"
      >
        <source src={videoSrc} type="video/mp4" />
        {/* Fallback for browsers that don't support video */}
        Your browser does not support the video tag.
      </video>

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />

      {/* Content Overlay */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight">
              Elevate For Humanity
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/90 mb-6 sm:mb-8">
              Empowering Futures Through Innovation & Opportunity
            </p>
            <p className="text-base sm:text-lg md:text-xl text-white/80 mb-8 sm:mb-10 max-w-2xl">
              Free career training in healthcare, skilled trades, and business.
              Get trained, get hired, get paid. No cost, no debt.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/apply"
                className="inline-flex items-center justify-center px-8 py-4 bg-orange-600 text-white text-lg font-bold rounded-lg hover:bg-orange-700 transition-colors shadow-lg hover:shadow-xl"
              >
                Apply Now
              </Link>
              <Link
                href="/programs"
                className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white text-lg font-bold rounded-lg hover:bg-white/20 transition-colors border-2 border-white/30"
              >
                View Programs
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Video Controls */}
      <div
        className={`absolute bottom-6 right-6 flex items-center gap-3 transition-opacity duration-300 ${
          showControls ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <button
          onClick={togglePlay}
          className="p-3 bg-black/50 backdrop-blur-sm text-white rounded-full hover:bg-black/70 transition-colors"
          aria-label={isPlaying ? 'Pause video' : 'Play video'}
        >
          {isPlaying ? (
            <Pause className="w-5 h-5" />
          ) : (
            <Play className="w-5 h-5" />
          )}
        </button>

        <button
          onClick={toggleMute}
          className="p-3 bg-black/50 backdrop-blur-sm text-white rounded-full hover:bg-black/70 transition-colors"
          aria-label={isMuted ? 'Unmute video' : 'Mute video'}
        >
          {isMuted ? (
            <VolumeX className="w-5 h-5" />
          ) : (
            <Volume2 className="w-5 h-5" />
          )}
        </button>

        <button
          onClick={toggleFullscreen}
          className="p-3 bg-black/50 backdrop-blur-sm text-white rounded-full hover:bg-black/70 transition-colors"
          aria-label="Fullscreen"
        >
          <Maximize className="w-5 h-5" />
        </button>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-white/50 rounded-full" />
        </div>
      </div>
    </section>
  );
}
