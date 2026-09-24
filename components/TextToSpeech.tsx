"use client";

import React, { useRef, useState } from 'react';

interface TextToSpeechProps {
  text: string;
  autoPlay?: boolean;
  className?: string;
}

export default function TextToSpeech({ text, className = '' }: TextToSpeechProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const urlRef = useRef<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [loading, setLoading] = useState(false);

  const cleanupUrl = () => {
    if (urlRef.current) URL.revokeObjectURL(urlRef.current);
    urlRef.current = null;
  };

  const handlePlay = async () => {
    if (!text) return;
    if (isPaused && audioRef.current) {
      await audioRef.current.play();
      setIsPaused(false);
      return;
    }
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    cleanupUrl();
    setLoading(true);
    try {
      const response = await fetch('/api/text-to-speech', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
      if (!response.ok) throw new Error('Narration unavailable');
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      urlRef.current = url;
      const audio = new Audio(url);
      audioRef.current = audio;
      audio.onplay = () => { setIsPlaying(true); setIsPaused(false); };
      audio.onended = () => { setIsPlaying(false); setIsPaused(false); cleanupUrl(); };
      audio.onerror = () => { setIsPlaying(false); setIsPaused(false); cleanupUrl(); };
      await audio.play();
    } finally {
      setLoading(false);
    }
  };

  const handlePause = () => {
    audioRef.current?.pause();
    setIsPaused(true);
    setIsPlaying(false);
  };

  const handleStop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
    setIsPaused(false);
    cleanupUrl();
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {!isPlaying && (
        <button onClick={handlePlay} disabled={loading} className="btn btn-primary">
          {loading ? 'Loading audio…' : isPaused ? 'Resume' : 'Listen'}
        </button>
      )}
      {isPlaying && <button onClick={handlePause} className="btn btn-secondary">Pause</button>}
      {(isPlaying || isPaused) && <button onClick={handleStop} className="btn btn-outline">Stop</button>}
    </div>
  );
}
