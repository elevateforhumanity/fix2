-- Default Campaign Templates
-- Pre-built templates for common use cases

INSERT INTO campaign_templates (name, subject, html_content, category, variables) VALUES

-- Student Reminders
('Complete FAFSA', 
 'Action Required: Complete Your FAFSA',
 '<!DOCTYPE html>
<html>
<body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h2>Hi {{student_name}},</h2>
  <p>This is a friendly reminder to complete your FAFSA application.</p>
  <p><strong>Deadline:</strong> {{deadline_date}}</p>
  <p>Need help? Contact us at {{support_email}}</p>
  <a href="{{fafsa_link}}" style="display: inline-block; background: #16a34a; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0;">Complete FAFSA Now</a>
  <p>Best regards,<br>{{organization_name}}</p>
</body>
</html>',
 'student_reminder',
 '["student_name", "deadline_date", "support_email", "fafsa_link", "organization_name"]'),

('Course Starting Soon',
 'Your {{course_name}} Course Starts {{start_date}}',
 '<!DOCTYPE html>
<html>
<body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h2>Get Ready, {{student_name}}!</h2>
  <p>Your <strong>{{course_name}}</strong> course starts on <strong>{{start_date}}</strong>.</p>
  <h3>What You Need:</h3>
  <ul>
    <li>Login credentials (check your email)</li>
    <li>Course materials (available in your dashboard)</li>
    <li>Reliable internet connection</li>
  </ul>
  <a href="{{dashboard_link}}" style="display: inline-block; background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0;">Access Your Dashboard</a>
  <p>Questions? Reply to this email or call {{support_phone}}</p>
  <p>See you in class!<br>{{instructor_name}}</p>
</body>
</html>',
 'program_update',
 '["student_name", "course_name", "start_date", "dashboard_link", "support_phone", "instructor_name"]'),

-- Class Announcements
('Assignment Due Reminder',
 'Reminder: {{assignment_name}} Due {{due_date}}',
 '<!DOCTYPE html>
<html>
<body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h2>Hi {{student_name}},</h2>
  <p>This is a reminder that <strong>{{assignment_name}}</strong> is due on <strong>{{due_date}}</strong>.</p>
  <p><strong>Status:</strong> {{completion_status}}</p>
  <a href="{{assignment_link}}" style="display: inline-block; background: #ea580c; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0;">View Assignment</a>
  <p>Need help? Office hours: {{office_hours}}</p>
  <p>{{instructor_name}}<br>{{course_name}}</p>
</body>
</html>',
 'class_announcement',
 '["student_name", "assignment_name", "due_date", "completion_status", "assignment_link", "office_hours", "instructor_name", "course_name"]'),

('Weekly Check-In',
 'How Are You Doing in {{course_name}}?',
 '<!DOCTYPE html>
<html>
<body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h2>Hi {{student_name}},</h2>
  <p>Just checking in on your progress in <strong>{{course_name}}</strong>.</p>
  <h3>Your Progress:</h3>
  <ul>
    <li>Completed: {{completed_lessons}} of {{total_lessons}} lessons</li>
    <li>Current grade: {{current_grade}}</li>
    <li>Last login: {{last_login}}</li>
  </ul>
  <p>{{encouragement_message}}</p>
  <a href="{{dashboard_link}}" style="display: inline-block; background: #16a34a; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0;">Continue Learning</a>
  <p>Keep up the great work!<br>{{instructor_name}}</p>
</body>
</html>',
 'class_announcement',
 '["student_name", "course_name", "completed_lessons", "total_lessons", "current_grade", "last_login", "encouragement_message", "dashboard_link", "instructor_name"]'),

