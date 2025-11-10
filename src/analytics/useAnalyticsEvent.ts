import { useEffect } from 'react';
import { getCurrentUser } from '../services/auth';
import { recordAnalyticsEvent, type AnalyticsActor } from './eventLogger';

/**
 * React hook that records a single analytics event when a component mounts.
 */
export function useAnalyticsEvent(
  eventType: string,
  properties?: Record<string, unknown>
): void {
  const serializedProps = properties ? JSON.stringify(properties) : undefined;

  useEffect(() => {
    let mounted = true;

    (async () => {
      const actor: AnalyticsActor | undefined = await resolveActor();
      if (!mounted) return;

      await recordAnalyticsEvent({
        eventType,
        actor,
        properties: serializedProps ? JSON.parse(serializedProps) : undefined,
      });
    })();

    return () => {
      mounted = false;
    };
  }, [eventType, serializedProps]);
}

async function resolveActor(): Promise<AnalyticsActor | undefined> {
  try {
    const user = await getCurrentUser();
    if (!user) return undefined;
    return {
      id: user.id ?? user.email ?? 'anonymous',
      role: user.role,
      email: user.email,
    };
  } catch (error) {
    if (import.meta.env.DEV) {
    }
    return undefined;
  }
}
