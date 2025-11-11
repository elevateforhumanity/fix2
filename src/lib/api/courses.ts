/**
 * Course API Functions
 * CRUD operations for courses, modules, and lessons
 */

import { supabase } from '../supabase';

export interface Course {
  id: string;
  title: string;
  description?: string;
  image_url?: string;
  duration?: string;
  level?: 'Beginner' | 'Intermediate' | 'Advanced';
  category?: string;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export interface Module {
  id: string;
  course_id: string;
  title: string;
  description?: string;
  order_index: number;
}

export interface Lesson {
  id: string;
  module_id: string;
  type: 'video' | 'text' | 'quiz' | 'assignment' | 'resource';
  title: string;
  content?: string;
  video_id?: string;
  quiz_id?: string;
  duration?: string;
  order_index: number;
}

// ===== COURSES =====

export async function createCourse(course: Partial<Course>) {
  const { data, error } = await supabase
    .from('courses')
    .insert([course])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getCourses(published?: boolean) {
  let query = supabase.from('courses').select('*');
  
  if (published !== undefined) {
    query = query.eq('published', published);
  }

  const { data, error } = await query.order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function getCourse(id: string) {
  const { data, error } = await supabase
    .from('courses')
    .select(`
      *,
      modules (
        *,
        lessons (*)
      )
    `)
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
}

export async function updateCourse(id: string, updates: Partial<Course>) {
  const { data, error } = await supabase
    .from('courses')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteCourse(id: string) {
  const { error } = await supabase
    .from('courses')
    .delete()
    .eq('id', id);

  if (error) throw error;
}

export async function publishCourse(id: string) {
  return updateCourse(id, { published: true });
}

// ===== MODULES =====

export async function createModule(module: Partial<Module>) {
  const { data, error } = await supabase
    .from('modules')
    .insert([module])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getModules(courseId: string) {
  const { data, error } = await supabase
    .from('modules')
    .select('*, lessons (*)')
    .eq('course_id', courseId)
    .order('order_index', { ascending: true });

  if (error) throw error;
  return data;
}

export async function updateModule(id: string, updates: Partial<Module>) {
  const { data, error } = await supabase
    .from('modules')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteModule(id: string) {
  const { error } = await supabase
    .from('modules')
    .delete()
    .eq('id', id);

  if (error) throw error;
}

// ===== LESSONS =====

export async function createLesson(lesson: Partial<Lesson>) {
  const { data, error } = await supabase
    .from('lessons')
    .insert([lesson])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getLesson(id: string) {
  const { data, error } = await supabase
    .from('lessons')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
}

export async function updateLesson(id: string, updates: Partial<Lesson>) {
  const { data, error } = await supabase
    .from('lessons')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteLesson(id: string) {
  const { error } = await supabase
    .from('lessons')
    .delete()
    .eq('id', id);

  if (error) throw error;
}

// ===== ENROLLMENTS =====

export async function enrollStudent(studentId: string, courseId: string) {
  const { data, error } = await supabase
    .from('enrollments')
    .insert([{ student_id: studentId, course_id: courseId }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getStudentCourses(studentId: string) {
  const { data, error } = await supabase
    .from('enrollments')
    .select(`
      *,
      courses (*)
    `)
    .eq('student_id', studentId)
    .order('enrolled_at', { ascending: false });

  if (error) throw error;
  return data;
}

// ===== PROGRESS =====

export async function markLessonComplete(
  studentId: string,
  lessonId: string,
  courseId: string,
  score?: number
) {
  // Mark lesson as complete
  const { data, error } = await supabase
    .from('student_progress')
    .upsert({
      student_id: studentId,
      lesson_id: lessonId,
      course_id: courseId,
      completed: true,
      score,
      completed_at: new Date().toISOString()
    })
    .select()
    .single();

  if (error) throw error;

  // Calculate and update course progress
  const { data: progressData, error: progressError } = await supabase
    .rpc('calculate_course_progress', {
      p_student_id: studentId,
      p_course_id: courseId
    });

  if (progressError) console.error('Error calculating progress:', progressError);

  return data;
}

export async function getStudentProgress(studentId: string, courseId: string) {
  const { data, error } = await supabase
    .from('student_progress')
    .select('*')
    .eq('student_id', studentId)
    .eq('course_id', courseId);

  if (error) throw error;
  return data;
}
