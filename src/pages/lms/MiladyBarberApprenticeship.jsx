import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navigation from '../../components/Navigation';
import Section from '../../components/Section';
import Footer from '../../components/Footer';

export default function MiladyBarberApprenticeship() {
  return (
    <div>
      <Helmet>
        <title>Milady Barber Apprenticeship | Elevate for Humanity</title>
      </Helmet>
      <Navigation />
      <Section>
        <h1 className="section-title">Milady Barber Apprenticeship</h1>
        <p>Apprenticeship program details.</p>
      </Section>
      <Footer />
    </div>
  );
}
