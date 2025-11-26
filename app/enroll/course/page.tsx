'use client';

export const dynamic = 'force-dynamic';

import { useState } from 'react';
import Link from 'next/link';
import {
  CheckCircle, Clock, Users, Award, BookOpen, FileText,
  DollarSign, Calendar, ArrowRight, Info, AlertCircle
} from 'lucide-react';

export default function EnrollPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: 'IN',
    zip: '',
    employmentStatus: '',
    income: '',
    fundingProgram: '',
    agreeToTerms: false,
  });

  const course = courseData['vita-tax-prep'];

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Enrollment submitted:', formData);
    // Handle enrollment logic
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Enroll in Course</h1>
              <p className="text-slate-600 mt-1">{course.title}</p>
            </div>
            <Link
              href="/courses"
              className="text-slate-600 hover:text-slate-900 transition-colors"
            >
              Back to Courses
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-[1fr_400px] gap-8">
          {/* Main Content */}
          <div>
            {/* Progress Steps */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 mb-8">
              <div className="flex items-center justify-between">
                {[1, 2, 3].map((stepNum) => (
                  <div key={stepNum} className="flex items-center flex-1">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                          step >= stepNum
                            ? 'bg-red-600 text-white'
                            : 'bg-slate-200 text-slate-500'
                        }`}
                      >
                        {step > stepNum ? <CheckCircle size={20} /> : stepNum}
                      </div>
                      <div className="hidden md:block">
                        <p
                          className={`font-semibold ${
                            step >= stepNum ? 'text-slate-900' : 'text-slate-500'
                          }`}
                        >
                          {stepNum === 1 && 'Personal Info'}
                          {stepNum === 2 && 'Eligibility'}
                          {stepNum === 3 && 'Review'}
                        </p>
                      </div>
                    </div>
                    {stepNum < 3 && (
                      <div
                        className={`flex-1 h-1 mx-4 ${
                          step > stepNum ? 'bg-red-600' : 'bg-slate-200'
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Form Content */}
            <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
              <form onSubmit={handleSubmit}>
                {/* Step 1: Personal Information */}
                {step === 1 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900 mb-2">
                        Personal Information
                      </h2>
                      <p className="text-slate-600">
                        Please provide your basic information to get started.
                      </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          First Name *
                        </label>
                        <input
                          type="text"
                          value={formData.firstName}
                          onChange={(e) =>
                            setFormData({ ...formData, firstName: e.target.value })
                          }
                          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          value={formData.lastName}
                          onChange={(e) =>
                            setFormData({ ...formData, lastName: e.target.value })
                          }
                          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Street Address *
                      </label>
                      <input
                        type="text"
                        value={formData.address}
                        onChange={(e) =>
                          setFormData({ ...formData, address: e.target.value })
                        }
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                        required
                      />
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          City *
                        </label>
                        <input
                          type="text"
                          value={formData.city}
                          onChange={(e) =>
                            setFormData({ ...formData, city: e.target.value })
                          }
                          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          State *
                        </label>
                        <select
                          value={formData.state}
                          onChange={(e) =>
                            setFormData({ ...formData, state: e.target.value })
                          }
                          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                          required
                        >
                          <option value="IN">Indiana</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          ZIP Code *
                        </label>
                        <input
                          type="text"
                          value={formData.zip}
                          onChange={(e) =>
                            setFormData({ ...formData, zip: e.target.value })
                          }
                          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Eligibility */}
                {step === 2 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900 mb-2">
                        Funding Eligibility
                      </h2>
                      <p className="text-slate-600">
                        Help us determine which funding programs you qualify for.
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Current Employment Status *
                      </label>
                      <select
                        value={formData.employmentStatus}
                        onChange={(e) =>
                          setFormData({ ...formData, employmentStatus: e.target.value })
                        }
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                        required
                      >
                        <option value="">Select status...</option>
                        <option value="unemployed">Unemployed</option>
                        <option value="underemployed">Underemployed</option>
                        <option value="employed">Employed</option>
                        <option value="student">Student</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Annual Household Income *
                      </label>
                      <select
                        value={formData.income}
                        onChange={(e) =>
                          setFormData({ ...formData, income: e.target.value })
                        }
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                        required
                      >
                        <option value="">Select range...</option>
                        <option value="0-15000">$0 - $15,000</option>
                        <option value="15000-25000">$15,000 - $25,000</option>
                        <option value="25000-35000">$25,000 - $35,000</option>
                        <option value="35000-50000">$35,000 - $50,000</option>
                        <option value="50000+">$50,000+</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-3">
                        Preferred Funding Program *
                      </label>
                      <div className="space-y-3">
                        {fundingPrograms.map((program) => (
                          <label
                            key={program.value}
                            className="flex items-start gap-3 p-4 border border-slate-300 rounded-lg cursor-pointer hover:border-red-500 transition-colors"
                          >
                            <input
                              type="radio"
                              name="fundingProgram"
                              value={program.value}
                              checked={formData.fundingProgram === program.value}
                              onChange={(e) =>
                                setFormData({ ...formData, fundingProgram: e.target.value })
                              }
                              className="mt-1"
                              required
                            />
                            <div className="flex-1">
                              <p className="font-semibold text-slate-900">{program.name}</p>
                              <p className="text-sm text-slate-600 mt-1">
                                {program.description}
                              </p>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
                      <Info size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-blue-900">
                        <p className="font-semibold mb-1">Don't worry about eligibility!</p>
                        <p>
                          We'll help you determine which programs you qualify for and handle all
                          the paperwork. Most Indiana residents qualify for at least one funding
                          program.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Review */}
                {step === 3 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900 mb-2">
                        Review Your Information
                      </h2>
                      <p className="text-slate-600">
                        Please review your information before submitting.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="bg-slate-50 rounded-lg p-4">
                        <h3 className="font-semibold text-slate-900 mb-3">Personal Information</h3>
                        <div className="grid md:grid-cols-2 gap-3 text-sm">
                          <div>
                            <span className="text-slate-600">Name:</span>
                            <span className="ml-2 text-slate-900 font-medium">
                              {formData.firstName} {formData.lastName}
                            </span>
                          </div>
                          <div>
                            <span className="text-slate-600">Email:</span>
                            <span className="ml-2 text-slate-900 font-medium">
                              {formData.email}
                            </span>
                          </div>
                          <div>
                            <span className="text-slate-600">Phone:</span>
                            <span className="ml-2 text-slate-900 font-medium">
                              {formData.phone}
                            </span>
                          </div>
                          <div>
                            <span className="text-slate-600">Address:</span>
                            <span className="ml-2 text-slate-900 font-medium">
                              {formData.city}, {formData.state} {formData.zip}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-slate-50 rounded-lg p-4">
                        <h3 className="font-semibold text-slate-900 mb-3">Eligibility Information</h3>
                        <div className="space-y-2 text-sm">
                          <div>
                            <span className="text-slate-600">Employment Status:</span>
                            <span className="ml-2 text-slate-900 font-medium capitalize">
                              {formData.employmentStatus}
                            </span>
                          </div>
                          <div>
                            <span className="text-slate-600">Income Range:</span>
                            <span className="ml-2 text-slate-900 font-medium">
                              ${formData.income}
                            </span>
                          </div>
                          <div>
                            <span className="text-slate-600">Funding Program:</span>
                            <span className="ml-2 text-slate-900 font-medium">
                              {fundingPrograms.find((p) => p.value === formData.fundingProgram)?.name}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-slate-200 pt-6">
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.agreeToTerms}
                          onChange={(e) =>
                            setFormData({ ...formData, agreeToTerms: e.target.checked })
                          }
                          className="mt-1"
                          required
                        />
                        <span className="text-sm text-slate-700">
                          I agree to the{' '}
                          <Link href="/terms" className="text-red-600 hover:text-red-700 font-semibold">
                            Terms of Service
                          </Link>{' '}
                          and{' '}
                          <Link href="/privacy" className="text-red-600 hover:text-red-700 font-semibold">
                            Privacy Policy
                          </Link>
                          . I understand that Elevate For Humanity will assist me with funding
                          applications and may share my information with funding agencies.
                        </span>
                      </label>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-200">
                  {step > 1 ? (
                    <button
                      type="button"
                      onClick={handleBack}
                      className="px-6 py-3 border border-slate-300 text-slate-700 rounded-lg font-semibold hover:bg-slate-50 transition-colors"
                    >
                      Back
                    </button>
                  ) : (
                    <div />
                  )}

                  {step < 3 ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
                    >
                      Continue
                      <ArrowRight size={20} />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
                    >
                      Submit Enrollment
                      <CheckCircle size={20} />
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Course Summary */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 sticky top-6">
              <div className="mb-4">
                <div className="w-full h-32 rounded-lg bg-gradient-to-br from-red-100 to-blue-100 flex items-center justify-center mb-4">
                  <BookOpen size={48} className="text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{course.title}</h3>
                <p className="text-sm text-slate-600">{course.description}</p>
              </div>

              <div className="space-y-3 py-4 border-y border-slate-200">
                <div className="flex items-center gap-3 text-sm">
                  <Clock size={18} className="text-slate-400" />
                  <span className="text-slate-700">{course.duration}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Users size={18} className="text-slate-400" />
                  <span className="text-slate-700">{course.students} students enrolled</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Award size={18} className="text-slate-400" />
                  <span className="text-slate-700">Certificate included</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <DollarSign size={18} className="text-slate-400" />
                  <span className="text-green-600 font-semibold">100% Funded</span>
                </div>
              </div>

              <div className="mt-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-start gap-2">
                    <CheckCircle size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-green-900">
                      <p className="font-semibold mb-1">No Cost to You</p>
                      <p>This course is fully funded through state and federal programs.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Need Help? */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <h3 className="font-bold text-blue-900 mb-2">Need Help?</h3>
              <p className="text-sm text-blue-800 mb-4">
                Our enrollment specialists are here to assist you.
              </p>
              <div className="space-y-2 text-sm">
                <a
                  href="tel:+13173143757"
                  className="flex items-center gap-2 text-blue-700 hover:text-blue-900"
                >
                  📞 (317) 314-3757
                </a>
                <a
                  href="mailto:elevate4humanityedu@gmail.com"
                  className="flex items-center gap-2 text-blue-700 hover:text-blue-900"
                >
                  ✉️ elevate4humanityedu@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Data
const courseData: Record<string, any> = {
  'vita-tax-prep': {
    title: 'VITA Tax Preparation Certification',
    description: 'Become an IRS-certified tax preparer and help families in your community.',
    duration: '8 weeks',
    students: '342',
  },
};

const fundingPrograms = [
  {
    name: 'WIOA (Workforce Innovation and Opportunity Act)',
    value: 'wioa',
    description:
      'Federal program for unemployed or underemployed adults seeking career training.',
  },
  {
    name: 'WRG (Workforce Ready Grant)',
    value: 'wrg',
    description: 'Indiana state program covering tuition and fees for high-demand careers.',
  },
  {
    name: 'Next Level Jobs',
    value: 'nlj',
    description: 'Indiana program for working adults to upskill in high-demand fields.',
  },
  {
    name: 'JRI (Justice Reinvestment Initiative)',
    value: 'jri',
    description: 'Program for justice-involved individuals seeking employment training.',
  },
];
