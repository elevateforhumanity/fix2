'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useRef } from 'react';
import {
  Volume2,
  VolumeX,
  GraduationCap,
  Briefcase,
  Building2,
  CheckCircle,
  ArrowRight,
  Users,
  DollarSign,
  Award,
} from 'lucide-react';
import {
  Container,
  Section,
  Button,
  Card,
} from '@/components/ui/design-system';

export default function HomePage() {
  const [isMuted, setIsMuted] = useState(true);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <main className="bg-white">
      {/* VIDEO HERO - Above the Fold */}
      <section className="relative overflow-hidden">
        {!videoError ? (
          <>
            <video
              ref={videoRef}
              autoPlay
              loop
              playsInline
              preload="auto"
              muted={isMuted}
              className="w-full h-auto"
              style={{
                display: 'block',
                maxHeight: '600px',
                objectFit: 'cover',
              }}
              onError={() => setVideoError(true)}
              poster="/images/video-poster.jpg"
            >
              <source src="/videos/hero-home.mp4" type="video/mp4" />
            </video>

            {/* Unmute Button */}
            <button
              onClick={toggleMute}
              className="absolute bottom-4 right-4 bg-black/70 hover:bg-black/90 text-white p-3 rounded-full transition z-10"
              aria-label={isMuted ? 'Unmute video' : 'Mute video'}
            >
              {isMuted ? (
                <VolumeX className="w-6 h-6" />
              ) : (
                <Volume2 className="w-6 h-6" />
              )}
            </button>
          </>
        ) : (
          // Fallback if video fails
          <div className="relative h-[600px]">
            <Image
              src="/images/video-poster.jpg"
              alt="Elevate for Humanity"
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Hero Content Overlay */}
        <div className="absolute inset-0 bg-black/40 flex items-center">
          <Container size="lg">
            <div className="max-w-2xl text-white">
              <h1 className="text-display-md lg:text-display-lg mb-4">
                Free Job Training.
                <br />
                Real Careers. No Debt.
              </h1>
              <p className="text-body-lg md:text-h4 mb-6">
                We connect people to careers through training, funding, and
                employer partnerships across Indiana.
              </p>
              <div className="flex flex-wrap gap-4 mb-6">
                <Button
                  href="/apply"
                  size="lg"
                  className="bg-orange-600 hover:bg-orange-700"
                >
                  Apply Now
                </Button>
                <Button href="/programs" variant="secondary" size="lg">
                  Explore Programs
                </Button>
              </div>
            </div>
          </Container>
        </div>
      </section>

      {/* ARTISTIC HERO IMAGE - Inspiring Visual */}
      <section className="relative h-[500px] overflow-hidden">
        <Image
          src="/images/heroes/about-mission.jpg"
          alt="Empowering communities through education"
          fill
          className="object-cover"
          priority
          quality={95}
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-end">
          <Container size="lg" className="pb-16">
            <div className="max-w-3xl">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Transforming Lives Through Education
              </h2>
              <p className="text-xl text-white/90 leading-relaxed">
                Every student deserves access to quality training and real
                career opportunities. We're breaking down barriers and building
                pathways to success.
              </p>
            </div>
          </Container>
        </div>
      </section>

      {/* WHO WE SERVE - Intelligent Routing (Looks Like Website) */}
      <Section variant="slate">
        <h2 className="text-h1 text-center text-slate-900 mb-4">
          Who We Serve
        </h2>
        <p className="text-body-lg text-center text-slate-600 mb-16 max-w-3xl mx-auto">
          Choose your path to see how we can help you succeed
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {/* For Students */}
          <Link
            href="/for-students"
            className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
          >
            <div className="relative h-64">
              <Image
                src="/images/students-hero.jpg"
                alt="Students learning"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-blue-900/70" />
              <div className="absolute bottom-6 left-6 right-6">
                <GraduationCap className="h-12 w-12 text-white mb-3" />
                <h3 className="text-2xl font-bold text-white mb-2">
                  For Students
                </h3>
              </div>
            </div>
            <div className="p-8">
              <p className="text-slate-700 mb-6 text-lg leading-relaxed">
                Get trained for free. Earn industry credentials. Start your
                career in healthcare, skilled trades, or technology.
              </p>
              <div className="flex items-center gap-2 text-blue-600 font-semibold group-hover:gap-3 transition-all">
                <span>Learn More</span>
                <ArrowRight className="h-5 w-5" />
              </div>
            </div>
          </Link>

          {/* For Employers */}
          <Link
            href="/for-employers"
            className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
          >
            <div className="relative h-64">
              <Image
                src="/images/employers-hero.jpg"
                alt="Employers hiring"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-purple-900/70" />
              <div className="absolute bottom-6 left-6 right-6">
                <Briefcase className="h-12 w-12 text-white mb-3" />
                <h3 className="text-2xl font-bold text-white mb-2">
                  For Employers
                </h3>
              </div>
            </div>
            <div className="p-8">
              <p className="text-slate-700 mb-6 text-lg leading-relaxed">
                Hire trained workers. Build apprenticeship programs. No
                recruiting fees. Access job-ready candidates.
              </p>
              <div className="flex items-center gap-2 text-purple-600 font-semibold group-hover:gap-3 transition-all">
                <span>Learn More</span>
                <ArrowRight className="h-5 w-5" />
              </div>
            </div>
          </Link>

          {/* For Agencies */}
          <Link
            href="/for-agencies"
            className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
          >
            <div className="relative h-64">
              <Image
                src="/images/agencies-hero.jpg"
                alt="Agencies and partners"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-green-900/70" />
              <div className="absolute bottom-6 left-6 right-6">
                <Building2 className="h-12 w-12 text-white mb-3" />
                <h3 className="text-2xl font-bold text-white mb-2">
                  For Agencies
                </h3>
              </div>
            </div>
            <div className="p-8">
              <p className="text-slate-700 mb-6 text-lg leading-relaxed">
                License our platform. Track compliance. Monitor outcomes.
                Government-aligned workforce infrastructure.
              </p>
              <div className="flex items-center gap-2 text-green-600 font-semibold group-hover:gap-3 transition-all">
                <span>Learn More</span>
                <ArrowRight className="h-5 w-5" />
              </div>
            </div>
          </Link>
        </div>
      </Section>

      {/* FEATURED PROGRAMS */}
      <Section variant="white">
        <h2 className="text-h1 text-center text-slate-900 mb-4">
          Featured Programs
        </h2>
        <p className="text-body-lg text-center text-slate-600 mb-16">
          All programs are $0 tuition for eligible participants
        </p>

        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {[
            {
              name: 'Barber Apprenticeship',
              salary: '$45,000/year',
              duration: '15-17 months',
              slug: 'barber-apprenticeship',
              image: '/images/programs/barber.jpg',
            },
            {
              name: 'HVAC Technician',
              salary: '$52,000/year',
              duration: '6-12 months',
              slug: 'hvac-technician',
              image: '/images/programs/hvac.jpg',
            },
            {
              name: 'CNA Healthcare',
              salary: '$37,000/year',
              duration: '4-6 weeks',
              slug: 'cna-certified-nursing-assistant',
              image: '/images/programs/cna.jpg',
            },
            {
              name: 'CDL Truck Driver',
              salary: '$60,000/year',
              duration: '3-4 weeks',
              slug: 'cdl-commercial-drivers-license',
              image: '/images/programs/cdl.jpg',
            },
          ].map((program) => (
            <Link
              key={program.slug}
              href={`/programs/${program.slug}`}
              className="group bg-slate-50 rounded-xl overflow-hidden hover:shadow-xl transition-all"
            >
              <div className="relative h-48">
                <Image
                  src={program.image}
                  alt={program.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition">
                  {program.name}
                </h3>
                <div className="space-y-2 text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-green-600" />
                    <span className="font-semibold">{program.salary}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-blue-600" />
                    <span>{program.duration}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Button href="/programs" variant="tertiary" size="lg">
            <span>View All 20 Programs</span>
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </Section>

      {/* BY THE NUMBERS */}
      <Section variant="blue" className="bg-blue-600 text-white">
        <div className="grid md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-display-md mb-2">1,500+</div>
            <div className="text-blue-100 text-body-lg">
              Graduates Since 2020
            </div>
          </div>
          <div>
            <div className="text-display-md mb-2">200+</div>
            <div className="text-blue-100 text-body-lg">Employer Partners</div>
          </div>
          <div>
            <div className="text-display-md mb-2">20</div>
            <div className="text-blue-100 text-body-lg">Training Programs</div>
          </div>
          <div>
            <div className="text-display-md mb-2">$0</div>
            <div className="text-blue-100 text-body-lg">
              Tuition for Eligible
            </div>
          </div>
        </div>
      </Section>

      {/* FINAL CTA */}
      <Section variant="white" containerSize="md">
        <div className="text-center">
          <h2 className="text-h1 text-slate-900 mb-6">
            Ready to Start Your Career?
          </h2>
          <p className="text-body-lg text-slate-600 mb-8">
            Apply now. An advisor will call you within 24 hours.
          </p>
          <Button href="/apply" size="lg">
            Apply Now
          </Button>
          <p className="mt-6 text-slate-600">
            Questions?{' '}
            <a
              href="tel:+13173143757"
              className="text-blue-600 font-semibold hover:underline"
            >
              Call (317) 314-3757
            </a>
          </p>
        </div>
      </Section>
    </main>
  );
}
