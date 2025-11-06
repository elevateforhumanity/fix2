import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navigation from '../../components/Navigation';
import Section from '../../components/Section';
import Footer from '../../components/Footer';

export default function Volunteer() {
  return (
    <div>
      <Helmet>
        <title>Volunteer Hub | Elevate for Humanity</title>
        <meta
          name="description"
          content="Learn about volunteer opportunities and how you can get involved to support our mission."
        />
      </Helmet>

      <Navigation />

      <Section background="white">
        <div className="mx-auto max-w-[1200px] text-center">
          <div className="mb-8">
            <span className="text-6xl">🌟</span>
          </div>
          <h1 className="section-title">Volunteer Hub</h1>
          <p className="section-subtitle mt-4">
            Learn about volunteer opportunities and how you can get involved to
            support our mission of empowering students and elevating
            communities.
          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3 text-left">
            <div className="card">
              <h3 className="text-xl font-bold text-brown-900 mb-2">
                Browse Positions
              </h3>
              <p className="text-brown-700">
                Explore available volunteer opportunities
              </p>
            </div>
            <div className="card">
              <h3 className="text-xl font-bold text-brown-900 mb-2">Sign Up</h3>
              <p className="text-brown-700">
                Register for volunteer shifts and events
              </p>
            </div>
            <div className="card">
              <h3 className="text-xl font-bold text-brown-900 mb-2">
                Track Impact
              </h3>
              <p className="text-brown-700">
                Monitor your volunteer hours and impact
              </p>
            </div>
            <div className="card">
              <h3 className="text-xl font-bold text-brown-900 mb-2">
                Training
              </h3>
              <p className="text-brown-700">
                Receive volunteer training and resources
              </p>
            </div>
            <div className="card">
              <h3 className="text-xl font-bold text-brown-900 mb-2">
                Community
              </h3>
              <p className="text-brown-700">
                Join our dedicated volunteer community
              </p>
            </div>
            <div className="card">
              <h3 className="text-xl font-bold text-brown-900 mb-2">
                Make a Difference
              </h3>
              <p className="text-brown-700">
                Impact students' lives meaningfully
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
