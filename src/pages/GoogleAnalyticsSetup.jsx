import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navigation from '../components/Navigation';
import Section from '../components/Section';
import Footer from '../components/Footer';

export default function GoogleAnalyticsSetup() {
  return (
    <div>
      <Helmet>
        <title>Google Analytics Setup | Elevate for Humanity</title>
      </Helmet>

      <Navigation />

      <Section background="white">
        <div className="mx-auto max-w-[800px]">
          <h1 className="section-title">Google Analytics Setup</h1>
          <p className="text-brown-700 mt-4">
            Analytics configuration and tracking setup.
          </p>
        </div>
      </Section>

      <Footer />
    </div>
  );
}
