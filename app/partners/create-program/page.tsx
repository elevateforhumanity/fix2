'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Rocket, DollarSign, Users, Award, CheckCircle, ArrowRight } from 'lucide-react';

export default function CreateProgramPartnerPage() {
  const [formData, setFormData] = useState({
    organizationName: '',
    contactName: '',
    email: '',
    phone: '',
    programType: '',
    programName: '',
    programDescription: '',
    targetPopulation: '',
    fundingNeeded: '',
    timeline: '',
    experience: '',
    additionalInfo: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/partners/create-program', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSubmitted(true);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-green-50 to-white py-12">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white rounded-2xl border-2 border-green-200 shadow-xl p-8 text-center">
            <div className="w-20 h-20 mx-auto rounded-full bg-green-100 flex items-center justify-center mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            
            <h1 className="text-3xl font-bold text-slate-900 mb-4">
              Application Received!
            </h1>
            
            <p className="text-lg text-slate-600 mb-8">
              Thank you for your interest in partnering with Elevate for Humanity. 
              Our team will review your program proposal and contact you within 2-3 business days.
            </p>

            <div className="bg-blue-50 rounded-xl border-2 border-blue-200 p-6 mb-8 text-left">
              <h3 className="font-bold text-slate-900 mb-3">What Happens Next?</h3>
              <ul className="space-y-3 text-sm text-slate-700">
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold">1.</span>
                  <span><strong>Initial Review</strong> - We'll review your program proposal and funding needs</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold">2.</span>
                  <span><strong>Discovery Call</strong> - Schedule a call to discuss details and answer questions</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold">3.</span>
                  <span><strong>Funding Strategy</strong> - We'll identify WIOA, WRG, or other funding sources</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold">4.</span>
                  <span><strong>Partnership Agreement</strong> - Finalize terms and revenue share structure</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold">5.</span>
                  <span><strong>Program Launch</strong> - Set up your program and start enrolling students</span>
                </li>
              </ul>
            </div>

            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-full bg-green-600 px-8 py-4 text-base font-bold text-white hover:bg-green-700 transition-all shadow-lg"
              >
                Return to Homepage
              </Link>
              <Link
                href="/partners"
                className="inline-flex items-center justify-center rounded-full border-2 border-slate-300 px-8 py-4 text-base font-semibold text-slate-700 hover:bg-slate-50 transition-all"
              >
                Learn More About Partnerships
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4 mb-6">
            <Rocket className="w-16 h-16" />
            <div>
              <h1 className="text-4xl md:text-5xl font-bold">Create a Funded Training Program</h1>
              <p className="text-xl text-blue-100 mt-2">
                Partner with us to launch your program with WIOA, WRG, or other funding
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-slate-900 text-center mb-8">
            Why Partner with Elevate?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-green-50 rounded-xl border-2 border-green-200">
              <DollarSign className="w-12 h-12 text-green-600 mb-4" />
              <h3 className="text-lg font-bold text-slate-900 mb-2">Funding Access</h3>
              <p className="text-sm text-slate-700">
                We help you access WIOA, Workforce Ready Grants, and other state/federal funding sources
              </p>
            </div>

            <div className="p-6 bg-blue-50 rounded-xl border-2 border-blue-200">
              <Users className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-lg font-bold text-slate-900 mb-2">Student Pipeline</h3>
              <p className="text-sm text-slate-700">
                Access our network of motivated students referred by WorkOne, workforce boards, and community partners
              </p>
            </div>

            <div className="p-6 bg-purple-50 rounded-xl border-2 border-purple-200">
              <Award className="w-12 h-12 text-purple-600 mb-4" />
              <h3 className="text-lg font-bold text-slate-900 mb-2">1/3 Revenue Share</h3>
              <p className="text-sm text-slate-700">
                You receive 1/3 of net revenue after books and fees. We handle marketing, enrollment, and compliance
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-2xl border-2 border-slate-200 shadow-lg p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Program Partnership Application</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Organization Information */}
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-4">Organization Information</h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Organization Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.organizationName}
                      onChange={(e) => setFormData({...formData, organizationName: e.target.value})}
                      className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-blue-500 focus:outline-none"
                      placeholder="Your Organization"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Contact Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.contactName}
                      onChange={(e) => setFormData({...formData, contactName: e.target.value})}
                      className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-blue-500 focus:outline-none"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-blue-500 focus:outline-none"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-blue-500 focus:outline-none"
                      placeholder="(317) 555-0123"
                    />
                  </div>
                </div>
              </div>

              {/* Program Details */}
              <div className="border-t border-slate-200 pt-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Program Details</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Program Type *
                    </label>
                    <select
                      required
                      value={formData.programType}
                      onChange={(e) => setFormData({...formData, programType: e.target.value})}
                      className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-blue-500 focus:outline-none"
                    >
                      <option value="">Select program type...</option>
                      <option value="healthcare">Healthcare</option>
                      <option value="trades">Skilled Trades</option>
                      <option value="beauty">Beauty & Wellness</option>
                      <option value="business">Business & Technology</option>
                      <option value="culinary">Culinary & Hospitality</option>
                      <option value="transportation">Transportation & Logistics</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Program Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.programName}
                      onChange={(e) => setFormData({...formData, programName: e.target.value})}
                      className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-blue-500 focus:outline-none"
                      placeholder="e.g., Advanced Welding Certification"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Program Description *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.programDescription}
                      onChange={(e) => setFormData({...formData, programDescription: e.target.value})}
                      className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-blue-500 focus:outline-none"
                      placeholder="Describe your program, curriculum, duration, and outcomes..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Target Population *
                    </label>
                    <select
                      required
                      value={formData.targetPopulation}
                      onChange={(e) => setFormData({...formData, targetPopulation: e.target.value})}
                      className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-blue-500 focus:outline-none"
                    >
                      <option value="">Select target population...</option>
                      <option value="youth">Youth (16-24)</option>
                      <option value="adults">Adults (25+)</option>
                      <option value="dislocated">Dislocated Workers</option>
                      <option value="reentry">Re-entry Participants</option>
                      <option value="veterans">Veterans</option>
                      <option value="all">All Populations</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Funding & Timeline */}
              <div className="border-t border-slate-200 pt-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Funding & Timeline</h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Funding Needed Per Student *
                    </label>
                    <select
                      required
                      value={formData.fundingNeeded}
                      onChange={(e) => setFormData({...formData, fundingNeeded: e.target.value})}
                      className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-blue-500 focus:outline-none"
                    >
                      <option value="">Select range...</option>
                      <option value="under-1000">Under $1,000</option>
                      <option value="1000-2500">$1,000 - $2,500</option>
                      <option value="2500-5000">$2,500 - $5,000</option>
                      <option value="5000-10000">$5,000 - $10,000</option>
                      <option value="over-10000">Over $10,000</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Desired Launch Timeline *
                    </label>
                    <select
                      required
                      value={formData.timeline}
                      onChange={(e) => setFormData({...formData, timeline: e.target.value})}
                      className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-blue-500 focus:outline-none"
                    >
                      <option value="">Select timeline...</option>
                      <option value="immediate">Immediate (1-2 months)</option>
                      <option value="short">Short-term (3-6 months)</option>
                      <option value="medium">Medium-term (6-12 months)</option>
                      <option value="long">Long-term (12+ months)</option>
                    </select>
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Your Experience *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={formData.experience}
                    onChange={(e) => setFormData({...formData, experience: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-blue-500 focus:outline-none"
                    placeholder="Tell us about your experience delivering training programs..."
                  />
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Additional Information
                  </label>
                  <textarea
                    rows={3}
                    value={formData.additionalInfo}
                    onChange={(e) => setFormData({...formData, additionalInfo: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-blue-500 focus:outline-none"
                    placeholder="Any other details we should know..."
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="border-t border-slate-200 pt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-8 py-4 text-lg font-bold text-white hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-all shadow-lg hover:scale-105"
                >
                  {loading ? (
                    <>
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Partnership Application</span>
                      <ArrowRight className="w-6 h-6" />
                    </>
                  )}
                </button>
                <p className="text-xs text-slate-500 text-center mt-3">
                  By submitting, you agree to our partnership terms and conditions
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
