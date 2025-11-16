// content/courses/catalog.ts
import ecdCoursesData from './ecd-courses.json';

export type CourseSlug = string;

export type Course = {
  slug: CourseSlug;
  title: string;
  shortDescription: string;
  category?: string;
  path: string; // route path for this course
  coverImageKey: string; // key in generated-images/manifest.json
  videoScriptFile: string; // path to the .md AI script in repo
  aiVideoUrl?: string; // optional: URL to generated video (YouTube, mp4, etc.)
};

// Map ECD courses JSON to Course type
export const courses: Course[] = ecdCoursesData.map((ecdCourse) => ({
  slug: ecdCourse.slug,
  title: ecdCourse.title,
  shortDescription: ecdCourse.shortDescription,
  category: ecdCourse.category,
  path: `/programs/${ecdCourse.slug}`,
  coverImageKey: `${ecdCourse.slug}-cover`,
  videoScriptFile: `content/video-scripts/ecd-courses/${ecdCourse.slug}-video.md`,
  aiVideoUrl: "", // add URL once video is generated
}));

export function getCourseBySlug(slug: string): Course | undefined {
  return courses.find((c) => c.slug === slug);
}

export function getCoursesByCategory(category: string): Course[] {
  return courses.filter((c) => c.category === category);
}

export function getAllCategories(): string[] {
  const categories = new Set(courses.map((c) => c.category).filter(Boolean));
  return Array.from(categories) as string[];
}
