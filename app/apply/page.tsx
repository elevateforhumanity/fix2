// app/apply/page.tsx
'use client';

import EnrollmentProcess from '@/components/EnrollmentProcess';
import { useState } from 'react';
import Image from 'next/image';
import { BotProtection } from '@/components/security';

export const metadata: Metadata = {
  alternates: {
    canonical: "https://www.elevateforhumanity.org/apply",
  },
  title: 'Apply | Elevate For Humanity',
  description: 'Explore Apply and discover opportunities for career growth and development at Elevate For Humanity.',
};


export default function ApplyPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [honeypot, setHoneypot] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Bot detection checks
    if (honeypot !== '') {
      console.log('Bot detected: honeypot filled');
      return;
    }
    
    if (!isVerified) {
      alert('Please complete the verification to submit your application.');
      return;
    }
    
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      phone: formData.get('phone'),
      email: formData.get('email'),
      city: formData.get('city'),
      state: formData.get('state'),
      program: formData.get('program'),
      background: formData.get('background'),
      contactPreference: formData.getAll('contactPreference'),
    };

    try {
      const response = await fetch('/api/application', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        alert('There was an error submitting your application. Please call us at 317-314-3757.');
      }
    } catch (error) {
      alert('There was an error submitting your application. Please call us at 317-314-3757.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <section className="relative h-[400px] sm:h-[500px] md:h-[600px] overflow-hidden bg-gradient-to-br from-blue-900 to-blue-700">
        <Image
          src="/media/students-hero.jpg"
          alt="Start your career training journey - Apply for free programs"
          fill
          className="object-cover"
          priority
          quality={95}
          sizes="100vw"
        />
      </section>

      {/* Application Form Section */}
      <section className="bg-slate-50 py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <header className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-wide text-orange-600">
              Application
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
              Apply to Elevate for Humanity
            </h1>
            <p className="mt-3 text-sm text-slate-700">
              This form helps us learn who you are, what you&apos;re interested in,
              and what kinds of support you may need. After you submit, an advisor
              will follow up to talk about programs and funding options.
            </p>
            <p className="mt-4 text-sm text-slate-900">
              <strong>Questions?</strong> Call us at{' '}
              <a href="tel:3173143757" className="text-orange-600 font-semibold hover:underline">
                317-314-3757
              </a>
            </p>
          </header>

        {isSubmitted ? (
          <section className="rounded-2xl bg-green-50 p-8 shadow-sm ring-1 ring-green-200 text-center">
            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Application Submitted!</h2>
            <p className="text-slate-700 mb-4">
              Thank you for applying. An advisor will contact you within 1-2 business days to discuss your program options and next steps.
            </p>
            <p className="text-sm text-slate-600">
              Need immediate assistance? Call us at{' '}
              <a href="tel:3173143757" className="text-red-600 font-semibold hover:underline">
                317-314-3757
              </a>
            </p>
          </section>
        ) : (
          <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <form
              onSubmit={handleSubmit}
              className="space-y-5 text-sm text-slate-800"
            >
            {/* Contact info */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-xs font-semibold text-slate-900"
                >
                  First Name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-xs font-semibold text-slate-900"
                >
                  Last Name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
                  required
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="phone"
                  className="block text-xs font-semibold text-slate-900"
                >
                  Phone Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-semibold text-slate-900"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
                />
              </div>
            </div>

            {/* Location */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="city"
                  className="block text-xs font-semibold text-slate-900"
                >
                  City
                </label>
                <input
                  id="city"
                  name="city"
                  className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
                />
              </div>
              <div>
                <label
                  htmlFor="zip"
                  className="block text-xs font-semibold text-slate-900"
                >
                  ZIP Code
                </label>
                <input
                  id="zip"
                  name="zip"
                  className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
                />
              </div>
            </div>

            {/* Program interest */}
            <div>
              <label
                htmlFor="program"
                className="block text-xs font-semibold text-slate-900"
              >
                Program You&apos;re Most Interested In
              </label>
              <select
                id="program"
                name="program"
                className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
                defaultValue=""
                required
              >
                <option value="" disabled>
                  Select a program
                </option>
                <optgroup label="Healthcare">
                  <option value="medical-assistant">Medical Assistant</option>
                  <option value="cna">Certified Nursing Assistant (CNA)</option>
                  <option value="pharmacy-technician">Pharmacy Technician</option>
                  <option value="dental-assistant">Dental Assistant</option>
                  <option value="phlebotomy">Phlebotomy Technician</option>
                  <option value="patient-care-technician">Patient Care Technician</option>
                  <option value="ekg-technician">EKG Technician</option>
                  <option value="sterile-processing">Sterile Processing Technician</option>
                  <option value="peer-recovery-coach">Peer Recovery Coach</option>
                  <option value="peer-support-professional">Peer Support Professional</option>
                  <option value="emergency-health-safety-tech">Emergency Health & Safety Tech</option>
                </optgroup>
                <optgroup label="Beauty & Barbering">
                  <option value="barber-apprenticeship">Barber Apprenticeship</option>
                  <option value="professional-esthetician">Professional Esthetician</option>
                  <option value="esthetics-apprenticeship">Esthetics Apprenticeship</option>
                  <option value="beauty-career-educator">Beauty Career Educator</option>
                </optgroup>
                <optgroup label="Skilled Trades">
                  <option value="hvac-technician">HVAC Technician</option>
                  <option value="building-maintenance">Building Maintenance Technician</option>
                  <option value="building-tech">Building Technology</option>
                </optgroup>
                <optgroup label="Transportation">
                  <option value="cdl">Commercial Driver's License (CDL)</option>
                  <option value="truck-driving">Truck Driving</option>
                </optgroup>
                <optgroup label="Business & Professional">
                  <option value="tax-prep-financial-services">Tax Prep & Financial Services</option>
                  <option value="business-startup-marketing">Business Start-Up & Marketing</option>
                  <option value="business-apprenticeship">Business Apprenticeship</option>
                  <option value="workforce-readiness">Workforce Readiness</option>
                </optgroup>
                <optgroup label="Other Programs">
                  <option value="childcare">Childcare & Early Education</option>
                  <option value="cpr-certification">CPR & First Aid Certification</option>
                  <option value="rise-up">Rise Up Program</option>
                  <option value="other">Other / Not sure yet</option>
                </optgroup>
              </select>
            </div>

            {/* Background / barriers */}
            <div>
              <label
                htmlFor="background"
                className="block text-xs font-semibold text-slate-900"
              >
                Anything we should know to better support you?
              </label>
              <p className="mt-1 text-[0.7rem] text-slate-500">
                (Optional) For example: justice involvement, housing needs,
                childcare, transportation, technology access, or anything else
                you&apos;re comfortable sharing.
              </p>
              <textarea
                id="background"
                name="background"
                rows={4}
                className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
              />
            </div>

            {/* Contact preference */}
            <div>
              <span className="block text-xs font-semibold text-slate-900">
                Best way to contact you
              </span>
              <div className="mt-2 flex flex-wrap gap-4 text-xs text-slate-700">
                <label className="inline-flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="contactPreference"
                    value="call"
                    className="h-3.5 w-3.5 rounded border-slate-300 text-red-600 focus:ring-red-500"
                  />
                  Phone Call
                </label>
                <label className="inline-flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="contactPreference"
                    value="text"
                    className="h-3.5 w-3.5 rounded border-slate-300 text-red-600 focus:ring-red-500"
                  />
                  Text Message
                </label>
                <label className="inline-flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="contactPreference"
                    value="email"
                    className="h-3.5 w-3.5 rounded border-slate-300 text-red-600 focus:ring-red-500"
                  />
                  Email
                </label>
              </div>
            </div>

            {/* Bot Protection */}
            <BotProtection
              onVerify={setIsVerified}
              honeypotValue={honeypot}
              onHoneypotChange={setHoneypot}
            />

            {/* Submit note */}
            <p className="text-[0.7rem] text-slate-500">
              By submitting this form, you are giving Elevate for Humanity
              permission to contact you about training, funding, and support
              services. This is not a credit application and will not impact
              your credit score.
            </p>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting || !isVerified}
                className="inline-flex items-center justify-center rounded-full bg-red-600 px-6 py-2 text-xs font-semibold text-white shadow-sm hover:bg-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </button>
            </div>
          </form>
        </section>
        )}
        </div>
      </section>
    
      <EnrollmentProcess />
    </main>
  );
}
