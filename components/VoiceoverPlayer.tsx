'use client';

import { useEffect, useState, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface VoiceoverPlayerProps {
  text: string;
  autoPlay?: boolean;
}

export default function VoiceoverPlayer({ text, autoPlay = true }: VoiceoverPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (autoPlay && !hasPlayed && text) {
      // Small delay to ensure page is loaded
      const timer = setTimeout(() => {
        playVoiceover();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [text, autoPlay, hasPlayed]);

  const playVoiceover = async () => {
    if (isPlaying) return;
    
    setIsPlaying(true);
    setHasPlayed(true);

    try {
      // Use pre-recorded professional voiceover from repository
      if (audioRef.current) {
        audioRef.current.src = '/videos/voiceover.mp3';
        audioRef.current.muted = isMuted;
        await audioRef.current.play();
      }
    } catch (error) {
      console.error('Error playing voiceover, falling back to browser speech:', error);
      useBrowserSpeech();
    }
  };

  const useBrowserSpeech = () => {
    if (!window.speechSynthesis) {
      console.error('Speech synthesis not supported');
      setIsPlaying(false);
      return;
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1.0;
    utterance.volume = isMuted ? 0 : 1.0;

    // Try to use a professional-sounding voice
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(
      (voice) =>
        voice.name.includes('Samantha') ||
        voice.name.includes('Victoria') ||
        voice.name.includes('Karen') ||
        voice.name.includes('Female') ||
        voice.lang.startsWith('en-US')
    );
    
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.onend = () => {
      setIsPlaying(false);
    };

    utterance.onerror = () => {
      setIsPlaying(false);
    };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const stopVoiceover = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    window.speechSynthesis.cancel();
    setIsPlaying(false);
  };

  const toggleMute = () => {
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    
    if (audioRef.current) {
      audioRef.current.muted = newMutedState;
    }
    
    if (utteranceRef.current && window.speechSynthesis.speaking) {
      utteranceRef.current.volume = newMutedState ? 0 : 1.0;
    }
  };

  return (
    <>
      {/* Control Button - Fixed position */}
      <div className="fixed bottom-6 right-6 z-50 flex gap-2">
        {isPlaying && (
          <button
            onClick={toggleMute}
            className="p-3 bg-white text-slate-900 rounded-full shadow-lg hover:bg-slate-100 transition-all border-2 border-slate-200"
            title={isMuted ? "Unmute voiceover" : "Mute voiceover"}
            aria-label={isMuted ? "Unmute voiceover" : "Mute voiceover"}
          >
            {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
          </button>
        )}
        
        {!isPlaying && hasPlayed && (
          <button
            onClick={playVoiceover}
            className="p-3 bg-orange-500 text-white rounded-full shadow-lg hover:bg-orange-600 transition-all"
            title="Replay voiceover"
            aria-label="Replay voiceover"
          >
            <Volume2 size={24} />
          </button>
        )}
        
        {isPlaying && (
          <button
            onClick={stopVoiceover}
            className="p-3 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 transition-all"
            title="Stop voiceover"
            aria-label="Stop voiceover"
          >
            <VolumeX size={24} />
          </button>
        )}
      </div>

      {/* Hidden audio element for professional TTS */}
      <audio
        ref={audioRef}
        onEnded={() => setIsPlaying(false)}
        onError={() => {
          console.error('Audio playback error, falling back to browser speech');
          useBrowserSpeech();
        }}
        className="hidden"
      />
    </>
  );
}
