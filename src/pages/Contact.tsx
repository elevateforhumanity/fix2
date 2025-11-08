/**
 * Contact Page
 * Matches elevateforhumanity.org contact page exactly
 * Copyright (c) 2025 Elevate for Humanity
 */

import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Navigation from '../components/Navigation';
import Section from '../components/Section';
import Footer from '../components/Footer';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <Helmet>
        <title>Contact Us | Elevate for Humanity</title>
        <meta
          name="description"
          content="Get in touch with Elevate for Humanity. We're here to help with program information, applications, and funding questions."
        />
      </Helmet>
      <Navigation />
      <Section background="green">
        <div className="mx-auto max-w-[800px] text-center">
          <h1 className="section-title">Contact Us</h1>
          <p className="body-large">
            Reach out to Elevate for Humanity for program funding assistance in
            Marion County, IN
          </p>
        </div>
      </Section>
      <Section background="white">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-bold text-[var(--color-brown)] mb-6">
              Send Us a Message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="label">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="input"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="label">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="input"
                  placeholder="your.email@example.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="label">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="input resize-none"
                  placeholder="How can we help you?"
                />
              </div>
              <button type="submit" className="button w-full">
                Submit Inquiry
              </button>
            </form>
          </div>
          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-bold text-[var(--color-brown)] mb-6">
              Get in Touch
            </h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-[var(--color-beige)] p-3 rounded-lg">
                  <span className="text-2xl">📞</span>
                </div>
                <div>
                  <h3 className="font-semibold text-[var(--color-brown)] mb-1">
                    Phone
                  </h3>
                  <a
                    href="tel:+13173143757"
                    className="text-gray-600 hover:text-[var(--color-green-600)]"
                  >
                    (317) 314-3757
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-[var(--color-beige)] p-3 rounded-lg">
                  <span className="text-2xl">✉️</span>
                </div>
                <div>
                  <h3 className="font-semibold text-[var(--color-brown)] mb-1">
                    Email
                  </h3>
                  <a
                    href="mailto:Elizabethpowell6262@gmail.com"
                    className="text-gray-600 hover:text-[var(--color-green-600)]"
                  >
                    Elizabethpowell6262@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-[var(--color-beige)] p-3 rounded-lg">
                  <span className="text-2xl">📍</span>
                </div>
                <div>
                  <h3 className="font-semibold text-[var(--color-brown)] mb-1">
                    Location
                  </h3>
                  <p className="text-gray-600">
                    Marion County, IN
                    <br />
                    Indianapolis, Indiana
                  </p>
                </div>
              </div>
            </div>
            {/* Office Hours */}
            <div className="mt-8 p-6 bg-[var(--color-beige)] rounded-lg">
              <h3 className="font-semibold text-[var(--color-brown)] mb-3">
                Office Hours
              </h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Monday - Friday:</span>
                  <span>9:00 AM - 5:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday:</span>
                  <span>By Appointment</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday:</span>
                  <span>Closed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>
      <Footer />
    </div>
  );
}
