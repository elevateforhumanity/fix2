'use client';

import { useState } from 'react';

export default function SimpleContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">Contact Us</h1>
        
        {status === 'success' && (
          <div className="bg-green-50 border-2 border-green-500 rounded-lg p-4 mb-6">
            <p className="text-green-800 font-semibold">Message sent! We'll contact you within 24 hours.</p>
          </div>
        )}

        {status === 'error' && (
          <div className="bg-red-50 border-2 border-red-500 rounded-lg p-4 mb-6">
            <p className="text-red-800 font-semibold">Error sending message. Call us at 317-314-3757</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8 space-y-6">
          <div>
            <label className="block text-sm font-semibold mb-2">Name *</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Email *</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Phone *</label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Message *</label>
            <textarea
              required
              rows={5}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>

          <button
            type="submit"
            disabled={status === 'sending'}
            className="w-full px-8 py-4 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === 'sending' ? 'Sending...' : 'Send Message'}
          </button>
        </form>

        <div className="text-center mt-8">
          <p className="text-slate-600 mb-2">Or call us directly:</p>
          <a href="tel:3173143757" className="text-2xl font-bold text-orange-600 hover:text-orange-700">
            317-314-3757
          </a>
        </div>
      </div>
    </div>
  );
}
