'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Save, Play, Sparkles, Eye, Plus } from 'lucide-react';

const CodeEditor = dynamic(() => import('@/components/dev-studio/CodeEditor'), {
  ssr: false,
  loading: () => <div className="flex items-center justify-center h-full">Loading editor...</div>
});

interface Course {
  id: string;
  title: string;
  description: string;
  content: string;
}

export default function CourseStudioPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [courseContent, setCourseContent] = useState('');
  const [previewMode, setPreviewMode] = useState<'code' | 'visual'>('visual');
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      const res = await fetch('/api/courses');
      if (res.ok) {
        const data = await res.json();
        setCourses(data);
      }
    } catch (error) {
      console.error('Failed to load courses:', error);
    }
  };

  const selectCourse = (course: Course) => {
    setSelectedCourse(course);
    setCourseContent(course.content || '');
    setHasChanges(false);
  };

  const saveCourse = async () => {
    if (!selectedCourse) return;

    try {
      const res = await fetch(`/api/courses/${selectedCourse.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...selectedCourse,
          content: courseContent
        })
      });

      if (res.ok) {
        setHasChanges(false);
        alert('Course saved successfully!');
      }
    } catch (error) {
      console.error('Failed to save course:', error);
      alert('Failed to save course');
    }
  };

  const generateWithAI = async () => {
    if (!selectedCourse) return;

    try {
      const res = await fetch('/api/ai/generate-course', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          courseId: selectedCourse.id,
          title: selectedCourse.title,
          description: selectedCourse.description
        })
      });

      if (res.ok) {
        const data = await res.json();
        setCourseContent(data.content);
        setHasChanges(true);
      }
    } catch (error) {
      console.error('Failed to generate course:', error);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-white">
      {/* Header */}
      <div className="bg-white border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Course Studio</h1>
            <p className="text-sm text-gray-600">Visual course builder with AI assistance</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={generateWithAI}
              disabled={!selectedCourse}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Sparkles className="w-4 h-4" />
              Generate with AI
            </button>

            <button
              onClick={saveCourse}
              disabled={!hasChanges}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="w-4 h-4" />
              Save Course
            </button>

            <button
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Eye className="w-4 h-4" />
              Preview
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Course Selector */}
        <div className="w-64 border-r bg-gray-50 overflow-auto">
          <div className="p-4">
            <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mb-4">
              <Plus className="w-4 h-4" />
              New Course
            </button>

            <div className="space-y-2">
              {courses.map((course) => (
                <button
                  key={course.id}
                  onClick={() => selectCourse(course)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                    selectedCourse?.id === course.id
                      ? 'bg-blue-100 border-2 border-blue-500'
                      : 'bg-white border border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <div className="font-medium text-sm text-gray-900 truncate">
                    {course.title}
                  </div>
                  <div className="text-xs text-gray-500 truncate mt-1">
                    {course.description}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Editor/Preview Split */}
        <div className="flex-1 flex">
          {/* Code Editor */}
          <div className="flex-1 flex flex-col">
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 border-b">
              <button
                onClick={() => setPreviewMode('code')}
                className={`px-3 py-1 rounded ${
                  previewMode === 'code'
                    ? 'bg-white shadow'
                    : 'text-gray-600 hover:bg-gray-200'
                }`}
              >
                Code
              </button>
              <button
                onClick={() => setPreviewMode('visual')}
                className={`px-3 py-1 rounded ${
                  previewMode === 'visual'
                    ? 'bg-white shadow'
                    : 'text-gray-600 hover:bg-gray-200'
                }`}
              >
                Visual
              </button>
            </div>

            <div className="flex-1">
              {selectedCourse ? (
                previewMode === 'code' ? (
                  <CodeEditor
                    value={courseContent}
                    onChange={(val) => {
                      setCourseContent(val);
                      setHasChanges(true);
                    }}
                    filePath="course.mdx"
                  />
                ) : (
                  <div className="h-full p-6 overflow-auto">
                    <div className="max-w-4xl mx-auto">
                      <h2 className="text-3xl font-bold mb-4">{selectedCourse.title}</h2>
                      <p className="text-gray-600 mb-6">{selectedCourse.description}</p>
                      <div className="prose max-w-none">
                        {/* Render markdown/MDX here */}
                        <div dangerouslySetInnerHTML={{ __html: courseContent }} />
                      </div>
                    </div>
                  </div>
                )
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  <div className="text-center">
                    <BookOpen className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p>Select a course to start editing</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Live Preview */}
          <div className="w-96 border-l bg-white">
            <div className="px-4 py-2 bg-gray-100 border-b">
              <h3 className="font-semibold text-sm">Live Preview</h3>
            </div>
            <div className="p-4">
              {selectedCourse ? (
                <div className="bg-white rounded-lg border p-4">
                  <h3 className="font-bold text-lg mb-2">{selectedCourse.title}</h3>
                  <p className="text-sm text-gray-600">{selectedCourse.description}</p>
                  <div className="mt-4 text-sm">
                    Preview of course content will appear here...
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-400 py-8">
                  No course selected
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
