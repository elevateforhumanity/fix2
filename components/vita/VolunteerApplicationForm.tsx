'use client';

import { useState } from 'react';

export default function VolunteerApplicationForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    availability: '',
    experience: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/vita/volunteer-apply', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    alert('Application submitted!');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Full Name"
        value={formData.name}
        onChange={(e) => setFormData({...formData, name: e.target.value})}
        className="w-full px-4 py-2 border rounded-lg"
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({...formData, email: e.target.value})}
        className="w-full px-4 py-2 border rounded-lg"
        required
      />
      <input
        type="tel"
        placeholder="Phone"
        value={formData.phone}
        onChange={(e) => setFormData({...formData, phone: e.target.value})}
        className="w-full px-4 py-2 border rounded-lg"
        required
      />
      <textarea
        placeholder="Availability"
        value={formData.availability}
        onChange={(e) => setFormData({...formData, availability: e.target.value})}
        className="w-full px-4 py-2 border rounded-lg"
        rows={3}
      />
      <textarea
        placeholder="Tax Preparation Experience"
        value={formData.experience}
        onChange={(e) => setFormData({...formData, experience: e.target.value})}
        className="w-full px-4 py-2 border rounded-lg"
        rows={4}
      />
      <button type="submit" className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-bold">
        Submit Application
      </button>
    </form>
  );
}
