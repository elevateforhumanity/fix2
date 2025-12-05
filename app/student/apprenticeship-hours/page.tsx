'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export default function ApprenticeshipHoursPage() {
  const router = useRouter();
  const supabase = createClient();
  const [user, setUser] = useState<any>(null);
  const [apprenticeship, setApprenticeship] = useState<any>(null);
  const [todayLog, setTodayLog] = useState<any>(null);
  const [recentLogs, setRecentLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [checking, setChecking] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.push('/login');
      return;
    }
    setUser(user);

    const { data: apprenticeshipData } = await supabase
      .from('apprenticeship_enrollments')
      .select('*')
      .eq('student_id', user.id)
      .eq('status', 'active')
      .single();

    if (apprenticeshipData) {
      setApprenticeship(apprenticeshipData);

      const today = new Date().toISOString().split('T')[0];
      const { data: todayData } = await supabase
        .from('ojt_hours_log')
        .select('*')
        .eq('apprenticeship_id', apprenticeshipData.id)
        .eq('work_date', today)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      setTodayLog(todayData);

      const { data: logsData } = await supabase
        .from('ojt_hours_log')
        .select('*')
        .eq('apprenticeship_id', apprenticeshipData.id)
        .order('work_date', { ascending: false })
        .limit(10);

      setRecentLogs(logsData || []);
    }

    setLoading(false);
  }

  async function handleCheckIn() {
    if (!apprenticeship) return;
    setChecking(true);

    const position = await new Promise<GeolocationPosition>((resolve) => {
      navigator.geolocation.getCurrentPosition(resolve);
    });

    const { error } = await supabase
      .from('ojt_hours_log')
      .insert({
        apprenticeship_id: apprenticeship.id,
        student_id: user.id,
        work_date: new Date().toISOString().split('T')[0],
        check_in_time: new Date().toISOString(),
        location_lat: position.coords.latitude,
        location_lng: position.coords.longitude
      });

    if (!error) {
      await loadData();
    }
    setChecking(false);
  }

  async function handleCheckOut() {
    if (!todayLog) return;
    setChecking(true);

    const { error } = await supabase
      .from('ojt_hours_log')
      .update({
        check_out_time: new Date().toISOString()
      })
      .eq('id', todayLog.id);

    if (!error) {
      await loadData();
    }
    setChecking(false);
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!apprenticeship) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">No Active Apprenticeship</h1>
          <p className="text-gray-600 mb-4">You are not enrolled in an apprenticeship program.</p>
        </div>
      </div>
    );
  }

  const progress = (apprenticeship.total_hours_completed / apprenticeship.total_hours_required) * 100;
  const isCheckedIn = todayLog && !todayLog.check_out_time;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white p-6">
        <h1 className="text-2xl font-bold mb-2">Apprenticeship Hours</h1>
        <p className="text-orange-100">{apprenticeship.employer_name}</p>
      </div>

      <div className="p-4 space-y-4">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-sm text-gray-600">Total Hours</p>
              <p className="text-3xl font-bold">{apprenticeship.total_hours_completed.toFixed(1)}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Required</p>
              <p className="text-xl font-semibold">{apprenticeship.total_hours_required}</p>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div className="bg-orange-600 h-3 rounded-full" style={{ width: `${Math.min(progress, 100)}%` }}></div>
          </div>
          <p className="text-sm text-gray-600 mt-2">{progress.toFixed(1)}% Complete</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          {!isCheckedIn ? (
            <button
              onClick={handleCheckIn}
              disabled={checking}
              className="w-full bg-green-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-green-700 disabled:opacity-50"
            >
              {checking ? 'Checking In...' : '✓ Check In'}
            </button>
          ) : (
            <div className="space-y-4">
              <div className="text-center py-4">
                <p className="text-sm text-gray-600">Checked in at</p>
                <p className="text-2xl font-bold">{new Date(todayLog.check_in_time).toLocaleTimeString()}</p>
              </div>
              <button
                onClick={handleCheckOut}
                disabled={checking}
                className="w-full bg-red-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-red-700 disabled:opacity-50"
              >
                {checking ? 'Checking Out...' : '✓ Check Out'}
              </button>
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b">
            <h2 className="font-bold">Recent Hours</h2>
          </div>
          <div className="divide-y">
            {recentLogs.map((log) => (
              <div key={log.id} className="p-4 flex justify-between items-center">
                <div>
                  <p className="font-semibold">{new Date(log.work_date).toLocaleDateString()}</p>
                  <p className="text-sm text-gray-600">
                    {new Date(log.check_in_time).toLocaleTimeString()} - 
                    {log.check_out_time ? new Date(log.check_out_time).toLocaleTimeString() : 'In Progress'}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold">{log.total_hours?.toFixed(1) || '0.0'} hrs</p>
                  <p className="text-xs">{log.approved ? '✓ Approved' : '⏳ Pending'}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
