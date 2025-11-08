import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navigation from '../components/Navigation';
import Section from '../components/Section';
import Footer from '../components/Footer';

export default function BingSiteVerification() {
  return (
    <div>
      <Helmet>
        <title>Bing Site Verification | Elevate for Humanity</title>
      </Helmet>
      <Navigation />
      <Section background="white">
        <div className="mx-auto max-w-[800px]">
          <h1 className="section-title">Bing Site Verification</h1>
          <p className="text-brown-700 mt-4">
            This page is used for Bing Webmaster Tools verification.
          </p>
        </div>
      </Section>
      <Footer />
    </div>
  );
}
