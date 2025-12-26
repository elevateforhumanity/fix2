// app/tax-filing/apply/page.tsx - Custom Tax Filing Application
'use client';

export const dynamic = 'force-dynamic';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';


export default function TaxFilingApplicationPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Information
    first_name: '',
    last_name: '',
    ssn: '',
    date_of_birth: '',
    email: '',
    phone: '',

    // Address
    street_address: '',
    city: '',
    state: '',
    zip_code: '',

    // Tax Information
    tax_year: '2024',
    filing_status: 'single',
    dependents_count: 0,

    // Income
    w2_income: 0,
    self_employment_income: 0,
    interest_income: 0,
    dividend_income: 0,
    other_income: 0,

    // Deductions
    standard_deduction: true,
    itemized_deductions: 0,
    student_loan_interest: 0,

    // Documents
    has_w2: false,
    has_1099: false,
    has_receipts: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === 'checkbox'
          ? (e.target as HTMLInputElement).checked
          : type === 'number'
            ? parseFloat(value) || 0
            : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/tax-filing/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit application');
      }

      const data = await response.json();
      router.push(`/tax-filing/confirmation/${data.id}`);
    } catch (err: unknown) {
      // @ts-expect-error TS2339: Property 'message' does not exist on type 'unknown'.
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[500px] md:h-[600px] lg:h-[700px] flex items-center justify-center text-white overflow-hidden">
        <Image
          src="/images/gallery/image8.jpg"
          alt="Apply"
          fill
          className="object-cover"
          quality={100}
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0   " />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 drop-shadow-2xl">
            Apply
          </h1>
          <p className="text-base md:text-lg md:text-xl mb-8 text-gray-100 drop-shadow-lg">
            Transform your career with free training and industry certifications
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-brand-orange-600 hover:bg-brand-orange-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all shadow-2xl"
            >
              Get Started Free
            </Link>
            <Link
              href="/programs"
              className="bg-white hover:bg-gray-100 text-brand-blue-600 px-8 py-4 rounded-lg text-lg font-semibold transition-all shadow-2xl"
            >
              View Programs
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Tax Filing Application
          </h1>
          <p className="text-slate-600">
            Complete your tax return for ${formData.tax_year}. Our preparers
            will review and file your return.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    step >= s
                      ? 'bg-brand-blue-600 text-white'
                      : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {s}
                </div>
                {s < 4 && (
                  <div
                    className={`w-24 h-1 mx-2 ${
                      step > s ? 'bg-brand-blue-600' : 'bg-slate-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-sm text-slate-600">
            <span>Personal Info</span>
            <span>Income</span>
            <span>Deductions</span>
            <span>Review</span>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-sm p-8"
        >
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {error}
            </div>
          )}

          {/* Step 1: Personal Information */}
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                Personal Information
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Social Security Number *
                  </label>
                  <input
                    type="text"
                    name="ssn"
                    value={formData.ssn}
                    onChange={handleChange}
                    Content="XXX-XX-XXXX"
                    required
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Date of Birth *
                  </label>
                  <input
                    type="date"
                    name="date_of_birth"
                    value={formData.date_of_birth}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    name="street_address"
                    value={formData.street_address}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      State *
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      required
                      maxLength={2}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      ZIP Code *
                    </label>
                    <input
                      type="text"
                      name="zip_code"
                      value={formData.zip_code}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Filing Status *
                  </label>
                  <select
                    name="filing_status"
                    value={formData.filing_status}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="single">Single</option>
                    <option value="married_joint">
                      Married Filing Jointly
                    </option>
                    <option value="married_separate">
                      Married Filing Separately
                    </option>
                    <option value="head_of_household">Head of Household</option>
                    <option value="qualifying_widow">
                      Qualifying Widow(er)
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Number of Dependents
                  </label>
                  <input
                    type="number"
                    name="dependents_count"
                    value={formData.dependents_count}
                    onChange={handleChange}
                    min="0"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Income */}
          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                Income Information
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    W-2 Wages
                  </label>
                  <input
                    type="number"
                    name="w2_income"
                    value={formData.w2_income}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Self-Employment Income
                  </label>
                  <input
                    type="number"
                    name="self_employment_income"
                    value={formData.self_employment_income}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Interest Income
                  </label>
                  <input
                    type="number"
                    name="interest_income"
                    value={formData.interest_income}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Dividend Income
                  </label>
                  <input
                    type="number"
                    name="dividend_income"
                    value={formData.dividend_income}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Other Income
                  </label>
                  <input
                    type="number"
                    name="other_income"
                    value={formData.other_income}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-blue-900 mb-2">
                  Total Income
                </h3>
                <p className="text-base md:text-lg font-bold text-brand-blue-600">
                  $
                  {(
                    formData.w2_income +
                    formData.self_employment_income +
                    formData.interest_income +
                    formData.dividend_income +
                    formData.other_income
                  ).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </p>
              </div>
            </div>
          )}

          {/* Step 3: Deductions */}
          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                Deductions
              </h2>

              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="standard_deduction"
                    checked={formData.standard_deduction}
                    onChange={handleChange}
                    className="w-5 h-5 text-brand-blue-600 border-slate-300 rounded focus:ring-blue-500"
                  />
                  <label className="ml-3 text-sm font-medium text-slate-700">
                    Use Standard Deduction (Recommended for most filers)
                  </label>
                </div>

                {!formData.standard_deduction && (
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Itemized Deductions Total
                    </label>
                    <input
                      type="number"
                      name="itemized_deductions"
                      value={formData.itemized_deductions}
                      onChange={handleChange}
                      min="0"
                      step="0.01"
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Student Loan Interest Paid
                  </label>
                  <input
                    type="number"
                    name="student_loan_interest"
                    value={formData.student_loan_interest}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Review */}
          {step === 4 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                Review & Submit
              </h2>

              <div className="space-y-4">
                <div className="bg-slate-50 rounded-lg p-4">
                  <h3 className="font-semibold text-slate-900 mb-2">
                    Personal Information
                  </h3>
                  <p className="text-sm text-slate-600">
                    {formData.first_name} {formData.last_name}
                    <br />
                    {formData.email}
                    <br />
                    {formData.street_address}, {formData.city}, {formData.state}{' '}
                    {formData.zip_code}
                  </p>
                </div>

                <div className="bg-slate-50 rounded-lg p-4">
                  <h3 className="font-semibold text-slate-900 mb-2">
                    Tax Summary
                  </h3>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Total Income:</span>
                      <span className="font-semibold">
                        $
                        {(
                          formData.w2_income +
                          formData.self_employment_income +
                          formData.interest_income +
                          formData.dividend_income +
                          formData.other_income
                        ).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Filing Status:</span>
                      <span className="font-semibold capitalize">
                        {formData.filing_status.replace('_', ' ')}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Dependents:</span>
                      <span className="font-semibold">
                        {formData.dependents_count}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-900 mb-2">
                    Next Steps
                  </h3>
                  <ol className="list-decimal list-inside text-sm text-blue-800 space-y-1">
                    <li>Submit your application</li>
                    <li>Upload required documents (W-2, 1099, etc.)</li>
                    <li>A tax preparer will review your return</li>
                    <li>Review and approve your completed return</li>
                    <li>We'll e-file your return to the IRS</li>
                  </ol>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-slate-200">
            {step > 1 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="px-6 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition"
              >
                Previous
              </button>
            )}

            {step < 4 ? (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                className="ml-auto px-6 py-3 bg-brand-blue-600 text-white rounded-lg hover:bg-brand-blue-700 transition"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                disabled={loading}
                className="ml-auto px-8 py-3 bg-brand-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50"
              >
                {loading ? 'Submitting...' : 'Submit Application'}
              </button>
            )}
          </div>
        </form>

        {/* Storytelling Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-2xl md:text-3xl md:text-2xl md:text-3xl font-bold mb-6 text-gray-900">
                    Your Journey Starts Here
                  </h2>
                  <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                    Every great career begins with a single step. Whether you're
                    looking to change careers, upgrade your skills, or enter the
                    workforce for the first time, we're here to help you
                    succeed. Our programs are 100% free, government-funded, and
                    designed to get you hired fast.
                  </p>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <svg
                        className="w-6 h-6 text-brand-green-600 mr-3 flex-shrink-0 mt-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-gray-700">
                        100% free training - no tuition, no hidden costs
                      </span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="w-6 h-6 text-brand-green-600 mr-3 flex-shrink-0 mt-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-gray-700">
                        Industry-recognized certifications that employers value
                      </span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="w-6 h-6 text-brand-green-600 mr-3 flex-shrink-0 mt-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-gray-700">
                        Job placement assistance and career support
                      </span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="w-6 h-6 text-brand-green-600 mr-3 flex-shrink-0 mt-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-gray-700">
                        Flexible scheduling for working adults
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="/images/gallery/image3.jpg"
                    alt="Students learning"
                    fill
                    className="object-cover"
                    quality={100}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16    text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl md:text-2xl md:text-3xl font-bold mb-6">
                Ready to Transform Your Career?
              </h2>
              <p className="text-base md:text-lg mb-8 text-blue-100">
                Join thousands who have launched successful careers through our
                free training programs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="bg-white text-blue-700 px-8 py-4 rounded-lg font-bold hover:bg-blue-50 text-lg shadow-2xl transition-all"
                >
                  Apply Now - It's Free
                </Link>
                <Link
                  href="/programs"
                  className="bg-blue-800 text-white px-8 py-4 rounded-lg font-bold hover:bg-blue-600 border-2 border-white text-lg shadow-2xl transition-all"
                >
                  Browse All Programs
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
