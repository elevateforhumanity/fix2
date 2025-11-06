import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navigation from '../../components/Navigation';
import Section from '../../components/Section';
import Footer from '../../components/Footer';

export default function MentorDirectory() {
  return (
    <div>
      <Helmet>
        <title>Mentor Directory | Elevate for Humanity</title>
        <meta
          name="description"
          content="Connect with experienced mentors who can guide you through your career journey."
        />
      </Helmet>

      <Navigation />

      <Section background="white">
        <div className="mx-auto max-w-[1200px] text-center">
          <div className="mb-8">
            <span className="text-6xl">👥</span>
          </div>
          <h1 className="section-title">Mentor Directory</h1>
          <p className="section-subtitle mt-4">
            Connect with experienced mentors who can guide you through your
            career journey. Browse profiles, read reviews, and find the perfect
            mentor for your goals.
          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3 text-left">
            <div className="card">
              <h3 className="text-xl font-bold text-brown-900 mb-2">
                Search by Expertise
              </h3>
              <p className="text-brown-700">
                Find mentors by industry and expertise
              </p>
            </div>
            <div className="card">
              <h3 className="text-xl font-bold text-brown-900 mb-2">
                Detailed Profiles
              </h3>
              <p className="text-brown-700">
                View mentor profiles and backgrounds
              </p>
            </div>
            <div className="card">
              <h3 className="text-xl font-bold text-brown-900 mb-2">
                Read Reviews
              </h3>
              <p className="text-brown-700">See what other students say</p>
            </div>
            <div className="card">
              <h3 className="text-xl font-bold text-brown-900 mb-2">
                Schedule Sessions
              </h3>
              <p className="text-brown-700">
                Book one-on-one mentoring sessions
              </p>
            </div>
            <div className="card">
              <h3 className="text-xl font-bold text-brown-900 mb-2">
                Career Guidance
              </h3>
              <p className="text-brown-700">
                Access expert advice and guidance
              </p>
            </div>
            <div className="card">
              <h3 className="text-xl font-bold text-brown-900 mb-2">
                Build Relationships
              </h3>
              <p className="text-brown-700">
                Create lasting professional connections
              </p>
            </div>
          </div>

          <div className="mt-12 p-6 bg-green-50 rounded-lg">
            <p className="text-lg font-semibold text-green-900">
              Coming Q1 2025
            </p>
          </div>
        </div>
      </Section>

      <Footer />
    </div>
  );
}
