'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, ExternalLink } from 'lucide-react';

export default function ProgramsCatalogPage() {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <main className="bg-white">
      {/* Hero */}
      <section className="relative h-[400px] md:h-[450px] w-full overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster="/images/programs/hvac-hero.jpg"
        >
          <source src="/videos/programs-overview-video.mp4" type="video/mp4" />
        </video>
        
        <div className="absolute inset-0 flex items-center justify-center text-center px-4">
          <div className="max-w-4xl w-full">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white uppercase tracking-wide">
              COMPLETE PROGRAMS CATALOG
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl font-semibold text-white">
              All Programs - State, Federal & Partner Programs
            </p>
          </div>
        </div>
      </section>

      {/* Programs Catalog */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* STATE PROGRAMS */}
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 uppercase">State Programs</h2>
            
            {/* WRG */}
            <div className="border-2 border-gray-200 rounded-lg overflow-hidden mb-4">
              <button
                onClick={() => toggleSection('wrg')}
                className="w-full flex items-center justify-between p-6 bg-white hover:bg-gray-50 transition"
              >
                <div className="text-left">
                  <h3 className="text-xl font-bold text-gray-900">WRG (Workforce Readiness & Growth)</h3>
                  <p className="text-sm text-gray-600">Indiana state-funded wraparound support</p>
                </div>
                <ChevronDown className={`w-6 h-6 transition-transform ${openSection === 'wrg' ? 'rotate-180' : ''}`} />
              </button>
              {openSection === 'wrg' && (
                <div className="p-6 bg-gray-50 border-t-2 border-gray-200">
                  <p className="text-gray-700 mb-4">Support services to help you complete training successfully</p>
                  <div className="bg-white rounded-lg p-4">
                    <p className="text-sm text-gray-600">Contact your advisor for WRG eligibility</p>
                  </div>
                </div>
              )}
            </div>

            {/* Indiana DWD Apprenticeships */}
            <div className="border-2 border-gray-200 rounded-lg overflow-hidden mb-4">
              <button
                onClick={() => toggleSection('dwd')}
                className="w-full flex items-center justify-between p-6 bg-white hover:bg-gray-50 transition"
              >
                <div className="text-left">
                  <h3 className="text-xl font-bold text-gray-900">Indiana DWD Registered Apprenticeships</h3>
                  <p className="text-sm text-gray-600">State-registered apprenticeships with paid OJT</p>
                </div>
                <ChevronDown className={`w-6 h-6 transition-transform ${openSection === 'dwd' ? 'rotate-180' : ''}`} />
              </button>
              {openSection === 'dwd' && (
                <div className="p-6 bg-gray-50 border-t-2 border-gray-200">
                  <div className="grid md:grid-cols-2 gap-4">
                    <Link href="/programs/barber-apprenticeship" className="bg-white rounded-lg p-4 hover:shadow-lg transition">
                      <h4 className="font-bold text-gray-900 mb-2">Barber Apprenticeship</h4>
                      <p className="text-sm text-gray-600 mb-2">15-17 months • Earn while you learn</p>
                      <p className="text-green-600 font-bold">100% FREE</p>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* FEDERAL PROGRAMS */}
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 uppercase">Federal Programs</h2>
            
            {/* WIOA */}
            <div className="border-2 border-gray-200 rounded-lg overflow-hidden mb-4">
              <button
                onClick={() => toggleSection('wioa')}
                className="w-full flex items-center justify-between p-6 bg-white hover:bg-gray-50 transition"
              >
                <div className="text-left">
                  <h3 className="text-xl font-bold text-gray-900">WIOA (Workforce Innovation & Opportunity Act)</h3>
                  <p className="text-sm text-gray-600">Federal workforce funding for eligible participants</p>
                </div>
                <ChevronDown className={`w-6 h-6 transition-transform ${openSection === 'wioa' ? 'rotate-180' : ''}`} />
              </button>
              {openSection === 'wioa' && (
                <div className="p-6 bg-gray-50 border-t-2 border-gray-200">
                  <div className="grid md:grid-cols-3 gap-4">
                    <Link href="/programs/cna-certification" className="bg-white rounded-lg p-4 hover:shadow-lg transition">
                      <h4 className="font-bold text-gray-900 mb-2">CNA / HHA</h4>
                      <p className="text-sm text-gray-600 mb-2">4-8 weeks • Healthcare</p>
                      <p className="text-green-600 font-bold">100% FREE with WIOA</p>
                    </Link>
                    <Link href="/programs/cdl-training" className="bg-white rounded-lg p-4 hover:shadow-lg transition">
                      <h4 className="font-bold text-gray-900 mb-2">CDL Training</h4>
                      <p className="text-sm text-gray-600 mb-2">3-6 weeks • Transportation</p>
                      <p className="text-green-600 font-bold">100% FREE with WIOA</p>
                    </Link>
                    <Link href="/programs/hvac-technician" className="bg-white rounded-lg p-4 hover:shadow-lg transition">
                      <h4 className="font-bold text-gray-900 mb-2">HVAC Technician</h4>
                      <p className="text-sm text-gray-600 mb-2">16-24 weeks • Industrial</p>
                      <p className="text-green-600 font-bold">100% FREE with WIOA</p>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* DOL Apprenticeships */}
            <div className="border-2 border-gray-200 rounded-lg overflow-hidden mb-4">
              <button
                onClick={() => toggleSection('dol')}
                className="w-full flex items-center justify-between p-6 bg-white hover:bg-gray-50 transition"
              >
                <div className="text-left">
                  <h3 className="text-xl font-bold text-gray-900">DOL Registered Apprenticeships</h3>
                  <p className="text-sm text-gray-600">U.S. Department of Labor registered programs</p>
                </div>
                <ChevronDown className={`w-6 h-6 transition-transform ${openSection === 'dol' ? 'rotate-180' : ''}`} />
              </button>
              {openSection === 'dol' && (
                <div className="p-6 bg-gray-50 border-t-2 border-gray-200">
                  <div className="grid md:grid-cols-2 gap-4">
                    <Link href="/programs/barber-apprenticeship" className="bg-white rounded-lg p-4 hover:shadow-lg transition">
                      <h4 className="font-bold text-gray-900 mb-2">Barber Apprenticeship</h4>
                      <p className="text-sm text-gray-600 mb-2">15-17 months • DOL #1234567</p>
                      <p className="text-green-600 font-bold">Earn while you learn</p>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* PARTNER PROGRAMS */}
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 uppercase">Partner Programs</h2>
            <p className="text-lg text-gray-700 mb-8">White-labeled certification programs from industry partners. Can be FREE with WIOA funding or self-pay with pricing shown.</p>
            
            {/* Healthcare Partners */}
            <div className="border-2 border-gray-200 rounded-lg overflow-hidden mb-4">
              <button
                onClick={() => toggleSection('healthcare-partners')}
                className="w-full flex items-center justify-between p-6 bg-white hover:bg-gray-50 transition"
              >
                <div className="text-left">
                  <h3 className="text-xl font-bold text-gray-900">Healthcare Certifications</h3>
                  <p className="text-sm text-gray-600">AHIMA, NHA, and other healthcare partners</p>
                </div>
                <ChevronDown className={`w-6 h-6 transition-transform ${openSection === 'healthcare-partners' ? 'rotate-180' : ''}`} />
              </button>
              {openSection === 'healthcare-partners' && (
                <div className="p-6 bg-gray-50 border-t-2 border-gray-200">
                  <div className="grid md:grid-cols-2 gap-4">
                    <a href="https://www.ahima.org" target="_blank" rel="noopener noreferrer" className="bg-white rounded-lg p-4 hover:shadow-lg transition">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-bold text-gray-900">RHIA - Health Information Administrator</h4>
                        <ExternalLink className="w-4 h-4 text-gray-400" />
                      </div>
                      <p className="text-sm text-gray-600 mb-2">12-16 weeks • AHIMA</p>
                      <p className="text-green-600 font-bold mb-1">FREE with WIOA</p>
                      <p className="text-gray-600 text-sm">Self-pay: $449</p>
                    </a>
                    <a href="https://www.nhanow.com" target="_blank" rel="noopener noreferrer" className="bg-white rounded-lg p-4 hover:shadow-lg transition">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-bold text-gray-900">Certified Medical Assistant</h4>
                        <ExternalLink className="w-4 h-4 text-gray-400" />
                      </div>
                      <p className="text-sm text-gray-600 mb-2">8-12 weeks • NHA</p>
                      <p className="text-green-600 font-bold mb-1">FREE with WIOA</p>
                      <p className="text-gray-600 text-sm">Self-pay: $299</p>
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Technology Partners */}
            <div className="border-2 border-gray-200 rounded-lg overflow-hidden mb-4">
              <button
                onClick={() => toggleSection('tech-partners')}
                className="w-full flex items-center justify-between p-6 bg-white hover:bg-gray-50 transition"
              >
                <div className="text-left">
                  <h3 className="text-xl font-bold text-gray-900">Technology Certifications</h3>
                  <p className="text-sm text-gray-600">CompTIA, Microsoft, Google, and other tech partners</p>
                </div>
                <ChevronDown className={`w-6 h-6 transition-transform ${openSection === 'tech-partners' ? 'rotate-180' : ''}`} />
              </button>
              {openSection === 'tech-partners' && (
                <div className="p-6 bg-gray-50 border-t-2 border-gray-200">
                  <div className="grid md:grid-cols-2 gap-4">
                    <a href="https://www.comptia.org" target="_blank" rel="noopener noreferrer" className="bg-white rounded-lg p-4 hover:shadow-lg transition">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-bold text-gray-900">CompTIA A+</h4>
                        <ExternalLink className="w-4 h-4 text-gray-400" />
                      </div>
                      <p className="text-sm text-gray-600 mb-2">8-12 weeks • CompTIA</p>
                      <p className="text-green-600 font-bold mb-1">FREE with WIOA</p>
                      <p className="text-gray-600 text-sm">Self-pay: $599</p>
                    </a>
                    <a href="https://grow.google/certificates" target="_blank" rel="noopener noreferrer" className="bg-white rounded-lg p-4 hover:shadow-lg transition">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-bold text-gray-900">Google IT Support Certificate</h4>
                        <ExternalLink className="w-4 h-4 text-gray-400" />
                      </div>
                      <p className="text-sm text-gray-600 mb-2">6 months • Google</p>
                      <p className="text-green-600 font-bold mb-1">FREE with WIOA</p>
                      <p className="text-gray-600 text-sm">Self-pay: $399</p>
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Safety Partners */}
            <div className="border-2 border-gray-200 rounded-lg overflow-hidden mb-4">
              <button
                onClick={() => toggleSection('safety-partners')}
                className="w-full flex items-center justify-between p-6 bg-white hover:bg-gray-50 transition"
              >
                <div className="text-left">
                  <h3 className="text-xl font-bold text-gray-900">Safety Certifications</h3>
                  <p className="text-sm text-gray-600">OSHA, HSI, Red Cross, and other safety partners</p>
                </div>
                <ChevronDown className={`w-6 h-6 transition-transform ${openSection === 'safety-partners' ? 'rotate-180' : ''}`} />
              </button>
              {openSection === 'safety-partners' && (
                <div className="p-6 bg-gray-50 border-t-2 border-gray-200">
                  <div className="grid md:grid-cols-3 gap-4">
                    <a href="https://www.osha.gov" target="_blank" rel="noopener noreferrer" className="bg-white rounded-lg p-4 hover:shadow-lg transition">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-bold text-gray-900">OSHA-10</h4>
                        <ExternalLink className="w-4 h-4 text-gray-400" />
                      </div>
                      <p className="text-sm text-gray-600 mb-2">10 hours • OSHA</p>
                      <p className="text-green-600 font-bold mb-1">FREE with WIOA</p>
                      <p className="text-gray-600 text-sm">Self-pay: $99</p>
                    </a>
                    <a href="https://www.hsi.com" target="_blank" rel="noopener noreferrer" className="bg-white rounded-lg p-4 hover:shadow-lg transition">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-bold text-gray-900">CPR & First Aid</h4>
                        <ExternalLink className="w-4 h-4 text-gray-400" />
                      </div>
                      <p className="text-sm text-gray-600 mb-2">4-8 hours • HSI</p>
                      <p className="text-green-600 font-bold mb-1">FREE with WIOA</p>
                      <p className="text-gray-600 text-sm">Self-pay: $79</p>
                    </a>
                    <a href="https://www.redcross.org" target="_blank" rel="noopener noreferrer" className="bg-white rounded-lg p-4 hover:shadow-lg transition">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-bold text-gray-900">Lifeguard Certification</h4>
                        <ExternalLink className="w-4 h-4 text-gray-400" />
                      </div>
                      <p className="text-sm text-gray-600 mb-2">25-30 hours • Red Cross</p>
                      <p className="text-green-600 font-bold mb-1">FREE with WIOA</p>
                      <p className="text-gray-600 text-sm">Self-pay: $299</p>
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}
