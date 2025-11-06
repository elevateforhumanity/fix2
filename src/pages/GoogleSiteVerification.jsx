import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navigation from '../components/Navigation';
import Section from '../components/Section';
import Footer from '../components/Footer';

export default function GoogleSiteVerification() {
  return (
    <div>
      <Helmet>
        <title>Google Site Verification | Elevate for Humanity</title>
      </Helmet>

      <Navigation />

      <Section background="white">
        <div className="mx-auto max-w-[800px]">
          <h1 className="section-title">Google Site Verification</h1>
          <p className="text-brown-700 mt-4">
            This page is used for Google Search Console verification.
          </p>
        </div>
      </Section>

      <Footer />
    </div>
  );
}
