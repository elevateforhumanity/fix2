"use client";

import React from 'react';

import { useState } from 'react';
import { CheckCircle, FileText, Award, Clock } from 'lucide-react';


export default function TaxPreparerApplication() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Info
    firstName: '',
    lastName: '',
    middleName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    ssn: '',
    dateOfBirth: '',

    // Emergency Contact
    emergencyName: '',
    emergencyPhone: '',
    emergencyRelationship: '',

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

    // Payroll Information
    paymentMethod: 'direct_deposit',
    bankName: '',
    accountType: '',
    routingNumber: '',
    accountNumber: '',

    // Tax Withholding (W-4)
    filingStatus: '',
    dependents: '',
    extraWithholding: '',
    claimExempt: false,

    // Required Documents
    resumeFile: null as File | null,
    w4File: null as File | null,
    i9File: null as File | null,
    idFrontFile: null as File | null,
    idBackFile: null as File | null,
    ssnCardFile: null as File | null,
    certificationFile: null as File | null,
    backgroundCheckConsent: false,
    directDepositForm: null as File | null,
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/supersonic-fast-cash/careers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit application');
      }

      const result = await response.json();
      
      // Redirect to competency test
      if (window.confirm('Application submitted successfully! Would you like to take the competency test now?')) {
        window.location.href = '/supersonic-fast-cash/careers/competency-test';
      } else {
        alert('You will receive an email with a link to the competency test within 24 hours.');
      }
    } catch (err) {
      setError('Failed to submit application. Please try again.');
      console.error('Submit error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-6">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4, 5, 6].map((s) => (
              <div key={s} className="flex items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs ${
                    step >= s
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-300 text-gray-600'
                  }`}
                >
                  {s}
                </div>
                {s < 6 && (
                  <div
                    className={`h-1 flex-1 ${step > s ? 'bg-green-600' : 'bg-gray-300'}`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-xs">
            <span>Personal</span>
            <span>Credentials</span>
            <span>Experience</span>
            <span>Payroll</span>
            <span>Documents</span>
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

        {/* Step 4: Payroll & Tax Information */}
        {step === 4 && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6">
              Payroll & Tax Withholding
            </h2>
            <div className="space-y-6">
              {/* Payment Method */}
              <div>
                <label className="block font-semibold mb-2">
                  Payment Method *
                </label>
                <select
                  value={formData.paymentMethod}
                  onChange={(e) =>
                    setFormData({ ...formData, paymentMethod: e.target.value })
                  }
                  className="w-full px-4 py-3 border rounded-lg"
                >
                  <option value="direct_deposit">Direct Deposit (Recommended)</option>
                  <option value="check">Paper Check</option>
                </select>
              </div>

              {formData.paymentMethod === 'direct_deposit' && (
                <>
                  <div>
                    <label className="block font-semibold mb-2">
                      Bank Name *
                    </label>
                    <input
                      type="text"
                      value={formData.bankName}
                      onChange={(e) =>
                        setFormData({ ...formData, bankName: e.target.value })
                      }
                      className="w-full px-4 py-3 border rounded-lg"
                      placeholder="Chase, Bank of America, etc."
                    />
                  </div>

                  <div>
                    <label className="block font-semibold mb-2">
                      Account Type *
                    </label>
                    <select
                      value={formData.accountType}
                      onChange={(e) =>
                        setFormData({ ...formData, accountType: e.target.value })
                      }
                      className="w-full px-4 py-3 border rounded-lg"
                    >
                      <option value="">Select...</option>
                      <option value="checking">Checking</option>
                      <option value="savings">Savings</option>
                    </select>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold mb-2">
                        Routing Number *
                      </label>
                      <input
                        type="text"
                        value={formData.routingNumber}
                        onChange={(e) =>
                          setFormData({ ...formData, routingNumber: e.target.value })
                        }
                        className="w-full px-4 py-3 border rounded-lg"
                        placeholder="9 digits"
                        maxLength={9}
                      />
                    </div>
                    <div>
                      <label className="block font-semibold mb-2">
                        Account Number *
                      </label>
                      <input
                        type="text"
                        value={formData.accountNumber}
                        onChange={(e) =>
                          setFormData({ ...formData, accountNumber: e.target.value })
                        }
                        className="w-full px-4 py-3 border rounded-lg"
                        placeholder="Account number"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* W-4 Information */}
              <div className="border-t pt-6">
                <h3 className="font-bold text-lg mb-4">
                  Federal Tax Withholding (W-4)
                </h3>
                
                <div>
                  <label className="block font-semibold mb-2">
                    Filing Status *
                  </label>
                  <select
                    value={formData.filingStatus}
                    onChange={(e) =>
                      setFormData({ ...formData, filingStatus: e.target.value })
                    }
                    className="w-full px-4 py-3 border rounded-lg"
                  >
                    <option value="">Select...</option>
                    <option value="single">Single or Married filing separately</option>
                    <option value="married">Married filing jointly</option>
                    <option value="head_of_household">Head of household</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold mb-2">
                    Number of Dependents
                  </label>
                  <input
                    type="number"
                    value={formData.dependents}
                    onChange={(e) =>
                      setFormData({ ...formData, dependents: e.target.value })
                    }
                    className="w-full px-4 py-3 border rounded-lg"
                    min="0"
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-2">
                    Extra Withholding (Optional)
                  </label>
                  <input
                    type="number"
                    value={formData.extraWithholding}
                    onChange={(e) =>
                      setFormData({ ...formData, extraWithholding: e.target.value })
                    }
                    className="w-full px-4 py-3 border rounded-lg"
                    placeholder="$0"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Additional amount to withhold from each paycheck
                  </p>
                </div>

                <label className="flex items-center gap-2 mt-4">
                  <input
                    type="checkbox"
                    checked={formData.claimExempt}
                    onChange={(e) =>
                      setFormData({ ...formData, claimExempt: e.target.checked })
                    }
                    className="w-5 h-5"
                  />
                  <span className="text-sm">
                    I claim exemption from withholding (must meet IRS requirements)
                  </span>
                </label>
              </div>

              {/* Emergency Contact */}
              <div className="border-t pt-6">
                <h3 className="font-bold text-lg mb-4">Emergency Contact</h3>
                
                <div>
                  <label className="block font-semibold mb-2">
                    Emergency Contact Name *
                  </label>
                  <input
                    type="text"
                    value={formData.emergencyName}
                    onChange={(e) =>
                      setFormData({ ...formData, emergencyName: e.target.value })
                    }
                    className="w-full px-4 py-3 border rounded-lg"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-2">
                    Emergency Contact Phone *
                  </label>
                  <input
                    type="tel"
                    value={formData.emergencyPhone}
                    onChange={(e) =>
                      setFormData({ ...formData, emergencyPhone: e.target.value })
                    }
                    className="w-full px-4 py-3 border rounded-lg"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-2">
                    Relationship *
                  </label>
                  <input
                    type="text"
                    value={formData.emergencyRelationship}
                    onChange={(e) =>
                      setFormData({ ...formData, emergencyRelationship: e.target.value })
                    }
                    className="w-full px-4 py-3 border rounded-lg"
                    placeholder="Spouse, Parent, Sibling, etc."
                  />
                </div>
              </div>
            </div>
            <div className="flex gap-4 mt-8">
              <button
                onClick={() => setStep(3)}
                className="flex-1 bg-gray-300 text-gray-700 py-4 rounded-lg font-bold hover:bg-gray-400"
              >
                Back
              </button>
              <button
                onClick={() => setStep(5)}
                className="flex-1 bg-green-600 text-white py-4 rounded-lg font-bold hover:bg-green-700"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* Step 5: Required Documents */}
        {step === 5 && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6">
              Required Employment Documents
            </h2>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <p className="text-sm">
                <strong>Note:</strong> All documents must be uploaded before your application can be processed.
                Accepted formats: PDF, JPG, PNG
              </p>
            </div>

            <div className="space-y-6">
              {/* Government ID */}
              <div>
                <label className="block font-semibold mb-2">
                  Government-Issued ID (Front) *
                </label>
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) =>
                    setFormData({ ...formData, idFrontFile: e.target.files?.[0] || null })
                  }
                  className="w-full px-4 py-3 border rounded-lg"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Driver's License, State ID, or Passport
                </p>
              </div>

              <div>
                <label className="block font-semibold mb-2">
                  Government-Issued ID (Back) *
                </label>
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) =>
                    setFormData({ ...formData, idBackFile: e.target.files?.[0] || null })
                  }
                  className="w-full px-4 py-3 border rounded-lg"
                />
              </div>

              {/* Social Security Card */}
              <div>
                <label className="block font-semibold mb-2">
                  Social Security Card *
                </label>
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) =>
                    setFormData({ ...formData, ssnCardFile: e.target.files?.[0] || null })
                  }
                  className="w-full px-4 py-3 border rounded-lg"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Required for I-9 verification
                </p>
              </div>

              {/* PTIN Certificate */}
              {formData.hasPTIN === 'yes' && (
                <div>
                  <label className="block font-semibold mb-2">
                    PTIN Certificate
                  </label>
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) =>
                      setFormData({ ...formData, certificationFile: e.target.files?.[0] || null })
                    }
                    className="w-full px-4 py-3 border rounded-lg"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Upload your current PTIN certificate from IRS
                  </p>
                </div>
              )}

              {/* Direct Deposit Voided Check */}
              {formData.paymentMethod === 'direct_deposit' && (
                <div>
                  <label className="block font-semibold mb-2">
                    Voided Check or Bank Letter *
                  </label>
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) =>
                      setFormData({ ...formData, directDepositForm: e.target.files?.[0] || null })
                    }
                    className="w-full px-4 py-3 border rounded-lg"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Voided check or letter from bank with routing/account numbers
                  </p>
                </div>
              )}

              {/* Background Check Consent */}
              <div className="border-t pt-6">
                <label className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={formData.backgroundCheckConsent}
                    onChange={(e) =>
                      setFormData({ ...formData, backgroundCheckConsent: e.target.checked })
                    }
                    className="w-5 h-5 mt-1"
                  />
                  <span className="text-sm">
                    <strong>Background Check Consent *</strong><br />
                    I authorize SupersonicFastCash to conduct a background check, including criminal history,
                    employment verification, and reference checks. I understand this is required for employment
                    as a tax preparer handling sensitive financial information.
                  </span>
                </label>
              </div>

              {/* Confidentiality Agreement */}
              <div>
                <label className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    className="w-5 h-5 mt-1"
                  />
                  <span className="text-sm">
                    <strong>Confidentiality Agreement *</strong><br />
                    I agree to maintain strict confidentiality of all client information in accordance with
                    IRS regulations (IRC Section 7216) and company policies. I understand that unauthorized
                    disclosure may result in termination and legal penalties.
                  </span>
                </label>
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <button
                onClick={() => setStep(4)}
                className="flex-1 bg-gray-300 text-gray-700 py-4 rounded-lg font-bold hover:bg-gray-400"
              >
                Back
              </button>
              <button
                onClick={() => setStep(6)}
                className="flex-1 bg-green-600 text-white py-4 rounded-lg font-bold hover:bg-green-700"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* Step 6: Review & Submit */}
        {step === 6 && (
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

            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                {error}
              </div>
            )}

            <div className="flex gap-4">
              <button
                onClick={() => setStep(5)}
                className="flex-1 bg-gray-300 text-gray-700 py-4 rounded-lg font-bold hover:bg-gray-400"
              >
                Back
              </button>
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="flex-1 bg-green-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {submitting ? 'Submitting...' : 'Submit Application'}
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
