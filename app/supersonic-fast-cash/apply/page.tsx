'use client';

import { useState } from 'react';

export default function ApplyPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    amount: '',
    purpose: '',
    income: '',
    employmentStatus: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-5xl font-bold text-center mb-8 text-green-900">
          Apply for Fast Cash
        </h1>
        <p className="text-xl text-center mb-12 text-gray-700 max-w-3xl mx-auto">
          Complete this quick application and get approved in minutes
        </p>

        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-4 text-green-800">Personal Information</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="mb-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-4 text-green-800">Loan Details</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Loan Amount</label>
                  <select
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  >
                    <option value="">Select amount</option>
                    <option value="500">$500</option>
                    <option value="1000">$1,000</option>
                    <option value="2000">$2,000</option>
                    <option value="3000">$3,000</option>
                    <option value="5000">$5,000</option>
                    <option value="10000">$10,000+</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Loan Purpose</label>
                  <select
                    name="purpose"
                    value={formData.purpose}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  >
                    <option value="">Select purpose</option>
                    <option value="emergency">Emergency Expense</option>
                    <option value="bills">Pay Bills</option>
                    <option value="debt">Debt Consolidation</option>
                    <option value="home">Home Improvement</option>
                    <option value="business">Business</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-4 text-green-800">Employment Information</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Employment Status</label>
                  <select
                    name="employmentStatus"
                    value={formData.employmentStatus}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  >
                    <option value="">Select status</option>
                    <option value="employed">Employed Full-Time</option>
                    <option value="parttime">Employed Part-Time</option>
                    <option value="selfemployed">Self-Employed</option>
                    <option value="retired">Retired</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Monthly Income</label>
                  <select
                    name="income"
                    value={formData.income}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  >
                    <option value="">Select income range</option>
                    <option value="1000">$1,000 - $2,000</option>
                    <option value="2000">$2,000 - $3,000</option>
                    <option value="3000">$3,000 - $5,000</option>
                    <option value="5000">$5,000+</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-green-50 p-4 rounded-lg mb-6">
              <p className="text-sm text-gray-700">
                By submitting this application, you agree to our Terms of Service and Privacy Policy. 
                We use bank-level encryption to protect your information.
              </p>
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-lg font-bold text-lg hover:bg-green-700 transition-colors"
            >
              Submit Application
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Questions? Call us at <span className="font-bold text-green-600">1-800-FAST-CASH</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
