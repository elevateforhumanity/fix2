"use client";

interface PlaySoundButtonProps {
  videoId: string;
  audioId: string;
  buttonId: string;
  className?: string;
  children?: React.ReactNode;
}

export function PlaySoundButton({
  videoId,
  audioId,
  buttonId,
  className = "",
  children = "🔊 Play with Sound",
}: PlaySoundButtonProps) {
  const handleClick = () => {
    const video = document.getElementById(videoId) as HTMLVideoElement;
    const audio = document.getElementById(audioId) as HTMLAudioElement;
    const btn = document.getElementById(buttonId);
    
    if (video && audio && btn) {
      video.muted = true;
      audio.currentTime = 0;
      audio.play().then(() => {
        btn.style.display = 'none';
      }).catch(() => {
        // Audio play failed
      });
    }
  };

  return (
    <button
      id={buttonId}
      onClick={handleClick}
      className={className}
    >
      {children}
    </button>
  );
}
