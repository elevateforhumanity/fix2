'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Calendar, Clock, Video, MapPin, Users, CheckCircle } from 'lucide-react';

const availableSlots = [
  {
    id: 1,
    date: '2025-01-06',
    time: '10:00 AM',
    type: 'In-Person',
    location: 'Keystone Crossing - 8650 Keystone Crossing, Indianapolis, IN',
    spots: 12,
    instructor: 'Sarah Johnson'
  },
  {
    id: 2,
    date: '2025-01-06',
    time: '2:00 PM',
    type: 'Virtual',
    location: 'Zoom Meeting',
    spots: 20,
    instructor: 'Michael Davis'
  },
  {
    id: 3,
    date: '2025-01-08',
    time: '10:00 AM',
    type: 'In-Person',
    location: 'Keystone Crossing - 8650 Keystone Crossing, Indianapolis, IN',
    spots: 12,
    instructor: 'Sarah Johnson'
  },
  {
    id: 4,
    date: '2025-01-08',
    time: '6:00 PM',
    type: 'Virtual',
    location: 'Zoom Meeting',
    spots: 20,
    instructor: 'Jennifer Martinez'
  },
  {
    id: 5,
    date: '2025-01-10',
    time: '10:00 AM',
    type: 'In-Person',
    location: 'Keystone Crossing - 8650 Keystone Crossing, Indianapolis, IN',
    spots: 12,
    instructor: 'Sarah Johnson'
  },
  {
    id: 6,
    date: '2025-01-10',
    time: '2:00 PM',
    type: 'Virtual',
    location: 'Zoom Meeting',
    spots: 20,
    instructor: 'Michael Davis'
  },
];

export default function OrientationSchedulePage() {
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    program: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Send to API
    setConfirmed(true);
  };

  if (confirmed) {
    const slot = availableSlots.find(s => s.id === selectedSlot);
    return (
      <main className="min-h-screen bg-gradient-to-b from-green-50 to-white py-12">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white rounded-2xl border-2 border-green-200 shadow-xl p-8 text-center">
            <div className="w-20 h-20 mx-auto rounded-full bg-green-100 flex items-center justify-center mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            
            <h1 className="text-3xl font-bold text-slate-900 mb-4">
              You're All Set!
            </h1>
            
            <p className="text-lg text-slate-600 mb-8">
              Your orientation session has been scheduled
            </p>

            {slot && (
              <div className="bg-slate-50 rounded-xl p-6 mb-8 text-left">
                <h3 className="font-bold text-slate-900 mb-4">Session Details:</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-slate-600" />
                    <span>{new Date(slot.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-slate-600" />
                    <span>{slot.time}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    {slot.type === 'Virtual' ? (
                      <Video className="w-5 h-5 text-slate-600" />
                    ) : (
                      <MapPin className="w-5 h-5 text-slate-600" />
                    )}
                    <span>{slot.location}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-slate-600" />
                    <span>Instructor: {slot.instructor}</span>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-blue-50 rounded-xl border-2 border-blue-200 p-6 mb-8 text-left">
              <h3 className="font-bold text-slate-900 mb-2">📧 Confirmation Email Sent</h3>
              <p className="text-sm text-slate-700">
                We've sent a confirmation email to <strong>{formData.email}</strong> with:
              </p>
              <ul className="mt-3 space-y-1 text-sm text-slate-700">
                <li>• Calendar invite (.ics file)</li>
                <li>• {selectedSlot && availableSlots.find(s => s.id === selectedSlot)?.type === 'Virtual' ? 'Zoom meeting link' : 'Directions to location'}</li>
                <li>• What to bring checklist</li>
                <li>• Pre-orientation materials</li>
              </ul>
            </div>

            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/orientation"
                className="inline-flex items-center justify-center rounded-full bg-green-600 px-8 py-4 text-base font-bold text-white hover:bg-green-700 transition-all shadow-lg"
              >
                Back to Orientation
              </Link>
              <Link
                href="/student/dashboard"
                className="inline-flex items-center justify-center rounded-full border-2 border-slate-300 px-8 py-4 text-base font-semibold text-slate-700 hover:bg-slate-50 transition-all"
              >
                Go to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Link href="/orientation" className="text-sm text-slate-600 hover:text-slate-900 mb-4 inline-block">
            ← Back to Orientation
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
            Schedule Your Orientation Session
          </h1>
          <p className="text-lg text-slate-600">
            Choose a time that works best for you. Sessions are available in-person and virtually.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Available Slots */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Available Sessions</h2>
            
            <div className="space-y-4">
              {availableSlots.map((slot) => (
                <button
                  key={slot.id}
                  onClick={() => setSelectedSlot(slot.id)}
                  className={`w-full text-left p-6 rounded-xl border-2 transition-all ${
                    selectedSlot === slot.id
                      ? 'border-red-500 bg-red-50'
                      : 'border-slate-200 hover:border-red-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                          slot.type === 'Virtual'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-green-100 text-green-700'
                        }`}>
                          {slot.type === 'Virtual' ? <Video className="w-3 h-3" /> : <MapPin className="w-3 h-3" />}
                          {slot.type}
                        </span>
                        <span className="text-xs text-slate-600">{slot.spots} spots left</span>
                      </div>
                      <h3 className="text-lg font-bold text-slate-900">
                        {new Date(slot.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                      </h3>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-slate-900">{slot.time}</div>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm text-slate-600">
                    <div className="flex items-center gap-2">
                      {slot.type === 'Virtual' ? (
                        <Video className="w-4 h-4" />
                      ) : (
                        <MapPin className="w-4 h-4" />
                      )}
                      <span>{slot.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>Led by {slot.instructor}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Booking Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border-2 border-slate-200 shadow-lg p-6 sticky top-4">
              <h2 className="text-xl font-bold text-slate-900 mb-6">Your Information</h2>
              
              {!selectedSlot ? (
                <div className="text-center py-8 text-slate-500">
                  <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p className="text-sm">Select a session to continue</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-red-500 focus:outline-none"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-red-500 focus:outline-none"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-red-500 focus:outline-none"
                      placeholder="(317) 555-0123"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Program of Interest *
                    </label>
                    <select
                      required
                      value={formData.program}
                      onChange={(e) => setFormData({...formData, program: e.target.value})}
                      className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-red-500 focus:outline-none"
                    >
                      <option value="">Select a program</option>
                      <option value="barber">Barber Apprenticeship</option>
                      <option value="cna">CNA Training</option>
                      <option value="hvac">HVAC Technician</option>
                      <option value="medical-assistant">Medical Assistant</option>
                      <option value="esthetician">Esthetician</option>
                      <option value="other">Other / Undecided</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center rounded-full bg-red-600 px-6 py-4 text-base font-bold text-white hover:bg-red-700 transition-all shadow-lg hover:scale-105"
                  >
                    Confirm Booking
                  </button>

                  <p className="text-xs text-slate-500 text-center">
                    You'll receive a confirmation email with session details
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
