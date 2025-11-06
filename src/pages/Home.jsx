/**
 * Home Page
 * Matches elevateforhumanity.org design exactly
 * Copyright (c) 2025 Elevate for Humanity
 * Commercial License. No resale, sublicensing, or redistribution allowed.
 */

import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import Section from '../components/Section';
import ProgramCard from '../components/ProgramCard';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="home-durable">
      {/* Matches elevateforhumanity.org class */}
      <Helmet>
        <title>
          Elevate for Humanity | Workforce Training & Career Development
        </title>
        <meta
          name="description"
          content="Career & Technical training that elevates communities. FREE workforce development programs through WIOA funding."
        />
      </Helmet>

      {/* Navigation */}
      <Navigation />
      {/* Hero Section - Matches elevateforhumanity.org exactly */}
      <Hero
        title="Ignite Your Future: Transform Your Career Today"
        subtitle="Empower your dreams with federally-funded workforce training programs. Build in-demand skills, earn industry certifications, and launch a rewarding career—at $0 cost with approved funding."
        badges={[
          { icon: '💰', text: '100% Funded' },
          { icon: '📜', text: '8 Career Pathways' },
          { icon: '🎯', text: '92% Job Placement' },
          { icon: '📍', text: 'Marion County, IN' },
        ]}
        primaryButton={{ text: 'Start Your Application', href: '/apply' }}
        secondaryButton={{ text: 'Explore Programs', href: '/programs' }}
      />
      {/* Stats Section - Matches elevateforhumanity.org */}
      <Section background="white">
        <div className="flex flex-wrap gap-8 justify-center">
          <div className="text-center flex-1 min-w-[200px]">
            <div className="text-5xl font-bold text-[var(--color-brown)]">
              5,000+
            </div>
            <div className="text-lg opacity-80">Graduates</div>
          </div>
          <div className="text-center flex-1 min-w-[200px]">
            <div className="text-5xl font-bold text-[var(--color-brown)]">
              92%
            </div>
            <div className="text-lg opacity-80">Job Placement Rate</div>
          </div>
          <div className="text-center flex-1 min-w-[200px]">
            <div className="text-5xl font-bold text-[var(--color-brown)]">
              8
            </div>
            <div className="text-lg opacity-80">Career Programs</div>
          </div>
          <div className="text-center flex-1 min-w-[200px]">
            <div className="text-5xl font-bold text-[var(--color-brown)]">
              $0
            </div>
            <div className="text-lg opacity-80">Cost with Funding</div>
          </div>
        </div>
      </Section>

      {/* Mission Section - Matches elevateforhumanity.org */}
      <Section background="green">
        <div className="mx-auto max-w-[800px]">
          <h2 className="section-title text-center">
            Empowering Futures Through Skill Development
          </h2>
          <p className="body-large text-center">
            At Elevate for Humanity Career and Technical Institute, we bridge
            the gap between education and employment by providing innovative
            apprenticeship and training programs. Located in Marion County, IN,
            our mission is to empower individuals with the skills they need to
            excel in today's dynamic workforce. By investing in human potential,
            we transform lives and build a more skilled, sustainable community.
          </p>
        </div>
      </Section>
      {/* Programs Section - Matches elevateforhumanity.org */}
      <Section>
        <h2 className="section-title text-center">Our Career Programs</h2>
        <p className="section-subtitle text-center">
          Choose from 8 high-demand career pathways with 100% funding available
        </p>
        <div className="flex flex-wrap gap-8 mt-12">
          <ProgramCard
            icon="🪒"
            title="Barber Apprenticeship"
            duration="2,000 hours • State Licensure"
            description="Earn while you learn. Master professional barbering skills and qualify for Indiana State Licensure."
            funding="💰 WRG • WIOA • Apprenticeship"
            href="/programs/barber"
          />
          <ProgramCard
            icon="🔧"
            title="Building Services Technician"
            duration="Flexible • Industry Certification"
            description="Learn essential building maintenance and repair skills for commercial and residential properties."
            funding="💰 WRG • WIOA"
            href="/programs/building-services"
          />
          <ProgramCard
            icon="🔥"
            title="HVAC & Welding"
            duration="Dual Certification • High Demand"
            description="Master two in-demand trades with comprehensive training in heating, ventilation, air conditioning, and welding."
            funding="💰 WRG • WIOA"
            href="/programs/hvac-welding"
          />
        </div>
        <div className="text-center mt-12">
          <a href="/programs" className="button button-large">
            View All Programs →
          </a>
        </div>
      </Section>

      {/* CTA Section - Matches elevateforhumanity.org */}
      <Section background="brown">
        <div className="mx-auto max-w-[800px] text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Transform Your Career?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of graduates who have launched successful careers
            through our federally-funded training programs.
          </p>
          <div className="flex flex-wrap gap-6 justify-center">
            <a href="/apply" className="button-white">
              Apply Now
            </a>
            <a href="/contact" className="button-outline-white">
              Contact Us
            </a>
          </div>
        </div>
      </Section>

      {/* Footer */}
      <Footer
        socialLinks={{
          linkedin: 'https://linkedin.com/company/elevateforhumanity',
          facebook: 'https://facebook.com/elevateforhumanity',
          instagram: 'https://instagram.com/elevateforhumanity',
        }}
      />
    </div>
  );
}
