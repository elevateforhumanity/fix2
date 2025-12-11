'use client';

import { useState } from 'react';
import Link from 'next/link';

const PROGRAMS = [
  { id: 'barber', label: 'Barber Apprenticeship', slug: 'barber-apprentice', price: 4890 },
  { id: 'ma', label: 'Medical Assistant', slug: 'medical-assistant', price: 4325 },
  { id: 'hvac', label: 'HVAC Technician', slug: 'hvac-technician', price: 5000 },
  { id: 'cpr', label: 'CPR Certification', slug: 'cpr-certification', price: 575 },
  { id: 'ehst', label: 'Emergency Health & Safety Tech', slug: 'emergency-health-safety', price: 4950 },
  { id: 'esth', label: 'Professional Esthetician', slug: 'professional-esthetician', price: 4575 },
  { id: 'prc', label: 'Peer Recovery Coach', slug: 'peer-recovery-coach', price: 4750 },
  { id: 'tax', label: 'Tax Prep & Financial Services', slug: 'tax-prep-financial', price: 4950 },
  { id: 'biz', label: 'Business Startup & Marketing', slug: 'business-startup-marketing', price: 4550 },
];

export default function PayFormPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    program: 'barber',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedProgram = PROGRAMS.find((p) => p.id === formData.program) ?? PROGRAMS[0];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Submit form data to contact API
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone,
          program: selectedProgram.label,
          message: `Payment request for ${selectedProgram.label} - $${selectedProgram.price}`,
        }),
      });

      if (response.ok) {
        // Create Stripe checkout session
        const stripeResponse = await fetch('/api/create-checkout-session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            programName: selectedProgram.label,
            programSlug: selectedProgram.slug,
            price: selectedProgram.price,
            paymentType: 'full',
          }),
        });

        const stripeData = await stripeResponse.json();

        if (stripeData.url) {
          // Redirect to Stripe
          window.location.href = stripeData.url;
        } else {
          alert('Error: ' + (stripeData.error || 'Unable to start checkout. Please call 317-314-3757'));
          setIsSubmitting(false);
        }
      } else {
        alert('Error submitting form. Please call 317-314-3757');
        setIsSubmitting(false);
      }
    } catch (error) {
      alert('Error: Please call 317-314-3757 to complete your enrollment');
      setIsSubmitting(false);
    }
  };

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(selectedProgram.price);

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Video Hero */}
      <section className="relative h-[300px] w-full overflow-hidden bg-slate-900">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/barber-hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-slate-900/60" />
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-4xl mx-auto px-4 text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Enroll & Pay
            </h1>
            <p className="text-xl">
              Complete the form below to proceed to payment
            </p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              Your Information
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* First Name */}
              <div>
                <label htmlFor="firstName" className="block text-sm font-bold text-slate-900 mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Last Name */}
              <div>
                <label htmlFor="lastName" className="block text-sm font-bold text-slate-900 mb-2">
                  Last Name *
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-bold text-slate-900 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-bold text-slate-900 mb-2">
                  Phone *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Program */}
              <div>
                <label htmlFor="program" className="block text-sm font-bold text-slate-900 mb-2">
                  Select Program *
                </label>
                <select
                  id="program"
                  name="program"
                  value={formData.program}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {PROGRAMS.map((program) => (
                    <option key={program.id} value={program.id}>
                      {program.label} - {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD',
                        maximumFractionDigits: 0,
                      }).format(program.price)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Total */}
              <div className="bg-slate-50 rounded-lg p-6">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-slate-900">Total:</span>
                  <span className="text-3xl font-bold text-blue-700">{formattedPrice}</span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-4 bg-blue-600 text-white text-xl font-bold rounded-lg hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Processing...' : 'Continue to Payment'}
              </button>

              <p className="text-sm text-slate-500 text-center">
                🔒 You'll be redirected to secure Stripe checkout
              </p>
            </form>
          </div>

          {/* Contact */}
          <div className="text-center mt-8">
            <p className="text-slate-600 mb-2">Need help?</p>
            <a href="tel:3173143757" className="text-2xl font-bold text-orange-600 hover:text-orange-700">
              Call 317-314-3757
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
