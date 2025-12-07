export interface CourseFile {
  path: string;
  content: string;
  sha: string;
}

export interface CourseMeta {
  title: string;
  summary: string;
  description: string;
  objectives: string[];
  lessons: string[];
}
