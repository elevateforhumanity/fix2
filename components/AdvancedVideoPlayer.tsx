'use client';

import { useState, useRef, useEffect } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Settings,
  SkipForward,
  SkipBack,
  Subtitles,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface Chapter {
  time: number;
  title: string;
}

interface Subtitle {
  start: number;
  end: number;
  text: string;
}

interface AdvancedVideoPlayerProps {
  src: string;
  title: string;
  chapters?: Chapter[];
  subtitles?: Subtitle[];
  onProgress?: (progress: number) => void;
  onComplete?: () => void;
}

export function AdvancedVideoPlayer({
  src,
  title,
  chapters = [],
  subtitles = [],
  onProgress,
  onComplete,
}: AdvancedVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showSubtitles, setShowSubtitles] = useState(true);
  const [currentSubtitle, setCurrentSubtitle] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [volume, setVolume] = useState(1);

  const playbackRates = [0.5, 0.75, 1, 1.25, 1.5, 2];

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

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
  };

  const handlePlaybackRateChange = (rate: number) => {
    setPlaybackRate(rate);
    if (videoRef.current) {
      videoRef.current.playbackRate = rate;
    }
    setShowSettings(false);
  };

  const skipForward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime += 10;
    }
  };

  const skipBackward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime -= 10;
    }
  };

  const jumpToChapter = (time: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = time;
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const total = videoRef.current.duration;
      const progressPercent = (current / total) * 100;

      setCurrentTime(current);
      setProgress(progressPercent);
      onProgress?.(progressPercent);

      // Update subtitles
      if (showSubtitles && subtitles.length > 0) {
        const subtitle = subtitles.find(
          (s) => current >= s.start && current <= s.end
        );
        setCurrentSubtitle(subtitle?.text || '');
      }

      if (progressPercent >= 95 && onComplete) {
        onComplete();
      }
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
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
    <div className="relative bg-black rounded-lg overflow-hidden">
      <video
        ref={videoRef}
        src={src}
        className="w-full"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => onComplete?.()}
      />

      {/* Subtitles */}
      {showSubtitles && currentSubtitle && (
        <div className="absolute bottom-20 left-0 right-0 text-center">
          <div className="inline-block bg-black/80 text-white px-4 py-2 rounded text-lg">
            {currentSubtitle}
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4">
        {/* Progress Bar */}
        <div className="mb-4">
          <div className="h-1 bg-gray-600 rounded-full overflow-hidden cursor-pointer">
            <div
              className="h-full bg-red-600 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          {/* Chapter Markers */}
          {chapters.map((chapter, index) => (
            <div
              key={index}
              className="absolute h-3 w-1 bg-white rounded-full cursor-pointer hover:bg-red-500"
              style={{
                left: `${(chapter.time / duration) * 100}%`,
                top: '-4px',
              }}
              onClick={() => jumpToChapter(chapter.time)}
              title={chapter.title}
            />
          ))}
        </div>

        <div className="flex items-center gap-4">
          {/* Play/Pause */}
          <button
            onClick={togglePlay}
            className="text-white hover:text-red-500 transition"
          >
            {isPlaying ? <Pause size={24} /> : <Play size={24} />}
          </button>

          {/* Skip Backward */}
          <button
            onClick={skipBackward}
            className="text-white hover:text-red-500 transition"
          >
            <SkipBack size={20} />
          </button>

          {/* Skip Forward */}
          <button
            onClick={skipForward}
            className="text-white hover:text-red-500 transition"
          >
            <SkipForward size={20} />
          </button>

          {/* Volume */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleMute}
              className="text-white hover:text-red-500 transition"
            >
              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={handleVolumeChange}
              className="w-20"
            />
          </div>

          {/* Time */}
          <span className="text-white text-sm">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>

          <div className="flex-1" />

          {/* Subtitles Toggle */}
          <button
            onClick={() => setShowSubtitles(!showSubtitles)}
            className={`text-white hover:text-red-500 transition ${showSubtitles ? 'text-red-500' : ''}`}
          >
            <Subtitles size={20} />
          </button>

          {/* Settings */}
          <div className="relative">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="text-white hover:text-red-500 transition"
            >
              <Settings size={20} />
            </button>

            {showSettings && (
              <div className="absolute bottom-full right-0 mb-2 bg-gray-900 rounded-lg p-2 min-w-[150px]">
                <div className="text-white text-sm font-semibold mb-2">
                  Playback Speed
                </div>
                {playbackRates.map((rate) => (
                  <button
                    key={rate}
                    onClick={() => handlePlaybackRateChange(rate)}
                    className={`w-full text-left px-3 py-2 text-sm rounded hover:bg-gray-800 ${
                      playbackRate === rate ? 'text-red-500' : 'text-white'
                    }`}
                  >
                    {rate}x
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Fullscreen */}
          <button
            onClick={toggleFullscreen}
            className="text-white hover:text-red-500 transition"
          >
            <Maximize size={20} />
          </button>
        </div>
      </div>

      {/* Chapters Sidebar */}
      {chapters.length > 0 && (
        <div className="absolute right-0 top-0 bottom-0 w-64 bg-black/90 p-4 overflow-y-auto">
          <h3 className="text-white font-semibold mb-4">Chapters</h3>
          <div className="space-y-2">
            {chapters.map((chapter, index) => (
              <button
                key={index}
                onClick={() => jumpToChapter(chapter.time)}
                className="w-full text-left p-2 rounded hover:bg-gray-800 transition"
              >
                <div className="text-white text-sm">{chapter.title}</div>
                <div className="text-gray-400 text-xs">
                  {formatTime(chapter.time)}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
