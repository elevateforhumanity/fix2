'use client';

export default function FullWidthHeroVideo() {
  return (
    <>
      <video
        autoPlay
        loop
        playsInline
        controls
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/hero-video-with-audio.mp4" type="video/mp4" />
        <track kind="metadata" src="/videos/voiceover.mp3" />
      </video>
      <audio autoPlay loop>
        <source src="/videos/voiceover.mp3" type="audio/mpeg" />
      </audio>
    </>
  );
}
