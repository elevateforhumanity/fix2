// app/apply/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowLeft, CheckCircle, User, GraduationCap, DollarSign, FileText } from "lucide-react";

type Step = 1 | 2 | 3 | 4;

export default function ApplyPage() {
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [formData, setFormData] = useState({
    // Step 1: Personal Information
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    address: "",
    city: "",
    state: "IN",
    zipCode: "",
    
    // Step 2: Program Selection
    program: "",
    startDate: "",
    schedule: "",
    
    // Step 3: Funding & Eligibility
    fundingType: "",
    employmentStatus: "",
    householdIncome: "",
    hasHighSchoolDiploma: "",
    
    // Step 4: Additional Information
    hasTransportation: "",
    needsChildcare: "",
    hasComputerAccess: "",
    additionalInfo: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep((currentStep + 1) as Step);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((currentStep - 1) as Step);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        window.location.href = "/apply/success";
      } else {
        alert("There was an error submitting your application. Please try again.");
      }
    } catch (error) {
      alert("There was an error submitting your application. Please try again.");
    }
  };

  const steps = [
    { number: 1, title: "Personal Info", icon: <User size={20} /> },
    { number: 2, title: "Program", icon: <GraduationCap size={20} /> },
    { number: 3, title: "Funding", icon: <DollarSign size={20} /> },
    { number: 4, title: "Review", icon: <FileText size={20} /> },
  ];

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-red-600 to-red-700 text-white py-12">
        <div className="mx-auto max-w-4xl px-6">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Apply for Free Training
          </h1>
          <p className="text-lg text-emerald-100">
            Complete this application to get started. It takes about 10 minutes.
          </p>
        </div>
      </section>

      {/* Progress Steps */}
      <section className="bg-white border-b border-slate-200">
        <div className="mx-auto max-w-4xl px-6 py-6">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-colors ${
                      currentStep >= step.number
                        ? "bg-red-600 text-white"
                        : "bg-slate-200 text-slate-500"
                    }`}
                  >
                    {currentStep > step.number ? (
                      <CheckCircle size={24} />
                    ) : (
                      step.icon
                    )}
                  </div>
                  <div className="mt-2 text-center">
                    <div className={`text-xs font-semibold ${
                      currentStep >= step.number ? "text-red-600" : "text-slate-500"
                    }`}>
                      Step {step.number}
                    </div>
                    <div className="text-xs text-slate-600 hidden sm:block">
                      {step.title}
                    </div>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`h-1 flex-1 mx-2 transition-colors ${
                    currentStep > step.number ? "bg-red-600" : "bg-slate-200"
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-12">
        <div className="mx-auto max-w-4xl px-6">
          <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-200">
            <form onSubmit={handleSubmit}>
              {/* Step 1: Personal Information */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">
                      Personal Information
                    </h2>
                    <p className="text-slate-600">
                      Let's start with some basic information about you.
                    </p>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-semibold text-slate-900 mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label htmlFor="lastName" className="block text-sm font-semibold text-slate-900 mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-slate-900 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold text-slate-900 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="dateOfBirth" className="block text-sm font-semibold text-slate-900 mb-2">
                      Date of Birth *
                    </label>
                    <input
                      type="date"
                      id="dateOfBirth"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="address" className="block text-sm font-semibold text-slate-900 mb-2">
                      Street Address *
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-colors"
                    />
                  </div>

                  <div className="grid gap-6 md:grid-cols-3">
                    <div>
                      <label htmlFor="city" className="block text-sm font-semibold text-slate-900 mb-2">
                        City *
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label htmlFor="state" className="block text-sm font-semibold text-slate-900 mb-2">
                        State *
                      </label>
                      <select
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-colors"
                      >
                        <option value="IN">Indiana</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="zipCode" className="block text-sm font-semibold text-slate-900 mb-2">
                        ZIP Code *
                      </label>
                      <input
                        type="text"
                        id="zipCode"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                        required
                        pattern="[0-9]{5}"
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-colors"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Program Selection */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">
                      Choose Your Program
                    </h2>
                    <p className="text-slate-600">
                      Select the healthcare career training program you're interested in.
                    </p>
                  </div>

                  <div>
                    <label htmlFor="program" className="block text-sm font-semibold text-slate-900 mb-2">
                      Training Program *
                    </label>
                    <select
                      id="program"
                      name="program"
                      value={formData.program}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-colors"
                    >
                      <option value="">Select a program</option>
                      <option value="medical-assistant">Medical Assistant (12 weeks)</option>
                      <option value="phlebotomy">Phlebotomy Technician (8 weeks)</option>
                      <option value="ekg-technician">EKG Technician (6 weeks)</option>
                      <option value="pharmacy-technician">Pharmacy Technician (12 weeks)</option>
                      <option value="dental-assistant">Dental Assistant (10 weeks)</option>
                      <option value="patient-care-technician">Patient Care Technician (14 weeks)</option>
                      <option value="sterile-processing">Sterile Processing Technician (12 weeks)</option>
                      <option value="healthcare-administration">Healthcare Administration (16 weeks)</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="startDate" className="block text-sm font-semibold text-slate-900 mb-2">
                      Preferred Start Date *
                    </label>
                    <select
                      id="startDate"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-colors"
                    >
                      <option value="">Select a start date</option>
                      <option value="asap">As soon as possible</option>
                      <option value="next-month">Next month</option>
                      <option value="2-3-months">2-3 months</option>
                      <option value="flexible">Flexible</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="schedule" className="block text-sm font-semibold text-slate-900 mb-2">
                      Preferred Schedule *
                    </label>
                    <select
                      id="schedule"
                      name="schedule"
                      value={formData.schedule}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-colors"
                    >
                      <option value="">Select a schedule</option>
                      <option value="full-time-day">Full-time (Daytime)</option>
                      <option value="part-time-evening">Part-time (Evenings)</option>
                      <option value="weekend">Weekend</option>
                      <option value="flexible">Flexible</option>
                    </select>
                  </div>

                  <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                    <p className="text-sm text-slate-700">
                      <strong>Note:</strong> All programs are 100% free through state and federal funding. You will not pay any tuition or fees.
                    </p>
                  </div>
                </div>
              )}

              {/* Step 3: Funding & Eligibility */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">
                      Funding & Eligibility
                    </h2>
                    <p className="text-slate-600">
                      Help us determine which funding programs you may qualify for.
                    </p>
                  </div>

                  <div>
                    <label htmlFor="fundingType" className="block text-sm font-semibold text-slate-900 mb-2">
                      Preferred Funding Source *
                    </label>
                    <select
                      id="fundingType"
                      name="fundingType"
                      value={formData.fundingType}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-colors"
                    >
                      <option value="">Select funding type</option>
                      <option value="wioa">WIOA (Workforce Innovation and Opportunity Act)</option>
                      <option value="wrg">WRG (Workforce Ready Grant)</option>
                      <option value="next-level-jobs">Next Level Jobs</option>
                      <option value="not-sure">Not sure / Need help</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="employmentStatus" className="block text-sm font-semibold text-slate-900 mb-2">
                      Current Employment Status *
                    </label>
                    <select
                      id="employmentStatus"
                      name="employmentStatus"
                      value={formData.employmentStatus}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-colors"
                    >
                      <option value="">Select status</option>
                      <option value="unemployed">Unemployed</option>
                      <option value="underemployed">Underemployed (working part-time, want full-time)</option>
                      <option value="employed">Employed (seeking career change)</option>
                      <option value="student">Student</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="householdIncome" className="block text-sm font-semibold text-slate-900 mb-2">
                      Annual Household Income *
                    </label>
                    <select
                      id="householdIncome"
                      name="householdIncome"
                      value={formData.householdIncome}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-colors"
                    >
                      <option value="">Select income range</option>
                      <option value="under-25k">Under $25,000</option>
                      <option value="25k-35k">$25,000 - $35,000</option>
                      <option value="35k-50k">$35,000 - $50,000</option>
                      <option value="50k-75k">$50,000 - $75,000</option>
                      <option value="over-75k">Over $75,000</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="hasHighSchoolDiploma" className="block text-sm font-semibold text-slate-900 mb-2">
                      Do you have a high school diploma or GED? *
                    </label>
                    <select
                      id="hasHighSchoolDiploma"
                      name="hasHighSchoolDiploma"
                      value={formData.hasHighSchoolDiploma}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-colors"
                    >
                      <option value="">Select option</option>
                      <option value="yes">Yes</option>
                      <option value="no">No, but working on it</option>
                      <option value="no-not-working">No</option>
                    </select>
                  </div>

                  <div className="p-4 bg-red-50 rounded-xl border border-red-200">
                    <p className="text-sm text-slate-700">
                      <strong>Good News:</strong> Most applicants qualify for at least one funding program. We'll help you through the entire process.
                    </p>
                  </div>
                </div>
              )}

              {/* Step 4: Review & Submit */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">
                      Review & Submit
                    </h2>
                    <p className="text-slate-600">
                      Please review your information and answer a few final questions.
                    </p>
                  </div>

                  <div className="space-y-4 p-6 bg-slate-50 rounded-xl">
                    <div>
                      <div className="text-sm font-semibold text-slate-600 mb-1">Name</div>
                      <div className="text-slate-900">{formData.firstName} {formData.lastName}</div>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-600 mb-1">Contact</div>
                      <div className="text-slate-900">{formData.email}</div>
                      <div className="text-slate-900">{formData.phone}</div>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-600 mb-1">Program</div>
                      <div className="text-slate-900">{formData.program}</div>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="hasTransportation" className="block text-sm font-semibold text-slate-900 mb-2">
                      Do you have reliable transportation? *
                    </label>
                    <select
                      id="hasTransportation"
                      name="hasTransportation"
                      value={formData.hasTransportation}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-colors"
                    >
                      <option value="">Select option</option>
                      <option value="yes">Yes</option>
                      <option value="no">No, I need assistance</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="needsChildcare" className="block text-sm font-semibold text-slate-900 mb-2">
                      Do you need childcare assistance? *
                    </label>
                    <select
                      id="needsChildcare"
                      name="needsChildcare"
                      value={formData.needsChildcare}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-colors"
                    >
                      <option value="">Select option</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="hasComputerAccess" className="block text-sm font-semibold text-slate-900 mb-2">
                      Do you have access to a computer and internet? *
                    </label>
                    <select
                      id="hasComputerAccess"
                      name="hasComputerAccess"
                      value={formData.hasComputerAccess}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-colors"
                    >
                      <option value="">Select option</option>
                      <option value="yes">Yes</option>
                      <option value="no">No, I need assistance</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="additionalInfo" className="block text-sm font-semibold text-slate-900 mb-2">
                      Additional Information (Optional)
                    </label>
                    <textarea
                      id="additionalInfo"
                      name="additionalInfo"
                      value={formData.additionalInfo}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-colors resize-none"
                      placeholder="Is there anything else you'd like us to know?"
                    />
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-200">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-slate-300 text-slate-700 font-semibold hover:border-red-600 hover:text-red-600 transition-all"
                  >
                    <ArrowLeft size={20} />
                    Back
                  </button>
                ) : (
                  <Link
                    href="/"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-slate-300 text-slate-700 font-semibold hover:border-red-600 hover:text-red-600 transition-all"
                  >
                    <ArrowLeft size={20} />
                    Cancel
                  </Link>
                )}

                {currentStep < 4 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-red-600 text-white font-bold shadow-lg hover:bg-red-700 transition-all hover:scale-105"
                  >
                    Continue
                    <ArrowRight size={20} />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-red-600 text-white font-bold shadow-lg hover:bg-red-700 transition-all hover:scale-105"
                  >
                    Submit Application
                    <CheckCircle size={20} />
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
