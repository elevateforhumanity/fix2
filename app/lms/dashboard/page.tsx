import Link from 'next/link';

type CourseStatus = 'in-progress' | 'completed' | 'not-started';

interface Course {
  id: string;
  title: string;
  category: string;
  progress: number; // 0–100
  status: CourseStatus;
  nextDue?: string;
  nextTask?: string;
}

interface ActivityItem {
  id: string;
  type: 'quiz' | 'lesson' | 'certificate' | 'discussion';
  title: string;
  course: string;
  timestamp: string;
  status: 'completed' | 'in-progress';
}

interface DeadlineItem {
  id: string;
  title: string;
  course: string;
  dueDate: string;
  type: 'quiz' | 'assignment' | 'live-session';
}

const sampleCourses: Course[] = [
  {
    id: 'barber-101',
    title: 'Barber Apprenticeship – Phase 1',
    category: 'Trades & Licensing',
    progress: 42,
    status: 'in-progress',
    nextDue: 'Live demo on taper fades – Nov 22',
    nextTask: 'Watch Module 3 video & complete quiz',
  },
  {
    id: 'hvac-101',
    title: 'HVAC Technician – Core Foundations',
    category: 'Skilled Trades',
    progress: 68,
    status: 'in-progress',
    nextDue: 'Safety checklist submission – Nov 23',
    nextTask: 'Submit safety worksheet',
  },
  {
    id: 'med-assistant-101',
    title: 'Medical Assistant – Clinical Skills',
    category: 'Healthcare',
    progress: 0,
    status: 'not-started',
    nextTask: 'Start Lesson 1: Intro to Clinical Procedures',
  },
  {
    id: 'cdl-101',
    title: 'CDL – Commercial Driving Basics',
    category: 'Transportation',
    progress: 100,
    status: 'completed',
    nextDue: 'Certificate ready to download',
    nextTask: 'Download your certificate',
  },
];

const sampleDeadlines: DeadlineItem[] = [
  {
    id: 'dl-1',
    title: 'Module 3 Safety Quiz',
    course: 'HVAC Technician – Core Foundations',
    dueDate: 'Due Nov 23, 11:59 PM',
    type: 'quiz',
  },
  {
    id: 'dl-2',
    title: 'Live Barber Demo – Taper Fades',
    course: 'Barber Apprenticeship – Phase 1',
    dueDate: 'Nov 22, 6:00 PM (in-person/virtual)',
    type: 'live-session',
  },
  {
    id: 'dl-3',
    title: 'Work-Based Learning Hours Log',
    course: 'CDL – Commercial Driving Basics',
    dueDate: 'Due Nov 25, 5:00 PM',
    type: 'assignment',
  },
];

const sampleActivity: ActivityItem[] = [
  {
    id: 'act-1',
    type: 'quiz',
    title: 'Safety Basics Quiz – Score: 92%',
    course: 'HVAC Technician – Core Foundations',
    timestamp: 'Completed 2 hours ago',
    status: 'completed',
  },
  {
    id: 'act-2',
    type: 'lesson',
    title: 'Watched Module 2: Client Consultation',
    course: 'Barber Apprenticeship – Phase 1',
    timestamp: 'Completed yesterday',
    status: 'completed',
  },
  {
    id: 'act-3',
    type: 'certificate',
    title: 'Certificate issued: CDL – Commercial Driving Basics',
    course: 'CDL – Commercial Driving Basics',
    timestamp: 'Completed 3 days ago',
    status: 'completed',
  },
  {
    id: 'act-4',
    type: 'discussion',
    title: 'Replied to: "Balancing work, family & training"',
    course: 'Student Success & Soft Skills',
    timestamp: 'Completed 5 days ago',
    status: 'completed',
  },
];

function getEmojiForDeadline(type: DeadlineItem['type']) {
  switch (type) {
    case 'quiz':
      return '📝';
    case 'assignment':
      return '📂';
    case 'live-session':
      return '📺';
    default:
      return '📌';
  }
}

function getEmojiForActivity(type: ActivityItem['type']) {
  switch (type) {
    case 'quiz':
      return '🧪';
    case 'lesson':
      return '🎥';
    case 'certificate':
      return '🎓';
    case 'discussion':
      return '💬';
    default:
      return '⭐';
  }
}

