'use client';

import { useState } from 'react';
import { Calendar, Clock, MapPin, Video, Phone } from 'lucide-react';

export default function AppointmentScheduler() {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [appointmentType, setAppointmentType] = useState<'in-person' | 'video' | 'phone'>('in-person');

  const availableTimes = [
    '9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const appointment = {
      date: selectedDate,
      time: selectedTime,
      type: appointmentType,
    };

    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(appointment),
      });

      if (response.ok) {
        alert('Appointment booked successfully!');
      }
    } catch (error) {
      console.error('Booking failed:', error);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Schedule Your Appointment</h3>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Appointment Type
          </label>
          <div className="grid grid-cols-3 gap-3">
            <button
              type="button"
              onClick={() => setAppointmentType('in-person')}
              className={`p-4 border-2 rounded-lg flex flex-col items-center gap-2 ${
                appointmentType === 'in-person' ? 'border-blue-600 bg-blue-50' : 'border-gray-200'
              }`}
            >
              <MapPin className="w-6 h-6" />
              <span className="text-sm font-medium">In-Person</span>
            </button>

            <button
              type="button"
              onClick={() => setAppointmentType('video')}
              className={`p-4 border-2 rounded-lg flex flex-col items-center gap-2 ${
                appointmentType === 'video' ? 'border-blue-600 bg-blue-50' : 'border-gray-200'
              }`}
            >
              <Video className="w-6 h-6" />
              <span className="text-sm font-medium">Video Call</span>
            </button>

            <button
              type="button"
              onClick={() => setAppointmentType('phone')}
              className={`p-4 border-2 rounded-lg flex flex-col items-center gap-2 ${
                appointmentType === 'phone' ? 'border-blue-600 bg-blue-50' : 'border-gray-200'
              }`}
            >
              <Phone className="w-6 h-6" />
              <span className="text-sm font-medium">Phone</span>
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Calendar className="w-4 h-4 inline mr-2" />
            Select Date
          </label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Clock className="w-4 h-4 inline mr-2" />
            Select Time
          </label>
          <div className="grid grid-cols-4 gap-2">
            {availableTimes.map(time => (
              <button
                key={time}
                type="button"
                onClick={() => setSelectedTime(time)}
                className={`px-4 py-2 border rounded-lg text-sm font-medium ${
                  selectedTime === time
                    ? 'border-blue-600 bg-blue-600 text-white'
                    : 'border-gray-300 hover:border-blue-600'
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={!selectedDate || !selectedTime}
          className="w-full px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
        >
          Book Appointment
        </button>
      </form>
    </div>
  );
}
