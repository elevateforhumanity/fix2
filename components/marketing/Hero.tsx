import Link from 'next/link';
import Image from 'next/image';
import { Award } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative w-full -mt-[72px]">
      <div className="relative min-h-[100vh] sm:min-h-[70vh] md:min-h-[75vh] w-full overflow-hidden bg-gray-900">
        {/* Fallback image for when video doesn't load */}
        <Image
          src="/images/heroes/hero-homepage.jpg"
          alt="Elevate for Humanity"
          fill
          className="absolute inset-0 object-cover"
          priority
        />

        {/* Video overlay */}
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover z-10"
        >
          <source src="/videos/homepage-hero-new.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </section>
  );
}
