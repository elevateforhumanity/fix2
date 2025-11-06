import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navigation from '../../components/Navigation';
import Section from '../../components/Section';
import Footer from '../../components/Footer';

export default function Privacy() {
  return (
    <div>
      <Helmet>
        <title>Privacy Policy | Elevate for Humanity</title>
      </Helmet>
      <Navigation />
      <Section background="white">
        <div className="mx-auto max-w-[800px]">
          <h1 className="section-title">Privacy Policy</h1>
          <div className="space-y-4 mt-6">
            <p>Last updated: {new Date().toLocaleDateString()}</p>
            <h2 className="text-2xl font-bold mt-8">Information We Collect</h2>
            <p>
              We collect information you provide directly to us when you
              register for programs, contact us, or use our services.
            </p>
            <h2 className="text-2xl font-bold mt-8">
              How We Use Your Information
            </h2>
            <p>
              We use the information we collect to provide, maintain, and
              improve our services, communicate with you, and comply with legal
              obligations.
            </p>
            <h2 className="text-2xl font-bold mt-8">Contact Us</h2>
            <p>
              For privacy questions, contact us at Elizabethpowell6262@gmail.com
            </p>
          </div>
        </div>
      </Section>
      <Footer />
    </div>
  );
}
