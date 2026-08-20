'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

const slides = [
  {
    image: '/images/efh-barber-hero.jpg',
    alt: 'Barber apprentice cutting hair in a working barbershop',
    eyebrow: 'EARN WHILE YOU LEARN',
    title: 'Get paid while you build your barber skills.',
    body: 'Train in a real barber shop, work beside experienced barbers, build required apprenticeship hours, and gain real client experience while you learn.',
  },
  {
    image: '/images/efh-barber-card.jpg',
    alt: 'Barber apprentice working with a client in the shop',
    eyebrow: 'REAL CLIENT EXPERIENCE',
    title: 'Build confidence behind the chair.',
    body: 'Develop your technique, customer service, speed, professionalism, and confidence in the environment where barbers actually work.',
  },
  {
    image: '/images/hero-new/hero-3.jpg',
    alt: 'Licensed barber mentoring an apprentice during hands-on training',
    eyebrow: 'MENTORSHIP IN THE SHOP',
    title: 'Learn beside working professionals.',
    body: 'Your host shop provides supervised hands-on experience while Elevate supports the apprenticeship structure, related instruction, progress tracking, and documentation.',
  },
  {
    image: '/images/hero-new/hero-4.jpg',
    alt: 'Barber standing at a professional workstation in a barbershop',
    eyebrow: 'BUILD YOUR INCOME',
    title: 'Work, grow your clientele, and earn tips when permitted.',
    body: 'Compensation is based on your employer or host-shop arrangement. As you serve clients under applicable supervision and shop policies, you may also have opportunities to earn tips.',
  },
];

export function BarberExperienceCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, 5500);
    return () => window.clearInterval(id);
  }, []);

  const slide = slides[index];

  return (
    <section className="bg-slate-950 text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-14 lg:grid-cols-[1.15fr_.85fr] lg:items-center lg:py-20">
        <div className="relative min-h-[360px] overflow-hidden rounded-3xl shadow-2xl md:min-h-[520px]">
          {slides.map((item, itemIndex) => (
            <Image
              key={item.image}
              src={item.image}
              alt={item.alt}
              fill
              priority={itemIndex === 0}
              sizes="(max-width: 1024px) 100vw, 60vw"
              className={`object-cover transition-opacity duration-700 ${itemIndex === index ? 'opacity-100' : 'opacity-0'}`}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
          <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between gap-4">
            <div className="flex gap-2">
              {slides.map((item, itemIndex) => (
                <button
                  key={item.image}
                  type="button"
                  onClick={() => setIndex(itemIndex)}
                  aria-label={`Show barber experience ${itemIndex + 1}`}
                  className={`h-2.5 rounded-full transition-all ${itemIndex === index ? 'w-10 bg-white' : 'w-2.5 bg-white/55 hover:bg-white/80'}`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setIndex((index - 1 + slides.length) % slides.length)}
                className="rounded-full bg-black/45 px-4 py-2 text-sm font-semibold backdrop-blur hover:bg-black/65"
                aria-label="Previous image"
              >
                ←
              </button>
              <button
                type="button"
                onClick={() => setIndex((index + 1) % slides.length)}
                className="rounded-full bg-black/45 px-4 py-2 text-sm font-semibold backdrop-blur hover:bg-black/65"
                aria-label="Next image"
              >
                →
              </button>
            </div>
          </div>
        </div>

        <div>
          <p className="text-sm font-black tracking-[0.22em] text-orange-400">{slide.eyebrow}</p>
          <h2 className="mt-4 text-4xl font-black leading-tight md:text-5xl">{slide.title}</h2>
          <p className="mt-5 text-lg leading-8 text-slate-300">{slide.body}</p>
          <div className="mt-8 grid grid-cols-2 gap-3 text-sm font-bold sm:grid-cols-4">
            <div className="rounded-2xl bg-white/10 px-4 py-4">Paid OJT</div>
            <div className="rounded-2xl bg-white/10 px-4 py-4">Real Clients</div>
            <div className="rounded-2xl bg-white/10 px-4 py-4">Mentorship</div>
            <div className="rounded-2xl bg-white/10 px-4 py-4">Tips May Apply</div>
          </div>
        </div>
      </div>
    </section>
  );
}
