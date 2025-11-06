import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navigation from '../../components/Navigation';
import Section from '../../components/Section';
import Footer from '../../components/Footer';

export default function Dashboard() {
  return (
    <div>
      <Helmet>
        <title>Dashboard | Elevate for Humanity</title>
      </Helmet>
      <Navigation />
      <Section>
        <h1 className="section-title">Student Dashboard</h1>
        <p>Dashboard coming soon.</p>
      </Section>
      <Footer />
    </div>
  );
}
