-- Add Indexes, Foreign Keys, and Triggers to Existing Tables

-- Add Foreign Keys
ALTER TABLE funding_applications 
  ADD CONSTRAINT fk_funding_user FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE,
  ADD CONSTRAINT fk_funding_reviewer FOREIGN KEY (reviewed_by) REFERENCES auth.users(id) ON DELETE SET NULL;

ALTER TABLE user_streaks 
  ADD CONSTRAINT fk_streaks_user FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

ALTER TABLE certificates 
  ADD CONSTRAINT fk_cert_user FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE,
  ADD CONSTRAINT fk_cert_revoker FOREIGN KEY (revoked_by) REFERENCES auth.users(id) ON DELETE SET NULL;

ALTER TABLE program_holder_notes 
  ADD CONSTRAINT fk_notes_user FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

-- Add Indexes
CREATE INDEX IF NOT EXISTS idx_video_chapters_video_id ON video_chapters(video_id);
CREATE INDEX IF NOT EXISTS idx_video_chapters_start_time ON video_chapters(start_time);

CREATE INDEX IF NOT EXISTS idx_video_transcripts_video_id ON video_transcripts(video_id);

CREATE INDEX IF NOT EXISTS idx_funding_applications_user_id ON funding_applications(user_id);
CREATE INDEX IF NOT EXISTS idx_funding_applications_course_id ON funding_applications(course_id);
CREATE INDEX IF NOT EXISTS idx_funding_applications_status ON funding_applications(status);
CREATE INDEX IF NOT EXISTS idx_funding_applications_program_type ON funding_applications(program_type);

CREATE INDEX IF NOT EXISTS idx_user_streaks_user_id ON user_streaks(user_id);

CREATE INDEX IF NOT EXISTS idx_xapi_statements_timestamp ON xapi_statements(timestamp);
CREATE INDEX IF NOT EXISTS idx_xapi_statements_stored_at ON xapi_statements(stored_at);
CREATE INDEX IF NOT EXISTS idx_xapi_statements_actor ON xapi_statements USING GIN(actor);
CREATE INDEX IF NOT EXISTS idx_xapi_statements_verb ON xapi_statements USING GIN(verb);

CREATE INDEX IF NOT EXISTS idx_certificates_user_id ON certificates(user_id);
CREATE INDEX IF NOT EXISTS idx_certificates_course_id ON certificates(course_id);
CREATE INDEX IF NOT EXISTS idx_certificates_verification_code ON certificates(verification_code);
CREATE INDEX IF NOT EXISTS idx_certificates_is_revoked ON certificates(is_revoked);

CREATE INDEX IF NOT EXISTS idx_program_holder_notes_user_id ON program_holder_notes(user_id);
CREATE INDEX IF NOT EXISTS idx_program_holder_notes_course_id ON program_holder_notes(course_id);
CREATE INDEX IF NOT EXISTS idx_program_holder_notes_program_holder_id ON program_holder_notes(program_holder_id);

CREATE INDEX IF NOT EXISTS idx_ai_generated_courses_tenant_id ON ai_generated_courses(tenant_id);
CREATE INDEX IF NOT EXISTS idx_ai_generated_courses_created_at ON ai_generated_courses(created_at);

-- Add Update Triggers
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_video_chapters_updated_at ON video_chapters;
CREATE TRIGGER update_video_chapters_updated_at 
  BEFORE UPDATE ON video_chapters 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_video_transcripts_updated_at ON video_transcripts;
CREATE TRIGGER update_video_transcripts_updated_at 
  BEFORE UPDATE ON video_transcripts 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_funding_applications_updated_at ON funding_applications;
CREATE TRIGGER update_funding_applications_updated_at 
  BEFORE UPDATE ON funding_applications 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_user_streaks_updated_at ON user_streaks;
CREATE TRIGGER update_user_streaks_updated_at 
  BEFORE UPDATE ON user_streaks 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_certificates_updated_at ON certificates;
CREATE TRIGGER update_certificates_updated_at 
  BEFORE UPDATE ON certificates 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_program_holder_notes_updated_at ON program_holder_notes;
CREATE TRIGGER update_program_holder_notes_updated_at 
  BEFORE UPDATE ON program_holder_notes 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Grant Permissions
GRANT ALL ON video_chapters TO authenticated;
GRANT ALL ON video_transcripts TO authenticated;
GRANT ALL ON funding_applications TO authenticated;
GRANT ALL ON user_streaks TO authenticated;
GRANT ALL ON xapi_statements TO authenticated;
GRANT ALL ON certificates TO authenticated;
GRANT ALL ON program_holder_notes TO authenticated;
GRANT ALL ON ai_generated_courses TO authenticated;

SELECT 'Indexes, foreign keys, and triggers added successfully!' as message;
