-- ENABLE RLS ONLY (No policies that reference non-existent columns)

ALTER TABLE customer_service_tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE qa_checklists ENABLE ROW LEVEL SECURITY;
ALTER TABLE qa_checklist_completions ENABLE ROW LEVEL SECURITY;
ALTER TABLE staff_processes ENABLE ROW LEVEL SECURITY;
ALTER TABLE employers ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_postings ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE apprenticeships ENABLE ROW LEVEL SECURITY;
ALTER TABLE apprenticeship_enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE payroll_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE crm_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE crm_interactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE tax_filings ENABLE ROW LEVEL SECURITY;
ALTER TABLE vita_appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE shop_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE ferpa_training_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE document_signatures ENABLE ROW LEVEL SECURITY;
ALTER TABLE calendar_events ENABLE ROW LEVEL SECURITY;

-- ADD SIMPLE POLICIES (No role checks, just user ownership)
CREATE POLICY "calendar_user_policy" ON calendar_events FOR ALL TO authenticated USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());
CREATE POLICY "payroll_user_policy" ON payroll_profiles FOR ALL TO authenticated USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());
CREATE POLICY "tax_user_policy" ON tax_filings FOR ALL TO authenticated USING (student_id = auth.uid()) WITH CHECK (student_id = auth.uid());
CREATE POLICY "ferpa_user_policy" ON ferpa_training_records FOR ALL TO authenticated USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());
CREATE POLICY "signature_user_policy" ON document_signatures FOR ALL TO authenticated USING (signer_id = auth.uid()) WITH CHECK (signer_id = auth.uid());
CREATE POLICY "application_user_policy" ON job_applications FOR ALL TO authenticated USING (student_id = auth.uid()) WITH CHECK (student_id = auth.uid());
CREATE POLICY "job_public_policy" ON job_postings FOR SELECT TO authenticated USING (true);
CREATE POLICY "employer_public_policy" ON employers FOR SELECT TO authenticated USING (true);
CREATE POLICY "apprenticeship_public_policy" ON apprenticeships FOR SELECT TO authenticated USING (true);
CREATE POLICY "ticket_user_policy" ON customer_service_tickets FOR ALL TO authenticated USING (student_id = auth.uid() OR staff_id = auth.uid());
CREATE POLICY "crm_contact_policy" ON crm_contacts FOR ALL TO authenticated USING (true);
CREATE POLICY "crm_interaction_policy" ON crm_interactions FOR ALL TO authenticated USING (user_id = auth.uid());
CREATE POLICY "vita_user_policy" ON vita_appointments FOR ALL TO authenticated USING (student_id = auth.uid());
CREATE POLICY "shop_report_policy" ON shop_reports FOR ALL TO authenticated USING (submitted_by = auth.uid());
CREATE POLICY "qa_checklist_policy" ON qa_checklists FOR ALL TO authenticated USING (true);
CREATE POLICY "qa_completion_policy" ON qa_checklist_completions FOR ALL TO authenticated USING (completed_by = auth.uid());
CREATE POLICY "process_policy" ON staff_processes FOR SELECT TO authenticated USING (true);
CREATE POLICY "apprenticeship_enrollment_policy" ON apprenticeship_enrollments FOR ALL TO authenticated USING (student_id = auth.uid());
