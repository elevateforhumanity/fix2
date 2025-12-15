import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://cuxzzpsyufcewtmicszk.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1eHp6cHN5dWZjZXd0bWljc3prIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODE2MTA0NywiZXhwIjoyMDczNzM3MDQ3fQ.5JRYvJPzFzsVaZQkbZDLcohP7dq8LWQEFeFdVByyihE';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const studentId = '52946462-d9ec-4717-a9dc-35e44135f08b';

console.log('🔍 Checking student enrollments...\n');

// Check existing enrollments
const { data: existing, error: checkError } = await supabase
  .from('enrollments')
  .select('id, course_id, courses(title)')
  .eq('user_id', studentId);

if (checkError) {
  console.log('❌ Error checking enrollments:', checkError.message);
  process.exit(1);
}

console.log(`Found ${existing.length} existing enrollments`);
if (existing.length > 0) {
  existing.forEach(e => console.log(`  - ${e.courses?.title || 'Unknown'}`));
}

// Get available courses
const { data: courses, error: coursesError } = await supabase
  .from('courses')
  .select('id, title, slug')
  .in('slug', ['medical-assistant', 'hvac-technician', 'barber-apprenticeship'])
  .limit(3);

if (coursesError) {
  console.log('❌ Error fetching courses:', coursesError.message);
  process.exit(1);
}

console.log(`\n📚 Found ${courses.length} courses to enroll in`);

// Enroll student in courses
for (const course of courses) {
  // Check if already enrolled
  const alreadyEnrolled = existing.some(e => e.course_id === course.id);
  
  if (alreadyEnrolled) {
    console.log(`⏭️  Already enrolled in: ${course.title}`);
    continue;
  }

  console.log(`📝 Enrolling in: ${course.title}...`);
  
  const { data, error } = await supabase
    .from('enrollments')
    .insert({
      user_id: studentId,
      course_id: course.id,
      status: 'active',
      progress: Math.floor(Math.random() * 40) + 50, // 50-90% progress
      enrolled_at: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString()
    })
    .select()
    .single();

  if (error) {
    console.log(`❌ Error: ${error.message}`);
  } else {
    console.log(`✅ Enrolled! (${data.progress}% progress)`);
  }
}

// Create some certificates
console.log('\n🏆 Creating certificates...');

const { data: completedEnrollments } = await supabase
  .from('enrollments')
  .select('id, course_id, courses(title)')
  .eq('user_id', studentId)
  .gte('progress', 90);

for (const enrollment of completedEnrollments || []) {
  // Check if certificate already exists
  const { data: existingCert } = await supabase
    .from('certificates')
    .select('id')
    .eq('user_id', studentId)
    .eq('course_id', enrollment.course_id)
    .single();

  if (existingCert) {
    console.log(`⏭️  Certificate already exists for: ${enrollment.courses?.title}`);
    continue;
  }

  const certNumber = `EFH-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
  
  const { error: certError } = await supabase
    .from('certificates')
    .insert({
      user_id: studentId,
      course_id: enrollment.course_id,
      enrollment_id: enrollment.id,
      certificate_number: certNumber,
      title: `Certificate of Completion - ${enrollment.courses?.title}`,
      description: 'Successfully completed all course requirements',
      issued_at: new Date().toISOString()
    });

  if (certError) {
    console.log(`❌ Error creating certificate: ${certError.message}`);
  } else {
    console.log(`✅ Certificate created: ${certNumber}`);
  }
}

console.log('\n✅ Student enrollment complete!');
console.log('\nNow refresh the dashboard to see real data!');
