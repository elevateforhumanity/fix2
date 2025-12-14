'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ApprenticeshipBadge } from '@/components/programs/ApprenticeshipBadge';

function ApplyForm() {
  const [programParam, setProgramParam] = useState<string>('');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    program: '',
    message: '',
    state_code: 'IN', // Indiana-locked
  });
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle');

  // Get program from URL on mount (client-side only)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const program = params.get('program');
    if (program) {
      setProgramParam(program);
      setFormData((prev) => ({ ...prev, program }));
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      // Split name into first and last
      const nameParts = formData.name.trim().split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';

      // If program selected, auto-enroll and redirect to dashboard
      if (formData.program) {
        const response = await fetch('/api/apply', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            first_name: firstName,
            last_name: lastName,
            email: formData.email,
            phone: formData.phone,
            program_slug: formData.program,
            notes: formData.message,
          }),
        });

        const result = await response.json();

        if (result.ok) {
          // Redirect to Stripe checkout (for Elevate to pay) or success page
          window.location.href = result.checkoutUrl || result.redirectUrl;
          return;
        } else {
          throw new Error(result.error || 'Failed to process enrollment');
        }
      }

      // No program - just inquiry
      const response = await fetch('/api/hubspot/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstname: firstName,
          lastname: lastName,
          email: formData.email,
          phone: formData.phone,
          program: formData.program,
          message: formData.message,
          source: 'website-inquiry',
        }),
      });

      const result = await response.json();

      if (result.ok) {
        setStatus('success');
        setTimeout(() => {
          setFormData({
            name: '',
            email: '',
            phone: '',
            program: programParam || '',
            message: '',
          });
          setStatus('idle');
        }, 3000);
      } else {
        // Fallback to mailto if HubSpot fails
        const subject = encodeURIComponent(
          `Application Inquiry from ${formData.name}`
        );
        const body = encodeURIComponent(
          `Name: ${formData.name}\n` +
            `Email: ${formData.email}\n` +
            `Phone: ${formData.phone}\n` +
            `Program Interest: ${formData.program}\n\n` +
            `Message:\n${formData.message}`
        );
        window.location.href = `mailto:elevate4humanityedu@gmail.com?subject=${subject}&body=${body}`;
        setStatus('success');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero Section - Image Only */}
      <section className="relative h-[300px] overflow-hidden">
        <Image
          src="/images/heroes/contact-hero.jpg"
          alt="Talk to an advisor"
          fill
          className="object-cover"
          priority
          quality={90}
        />
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Talk to an Advisor
          </h1>
          <p className="text-xl text-slate-700 mb-6">
            Let's discuss your goals and find the right training program for
            you.
          </p>
          <p className="text-lg text-slate-600">
            Call us at{' '}
            <a
              href="tel:3173143757"
              className="font-bold text-orange-600 hover:text-orange-700"
            >
              317-314-3757
            </a>{' '}
            or fill out the form below.
          </p>
        </div>

        {/* Show RAPIDS badge for barber program */}
        {(programParam === 'barber-apprenticeship' || formData.program === 'barber') && (
          <div className="mb-8">
            <ApprenticeshipBadge />
          </div>
        )}

        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-8">
          {status === 'success' ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">✓</span>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">
                Message Sent!
              </h2>
              <p className="text-slate-600 mb-6">
                An advisor will contact you within 1-2 business days.
              </p>
              <button
                onClick={() => setStatus('idle')}
                className="px-6 py-3 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold text-slate-900 mb-2"
                >
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-slate-900 mb-2"
                >
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-semibold text-slate-900 mb-2"
                >
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  required
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="(555) 123-4567"
                />
              </div>

              <div>
                <label
                  htmlFor="program"
                  className="block text-sm font-semibold text-slate-900 mb-2"
                >
                  Program of Interest
                </label>
                <select
                  id="program"
                  value={formData.program}
                  onChange={(e) =>
                    setFormData({ ...formData, program: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="">Select a program...</option>
                  <optgroup label="Main Programs">
                    <option value="barber">Barber Apprenticeship</option>
                    <option value="dsp">Direct Support Professional (DSP)</option>
                    <option value="hvac">HVAC Technician</option>
                    <option value="ehst">Emergency Health & Safety Tech</option>
                    <option value="esth">Professional Esthetician</option>
                    <option value="prc">Peer Recovery Coach</option>
                    <option value="tax">Tax Prep & Financial Services</option>
                    <option value="biz">Business Startup & Marketing</option>
                  </optgroup>
                  
                  <optgroup label="Micro Courses (Partner Programs)">
                    <option value="cpr">CPR Certification</option>
                    <option value="osha-10">OSHA 10-Hour Safety</option>
                    <option value="forklift">Forklift Operator</option>
                    <option value="first-aid">First Aid Certification</option>
                  </optgroup>
                  
                  <option value="other">Other / Not Sure</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-semibold text-slate-900 mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Tell us about your goals and any questions you have..."
                />
              </div>

              {/* Hidden Indiana lock */}
              <input type="hidden" name="state_code" value="IN" />

              {status === 'error' && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-800">
                    Something went wrong. Please try again or call us at
                    317-314-3757.
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full px-6 py-4 bg-orange-600 text-white font-bold text-lg rounded-lg hover:bg-orange-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? 'Sending...' : 'Send Message'}
              </button>

              <p className="text-sm text-slate-600 text-center">
                By submitting an application, you acknowledge that all platform systems, program structures, and instructional workflows are the intellectual property of Elevate for Humanity.
              </p>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}

export default function TalkToAdvisorPage() {
  return <ApplyForm />;
}
