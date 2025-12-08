'use client';

import Image from 'next/image';

const mediaItems = [
  {
    type: 'image',
    src: '/images/students-new/student-11.jpg',
    alt: 'Career training students'
  },
  {
    type: 'video',
    src: 'https://cms-artifacts.artlist.io/content/generated-video-v1/video__5/video-a4182256-dd84-450e-8c4d-de7b8b0fb949.mp4?Expires=2080573529&Key-Pair-Id=K2ZDLYDZI2R1DF&Signature=lkxJ9hWZ9M1zjea0hNnwr73vSnncdQu7-dlD1MpCh2xlhtymVr917riHsZRiO3Zk5Vg2iYUG6dwPeFisVcWapA-aM5F3Wd~6W8ApbMx3kxF-cpxTqgO-GxUMmPLlq8BAW1ArQ7R7Ru1KTm~Et5Uf4lCshLB~7QjHZFtVR4pzGSLBcdJG1M~3ge0eBCEaD6d4GlJ5xntHkE9ZDFS-modw2wbgLRaKGd3Fn5Rh2y32NlixNapRD-p13fGIAr2sNxrectg0UxkKczYK3ILjP8uiOZp0cYwaELx8RCsks0PVnPnbzYPonjnN4~rvA5yK5XQ3J~k-r3d-dwEAh4nLO0XV9g__',
    alt: 'Barber training'
  },
  {
    type: 'image',
    src: '/images/students-new/student-1.jpg',
    alt: 'Healthcare training'
  },
  {
    type: 'image',
    src: '/images/students-new/student-5.jpg',
    alt: 'Technical training'
  }
];

export default function HeroSlideshow() {
  return (
    <div className="absolute inset-0 grid grid-cols-2 grid-rows-2">
      {mediaItems.map((item, index) => (
        <div
          key={index}
          className="relative overflow-hidden"
        >
          {item.type === 'video' ? (
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover brightness-90"
            >
              <source src={item.src} type="video/mp4" />
            </video>
          ) : (
            <Image
              src={item.src}
              alt={item.alt}
              fill
              className="object-cover brightness-90"
              priority={index === 0}
              quality={100}
              sizes="50vw"
            />
          )}
        </div>
      ))}
    </div>
  );
}
