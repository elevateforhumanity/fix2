/**
 * Apprenticeship Tracking Types
 * Moodle-inspired apprenticeship management system
 */

export type ApprenticeshipStatus =
  | 'active'
  | 'on_hold'
  | 'completed'
  | 'terminated';
export type EmploymentType = 'full_time' | 'part_time' | 'seasonal';
export type EvaluationRating = 1 | 2 | 3 | 4 | 5;

export interface Apprenticeship {
  id: string;
  student_id: string;
  program_id: string;
  employer_id: string;
  supervisor_id: string;

  // Dates
  start_date: Date;
  expected_completion: Date;
  actual_completion?: Date;

  // Hour Requirements
  ojt_hours_required: number;
  ojt_hours_completed: number;
  ri_hours_required: number;
  ri_hours_completed: number;

  // Competencies
  competencies_required: string[];
  competencies_completed: string[];

  // Wage Information
  starting_wage: number;
  current_wage: number;
  wage_type: 'hourly' | 'salary';

  // Employment
  employment_type: EmploymentType;
  work_schedule: string;

  // Status
  status: ApprenticeshipStatus;
  termination_reason?: string;
  termination_date?: Date;

  // Metadata
  created_at: Date;
  updated_at: Date;
}

export interface OJTHourLog {
  id: string;
  apprenticeship_id: string;
  student_id: string;

  // Date and Hours
  work_date: Date;
  hours: number;

  // Work Details
  tasks_performed: string[];
  competencies_practiced: string[];
  location: string;

  // Approval
  supervisor_id: string;
  supervisor_approved: boolean;
  approved_at?: Date;
  rejection_reason?: string;

  // Notes
  student_notes?: string;
  supervisor_notes?: string;

  // Metadata
  submitted_at: Date;
  created_at: Date;
  updated_at: Date;
}

export interface RelatedInstructionLog {
  id: string;
  apprenticeship_id: string;
  student_id: string;

  // Course Information
  course_id: string;
  course_name: string;
  instructor_id: string;

  // Date and Hours
  instruction_date: Date;
  hours: number;

  // Content
  topics_covered: string[];
  competencies_addressed: string[];

  // Assessment
  assessment_score?: number;
  passed: boolean;

  // Attendance
  attendance_verified: boolean;
  verified_by?: string;
  verified_at?: Date;

  // Metadata
  created_at: Date;
  updated_at: Date;
}

export interface SupervisorEvaluation {
  id: string;
  apprenticeship_id: string;
  student_id: string;
  supervisor_id: string;

  // Evaluation Period
  evaluation_date: Date;
  period_start: Date;
  period_end: Date;
  period_label: string; // "Q1 2024"

  // Competency Ratings
  competency_ratings: {
    competency_id: string;
    competency_name: string;
    rating: EvaluationRating;
    comments: string;
  }[];

  // Overall Assessment
  overall_performance: EvaluationRating;
  strengths: string[];
  areas_for_improvement: string[];
  goals_for_next_period: string[];

  // Attendance and Conduct
  attendance_rating: EvaluationRating;
  punctuality_rating: EvaluationRating;
  professionalism_rating: EvaluationRating;
  teamwork_rating: EvaluationRating;

  // Recommendations
  recommend_continuation: boolean;
  recommend_wage_increase: boolean;
  recommended_wage?: number;
  additional_training_needed?: string[];

  // Signatures
  supervisor_signature: string;
  supervisor_signed_at: Date;
  student_acknowledged: boolean;
  student_acknowledged_at?: Date;
  student_comments?: string;

  // Metadata
  created_at: Date;
  updated_at: Date;
}

export interface ApprenticeshipMilestone {
  id: string;
  apprenticeship_id: string;

  // Milestone Details
  name: string;
  description: string;
  target_date: Date;
  completed_date?: Date;

  // Requirements
  requirements: {
    type: 'hours' | 'competency' | 'evaluation' | 'assessment';
    description: string;
    completed: boolean;
  }[];

  // Status
  status: 'pending' | 'in_progress' | 'completed' | 'overdue';

  // Metadata
  created_at: Date;
  updated_at: Date;
}

// Dashboard Summary
export interface ApprenticeshipSummary {
  apprenticeship: Apprenticeship;

  // Progress
  ojt_progress_percentage: number;
  ri_progress_percentage: number;
  competency_progress_percentage: number;
  overall_progress_percentage: number;

  // Time
  days_in_program: number;
  days_remaining: number;
  estimated_completion_date: Date;
  on_track: boolean;

  // Recent Activity
  recent_hour_logs: OJTHourLog[];
  pending_approvals: number;
  upcoming_evaluations: SupervisorEvaluation[];

  // Milestones
  next_milestone: ApprenticeshipMilestone;
  completed_milestones: number;
  total_milestones: number;

  // Performance
  latest_evaluation?: SupervisorEvaluation;
  average_rating: number;
}
