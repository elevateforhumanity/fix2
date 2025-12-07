import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { ChevronLeft, ChevronRight, Plus, Calendar as CalendarIcon, Clock, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  alternates: {
    canonical: "https://www.elevateforhumanity.org/portal/student/calendar",
  },
  title: 'Calendar | Student Portal',
};

export default async function CalendarPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: events } = await supabase
    .from('calendar_events')
    .select('*')
    .eq('user_id', user.id)
    .order('start_time', { ascending: true });

  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];

  const upcomingEvents = events?.filter(e => new Date(e.start_time) >= today).slice(0, 5) || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Calendar</h1>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
            <Plus size={20} />
            New Event
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Calendar */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow">
              {/* Calendar Header */}
              <div className="p-6 border-b flex items-center justify-between">
                <h2 className="text-xl font-semibold">
                  {monthNames[currentMonth]} {currentYear}
                </h2>
                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <ChevronLeft size={20} />
                  </button>
                  <button className="px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg">
                    Today
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>

              {/* Calendar Grid */}
              <div className="p-6">
                <div className="grid grid-cols-7 gap-2 mb-2">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="text-center text-sm font-medium text-gray-600 py-2">
                      {day}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-2">
                  {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                    <div key={`empty-${i}`} className="aspect-square" />
                  ))}
                  {Array.from({ length: daysInMonth }).map((_, i) => {
                    const day = i + 1;
                    const isToday = day === today.getDate() && 
                                   currentMonth === today.getMonth() && 
                                   currentYear === today.getFullYear();
                    const hasEvents = events?.some(e => {
                      const eventDate = new Date(e.start_time);
                      return eventDate.getDate() === day &&
                             eventDate.getMonth() === currentMonth &&
                             eventDate.getFullYear() === currentYear;
                    });

                    return (
                      <button
                        key={day}
                        className={`aspect-square p-2 rounded-lg text-sm font-medium transition ${
                          isToday
                            ? 'bg-blue-600 text-white'
                            : hasEvents
                            ? 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                            : 'hover:bg-gray-100'
                        }`}
                      >
                        {day}
                        {hasEvents && !isToday && (
                          <div className="w-1 h-1 bg-blue-600 rounded-full mx-auto mt-1" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b">
                <h2 className="text-xl font-semibold">Upcoming Events</h2>
              </div>
              <div className="p-6 space-y-4">
                {upcomingEvents.length > 0 ? (
                  upcomingEvents.map((event: any) => (
                    <div key={event.id} className="border-l-4 border-blue-500 pl-4 py-2">
                      <h3 className="font-semibold text-gray-900">{event.title}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                        <Clock size={14} />
                        {new Date(event.start_time).toLocaleString()}
                      </div>
                      {event.location && (
                        <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                          <MapPin size={14} />
                          {event.location}
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <CalendarIcon className="mx-auto text-gray-400 mb-3" size={48} />
                    <p className="text-gray-600">No upcoming events</p>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Add */}
            <div className="bg-white rounded-lg shadow mt-6">
              <div className="p-6 border-b">
                <h2 className="text-xl font-semibold">Quick Add</h2>
              </div>
              <div className="p-6 space-y-4">
                <input
                  type="text"
                  placeholder="Event title"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
                <input
                  type="datetime-local"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
                <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Add Event
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
