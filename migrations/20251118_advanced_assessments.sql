-- Question banks (per course or global)
CREATE TABLE IF NOT EXISTS question_banks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id uuid NULL,
  title text NOT NULL,
  description text,
  created_by uuid NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Questions
CREATE TABLE IF NOT EXISTS questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  bank_id uuid NOT NULL REFERENCES question_banks(id) ON DELETE CASCADE,
  type text NOT NULL, -- multiple_choice | true_false | short_answer
  difficulty text NOT NULL DEFAULT 'medium', -- easy | medium | hard
  prompt text NOT NULL,
  choices jsonb, -- [{id:'A', text:'...'}, ...]
  correct_answer jsonb, -- for MC: "A", for multi-select: ["A","C"], etc.
  metadata jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Exams built from a bank
CREATE TABLE IF NOT EXISTS exams (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id uuid NOT NULL,
  bank_id uuid NOT NULL REFERENCES question_banks(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  total_questions integer NOT NULL DEFAULT 20,
  passing_score numeric(5,2) NOT NULL DEFAULT 70.00,
  time_limit_minutes integer NOT NULL DEFAULT 60,
  max_attempts integer NOT NULL DEFAULT 3,
  adaptive boolean NOT NULL DEFAULT false,
  proctoring_provider text,
  proctoring_required boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- A student's exam attempt
CREATE TABLE IF NOT EXISTS exam_attempts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  exam_id uuid NOT NULL REFERENCES exams(id) ON DELETE CASCADE,
  student_id uuid NOT NULL,
  status text NOT NULL DEFAULT 'in_progress', -- in_progress | completed | abandoned
  started_at timestamptz NOT NULL DEFAULT now(),
  completed_at timestamptz,
  score numeric(5,2),
  ip_address text,
  user_agent text,
  attempt_number integer NOT NULL DEFAULT 1,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Each question in an attempt
CREATE TABLE IF NOT EXISTS exam_attempt_questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  attempt_id uuid NOT NULL REFERENCES exam_attempts(id) ON DELETE CASCADE,
  question_id uuid NOT NULL REFERENCES questions(id),
  position integer NOT NULL,
  shown_difficulty text,
  student_answer jsonb,
  is_correct boolean,
  answered_at timestamptz
);
