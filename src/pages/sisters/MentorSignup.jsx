import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Navigation from '../../components/Navigation';
import Section from '../../components/Section';
import Footer from '../../components/Footer';
import Button from '../../components/Button';

export default function MentorSignup() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    expertise: '',
    bio: '',
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div>
      <Helmet>
        <title>Become a Mentor | Elevate for Humanity</title>
        <meta
          name="description"
          content="Share your expertise and help students succeed by becoming a mentor."
        />
      </Helmet>

      <Navigation />

      <Section background="white">
        <div className="mx-auto max-w-[600px]">
          <h1 className="section-title text-center">Become a Mentor</h1>
          <p className="section-subtitle text-center mt-4 mb-12">
            Share your expertise and help students succeed by becoming a mentor.
          </p>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold text-brown-900 mb-2"
                >
                  Name *
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-brown-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-brown-900 mb-2"
                >
                  Email *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-brown-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label
                  htmlFor="expertise"
                  className="block text-sm font-semibold text-brown-900 mb-2"
                >
                  Area of Expertise *
                </label>
                <input
                  id="expertise"
                  name="expertise"
                  type="text"
                  value={form.expertise}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-brown-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label
                  htmlFor="bio"
                  className="block text-sm font-semibold text-brown-900 mb-2"
                >
                  Short Bio
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  value={form.bio}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-brown-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                size="large"
                className="w-full"
              >
                Submit Application
              </Button>
            </form>
          ) : (
            <div className="text-center p-8 bg-green-50 rounded-lg">
              <p className="text-xl font-semibold text-green-900 mb-2">
                Thank you for signing up!
              </p>
              <p className="text-green-800">
                We will contact you soon with next steps.
              </p>
            </div>
          )}
        </div>
      </Section>

      <Footer />
    </div>
  );
}
