import { supa } from '../services/supa';

export type AnalyticsActor = {
  id: string;
  role?: string;
  email?: string;
};

export type AnalyticsEventInput = {
  eventType: string;
  actor?: AnalyticsActor;
  properties?: Record<string, unknown>;
  timestamp?: string;
};

/**
 * Persists an analytics event to Supabase.
 * Fails silently in local development if Supabase env vars are missing.
 */
export async function recordAnalyticsEvent(
  event: AnalyticsEventInput
): Promise<void> {
  if (!event.eventType) return;

  try {
    const payload = {
      event_type: event.eventType,
      actor: event.actor ?? null,
      properties: event.properties ?? null,
      created_at: event.timestamp ?? null,
    };

    const { error } = await supa.from('analytics_events').insert([payload]);
    if (error) {
      throw error;
    }
  } catch (error) {
    if (import.meta.env.DEV) {
      console.warn('[analytics] failed to record event', event, error);
    }
  }
}
