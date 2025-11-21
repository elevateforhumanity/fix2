import CourseAuthoringTool from '@/components/lms/CourseAuthoringTool';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Course Authoring | Admin',
  robots: {
    index: false,
    follow: false,
  },
};

export default function CourseAuthoringPage() {
  return <CourseAuthoringTool />;
}
