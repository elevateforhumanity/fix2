import React from 'react';
import { CompetencyProgress } from '../types/competency';

interface CompetencyCardProps {
  progress: CompetencyProgress;
  onSubmitEvidence?: () => void;
  onViewDetails?: () => void;
}

export const CompetencyCard: React.FC<CompetencyCardProps> = ({
  progress,
  onSubmitEvidence,
  onViewDetails,
}) => {
  const { competency, student_competency, progress_percentage, levels_completed, total_levels } = progress;

  const getStatusColor = () => {
    switch (student_competency.status) {
      case 'mastered':
        return 'var(--color-success)';
      case 'in_progress':
        return 'var(--color-primary)';
      case 'expired':
        return 'var(--color-error)';
      default:
        return 'var(--text-tertiary)';
    }
  };

  const getStatusBadge = () => {
    switch (student_competency.status) {
      case 'mastered':
        return <span className="badge badge-success">✓ Mastered</span>;
      case 'in_progress':
        return <span className="badge badge-primary">⏳ In Progress</span>;
      case 'expired':
        return <span className="badge badge-error">⚠️ Expired</span>;
      default:
        return <span className="badge badge-gray">Not Started</span>;
    }
  };

  return (
    <div className="card" style={{ marginBottom: 'var(--space-3)' }}>
      {/* Header */}
      <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 className="card-title" style={{ marginBottom: 'var(--space-1)' }}>
            {competency.name}
          </h3>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: 0 }}>
            {competency.category}
          </p>
        </div>
        {getStatusBadge()}
      </div>

      {/* Body */}
      <div className="card-body">
        {/* Description */}
        <p style={{ marginBottom: 'var(--space-3)', color: 'var(--text-secondary)' }}>
          {competency.description}
        </p>

        {/* Progress Bar */}
        <div style={{ marginBottom: 'var(--space-3)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-1)' }}>
            <span style={{ fontSize: '14px', fontWeight: 600 }}>
              Level {student_competency.current_level} of {total_levels}
            </span>
            <span style={{ fontSize: '14px', fontWeight: 600, color: getStatusColor() }}>
              {progress_percentage}%
            </span>
          </div>
          <div
            style={{
              width: '100%',
              height: '8px',
              background: 'var(--bg-tertiary)',
              borderRadius: 'var(--radius-full)',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: `${progress_percentage}%`,
                height: '100%',
                background: `linear-gradient(90deg, var(--color-primary) 0%, var(--color-secondary) 100%)`,
                transition: 'width 0.6s ease',
              }}
            />
          </div>
        </div>

        {/* Competency Levels */}
        <div style={{ marginBottom: 'var(--space-3)' }}>
          <h4 style={{ fontSize: '16px', marginBottom: 'var(--space-2)' }}>Competency Levels</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            {competency.levels.map((level, index) => {
              const isCompleted = index < student_competency.current_level;
              const isCurrent = index === student_competency.current_level - 1;
              const isLocked = index >= student_competency.current_level;

              return (
                <div
                  key={level.level}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-2)',
                    padding: 'var(--space-2)',
                    background: isCurrent ? 'var(--color-primary-light)' : 'var(--bg-secondary)',
                    borderRadius: 'var(--radius-md)',
                    border: isCurrent ? '2px solid var(--color-primary)' : 'none',
                    opacity: isLocked ? 0.5 : 1,
                  }}
                >
                  {/* Level Number */}
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      background: isCompleted
                        ? 'var(--color-success)'
                        : isCurrent
                        ? 'var(--color-primary)'
                        : 'var(--bg-tertiary)',
                      color: isCompleted || isCurrent ? 'white' : 'var(--text-tertiary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontSize: '18px',
                      flexShrink: 0,
                    }}
                  >
                    {isCompleted ? '✓' : level.level}
                  </div>

                  {/* Level Info */}
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, marginBottom: '4px' }}>{level.name}</div>
                    <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                      {level.description}
                    </div>
                    {level.estimated_hours && (
                      <div style={{ fontSize: '12px', color: 'var(--text-tertiary)', marginTop: '4px' }}>
                        ⏱️ Est. {level.estimated_hours} hours
                      </div>
                    )}
                  </div>

                  {/* Status Icon */}
                  <div style={{ fontSize: '24px', flexShrink: 0 }}>
                    {isCompleted ? '✅' : isCurrent ? '⏳' : '🔒'}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Evidence Summary */}
        <div
          style={{
            display: 'flex',
            gap: 'var(--space-3)',
            padding: 'var(--space-2)',
            background: 'var(--bg-secondary)',
            borderRadius: 'var(--radius-md)',
            marginBottom: 'var(--space-3)',
          }}
        >
          <div style={{ flex: 1, textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--color-primary)' }}>
              {progress.evidence_submitted}
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Evidence Submitted</div>
          </div>
          <div style={{ flex: 1, textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--color-success)' }}>
              {progress.evidence_approved}
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Evidence Approved</div>
          </div>
          <div style={{ flex: 1, textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--color-secondary)' }}>
              {progress.time_spent_hours}h
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Time Spent</div>
          </div>
        </div>

        {/* Next Milestone */}
        {progress.next_milestone && (
          <div
            className="alert alert-info"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
              marginBottom: 'var(--space-3)',
            }}
          >
            <span style={{ fontSize: '24px' }}>🎯</span>
            <div>
              <div style={{ fontWeight: 600, marginBottom: '4px' }}>Next Milestone</div>
              <div style={{ fontSize: '14px' }}>{progress.next_milestone}</div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="card-footer" style={{ display: 'flex', gap: 'var(--space-2)' }}>
        {onSubmitEvidence && student_competency.status !== 'mastered' && (
          <button className="btn-primary" onClick={onSubmitEvidence}>
            📎 Submit Evidence
          </button>
        )}
        {onViewDetails && (
          <button className="btn-outline" onClick={onViewDetails}>
            View Details
          </button>
        )}
      </div>
    </div>
  );
};

export default CompetencyCard;
