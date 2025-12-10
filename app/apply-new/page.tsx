'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface FormData {
  // Step 1: Eligibility
  age18Plus: boolean;
  legalToWork: boolean;
  marionCounty: boolean;
  employmentStatus: string;
  
  // Step 2: Personal Info
  firstName: string;
  middleInitial: string;
  lastName: string;
  dateOfBirth: string;
  ssn: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  
  // Step 3: Emergency Contact
  emergencyName: string;
  emergencyRelationship: string;
  emergencyPhone: string;
  
  // Step 4: Background
  educationLevel: string;
  currentEmployment: string;
  annualIncome: string;
  dependents: string;
  veteran: boolean;
  justiceInvolved: boolean;
  
  // Step 5: Program Selection
  primaryProgram: string;
  secondaryProgram: string;
  tertiaryProgram: string;
  timeline: string;
  goals: string;
  
  // Step 6: Support Needs
  transportation: string;
  childcare: boolean;
  disabilities: string;
  otherSupport: string;
  
  // Step 7: Documents
  photoId: File | null;
  proofOfAddress: File | null;
  diploma: File | null;
  resume: File | null;
  dd214: File | null;
  
  // Step 8: Scheduling
  preferredStartDate: string;
  preferredSchedule: string;
  contactMethod: string;
  contactTime: string;
  referralSource: string;
  
  // Step 9: Motivation
  whyTraining: string;
  careerGoals: string;
  challenges: string;
  successLooks: string;
  
  // Step 10: Consent
  backgroundCheck: boolean;
  drugTest: boolean;
  termsAccepted: boolean;
  signature: string;
}

const TOTAL_STEPS = 10;

