import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navigation from '../../components/Navigation';
import Section from '../../components/Section';
import Footer from '../../components/Footer';

export default function VolunteerStories() {
  return (
    <div>
      <Helmet>
        <title>Volunteer Stories | Elevate for Humanity</title>
        <meta
          name="description"
          content="Read inspiring stories from our volunteers about their experiences and impact."
        />
      </Helmet>
      <Navigation />
      <Section background="white">
        <div className="mx-auto max-w-[1200px] text-center">
          <div className="mb-8">
            <span className="text-6xl">📖</span>
          </div>
          <h1 className="section-title">Volunteer Stories</h1>
          <p className="section-subtitle mt-4">
            Read inspiring stories from our volunteers about their experiences
            and the impact they've made in students' lives. Be inspired to make
            a difference.
          </p>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3 text-left">
            <div className="card">
              <h3 className="text-xl font-bold text-brown-900 mb-2">
                Real Stories
              </h3>
              <p className="text-brown-700">
                Authentic stories from community volunteers
              </p>
            </div>
            <div className="card">
              <h3 className="text-xl font-bold text-brown-900 mb-2">
                Volunteer Experiences
              </h3>
              <p className="text-brown-700">
                Learn about volunteer experiences and impact
              </p>
            </div>
            <div className="card">
              <h3 className="text-xl font-bold text-brown-900 mb-2">
                Get Involved
              </h3>
              <p className="text-brown-700">
                Discover different ways to volunteer
              </p>
            </div>
            <div className="card">
              <h3 className="text-xl font-bold text-brown-900 mb-2">
                See the Impact
              </h3>
              <p className="text-brown-700">
                Witness the difference volunteers make
              </p>
            </div>
            <div className="card">
              <h3 className="text-xl font-bold text-brown-900 mb-2">
                Get Inspired
              </h3>
              <p className="text-brown-700">
                Start your volunteer journey today
              </p>
            </div>
            <div className="card">
              <h3 className="text-xl font-bold text-brown-900 mb-2">Connect</h3>
              <p className="text-brown-700">Connect with featured volunteers</p>
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
