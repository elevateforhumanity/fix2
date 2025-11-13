import React from 'react';
import { ApprenticeshipSummary } from '../types/apprenticeship';

interface ApprenticeshipDashboardProps {
  summary: ApprenticeshipSummary;
  onLogHours?: () => void;
  onViewEvaluations?: () => void;
}

export const ApprenticeshipDashboard: React.FC<ApprenticeshipDashboardProps> = ({
  summary,
  onLogHours,
  onViewEvaluations,
}) => {
  const { apprenticeship, ojt_progress_percentage, ri_progress_percentage, overall_progress_percentage } = summary;

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const ProgressCircle = ({ percentage, label, color }: { percentage: number; label: string; color: string }) => (
    <div style={{ textAlign: 'center' }}>
      <div
        style={{
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          background: `conic-gradient(${color} ${percentage * 3.6}deg, var(--bg-tertiary) 0deg)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto var(--space-2)',
          position: 'relative',
        }}
      >
        <div
          style={{
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            background: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
        >
          <div style={{ fontSize: '28px', fontWeight: 800, color }}>{percentage}%</div>
        </div>
      </div>
      <div style={{ fontSize: '14px', fontWeight: 600 }}>{label}</div>
    </div>
  );

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 'var(--space-4)' }}>
        <h1 style={{ marginBottom: 'var(--space-1)' }}>Apprenticeship Dashboard</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
          Track your progress and manage your apprenticeship requirements
        </p>
      </div>

      {/* Status Alert */}
      <div
        className={`alert ${summary.on_track ? 'alert-success' : 'alert-warning'}`}
        style={{ marginBottom: 'var(--space-4)' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <span style={{ fontSize: '32px' }}>{summary.on_track ? '✅' : '⚠️'}</span>
          <div>
            <div style={{ fontWeight: 600, marginBottom: '4px' }}>
              {summary.on_track ? 'On Track for Completion' : 'Behind Schedule'}
            </div>
            <div style={{ fontSize: '14px' }}>
              {summary.days_remaining} days remaining • Expected completion: {formatDate(summary.estimated_completion_date)}
            </div>
          </div>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="card" style={{ marginBottom: 'var(--space-4)' }}>
        <div className="card-header">
          <h2 className="card-title">Progress Overview</h2>
        </div>
        <div className="card-body">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
              gap: 'var(--space-4)',
              marginBottom: 'var(--space-4)',
            }}
          >
            <ProgressCircle
              percentage={ojt_progress_percentage}
              label="OJT Hours"
              color="var(--color-primary)"
            />
            <ProgressCircle
              percentage={ri_progress_percentage}
              label="Related Instruction"
              color="var(--color-secondary)"
            />
            <ProgressCircle
              percentage={summary.competency_progress_percentage}
              label="Competencies"
              color="var(--color-success)"
            />
            <ProgressCircle
              percentage={overall_progress_percentage}
              label="Overall"
              color="var(--color-primary)"
            />
          </div>

          {/* Detailed Stats */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: 'var(--space-3)',
            }}
          >
            <div style={{ padding: 'var(--space-3)', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontSize: '32px', fontWeight: 800, color: 'var(--color-primary)', marginBottom: 'var(--space-1)' }}>
                {apprenticeship.ojt_hours_completed} / {apprenticeship.ojt_hours_required}
              </div>
              <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>OJT Hours</div>
              <div style={{ fontSize: '12px', color: 'var(--text-tertiary)', marginTop: '4px' }}>
                {apprenticeship.ojt_hours_required - apprenticeship.ojt_hours_completed} hours remaining
              </div>
            </div>

            <div style={{ padding: 'var(--space-3)', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontSize: '32px', fontWeight: 800, color: 'var(--color-secondary)', marginBottom: 'var(--space-1)' }}>
                {apprenticeship.ri_hours_completed} / {apprenticeship.ri_hours_required}
              </div>
              <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>RI Hours</div>
              <div style={{ fontSize: '12px', color: 'var(--text-tertiary)', marginTop: '4px' }}>
                {apprenticeship.ri_hours_required - apprenticeship.ri_hours_completed} hours remaining
              </div>
            </div>

            <div style={{ padding: 'var(--space-3)', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontSize: '32px', fontWeight: 800, color: 'var(--color-success)', marginBottom: 'var(--space-1)' }}>
                {apprenticeship.competencies_completed.length} / {apprenticeship.competencies_required.length}
              </div>
              <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Competencies</div>
              <div style={{ fontSize: '12px', color: 'var(--text-tertiary)', marginTop: '4px' }}>
                {apprenticeship.competencies_required.length - apprenticeship.competencies_completed.length} remaining
              </div>
            </div>

            <div style={{ padding: 'var(--space-3)', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontSize: '32px', fontWeight: 800, color: 'var(--color-primary)', marginBottom: 'var(--space-1)' }}>
                {summary.days_in_program}
              </div>
              <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Days in Program</div>
              <div style={{ fontSize: '12px', color: 'var(--text-tertiary)', marginTop: '4px' }}>
                Started {formatDate(apprenticeship.start_date)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card" style={{ marginBottom: 'var(--space-4)' }}>
        <div className="card-header">
          <h2 className="card-title">Quick Actions</h2>
        </div>
        <div className="card-body">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-2)' }}>
            {onLogHours && (
              <button className="btn-primary" onClick={onLogHours} style={{ width: '100%' }}>
                📝 Log OJT Hours
              </button>
            )}
            {onViewEvaluations && (
              <button className="btn-outline" onClick={onViewEvaluations} style={{ width: '100%' }}>
                📊 View Evaluations
              </button>
            )}
            <button className="btn-outline" style={{ width: '100%' }}>
              📎 Submit Evidence
            </button>
            <button className="btn-outline" style={{ width: '100%' }}>
              📅 Schedule Meeting
            </button>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card" style={{ marginBottom: 'var(--space-4)' }}>
        <div className="card-header">
          <h2 className="card-title">Recent Activity</h2>
        </div>
        <div className="card-body">
          {summary.recent_hour_logs.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
              {summary.recent_hour_logs.slice(0, 5).map((log) => (
                <div
                  key={log.id}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: 'var(--space-2)',
                    background: 'var(--bg-secondary)',
                    borderRadius: 'var(--radius-md)',
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, marginBottom: '4px' }}>
                      {log.hours} hours • {formatDate(log.work_date)}
                    </div>
                    <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                      {log.tasks_performed.join(', ')}
                    </div>
                  </div>
                  <div>
                    {log.supervisor_approved ? (
                      <span className="badge badge-success">✓ Approved</span>
                    ) : (
                      <span className="badge badge-warning">⏳ Pending</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: 'var(--space-4)', color: 'var(--text-secondary)' }}>
              No recent activity. Log your first OJT hours to get started!
            </div>
          )}
        </div>
      </div>

      {/* Next Milestone */}
      {summary.next_milestone && (
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Next Milestone</h2>
          </div>
          <div className="card-body">
            <div style={{ display: 'flex', alignItems: 'start', gap: 'var(--space-3)' }}>
              <div style={{ fontSize: '48px' }}>🎯</div>
              <div style={{ flex: 1 }}>
                <h3 style={{ marginBottom: 'var(--space-1)' }}>{summary.next_milestone.name}</h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-2)' }}>
                  {summary.next_milestone.description}
                </p>
                <div style={{ fontSize: '14px', color: 'var(--text-tertiary)' }}>
                  Target Date: {formatDate(summary.next_milestone.target_date)}
                </div>
                <div style={{ marginTop: 'var(--space-2)' }}>
                  <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: 'var(--space-1)' }}>
                    Requirements:
                  </div>
                  <ul style={{ margin: 0, paddingLeft: 'var(--space-3)' }}>
                    {summary.next_milestone.requirements.map((req, index) => (
                      <li
                        key={index}
                        style={{
                          color: req.completed ? 'var(--color-success)' : 'var(--text-secondary)',
                          textDecoration: req.completed ? 'line-through' : 'none',
                        }}
                      >
                        {req.description}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApprenticeshipDashboard;
