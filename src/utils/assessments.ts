/**
 * Assessment Utilities
 * Helper functions for quiz and assignment management
 *
 * Copyright (c) 2025 Elevate for Humanity
 */

export interface Question {
  id: string;
  question: string;
  type: 'multiple_choice' | 'true_false' | 'short_answer' | 'essay';
  options?: string[];
  correctAnswer?: string | number;
  points: number;
  rubric?: string;
  explanation?: string;
}

export interface Answer {
  questionId: string;
  answer: string | number;
}

export interface Assessment {
  id: string;
  title: string;
  type: 'quiz' | 'assignment' | 'exam' | 'survey';
  questions: Question[];
  passingScore: number;
  timeLimit?: number;
}

export interface Submission {
  id: string;
  assessmentId: string;
  userId: string;
  answers: Answer[];
  score?: number;
  graded: boolean;
  submittedAt: string;
}

export interface GradingResult {
  questionId: string;
  score: number;
  maxScore: number;
  feedback: string;
  isCorrect: boolean;
}

/**
 * Grade objective questions (multiple choice, true/false)
 */
export function gradeObjectiveQuestion(
  question: Question,
  answer: string | number
): GradingResult {
  const isCorrect = answer === question.correctAnswer;

  return {
    questionId: question.id,
    score: isCorrect ? question.points : 0,
    maxScore: question.points,
    feedback: isCorrect
      ? question.explanation || 'Correct!'
      : `Incorrect. ${question.explanation || ''}`,
    isCorrect,
  };
}

/**
 * Calculate total score from grading results
 */
export function calculateTotalScore(results: GradingResult[]): {
  totalScore: number;
  maxScore: number;
  percentage: number;
} {
  const totalScore = results.reduce((sum, r) => sum + r.score, 0);
  const maxScore = results.reduce((sum, r) => sum + r.maxScore, 0);
  const percentage =
    maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0;

  return { totalScore, maxScore, percentage };
}

/**
 * Check if submission passes the assessment
 */
export function isPassingScore(score: number, passingScore: number): boolean {
  return score >= passingScore;
}

/**
 * Validate assessment structure
 */
export function validateAssessment(assessment: Assessment): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!assessment.title || assessment.title.trim().length === 0) {
    errors.push('Assessment title is required');
  }

  if (!assessment.questions || assessment.questions.length === 0) {
    errors.push('Assessment must have at least one question');
  }

  if (assessment.passingScore < 0 || assessment.passingScore > 100) {
    errors.push('Passing score must be between 0 and 100');
  }

  if (assessment.timeLimit && assessment.timeLimit < 1) {
    errors.push('Time limit must be at least 1 minute');
  }

  // Validate each question
  assessment.questions.forEach((question, index) => {
    if (!question.question || question.question.trim().length === 0) {
      errors.push(`Question ${index + 1}: Question text is required`);
    }

    if (question.points <= 0) {
      errors.push(`Question ${index + 1}: Points must be greater than 0`);
    }

    if (question.type === 'multiple_choice') {
      if (!question.options || question.options.length < 2) {
        errors.push(
          `Question ${index + 1}: Multiple choice must have at least 2 options`
        );
      }
      if (question.correctAnswer === undefined) {
        errors.push(`Question ${index + 1}: Correct answer is required`);
      }
    }

    if (question.type === 'true_false') {
      if (question.correctAnswer === undefined) {
        errors.push(`Question ${index + 1}: Correct answer is required`);
      }
    }
  });

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Validate submission answers
 */
export function validateSubmission(
  assessment: Assessment,
  answers: Answer[]
): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  // Check if all questions are answered
  const answeredQuestionIds = new Set(answers.map((a) => a.questionId));
  const missingAnswers = assessment.questions.filter(
    (q) => !answeredQuestionIds.has(q.id)
  );

  if (missingAnswers.length > 0) {
    errors.push(`Missing answers for ${missingAnswers.length} question(s)`);
  }

  // Validate answer types
  answers.forEach((answer) => {
    const question = assessment.questions.find(
      (q) => q.id === answer.questionId
    );
    if (!question) {
      errors.push(`Invalid question ID: ${answer.questionId}`);
      return;
    }

    if (question.type === 'multiple_choice' || question.type === 'true_false') {
      if (
        typeof answer.answer !== 'number' &&
        typeof answer.answer !== 'string'
      ) {
        errors.push(`Question ${question.id}: Invalid answer type`);
      }
    }

    if (question.type === 'short_answer' || question.type === 'essay') {
      if (typeof answer.answer !== 'string') {
        errors.push(`Question ${question.id}: Answer must be a string`);
      }
      if (answer.answer.trim().length === 0) {
        errors.push(`Question ${question.id}: Answer cannot be empty`);
      }
    }
  });

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Calculate time remaining for timed assessment
 */
