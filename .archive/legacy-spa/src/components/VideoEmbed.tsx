/**
 * VideoEmbed Component
 * Supports YouTube, Vimeo, and direct video URLs
 * Responsive and accessible
 */

import React from 'react';

interface VideoEmbedProps {
  url: string;
  title: string;
  autoplay?: boolean;
  controls?: boolean;
}

export default function VideoEmbed({
  url,
  title,
  autoplay = false,
  controls = true,
}: VideoEmbedProps) {
  // Parse video URL to determine platform and extract ID
  const getEmbedUrl = (videoUrl: string): string => {
    // YouTube
    if (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be')) {
      const videoId = videoUrl.includes('youtu.be')
        ? videoUrl.split('youtu.be/')[1]?.split('?')[0]
        : new URLSearchParams(new URL(videoUrl).search).get('v');

      const params = new URLSearchParams({
        autoplay: autoplay ? '1' : '0',
        controls: controls ? '1' : '0',
        rel: '0',
        modestbranding: '1',
      });

      return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
    }

    // Vimeo
    if (videoUrl.includes('vimeo.com')) {
      const videoId = videoUrl.split('vimeo.com/')[1]?.split('?')[0];
      const params = new URLSearchParams({
        autoplay: autoplay ? '1' : '0',
        title: '0',
        byline: '0',
        portrait: '0',
      });

      return `https://player.vimeo.com/video/${videoId}?${params.toString()}`;
    }

    // Already an embed URL or direct video
    return videoUrl;
  };

  const embedUrl = getEmbedUrl(url);
  const isDirectVideo =
    url.endsWith('.mp4') || url.endsWith('.webm') || url.endsWith('.ogg');

  if (isDirectVideo) {
    return (
      <div className="relative w-full rounded-lg overflow-hidden shadow-lg bg-black">
        <video
          className="w-full h-full"
          controls={controls}
          autoPlay={autoplay}
          playsInline
          preload="metadata"
        >
          <source src={url} type={`video/${url.split('.').pop()}`} />
          <p className="text-white p-4">
            Your browser doesn't support HTML5 video. Here is a{' '}
            <a href={url} className="underline">
              link to the video
            </a>{' '}
            instead.
          </p>
        </video>
      </div>
    );
  }

  return (
    <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
      <iframe
        className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
        src={embedUrl}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        loading="lazy"
      />
    </div>
  );
}
