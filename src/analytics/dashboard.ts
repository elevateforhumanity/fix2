import { supa } from '../services/supa';

export interface DashboardSeriesPoint {
  date: string;
  events: number;
  uniqueActors: number;
}

export interface DashboardMetrics {
  totalEvents: number;
  eventsLast7Days: number;
  activeStudentsLast30Days: number;
  series: DashboardSeriesPoint[];
  topEvents: Array<{ eventType: string; total: number }>;
}

const EMPTY_METRICS: DashboardMetrics = {
  totalEvents: 0,
  eventsLast7Days: 0,
  activeStudentsLast30Days: 0,
  series: [],
  topEvents: [],
};

export async function fetchDashboardMetrics(): Promise<DashboardMetrics> {
  try {
    const { data, error } = await supa.rpc('analytics_dashboard_metrics');
    if (error) throw error;
    if (!data) return EMPTY_METRICS;

    const normalized = typeof data === 'string' ? JSON.parse(data) : data;
    return {
      totalEvents: normalized.totalEvents ?? 0,
      eventsLast7Days: normalized.eventsLast7Days ?? 0,
      activeStudentsLast30Days: normalized.activeStudentsLast30Days ?? 0,
      series: Array.isArray(normalized.series) ? normalized.series : [],
      topEvents: Array.isArray(normalized.topEvents)
        ? normalized.topEvents
        : [],
    } satisfies DashboardMetrics;
  } catch (error) {
    if (import.meta.env.DEV) {
    }
    return EMPTY_METRICS;
  }
}
