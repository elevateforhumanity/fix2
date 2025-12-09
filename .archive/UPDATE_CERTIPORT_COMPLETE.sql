-- ============================================
-- CERTIPORT - COMPLETE INTEGRATION
-- Full OnVUE access + Testing Center
-- ============================================

DO $$
DECLARE
  certiport_id UUID;
BEGIN
  SELECT id INTO certiport_id FROM partner_lms_providers WHERE provider_type = 'certiport';
  
  -- Update Certiport provider with OnVUE access
  UPDATE partner_lms_providers
  SET metadata = jsonb_build_object(
    'testing_center', 'Elevate for Humanity Career and Technical Institute',
    'testing_address', '7009 E 56th St Ste F, Indianapolis, IN 46226',
    'contact_email', 'elizabethpowell6262@gmail.com',
    'phone', '1-888-222-7890',
    'onvue_access', true,
    'can_schedule_online', true,
    'status', 'active'
  )
  WHERE id = certiport_id;
  
  -- Clear existing Certiport courses
  DELETE FROM partner_courses WHERE provider_id = certiport_id;
  
  -- Add all available Certiport exams with OnVUE pricing
  INSERT INTO partner_courses (provider_id, course_name, course_code, description, hours, level, credential_type, price, active, metadata)
  VALUES
    -- Adobe Creative Cloud
    (certiport_id, 'Adobe Express - Content Creation & Marketing', 'CERT-ADOBE-EXPRESS', 'Content creation for marketers and social media managers', 30, 'beginner', 'exam', 150, true, '{"exam_type": "adobe", "onvue": true, "delivery": "online_proctored"}'::jsonb),
    (certiport_id, 'Adobe Premiere Pro - Digital Video', 'CERT-ADOBE-PREMIERE', 'Video editing for TV, film, and social media', 40, 'intermediate', 'exam', 150, true, '{"exam_type": "adobe", "onvue": true, "delivery": "online_proctored"}'::jsonb),
    (certiport_id, 'Adobe Acrobat Pro - Document Management', 'CERT-ADOBE-ACROBAT', 'PDF creation and e-signature solutions', 20, 'beginner', 'exam', 150, true, '{"exam_type": "adobe", "onvue": true, "delivery": "online_proctored"}'::jsonb),
    (certiport_id, 'Adobe Illustrator - Graphic Design', 'CERT-ADOBE-AI', 'Vector graphics and illustration', 40, 'intermediate', 'exam', 150, true, '{"exam_type": "adobe", "onvue": true, "delivery": "online_proctored"}'::jsonb),
    (certiport_id, 'Adobe Animate - Multiplatform Animation', 'CERT-ADOBE-ANIMATE', 'Vector animation and multimedia authoring', 40, 'intermediate', 'exam', 150, true, '{"exam_type": "adobe", "onvue": true, "delivery": "online_proctored"}'::jsonb),
    (certiport_id, 'Adobe InDesign - Print & Digital Media', 'CERT-ADOBE-INDESIGN', 'Layout and page design', 40, 'intermediate', 'exam', 150, true, '{"exam_type": "adobe", "onvue": true, "delivery": "online_proctored"}'::jsonb),
    (certiport_id, 'Adobe Photoshop - Visual Design', 'CERT-ADOBE-PS', 'Digital imaging and photo editing', 40, 'intermediate', 'exam', 150, true, '{"exam_type": "adobe", "onvue": true, "delivery": "online_proctored"}'::jsonb),
    (certiport_id, 'Adobe After Effects - Visual Effects', 'CERT-ADOBE-AE', 'Motion graphics and video compositing', 50, 'advanced', 'exam', 150, true, '{"exam_type": "adobe", "onvue": true, "delivery": "online_proctored"}'::jsonb),
    (certiport_id, 'Adobe Dreamweaver - Web Authoring', 'CERT-ADOBE-DW', 'Website creation and management', 40, 'intermediate', 'exam', 150, true, '{"exam_type": "adobe", "onvue": true, "delivery": "online_proctored"}'::jsonb),
    
    -- Business & Career
    (certiport_id, 'Entrepreneurship & Small Business - US', 'CERT-ESB-US', 'Entrepreneurial concepts and small business principles (US version)', 30, 'beginner', 'exam', 90, true, '{"exam_type": "business", "onvue": true, "delivery": "online_proctored", "sponsor": "Intuit"}'::jsonb),
    (certiport_id, 'Entrepreneurship & Small Business - Universal', 'CERT-ESB-UNIV', 'Entrepreneurial concepts and small business principles (Universal)', 30, 'beginner', 'exam', 90, true, '{"exam_type": "business", "onvue": true, "delivery": "online_proctored", "sponsor": "Intuit"}'::jsonb),
    (certiport_id, 'PMI Project Management Ready', 'CERT-PMI-PMR', 'Project management fundamentals and tools', 30, 'beginner', 'exam', 125, true, '{"exam_type": "business", "onvue": true, "delivery": "online_proctored", "sponsor": "PMI"}'::jsonb),
    (certiport_id, 'Professional Communication', 'CERT-PROF-COMM', 'Key communication principles for workplace effectiveness', 20, 'beginner', 'exam', 85, true, '{"exam_type": "soft_skills", "onvue": true, "delivery": "online_proctored"}'::jsonb),
    
    -- Digital Literacy (IC3)
    (certiport_id, 'IC3 GS5 - Computing Fundamentals', 'CERT-IC3-GS5-CF', 'Hardware, software, operating systems, and troubleshooting', 20, 'beginner', 'exam', 79, true, '{"exam_type": "ic3", "onvue": true, "delivery": "online_proctored", "version": "GS5"}'::jsonb),
    (certiport_id, 'IC3 GS5 - Key Applications', 'CERT-IC3-GS5-KA', 'Spreadsheet, word processing, and presentation applications', 20, 'beginner', 'exam', 79, true, '{"exam_type": "ic3", "onvue": true, "delivery": "online_proctored", "version": "GS5"}'::jsonb),
    (certiport_id, 'IC3 GS5 - Living Online', 'CERT-IC3-GS5-LO', 'Internet, networks, communication, and collaboration', 20, 'beginner', 'exam', 79, true, '{"exam_type": "ic3", "onvue": true, "delivery": "online_proctored", "version": "GS5"}'::jsonb),
    (certiport_id, 'IC3 GS6 - Level 1', 'CERT-IC3-GS6-L1', 'Fundamental concepts and essential components', 20, 'beginner', 'exam', 79, true, '{"exam_type": "ic3", "onvue": true, "delivery": "online_proctored", "version": "GS6"}'::jsonb),
    (certiport_id, 'IC3 GS6 - Level 2', 'CERT-IC3-GS6-L2', 'Using computers, internet, and applications', 20, 'beginner', 'exam', 79, true, '{"exam_type": "ic3", "onvue": true, "delivery": "online_proctored", "version": "GS6"}'::jsonb),
    (certiport_id, 'IC3 GS6 - Level 3', 'CERT-IC3-GS6-L3', 'Troubleshooting and teaching others', 20, 'intermediate', 'exam', 79, true, '{"exam_type": "ic3", "onvue": true, "delivery": "online_proctored", "version": "GS6"}'::jsonb),
    
    -- Emerging Tech
    (certiport_id, 'Generative AI Foundations', 'CERT-AI-FOUND', 'Fundamental understanding of Generative AI and ethical management', 15, 'beginner', 'exam', 85, true, '{"exam_type": "emerging_tech", "onvue": true, "delivery": "online_proctored"}'::jsonb),
    
    -- Industry Specific
    (certiport_id, 'Agriscience Foundations', 'CERT-AGRI', 'Essential knowledge for agriculture workforce', 30, 'beginner', 'exam', 90, true, '{"exam_type": "industry", "onvue": true, "delivery": "online_proctored"}'::jsonb),
    (certiport_id, 'Medical Administrative Assistant', 'CERT-MED-ADMIN', 'Skills for medical administrative assistant role', 40, 'beginner', 'exam', 90, true, '{"exam_type": "healthcare", "onvue": true, "delivery": "online_proctored"}'::jsonb),
    (certiport_id, 'Culinary Foundations', 'CERT-CULINARY', 'Commercial kitchen skills and food safety', 40, 'beginner', 'exam', 90, true, '{"exam_type": "culinary", "onvue": true, "delivery": "online_proctored", "sponsor": "World Association of Master Chefs"}'::jsonb);
  
END $$;

-- Verify Certiport exams
SELECT 
  course_name,
  course_code,
  price,
  metadata->>'exam_type' as exam_type,
  metadata->>'onvue' as onvue_available
FROM partner_courses
WHERE provider_id = (SELECT id FROM partner_lms_providers WHERE provider_type = 'certiport')
ORDER BY price DESC, course_name;

-- Show summary by exam type
SELECT 
  metadata->>'exam_type' as exam_category,
  COUNT(*) as exam_count,
  MIN(price) as min_price,
  MAX(price) as max_price
FROM partner_courses
WHERE provider_id = (SELECT id FROM partner_lms_providers WHERE provider_type = 'certiport')
GROUP BY metadata->>'exam_type'
ORDER BY exam_count DESC;

-- Total summary
SELECT 
  'Certiport OnVUE Integration' as summary,
  COUNT(*) as total_exams,
  SUM(price) as total_value
FROM partner_courses
WHERE provider_id = (SELECT id FROM partner_lms_providers WHERE provider_type = 'certiport');
