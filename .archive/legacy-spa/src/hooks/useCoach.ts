import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export function useCoach(courseId?: string) {
  const [plan, setPlan] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  async function refreshPlan() {
    setLoading(true);
    if (!supabase) throw new Error('Supabase not initialized');
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const userId = user?.id;
    if (!userId || !courseId) {
      setLoading(false);
      return;
    }

    try {
      const resp = await fetch('/.netlify/functions/ai-coach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, courseId }),
      });
      const json = await resp.json();
      setPlan(json.plan);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (courseId) {
      refreshPlan();
    }
  }, [courseId]);

  return { plan, loading, refreshPlan };
}
