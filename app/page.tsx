'use client';

import React from 'react';
import Link from 'next/link';
import { WelcomeAudio } from '@/components/WelcomeAudio';

export const dynamic = 'force-dynamic';

export default function HomePage() {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [isVisible, setIsVisible] = React.useState<Record<string, boolean>>({});

  React.useEffect(() => {
    const playVideo = async () => {
      if (videoRef.current) {
        try {
          // Try to play with sound first
          videoRef.current.muted = false;
          videoRef.current.volume = 0.7; // 70% volume
          await videoRef.current.play();
        } catch (error) {
          // If blocked, play muted
          try {
            videoRef.current.muted = true;
            await videoRef.current.play();
          } catch (e) {
            console.log('Video autoplay blocked');
          }
        }
      }
    };
    playVideo();
  }, []);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({
              ...prev,
              [entry.target.id]: true,
            }));
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );

    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const programs = [
    {
      title: 'Barber Apprenticeship',
      description:
        'Get paid while you learn. Work in a real barbershop from day one.',
      video:
        'https://cms-artifacts.artlist.io/content/generated-video-v1/video__5/generated-video-570a7e55-792e-4ad3-bbd1-72ca89a61f2d.mp4?Expires=2081095426&Key-Pair-Id=K2ZDLYDZI2R1DF&Signature=O83IqG0r8dbMOyLHw8LVHa18JGjLwgnKmLPKL3me1H50K-ggwPoUB2KDX-7hUegt8jWpsQwNwnPd11xBUC-r05B~WCUUnUAf7dg~jN5f-o8IrS~ZfFJUitB6k35pOdipzeinpXe1wGieq-27GNJZgVHiAQRrGYGduuZ7iKmu93ujZNJSx-DEhiP255esVtvIiSCVYsR-t32~QyGosAMO7I17xeUs5LiMEjqDHljuq2L1letGmD4q2CosqToNFSFcPuvd4owNBMj9VQcaLb0AJ6mDgpuuDuCAfRWTznw4vp6fkUYxCXa3~kulDSi58QbwpOww3NXM0b6NaYcO~zu1EQ__',
      href: '/programs/barber-apprenticeship',
      duration: '12-18 months',
    },
    {
      title: 'CNA Healthcare',
      description:
        'Start your healthcare career in weeks. High demand, stable income.',
      video:
        'https://cms-artifacts.artlist.io/content/generated-video-v1/video__8/generated-video-2a104343-e6a7-4bd8-88c8-367de1f111b5.mp4?Expires=2081095426&Key-Pair-Id=K2ZDLYDZI2R1DF&Signature=jLomOFu1gmLeArJIwD6os67ks1evH1p5TcFkDz-YJNodYobGuYPJriIwkeuEoLTnYoPRk5mt55rqPqvvZzkCED3b1hQbPyWrw~GCuDQ~y~zMkAjWDCb2zWSSLnoyAJrvfGCO45S5tYvhkYZvVjWk3nft8vNHVKeJIF2Odv4JJSRH4MzO8EPZbaRXTaIDqj0eX0DCA8EpfcGRQTuqGERMuUnOGS50vQKYhYNsWEsFlfpVtYqYf3wtS6aaOGsfwFOtBpVBHZqfFfFTix8QMB3lxMQ5f9SG6nnjXHCCDkT6ZZfVSEBWm9K7IChIkr0vPrrr6kaOcRw~B~3sVAjFBwjBSw__',
      href: '/programs/cna',
      duration: '4-6 weeks',
    },
    {
      title: 'HVAC Technician',
      description:
        'Learn heating and cooling systems. Essential trade with great pay.',
      video:
        'https://cms-artifacts.artlist.io/content/generated-video-v1/video__5/generated-video-dc9558de-f94b-43f1-8e4a-5f45d019895f.mp4?Expires=2081095426&Key-Pair-Id=K2ZDLYDZI2R1DF&Signature=p24tUX9stSgPWZKXrqx61Sgq6TOIIlZuwwU6232SsQcohIS-1JZXY3pk2OM8UgQRG7b06Xlr33hvipNaVz8l0qOarpOTLp7cmhAXPQAi3wtrutc3Y1kF95oP6ZM3paP8rDwuuB9iuH~LYdUbNK7Vo2Q3JzCazSVESwT8xTRzLTUBYBGyeRpSPPpHE1381y7a1wyGly35~cPxzNSg~1NBLKIX-08GAbheYi15rsht-U71b9YMc84K75yP0voTGrJoOrFA8P4oj8xMsHvKTv8bU6k5FZ9lgHxCPOv~weDq63sSxs0nHsKiKhbggmc0yHKSJ7vyrtDNWY3H2wiwfZX0ZA__',
      href: '/programs/hvac-technician',
      duration: '6-12 months',
    },
  ];

  return (
    <main className="bg-white overflow-x-hidden">
      <WelcomeAudio />

      {/* Hero Video */}
      <section className="relative w-full overflow-hidden bg-slate-900">
        <div className="relative w-full h-[500px] md:h-[600px] lg:h-[700px]">
          <video
            ref={videoRef}
            autoPlay
            loop
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source
              src="https://cms-artifacts.artlist.io/content/generated-video-v1/video__9/video-5599b9e1-fe1f-4f31-a821-c5d9b2af60e8.mp4?Expires=2081095427&Key-Pair-Id=K2ZDLYDZI2R1DF&Signature=XYAKfQTQtm1t~crb-eqoYGjNhW6OtDpmLV7aDSdfl-AY7Gmj5UcTwnRjGI8y~MBeFgfANbDXBLzgDgIiy9lIYq~qIafTofg9J5-dLlnPq0h0DC5cwxYMwcY9cOzLoumtClzCcEf6U4opibbDuxE6y7a3wZGl7mFlXMwcd7JHnJLuuq0Uw6mfFG4ROuJgqfnA7A97b2IM5nhw-AD-Nj6TsVbUdFhEaQETHHvWC~GucSzE8sUUQCbBpeFnH3SY8jJWAjXlM-E3cayy-unqJrw4EMP7kkAFLnR6xyD9mwHkXQjPnf2QlM574Fxhj7zNOsT9Q-ZNGN2kKGCII6Vui2lNug__"
              type="video/mp4"
            />
          </video>
        </div>
      </section>

      {/* Hero Content */}
      <section className="bg-white py-12">
        <div
          id="hero-content"
          data-animate
          className={`max-w-5xl mx-auto px-4 text-center transition-all duration-1000 ${
            isVisible['hero-content']
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-10'
          }`}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
            It's Not Graduation, It's Elevation
          </h1>
          <p className="text-lg md:text-base md:text-lg text-slate-700 mb-8 max-w-3xl mx-auto">
            Free Career Training • Real Jobs • No Debt
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/programs"
              className="inline-flex items-center justify-center bg-orange-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-orange-700 hover:scale-105 transition-all shadow-lg"
            >
              Explore Programs
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-slate-900 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-slate-800 hover:scale-105 transition-all shadow-lg"
            >
              Get Started Today
            </Link>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-12 bg-slate-50">
        <div
          id="mission-story"
          data-animate
          className={`max-w-4xl mx-auto px-4 text-center transition-all duration-1000 delay-200 ${
            isVisible['mission-story']
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-2xl md:text-2xl md:text-3xl font-bold text-slate-900 mb-6">
            Real Careers. Real Fast. From Home.
          </h2>
          <p className="text-base md:text-lg text-slate-700 leading-relaxed mb-6">
            Short-term career training programs you can complete from home, in
            weeks or months, not years. Designed for real people with real
            lives—parents, workers, people starting over.
          </p>
          <p className="text-base text-slate-600">
            <span className="font-bold text-slate-900">
              Free training for those who qualify.
            </span>{' '}
            Through WIOA, WRG, JRI, and registered apprenticeships, most
            students pay nothing. No student loans. No debt. Just real training
            and a clear path to employment.
          </p>
        </div>
      </section>

      {/* Featured Programs */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div
            id="programs-header"
            data-animate
            className={`text-center mb-12 transition-all duration-1000 ${
              isVisible['programs-header']
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-2xl md:text-2xl md:text-3xl font-bold text-slate-900 mb-4">
              Featured Programs
            </h2>
            <p className="text-base md:text-lg text-slate-600 max-w-3xl mx-auto">
              Train online at your pace, practice hands-on, and step into a
              career that's waiting for you.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {programs.map((program, index) => (
              <Link
                key={program.href}
                href={program.href}
                id={`program-card-${index + 1}`}
                data-animate
                className={`group block transition-all duration-700 ${
                  isVisible[`program-card-${index + 1}`]
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-20'
                }`}
                style={{ transitionDelay: `${(index + 1) * 200}ms` }}
              >
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
                  <div className="relative h-64 overflow-hidden bg-slate-100">
                    <video
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    >
                      <source src={program.video} type="video/mp4" />
                    </video>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-orange-600 transition">
                        {program.title}
                      </h3>
                      <span className="text-sm text-slate-500">
                        {program.duration}
                      </span>
                    </div>
                    <p className="text-slate-700 mb-4">{program.description}</p>
                    <div className="inline-flex items-center gap-2 text-orange-600 font-semibold group-hover:gap-3 transition-all">
                      Learn More
                      <span className="group-hover:translate-x-1 transition-transform">
                        →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/programs"
              className="inline-flex items-center justify-center bg-slate-900 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-slate-800 hover:scale-105 transition-all shadow-lg"
            >
              View All 30+ Programs
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
