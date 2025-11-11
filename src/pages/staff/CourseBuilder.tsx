/**
 * Course Builder
 * Drag & drop interface for creating and managing courses
 */

import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { 
  Plus, 
  Video, 
  FileText, 
  CheckSquare, 
  Image, 
  Link2,
  Save,
  Eye,
  Settings,
  Trash2,
  GripVertical,
  Upload
} from 'lucide-react';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';

interface Lesson {
  id: string;
  type: 'video' | 'text' | 'quiz' | 'assignment' | 'resource';
  title: string;
  duration?: string;
  order: number;
}

interface Module {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
  order: number;
}

export default function CourseBuilder() {
  const [courseName, setCourseName] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [modules, setModules] = useState<Module[]>([
    {
      id: 'module-1',
      title: 'Introduction to Barbering',
      description: 'Learn the fundamentals',
      lessons: [
        { id: 'lesson-1', type: 'video', title: 'Welcome Video', duration: '5:30', order: 1 },
        { id: 'lesson-2', type: 'text', title: 'Course Overview', order: 2 },
        { id: 'lesson-3', type: 'quiz', title: 'Pre-Assessment', order: 3 }
      ],
      order: 1
    }
  ]);

  const [showAddModule, setShowAddModule] = useState(false);
  const [showAddLesson, setShowAddLesson] = useState<string | null>(null);

  const addModule = () => {
    const newModule: Module = {
      id: `module-${Date.now()}`,
      title: 'New Module',
      description: '',
      lessons: [],
      order: modules.length + 1
    };
    setModules([...modules, newModule]);
    setShowAddModule(false);
  };

  const addLesson = (moduleId: string, type: Lesson['type']) => {
    setModules(modules.map(module => {
      if (module.id === moduleId) {
        const newLesson: Lesson = {
          id: `lesson-${Date.now()}`,
          type,
          title: `New ${type.charAt(0).toUpperCase() + type.slice(1)}`,
          order: module.lessons.length + 1
        };
        return { ...module, lessons: [...module.lessons, newLesson] };
      }
      return module;
    }));
    setShowAddLesson(null);
  };

  const deleteModule = (moduleId: string) => {
    setModules(modules.filter(m => m.id !== moduleId));
  };

  const deleteLesson = (moduleId: string, lessonId: string) => {
    setModules(modules.map(module => {
      if (module.id === moduleId) {
        return { ...module, lessons: module.lessons.filter(l => l.id !== lessonId) };
      }
      return module;
    }));
  };

  const getLessonIcon = (type: Lesson['type']) => {
    switch (type) {
      case 'video': return <Video className="h-5 w-5" />;
      case 'text': return <FileText className="h-5 w-5" />;
      case 'quiz': return <CheckSquare className="h-5 w-5" />;
      case 'assignment': return <Upload className="h-5 w-5" />;
      case 'resource': return <Link2 className="h-5 w-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Course Builder | Staff Portal</title>
      </Helmet>

      <Navigation />

      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Course Builder</h1>
              <p className="text-gray-600">Create and organize your course content</p>
            </div>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition">
                <Eye className="h-5 w-5" />
                Preview
              </button>
              <button className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
                <Save className="h-5 w-5" />
                Save Course
              </button>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Course Settings Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow p-6 sticky top-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Course Settings
                </h2>

                {/* Course Name */}
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Course Name
                  </label>
                  <input
                    type="text"
                    value={courseName}
                    onChange={(e) => setCourseName(e.target.value)}
                    placeholder="e.g., Barber Apprenticeship Level 1"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Course Description */}
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={courseDescription}
                    onChange={(e) => setCourseDescription(e.target.value)}
                    placeholder="Brief description of the course..."
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Course Image */}
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Course Image
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition cursor-pointer">
                    <Image className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Click to upload image</p>
                  </div>
                </div>

                {/* Course Settings */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-gray-700">Duration</span>
                    <input
                      type="text"
                      placeholder="e.g., 12 weeks"
                      className="w-32 px-3 py-1 border border-gray-300 rounded text-sm"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-gray-700">Level</span>
                    <select className="w-32 px-3 py-1 border border-gray-300 rounded text-sm">
                      <option>Beginner</option>
                      <option>Intermediate</option>
                      <option>Advanced</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-gray-700">Category</span>
                    <select className="w-32 px-3 py-1 border border-gray-300 rounded text-sm">
                      <option>Personal Services</option>
                      <option>Healthcare</option>
                      <option>Skilled Trades</option>
                      <option>Technology</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Course Content Builder */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Course Content</h2>
                  <button
                    onClick={() => setShowAddModule(true)}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
                  >
                    <Plus className="h-5 w-5" />
                    Add Module
                  </button>
                </div>

                {/* Modules List */}
                <div className="space-y-6">
                  {modules.map((module, moduleIndex) => (
                    <div key={module.id} className="border border-gray-200 rounded-lg">
                      {/* Module Header */}
                      <div className="bg-gray-50 p-4 flex items-center gap-3">
                        <GripVertical className="h-5 w-5 text-gray-400 cursor-move" />
                        <div className="flex-1">
                          <input
                            type="text"
                            value={module.title}
                            onChange={(e) => {
                              const newModules = [...modules];
                              newModules[moduleIndex].title = e.target.value;
                              setModules(newModules);
                            }}
                            className="font-bold text-gray-900 bg-transparent border-none focus:outline-none w-full"
                          />
                          <input
                            type="text"
                            value={module.description}
                            onChange={(e) => {
                              const newModules = [...modules];
                              newModules[moduleIndex].description = e.target.value;
                              setModules(newModules);
                            }}
                            placeholder="Module description..."
                            className="text-sm text-gray-600 bg-transparent border-none focus:outline-none w-full"
                          />
                        </div>
                        <button
                          onClick={() => setShowAddLesson(module.id)}
                          className="text-blue-600 hover:text-blue-700 font-semibold text-sm"
                        >
                          + Add Lesson
                        </button>
                        <button
                          onClick={() => deleteModule(module.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>

                      {/* Lessons List */}
                      <div className="p-4 space-y-2">
                        {module.lessons.length === 0 ? (
                          <p className="text-sm text-gray-500 text-center py-4">
                            No lessons yet. Click "Add Lesson" to get started.
                          </p>
                        ) : (
                          module.lessons.map((lesson) => (
                            <div
                              key={lesson.id}
                              className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                            >
                              <GripVertical className="h-4 w-4 text-gray-400 cursor-move" />
                              <div className={`p-2 rounded ${
                                lesson.type === 'video' ? 'bg-blue-100 text-blue-600' :
                                lesson.type === 'text' ? 'bg-green-100 text-green-600' :
                                lesson.type === 'quiz' ? 'bg-purple-100 text-purple-600' :
                                lesson.type === 'assignment' ? 'bg-orange-100 text-orange-600' :
                                'bg-gray-100 text-gray-600'
                              }`}>
                                {getLessonIcon(lesson.type)}
                              </div>
                              <div className="flex-1">
                                <input
                                  type="text"
                                  value={lesson.title}
                                  className="font-semibold text-gray-900 bg-transparent border-none focus:outline-none w-full"
                                />
                                {lesson.duration && (
                                  <span className="text-sm text-gray-500">{lesson.duration}</span>
                                )}
                              </div>
                              <Link
                                to={`/staff/lesson-builder/${lesson.id}`}
                                className="text-blue-600 hover:text-blue-700 text-sm font-semibold"
                              >
                                Edit
                              </Link>
                              <button
                                onClick={() => deleteLesson(module.id, lesson.id)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          ))
                        )}

                        {/* Add Lesson Menu */}
                        {showAddLesson === module.id && (
                          <div className="border-2 border-dashed border-blue-300 rounded-lg p-4">
                            <p className="text-sm font-semibold text-gray-700 mb-3">Add Lesson Type:</p>
                            <div className="grid grid-cols-2 gap-2">
                              <button
                                onClick={() => addLesson(module.id, 'video')}
                                className="flex items-center gap-2 p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition"
                              >
                                <Video className="h-5 w-5 text-blue-600" />
                                <span className="text-sm font-semibold text-gray-900">Video</span>
                              </button>
                              <button
                                onClick={() => addLesson(module.id, 'text')}
                                className="flex items-center gap-2 p-3 bg-green-50 hover:bg-green-100 rounded-lg transition"
                              >
                                <FileText className="h-5 w-5 text-green-600" />
                                <span className="text-sm font-semibold text-gray-900">Text</span>
                              </button>
                              <button
                                onClick={() => addLesson(module.id, 'quiz')}
                                className="flex items-center gap-2 p-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition"
                              >
                                <CheckSquare className="h-5 w-5 text-purple-600" />
                                <span className="text-sm font-semibold text-gray-900">Quiz</span>
                              </button>
                              <button
                                onClick={() => addLesson(module.id, 'assignment')}
                                className="flex items-center gap-2 p-3 bg-orange-50 hover:bg-orange-100 rounded-lg transition"
                              >
                                <Upload className="h-5 w-5 text-orange-600" />
                                <span className="text-sm font-semibold text-gray-900">Assignment</span>
                              </button>
                            </div>
                            <button
                              onClick={() => setShowAddLesson(null)}
                              className="mt-3 text-sm text-gray-600 hover:text-gray-900"
                            >
                              Cancel
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Empty State */}
                {modules.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-gray-600 mb-4">No modules yet. Start building your course!</p>
                    <button
                      onClick={addModule}
                      className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                    >
                      Add First Module
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