export default function LmsDashboardPage() {
  const activeCourses = sampleCourses.filter((c) => c.status === 'in-progress');
  const completedCourses = sampleCourses.filter(
    (c) => c.status === 'completed'
  );
  const notStartedCourses = sampleCourses.filter(
    (c) => c.status === 'not-started'
  );

  const totalCourses = sampleCourses.length;
  const totalCompleted = completedCourses.length;
  const totalInProgress = activeCourses.length;

  const overallProgress =
    totalCourses === 0
      ? 0
      : Math.round(
          sampleCourses.reduce((sum, c) => sum + c.progress, 0) / totalCourses
        );

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-6xl mx-auto px-4 py-10 lg:py-12">
        {/* Header */}
        <header className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-700">
              My Learning
            </p>
            <h1 className="mt-3 text-3xl md:text-4xl font-bold text-slate-900">
              Learning Dashboard
            </h1>
            <p className="mt-2 text-sm md:text-base text-slate-600 max-w-xl">
              Track your progress, stay on top of deadlines, and see what's next
              in your Elevate for Humanity training journey.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/courses"
              className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2.5 text-xs md:text-sm font-semibold text-white shadow-sm hover:bg-blue-700 transition"
            >
              Browse All Courses
            </Link>
            <Link
              href="/lms/achievements"
              className="inline-flex items-center justify-center rounded-lg bg-white px-4 py-2.5 text-xs md:text-sm font-semibold text-slate-900 border border-slate-200 hover:bg-slate-50 transition"
            >
              View Achievements
            </Link>
          </div>
        </header>

        {/* Summary Stats */}
        <section className="mb-8 grid gap-4 md:grid-cols-4">
          <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Overall Progress
            </p>
            <p className="mt-2 text-3xl font-bold text-slate-900">
              {overallProgress}%
            </p>
            <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-2 rounded-full bg-blue-600 transition-all"
                style={{ width: `${overallProgress}%` }}
              />
            </div>
          </div>
          <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Active Courses
            </p>
            <p className="mt-2 text-3xl font-bold text-slate-900">
              {totalInProgress}
            </p>
            <p className="mt-1 text-xs text-slate-600">
              Courses currently in progress
            </p>
          </div>
          <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Completed
            </p>
            <p className="mt-2 text-3xl font-bold text-emerald-600">
              {totalCompleted}
            </p>
            <p className="mt-1 text-xs text-slate-600">
              Certificates ready to download
            </p>
          </div>
          <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Next Action
            </p>
            <p className="mt-2 text-sm font-semibold text-slate-900">
              Resume your top in-progress course
            </p>
            {activeCourses[0] ? (
              <Link
                href={`/lms/course/${activeCourses[0].id}`}
                className="mt-3 inline-flex items-center text-xs font-semibold text-blue-700 hover:underline"
              >
                Continue: {activeCourses[0].title}
              </Link>
            ) : (
              <p className="mt-3 text-xs text-slate-500">
                Start a course to see your next step here.
              </p>
            )}
          </div>
        </section>

        {/* Main Grid */}
        <section className="grid gap-6 lg:grid-cols-[2fr,1.3fr]">
          {/* Left column – courses & activity */}
          <div className="space-y-6">
            {/* In Progress Courses */}
            <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between gap-2">
                <h2 className="text-lg md:text-xl font-semibold text-slate-900">
                  In Progress
                </h2>
                <Link
                  href="/courses"
                  className="text-xs font-semibold text-blue-700 hover:underline"
                >
                  View all courses
                </Link>
              </div>
              {activeCourses.length === 0 ? (
                <p className="text-sm text-slate-500">
                  You don&apos;t have any active courses yet.{' '}
                  <Link
                    href="/courses"
                    className="font-semibold text-blue-700 hover:underline"
                  >
                    Browse programs
                  </Link>{' '}
                  to get started.
                </p>
              ) : (
                <div className="space-y-4">
                  {activeCourses.map((course) => (
                    <Link
                      key={course.id}
                      href={`/lms/course/${course.id}`}
                      className="block rounded-xl border border-slate-100 bg-slate-50/60 px-4 py-3 hover:bg-slate-50 hover:border-blue-100 transition"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold text-slate-900">
                            {course.title}
                          </p>
                          <p className="mt-0.5 text-[11px] uppercase tracking-wide text-slate-500">
                            {course.category}
                          </p>
                        </div>
                        <p className="text-xs font-semibold text-slate-700">
                          {course.progress}% complete
                        </p>
                      </div>
                      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
                        <div
                          className="h-1.5 rounded-full bg-blue-600 transition-all"
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                      {course.nextTask && (
                        <p className="mt-2 text-xs text-slate-600">
                          <span className="font-semibold text-slate-900">
                            Next step:
                          </span>{' '}
                          {course.nextTask}
                        </p>
                      )}
                      {course.nextDue && (
                        <p className="mt-1 text-[11px] text-slate-500">
                          ⏰ {course.nextDue}
                        </p>
                      )}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Recent Activity */}
            <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg md:text-xl font-semibold text-slate-900">
                  Recent Activity
                </h2>
                <Link
                  href="/lms/progress"
                  className="text-xs font-semibold text-blue-700 hover:underline"
                >
                  View full history
                </Link>
              </div>
              {sampleActivity.length === 0 ? (
                <p className="text-sm text-slate-500">
                  No recent activity yet. Start a lesson, quiz, or discussion to
                  see it here.
                </p>
              ) : (
                <ul className="space-y-3">
                  {sampleActivity.map((item) => (
                    <li
                      key={item.id}
                      className="flex gap-3 rounded-xl bg-slate-50/70 px-3 py-2.5"
                    >
                      <div className="mt-0.5 text-lg">
                        {getEmojiForActivity(item.type)}
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-semibold text-slate-900">
                          {item.title}
                        </p>
                        <p className="mt-0.5 text-[11px] text-slate-500">
                          {item.course}
                        </p>
                        <p className="mt-0.5 text-[11px] text-slate-400">
                          {item.timestamp}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Right column – deadlines & recommendations */}
          <div className="space-y-6">
            {/* Upcoming Deadlines */}
            <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg md:text-xl font-semibold text-slate-900">
                  Upcoming Deadlines
                </h2>
                <Link
                  href="/lms/calendar"
                  className="text-xs font-semibold text-blue-700 hover:underline"
                >
                  Open calendar
                </Link>
              </div>
              {sampleDeadlines.length === 0 ? (
                <p className="text-sm text-slate-500">
                  You don&apos;t have any due dates yet. Once your instructors
                  add assignments or live sessions, you&apos;ll see them here.
                </p>
              ) : (
                <ul className="space-y-3">
                  {sampleDeadlines.map((deadline) => (
                    <li
                      key={deadline.id}
                      className="flex gap-3 rounded-xl bg-slate-50/70 px-3 py-2.5"
                    >
                      <div className="mt-0.5 text-lg">
                        {getEmojiForDeadline(deadline.type)}
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-semibold text-slate-900">
                          {deadline.title}
                        </p>
                        <p className="mt-0.5 text-[11px] text-slate-500">
                          {deadline.course}
                        </p>
                        <p className="mt-0.5 text-[11px] text-amber-700">
                          {deadline.dueDate}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Recommended Next Steps */}
            <div className="rounded-2xl border border-slate-100 bg-slate-900 text-slate-50 p-5 shadow-sm">
              <h2 className="text-lg md:text-xl font-semibold mb-2">
                Recommended Next Steps
              </h2>
              <p className="text-xs text-slate-200 mb-4">
                Here are a few quick actions to keep your momentum going.
              </p>
              <ul className="space-y-2 text-xs">
                <li className="flex gap-2">
                  <span className="mt-0.5 text-blue-300">•</span>
                  <span>
                    Spend 20 minutes finishing your next{' '}
                    <span className="font-semibold">in-progress lesson</span> in
                    your top course.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-0.5 text-blue-300">•</span>
                  <span>
                    Check your{' '}
                    <Link
                      href="/courses"
                      className="font-semibold underline underline-offset-2"
                    >
                      available programs
                    </Link>{' '}
                    and add one more that aligns with your long-term career
                    goals.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-0.5 text-blue-300">•</span>
                  <span>
                    Visit the{' '}
                    <Link
                      href="/courses/student-success"
                      className="font-semibold underline underline-offset-2"
                    >
                      Student Success & Soft Skills
                    </Link>{' '}
                    course to stay strong on time management and mindset.
                  </span>
                </li>
              </ul>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link
                  href={
                    activeCourses[0]
                      ? `/lms/course/${activeCourses[0].id}`
                      : '/courses'
                  }
                  className="inline-flex items-center justify-center rounded-lg bg-blue-500 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-600 transition"
                >
                  {activeCourses[0]
                    ? 'Resume Top Course'
                    : 'Start Your First Course'}
                </Link>
                <Link
                  href="/lms/achievements"
                  className="inline-flex items-center justify-center rounded-lg bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-50 hover:bg-slate-700 transition"
                >
                  View Your Achievements
                </Link>
              </div>
            </div>

            {/* Completed courses */}
            <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
              <h2 className="text-lg md:text-xl font-semibold text-slate-900 mb-3">
                Completed Courses
              </h2>
              {completedCourses.length === 0 ? (
                <p className="text-sm text-slate-500">
                  Once you complete a program, it will appear here with a link
                  to your certificate.
                </p>
              ) : (
                <ul className="space-y-2 text-xs">
                  {completedCourses.map((course) => (
                    <li
                      key={course.id}
                      className="flex items-center justify-between gap-2 rounded-xl bg-slate-50 px-3 py-2"
                    >
                      <div>
                        <p className="font-semibold text-slate-900">
                          {course.title}
                        </p>
                        <p className="text-[11px] text-slate-500">
                          100% complete – certificate available
                        </p>
                      </div>
                      <Link
                        href={`/lms/certificates?course=${course.id}`}
                        className="text-[11px] font-semibold text-blue-700 hover:underline"
                      >
                        View Certificate
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