export function calculateTimeRemaining(
  startTime: Date,
  timeLimit: number
): number {
  const now = new Date();
  const elapsed = Math.floor((now.getTime() - startTime.getTime()) / 1000 / 60);
  const remaining = timeLimit - elapsed;
  return Math.max(0, remaining);
}

/**
 * Check if assessment time has expired
 */
export function isTimeExpired(startTime: Date, timeLimit: number): boolean {
  return calculateTimeRemaining(startTime, timeLimit) === 0;
}

/**
 * Format time for display (e.g., "1h 30m" or "45m")
 */
export function formatTime(minutes: number): string {
  if (minutes < 60) {
    return `${minutes}m`;
  }
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
}

/**
 * Shuffle array (for randomizing question/option order)
 */
export function shuffle<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Generate assessment statistics
 */
export function generateAssessmentStats(submissions: Submission[]): {
  totalSubmissions: number;
  averageScore: number;
  highestScore: number;
  lowestScore: number;
  passRate: number;
  completionRate: number;
} {
  const gradedSubmissions = submissions.filter(
    (s) => s.graded && s.score !== undefined
  );

  if (gradedSubmissions.length === 0) {
    return {
      totalSubmissions: submissions.length,
      averageScore: 0,
      highestScore: 0,
      lowestScore: 0,
      passRate: 0,
      completionRate: 0,
    };
  }

  const scores = gradedSubmissions.map((s) => s.score!);
  const averageScore = Math.round(
    scores.reduce((sum, score) => sum + score, 0) / scores.length
  );
  const highestScore = Math.max(...scores);
  const lowestScore = Math.min(...scores);
  const passRate = Math.round(
    (gradedSubmissions.filter((s) => s.score! >= 70).length /
      gradedSubmissions.length) *
      100
  );
  const completionRate = Math.round(
    (gradedSubmissions.length / submissions.length) * 100
  );

  return {
    totalSubmissions: submissions.length,
    averageScore,
    highestScore,
    lowestScore,
    passRate,
    completionRate,
  };
}

/**
 * Export assessment to JSON
 */
export function exportAssessment(assessment: Assessment): string {
  return JSON.stringify(assessment, null, 2);
}

/**
 * Import assessment from JSON
 */
export function importAssessment(json: string): Assessment {
  try {
    const assessment = JSON.parse(json);
    const validation = validateAssessment(assessment);

    if (!validation.valid) {
      throw new Error(`Invalid assessment: ${validation.errors.join(', ')}`);
    }

    return assessment;
  } catch (error: any) {
    throw new Error(`Failed to import assessment: ${error.message}`);
  }
}

/**
 * Generate a unique question ID
 */
export function generateQuestionId(): string {
  return `q_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Create a blank question template
 */
export function createBlankQuestion(type: Question['type']): Question {
  const baseQuestion: Question = {
    id: generateQuestionId(),
    question: '',
    type,
    points: 1,
  };

  if (type === 'multiple_choice') {
    return {
      ...baseQuestion,
      options: ['', '', '', ''],
      correctAnswer: 0,
    };
  }

  if (type === 'true_false') {
    return {
      ...baseQuestion,
      options: ['True', 'False'],
      correctAnswer: 0,
    };
  }

  return baseQuestion;
}

/**
 * Calculate question difficulty based on submission data
 */
export function calculateQuestionDifficulty(
  questionId: string,
  submissions: Submission[],
  results: GradingResult[][]
): 'easy' | 'medium' | 'hard' {
  const questionResults = results
    .flat()
    .filter((r) => r.questionId === questionId);

  if (questionResults.length === 0) {
    return 'medium';
  }

  const correctCount = questionResults.filter((r) => r.isCorrect).length;
  const correctRate = correctCount / questionResults.length;

  if (correctRate >= 0.8) return 'easy';
  if (correctRate >= 0.5) return 'medium';
  return 'hard';
}
