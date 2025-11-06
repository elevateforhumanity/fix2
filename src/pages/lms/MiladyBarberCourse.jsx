import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navigation from '../../components/Navigation';
import Section from '../../components/Section';
import Footer from '../../components/Footer';

export default function MiladyBarberCourse() {
  return (
    <div>
      <Helmet>
        <title>Milady Barber Course | Elevate for Humanity</title>
      </Helmet>
      <Navigation />
      <Section>
        <h1 className="section-title">Milady Barber Course</h1>
        <p>Professional barber training curriculum.</p>
      </Section>
      <Footer />
    </div>
  );
}
