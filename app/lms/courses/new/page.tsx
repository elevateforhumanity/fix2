import { redirect } from 'next/navigation';

export default function LMSCoursesNewRedirect() {
  redirect('/admin/courses/create');
}
