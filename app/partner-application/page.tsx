"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import toast from "react-hot-toast";

export default function PartnerApplicationPage() {
  const [formData, setFormData] = useState({
    // Contact Information
    organizationName: "",
    contactName: "",
    email: "",
    phone: "",
    website: "",
    
    // Partnership Type
    partnershipType: [] as string[],
    
    // Location
    address: "",
    city: "",
    state: "IN",
    zip: "",
    serviceArea: "",
    
    // Programs
    currentPrograms: "",
    desiredPrograms: "",
    
    // Capacity
    studentCapacity: "",
    operatingDays: "",
    operatingHours: "",
    virtualOnsite: "",
    
    // Goals
    goals: [] as string[],
    otherGoals: "",
    
    // Additional Info
    additionalInfo: "",
  });

  const [submitting, setSubmitting] = useState(false);

  const partnershipTypes = [
    "Program Holder / Licensed School",
    "Barbershop / Salon / Apprenticeship Site",
    "Employer / Hiring Partner",
    "Community Organization",
    "Youth Agency",
    "Training Provider / Instructor",
    "Workforce Board / Agency",
    "Other"
  ];

  const goalOptions = [
    "Grow enrollment",
    "Add workforce funding",
    "Host apprentices",
    "Start a new program",
    "Strengthen compliance",
    "Add digital/onboarding systems",
    "Employer pipeline development",
    "Other"
  ];

  function handleCheckboxChange(field: "partnershipType" | "goals", value: string) {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(v => v !== value)
        : [...prev[field], value]
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);

    try {
      const supabase = createClient();

      // Save to marketing_contacts
      const { error: contactError } = await supabase
        .from("marketing_contacts")
        .insert({
          email: formData.email,
          full_name: formData.contactName,
          phone: formData.phone,
          message: `Partnership Application from ${formData.organizationName}`,
          interest: formData.partnershipType.join(", "),
          status: "new",
          source: "partner_application"
        });

      if (contactError && contactError.code !== "23505") {
        throw contactError;
      }

      // Save detailed application
      const applicationData = {
        ...formData,
        partnershipType: formData.partnershipType.join(", "),
        goals: formData.goals.join(", "),
        submittedAt: new Date().toISOString()
      };

      // Send notification email
      await fetch("/api/marketing/send-welcome", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          name: formData.contactName,
          interest: formData.partnershipType.join(", "),
          subject: "Thank You for Your Partnership Application",
          body: `Hi ${formData.contactName},

Thank you for submitting your partnership application to Elevate for Humanity!

We've received your information and will review it within 2-3 business days. Here's what happens next:

1. Our team will review your application
2. We'll send you the Program Holder Onboarding Packet
3. We'll schedule a call to discuss next steps
4. We'll provide the MOU and required paperwork

In the meantime, feel free to explore our website and learn more about our programs at elevateforhumanity.org

If you have any immediate questions, please reply to this email or call us at (317) 555-0100.

Thank you for your interest in partnering with Elevate for Humanity!

Warm regards,
Elizabeth Greene
Founder, Elevate for Humanity
elevateforhumanity.org`
        })
      });

      toast.success("Application submitted successfully!");
      
      // Reset form
      setFormData({
        organizationName: "",
        contactName: "",
        email: "",
        phone: "",
        website: "",
        partnershipType: [],
        address: "",
        city: "",
        state: "IN",
        zip: "",
        serviceArea: "",
        currentPrograms: "",
        desiredPrograms: "",
        studentCapacity: "",
        operatingDays: "",
        operatingHours: "",
        virtualOnsite: "",
        goals: [],
        otherGoals: "",
        additionalInfo: "",
      });

    } catch (err: any) {
      console.error("Error submitting application:", err);
      toast.error("Failed to submit application. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-orange-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Partner with Elevate for Humanity
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join our network of training providers, employers, and community organizations 
            making a difference in workforce development.
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Contact Information */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Organization Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.organizationName}
                    onChange={(e) => setFormData({...formData, organizationName: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.contactName}
                    onChange={(e) => setFormData({...formData, contactName: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Website
                  </label>
                  <input
                    type="url"
                    value={formData.website}
                    onChange={(e) => setFormData({...formData, website: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </section>

            {/* Partnership Type */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Partnership Type *</h2>
              <p className="text-sm text-gray-600 mb-4">Select all that apply</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {partnershipTypes.map((type) => (
                  <label key={type} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.partnershipType.includes(type)}
                      onChange={() => handleCheckboxChange("partnershipType", type)}
                      className="w-4 h-4 text-brandPrimary border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{type}</span>
                  </label>
                ))}
              </div>
            </section>

            {/* Location */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Location & Service Area</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Street Address
                  </label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({...formData, city: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    State *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.state}
                    onChange={(e) => setFormData({...formData, state: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Service Area (cities/counties you serve)
                  </label>
                  <input
                    type="text"
                    value={formData.serviceArea}
                    onChange={(e) => setFormData({...formData, serviceArea: e.target.value})}
                    placeholder="e.g., 8888 Keystone Crossing Suite 1300, Indianapolis, IN 46240polis Metro Area"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </section>

            {/* Programs */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Programs</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Programs You Offer
                  </label>
                  <textarea
                    value={formData.currentPrograms}
                    onChange={(e) => setFormData({...formData, currentPrograms: e.target.value})}
                    rows={3}
                    placeholder="e.g., HVAC, Barbering, CDL, etc."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Programs You Want to Offer
                  </label>
                  <textarea
                    value={formData.desiredPrograms}
                    onChange={(e) => setFormData({...formData, desiredPrograms: e.target.value})}
                    rows={3}
                    placeholder="e.g., Medical Assistant, Cosmetology, etc."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </section>

            {/* Capacity */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Capacity</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Student Capacity
                  </label>
                  <input
                    type="text"
                    value={formData.studentCapacity}
                    onChange={(e) => setFormData({...formData, studentCapacity: e.target.value})}
                    placeholder="e.g., 10-15 students per cohort"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Operating Days
                  </label>
                  <input
                    type="text"
                    value={formData.operatingDays}
                    onChange={(e) => setFormData({...formData, operatingDays: e.target.value})}
                    placeholder="e.g., Monday-Friday"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Operating Hours
                  </label>
                  <input
                    type="text"
                    value={formData.operatingHours}
                    onChange={(e) => setFormData({...formData, operatingHours: e.target.value})}
                    placeholder="e.g., 9am-5pm"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Virtual + Onsite Support
                  </label>
                  <select
                    value={formData.virtualOnsite}
                    onChange={(e) => setFormData({...formData, virtualOnsite: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select...</option>
                    <option value="onsite">Onsite Only</option>
                    <option value="virtual">Virtual Only</option>
                    <option value="hybrid">Hybrid (Both)</option>
                  </select>
                </div>
              </div>
            </section>

            {/* Goals */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Immediate Goals</h2>
              <p className="text-sm text-gray-600 mb-4">Select all that apply</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                {goalOptions.map((goal) => (
                  <label key={goal} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.goals.includes(goal)}
                      onChange={() => handleCheckboxChange("goals", goal)}
                      className="w-4 h-4 text-brandPrimary border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{goal}</span>
                  </label>
                ))}
              </div>
              
              {formData.goals.includes("Other") && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Please specify other goals
                  </label>
                  <textarea
                    value={formData.otherGoals}
                    onChange={(e) => setFormData({...formData, otherGoals: e.target.value})}
                    rows={2}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              )}
            </section>

            {/* Additional Information */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Additional Information</h2>
              <textarea
                value={formData.additionalInfo}
                onChange={(e) => setFormData({...formData, additionalInfo: e.target.value})}
                rows={4}
                placeholder="Tell us anything else we should know about your organization or partnership goals..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </section>

            {/* Submit Button */}
            <div className="flex justify-center pt-6">
              <button
                type="submit"
                disabled={submitting}
                className="px-8 py-4 bg-brandPrimary text-white font-semibold rounded-xl hover:bg-brandPrimaryDark disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl"
              >
                {submitting ? "Submitting..." : "Submit Partnership Application"}
              </button>
            </div>
          </form>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center text-sm text-gray-600">
          <p>Questions? Contact us at elizabeth@elevateforhumanity.org or (317) 555-0100</p>
        </div>
      </div>
    </div>
  );
}
