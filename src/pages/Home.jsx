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
        title="Ignite Your Future: Fund Training Today"
        subtitle="Empower Dreams: Support Skills Development and Transform Lives at Elevate for Humanity. Invest in Growth, Today! Marion County."
        primaryButton={{ text: 'Sign up now', href: '/apply' }}
        showCarousel
      />
      {/* Mission Section - Matches elevateforhumanity.org */}
      <Section background="white">
        <div className="mx-auto max-w-[800px]">
          <h2 className="section-title text-center">
            Empowering Futures Through Skill Development
          </h2>
          <p className="body-large text-center">
            At Elevate for Humanity Career and Technical Institute, we are
            dedicated to bridging the gap between education and employment by
            funding innovative apprenticeship and training programs. Located in
            Marion County, IN, our mission is to empower individuals with the
            skills they need to excel in today's dynamic workforce. By investing
            in human potential, we aim to transform lives and build a more
            skilled, sustainable community. Join us as we pave the way for
            brighter futures through quality education and hands-on experience.
          </p>
        </div>
      </Section>
      {/* Image + Text Section - Matches elevateforhumanity.org */}
      <Section background="beige">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <img
              src="/images/training-skills.jpg"
              alt="Training and skill development concept"
              className="w-full rounded-lg shadow-lg"
              onError={(e) => {
                e.target.src =
                  'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="600" height="400"%3E%3Crect fill="%23f5f1e8" width="600" height="400"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" fill="%234a3728" font-size="24"%3ETraining %26 Skills%3C/text%3E%3C/svg%3E';
              }}
            />
          </div>
          <div>
            <h2 className="text-4xl font-bold mb-6 text-[var(--color-brown)]">
              Empower Growth Through Apprenticeships
            </h2>
            <p className="text-xl mb-6 opacity-80">
              Unlock your potential with transformative apprenticeship and
              training programs at Elevate for Humanity Career and Technical
              Institute. Located in Marion County, we empower individuals with
              the skills needed for a thriving future. Join us in advancing
              careers and communities through education and opportunity.
              Together, let's build a brighter tomorrow.
            </p>
            <div className="inline-block px-6 py-3 bg-[var(--color-green)] text-white rounded-lg font-semibold">
              Future Secured
            </div>
          </div>
        </div>
      </Section>
      {/* Testimonials Section - Matches elevateforhumanity.org */}
      <Section background="white">
        <h2 className="section-title text-center mb-4">
          Partnering For Futures: Testimonials That Inspire
        </h2>
        <p className="section-subtitle text-center mb-12">
          Transforming futures through hands-on learning and career pathways,
          Elevate for Humanity empowers every individual to thrive
          professionally.
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <img
              src="/images/testimonial-jordan.jpg"
              alt="Jordan Lee"
              className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              onError={(e) => {
                e.target.src =
                  'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="96" height="96"%3E%3Ccircle fill="%23f5f1e8" cx="48" cy="48" r="48"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%234a3728" font-size="36"%3EJL%3C/text%3E%3C/svg%3E';
              }}
            />
            <p className="text-lg mb-4 italic">
              "The support from Elevate for Humanity has been transformative.
              Their funding allowed me to enroll in a high-quality
              apprenticeship program, setting me on a path to a fulfilling
              career. Their dedication to student success is unmatched."
            </p>
            <p className="font-semibold text-[var(--color-brown)]">
              - Jordan Lee
            </p>
          </div>
          <div className="text-center">
            <img
              src="/images/testimonial-alex.jpg"
              alt="Alex Morgan"
              className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              onError={(e) => {
                e.target.src =
                  'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="96" height="96"%3E%3Ccircle fill="%23f5f1e8" cx="48" cy="48" r="48"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%234a3728" font-size="36"%3EAM%3C/text%3E%3C/svg%3E';
              }}
            />
            <p className="text-lg mb-4 italic">
              "Elevate for Humanity provided essential funding that opened doors
              to my dream apprenticeship. Their commitment to empowering
              individuals with career opportunities is truly inspiring, and
              their support has been pivotal in advancing my professional
              journey."
            </p>
            <p className="font-semibold text-[var(--color-brown)]">
              - Alex Morgan
            </p>
          </div>
          <div className="text-center">
            <img
              src="/images/testimonial-taylor.jpg"
              alt="Taylor Rivers"
              className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              onError={(e) => {
                e.target.src =
                  'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="96" height="96"%3E%3Ccircle fill="%23f5f1e8" cx="48" cy="48" r="48"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%234a3728" font-size="36"%3ETR%3C/text%3E%3C/svg%3E';
              }}
            />
            <p className="text-lg mb-4 italic">
              "Elevate for Humanity's funding was a game-changer for me. It
              enabled my participation in an incredible training program that
              propelled my career forward. Their unwavering support and
              commitment to individual growth are exceptional. I am deeply
              grateful for their contribution to my success."
            </p>
            <p className="font-semibold text-[var(--color-brown)]">
              - Taylor Rivers
            </p>
          </div>
        </div>
      </Section>
      {/* CTA Section - Matches elevateforhumanity.org */}
      <Section background="green">
        <div className="mx-auto max-w-[800px] text-center">
          <h2 className="text-4xl font-bold mb-6 text-white">
            Empower Your Future Today
          </h2>
          <p className="text-xl mb-8 text-white opacity-90">
            Join our transformative programs and unlock career opportunities
            that align with industry demands. Flexible, grant-funded options
            mean more possibilities for growth. Elevate your skills with us!
          </p>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSehiTq4RyfKthz85x55GCkhWWNDSZp0pNri7AxjAeF2taQ-Lw/viewform?usp=header"
            className="button-white"
            target="_blank"
            rel="noopener noreferrer"
          >
            Explore Programs
          </a>
        </div>
      </Section>
      {/* Contact Form Section - Matches elevateforhumanity.org */}
      <Section background="white">
        <div className="mx-auto max-w-[600px]">
          <h3 className="text-3xl font-bold mb-4 text-center text-[var(--color-brown)]">
            Connect With Us Today
          </h3>
          <p className="text-center mb-8 opacity-80">
            Reach out to Elevate for Humanity for program funding assistance in
            Marion County, IN.
          </p>
          <form className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-semibold mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-green)]"
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-green)]"
                required
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-semibold mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="5"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-green)]"
                required
               />
            </div>
            <button
              type="submit"
              className="w-full bg-[var(--color-green)] text-white py-3 px-6 rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              Submit Inquiry
            </button>
            <p className="text-xs text-center opacity-60">
              This site is protected by reCAPTCHA and the Google{' '}
              <a
                href="https://policies.google.com/privacy"
                className="underline"
              >
                Privacy Policy
              </a>{' '}
              and{' '}
              <a href="https://policies.google.com/terms" className="underline">
                Terms of Service
              </a>{' '}
              apply.
            </p>
          </form>
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
