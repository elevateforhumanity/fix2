import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

console.log('📖 Course Details:\n');

const { data: course } = await supabase
  .from('courses')
  .select('*')
  .eq('title', 'Introduction to Medical Assisting')
  .single();

if (course) {
  console.log('Title:', course.title);
  console.log('Slug:', course.slug);
  console.log('Description:', course.description || 'No description');
  console.log('Subtitle:', course.subtitle || 'No subtitle');
  console.log('Level:', course.level);
  console.log('Status:', course.status);
  console.log('Duration:', course.duration_hours || 'Not set');
  console.log('Thumbnail:', course.thumbnail_url || 'No thumbnail');
  console.log('Is Free:', course.is_free);
  console.log('\n');

  // Check for lessons
  const { data: lessons } = await supabase
    .from('lessons')
    .select('*')
    .eq('course_id', course.id)
    .order('order_index');

  console.log(`📚 Lessons (${lessons?.length || 0}):`);
  if (lessons && lessons.length > 0) {
    lessons.forEach((lesson, i) => {
      console.log(`  ${i + 1}. ${lesson.title} (${lesson.duration_minutes || 0} min)`);
    });
  } else {
    console.log('  ❌ No lessons found for this course');
  }

  // Check modules
  const { data: modules } = await supabase
    .from('modules')
    .select('*')
    .eq('course_id', course.id)
    .order('order_index');

  console.log(`\n📦 Modules (${modules?.length || 0}):`);
  if (modules && modules.length > 0) {
    modules.forEach((module, i) => {
      console.log(`  ${i + 1}. ${module.title}`);
    });
  } else {
    console.log('  ❌ No modules found for this course');
  }
}
