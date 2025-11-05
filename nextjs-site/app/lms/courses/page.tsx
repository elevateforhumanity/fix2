import Link from 'next/link';

export default function CoursesPage() {
  const courses = [
    {
      id: 1,
      title: 'Barber Fundamentals',
      program: 'Barber Apprenticeship',
      progress: 75,
      status: 'In Progress',
      lessons: 12,
      completed: 9
    },
    {
      id: 2,
      title: 'Safety & Sanitation',
      program: 'Barber Apprenticeship',
      progress: 100,
      status: 'Completed',
      lessons: 8,
      completed: 8
    },
    {
      id: 3,
      title: 'Advanced Techniques',
      program: 'Barber Apprenticeship',
      progress: 0,
      status: 'Not Started',
      lessons: 15,
      completed: 0
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-50 to-white border-b border-blue-200">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <Link href="/lms" className="text-blue-600 hover:text-blue-700 mb-4 inline-block">
            ← Back to LMS
          </Link>
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
            My Courses
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Continue your learning journey
          </p>
        </div>
      </section>

      {/* Courses List */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="space-y-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {course.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {course.program}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>📚 {course.lessons} lessons</span>
                    <span>✅ {course.completed} completed</span>
                    <span
                      className={`px-3 py-1 rounded-full ${
                        course.status === 'Completed'
                          ? 'bg-green-100 text-green-800'
                          : course.status === 'In Progress'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {course.status}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-4">
                  <div className="w-full md:w-48">
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>Progress</span>
                      <span>{course.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <Link
                    href={`/lms/courses/${course.id}`}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    {course.status === 'Not Started' ? 'Start Course' : 'Continue'}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Empty State (if no courses) */}
      {courses.length === 0 && (
        <section className="mx-auto max-w-4xl px-4 py-16 text-center">
          <div className="text-6xl mb-4">📚</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            No Courses Yet
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Enroll in a program to start learning
          </p>
          <Link
            href="/programs"
            className="inline-block bg-orange-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-orange-700 transition-colors"
          >
            Browse Programs
          </Link>
        </section>
      )}
    </div>
  );
}