-- Hiring/Employer
('Interview Invitation',
 'Interview Invitation: {{position_name}} at {{company_name}}',
 '<!DOCTYPE html>
<html>
<body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h2>Congratulations, {{candidate_name}}!</h2>
  <p>We would like to invite you to interview for the <strong>{{position_name}}</strong> position at <strong>{{company_name}}</strong>.</p>
  <h3>Interview Details:</h3>
  <ul>
    <li><strong>Date:</strong> {{interview_date}}</li>
    <li><strong>Time:</strong> {{interview_time}}</li>
    <li><strong>Format:</strong> {{interview_format}}</li>
    <li><strong>Duration:</strong> {{duration}}</li>
  </ul>
  <a href="{{calendar_link}}" style="display: inline-block; background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0;">Add to Calendar</a>
  <p>Please confirm your attendance by replying to this email.</p>
  <p>Best regards,<br>{{hiring_manager_name}}<br>{{company_name}}</p>
</body>
</html>',
 'hiring_invitation',
 '["candidate_name", "position_name", "company_name", "interview_date", "interview_time", "interview_format", "duration", "calendar_link", "hiring_manager_name"]'),

-- Follow-ups
('Student Not Responding',
 'We Miss You in {{course_name}}',
 '<!DOCTYPE html>
<html>
<body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h2>Hi {{student_name}},</h2>
  <p>We noticed you haven''t logged into <strong>{{course_name}}</strong> in {{days_inactive}} days.</p>
  <p>Is everything okay? We''re here to help!</p>
  <h3>Need Support?</h3>
  <ul>
    <li>Technical issues? Email {{tech_support_email}}</li>
    <li>Course questions? Email {{instructor_email}}</li>
    <li>Personal challenges? Call {{counselor_phone}}</li>
  </ul>
  <a href="{{dashboard_link}}" style="display: inline-block; background: #16a34a; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0;">Resume Your Course</a>
  <p>We believe in you!<br>{{support_team_name}}</p>
</body>
</html>',
 'follow_up',
 '["student_name", "course_name", "days_inactive", "tech_support_email", "instructor_email", "counselor_phone", "dashboard_link", "support_team_name"]'),

-- Program Updates
('Program Completion Congratulations',
 'Congratulations! You Completed {{program_name}}',
 '<!DOCTYPE html>
<html>
<body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h2>🎉 Congratulations, {{student_name}}!</h2>
  <p>You have successfully completed the <strong>{{program_name}}</strong> program!</p>
  <h3>What''s Next:</h3>
  <ul>
    <li>Download your certificate: <a href="{{certificate_link}}">Get Certificate</a></li>
    <li>Update your resume with your new skills</li>
    <li>Browse job opportunities: <a href="{{jobs_link}}">View Jobs</a></li>
    <li>Leave us a review: <a href="{{review_link}}">Share Your Experience</a></li>
  </ul>
  <p>We''re so proud of you! Keep in touch and let us know about your career success.</p>
  <p>Best wishes,<br>{{program_director_name}}<br>{{organization_name}}</p>
</body>
</html>',
 'program_update',
 '["student_name", "program_name", "certificate_link", "jobs_link", "review_link", "program_director_name", "organization_name"]'),

-- General
('Welcome to Platform',
 'Welcome to {{organization_name}}!',
 '<!DOCTYPE html>
<html>
<body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h2>Welcome, {{user_name}}!</h2>
  <p>We''re excited to have you join <strong>{{organization_name}}</strong>.</p>
  <h3>Get Started:</h3>
  <ol>
    <li>Complete your profile: <a href="{{profile_link}}">Update Profile</a></li>
    <li>Browse available programs: <a href="{{programs_link}}">View Programs</a></li>
    <li>Connect with your advisor: <a href="{{advisor_link}}">Schedule Meeting</a></li>
  </ol>
  <a href="{{dashboard_link}}" style="display: inline-block; background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0;">Go to Dashboard</a>
  <p>Questions? We''re here to help!</p>
  <ul>
    <li>Email: {{support_email}}</li>
    <li>Phone: {{support_phone}}</li>
    <li>Live Chat: Available in your dashboard</li>
  </ul>
  <p>Welcome aboard!<br>The {{organization_name}} Team</p>
</body>
</html>',
 'general',
 '["user_name", "organization_name", "profile_link", "programs_link", "advisor_link", "dashboard_link", "support_email", "support_phone"]');

-- Mark all as active
UPDATE campaign_templates SET is_active = true;
