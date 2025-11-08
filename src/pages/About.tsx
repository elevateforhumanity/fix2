/**
 * About Page
 * Matches elevateforhumanity.org about page exactly
 * Copyright (c) 2025 Elevate for Humanity
 */

import { Helmet } from 'react-helmet-async';
import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import Section from '../components/Section';
import PlatformStatement from '../components/PlatformStatement';
import Footer from '../components/Footer';

export default function About() {
  return (
    <div>
      <Helmet>
        <title>About Us | Elevate for Humanity</title>
        <meta
          name="description"
          content="Learn about Elevate for Humanity Career and Technical Institute. We empower communities through workforce training and career development."
        />
      </Helmet>
      <Navigation />
      <Hero
        title="About Elevate for Humanity"
        subtitle="Empowering communities through workforce training and career development in Marion County, Indiana"
      />
      <Section background="white">
        <div className="mx-auto max-w-[800px]">
          <h2 className="section-title text-center">Our Mission</h2>
          <p className="body-large text-center mb-8">
            At Elevate for Humanity Career and Technical Institute, we bridge
            the gap between education and employment by providing innovative
            apprenticeship and training programs. Located in Marion County, IN,
            our mission is to empower individuals with the skills they need to
            excel in today's dynamic workforce.
          </p>
          <p className="body-large text-center">
            By investing in human potential, we transform lives and build a more
            skilled, sustainable community.
          </p>
        </div>
      </Section>
      <Section background="green">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-5xl mb-4">🎯</div>
            <h3 className="text-2xl font-bold mb-3">Our Mission</h3>
            <p>
              To empower individuals with the skills they need to excel in
              today's dynamic workforce through innovative training programs.
            </p>
          </div>
          <div className="text-center">
            <div className="text-5xl mb-4">👁️</div>
            <h3 className="text-2xl font-bold mb-3">Our Vision</h3>
            <p>
              A community where everyone has access to quality workforce
              training and the opportunity to build a rewarding career.
            </p>
          </div>
          <div className="text-center">
            <div className="text-5xl mb-4">❤️</div>
            <h3 className="text-2xl font-bold mb-3">Our Values</h3>
            <p>
              Excellence, accessibility, integrity, innovation, and community
              impact guide everything we do.
            </p>
          </div>
        </div>
      </Section>
      <Section background="white">
        <h2 className="section-title text-center">Our Impact</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-8">
          <div className="text-center">
            <div className="text-5xl font-bold text-[var(--color-brown)] mb-2">
              5,000+
            </div>
            <div className="text-lg text-gray-600">Graduates</div>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold text-[var(--color-brown)] mb-2">
              92%
            </div>
            <div className="text-lg text-gray-600">Job Placement Rate</div>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold text-[var(--color-brown)] mb-2">
              8
            </div>
            <div className="text-lg text-gray-600">Career Programs</div>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold text-[var(--color-brown)] mb-2">
              100%
            </div>
            <div className="text-lg text-gray-600">Funded Training</div>
          </div>
        </div>
      </Section>
      <Section background="beige">
        <div className="mx-auto max-w-[800px]">
          <h2 className="section-title text-center">Our Programs</h2>
          <p className="body-large text-center mb-8">
            We offer 8 high-demand career pathways with 100% funding available
            through WIOA and WRG programs:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🪒</span>
              <span>Barber Apprenticeship</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl">🔧</span>
              <span>Building Services Technician</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl">🔥</span>
              <span>HVAC & Welding</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl">🏥</span>
              <span>Healthcare Training</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl">🧪</span>
              <span>Drug Testing Specialist</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl">💻</span>
              <span>Digital Skills</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl">👔</span>
              <span>Leadership Development</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl">🤝</span>
              <span>Peer Recovery Support</span>
            </div>
          </div>
          <div className="text-center mt-8">
            <a href="/programs" className="button button-large">
              Explore All Programs →
            </a>
          </div>
        </div>
      </Section>
      <Section background="white">
        <div className="mx-auto max-w-[800px]">
          <PlatformStatement />
        </div>
      </Section>
      <Section background="brown">
        <div className="mx-auto max-w-[800px] text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of graduates who have transformed their careers
            through our programs.
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
      <Footer />
    </div>
  );
}
