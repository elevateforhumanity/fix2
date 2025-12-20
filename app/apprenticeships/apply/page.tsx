'use client';

export const dynamic = 'force-dynamic';

import { useState } from 'react';
import Link from 'next/link';

import {
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  User,
  Briefcase,
  FileText,
  Send,
} from 'lucide-react';

export default function ApplyApprenticeshipPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Info
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: 'IN',
    zip: '',
    dateOfBirth: '',

    // Program Selection
    program: '',
    startDate: '',
    availability: '',

    // Background
    education: '',
    experience: '',
    whyApprenticeship: '',
    goals: '',

    // Legal
    eligibleToWork: false,
    over18: false,
    agreeToTerms: false,
  });

  const totalSteps = 4;

  const updateField = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Submit application
    console.log('Submitting application:', formData);
    // Redirect to success page
    window.location.href = '/apprenticeships/apply/success';
  };

  const isStepComplete = (stepNum: number) => {
    switch (stepNum) {
      case 1:
        return (
          formData.firstName &&
          formData.lastName &&
          formData.email &&
          formData.phone
        );
      case 2:
        return formData.program && formData.startDate && formData.availability;
      case 3:
        return formData.education && formData.whyApprenticeship;
      case 4:
        return (
          formData.eligibleToWork && formData.over18 && formData.agreeToTerms
        );
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-3">Apply for Apprenticeship</h1>
          <p className="text-lg text-slate-600">
            Complete this application to start your journey. Takes about 10
            minutes.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-slate-700">
              Step {step} of {totalSteps}
            </span>
            <span className="text-sm text-slate-600">
              {Math.round((step / totalSteps) * 100)}% Complete
            </span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-3">
            <div
              className="bg-brand-blue-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>

          {/* Step Labels */}
          <div className="flex justify-between mt-4">
            {[
              { num: 1, label: 'Personal Info', icon: User },
              { num: 2, label: 'Program', icon: Briefcase },
              { num: 3, label: 'Background', icon: FileText },
              { num: 4, label: 'Review', icon: Send },
            ].map(({ num, label, icon: Icon }) => (
              <div key={num} className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                    step === num
                      ? 'bg-brand-blue-600 text-white'
                      : step > num
                        ? 'bg-brand-green-600 text-white'
                        : 'bg-slate-300 text-slate-600'
                  }`}
                >
                  {step > num ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <Icon className="w-5 h-5" />
                  )}
                </div>
                <span className="text-xs font-semibold text-center">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-sm p-8"
        >
          {/* Step 1: Personal Information */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">
                  Personal Information
                </h2>
                <p className="text-slate-600 mb-6">
                  Tell us about yourself so we can contact you.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => updateField('firstName', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="John"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => updateField('lastName', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Doe"
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
                    onChange={(e) => updateField('email', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="john.doe@example.com"
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
                    onChange={(e) => updateField('phone', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="(317) 314-3757"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Street Address
                  </label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => updateField('address', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="123 Main St"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => updateField('city', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Indianapolis"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    State
                  </label>
                  <select
                    value={formData.state}
                    onChange={(e) => updateField('state', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="IN">Indiana</option>
                    <option value="IL">Illinois</option>
                    <option value="OH">Ohio</option>
                    <option value="KY">Kentucky</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    value={formData.zip}
                    onChange={(e) => updateField('zip', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="46201"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => updateField('dateOfBirth', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Program Selection */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Choose Your Program</h2>
                <p className="text-slate-600 mb-6">
                  Select the apprenticeship program you're interested in.
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Apprenticeship Program *
                </label>
                <select
                  required
                  value={formData.program}
                  onChange={(e) => updateField('program', e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select a program...</option>
                  <option value="barber">Barber Apprenticeship</option>
                  <option value="hvac">HVAC Technician</option>
                  <option value="electrician">Electrician</option>
                  <option value="plumber">Plumber</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Preferred Start Date *
                </label>
                <input
                  type="date"
                  required
                  value={formData.startDate}
                  onChange={(e) => updateField('startDate', e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Availability *
                </label>
                <select
                  required
                  value={formData.availability}
                  onChange={(e) => updateField('availability', e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select availability...</option>
                  <option value="full-time">Full-time (40 hours/week)</option>
                  <option value="part-time">
                    Part-time (20-30 hours/week)
                  </option>
                  <option value="flexible">Flexible schedule</option>
                </select>
              </div>

              <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
                <h3 className="font-bold text-lg mb-2">What to Expect</h3>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li>• Earn while you learn - get paid from day one</li>
                  <li>• On-the-job training with experienced professionals</li>
                  <li>• Industry-recognized certification upon completion</li>
                  <li>• No tuition costs - training is fully funded</li>
                  <li>• Typical duration: 12-24 months depending on program</li>
                </ul>
              </div>
            </div>
          )}

          {/* Step 3: Background */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Your Background</h2>
                <p className="text-slate-600 mb-6">
                  Help us understand your experience and goals.
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Highest Level of Education *
                </label>
                <select
                  required
                  value={formData.education}
                  onChange={(e) => updateField('education', e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select education level...</option>
                  <option value="high-school">High School Diploma/GED</option>
                  <option value="some-college">Some College</option>
                  <option value="associates">Associate's Degree</option>
                  <option value="bachelors">Bachelor's Degree</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Relevant Experience (if any)
                </label>
                <textarea
                  value={formData.experience}
                  onChange={(e) => updateField('experience', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Describe any relevant work experience, volunteer work, or skills..."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Why do you want to become an apprentice? *
                </label>
                <textarea
                  required
                  value={formData.whyApprenticeship}
                  onChange={(e) =>
                    updateField('whyApprenticeship', e.target.value)
                  }
                  rows={4}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Tell us what motivates you to pursue this apprenticeship..."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Career Goals
                </label>
                <textarea
                  value={formData.goals}
                  onChange={(e) => updateField('goals', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Where do you see yourself in 5 years?"
                />
              </div>
            </div>
          )}

          {/* Step 4: Review & Submit */}
          {step === 4 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Review & Submit</h2>
                <p className="text-slate-600 mb-6">
                  Please review your information and confirm eligibility.
                </p>
              </div>

              {/* Summary */}
              <div className="bg-slate-50 rounded-lg p-6 space-y-4">
                <div>
                  <h3 className="font-semibold text-sm text-slate-600 mb-1">
                    Applicant
                  </h3>
                  <p className="font-bold">
                    {formData.firstName} {formData.lastName}
                  </p>
                  <p className="text-sm text-slate-600">
                    {formData.email} • {formData.phone}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-slate-600 mb-1">
                    Program
                  </h3>
                  <p className="font-bold">
                    {formData.program || 'Not selected'}
                  </p>
                  <p className="text-sm text-slate-600">
                    Start Date: {formData.startDate || 'Not specified'}
                  </p>
                </div>
              </div>

              {/* Legal Checkboxes */}
              <div className="space-y-4">
                <label className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    required
                    checked={formData.eligibleToWork}
                    onChange={(e) =>
                      updateField('eligibleToWork', e.target.checked)
                    }
                    className="mt-1 w-5 h-5 text-brand-blue-600 rounded"
                  />
                  <span className="text-sm text-slate-700">
                    I am legally eligible to work in the United States *
                  </span>
                </label>

                <label className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    required
                    checked={formData.over18}
                    onChange={(e) => updateField('over18', e.target.checked)}
                    className="mt-1 w-5 h-5 text-brand-blue-600 rounded"
                  />
                  <span className="text-sm text-slate-700">
                    I am at least 18 years old *
                  </span>
                </label>

                <label className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    required
                    checked={formData.agreeToTerms}
                    onChange={(e) =>
                      updateField('agreeToTerms', e.target.checked)
                    }
                    className="mt-1 w-5 h-5 text-brand-blue-600 rounded"
                  />
                  <span className="text-sm text-slate-700">
                    I agree to the{' '}
                    <Link
                      href="/terms"
                      className="text-brand-blue-600 hover:underline"
                    >
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link
                      href="/privacy"
                      className="text-brand-blue-600 hover:underline"
                    >
                      Privacy Policy
                    </Link>{' '}
                    *
                  </span>
                </label>
              </div>

              <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6">
                <h3 className="font-bold text-lg mb-2">What Happens Next?</h3>
                <ol className="space-y-2 text-sm text-slate-700">
                  <li>
                    1. We'll review your application within 2-3 business days
                  </li>
                  <li>
                    2. If selected, we'll contact you to schedule an interview
                  </li>
                  <li>
                    3. After the interview, we'll match you with a participating
                    employer
                  </li>
                  <li>
                    4. You'll start your apprenticeship and begin earning
                    immediately!
                  </li>
                </ol>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t">
            {step > 1 ? (
              <button
                type="button"
                onClick={prevStep}
                className="flex items-center gap-2 px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-900 rounded-lg font-semibold transition"
              >
                <ArrowLeft className="w-5 h-5" />
                Previous
              </button>
            ) : (
              <Link
                href="/apprenticeships"
                className="flex items-center gap-2 px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-900 rounded-lg font-semibold transition"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Programs
              </Link>
            )}

            {step < totalSteps ? (
              <button
                type="button"
                onClick={nextStep}
                disabled={!isStepComplete(step)}
                className="flex items-center gap-2 px-6 py-3 bg-brand-blue-600 hover:bg-brand-blue-700 text-white rounded-lg font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next Step
                <ArrowRight className="w-5 h-5" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={!isStepComplete(step)}
                className="flex items-center gap-2 px-8 py-3 bg-brand-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
                Submit Application
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
