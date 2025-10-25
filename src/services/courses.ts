import { supa } from './supa';

export type Course = {
  id: string;
  program_id: string | null;
  code: string;
  title: string;
  summary: string | null;
  cover_url: string | null;
};

export type Lesson = {
  id: string;
  course_id: string;
  idx: number;
  title: string;
  video_url: string | null;
  html: string | null;
};

export async function listCourses() {
  try {
    const { data, error } = await supa
      .from('courses')
      .select('id, program_id, code, title, summary, cover_url')
      .order('title');
    if (error) throw error;
    return data as Course[];
  } catch (err) {
    console.warn('Supabase not configured, returning mock courses');
    return getMockCourses();
  }
}

function getMockCourses(): Course[] {
  return [
    {
      id: '1',
      program_id: '1',
      code: 'CNA-101',
      title: 'Introduction to CNA',
      summary: 'Learn the fundamentals of becoming a Certified Nursing Assistant',
      cover_url: '/courses/cna-intro.jpg'
    },
    {
      id: '2',
      program_id: '2',
      code: 'WLD-101',
      title: 'Welding Fundamentals',
      summary: 'Master basic welding techniques and safety procedures',
      cover_url: '/courses/welding-intro.jpg'
    },
    {
      id: '3',
      program_id: '5',
      code: 'OFC-101',
      title: 'Microsoft Office Essentials',
      summary: 'Learn Word, Excel, PowerPoint, and modern office tools',
      cover_url: '/courses/office-intro.jpg'
    }
  ];
}

export async function listCoursesByProgram(programId: string) {
  try {
    const { data, error } = await supa
      .from('courses')
      .select('id, program_id, code, title, summary, cover_url')
      .eq('program_id', programId)
      .order('title');
    if (error) throw error;
    return data as Course[];
  } catch (err) {
    console.warn('Supabase not configured, returning mock courses for program:', programId);
    const courses = getMockCourses();
    return courses.filter(c => c.program_id === programId);
  }
}

export async function getCourse(courseId: string) {
  try {
    const { data, error } = await supa
      .from('courses')
      .select('id, program_id, code, title, summary, cover_url')
      .eq('id', courseId)
      .single();
    if (error) throw error;
    return data as Course;
  } catch (err) {
    console.warn('Supabase not configured, returning mock course for id:', courseId);
    const courses = getMockCourses();
    const course = courses.find(c => c.id === courseId);
    if (!course) throw new Error('Course not found');
    return course;
  }
}

export async function listLessons(courseId: string) {
  const { data, error } = await supa
    .from('lessons')
    .select('id, course_id, idx, title, video_url, html')
    .eq('course_id', courseId)
    .order('idx', { ascending: true });
  if (error) throw error;
  return data as Lesson[];
}

export async function getLesson(lessonId: string) {
  const { data, error } = await supa
    .from('lessons')
    .select('id, course_id, idx, title, video_url, html')
    .eq('id', lessonId)
    .single();
  if (error) throw error;
  return data as Lesson;
}

export async function upsertProgress(lessonId: string, pct: number) {
  const user = (await supa.auth.getUser()).data.user;
  if (!user) throw new Error('Not signed in');
  const { error } = await supa.from('lesson_progress').upsert({
    user_id: user.id,
    lesson_id: lessonId,
    percent: Math.min(100, Math.max(0, pct)),
  });
  if (error) throw error;
}
