'use client';

import { useState } from 'react';
import { CheckCircle, FileText, Award, Clock } from 'lucide-react';


export default function TaxPreparerApplication() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Info
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',

    // Credentials
    hasPTIN: '',
    ptinNumber: '',
    hasEFIN: '',
    efinNumber: '',
    credentials: [] as string[],
    yearsExperience: '',

    // Availability
    availability: '',
    preferredLocation: '',
    startDate: '',

    // Software Experience
    softwareExperience: [] as string[],

    // Background
    hasConviction: '',
    convictionDetails: '',

    // Resume
    resumeFile: null as File | null,
  });

  const handleSubmit = async () => {
    // Submit application
    alert(
      'Application submitted! You will receive an email with next steps including the competency test.'
    );
  };

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-6">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    step >= s
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-300 text-gray-600'
                  }`}
                >
                  {s}
                </div>
                {s < 4 && (
                  <div
                    className={`h-1 flex-1 ${step > s ? 'bg-green-600' : 'bg-gray-300'}`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-sm">
            <span>Personal</span>
            <span>Credentials</span>
            <span>Experience</span>
            <span>Review</span>
          </div>
        </div>

        {/* Step 1: Personal Info */}
        {step === 1 && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Personal Information</h2>
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                    className="w-full px-4 py-3 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                    className="w-full px-4 py-3 border rounded-lg"
                  />
                </div>
              </div>
              <div>
                <label className="block font-semibold mb-2">Email *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-4 py-3 border rounded-lg"
                />
              </div>
              <div>
                <label className="block font-semibold mb-2">Phone *</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full px-4 py-3 border rounded-lg"
                />
              </div>
            </div>
            <button
              onClick={() => setStep(2)}
              className="mt-8 w-full bg-green-600 text-white py-4 rounded-lg font-bold hover:bg-green-700"
            >
              Continue
            </button>
          </div>
        )}

        {/* Step 2: Credentials */}
        {step === 2 && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6">
              Tax Preparer Credentials
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block font-semibold mb-2">
                  Do you have a PTIN? *
                </label>
                <select
                  value={formData.hasPTIN}
                  onChange={(e) =>
                    setFormData({ ...formData, hasPTIN: e.target.value })
                  }
                  className="w-full px-4 py-3 border rounded-lg"
                >
                  <option value="">Select...</option>
                  <option value="yes">Yes, I have a current PTIN</option>
                  <option value="expired">Yes, but it's expired</option>
                  <option value="no">No, I don't have a PTIN</option>
                </select>
              </div>

              {formData.hasPTIN === 'yes' && (
                <div>
                  <label className="block font-semibold mb-2">
                    PTIN Number
                  </label>
                  <input
                    type="text"
                    value={formData.ptinNumber}
                    onChange={(e) =>
                      setFormData({ ...formData, ptinNumber: e.target.value })
                    }
                    className="w-full px-4 py-3 border rounded-lg"
                    placeholder="P12345678"
                  />
                </div>
              )}

              <div>
                <label className="block font-semibold mb-3">
                  Professional Credentials (check all that apply)
                </label>
                <div className="space-y-2">
                  {[
                    'Enrolled Agent (EA)',
                    'CPA',
                    'IRS Annual Filing Season Program',
                    'Tax Law Degree',
                    'None',
                  ].map((cred) => (
                    <label key={cred} className="flex items-center gap-2">
                      <input type="checkbox" className="w-5 h-5" />
                      <span>{cred}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-2">
                  Years of Tax Preparation Experience *
                </label>
                <select
                  value={formData.yearsExperience}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      yearsExperience: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 border rounded-lg"
                >
                  <option value="">Select...</option>
                  <option value="0">No experience</option>
                  <option value="1-2">1-2 years</option>
                  <option value="3-5">3-5 years</option>
                  <option value="5+">5+ years</option>
                </select>
              </div>
            </div>
            <div className="flex gap-4 mt-8">
              <button
                onClick={() => setStep(1)}
                className="flex-1 bg-gray-300 text-gray-700 py-4 rounded-lg font-bold hover:bg-gray-400"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="flex-1 bg-green-600 text-white py-4 rounded-lg font-bold hover:bg-green-700"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Experience */}
        {step === 3 && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6">
              Experience & Availability
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block font-semibold mb-3">
                  Tax Software Experience (check all that apply)
                </label>
                <div className="space-y-2">
                  {[
                    'Drake',
                    'ProSeries',
                    'Lacerte',
                    'TurboTax',
                    'H&R Block',
                    'TaxAct',
                    'Other',
                  ].map((software) => (
                    <label key={software} className="flex items-center gap-2">
                      <input type="checkbox" className="w-5 h-5" />
                      <span>{software}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-2">
                  Availability *
                </label>
                <select
                  value={formData.availability}
                  onChange={(e) =>
                    setFormData({ ...formData, availability: e.target.value })
                  }
                  className="w-full px-4 py-3 border rounded-lg"
                >
                  <option value="">Select...</option>
                  <option value="seasonal">Seasonal (Jan-April only)</option>
                  <option value="year-round">Year-round</option>
                  <option value="part-time">Part-time</option>
                  <option value="full-time">Full-time</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-2">
                  Preferred Work Location *
                </label>
                <select
                  value={formData.preferredLocation}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      preferredLocation: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 border rounded-lg"
                >
                  <option value="">Select...</option>
                  <option value="remote">100% Remote</option>
                  <option value="hybrid">Hybrid</option>
                  <option value="in-office">In-office (Indianapolis)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-2">
                  Upload Resume/CV *
                </label>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="w-full px-4 py-3 border rounded-lg"
                />
              </div>
            </div>
            <div className="flex gap-4 mt-8">
              <button
                onClick={() => setStep(2)}
                className="flex-1 bg-gray-300 text-gray-700 py-4 rounded-lg font-bold hover:bg-gray-400"
              >
                Back
              </button>
              <button
                onClick={() => setStep(4)}
                className="flex-1 bg-green-600 text-white py-4 rounded-lg font-bold hover:bg-green-700"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Review & Submit */}
        {step === 4 && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Review & Submit</h2>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
              <h3 className="font-bold text-lg mb-3">
                Next Steps After Submission:
              </h3>
              <ol className="list-decimal pl-6 space-y-2 text-sm">
                <li>
                  You'll receive an email with a link to our{' '}
                  <strong>Competency Test</strong>
                </li>
                <li>
                  The test covers basic tax knowledge (30 questions, 45 minutes)
                </li>
                <li>Passing score: 80% or higher</li>
                <li>After passing, we'll schedule your interview</li>
                <li>Background check and reference verification</li>
                <li>Onboarding and training begins!</li>
              </ol>
            </div>

            <button
              onClick={handleSubmit}
              className="w-full bg-green-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-green-700"
            >
              Submit Application
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
