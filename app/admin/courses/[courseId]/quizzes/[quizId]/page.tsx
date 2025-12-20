import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Elevate for Humanity | Workforce Training',
  description: 'Free workforce training and apprenticeships in Indianapolis. WIOA, WRG, and JRI funded programs.',
};

type Params = Promise<{ courseId: string; quizId: string }>;

export default async function QuizPage({ params }: { params: Params }) {
  const { courseId, quizId } = await params;
  
  // Redirect to questions page (default view)
  redirect(`/admin/courses/${courseId}/quizzes/${quizId}/questions`);
}
