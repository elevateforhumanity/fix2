// lms-data/courses/index.ts

import type { Course } from "@/types/course";
import { cnaCourse } from "./program-cna";
import { barberApprenticeshipCourse } from "./program-barber-apprenticeship";
import { hvacCourse } from "./program-hvac";
import { buildingTechCourse } from "./program-building-tech";
import { cdlCourse } from "./program-cdl";
import { customerServiceCourse } from "./program-customer-service";
import { itSupportCourse } from "./program-it-support";
import { entrepreneurshipCourse } from "./program-entrepreneurship";

export const allCourses: Course[] = [
  cnaCourse,
  barberApprenticeshipCourse,
  hvacCourse,
  buildingTechCourse,
  cdlCourse,
  customerServiceCourse,
  itSupportCourse,
  entrepreneurshipCourse,
  // later: add more here
];

export function getCourseBySlug(slug: string): Course | undefined {
  return allCourses.find((course) => course.slug === slug && course.isPublished);
}
