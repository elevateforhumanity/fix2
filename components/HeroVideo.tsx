'use client';

export function HeroVideo() {
  return (
    <video
      muted
      loop
      playsInline
      preload="none"
      poster="/images/hero-poster.jpg"
      className="absolute inset-0 w-full h-full object-cover"
      style={{ 
        objectFit: 'cover',
        width: '100%',
        height: '100%'
      }}
      onLoadedMetadata={(e) => {
        // Au only after video is ready
        const video = e.currentTarget;
        video.play().catch(() => {});
      }}
    >
      <source src="/videos/barber-hero.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
}
