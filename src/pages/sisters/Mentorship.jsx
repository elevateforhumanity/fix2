import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Navigation from '../../components/Navigation';
import Hero from '../../components/Hero';
import Section from '../../components/Section';
import Footer from '../../components/Footer';
import Button from '../../components/Button';

export default function Mentorship() {
  return (
    <div>
      <Helmet>
        <title>Mentorship Hub | Elevate for Humanity</title>
        <meta
          name="description"
          content="Connect with experienced mentors for career guidance, skill development, and personal growth."
        />
      </Helmet>

      <Navigation />

      <Hero
        title="Mentorship Hub"
        subtitle="Connect with experienced mentors for career guidance, skill development, and personal growth. Explore our directory or sign up to become a mentor."
        primaryCTA="Find a Mentor"
        secondaryCTA="Become a Mentor"
        primaryLink="/sisters/mentor-directory"
        secondaryLink="/sisters/mentor-signup"
      />

      <Section background="white">
        <div className="mx-auto max-w-[1200px]">
          <h2 className="section-title text-center">Why Mentorship Matters</h2>
          <p className="section-subtitle text-center mt-4 mb-12">
            Mentorship provides guidance, support, and real-world insights to
            help you succeed in your career journey.
          </p>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="card text-center">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-bold text-brown-900 mb-2">
                Career Guidance
              </h3>
              <p className="text-brown-700">
                Get expert advice on career paths, job search strategies, and
                professional development.
              </p>
            </div>

            <div className="card text-center">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-bold text-brown-900 mb-2">
                Skill Development
              </h3>
              <p className="text-brown-700">
                Learn industry-specific skills and best practices from
                experienced professionals.
              </p>
            </div>

            <div className="card text-center">
              <div className="text-4xl mb-4">🌟</div>
              <h3 className="text-xl font-bold text-brown-900 mb-2">
                Personal Growth
              </h3>
              <p className="text-brown-700">
                Build confidence, expand your network, and achieve your
                professional goals.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section background="beige">
        <div className="mx-auto max-w-[800px] text-center">
          <h2 className="section-title">Ready to Get Started?</h2>
          <p className="section-subtitle mt-4 mb-8">
            Whether you're looking for guidance or want to share your expertise,
            our mentorship program connects you with the right people.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/sisters/mentor-directory">
              <Button variant="primary" size="large">
                Browse Mentors
              </Button>
            </Link>
            <Link to="/sisters/mentor-signup">
              <Button variant="secondary" size="large">
                Become a Mentor
              </Button>
            </Link>
          </div>
        </div>
      </Section>

      <Footer />
    </div>
  );
}
