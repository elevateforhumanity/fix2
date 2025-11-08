import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navigation from '../../components/Navigation';
import Section from '../../components/Section';
import Footer from '../../components/Footer';

export default function VolunteerOpportunities() {
  return (
    <div>
      <Helmet>
        <title>Volunteer Opportunities | Elevate for Humanity</title>
        <meta
          name="description"
          content="Make a difference in your community by volunteering with Elevate for Humanity."
        />
      </Helmet>
      <Navigation />
      <Section background="white">
        <div className="mx-auto max-w-[1200px] text-center">
          <div className="mb-8">
            <span className="text-6xl">🤝</span>
          </div>
          <h1 className="section-title">Volunteer Opportunities</h1>
          <p className="section-subtitle mt-4">
            Make a difference in your community by volunteering with Elevate for
            Humanity. Help students succeed through mentorship, tutoring, and
            community support.
          </p>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3 text-left">
            <div className="card">
              <h3 className="text-xl font-bold text-brown-900 mb-2">
                Mentorship
              </h3>
              <p className="text-brown-700">
                Mentor students in your area of expertise
              </p>
            </div>
            <div className="card">
              <h3 className="text-xl font-bold text-brown-900 mb-2">
                Career Workshops
              </h3>
              <p className="text-brown-700">
                Assist with workshops and job fairs
              </p>
            </div>
            <div className="card">
              <h3 className="text-xl font-bold text-brown-900 mb-2">
                Community Outreach
              </h3>
              <p className="text-brown-700">
                Support community outreach programs
              </p>
            </div>
            <div className="card">
              <h3 className="text-xl font-bold text-brown-900 mb-2">
                Administrative Support
              </h3>
              <p className="text-brown-700">Help with tasks and events</p>
            </div>
            <div className="card">
              <h3 className="text-xl font-bold text-brown-900 mb-2">
                Flexible Schedule
              </h3>
              <p className="text-brown-700">Volunteer on your own schedule</p>
            </div>
            <div className="card">
              <h3 className="text-xl font-bold text-brown-900 mb-2">
                Lasting Impact
              </h3>
              <p className="text-brown-700">
                Make a difference in students' lives
              </p>
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
