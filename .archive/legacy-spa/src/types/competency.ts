/**
 * Competency Framework Types
 * Moodle-inspired competency-based learning system
 */

export type CompetencyStatus = 'not_started' | 'in_progress' | 'mastered' | 'expired';
export type AssessmentMethod = 'observation' | 'test' | 'project' | 'portfolio' | 'demonstration';
export type EvidenceType = 'video' | 'photo' | 'document' | 'supervisor_sign_off' | 'test_result';

export interface Competency {
  id: string;
  program_id: string;
  name: string;
  description: string;
  category: string;
  levels: CompetencyLevel[];
  evidence_required: EvidenceType[];
  created_at: Date;
  updated_at: Date;
}

export interface CompetencyLevel {
  level: number;
  name: string;
  description: string;
  criteria: string[];
  assessment_method: AssessmentMethod;
  passing_score?: number;
  estimated_hours?: number;
}

export interface StudentCompetency {
  id: string;
  student_id: string;
  competency_id: string;
  current_level: number;
  status: CompetencyStatus;
  evidence: Evidence[];
  assessed_by?: string;
  assessed_at?: Date;
  expiration_date?: Date;
  notes?: string;
  created_at: Date;
  updated_at: Date;
}

export interface Evidence {
  id: string;
  student_competency_id: string;
  type: EvidenceType;
  file_url?: string;
  description: string;
  submitted_at: Date;
  reviewed_by?: string;
  reviewed_at?: Date;
  approved: boolean;
  feedback?: string;
}

export interface CompetencyAssessment {
  id: string;
  student_competency_id: string;
  assessor_id: string;
  assessment_date: Date;
  level_assessed: number;
  score?: number;
  passed: boolean;
  feedback: string;
  evidence_reviewed: string[];
  next_steps?: string;
}

// Competency Progress Summary
export interface CompetencyProgress {
  competency: Competency;
  student_competency: StudentCompetency;
  progress_percentage: number;
  levels_completed: number;
  total_levels: number;
  time_spent_hours: number;
  evidence_submitted: number;
  evidence_approved: number;
  next_milestone: string;
}
