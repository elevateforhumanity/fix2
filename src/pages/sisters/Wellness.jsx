import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navigation from '../../components/Navigation';
import Section from '../../components/Section';
import Footer from '../../components/Footer';

export default function Wellness() {
  return (
    <div>
      <Helmet>
        <title>Wellness Center | Elevate for Humanity</title>
        <meta
          name="description"
          content="Explore resources and tips for maintaining your physical, mental, and emotional wellness."
        />
      </Helmet>

      <Navigation />

      <Section background="white">
        <div className="mx-auto max-w-[1200px] text-center">
          <div className="mb-8">
            <span className="text-6xl">🧘</span>
          </div>
          <h1 className="section-title">Wellness Center</h1>
          <p className="section-subtitle mt-4">
            Explore resources and tips for maintaining your physical, mental,
            and emotional wellness. Your well-being is essential to your
            success.
          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3 text-left">
            <div className="card">
              <h3 className="text-xl font-bold text-brown-900 mb-2">
                Self-Care
              </h3>
              <p className="text-brown-700">
                Daily wellness tips and self-care strategies
              </p>
            </div>
            <div className="card">
              <h3 className="text-xl font-bold text-brown-900 mb-2">
                Stress Management
              </h3>
              <p className="text-brown-700">
                Mindfulness and stress reduction techniques
              </p>
            </div>
            <div className="card">
              <h3 className="text-xl font-bold text-brown-900 mb-2">
                Work-Life Balance
              </h3>
              <p className="text-brown-700">
                Healthy habits for balanced living
              </p>
            </div>
            <div className="card">
              <h3 className="text-xl font-bold text-brown-900 mb-2">
                Workshops
              </h3>
              <p className="text-brown-700">
                Access wellness workshops and events
              </p>
            </div>
            <div className="card">
              <h3 className="text-xl font-bold text-brown-900 mb-2">
                Mental Health
              </h3>
              <p className="text-brown-700">
                Mental health resources and support
              </p>
            </div>
            <div className="card">
              <h3 className="text-xl font-bold text-brown-900 mb-2">
                Fitness & Nutrition
              </h3>
              <p className="text-brown-700">Fitness and nutrition guidance</p>
            </div>
          </div>

          <div className="mt-12 p-6 bg-green-50 rounded-lg">
            <p className="text-lg font-semibold text-green-900">
              Coming Q1 2025
            </p>
          </div>
        </div>
      </Section>

      <Footer />
    </div>
  );
}
