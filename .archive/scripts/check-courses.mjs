import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

console.log('🔍 Checking Courses in Database...\n');

// Check courses
const { data: courses, error } = await supabase
  .from('courses')
  .select('*')
  .order('created_at', { ascending: false });

if (error) {
  console.log('❌ Error:', error.message);
} else if (!courses || courses.length === 0) {
  console.log('❌ No courses found in database\n');
  console.log('📝 To add courses, you need to:');
  console.log('1. Access Supabase dashboard');
  console.log('2. Go to Table Editor → courses');
  console.log('3. Insert new course records');
} else {
  console.log(`✅ Found ${courses.length} courses:\n`);
  courses.forEach((course, i) => {
    console.log(`${i + 1}. ${course.title}`);
    console.log(`   Status: ${course.status}`);
    console.log(`   Level: ${course.level || 'N/A'}`);
    console.log(`   Duration: ${course.duration_hours || 'N/A'} hours`);
    console.log(`   Created: ${new Date(course.created_at).toLocaleDateString()}`);
    console.log('');
  });
}

// Check lessons
const { data: lessons } = await supabase
  .from('lessons')
  .select('id, course_id, title')
  .limit(10);

console.log(`📚 Lessons in database: ${lessons?.length || 0}`);

// Check enrollments
const { data: enrollments } = await supabase
  .from('enrollments')
  .select('id')
  .limit(10);

console.log(`👥 Enrollments: ${enrollments?.length || 0}`);
