/**
 * Quiz API Functions
 * CRUD operations for quizzes and questions
 */

import { supabase } from '../supabase';

export interface Quiz {
  id: string;
  title: string;
  description?: string;
  time_limit?: number;
  passing_score: number;
  attempts_allowed?: number;
  randomize_questions: boolean;
  show_correct_answers: boolean;
  created_at: string;
}

export interface Question {
  id: string;
  quiz_id: string;
  type: 'multiple-choice' | 'true-false' | 'short-answer' | 'essay';
  question: string;
  options?: string[];
  correct_answer?: string;
  points: number;
  explanation?: string;
  order_index: number;
}

export interface QuizAttempt {
  id: string;
  student_id: string;
  quiz_id: string;
  score: number;
  total_points: number;
  percentage: number;
  answers: any;
  started_at: string;
  completed_at?: string;
  time_taken?: number;
}

// ===== QUIZZES =====

export async function createQuiz(quiz: Partial<Quiz>) {
  const { data, error } = await supabase
    .from('quizzes')
    .insert([quiz])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getQuiz(id: string) {
  const { data, error } = await supabase
    .from('quizzes')
    .select(
      `
      *,
      questions (*)
    `
    )
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
}

export async function updateQuiz(id: string, updates: Partial<Quiz>) {
  const { data, error } = await supabase
    .from('quizzes')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteQuiz(id: string) {
  const { error } = await supabase.from('quizzes').delete().eq('id', id);

  if (error) throw error;
}

// ===== QUESTIONS =====

export async function createQuestion(question: Partial<Question>) {
  const { data, error } = await supabase
    .from('questions')
    .insert([question])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateQuestion(id: string, updates: Partial<Question>) {
  const { data, error } = await supabase
    .from('questions')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteQuestion(id: string) {
  const { error } = await supabase.from('questions').delete().eq('id', id);

  if (error) throw error;
}

// ===== QUIZ ATTEMPTS =====

export async function startQuizAttempt(studentId: string, quizId: string) {
  const { data, error } = await supabase
    .from('quiz_attempts')
    .insert([
      {
        student_id: studentId,
        quiz_id: quizId,
        started_at: new Date().toISOString(),
      },
    ])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function submitQuizAttempt(
  attemptId: string,
  answers: any,
  score: number,
  totalPoints: number
) {
  const percentage = (score / totalPoints) * 100;

  const { data, error } = await supabase
    .from('quiz_attempts')
    .update({
      answers,
      score,
      total_points: totalPoints,
      percentage,
      completed_at: new Date().toISOString(),
    })
    .eq('id', attemptId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getQuizAttempts(studentId: string, quizId: string) {
  const { data, error } = await supabase
    .from('quiz_attempts')
    .select('*')
    .eq('student_id', studentId)
    .eq('quiz_id', quizId)
    .order('started_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function getQuizResults(attemptId: string) {
  const { data, error } = await supabase
    .from('quiz_attempts')
    .select(
      `
      *,
      quizzes (
        *,
        questions (*)
      )
    `
    )
    .eq('id', attemptId)
    .single();

  if (error) throw error;
  return data;
}
