'use client';

import { useState, useEffect } from 'react';
import { Calendar, MapPin, Clock } from 'lucide-react';

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
}

export default function EventCalendar() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    fetch('/api/rise/events').then(r => r.json()).then(setEvents);
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Calendar className="w-6 h-6" />
        Upcoming Events
      </h3>
      <div className="space-y-4">
        {events.map(event => (
          <div key={event.id} className="border-l-4 border-blue-600 pl-4 py-2">
            <h4 className="font-bold text-lg">{event.title}</h4>
            <div className="flex items-center gap-4 text-sm text-gray-600 mt-2">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {event.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {event.time}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {event.location}
              </span>
            </div>
            <p className="text-gray-700 mt-2">{event.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
