'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    program: '',
    message: '',
  });
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Create mailto link with form data
    const subject = encodeURIComponent(`Inquiry from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\n` +
        `Email: ${formData.email}\n` +
        `Phone: ${formData.phone}\n` +
        `Program Interest: ${formData.program}\n\n` +
        `Message:\n${formData.message}`
    );

    window.location.href = `mailto:elevate4humanityedu@gmail.com?subject=${subject}&body=${body}`;

    // Show success message
    setStatus('success');
    setTimeout(() => {
      setFormData({ name: '', email: '', phone: '', program: '', message: '' });
      setStatus('idle');
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Simple Hero - No Text */}
      <section className="relative h-[200px] w-full overflow-hidden">
        <Image
          src="/images/facilities-new/facility-8.jpg"
          alt="Contact"
          fill
          className="object-cover"
          priority
          quality={100}
          sizes="100vw"
        />
      </section>

      {/* Inquiry Form */}
      <section className="py-12">
        <div className="max-w-xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-center mb-8">Inquiry Form</h1>

          {status === 'success' && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800 text-center">
              ✓ Message sent! We'll contact you within 24 hours.
            </div>
          )}

          {status === 'error' && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800 text-center">
              Error sending message. Please call 317-314-3757.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-slate-900 mb-1"
              >
                Name *
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
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-slate-900 mb-1"
              >
                Email *
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
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-semibold text-slate-900 mb-1"
              >
                Phone *
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
              />
            </div>

            <div>
              <label
                htmlFor="program"
                className="block text-sm font-semibold text-slate-900 mb-1"
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
                <option value="Barber Apprenticeship">
                  Barber Apprenticeship
                </option>
                <option value="Medical Assistant">Medical Assistant</option>
                <option value="HVAC Technician">HVAC Technician</option>
                <option value="CPR Certification">CPR Certification</option>
                <option value="Emergency Health & Safety Tech">
                  Emergency Health & Safety Tech
                </option>
                <option value="Professional Esthetician">
                  Professional Esthetician
                </option>
                <option value="Peer Recovery Coach">Peer Recovery Coach</option>
                <option value="Tax Prep & Financial Services">
                  Tax Prep & Financial Services
                </option>
                <option value="Business Startup & Marketing">
                  Business Startup & Marketing
                </option>
                <option value="Not sure yet">Not sure yet</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-semibold text-slate-900 mb-1"
              >
                Message *
              </label>
              <textarea
                id="message"
                required
                rows={5}
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Tell us about yourself and what you're looking for..."
              />
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full px-8 py-4 bg-brand-orange-600 text-white font-bold rounded-lg hover:bg-brand-orange-700 transition-all disabled:bg-slate-400 disabled:cursor-not-allowed text-lg"
            >
              {status === 'loading' ? 'Sending...' : 'Submit Inquiry'}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-200 text-center text-sm text-slate-600">
            <p>
              Or call us:{' '}
              <a
                href="tel:3173143757"
                className="text-brand-orange-600 font-semibold"
              >
                317-314-3757
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
