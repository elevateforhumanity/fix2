'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function EnrollPage() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState('barber-apprentice');

  const programs = [
    { name: 'Barber Apprenticeship', slug: 'barber-apprentice', price: 4890 },
    { name: 'Medical Assistant', slug: 'medical-assistant', price: 4325 },
    { name: 'HVAC Technician', slug: 'hvac-technician', price: 5000 },
    { name: 'CPR Certification', slug: 'cpr-certification', price: 575 },
    { name: 'Emergency Health & Safety Tech', slug: 'emergency-health-safety', price: 4950 },
    { name: 'Professional Esthetician', slug: 'professional-esthetician', price: 4575 },
    { name: 'Peer Recovery Coach', slug: 'peer-recovery-coach', price: 4750 },
    { name: 'Tax Prep & Financial Services', slug: 'tax-prep-financial', price: 4950 },
    { name: 'Business Startup & Marketing', slug: 'business-startup-marketing', price: 4550 },
  ];

  const selectedProgramData = programs.find(p => p.slug === selectedProgram);

  const handlePayNow = async () => {
    if (!selectedProgramData) return;
    
    setIsProcessing(true);

    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          programName: selectedProgramData.name,
          programSlug: selectedProgramData.slug,
          price: selectedProgramData.price,
          paymentType: 'full',
        }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert('Error: ' + (data.error || 'Unable to start checkout'));
        setIsProcessing(false);
      }
    } catch (error) {
      alert('Error connecting to payment system. Call 317-314-3757');
      setIsProcessing(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="relative h-[300px] w-full overflow-hidden">
        <Image
          src="/images/heroes/success-story-2.jpg"
          alt="Enroll Now"
          fill
          className="object-cover"
          priority
          quality={90}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-slate-900/60" />
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-4xl mx-auto px-4 text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Enroll in Training
            </h1>
            <p className="text-xl">
              Choose your program and payment option
            </p>
          </div>
        </div>
      </section>

      {/* Enrollment Form */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
                {/* FREE Option */}
                <div className="bg-white rounded-lg border-2 border-green-500 p-8">
                  <div className="text-3xl font-bold text-green-700 mb-4">Apply for FREE Training</div>
                  <p className="text-lg text-slate-700 mb-4">
                    Most students qualify for 100% free training through:
                  </p>
                  <ul className="space-y-2 mb-6 text-slate-700">
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span><strong>WRG</strong> - Workforce Ready Grant</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span><strong>WIOA</strong> - Workforce Innovation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span><strong>JRI</strong> - Justice Reinvestment</span>
                    </li>
                  </ul>
                  <p className="text-sm text-slate-600 mb-6">
                    No tuition. No debt. We help you apply and handle all paperwork.
                  </p>
                  <Link
                    href="/contact"
                    className="block w-full text-center px-6 py-4 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-all"
                  >
                    Apply for Free Training
                  </Link>
                </div>

                {/* PAID Option */}
                <div className="bg-white rounded-lg border-2 border-blue-500 p-8">
                  <div className="text-3xl font-bold text-blue-700 mb-4">Pay Now & Start</div>
                  
                  <div className="mb-6">
                    <label htmlFor="program" className="block text-sm font-bold text-slate-900 mb-2">
                      Select Program:
                    </label>
                    <select
                      id="program"
                      value={selectedProgram}
                      onChange={(e) => setSelectedProgram(e.target.value)}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {programs.map((program) => (
                        <option key={program.slug} value={program.slug}>
                          {program.name} - ${program.price.toLocaleString()}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-4 mb-6">
                    <p className="text-sm font-semibold text-blue-900 mb-2">💳 Payment Options:</p>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Pay over time with Affirm, Klarna, Afterpay</li>
                      <li>• PayPal, Venmo, Cash App Pay</li>
                      <li>• Credit/debit cards or ACH transfer</li>
                    </ul>
                  </div>

                  {selectedProgramData && (
                    <div className="mb-6">
                      <div className="text-2xl font-bold text-slate-900 mb-2">
                        ${selectedProgramData.price.toLocaleString()}
                      </div>
                      <p className="text-sm text-slate-600">
                        Includes all materials, certifications, and support
                      </p>
                    </div>
                  )}

                  <button
                    onClick={handlePayNow}
                    disabled={isProcessing}
                    className="block w-full text-center px-6 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? 'Loading Checkout...' : 'Pay Now'}
                  </button>
                </div>
              </div>

              <div className="text-center mt-12">
                <p className="text-slate-600 mb-2">Questions?</p>
                <a href="tel:3173143757" className="text-2xl font-bold text-orange-600 hover:text-orange-700">
                  Call 317-314-3757
                </a>
              </div>
            </div>
          </section>
    </main>
  );
}
// Force rebuild Thu Dec 11 01:57:58 UTC 2025
