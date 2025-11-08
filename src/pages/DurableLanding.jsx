import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import Section from '../components/Section';

export default function DurableLanding() {
  return (
    <div>
      <Helmet>
        <title>Durable Skills Training | Elevate for Humanity</title>
        <meta
          name="description"
          content="Build the foundational skills that employers value most"
        />
      </Helmet>
      <Navigation />
      <Hero
        title="Durable Skills for Lasting Success"
        subtitle="Build the foundational skills that employers value most"
        backgroundImage="/images/durable-skills-hero.jpg"
      />
      <Section>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="card p-8">
            <div className="text-4xl mb-4">💬</div>
            <h3 className="text-2xl font-bold text-brown-900 mb-4">
              Communication
            </h3>
            <p className="text-brown-600">
              Master professional communication skills
            </p>
          </div>
          <div className="card p-8">
            <div className="text-4xl mb-4">🧩</div>
            <h3 className="text-2xl font-bold text-brown-900 mb-4">
              Problem Solving
            </h3>
            <p className="text-brown-600">
              Develop critical thinking abilities
            </p>
          </div>
          <div className="card p-8">
            <div className="text-4xl mb-4">🤝</div>
            <h3 className="text-2xl font-bold text-brown-900 mb-4">Teamwork</h3>
            <p className="text-brown-600">Learn to collaborate effectively</p>
          </div>
        </div>
      </Section>
      <Footer />
    </div>
  );
}
