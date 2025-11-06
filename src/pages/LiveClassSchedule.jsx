/*
  Copyright (c) 2025 Elevate for Humanity
  Commercial License. No resale, sublicensing, or redistribution allowed.
  See LICENSE file for details.
*/
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import AppLayout from '../layouts/AppLayout';

export default function LiveClassSchedule() {
  const [loading, setLoading] = useState(true);
  const [sessions, setSessions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSchedule();
  }, []);

  const fetchSchedule = async () => {
    if (!supabase) {
      setError('Database service is not available');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Note: This requires a live_sessions table
      // For now, showing placeholder data
      const { data, error: scheduleError } = await supabase
        .from('live_sessions')
        .select('*')
        .gte('scheduled_at', new Date().toISOString())
        .order('scheduled_at');

      if (scheduleError) {
        // Table doesn't exist - show coming soon
        setError('Live class scheduling coming soon');
        return;
      }

      setSessions(data || []);
    } catch (error) {
      console.error('Error fetching schedule:', error);
      setError('Live class scheduling is being set up');
    } finally {
      setLoading(false);
    }
  };

  const upcomingSessions = sessions.filter(
    (s) => new Date(s.scheduled_at) > new Date()
  );
  const todaySessions = upcomingSessions.filter((s) => {
    const sessionDate = new Date(s.scheduled_at);
    const today = new Date();
    return sessionDate.toDateString() === today.toDateString();
  });

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Live Class Schedule</h1>
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto" />
            <p className="mt-4 text-brown-600">Loading schedule...</p>
          </div>
        ) : error ? (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 text-center">
            <div className="text-6xl mb-4">📅</div>
            <h2 className="text-2xl font-bold mb-4">
              Live Class Scheduling Coming Soon
            </h2>
            <p className="text-brown-900 mb-6">
              We're building a comprehensive scheduling system for live classes
              with:
            </p>
            <div className="grid md:grid-cols-3 gap-4 max-w-3xl mx-auto text-left">
              <div className="bg-white p-4 rounded-lg">
                <div className="font-bold mb-2">📆 Calendar Integration</div>
                <p className="text-sm text-brown-600">
                  Sync with Google Calendar, Outlook
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <div className="font-bold mb-2">🔔 Reminders</div>
                <p className="text-sm text-brown-600">
                  Email and push notifications
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <div className="font-bold mb-2">🎯 One-Click Join</div>
                <p className="text-sm text-brown-600">
                  Join sessions instantly
                </p>
              </div>
            </div>
            <p className="mt-6 text-sm text-brown-600">
              This feature requires additional setup. Contact your administrator
              for more information.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Today's Sessions */}
            {todaySessions.length > 0 && (
              <div className="bg-green-50 border-2 border-green-500 rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-4 text-green-900">
                  Today's Classes
                </h2>
                <div className="space-y-3">
                  {todaySessions.map((session) => (
                    <div
                      key={session.id}
                      className="bg-white rounded-lg p-4 flex justify-between items-center"
                    >
                      <div>
                        <h3 className="font-bold text-lg">{session.title}</h3>
                        <p className="text-sm text-brown-600">
                          {new Date(session.scheduled_at).toLocaleTimeString()}
                        </p>
                      </div>
                      <Link
                        to={`/live-classroom/${session.id}`}
                        className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-bold"
                      >
                        Join Now
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {/* Upcoming Sessions */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b">
                <h2 className="text-2xl font-bold">Upcoming Classes</h2>
              </div>
              {upcomingSessions.length === 0 ? (
                <div className="p-6 text-center text-brown-500">
                  <p>No upcoming live classes scheduled</p>
                  <p className="text-sm mt-2">
                    Check back later for new sessions
                  </p>
                </div>
              ) : (
                <div className="divide-y">
                  {upcomingSessions.map((session) => (
                    <div
                      key={session.id}
                      className="p-6 hover:bg-beige-50 transition"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="font-bold text-lg mb-2">
                            {session.title}
                          </h3>
                          <p className="text-brown-600 mb-2">
                            {session.description}
                          </p>
                          <div className="flex gap-4 text-sm text-brown-500">
                            <span>
                              📅{' '}
                              {new Date(
                                session.scheduled_at
                              ).toLocaleDateString()}
                            </span>
                            <span>
                              🕐{' '}
                              {new Date(
                                session.scheduled_at
                              ).toLocaleTimeString()}
                            </span>
                            <span>⏱️ {session.duration || 60} minutes</span>
                          </div>
                        </div>
                        <Link
                          to={`/live-classroom/${session.id}`}
                          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-bold ml-4"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