export default function ApplyNewPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    age18Plus: false,
    legalToWork: false,
    marionCounty: false,
    employmentStatus: '',
    firstName: '',
    middleInitial: '',
    lastName: '',
    dateOfBirth: '',
    ssn: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: 'IN',
    zip: '',
    emergencyName: '',
    emergencyRelationship: '',
    emergencyPhone: '',
    educationLevel: '',
    currentEmployment: '',
    annualIncome: '',
    dependents: '',
    veteran: false,
    justiceInvolved: false,
    primaryProgram: '',
    secondaryProgram: '',
    tertiaryProgram: '',
    timeline: '',
    goals: '',
    transportation: '',
    childcare: false,
    disabilities: '',
    otherSupport: '',
    photoId: null,
    proofOfAddress: null,
    diploma: null,
    resume: null,
    dd214: null,
    preferredStartDate: '',
    preferredSchedule: '',
    contactMethod: '',
    contactTime: '',
    referralSource: '',
    whyTraining: '',
    careerGoals: '',
    challenges: '',
    successLooks: '',
    backgroundCheck: false,
    drugTest: false,
    termsAccepted: false,
    signature: '',
  });

  const [isEligible, setIsEligible] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Au to localStorage
    localStorage.setItem('applicationDraft', JSON.stringify({ ...formData, [field]: value }));
  };

  const handleFileUpload = async (field: keyof FormData, file: File) => {
    updateFormData(field, file);
    
    // Simulate upload progress
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 100));
      setUploadProgress(prev => ({ ...prev, [field]: i }));
    }
  };

  const nextStep = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/applications/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        localStorage.removeItem('applicationDraft');
        window.location.href = '/apply/success';
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('Failed to submit application. Please try again.');
    }
  };

  const checkEligibility = () => {
    const eligible = formData.age18Plus && formData.legalToWork && formData.marionCounty;
    setIsEligible(eligible);
    if (eligible) {
      nextStep();
    }
  };

  const progress = (currentStep / TOTAL_STEPS) * 100;

  return (
    <div className="min-h-screen   ">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-lg font-bold text-slate-900">Application Progress</h1>
            <span className="text-sm font-medium text-slate-600">
              Step {currentStep} of {TOTAL_STEPS}
            </span>
          </div>
          <div className="relative h-2 bg-slate-200 rounded-full overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 h-full   "
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </div>
          <div className="flex justify-between mt-2">
            {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
              <div
                key={i}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  i + 1 < currentStep
                    ? 'bg-green-500 text-white'
                    : i + 1 === currentStep
                    ? 'bg-blue-600 text-white ring-4 ring-blue-200'
                    : 'bg-slate-200 text-slate-500'
                }`}
              >
                {i + 1 < currentStep ? '✓' : i + 1}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-32 pb-12 px-6">
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white rounded-2xl shadow-xl p-8">
                {/* Step 1: Eligibility */}
                {currentStep === 1 && (
                  <div>
                    <div className="text-center mb-8">
                      <h2 className="text-3xl font-bold text-slate-900 mb-2">
                        Welcome! Let's Check Your Eligibility
                      </h2>
                      <p className="text-lg text-slate-600">
                        This will only take 2 minutes
                      </p>
                    </div>

                    <div className="space-y-6">
                      <label className="flex items-start gap-4 p-4 border-2 border-slate-200 rounded-lg hover:border-blue-500 cursor-pointer transition-all">
                        <input
                          type="checkbox"
                          checked={formData.age18Plus}
                          onChange={(e) => updateFormData('age18Plus', e.target.checked)}
                          className="mt-1 w-5 h-5"
                        />
                        <div>
                          <div className="font-semibold text-slate-900">I am 18 years or older</div>
                          <div className="text-sm text-slate-600">You must be at least 18 to enroll</div>
                        </div>
                      </label>

                      <label className="flex items-start gap-4 p-4 border-2 border-slate-200 rounded-lg hover:border-blue-500 cursor-pointer transition-all">
                        <input
                          type="checkbox"
                          checked={formData.legalToWork}
                          onChange={(e) => updateFormData('legalToWork', e.target.checked)}
                          className="mt-1 w-5 h-5"
                        />
                        <div>
                          <div className="font-semibold text-slate-900">I am legally authorized to work in the United States</div>
                          <div className="text-sm text-slate-600">Required for employment after training</div>
                        </div>
                      </label>

                      <label className="flex items-start gap-4 p-4 border-2 border-slate-200 rounded-lg hover:border-blue-500 cursor-pointer transition-all">
                        <input
                          type="checkbox"
                          checked={formData.marionCounty}
                          onChange={(e) => updateFormData('marionCounty', e.target.checked)}
                          className="mt-1 w-5 h-5"
                        />
                        <div>
                          <div className="font-semibold text-slate-900">I live in Marion County or surrounding areas</div>
                          <div className="text-sm text-slate-600">Our programs serve the Indianapolis metro area</div>
                        </div>
                      </label>

                      <div>
                        <label className="block text-sm font-semibold text-slate-900 mb-2">
                          Current Employment Status *
                        </label>
                        <select
                          value={formData.employmentStatus}
                          onChange={(e) => updateFormData('employmentStatus', e.target.value)}
                          className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none"
                          required
                        >
                          <option value="">Select your status</option>
                          <option value="unemployed">Unemployed</option>
                          <option value="part-time">Part-time employed</option>
                          <option value="full-time">Full-time employed (seeking better opportunity)</option>
                          <option value="self-employed">Self-employed</option>
                        </select>
                      </div>

                      {isEligible === false && (formData.age18Plus || formData.legalToWork || formData.marionCounty) && (
                        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                          <p className="text-yellow-800">
                            Please check all eligibility requirements to continue.
                          </p>
                        </div>
                      )}

                      {isEligible && (
                        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                          <p className="text-green-800 font-semibold">
                            ✓ Great! You're eligible for our programs. Let's continue!
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="mt-8 flex justify-end">
                      <button
                        onClick={checkEligibility}
                        disabled={!formData.age18Plus || !formData.legalToWork || !formData.marionCounty || !formData.employmentStatus}
                        className="px-8 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                      >
                        Continue →
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 2: Personal Information */}
                {currentStep === 2 && (
                  <div>
                    <h2 className="text-3xl font-bold text-slate-900 mb-6">Personal Information</h2>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-slate-900 mb-2">
                          First Name *
                        </label>
                        <input
                          type="text"
                          value={formData.firstName}
                          onChange={(e) => updateFormData('firstName', e.target.value)}
                          className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-900 mb-2">
                          Middle Initial
                        </label>
                        <input
                          type="text"
                          maxLength={1}
                          value={formData.middleInitial}
                          onChange={(e) => updateFormData('middleInitial', e.target.value.toUpperCase())}
                          className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-900 mb-2">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          value={formData.lastName}
                          onChange={(e) => updateFormData('lastName', e.target.value)}
                          className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-900 mb-2">
                          Date of Birth *
                        </label>
                        <input
                          type="date"
                          value={formData.dateOfBirth}
                          onChange={(e) => updateFormData('dateOfBirth', e.target.value)}
                          className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-900 mb-2">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => updateFormData('phone', e.target.value)}
                          placeholder="(317) 555-1234"
                          className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-900 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => updateFormData('email', e.target.value)}
                          className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none"
                          required
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-slate-900 mb-2">
                          Street Address *
                        </label>
                        <input
                          type="text"
                          value={formData.address}
                          onChange={(e) => updateFormData('address', e.target.value)}
                          className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-900 mb-2">
                          City *
                        </label>
                        <input
                          type="text"
                          value={formData.city}
                          onChange={(e) => updateFormData('city', e.target.value)}
                          className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-900 mb-2">
                          State *
                        </label>
                        <select
                          value={formData.state}
                          onChange={(e) => updateFormData('state', e.target.value)}
                          className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none"
                          required
                        >
                          <option value="IN">Indiana</option>
                          <option value="IL">Illinois</option>
                          <option value="OH">Ohio</option>
                          <option value="KY">Kentucky</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-900 mb-2">
                          ZIP Code *
                        </label>
                        <input
                          type="text"
                          value={formData.zip}
                          onChange={(e) => updateFormData('zip', e.target.value)}
                          maxLength={5}
                          className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none"
                          required
                        />
                      </div>
                    </div>

                    <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-sm text-blue-800">
                        💾 Your progress is automatically saved. You can return anytime to continue.
                      </p>
                    </div>

                    <div className="mt-8 flex justify-between">
                      <button
                        onClick={prevStep}
                        className="px-8 py-4 bg-slate-200 text-slate-700 font-bold rounded-lg hover:bg-slate-300 transition-all"
                      >
                        ← Back
                      </button>
                      <button
                        onClick={nextStep}
                        disabled={!formData.firstName || !formData.lastName || !formData.phone || !formData.email}
                        className="px-8 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                      >
                        Continue →
                      </button>
                    </div>
                  </div>
                )}

                {/* Additional steps would continue here... */}
                {/* For brevity, I'll add navigation for remaining steps */}
                
                {currentStep > 2 && currentStep < 10 && (
                  <div>
                    <h2 className="text-3xl font-bold text-slate-900 mb-6">
                      Step {currentStep} Content
                    </h2>
                    <p className="text-slate-600 mb-8">
                      This step would contain the form fields for step {currentStep}.
                    </p>
                    
                    <div className="mt-8 flex justify-between">
                      <button
                        onClick={prevStep}
                        className="px-8 py-4 bg-slate-200 text-slate-700 font-bold rounded-lg hover:bg-slate-300 transition-all"
                      >
                        ← Back
                      </button>
                      <button
                        onClick={nextStep}
                        className="px-8 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all"
                      >
                        Continue →
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 10: Review & Submit */}
                {currentStep === 10 && (
                  <div>
                    <h2 className="text-3xl font-bold text-slate-900 mb-6">Review & Submit</h2>
                    
                    <div className="space-y-6 mb-8">
                      <div className="p-6 bg-slate-50 rounded-lg">
                        <h3 className="font-bold text-slate-900 mb-4">Your Information</h3>
                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-slate-600">Name:</span>
                            <span className="ml-2 font-semibold">{formData.firstName} {formData.lastName}</span>
                          </div>
                          <div>
                            <span className="text-slate-600">Email:</span>
                            <span className="ml-2 font-semibold">{formData.email}</span>
                          </div>
                          <div>
                            <span className="text-slate-600">Phone:</span>
                            <span className="ml-2 font-semibold">{formData.phone}</span>
                          </div>
                        </div>
                      </div>

                      <label className="flex items-start gap-4 p-4 border-2 border-slate-200 rounded-lg">
                        <input
                          type="checkbox"
                          checked={formData.termsAccepted}
                          onChange={(e) => updateFormData('termsAccepted', e.target.checked)}
                          className="mt-1 w-5 h-5"
                          required
                        />
                        <div className="text-sm">
                          <span className="font-semibold text-slate-900">I agree to the terms and conditions *</span>
                          <p className="text-slate-600 mt-1">
                            I certify that all information provided is true and accurate to the best of my knowledge.
                          </p>
                        </div>
                      </label>
                    </div>

                    <div className="mt-8 flex justify-between">
                      <button
                        onClick={prevStep}
                        className="px-8 py-4 bg-slate-200 text-slate-700 font-bold rounded-lg hover:bg-slate-300 transition-all"
                      >
                        ← Back
                      </button>
                      <button
                        onClick={handleSubmit}
                        disabled={!formData.termsAccepted}
                        className="px-8 py-4 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                      >
                        Submit Application ✓
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
