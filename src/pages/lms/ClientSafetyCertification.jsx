import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navigation from '../../components/Navigation';
import Section from '../../components/Section';
import Footer from '../../components/Footer';

export default function ClientSafetyCertification() {
  return (
    <div>
      <Helmet>
        <title>Client Safety Certification | Elevate for Humanity</title>
      </Helmet>
      <Navigation />
      <Section>
        <h1 className="section-title">Client Safety Certification</h1>
        <p>Safety certification program.</p>
      </Section>
      <Footer />
    </div>
  );
}
