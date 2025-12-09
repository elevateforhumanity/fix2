-- ============================================
-- PROGRAM HOLDER SYSTEM - COMPLETE SETUP
-- Creates all tables, permissions, and RLS policies
-- ============================================

-- 1. Create program_holders table
CREATE TABLE IF NOT EXISTS program_holders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  organization_name TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  address TEXT,
  city TEXT,
  state TEXT,
  zip_code TEXT,
  
  -- Status and verification
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'inactive', 'suspended')),
  is_verified BOOLEAN DEFAULT false,
  verified_at TIMESTAMPTZ,
  verified_by UUID REFERENCES profiles(id),
  
  -- Permissions
  permissions JSONB DEFAULT '{}',
  can_manage_students BOOLEAN DEFAULT true,
  can_issue_certificates BOOLEAN DEFAULT false,
  can_view_reports BOOLEAN DEFAULT true,
  can_create_programs BOOLEAN DEFAULT false,
  
  -- Program details
  program_types TEXT[],
  max_students INTEGER,
  current_students INTEGER DEFAULT 0,
  
  -- Compliance
  license_number TEXT,
  license_expiry DATE,
  insurance_verified BOOLEAN DEFAULT false,
  background_check_completed BOOLEAN DEFAULT false,
  
  -- Metadata
  notes TEXT,
  metadata JSONB DEFAULT '{}',
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(email)
);

-- 2. Create program_holder_acknowledgements table
CREATE TABLE IF NOT EXISTS program_holder_acknowledgements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  program_holder_id UUID NOT NULL REFERENCES program_holders(id) ON DELETE CASCADE,
  acknowledgement_type TEXT NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  version TEXT DEFAULT '1.0',
  
  -- Acknowledgement status
  acknowledged_at TIMESTAMPTZ,
  acknowledged_by UUID REFERENCES auth.users(id),
  ip_address INET,
  user_agent TEXT,
  
  -- Metadata
  metadata JSONB DEFAULT '{}',
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(program_holder_id, acknowledgement_type, version)
);

-- 3. Create program_holder_students table (junction table)
CREATE TABLE IF NOT EXISTS program_holder_students (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  program_holder_id UUID NOT NULL REFERENCES program_holders(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  enrollment_id UUID REFERENCES enrollments(id) ON DELETE SET NULL,
  
  -- Status
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'completed', 'withdrawn')),
  start_date DATE DEFAULT CURRENT_DATE,
  end_date DATE,
  
  -- Progress tracking
  hours_completed DECIMAL(10,2) DEFAULT 0,
  hours_required DECIMAL(10,2),
  progress_percentage INTEGER DEFAULT 0,
  
  -- Metadata
  notes TEXT,
  metadata JSONB DEFAULT '{}',
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(program_holder_id, student_id, enrollment_id)
);

-- 4. Create program_holder_reports table
CREATE TABLE IF NOT EXISTS program_holder_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  program_holder_id UUID NOT NULL REFERENCES program_holders(id) ON DELETE CASCADE,
  report_type TEXT NOT NULL,
  report_period_start DATE NOT NULL,
  report_period_end DATE NOT NULL,
  
  -- Report data
  report_data JSONB DEFAULT '{}',
  summary TEXT,
  
  -- Status
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'submitted', 'approved', 'rejected')),
  submitted_at TIMESTAMPTZ,
  reviewed_at TIMESTAMPTZ,
  reviewed_by UUID REFERENCES profiles(id),
  
  -- File attachments
  file_url TEXT,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_program_holders_user ON program_holders(user_id);
CREATE INDEX IF NOT EXISTS idx_program_holders_status ON program_holders(status);
CREATE INDEX IF NOT EXISTS idx_program_holders_email ON program_holders(email);
CREATE INDEX IF NOT EXISTS idx_program_holder_acknowledgements_holder ON program_holder_acknowledgements(program_holder_id);
CREATE INDEX IF NOT EXISTS idx_program_holder_students_holder ON program_holder_students(program_holder_id);
CREATE INDEX IF NOT EXISTS idx_program_holder_students_student ON program_holder_students(student_id);
CREATE INDEX IF NOT EXISTS idx_program_holder_reports_holder ON program_holder_reports(program_holder_id);

-- 6. Enable RLS
ALTER TABLE program_holders ENABLE ROW LEVEL SECURITY;
ALTER TABLE program_holder_acknowledgements ENABLE ROW LEVEL SECURITY;
ALTER TABLE program_holder_students ENABLE ROW LEVEL SECURITY;
ALTER TABLE program_holder_reports ENABLE ROW LEVEL SECURITY;

-- 7. Create RLS policies for program_holders

-- Program holders can view their own record
DROP POLICY IF EXISTS "Program holders can view own record" ON program_holders;
CREATE POLICY "Program holders can view own record" 
ON program_holders FOR SELECT 
USING (auth.uid() = user_id);

-- Program holders can update their own record
DROP POLICY IF EXISTS "Program holders can update own record" ON program_holders;
CREATE POLICY "Program holders can update own record" 
ON program_holders FOR UPDATE 
USING (auth.uid() = user_id);

-- Admins can view all program holders
DROP POLICY IF EXISTS "Admins can view all program holders" ON program_holders;
CREATE POLICY "Admins can view all program holders" 
ON program_holders FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role = 'admin'
  )
);

