import React, { useState } from 'react';

export function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState('month'); // month, week, day
  const [events, setEvents] = useState([
    { id: 1, title: 'Team Meeting', date: new Date(2024, 0, 15, 10, 0), duration: 60, color: '#3b82f6' },
    { id: 2, title: 'Project Deadline', date: new Date(2024, 0, 20, 17, 0), duration: 30, color: '#ef4444' },
    { id: 3, title: 'Lunch with Client', date: new Date(2024, 0, 18, 12, 0), duration: 90, color: '#10b981' }
  ]);
  const [showEventModal, setShowEventModal] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: '', date: '', time: '', duration: 60 });

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days = [];
    
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  };

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const addEvent = () => {
    const event = {
      id: Date.now(),
      title: newEvent.title,
      date: new Date(`${newEvent.date}T${newEvent.time}`),
      duration: parseInt(newEvent.duration),
      color: '#3b82f6'
    };
    setEvents([...events, event]);
    setShowEventModal(false);
    setNewEvent({ title: '', date: '', time: '', duration: 60 });
  };

  const days = getDaysInMonth(currentDate);

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#f9fafb' }}>
      {/* Header */}
      <div style={{ backgroundColor: '#fff', borderBottom: '1px solid #e5e7eb', padding: '1rem 2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <h1 style={{ fontSize: '1.5rem', fontWeight: '600' }}>📅 Calendar</h1>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button onClick={previousMonth} style={{ padding: '0.5rem 1rem', backgroundColor: '#f3f4f6', border: 'none', borderRadius: '0.375rem', cursor: 'pointer' }}>
                ←
              </button>
              <button onClick={nextMonth} style={{ padding: '0.5rem 1rem', backgroundColor: '#f3f4f6', border: 'none', borderRadius: '0.375rem', cursor: 'pointer' }}>
                →
              </button>
            </div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '500' }}>
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button onClick={() => setView('month')} style={{ padding: '0.5rem 1rem', backgroundColor: view === 'month' ? '#3b82f6' : '#f3f4f6', color: view === 'month' ? '#fff' : '#000', border: 'none', borderRadius: '0.375rem', cursor: 'pointer' }}>
                Month
              </button>
              <button onClick={() => setView('week')} style={{ padding: '0.5rem 1rem', backgroundColor: view === 'week' ? '#3b82f6' : '#f3f4f6', color: view === 'week' ? '#fff' : '#000', border: 'none', borderRadius: '0.375rem', cursor: 'pointer' }}>
                Week
              </button>
              <button onClick={() => setView('day')} style={{ padding: '0.5rem 1rem', backgroundColor: view === 'day' ? '#3b82f6' : '#f3f4f6', color: view === 'day' ? '#fff' : '#000', border: 'none', borderRadius: '0.375rem', cursor: 'pointer' }}>
                Day
              </button>
            </div>
            <button onClick={() => setShowEventModal(true)} style={{ padding: '0.5rem 1.5rem', backgroundColor: '#3b82f6', color: '#fff', border: 'none', borderRadius: '0.375rem', cursor: 'pointer', fontWeight: '600' }}>
              + New Event
            </button>
          </div>
        </div>
      </div>

      {/* Calendar Grid */}
      <div style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
        <div style={{ backgroundColor: '#fff', borderRadius: '0.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
          {/* Day Headers */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
            {dayNames.map(day => (
              <div key={day} style={{ padding: '1rem', textAlign: 'center', fontWeight: '600', color: '#6b7280' }}>
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)' }}>
            {days.map((day, index) => (
              <div key={index} style={{ minHeight: '120px', padding: '0.5rem', border: '1px solid #e5e7eb', backgroundColor: day ? '#fff' : '#f9fafb' }}>
                {day && (
                  <>
                    <div style={{ fontWeight: '600', marginBottom: '0.5rem' }}>{day}</div>
                    {events.filter(e => e.date.getDate() === day && e.date.getMonth() === currentDate.getMonth()).map(event => (
                      <div key={event.id} style={{ padding: '0.25rem 0.5rem', backgroundColor: event.color, color: '#fff', borderRadius: '0.25rem', fontSize: '0.75rem', marginBottom: '0.25rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {event.title}
                      </div>
                    ))}
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* New Event Modal */}
      {showEventModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: '#fff', padding: '2rem', borderRadius: '0.5rem', width: '500px', maxWidth: '90%' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1.5rem' }}>New Event</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <input type="text" placeholder="Event Title" value={newEvent.title} onChange={(e) => setNewEvent({...newEvent, title: e.target.value})} style={{ padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', fontSize: '1rem' }} />
              <input type="date" value={newEvent.date} onChange={(e) => setNewEvent({...newEvent, date: e.target.value})} style={{ padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', fontSize: '1rem' }} />
              <input type="time" value={newEvent.time} onChange={(e) => setNewEvent({...newEvent, time: e.target.value})} style={{ padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', fontSize: '1rem' }} />
              <select value={newEvent.duration} onChange={(e) => setNewEvent({...newEvent, duration: e.target.value})} style={{ padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', fontSize: '1rem' }}>
                <option value={30}>30 minutes</option>
                <option value={60}>1 hour</option>
                <option value={90}>1.5 hours</option>
                <option value={120}>2 hours</option>
              </select>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button onClick={addEvent} style={{ flex: 1, padding: '0.75rem', backgroundColor: '#3b82f6', color: '#fff', border: 'none', borderRadius: '0.375rem', cursor: 'pointer', fontWeight: '600' }}>
                  Add Event
                </button>
                <button onClick={() => setShowEventModal(false)} style={{ flex: 1, padding: '0.75rem', backgroundColor: '#f3f4f6', border: 'none', borderRadius: '0.375rem', cursor: 'pointer', fontWeight: '600' }}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Calendar;
