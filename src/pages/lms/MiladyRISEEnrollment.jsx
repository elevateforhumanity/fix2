import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navigation from '../../components/Navigation';
import Section from '../../components/Section';
import Footer from '../../components/Footer';

export default function MiladyRISEEnrollment() {
  return (
    <div>
      <Helmet>
        <title>Milady RISE Enrollment | Elevate for Humanity</title>
      </Helmet>
      <Navigation />
      <Section>
        <h1 className="section-title">Milady RISE Enrollment</h1>
        <p>Enroll in Milady RISE program.</p>
      </Section>
      <Footer />
    </div>
  );
}
