'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement form submission
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="py-16 px-4 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl text-slate-300 max-w-2xl">
            Have questions about our programs? We're here to help you find the right training path.
          </p>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Get in Touch</h2>
                <div className="space-y-4">
                  <div>
                    <div className="font-semibold text-slate-900 mb-1">Phone</div>
                    <a href="tel:317-555-0100" className="text-red-600 hover:underline">
                      (317) 555-0100
                    </a>
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900 mb-1">Email</div>
                    <a href="mailto:info@elevateforhumanity.org" className="text-red-600 hover:underline">
                      info@elevateforhumanity.org
                    </a>
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900 mb-1">Address</div>
                    <p className="text-slate-600">
                      123 Workforce Way<br />
                      Indianapolis, IN 46204
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-slate-900 mb-3">Office Hours</h3>
                <div className="space-y-2 text-sm text-slate-600">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span>8:00 AM - 5:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span>9:00 AM - 1:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span>Closed</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-slate-900 mb-3">Quick Links</h3>
                <div className="space-y-2">
                  <a href="/apply" className="block text-red-600 hover:underline">
                    Apply for Training
                  </a>
                  <a href="/programs" className="block text-red-600 hover:underline">
                    Browse Programs
                  </a>
                  <a href="/faq" className="block text-red-600 hover:underline">
                    Frequently Asked Questions
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white border border-slate-200 p-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Send Us a Message</h2>
                
                {submitted && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-800 rounded">
                    Thank you! We'll get back to you within 24 hours.
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-slate-900 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2 border border-slate-300 focus:border-orange-500 focus:ring-1 focus:ring-blue-600 outline-none"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-slate-900 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2 border border-slate-300 focus:border-orange-500 focus:ring-1 focus:ring-blue-600 outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold text-slate-900 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-2 border border-slate-300 focus:border-orange-500 focus:ring-1 focus:ring-blue-600 outline-none"
                      />
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-semibold text-slate-900 mb-2">
                        Subject *
                      </label>
                      <select
                        id="subject"
                        required
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-4 py-2 border border-slate-300 focus:border-orange-500 focus:ring-1 focus:ring-blue-600 outline-none"
                      >
                        <option value="">Select a subject</option>
                        <option value="general">General Inquiry</option>
                        <option value="programs">Program Information</option>
                        <option value="eligibility">Eligibility Questions</option>
                        <option value="application">Application Help</option>
                        <option value="employer">Employer Partnership</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-slate-900 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-2 border border-slate-300 focus:border-orange-500 focus:ring-1 focus:ring-blue-600 outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full px-8 py-3 bg-red-600 text-white font-semibold hover:bg-red-700 transition"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="bg-slate-200 h-96 flex items-center justify-center text-slate-500">
            Map Location: 123 Workforce Way, Indianapolis, IN 46204
          </div>
        </div>
      </section>
    </div>
  );
}
