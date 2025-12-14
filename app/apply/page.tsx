'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';

function ApplyForm() {
  const searchParams = useSearchParams();
  const programParam = searchParams.get('program');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    program: programParam || '',
    message: '',
  });
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle');

  // Update program field when URL parameter changes
  useEffect(() => {
    if (programParam && !formData.program) {
      setFormData((prev) => ({ ...prev, program: programParam }));
    }
  }, [programParam, formData.program]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      // Split name into first and last
      const nameParts = formData.name.trim().split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';

      // If program selected, auto-enroll and redirect to payment
      if (formData.program) {
        const response = await fetch('/api/enroll/auto', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            firstName,
            lastName,
            email: formData.email,
            phone: formData.phone,
            programSlug: formData.program,
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
                  <option value="barber-apprenticeship">Barber Apprenticeship</option>
                  <option value="cna">CNA Training</option>
                  <option value="direct-support-professional">
                    Direct Support Professional (DSP)
                  </option>
                  <option value="hvac">HVAC Technician</option>
                  <option value="cdl">CDL Training</option>
                  <option value="tax-prep">Tax Preparation</option>
                  <option value="business">Business Startup</option>
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
                By submitting this form, you agree to be contacted by Elevate
                for Humanity about training programs.
              </p>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}

export default function TalkToAdvisorPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="text-xl">Loading application...</div></div>}>
      <ApplyForm />
    </Suspense>
  );
}
