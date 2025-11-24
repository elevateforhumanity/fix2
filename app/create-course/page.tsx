'use client';

import { useState } from 'react';
import { BookOpen, Plus, Trash2, Video, FileText, CheckSquare, Upload, Save } from 'lucide-react';

type LessonType = 'video' | 'reading' | 'quiz' | 'assignment';

type Lesson = {
  id: string;
  title: string;
  type: LessonType;
  content: string;
  duration: number;
};

type Module = {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
};

type Course = {
  title: string;
  description: string;
  category: string;
  level: string;
  duration: string;
  fundingPrograms: string[];
  modules: Module[];
};

export default function CreateCoursePage() {
  const [course, setCourse] = useState<Course>({
    title: '',
    description: '',
    category: 'healthcare',
    level: 'beginner',
    duration: '',
    fundingPrograms: ['WIOA'],
    modules: [],
  });

  const [activeModule, setActiveModule] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const addModule = () => {
    const newModule: Module = {
      id: `module-${Date.now()}`,
      title: `Module ${course.modules.length + 1}`,
      description: '',
      lessons: [],
    };
    setCourse({ ...course, modules: [...course.modules, newModule] });
    setActiveModule(newModule.id);
  };

  const updateModule = (moduleId: string, field: keyof Module, value: any) => {
    setCourse({
      ...course,
      modules: course.modules.map((m) =>
        m.id === moduleId ? { ...m, [field]: value } : m
      ),
    });
  };

  const deleteModule = (moduleId: string) => {
    setCourse({
      ...course,
      modules: course.modules.filter((m) => m.id !== moduleId),
    });
    if (activeModule === moduleId) {
      setActiveModule(null);
    }
  };

  const addLesson = (moduleId: string) => {
    const newLesson: Lesson = {
      id: `lesson-${Date.now()}`,
      title: 'New Lesson',
      type: 'video',
      content: '',
      duration: 0,
    };

    setCourse({
      ...course,
      modules: course.modules.map((m) =>
        m.id === moduleId
          ? { ...m, lessons: [...m.lessons, newLesson] }
          : m
      ),
    });
  };

  const updateLesson = (
    moduleId: string,
    lessonId: string,
    field: keyof Lesson,
    value: any
  ) => {
    setCourse({
      ...course,
      modules: course.modules.map((m) =>
        m.id === moduleId
          ? {
              ...m,
              lessons: m.lessons.map((l) =>
                l.id === lessonId ? { ...l, [field]: value } : l
              ),
            }
          : m
      ),
    });
  };

  const deleteLesson = (moduleId: string, lessonId: string) => {
    setCourse({
      ...course,
      modules: course.modules.map((m) =>
        m.id === moduleId
          ? { ...m, lessons: m.lessons.filter((l) => l.id !== lessonId) }
          : m
      ),
    });
  };

  const saveCourse = async () => {
    setSaving(true);
    setMessage('');

    try {
      const response = await fetch('/api/courses/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(course),
      });

      if (response.ok) {
        setMessage('✅ Course saved successfully!');
      } else {
        setMessage('❌ Error saving course. Please try again.');
      }
    } catch (error) {
      setMessage('❌ Error saving course. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const getLessonIcon = (type: LessonType) => {
    switch (type) {
      case 'video':
        return <Video size={16} />;
      case 'reading':
        return <FileText size={16} />;
      case 'quiz':
        return <CheckSquare size={16} />;
      case 'assignment':
        return <Upload size={16} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
                <BookOpen className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Course Creator</h1>
                <p className="text-sm text-slate-600">Build your training program</p>
              </div>
            </div>
            <button
              onClick={saveCourse}
              disabled={saving || !course.title}
              className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition"
            >
              <Save size={20} />
              {saving ? 'Saving...' : 'Save Course'}
            </button>
          </div>
          {message && (
            <div className="mt-4 p-3 bg-slate-100 rounded-lg text-sm">
              {message}
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Sidebar - Course Info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sticky top-24">
              <h2 className="text-lg font-bold text-slate-900 mb-4">Course Details</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Course Title *
                  </label>
                  <input
                    type="text"
                    value={course.title}
                    onChange={(e) => setCourse({ ...course, title: e.target.value })}
                    placeholder="e.g., Medical Assistant Training"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={course.description}
                    onChange={(e) =>
                      setCourse({ ...course, description: e.target.value })
                    }
                    placeholder="Brief description of the course"
                    rows={4}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Category
                  </label>
                  <select
                    value={course.category}
                    onChange={(e) => setCourse({ ...course, category: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  >
                    <option value="healthcare">Healthcare</option>
                    <option value="trades">Trades</option>
                    <option value="business">Business</option>
                    <option value="technology">Technology</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Level
                  </label>
                  <select
                    value={course.level}
                    onChange={(e) => setCourse({ ...course, level: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Duration
                  </label>
                  <input
                    type="text"
                    value={course.duration}
                    onChange={(e) => setCourse({ ...course, duration: e.target.value })}
                    placeholder="e.g., 12 weeks"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Funding Programs
                  </label>
                  <div className="space-y-2">
                    {['WIOA', 'WRG', 'JRI', 'Apprenticeship'].map((program) => (
                      <label key={program} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={course.fundingPrograms.includes(program)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setCourse({
                                ...course,
                                fundingPrograms: [...course.fundingPrograms, program],
                              });
                            } else {
                              setCourse({
                                ...course,
                                fundingPrograms: course.fundingPrograms.filter(
                                  (p) => p !== program
                                ),
                              });
                            }
                          }}
                          className="rounded border-slate-300"
                        />
                        <span className="text-sm text-slate-700">{program}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Modules & Lessons */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-slate-900">
                  Course Modules ({course.modules.length})
                </h2>
                <button
                  onClick={addModule}
                  className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition"
                >
                  <Plus size={20} />
                  Add Module
                </button>
              </div>

              {course.modules.length === 0 ? (
                <div className="text-center py-12">
                  <BookOpen size={48} className="mx-auto text-slate-300 mb-4" />
                  <p className="text-slate-600 mb-4">No modules yet</p>
                  <button
                    onClick={addModule}
                    className="text-red-600 font-semibold hover:text-red-700"
                  >
                    Create your first module
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {course.modules.map((module, index) => (
                    <div
                      key={module.id}
                      className="border border-slate-200 rounded-lg overflow-hidden"
                    >
                      {/* Module Header */}
                      <div
                        className={`p-4 cursor-pointer transition ${
                          activeModule === module.id
                            ? 'bg-red-50 border-b border-slate-200'
                            : 'bg-slate-50 hover:bg-slate-100'
                        }`}
                        onClick={() =>
                          setActiveModule(
                            activeModule === module.id ? null : module.id
                          )
                        }
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <input
                              type="text"
                              value={module.title}
                              onChange={(e) => {
                                e.stopPropagation();
                                updateModule(module.id, 'title', e.target.value);
                              }}
                              onClick={(e) => e.stopPropagation()}
                              className="text-lg font-bold text-slate-900 bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-red-500 rounded px-2 -ml-2"
                            />
                            <p className="text-sm text-slate-600 mt-1">
                              {module.lessons.length} lessons
                            </p>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteModule(module.id);
                            }}
                            className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>

                      {/* Module Content */}
                      {activeModule === module.id && (
                        <div className="p-4 bg-white">
                          <div className="mb-4">
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                              Module Description
                            </label>
                            <textarea
                              value={module.description}
                              onChange={(e) =>
                                updateModule(module.id, 'description', e.target.value)
                              }
                              placeholder="What will students learn in this module?"
                              rows={2}
                              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                            />
                          </div>

                          {/* Lessons */}
                          <div className="space-y-2 mb-4">
                            {module.lessons.map((lesson, lessonIndex) => (
                              <div
                                key={lesson.id}
                                className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg"
                              >
                                <div className="text-slate-400">
                                  {getLessonIcon(lesson.type)}
                                </div>
                                <input
                                  type="text"
                                  value={lesson.title}
                                  onChange={(e) =>
                                    updateLesson(
                                      module.id,
                                      lesson.id,
                                      'title',
                                      e.target.value
                                    )
                                  }
                                  className="flex-1 bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-red-500 rounded px-2 text-sm"
                                />
                                <select
                                  value={lesson.type}
                                  onChange={(e) =>
                                    updateLesson(
                                      module.id,
                                      lesson.id,
                                      'type',
                                      e.target.value
                                    )
                                  }
                                  className="px-3 py-1 border border-slate-300 rounded text-sm"
                                >
                                  <option value="video">Video</option>
                                  <option value="reading">Reading</option>
                                  <option value="quiz">Quiz</option>
                                  <option value="assignment">Assignment</option>
                                </select>
                                <button
                                  onClick={() => deleteLesson(module.id, lesson.id)}
                                  className="p-1 text-red-600 hover:bg-red-100 rounded transition"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            ))}
                          </div>

                          <button
                            onClick={() => addLesson(module.id)}
                            className="w-full py-2 border-2 border-dashed border-slate-300 rounded-lg text-slate-600 hover:border-red-500 hover:text-red-600 transition font-semibold text-sm"
                          >
                            + Add Lesson
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
