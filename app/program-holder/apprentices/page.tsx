'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function ProgramHolderApprentices() {
  const supabase = createClient();
  const [user, setUser] = useState<any>(null);
  const [apprentices, setApprentices] = useState<any[]>([]);
  const [todayLogs, setTodayLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    setUser(user);

    // Load apprentices for this employer
    const { data: apprenticeData } = await supabase
      .from('apprenticeship_enrollments')
      .select(`
        *,
        student:profiles!apprenticeship_enrollments_student_id_fkey(full_name, email, phone),
        program:programs(name)
      `)
      .eq('employer_contact_id', user.id)
      .eq('status', 'active')
      .order('created_at', { ascending: false });

    setApprentices(apprenticeData || []);

    // Load today's check-ins
    const today = new Date().toISOString().split('T')[0];
    const apprenticeIds = apprenticeData?.map(a => a.id) || [];
    
    if (apprenticeIds.length > 0) {
      const { data: logsData } = await supabase
        .from('ojt_hours_log')
        .select(`
          *,
          student:profiles!ojt_hours_log_student_id_fkey(full_name)
        `)
        .in('apprenticeship_id', apprenticeIds)
        .eq('work_date', today)
        .order('check_in_time', { ascending: false });

      setTodayLogs(logsData || []);
    }

    setLoading(false);
  }

  async function approveHours(logId: string) {
    const { error } = await supabase
      .from('ojt_hours_log')
      .update({ 
        approved: true,
        approved_at: new Date().toISOString(),
        approved_by: user?.id
      })
      .eq('id', logId);

    if (!error) {
      await loadData();
    }
  }

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6">
        <h1 className="text-2xl font-bold mb-2">My Apprentices</h1>
        <p className="text-purple-100">Monitor and approve apprentice hours</p>
      </div>

      <div className="p-4 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-sm text-gray-600">Total Apprentices</p>
            <p className="text-3xl font-bold">{apprentices.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-sm text-gray-600">Checked In Today</p>
            <p className="text-3xl font-bold text-green-600">{todayLogs.length}</p>
          </div>
        </div>

        {/* Today's Activity */}
        {todayLogs.length > 0 && (
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b">
              <h2 className="font-bold">Today's Activity</h2>
            </div>
            <div className="divide-y">
              {todayLogs.map((log) => {
                const isCheckedIn = !log.check_out_time;
                return (
                  <div key={log.id} className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-semibold">{log.student?.full_name}</p>
                        <p className="text-sm text-gray-600">
                          In: {new Date(log.check_in_time).toLocaleTimeString()}
                        </p>
                        {log.check_out_time && (
                          <p className="text-sm text-gray-600">
                            Out: {new Date(log.check_out_time).toLocaleTimeString()}
                          </p>
                        )}
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        isCheckedIn ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {isCheckedIn ? '🟢 Working' : 'Checked Out'}
                      </span>
                    </div>
                    {log.total_hours && (
                      <div className="flex justify-between items-center mt-3 pt-3 border-t">
                        <p className="font-bold">{log.total_hours.toFixed(1)} hours</p>
                        {!log.approved && (
                          <button
                            onClick={() => approveHours(log.id)}
                            className="bg-blue-600 text-white px-4 py-1 rounded text-sm hover:bg-blue-700"
                          >
                            Approve
                          </button>
                        )}
                        {log.approved && (
                          <span className="text-green-600 text-sm font-semibold">✓ Approved</span>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* All Apprentices */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b">
            <h2 className="font-bold">All Apprentices</h2>
          </div>
          <div className="divide-y">
            {apprentices.map((apprentice) => {
              const progress = (apprentice.total_hours_completed / apprentice.total_hours_required) * 100;
              return (
                <div key={apprentice.id} className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="font-semibold">{apprentice.student?.full_name}</p>
                      <p className="text-sm text-gray-600">{apprentice.program?.name}</p>
                      <p className="text-xs text-gray-500">{apprentice.student?.email}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">{apprentice.total_hours_completed.toFixed(1)} hrs</p>
                      <p className="text-xs text-gray-600">/ {apprentice.total_hours_required}</p>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-purple-600 h-2 rounded-full" 
                      style={{ width: `${Math.min(progress, 100)}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">{progress.toFixed(1)}% Complete</p>
                </div>
              );
            })}
            {apprentices.length === 0 && (
              <div className="p-8 text-center text-gray-500">
                <p>No apprentices assigned yet</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
