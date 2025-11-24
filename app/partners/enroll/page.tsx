"use client";

import { useState } from "react";
import Link from "next/link";

export default function PartnerEnrollmentPage() {
  const [formData, setFormData] = useState({
    // Organization Info
    organizationName: "",
    organizationType: "",
    industry: "",
    website: "",
    
    // Primary Contact
    contactName: "",
    contactTitle: "",
    contactEmail: "",
    contactPhone: "",
    
    // Address
    address: "",
    city: "",
    state: "",
    zip: "",
    
    // Partnership Details
    programsInterested: [] as string[],
    capacityPerMonth: "",
    preferredSchedule: "",
    hasSupervision: "",
    
    // Additional Info
    experience: "",
    specialRequirements: "",
    howHeard: "",
    
    // Agreement
    agreedToTerms: false,
  });

  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<null | { type: "success" | "error"; msg: string }>(null);

  const programOptions = [
    "Barber Apprenticeship",
    "Medical Assistant",
    "HVAC Technician",
    "Building Maintenance",
    "CDL / Commercial Driving",
    "Workforce Readiness",
    "Digital Skills",
    "Other (specify in notes)",
  ];

  const organizationTypes = [
    "Barbershop / Salon",
    "Healthcare Clinic / Medical Office",
    "HVAC / Trades Company",
    "Building Maintenance / Facilities",
    "Logistics / Transportation",
    "Manufacturing",
    "Office / Administrative",
    "Community Organization",
    "Workforce Development Agency",
    "Other",
  ];

  function handleProgramToggle(program: string) {
    setFormData(prev => ({
      ...prev,
      programsInterested: prev.programsInterested.includes(program)
        ? prev.programsInterested.filter(p => p !== program)
        : [...prev.programsInterested, program]
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus(null);

    // Validation
    if (!formData.organizationName || !formData.contactName || !formData.contactEmail) {
      setStatus({
        type: "error",
        msg: "Please complete all required fields.",
      });
      return;
    }

    if (formData.programsInterested.length === 0) {
      setStatus({
        type: "error",
        msg: "Please select at least one program you're interested in hosting.",
      });
      return;
    }

    if (!formData.agreedToTerms) {
      setStatus({
        type: "error",
        msg: "Please agree to the terms to continue.",
      });
      return;
    }

    try {
      setSubmitting(true);
      const res = await fetch("/api/partners/enroll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || "Unable to submit enrollment.");
      }

      setStatus({
        type: "success",
        msg: "Thank you! Your partner enrollment has been received. We'll contact you within 2 business days.",
      });

      // Reset form
      setFormData({
        organizationName: "",
        organizationType: "",
        industry: "",
        website: "",
        contactName: "",
        contactTitle: "",
        contactEmail: "",
        contactPhone: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        programsInterested: [],
        capacityPerMonth: "",
        preferredSchedule: "",
        hasSupervision: "",
        experience: "",
        specialRequirements: "",
        howHeard: "",
        agreedToTerms: false,
      });
    } catch (err: any) {
      console.error(err);
      setStatus({
        type: "error",
        msg: err?.message || "Something went wrong. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="bg-slate-50 text-slate-900">
      {/* Header */}
      <section className="border-b border-slate-100 bg-white">
        <div className="mx-auto max-w-4xl px-4 py-10 md:py-14">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-500">
            Partner Enrollment
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Become a Training Partner
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-slate-700">
            Join our network of employers, training sites, and organizations hosting Elevate learners.
            Complete this form to start the partnership process.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="mx-auto max-w-4xl px-4 py-8 md:py-10">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Organization Information */}
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">
              Organization Information
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Organization Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  className="w-full rounded-xl border border-slate-200 px-4 py-2 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                  value={formData.organizationName}
                  onChange={(e) => setFormData({...formData, organizationName: e.target.value})}
                  placeholder="Your business or organization name"
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">
                    Organization Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    className="w-full rounded-xl border border-slate-200 px-4 py-2 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                    value={formData.organizationType}
                    onChange={(e) => setFormData({...formData, organizationType: e.target.value})}
                  >
                    <option value="">Select type...</option>
                    {organizationTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">
                    Industry / Sector
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-xl border border-slate-200 px-4 py-2 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                    value={formData.industry}
                    onChange={(e) => setFormData({...formData, industry: e.target.value})}
                    placeholder="e.g., Healthcare, Trades, Logistics"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Website
                </label>
                <input
                  type="url"
                  className="w-full rounded-xl border border-slate-200 px-4 py-2 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                  value={formData.website}
                  onChange={(e) => setFormData({...formData, website: e.target.value})}
                  placeholder="https://yourwebsite.com"
                />
              </div>
            </div>
          </div>

          {/* Primary Contact */}
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">
              Primary Contact
            </h2>
            
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">
                    Contact Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full rounded-xl border border-slate-200 px-4 py-2 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                    value={formData.contactName}
                    onChange={(e) => setFormData({...formData, contactName: e.target.value})}
                    placeholder="First and last name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">
                    Title / Role
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-xl border border-slate-200 px-4 py-2 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                    value={formData.contactTitle}
                    onChange={(e) => setFormData({...formData, contactTitle: e.target.value})}
                    placeholder="Owner, Manager, Director, etc."
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full rounded-xl border border-slate-200 px-4 py-2 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                    value={formData.contactEmail}
                    onChange={(e) => setFormData({...formData, contactEmail: e.target.value})}
                    placeholder="you@gmail.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    className="w-full rounded-xl border border-slate-200 px-4 py-2 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                    value={formData.contactPhone}
                    onChange={(e) => setFormData({...formData, contactPhone: e.target.value})}
                    placeholder="(555) 555-5555"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">
              Location
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Street Address
                </label>
                <input
                  type="text"
                  className="w-full rounded-xl border border-slate-200 px-4 py-2 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  placeholder="123 Main Street"
                />
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-xl border border-slate-200 px-4 py-2 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                    value={formData.city}
                    onChange={(e) => setFormData({...formData, city: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">
                    State
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-xl border border-slate-200 px-4 py-2 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                    value={formData.state}
                    onChange={(e) => setFormData({...formData, state: e.target.value})}
                    placeholder="IN"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-xl border border-slate-200 px-4 py-2 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-1 focus:ring-orange-500"
                    value={formData.zip}
                    onChange={(e) => setFormData({...formData, zip: e.target.value})}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Partnership Details */}
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">
              Partnership Details
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Programs Interested in Hosting <span className="text-red-500">*</span>
                </label>
                <p className="text-xs text-slate-600 mb-3">
                  Select all that apply
                </p>
                <div className="space-y-2">
                  {programOptions.map(program => (
                    <label key={program} className="flex items-center gap-2 text-sm text-slate-700">
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-slate-300 text-orange-500 focus:ring-orange-500"
                        checked={formData.programsInterested.includes(program)}
                        onChange={() => handleProgramToggle(program)}
                      />
                      <span>{program}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">
                    Capacity Per Month
                  </label>
                  <select
                    className="w-full rounded-xl border border-slate-200 px-4 py-2 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                    value={formData.capacityPerMonth}
                    onChange={(e) => setFormData({...formData, capacityPerMonth: e.target.value})}
                  >
                    <option value="">Select capacity...</option>
                    <option value="1-2">1-2 learners</option>
                    <option value="3-5">3-5 learners</option>
                    <option value="6-10">6-10 learners</option>
                    <option value="10+">10+ learners</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">
                    Preferred Schedule
                  </label>
                  <select
                    className="w-full rounded-xl border border-slate-200 px-4 py-2 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                    value={formData.preferredSchedule}
                    onChange={(e) => setFormData({...formData, preferredSchedule: e.target.value})}
                  >
                    <option value="">Select schedule...</option>
                    <option value="Full-time (40 hrs/week)">Full-time (40 hrs/week)</option>
                    <option value="Part-time (20-30 hrs/week)">Part-time (20-30 hrs/week)</option>
                    <option value="Flexible">Flexible</option>
                    <option value="Weekends only">Weekends only</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Do you have licensed/certified staff to supervise learners?
                </label>
                <select
                  className="w-full rounded-xl border border-slate-200 px-4 py-2 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                  value={formData.hasSupervision}
                  onChange={(e) => setFormData({...formData, hasSupervision: e.target.value})}
                >
                  <option value="">Select...</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                  <option value="Unsure">Unsure</option>
                </select>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">
              Additional Information
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Previous Experience Hosting Learners/Interns
                </label>
                <textarea
                  rows={3}
                  className="w-full rounded-xl border border-slate-200 px-4 py-2 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                  value={formData.experience}
                  onChange={(e) => setFormData({...formData, experience: e.target.value})}
                  placeholder="Briefly describe any previous experience..."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Special Requirements or Considerations
                </label>
                <textarea
                  rows={3}
                  className="w-full rounded-xl border border-slate-200 px-4 py-2 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                  value={formData.specialRequirements}
                  onChange={(e) => setFormData({...formData, specialRequirements: e.target.value})}
                  placeholder="Background checks, drug testing, specific certifications, etc."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  How did you hear about Elevate for Humanity?
                </label>
                <input
                  type="text"
                  className="w-full rounded-xl border border-slate-200 px-4 py-2 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                  value={formData.howHeard}
                  onChange={(e) => setFormData({...formData, howHeard: e.target.value})}
                  placeholder="Referral, website, event, etc."
                />
              </div>
            </div>
          </div>

          {/* Agreement */}
          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-6">
            <label className="flex items-start gap-3 text-sm text-slate-700">
              <input
                type="checkbox"
                required
                className="mt-1 h-4 w-4 rounded border-slate-300 text-orange-500 focus:ring-orange-500"
                checked={formData.agreedToTerms}
                onChange={(e) => setFormData({...formData, agreedToTerms: e.target.checked})}
              />
              <span>
                I confirm that I am authorized to represent this organization and agree to review the{" "}
                <Link href="/program-holders/acknowledgement" className="text-orange-600 hover:text-orange-700 font-semibold">
                  Program Holder Responsibilities
                </Link>{" "}
                and{" "}
                <a href="/UNIVERSAL_PROGRAM_PARTNER_MOU.md" target="_blank" className="text-orange-600 hover:text-orange-700 font-semibold">
                  Universal Partner MOU
                </a>{" "}
                as part of the partnership process. <span className="text-red-500">*</span>
              </span>
            </label>
          </div>

          {/* Status Message */}
          {status && (
            <div className={`rounded-xl p-4 ${
              status.type === "success" 
                ? "bg-red-50 border border-red-200 text-emerald-800" 
                : "bg-red-50 border border-red-200 text-red-800"
            }`}>
              <p className="text-sm">{status.msg}</p>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center justify-center rounded-2xl bg-orange-500 px-8 py-3 text-sm font-semibold text-white shadow-sm hover:bg-orange-600 disabled:opacity-60"
            >
              {submitting ? "Submitting..." : "Submit Partner Enrollment"}
            </button>
            <Link
              href="/partners"
              className="inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-white px-8 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </Link>
          </div>
        </form>
      </section>
    </main>
  );
}
