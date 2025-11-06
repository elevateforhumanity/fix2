/*
  Copyright (c) 2025 Elevate for Humanity
  Commercial License. No resale, sublicensing, or redistribution allowed.
  See LICENSE file for details.
*/
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import Hero from '../components/Hero';

export default function CloneLanding() {
  return (
    <div>
      <Helmet>
        <title>White Label Platform | Elevate for Humanity</title>
        <meta
          name="description"
          content="Launch your own branded workforce development platform with our white label solution."
        />
      </Helmet>

      <Navigation />

      <Hero
        title="White Label Platform"
        subtitle="Launch your own branded workforce development platform"
        backgroundImage="/images/white-label-hero.jpg"
      />

      <div className="section">
        <div className="container max-w-4xl">
          <div className="card p-8 text-center mb-12 bg-gradient-to-r from-green-50 to-beige-50 border-l-4 border-green-600">
            <div className="text-6xl mb-4">🎨</div>
            <h2 className="text-3xl font-bold text-brown-900 mb-4">
              Coming Soon - Q2 2025
            </h2>
            <p className="text-lg text-brown-600">
              Perfect for organizations, schools, and training providers
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="card p-6">
              <div className="text-4xl mb-4">🎨</div>
              <h3 className="text-xl font-bold text-brown-900 mb-2">
                Customizable Branding
              </h3>
              <p className="text-brown-600">
                Your logo, colors, and domain name
              </p>
            </div>

            <div className="card p-6">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-xl font-bold text-brown-900 mb-2">
                Complete LMS
              </h3>
              <p className="text-brown-600">
                Full course management and delivery
              </p>
            </div>

            <div className="card p-6">
              <div className="text-4xl mb-4">👥</div>
              <h3 className="text-xl font-bold text-brown-900 mb-2">
                Student Management
              </h3>
              <p className="text-brown-600">Enrollment and progress tracking</p>
            </div>

            <div className="card p-6">
              <div className="text-4xl mb-4">💳</div>
              <h3 className="text-xl font-bold text-brown-900 mb-2">
                Payment Processing
              </h3>
              <p className="text-brown-600">Built-in payment and reporting</p>
            </div>

            <div className="card p-6">
              <div className="text-4xl mb-4">🎓</div>
              <h3 className="text-xl font-bold text-brown-900 mb-2">
                Certificates
              </h3>
              <p className="text-brown-600">Automated certificate generation</p>
            </div>

            <div className="card p-6">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-bold text-brown-900 mb-2">
                Dedicated Support
              </h3>
              <p className="text-brown-600">Training and ongoing assistance</p>
            </div>
          </div>

          <div className="card p-8 text-center mt-12 bg-green-50">
            <h3 className="text-2xl font-bold text-brown-900 mb-4">
              Interested in White Label?
            </h3>
            <p className="text-brown-600 mb-6">
              Contact us to learn more about our white label solution
            </p>
            <a href="/contact" className="btn-primary">
              Contact Us
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
