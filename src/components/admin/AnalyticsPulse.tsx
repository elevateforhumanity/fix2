
import {
  fetchDashboardMetrics,
  type DashboardMetrics,
} from '../../analytics/dashboard';

const cardStyle: React.CSSProperties = {
  backgroundColor: 'var(--color-card-bg)',
  border: '1px solid var(--color-border)',
  borderRadius: 12,
  padding: 24,
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
};

export function AnalyticsPulse() {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setIsLoading(true);
      setError(null);
      const data = await fetchDashboardMetrics();
      if (!mounted) return;

      if (!data.series.length && !data.topEvents.length) {
        setError('No analytics data has been recorded yet.');
      }
      setMetrics(data);
      setIsLoading(false);
    })().catch((err) => {
      if (!mounted) return;
      setError(err instanceof Error ? err.message : 'Unable to load analytics');
      setIsLoading(false);
    });

    return () => {
      mounted = false;
    };
  }, []);

  const body = renderContent({ metrics, isLoading, error });

  return (
    <section style={cardStyle} aria-labelledby="analytics-pulse-heading">
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
        }}
      >
        <div>
          <h2 id="analytics-pulse-heading" style={{ margin: 0, fontSize: 20 }}>
            Platform Analytics Pulse
          </h2>
          <p style={{ margin: 0, color: 'var(--color-text-secondary)' }}>
            Totals aggregate the last 30 days of tracked events.
          </p>
        </div>
        <span style={{ fontSize: 24 }}>📈</span>
      </header>
      {body}
    </section>
  );
}

type RenderArgs = {
  metrics: DashboardMetrics | null;
  isLoading: boolean;
  error: string | null;
};

function renderContent({
  metrics,
  isLoading,
  error,
}: RenderArgs): React.ReactNode {
  if (isLoading) {
    return (
      <p style={{ color: 'var(--color-text-secondary)' }}>Loading metrics…</p>
    );
  }

  if (error) {
    return <p style={{ color: 'var(--color-text-secondary)' }}>{error}</p>;
  }

  if (!metrics) {
    return null;
  }

  const metricsRowStyle: React.CSSProperties = {
    display: 'flex',
    gap: 24,
    flexWrap: 'wrap',
  };

  const topEventsItems = metrics.topEvents.map((evt) => (
    <li key={evt.eventType} style={{ marginBottom: 8 }}>
      <strong>{evt.eventType}</strong>
      <span style={{ color: 'var(--color-text-secondary)', marginLeft: 8 }}>
        {evt.total.toLocaleString()} occurrences
      </span>
    </li>
  ));

  const activityRows = metrics.series.map((point) => (
    <div
      key={point.date}
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        fontFamily: 'var(--font-mono, monospace)',
      }}
    >
      <span>{point.date}</span>
      <span>{point.events.toLocaleString()} events</span>
      <span>{point.uniqueActors.toLocaleString()} actors</span>
    </div>
  ));

  let topEventsBlock: React.ReactNode;
  if (metrics.topEvents.length) {
    topEventsBlock = (
      <ol style={{ margin: 0, paddingLeft: 20 }}>{topEventsItems}</ol>
    );
  } else {
    topEventsBlock = (
      <p style={{ color: 'var(--color-text-secondary)' }}>
        No event distribution captured yet.
      </p>
    );
  }

  let dailyActivityBlock: React.ReactNode;
  if (metrics.series.length) {
    dailyActivityBlock = (
      <div
        style={{
          display: 'grid',
          gap: 8,
          maxHeight: 240,
          overflowY: 'auto',
          border: '1px solid var(--color-border)',
          borderRadius: 8,
          padding: 12,
        }}
      >
        {activityRows}
      </div>
    );
  } else {
    dailyActivityBlock = (
      <p style={{ color: 'var(--color-text-secondary)' }}>
        No daily activity has been logged yet.
      </p>
    );
  }

  return (
    <div style={{ display: 'grid', gap: 16 }}>
      <div style={metricsRowStyle}>
        <MetricCard
          label="Total Events"
          value={metrics.totalEvents.toLocaleString()}
        />
        <MetricCard
          label="Events (7d)"
          value={metrics.eventsLast7Days.toLocaleString()}
        />
        <MetricCard
          label="Active Students (30d)"
          value={metrics.activeStudentsLast30Days.toLocaleString()}
        />
      </div>
      <div>
        <h3 style={{ marginBottom: 12, fontSize: 16 }}>Top Events (30d)</h3>
        {topEventsBlock}
      </div>
      <div>
        <h3 style={{ marginBottom: 12, fontSize: 16 }}>Daily Activity (30d)</h3>
        {dailyActivityBlock}
      </div>
    </div>
  );
}

type MetricCardProps = { label: string; value: string };

function MetricCard({ label, value }: MetricCardProps) {
  return (
    <div
      style={{
        minWidth: 160,
        padding: 12,
        borderRadius: 8,
        backgroundColor: 'var(--color-bg-secondary)',
        border: '1px solid var(--color-border)',
      }}
    >
      <p
        style={{
          margin: 0,
          fontSize: 12,
          color: 'var(--color-text-secondary)',
        }}
      >
        {label}
      </p>
      <p style={{ margin: 0, fontSize: 20, fontWeight: 600 }}>{value}</p>
    </div>
  );
}

export default AnalyticsPulse;
