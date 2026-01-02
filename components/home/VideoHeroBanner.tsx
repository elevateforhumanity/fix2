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
  videoSrc = '/videos/hero-home.mp4',
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
      className="relative w-full bg-gray-900"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
      onClick={handleUserInteraction}
    >
      {/* Full-width Video Container */}
      <div className="relative w-full">
        <div className="relative overflow-hidden">
          {/* Video */}
          <div className="relative w-full" style={{ paddingBottom: '75%' }}>
            {/* Loading indicator */}
            {!isLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin" />
              </div>
            )}
            
            {/* Video - optimized MP4 */}
            <video
              ref={videoRef}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                isLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              loop
              muted={isMuted}
              playsInline
              preload="metadata"
            >
              <source src={videoSrc} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          {/* Voiceover Audio (plays independently of video mute) */}
          {voiceoverSrc && (
            <audio ref={audioRef} loop muted={false}>
              <source src={voiceoverSrc} type="audio/mpeg" />
            </audio>
          )}

          {/* Video Controls */}
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
        </div>
      </div>
    </section>
  );
}
