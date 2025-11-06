import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navigation from '../../components/Navigation';
import Section from '../../components/Section';
import Footer from '../../components/Footer';

export default function MiladyRISEIntegration() {
  return (
    <div>
      <Helmet>
        <title>Milady RISE Integration | Elevate for Humanity</title>
      </Helmet>
      <Navigation />
      <Section>
        <h1 className="section-title">Milady RISE Integration</h1>
        <p>RISE platform integration.</p>
      </Section>
      <Footer />
    </div>
  );
}
