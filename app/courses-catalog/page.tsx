import { programSeeds } from "@/lms-data/courseSeed";
import Link from "next/link";
import { BookOpen, Clock, Award, ChevronRight, PlayCircle, FileText, CheckCircle } from "lucide-react";

export const metadata = {
  title: "Course Catalog | Elevate For Humanity LMS",
  description: "Browse all available courses with detailed modules and lessons",
};

export default function CoursesCatalogPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-700 text-white py-16">
        <div className="mx-auto max-w-7xl px-6">
          <h1 className="text-5xl font-bold mb-4">Course Catalog</h1>
          <p className="text-2xl text-blue-100 mb-6">
            Explore all {programSeeds.length} available training programs with detailed curriculum
          </p>
          <Link
            href="/apply"
            className="inline-flex items-center gap-2 px-8 py-4 bg-orange-500 text-white rounded-lg font-bold hover:bg-orange-600 transition"
          >
            Enroll Now
            <ChevronRight size={20} />
          </Link>
        </div>
      </section>

      {/* Course List */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="space-y-12">
            {programSeeds.map((course, courseIndex) => (
              <div
                key={courseIndex}
                className="bg-white rounded-2xl border-2 border-slate-200 overflow-hidden hover:border-orange-500 transition-all shadow-lg"
              >
                {/* Course Header */}
                <div className="bg-gradient-to-r from-slate-50 to-white p-8 border-b border-slate-200">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-bold mb-4">
                        <Award size={16} />
                        {course.category.toUpperCase()}
                      </div>
                      <h2 className="text-3xl font-bold text-slate-900 mb-3">
                        {course.name}
                      </h2>
                      <p className="text-lg text-slate-600 mb-4">
                        {course.description}
                      </p>
                      <div className="flex items-center gap-6 text-sm">
                        <div className="flex items-center gap-2 text-slate-700">
                          <BookOpen size={18} className="text-blue-600" />
                          <span className="font-semibold">{course.modules.length} Modules</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-700">
                          <PlayCircle size={18} className="text-green-600" />
                          <span className="font-semibold">
                            {course.modules.reduce((total, mod) => total + (mod.lessons?.length || 0), 0)} Lessons
                          </span>
                        </div>
                        <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">
                          <CheckCircle size={14} />
                          100% FREE
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Modules */}
                <div className="p-8">
                  <h3 className="text-xl font-bold text-slate-900 mb-6">Course Curriculum</h3>
                  <div className="space-y-6">
                    {course.modules.map((module, moduleIndex) => (
                      <div
                        key={moduleIndex}
                        className="bg-slate-50 rounded-xl p-6 border border-slate-200"
                      >
                        <div className="flex items-start gap-4 mb-4">
                          <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold flex-shrink-0">
                            {moduleIndex + 1}
                          </div>
                          <div className="flex-1">
                            <h4 className="text-xl font-bold text-slate-900 mb-2">
                              {module.title}
                            </h4>
                            {module.description && (
                              <p className="text-slate-600 mb-4">{module.description}</p>
                            )}
                          </div>
                        </div>

                        {/* Lessons */}
                        {module.lessons && module.lessons.length > 0 && (
                          <div className="ml-14 space-y-3">
                            {module.lessons.map((lesson, lessonIndex) => (
                              <div
                                key={lessonIndex}
                                className="flex items-center gap-3 p-4 bg-white rounded-lg border border-slate-200 hover:border-blue-300 transition-colors"
                              >
                                <div className="flex-shrink-0">
                                  {lesson.contentType === "video" && (
                                    <PlayCircle size={20} className="text-blue-600" />
                                  )}
                                  {lesson.contentType === "pdf" && (
                                    <FileText size={20} className="text-red-600" />
                                  )}
                                  {lesson.contentType === "quiz" && (
                                    <CheckCircle size={20} className="text-green-600" />
                                  )}
                                  {lesson.contentType === "scorm" && (
                                    <BookOpen size={20} className="text-purple-600" />
                                  )}
                                  {lesson.contentType === "link" && (
                                    <ChevronRight size={20} className="text-orange-600" />
                                  )}
                                  {!["video", "pdf", "quiz", "scorm", "link"].includes(lesson.contentType) && (
                                    <BookOpen size={20} className="text-slate-600" />
                                  )}
                                </div>
                                <div className="flex-1">
                                  <p className="font-semibold text-slate-900">{lesson.title}</p>
                                  <div className="flex items-center gap-4 mt-1">
                                    <span className="text-xs text-slate-500 uppercase font-semibold">
                                      {lesson.contentType}
                                    </span>
                                    {lesson.durationMinutes && (
                                      <span className="flex items-center gap-1 text-xs text-slate-500">
                                        <Clock size={12} />
                                        {lesson.durationMinutes} min
                                      </span>
                                    )}
                                    {lesson.partnerTag && (
                                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded font-semibold">
                                        {lesson.partnerTag}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Course Footer */}
                <div className="bg-slate-50 p-6 border-t border-slate-200">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-slate-600">
                      Course Code: <span className="font-bold text-slate-900">{course.code}</span>
                    </p>
                    <Link
                      href="/apply"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-lg font-bold hover:bg-orange-600 transition"
                    >
                      Enroll in This Course
                      <ChevronRight size={18} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-orange-500 to-orange-600 text-white">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Learning?</h2>
          <p className="text-2xl text-orange-100 mb-8">
            All courses are 100% free through state-funded programs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/apply"
              className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-white text-orange-600 rounded-lg font-bold hover:bg-orange-50 transition text-xl"
            >
              Apply Now
            </Link>
            <Link
              href="/funding"
              className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-orange-700 text-white rounded-lg font-bold hover:bg-orange-800 transition text-xl border-2 border-white/30"
            >
              Check Funding Options
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
