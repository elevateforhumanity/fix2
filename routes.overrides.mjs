// routes.overrides.mjs
/** @type {Array<{ file: string; path: string }>} */
export default [
  // Home
  { file: 'EFHLanding.tsx', path: '/' },

  // Dynamic/program routes
  { file: 'ProgramDetail.tsx', path: '/programs/:slug' },

  // Auth
  { file: 'auth/Login.tsx', path: '/auth/login' },
  { file: 'auth/Signup.tsx', path: '/auth/signup' },

  // LMS
  { file: 'LMS.tsx', path: '/lms' },
  { file: 'LMSCourses.tsx', path: '/lms/courses' },
  { file: 'lms/CoursePage.tsx', path: '/lms/course/:courseId' },
  { file: 'lms/LessonPage.tsx', path: '/lms/lesson/:lessonId' },

  // Payments / Verify
  { file: 'Pay.tsx', path: '/pay' },
  { file: 'VerifyCertificate.tsx', path: '/verify' },

  // Scholarships
  { file: 'ApplyScholarship.tsx', path: '/apply-scholarship' },

  // 404 – the generator will put this last
  { file: 'NotFound.tsx', path: '*' },
];
