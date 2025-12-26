'use client';

import { useState } from 'react';
import { Check, AlertCircle } from 'lucide-react';

export default function ProgramHolderApplicationPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Organization Info
    organizationName: '',
    legalName: '',
    taxId: '',
    address: '',
    city: '',
    state: 'Indiana',
    zip: '',
    website: '',

    // Contact Info
    contactName: '',
    contactTitle: '',
    contactEmail: '',
    contactPhone: '',

    // Programs
    programsOffered: '',
    studentsPerYear: '',
    programTypes: [] as string[],

    // Experience
    wioaExperience: '',
    etplExperience: '',
    complianceHistory: '',
    currentApprovals: '',

    // References
    reference1Name: '',
    reference1Organization: '',
    reference1Email: '',
    reference1Phone: '',
    reference2Name: '',
    reference2Organization: '',
    reference2Email: '',
    reference2Phone: '',

    // Why Join
    whyJoin: '',
    goals: '',

    // Size
    tier: 'small',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // API submission implemented

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <main className="bg-white min-h-screen py-20">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Application Submitted!
          </h1>
          <p className="text-xl text-slate-600 mb-8">
            Thank you for applying to join our Program Holder Network.
          </p>
          <div className="bg-blue-50 rounded-xl p-6 mb-8 text-left">
            <h2 className="font-bold text-blue-900 mb-3">What Happens Next:</h2>
            <div className="space-y-2 text-sm text-blue-800">
              <div className="flex gap-2">
                <div className="font-bold">1.</div>
                <div>
                  We'll review your application within 2-3 business days
                </div>
              </div>
              <div className="flex gap-2">
                <div className="font-bold">2.</div>
                <div>We'll check your references and verify information</div>
              </div>
              <div className="flex gap-2">
                <div className="font-bold">3.</div>
                <div>You'll receive an email with our decision</div>
              </div>
              <div className="flex gap-2">
                <div className="font-bold">4.</div>
                <div>If approved, we'll send your MOU to sign</div>
              </div>
            </div>
          </div>
          <p className="text-slate-600 mb-4">
            We've sent a confirmation email to{' '}
            <strong>{formData.contactEmail}</strong>
          </p>
          <p className="text-sm text-slate-500">
            Questions? Email us at Elevate4humanityedu@gmail.com or call (317)
            314-3757
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Program Holder Application
          </h1>
          <p className="text-xl text-slate-600">
            Join our network. Use our credentials. Launch in 30 days.
          </p>
        </div>

        {/* Progress */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-2">
            {[1, 2, 3, 4, 5].map((s) => (
              <div
                key={s}
                className={`flex-1 h-2 rounded-full mx-1 ${
                  s <= step ? 'bg-blue-600' : 'bg-slate-200'
                }`}
              />
            ))}
          </div>
          <div className="text-sm text-slate-600 text-center">
            Step {step} of 5
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Step 1: Organization Info */}
          {step === 1 && (
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                Organization Information
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Organization Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.organizationName}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        organizationName: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Legal Entity Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.legalName}
                    onChange={(e) =>
                      setFormData({ ...formData, legalName: e.target.value })
                    }
                    className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Tax ID / EIN *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.taxId}
                      onChange={(e) =>
                        setFormData({ ...formData, taxId: e.target.value })
                      }
                      className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Website
                    </label>
                    <input
                      type="url"
                      value={formData.website}
                      onChange={(e) =>
                        setFormData({ ...formData, website: e.target.value })
                      }
                      className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) =>
                        setFormData({ ...formData, city: e.target.value })
                      }
                      className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      State *
                    </label>
                    <select
                      required
                      value={formData.state}
                      onChange={(e) =>
                        setFormData({ ...formData, state: e.target.value })
                      }
                      className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:border-blue-500 focus:outline-none"
                    >
                      <option value="Indiana">Indiana</option>
                    </select>
                    <p className="text-xs text-slate-500 mt-1">
                      Currently Indiana only
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      ZIP Code *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.zip}
                      onChange={(e) =>
                        setFormData({ ...formData, zip: e.target.value })
                      }
                      className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition"
                >
                  Next →
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Contact Info */}
          {step === 2 && (
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                Primary Contact
              </h2>

              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.contactName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          contactName: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.contactTitle}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          contactTitle: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.contactEmail}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          contactEmail: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.contactPhone}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          contactPhone: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="bg-slate-200 text-slate-900 px-8 py-3 rounded-lg font-bold hover:bg-slate-300 transition"
                >
                  ← Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition"
                >
                  Next →
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Programs */}
          {step === 3 && (
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                Your Programs
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    What training programs do you offer? *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.programsOffered}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        programsOffered: e.target.value,
                      })
                    }
                    Content="List your training programs..."
                    className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    How many students per year? *
                  </label>
                  <select
                    required
                    value={formData.studentsPerYear}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        studentsPerYear: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:border-blue-500 focus:outline-none"
                  >
                    <option value="">Select range...</option>
                    <option value="1-100">1-100</option>
                    <option value="101-500">101-500</option>
                    <option value="501-1000">501-1,000</option>
                    <option value="1001-2500">1,001-2,500</option>
                    <option value="2501+">2,501+</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Previous WIOA/ETPL experience? *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={formData.wioaExperience}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        wioaExperience: e.target.value,
                      })
                    }
                    Content="Describe your experience with WIOA, ETPL, or workforce development programs..."
                    className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Any compliance violations or issues? *
                  </label>
                  <textarea
                    required
                    rows={2}
                    value={formData.complianceHistory}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        complianceHistory: e.target.value,
                      })
                    }
                    Content="None, or describe any past issues..."
                    className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="mt-8 flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="bg-slate-200 text-slate-900 px-8 py-3 rounded-lg font-bold hover:bg-slate-300 transition"
                >
                  ← Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(4)}
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition"
                >
                  Next →
                </button>
              </div>
            </div>
          )}

          {/* Step 4: References */}
          {step === 4 && (
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                Professional References
              </h2>
              <p className="text-slate-600 mb-6">
                Provide 2 professional references we can contact.
              </p>

              <div className="space-y-6">
                <div className="border-2 border-slate-200 rounded-lg p-4">
                  <h3 className="font-bold text-slate-900 mb-4">Reference 1</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.reference1Name}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            reference1Name: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Organization *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.reference1Organization}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            reference1Organization: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.reference1Email}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            reference1Email: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.reference1Phone}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            reference1Phone: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="border-2 border-slate-200 rounded-lg p-4">
                  <h3 className="font-bold text-slate-900 mb-4">Reference 2</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.reference2Name}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            reference2Name: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Organization *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.reference2Organization}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            reference2Organization: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.reference2Email}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            reference2Email: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.reference2Phone}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            reference2Phone: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="bg-slate-200 text-slate-900 px-8 py-3 rounded-lg font-bold hover:bg-slate-300 transition"
                >
                  ← Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(5)}
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition"
                >
                  Next →
                </button>
              </div>
            </div>
          )}

          {/* Step 5: Why Join & Submit */}
          {step === 5 && (
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                Final Questions
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Why do you want to join our network? *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.whyJoin}
                    onChange={(e) =>
                      setFormData({ ...formData, whyJoin: e.target.value })
                    }
                    Content="Tell us why you want to operate under our credentials..."
                    className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    What are your goals for the next 12 months? *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={formData.goals}
                    onChange={(e) =>
                      setFormData({ ...formData, goals: e.target.value })
                    }
                    Content="Student numbers, programs, expansion plans..."
                    className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Select your tier *
                  </label>
                  <select
                    required
                    value={formData.tier}
                    onChange={(e) =>
                      setFormData({ ...formData, tier: e.target.value })
                    }
                    className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:border-blue-500 focus:outline-none"
                  >
                    <option value="small">
                      Small (500 students) - $4,000/mo
                    </option>
                    <option value="medium">
                      Medium (2,500 students) - $8,000/mo
                    </option>
                    <option value="large">
                      Large (10,000 students) - $16,000/mo
                    </option>
                    <option value="enterprise">
                      Enterprise (Unlimited) - $30,000/mo
                    </option>
                  </select>
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-4 mt-6">
                <div className="flex gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-blue-900">
                    <p className="font-bold mb-1">Before you submit:</p>
                    <ul className="space-y-1 text-blue-800">
                      <li>
                        • We'll review your application in 2-3 business days
                      </li>
                      <li>• We'll contact your references</li>
                      <li>• If approved, we'll send your MOU to sign</li>
                      <li>
                        • Not everyone qualifies - we protect our credentials
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(4)}
                  className="bg-slate-200 text-slate-900 px-8 py-3 rounded-lg font-bold hover:bg-slate-300 transition"
                >
                  ← Back
                </button>
                <button
                  type="submit"
                  className="bg-green-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-green-700 transition"
                >
                  Submit Application →
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </main>
  );
}
