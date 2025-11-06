import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navigation from '../../components/Navigation';
import Section from '../../components/Section';
import Footer from '../../components/Footer';

export default function WellnessResources() {
  return (
    <div>
      <Helmet>
        <title>Wellness Resources | Elevate for Humanity</title>
        <meta
          name="description"
          content="Find helpful resources for your physical, mental, and emotional wellness."
        />
      </Helmet>

      <Navigation />

      <Section background="white">
        <div className="mx-auto max-w-[800px]">
          <h1 className="section-title">Wellness Resources</h1>
          <p className="section-subtitle mt-4 mb-12">
            Find helpful resources for your physical, mental, and emotional
            wellness.
          </p>

          <div className="space-y-6">
            <div className="card">
              <h3 className="text-xl font-bold text-brown-900 mb-2">
                <a
                  href="https://www.mentalhealth.gov/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 hover:text-green-700 hover:underline"
                >
                  MentalHealth.gov
                </a>
              </h3>
              <p className="text-brown-700">
                Comprehensive mental health information and resources from the
                U.S. government.
              </p>
            </div>

            <div className="card">
              <h3 className="text-xl font-bold text-brown-900 mb-2">
                <a
                  href="https://www.cdc.gov/mentalhealth/stress-coping/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 hover:text-green-700 hover:underline"
                >
                  CDC: Coping with Stress
                </a>
              </h3>
              <p className="text-brown-700">
                Evidence-based strategies for managing stress and maintaining
                mental health.
              </p>
            </div>

            <div className="card">
              <h3 className="text-xl font-bold text-brown-900 mb-2">
                <a
                  href="https://www.nimh.nih.gov/health/topics/caring-for-your-mental-health"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 hover:text-green-700 hover:underline"
                >
                  NIMH: Caring for Your Mental Health
                </a>
              </h3>
              <p className="text-brown-700">
                Expert guidance on maintaining mental health and seeking help
                when needed.
              </p>
            </div>

            <div className="mt-8 p-6 bg-beige-100 rounded-lg">
              <h3 className="text-lg font-bold text-brown-900 mb-2">
                Crisis Support
              </h3>
              <p className="text-brown-700 mb-2">
                If you're experiencing a mental health crisis, help is available
                24/7:
              </p>
              <p className="text-brown-900 font-semibold">
                National Suicide Prevention Lifeline:{' '}
                <a href="tel:988" className="text-green-600 hover:underline">
                  988
                </a>
              </p>
              <p className="text-brown-900 font-semibold">
                Crisis Text Line: Text HOME to{' '}
                <a href="sms:741741" className="text-green-600 hover:underline">
                  741741
                </a>
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Footer />
    </div>
  );
}
