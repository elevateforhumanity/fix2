import React, { useState } from 'react';

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    // Netlify Forms handles the submission automatically
    // Just show success message after form submits
    setTimeout(() => setSubmitted(true), 100);
  };

  if (submitted) {
    return (
      <div className="rounded-lg bg-green-50 p-8 text-center">
        <svg
          className="mx-auto h-12 w-12 text-green-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h3 className="mt-4 text-lg font-semibold text-green-900">
          Thank you for contacting us!
        </h3>
        <p className="mt-2 text-green-700">
          We'll get back to you within 1-2 business days.
        </p>
      </div>
    );
  }

  return (
    <form
      name="contact"
      method="POST"
      data-netlify="true"
      netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {/* Netlify Forms required fields */}
      <input type="hidden" name="form-name" value="contact" />
      <p className="hidden">
        <label>
          Don't fill this out if you're human: <input name="bot-field" />
        </label>
      </p>
      {/* Name */}
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-slate-700"
        >
          Full Name *
        </label>
        <input
          type="text"
          name="name"
          id="name"
          required
          className="mt-1 block w-full rounded-lg border border-slate-300 px-4 py-3 shadow-sm focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"
          placeholder="John Doe"
        />
      </div>
      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-slate-700"
        >
          Email Address *
        </label>
        <input
          type="email"
          name="email"
          id="email"
          required
          className="mt-1 block w-full rounded-lg border border-slate-300 px-4 py-3 shadow-sm focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"
          placeholder="john@example.com"
        />
      </div>
      {/* Phone */}
      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-slate-700"
        >
          Phone Number
        </label>
        <input
          type="tel"
          name="phone"
          id="phone"
          className="mt-1 block w-full rounded-lg border border-slate-300 px-4 py-3 shadow-sm focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"
          placeholder="(317) 555-0123"
        />
      </div>
      {/* Program Interest */}
      <div>
        <label
          htmlFor="program"
          className="block text-sm font-medium text-slate-700"
        >
          Program of Interest
        </label>
        <select
          name="program"
          id="program"
          className="mt-1 block w-full rounded-lg border border-slate-300 px-4 py-3 shadow-sm focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          <option value="">Select a program...</option>
          <option value="barber">Barber Apprenticeship</option>
          <option value="hvac">HVAC Technician</option>
          <option value="cna">CNA Certification</option>
          <option value="cdl">CDL Training</option>
          <option value="building-tech">Building Maintenance</option>
          <option value="business">Business & Tax</option>
          <option value="other">Other / General Inquiry</option>
        </select>
      </div>
      {/* Message */}
      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-slate-700"
        >
          Message *
        </label>
        <textarea
          name="message"
          id="message"
          rows={4}
          required
          className="mt-1 block w-full rounded-lg border border-slate-300 px-4 py-3 shadow-sm focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"
          placeholder="Tell us about your goals and how we can help..."
        />
      </div>
      {/* Submit Button */}
      <div>
        <button
          type="submit"
          className="w-full rounded-lg bg-red-600 px-6 py-4 text-base font-semibold text-white shadow-lg transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          Send Message
        </button>
      </div>
      <p className="text-center text-sm text-slate-500">
        We typically respond within 1-2 business days.
        <br />
        For urgent inquiries, call{' '}
        <a
          href="tel:+13173143757"
          className="font-medium text-red-600 hover:text-red-700"
        >
          (317) 314-3757
        </a>
      </p>
    </form>
  );
}