-- Admins can manage all program holders
DROP POLICY IF EXISTS "Admins can manage program holders" ON program_holders;
CREATE POLICY "Admins can manage program holders" 
ON program_holders FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role = 'admin'
  )
);

-- 8. Create RLS policies for program_holder_acknowledgements

-- Program holders can view their own acknowledgements
DROP POLICY IF EXISTS "Program holders can view own acknowledgements" ON program_holder_acknowledgements;
CREATE POLICY "Program holders can view own acknowledgements" 
ON program_holder_acknowledgements FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM program_holders 
    WHERE program_holders.id = program_holder_acknowledgements.program_holder_id 
    AND program_holders.user_id = auth.uid()
  )
);

-- Program holders can create their own acknowledgements
DROP POLICY IF EXISTS "Program holders can create acknowledgements" ON program_holder_acknowledgements;
CREATE POLICY "Program holders can create acknowledgements" 
ON program_holder_acknowledgements FOR INSERT 
WITH CHECK (
  EXISTS (
    SELECT 1 FROM program_holders 
    WHERE program_holders.id = program_holder_acknowledgements.program_holder_id 
    AND program_holders.user_id = auth.uid()
  )
);

-- 9. Create RLS policies for program_holder_students

-- Program holders can view their students
DROP POLICY IF EXISTS "Program holders can view their students" ON program_holder_students;
CREATE POLICY "Program holders can view their students" 
ON program_holder_students FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM program_holders 
    WHERE program_holders.id = program_holder_students.program_holder_id 
    AND program_holders.user_id = auth.uid()
  )
);

-- Program holders can manage their students
DROP POLICY IF EXISTS "Program holders can manage students" ON program_holder_students;
CREATE POLICY "Program holders can manage students" 
ON program_holder_students FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM program_holders 
    WHERE program_holders.id = program_holder_students.program_holder_id 
    AND program_holders.user_id = auth.uid()
    AND program_holders.can_manage_students = true
  )
);

-- Students can view their own program holder relationship
DROP POLICY IF EXISTS "Students can view own program holder" ON program_holder_students;
CREATE POLICY "Students can view own program holder" 
ON program_holder_students FOR SELECT 
USING (auth.uid() = student_id);

-- 10. Create RLS policies for program_holder_reports

-- Program holders can view their own reports
DROP POLICY IF EXISTS "Program holders can view own reports" ON program_holder_reports;
CREATE POLICY "Program holders can view own reports" 
ON program_holder_reports FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM program_holders 
    WHERE program_holders.id = program_holder_reports.program_holder_id 
    AND program_holders.user_id = auth.uid()
  )
);

-- Program holders can create reports
DROP POLICY IF EXISTS "Program holders can create reports" ON program_holder_reports;
CREATE POLICY "Program holders can create reports" 
ON program_holder_reports FOR INSERT 
WITH CHECK (
  EXISTS (
    SELECT 1 FROM program_holders 
    WHERE program_holders.id = program_holder_reports.program_holder_id 
    AND program_holders.user_id = auth.uid()
    AND program_holders.can_view_reports = true
  )
);

-- 11. Create helper functions

-- Function to update program holder student count
CREATE OR REPLACE FUNCTION update_program_holder_student_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE program_holders 
    SET current_students = (
      SELECT COUNT(*) 
      FROM program_holder_students 
      WHERE program_holder_id = NEW.program_holder_id 
      AND status = 'active'
    )
    WHERE id = NEW.program_holder_id;
  ELSIF TG_OP = 'UPDATE' THEN
    UPDATE program_holders 
    SET current_students = (
      SELECT COUNT(*) 
      FROM program_holder_students 
      WHERE program_holder_id = NEW.program_holder_id 
      AND status = 'active'
    )
    WHERE id = NEW.program_holder_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE program_holders 
    SET current_students = (
      SELECT COUNT(*) 
      FROM program_holder_students 
      WHERE program_holder_id = OLD.program_holder_id 
      AND status = 'active'
    )
    WHERE id = OLD.program_holder_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for student count
DROP TRIGGER IF EXISTS trigger_update_program_holder_student_count ON program_holder_students;
CREATE TRIGGER trigger_update_program_holder_student_count
AFTER INSERT OR UPDATE OR DELETE ON program_holder_students
FOR EACH ROW EXECUTE FUNCTION update_program_holder_student_count();

-- 12. Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at triggers
DROP TRIGGER IF EXISTS update_program_holders_updated_at ON program_holders;
CREATE TRIGGER update_program_holders_updated_at
BEFORE UPDATE ON program_holders
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_program_holder_acknowledgements_updated_at ON program_holder_acknowledgements;
CREATE TRIGGER update_program_holder_acknowledgements_updated_at
BEFORE UPDATE ON program_holder_acknowledgements
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_program_holder_students_updated_at ON program_holder_students;
CREATE TRIGGER update_program_holder_students_updated_at
BEFORE UPDATE ON program_holder_students
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Success message
DO $$
BEGIN
  RAISE NOTICE '✅ Program Holder System created successfully';
  RAISE NOTICE '   - program_holders table';
  RAISE NOTICE '   - program_holder_acknowledgements table';
  RAISE NOTICE '   - program_holder_students table';
  RAISE NOTICE '   - program_holder_reports table';
  RAISE NOTICE '   - All RLS policies';
  RAISE NOTICE '   - All triggers and functions';
END $$;
