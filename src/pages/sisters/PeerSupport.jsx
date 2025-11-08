import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navigation from '../../components/Navigation';
import Section from '../../components/Section';
import Footer from '../../components/Footer';

export default function PeerSupport() {
  return (
    <div>
      <Helmet>
        <title>Peer Support Network | Elevate for Humanity</title>
        <meta
          name="description"
          content="Connect with fellow students for encouragement, advice, and shared experiences."
        />
      </Helmet>
      <Navigation />
      <Section background="white">
        <div className="mx-auto max-w-[1200px] text-center">
          <div className="mb-8">
            <span className="text-6xl">💬</span>
          </div>
          <h1 className="section-title">Peer Support Network</h1>
          <p className="section-subtitle mt-4">
            Connect with fellow students for encouragement, advice, and shared
            experiences. Build a supportive community that helps you succeed.
          </p>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3 text-left">
            <div className="card">
              <h3 className="text-xl font-bold text-brown-900 mb-2">
                Support Groups
              </h3>
              <p className="text-brown-700">
                Join peer support groups by program or interest
              </p>
            </div>
            <div className="card">
              <h3 className="text-xl font-bold text-brown-900 mb-2">
                Safe Space
              </h3>
              <p className="text-brown-700">
                Share your story and challenges in a safe environment
              </p>
            </div>
            <div className="card">
              <h3 className="text-xl font-bold text-brown-900 mb-2">
                Study Buddies
              </h3>
              <p className="text-brown-700">
                Find study partners and accountability buddies
              </p>
            </div>
            <div className="card">
              <h3 className="text-xl font-bold text-brown-900 mb-2">
                Wellness Resources
              </h3>
              <p className="text-brown-700">
                Access mental health and wellness support
              </p>
            </div>
            <div className="card">
              <h3 className="text-xl font-bold text-brown-900 mb-2">
                Group Discussions
              </h3>
              <p className="text-brown-700">
                Participate in forums and group discussions
              </p>
            </div>
            <div className="card">
              <h3 className="text-xl font-bold text-brown-900 mb-2">
                Shared Journey
              </h3>
              <p className="text-brown-700">
                Get support from students who understand
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
