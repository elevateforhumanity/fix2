/*
  Copyright (c) 2025 Elevate for Humanity
  Commercial License. No resale, sublicensing, or redistribution allowed.
  See LICENSE file for details.
*/
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import AppLayout from '../layouts/AppLayout';

export default function LiveClassRoom() {
  const { sessionId } = useParams();
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);
  const [error, setError] = useState(null);
  const [joined, setJoined] = useState(false);

  useEffect(() => {
    fetchSession();
  }, [sessionId]);

  const fetchSession = async () => {
    if (!supabase) {
      setError('Database service is not available');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Note: This requires a live_sessions table to be created
      // For now, showing a placeholder implementation
      const { data, error: sessionError } = await supabase
        .from('live_sessions')
        .select('*')
        .eq('id', sessionId)
        .single();

      if (sessionError) {
        // Table doesn't exist yet - show coming soon message
        setError('Live classroom feature coming soon');
        return;
      }

      setSession(data);
    } catch (error) {
      setError('Live classroom feature is currently being set up');
    } finally {
      setLoading(false);
    }
  };

  const handleJoinSession = () => {
    setJoined(true);
    // In production, this would initialize video/audio connection
  };

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Live Classroom</h1>
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto" />
            <p className="mt-4 text-brown-600">Loading session...</p>
          </div>
        ) : error ? (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 text-center">
            <div className="text-6xl mb-4">🎥</div>
            <h2 className="text-2xl font-bold mb-4">
              Live Classroom Coming Soon
            </h2>
            <p className="text-brown-900 mb-6">
              We're building an interactive live classroom experience with:
            </p>
            <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto text-left">
              <div className="bg-white p-4 rounded-lg">
                <div className="font-bold mb-2">✓ HD Video & Audio</div>
                <p className="text-sm text-brown-600">
                  Crystal clear communication
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <div className="font-bold mb-2">✓ Screen Sharing</div>
                <p className="text-sm text-brown-600">
                  Share presentations and demos
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <div className="font-bold mb-2">✓ Interactive Whiteboard</div>
                <p className="text-sm text-brown-600">
                  Collaborate in real-time
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <div className="font-bold mb-2">✓ Chat & Q&A</div>
                <p className="text-sm text-brown-600">Ask questions anytime</p>
              </div>
            </div>
            <p className="mt-6 text-sm text-brown-600">
              This feature requires additional setup. Contact your administrator
              for more information.
            </p>
          </div>
        ) : session ? (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold mb-4">{session.title}</h2>
              <p className="text-brown-600 mb-4">{session.description}</p>
              {!joined ? (
                <button
                  onClick={handleJoinSession}
                  className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-bold text-lg"
                >
                  Join Live Session
                </button>
              ) : (
                <div className="bg-gray-900 rounded-lg aspect-video flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="text-4xl mb-4">📹</div>
                    <p>Video stream would appear here</p>
                    <p className="text-sm text-gray-400 mt-2">
                      Requires WebRTC integration
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-brown-500">No active session found</p>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
