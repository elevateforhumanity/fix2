-- ============================================
-- OJT (On-the-Job Training) TRACKING SYSTEM
-- For Barber & Other Apprenticeships
-- ============================================

-- Create apprenticeship_enrollments table
CREATE TABLE IF NOT EXISTS public.apprenticeship_enrollments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  program_id UUID NOT NULL REFERENCES public.programs(id) ON DELETE CASCADE,
  employer_name TEXT NOT NULL,
  employer_address TEXT,
  employer_phone TEXT,
  employer_email TEXT,
  supervisor_name TEXT NOT NULL,
  supervisor_phone TEXT,
  start_date DATE NOT NULL,
  expected_end_date DATE,
  actual_end_date DATE,
  status TEXT DEFAULT 'active', -- active, completed, suspended, terminated
  total_hours_required INTEGER DEFAULT 1500, -- Indiana barber requirement
  total_hours_completed NUMERIC DEFAULT 0,
  wage_start NUMERIC,
  wage_current NUMERIC,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_apprenticeship_enrollments_student ON public.apprenticeship_enrollments(student_id);
CREATE INDEX IF NOT EXISTS idx_apprenticeship_enrollments_program ON public.apprenticeship_enrollments(program_id);
CREATE INDEX IF NOT EXISTS idx_apprenticeship_enrollments_status ON public.apprenticeship_enrollments(status);

-- Create ojt_hours_log table (daily check-in/check-out)
CREATE TABLE IF NOT EXISTS public.ojt_hours_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  apprenticeship_id UUID NOT NULL REFERENCES public.apprenticeship_enrollments(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  work_date DATE NOT NULL,
  check_in_time TIMESTAMPTZ NOT NULL,
  check_out_time TIMESTAMPTZ,
  total_hours NUMERIC,
  tasks_performed TEXT[], -- Array of tasks: ['haircut', 'shave', 'color', 'cleanup']
  skills_practiced TEXT[], -- Skills worked on
  supervisor_notes TEXT,
  student_notes TEXT,
  approved BOOLEAN DEFAULT false,
  approved_by UUID REFERENCES public.profiles(id),
  approved_at TIMESTAMPTZ,
  location_lat NUMERIC, -- GPS check-in verification
  location_lng NUMERIC,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_ojt_hours_log_apprenticeship ON public.ojt_hours_log(apprenticeship_id);
CREATE INDEX IF NOT EXISTS idx_ojt_hours_log_student ON public.ojt_hours_log(student_id);
CREATE INDEX IF NOT EXISTS idx_ojt_hours_log_date ON public.ojt_hours_log(work_date);
CREATE INDEX IF NOT EXISTS idx_ojt_hours_log_approved ON public.ojt_hours_log(approved);

-- Create skill_competencies table (track specific skills)
CREATE TABLE IF NOT EXISTS public.skill_competencies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  apprenticeship_id UUID NOT NULL REFERENCES public.apprenticeship_enrollments(id) ON DELETE CASCADE,
  skill_name TEXT NOT NULL,
  skill_category TEXT, -- 'cutting', 'styling', 'coloring', 'shaving', 'customer_service'
  times_practiced INTEGER DEFAULT 0,
  proficiency_level TEXT DEFAULT 'beginner', -- beginner, intermediate, advanced, master
  first_practiced_date DATE,
  last_practiced_date DATE,
  supervisor_rating INTEGER, -- 1-5 scale
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_skill_competencies_apprenticeship ON public.skill_competencies(apprenticeship_id);
CREATE INDEX IF NOT EXISTS idx_skill_competencies_category ON public.skill_competencies(skill_category);

-- Create wage_progression table (track wage increases)
CREATE TABLE IF NOT EXISTS public.wage_progression (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  apprenticeship_id UUID NOT NULL REFERENCES public.apprenticeship_enrollments(id) ON DELETE CASCADE,
  effective_date DATE NOT NULL,
  hourly_wage NUMERIC NOT NULL,
  hours_completed_at_change NUMERIC,
  reason TEXT, -- 'initial', 'performance', 'milestone', 'scheduled'
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_wage_progression_apprenticeship ON public.wage_progression(apprenticeship_id);

-- Function to calculate total hours
CREATE OR REPLACE FUNCTION calculate_apprenticeship_hours(apprenticeship_uuid UUID)
RETURNS NUMERIC AS $$
DECLARE
  total NUMERIC;
BEGIN
  SELECT COALESCE(SUM(total_hours), 0)
  INTO total
  FROM ojt_hours_log
  WHERE apprenticeship_id = apprenticeship_uuid
    AND approved = true;
  
  RETURN total;
END;
$$ LANGUAGE plpgsql;

-- Function to auto-calculate hours when check-out happens
CREATE OR REPLACE FUNCTION auto_calculate_hours()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.check_out_time IS NOT NULL AND NEW.check_in_time IS NOT NULL THEN
    NEW.total_hours := EXTRACT(EPOCH FROM (NEW.check_out_time - NEW.check_in_time)) / 3600.0;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_auto_calculate_hours
BEFORE INSERT OR UPDATE ON ojt_hours_log
FOR EACH ROW
EXECUTE FUNCTION auto_calculate_hours();

-- Function to update apprenticeship total hours
CREATE OR REPLACE FUNCTION update_apprenticeship_total_hours()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE apprenticeship_enrollments
  SET 
    total_hours_completed = calculate_apprenticeship_hours(NEW.apprenticeship_id),
    updated_at = NOW()
  WHERE id = NEW.apprenticeship_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_apprenticeship_hours
AFTER INSERT OR UPDATE ON ojt_hours_log
FOR EACH ROW
WHEN (NEW.approved = true)
EXECUTE FUNCTION update_apprenticeship_total_hours();

-- Seed barber skills
INSERT INTO skill_competencies (apprenticeship_id, skill_name, skill_category, proficiency_level)
SELECT 
  ae.id,
  skill.name,
  skill.category,
  'beginner'
FROM apprenticeship_enrollments ae
CROSS JOIN (
  VALUES 
    ('Basic Haircut', 'cutting'),
    ('Fade Haircut', 'cutting'),
    ('Taper Cut', 'cutting'),
    ('Beard Trim', 'shaving'),
    ('Straight Razor Shave', 'shaving'),
    ('Hair Coloring', 'coloring'),
    ('Highlights', 'coloring'),
    ('Blow Dry Styling', 'styling'),
    ('Product Application', 'styling'),
    ('Customer Consultation', 'customer_service'),
    ('Sanitation & Safety', 'safety'),
    ('Tool Maintenance', 'maintenance')
) AS skill(name, category)
WHERE ae.program_id IN (SELECT id FROM programs WHERE name ILIKE '%barber%')
ON CONFLICT DO NOTHING;

-- Verify tables created
SELECT 
  table_name,
  (SELECT COUNT(*) FROM information_schema.columns WHERE table_name = t.table_name) as column_count
FROM information_schema.tables t
WHERE table_schema = 'public'
  AND table_name IN (
    'apprenticeship_enrollments',
    'ojt_hours_log',
    'skill_competencies',
    'wage_progression'
  )
ORDER BY table_name;
