import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navigation from '../../components/Navigation';
import Section from '../../components/Section';
import Footer from '../../components/Footer';

export default function EnrollmentSuccess() {
  return (
    <div>
      <Helmet>
        <title>Enrollment Success | Elevate for Humanity</title>
      </Helmet>
      <Navigation />
      <Section background="green">
        <h1 className="section-title text-center">Enrollment Successful!</h1>
        <p className="text-center">
          Thank you for enrolling. We'll contact you soon.
        </p>
      </Section>
      <Footer />
    </div>
  );
}
