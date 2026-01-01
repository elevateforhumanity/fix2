'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ChevronRight,
  Check,
  Upload,
  User,
  DollarSign,
  FileText,
  Calculator,
} from 'lucide-react';

const steps = [
  { id: 1, name: 'Personal Info', icon: User },
  { id: 2, name: 'Income', icon: DollarSign },
  { id: 3, name: 'Deductions', icon: Calculator },
  { id: 4, name: 'Documents', icon: Upload },
  { id: 5, name: 'Review', icon: FileText },
];

export default function TaxSoftwarePage() {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="relative h-[300px] flex items-center justify-center text-white overflow-hidden">
        <Image
          src="/images/programs/business.jpg"
          alt="Tax Preparation Software"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Professional Tax Preparation
          </h1>
          <p className="text-xl">
            Powered by Drake Software - IRS-Certified E-File
          </p>
        </div>
      </section>

      {/* Progress Steps */}
      <div className="bg-white border-b">
        <div className="max-w-5xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isComplete = step.id < currentStep;
              const isCurrent = step.id === currentStep;

              return (
                <div key={step.id} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        isComplete
                          ? 'bg-green-500 text-white'
                          : isCurrent
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 text-gray-500'
                      }`}
                    >
                      {isComplete ? (
                        <Check className="w-6 h-6" />
                      ) : (
                        <Icon className="w-6 h-6" />
                      )}
                    </div>
                    <span
                      className={`text-sm mt-2 ${isCurrent ? 'font-bold' : ''}`}
                    >
                      {step.name}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`h-1 flex-1 mx-2 ${
                        isComplete ? 'bg-green-500' : 'bg-gray-200'
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-md p-8">
          {currentStep === 1 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Personal Information
              </h2>
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Social Security Number *
                  </label>
                  <input
                    type="text"
                    placeholder="XXX-XX-XXXX"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Filing Status *
                  </label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>Single</option>
                    <option>Married Filing Jointly</option>
                    <option>Married Filing Separately</option>
                    <option>Head of Household</option>
                    <option>Qualifying Widow(er)</option>
                  </select>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date of Birth *
                    </label>
                    <input
                      type="date"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      State *
                    </label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option>Indiana</option>
                      <option>Illinois</option>
                      <option>Ohio</option>
                      <option>Michigan</option>
                      <option>Kentucky</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ZIP Code *
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Income Information
              </h2>
              <div className="space-y-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-900">
                    Please provide information about all sources of income for
                    the tax year.
                  </p>
                </div>

                <div>
                  <label className="flex items-center mb-4">
                    <input type="checkbox" className="mr-3 w-5 h-5" />
                    <span className="font-medium">
                      I received W-2 income (wages from employer)
                    </span>
                  </label>
                  <div className="ml-8 space-y-4">
                    <input
                      type="text"
                      placeholder="Employer Name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    />
                    <input
                      type="number"
                      placeholder="Total Wages (Box 1)"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>

                <div>
                  <label className="flex items-center mb-4">
                    <input type="checkbox" className="mr-3 w-5 h-5" />
                    <span className="font-medium">
                      I received 1099 income (self-employment, contract work)
                    </span>
                  </label>
                </div>

                <div>
                  <label className="flex items-center mb-4">
                    <input type="checkbox" className="mr-3 w-5 h-5" />
                    <span className="font-medium">
                      I received interest or dividend income
                    </span>
                  </label>
                </div>

                <div>
                  <label className="flex items-center mb-4">
                    <input type="checkbox" className="mr-3 w-5 h-5" />
                    <span className="font-medium">
                      I received unemployment compensation
                    </span>
                  </label>
                </div>

                <div>
                  <label className="flex items-center mb-4">
                    <input type="checkbox" className="mr-3 w-5 h-5" />
                    <span className="font-medium">
                      I received Social Security benefits
                    </span>
                  </label>
                </div>

                <div>
                  <label className="flex items-center mb-4">
                    <input type="checkbox" className="mr-3 w-5 h-5" />
                    <span className="font-medium">
                      I received retirement/pension income
                    </span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Deductions & Credits
              </h2>
              <div className="space-y-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-sm text-green-900">
                    Select all that apply to maximize your refund.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-lg mb-4">Common Deductions</h3>
                  <div className="space-y-3">
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-3 w-5 h-5" />
                      <span>Mortgage interest</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-3 w-5 h-5" />
                      <span>Property taxes</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-3 w-5 h-5" />
                      <span>Charitable donations</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-3 w-5 h-5" />
                      <span>Medical expenses</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-3 w-5 h-5" />
                      <span>Student loan interest</span>
                    </label>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-lg mb-4">Tax Credits</h3>
                  <div className="space-y-3">
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-3 w-5 h-5" />
                      <span>Child Tax Credit</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-3 w-5 h-5" />
                      <span>Earned Income Tax Credit (EITC)</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-3 w-5 h-5" />
                      <span>
                        Education credits (American Opportunity, Lifetime
                        Learning)
                      </span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-3 w-5 h-5" />
                      <span>Child and Dependent Care Credit</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Upload Documents
              </h2>
              <div className="space-y-6">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-sm text-yellow-900">
                    Upload clear photos or PDFs of your tax documents. All
                    uploads are secure and encrypted.
                  </p>
                </div>

                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-700 mb-2">
                    Drag and drop files here, or click to browse
                  </p>
                  <p className="text-sm text-gray-500">
                    Accepted: PDF, JPG, PNG (max 10MB each)
                  </p>
                  <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                    Choose Files
                  </button>
                </div>

                <div>
                  <h3 className="font-bold mb-3">Documents Needed:</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• W-2 forms from all employers</li>
                    <li>• 1099 forms (if applicable)</li>
                    <li>
                      • 1098 forms (mortgage interest, student loan interest)
                    </li>
                    <li>• 1095-A (health insurance marketplace)</li>
                    <li>
                      • Receipts for deductions (charitable donations, medical
                      expenses)
                    </li>
                    <li>• Prior year tax return (if available)</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {currentStep === 5 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Review & Submit
              </h2>
              <div className="space-y-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <h3 className="font-bold text-lg mb-2">Estimated Refund</h3>
                  <p className="text-4xl font-bold text-green-600">$2,450</p>
                  <p className="text-sm text-gray-600 mt-2">
                    This is an estimate. Final amount may vary.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="font-bold mb-4">Summary</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Total Income:</span>
                      <span className="font-medium">$45,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Deductions:</span>
                      <span className="font-medium">$12,950</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax Credits:</span>
                      <span className="font-medium">$2,000</span>
                    </div>
                    <div className="flex justify-between border-t pt-2 mt-2">
                      <span className="font-bold">Estimated Refund:</span>
                      <span className="font-bold text-green-600">$2,450</span>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <label className="flex items-start">
                    <input
                      type="checkbox"
                      className="mt-1 mr-3 w-5 h-5"
                      required
                    />
                    <span className="text-sm">
                      I certify that the information provided is accurate and
                      complete to the best of my knowledge.
                    </span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t">
            <button
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            {currentStep < 5 ? (
              <button
                onClick={() => setCurrentStep(Math.min(5, currentStep + 1))}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
              >
                Next
                <ChevronRight className="w-5 h-5 ml-2" />
              </button>
            ) : (
              <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center">
                Submit for Review
                <Check className="w-5 h-5 ml-2" />
              </button>
            )}
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h3 className="font-bold text-lg mb-4">Need Help?</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <Link
              href="/contact"
              className="flex items-center text-blue-600 hover:text-blue-800"
            >
              <span>Contact a Tax Professional</span>
              <ChevronRight className="w-5 h-5 ml-2" />
            </Link>
            <Link
              href="/vita"
              className="flex items-center text-blue-600 hover:text-blue-800"
            >
              <span>Qualify for Free Tax Prep?</span>
              <ChevronRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
