import AdvancedQuizBuilder from '@/components/lms/AdvancedQuizBuilder';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Quiz Builder | Admin',
  robots: {
    index: false,
    follow: false,
  },
};

export default function QuizBuilderPage() {
  return <AdvancedQuizBuilder />;
}
