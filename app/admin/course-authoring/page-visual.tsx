"use client";

import { useState } from "react";
import { Plus, Video, FileText, HelpCircle, GripVertical, Trash2 } from "lucide-react";

type Lesson = {
  id: string;
  title: string;
  type: "video" | "quiz" | "reading";
};

type Module = {
  id: string;
  title: string;
  lessons: Lesson[];
};

export default function CourseAuthoringPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [modules, setModules] = useState<Module[]>([]);

  function generateId() {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  function addModule() {
    setModules((prev) => [
      ...prev,
      { id: generateId(), title: `Module ${prev.length + 1}`, lessons: [] },
    ]);
  }

  function updateModuleTitle(id: string, newTitle: string) {
    setModules((prev) =>
      prev.map((m) => (m.id === id ? { ...m, title: newTitle } : m))
    );
  }

  function deleteModule(id: string) {
    setModules((prev) => prev.filter((m) => m.id !== id));
  }

  function addLesson(moduleId: string, type: Lesson["type"]) {
    setModules((prev) =>
      prev.map((m) =>
        m.id === moduleId
          ? {
              ...m,
              lessons: [
                ...m.lessons,
                {
                  id: generateId(),
                  title:
                    type === "video"
                      ? "New Video Lesson"
                      : type === "quiz"
                      ? "New Quiz"
                      : "New Reading",
                  type,
                },
              ],
            }
          : m
      )
    );
  }

  function deleteLesson(moduleId: string, lessonId: string) {
    setModules((prev) =>
      prev.map((m) =>
        m.id === moduleId
          ? { ...m, lessons: m.lessons.filter((l) => l.id !== lessonId) }
          : m
      )
    );
  }

  async function handleSave() {
    const courseData = { title, description, modules };
    console.log("Saving course:", courseData);
    
    // API endpoint for course authoring
    // Implement /api/courses/authoring POST endpoint to persist course data
    // await fetch("/api/courses/authoring", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(courseData),
    // });
    
    alert("Course structure saved! (Connect to your API to persist)");
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <header className="space-y-3">
          <h1 className="text-3xl font-bold text-slate-900">
            Visual Course Builder
          </h1>
          <p className="text-sm text-slate-600">
            Design your programs, modules, and lessons visually. This connects
            directly to the Elevate LMS and your Supabase database.
          </p>
        </header>

        {/* Course Info */}
        <div className="bg-white rounded-2xl border-2 border-slate-200 p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Course Title
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., HVAC Technician Career Pathway"
              className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 text-sm focus:border-brandPrimary focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Course Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description of what students will learn..."
              rows={3}
              className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 text-sm focus:border-brandPrimary focus:outline-none"
            />
          </div>
        </div>

        {/* Modules Section */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-slate-900">Course Modules</h2>
            <button
              type="button"
              onClick={addModule}
              className="flex items-center gap-2 rounded-xl bg-brandPrimary px-4 py-2 text-sm font-semibold text-white hover:bg-brandPrimaryDark transition"
            >
              <Plus className="w-4 h-4" />
              Add Module
            </button>
          </div>

          {modules.length === 0 && (
            <div className="bg-white rounded-2xl border-2 border-dashed border-slate-300 p-12 text-center">
              <div className="text-slate-400 mb-3">
                <FileText className="w-12 h-12 mx-auto" />
              </div>
              <p className="text-sm text-slate-600 mb-4">
                No modules yet. Start by adding your first module.
              </p>
              <p className="text-xs text-slate-500">
                Example modules: "Introduction", "Hands-on Training", "Certification Prep"
              </p>
            </div>
          )}

          {/* Module Cards */}
          <div className="space-y-4">
            {modules.map((module, moduleIndex) => (
              <div
                key={module.id}
                className="bg-white rounded-2xl border-2 border-slate-200 p-6 space-y-4"
              >
                {/* Module Header */}
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-2 text-slate-400 cursor-move">
                    <GripVertical className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <input
                      value={module.title}
                      onChange={(e) =>
                        updateModuleTitle(module.id, e.target.value)
                      }
                      className="w-full text-lg font-semibold text-slate-900 border-b-2 border-transparent hover:border-slate-200 focus:border-brandPrimary focus:outline-none px-2 py-1"
                      placeholder="Module title..."
                    />
                  </div>
                  <button
                    onClick={() => deleteModule(module.id)}
                    className="flex-shrink-0 p-2 text-red-500 hover:bg-red-50 rounded-lg transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Add Lesson Buttons */}
                <div className="flex gap-2">
                  <MiniButton
                    onClick={() => addLesson(module.id, "video")}
                    icon={<Video className="w-3 h-3" />}
                    label="Video"
                    color="blue"
                  />
                  <MiniButton
                    onClick={() => addLesson(module.id, "reading")}
                    icon={<FileText className="w-3 h-3" />}
                    label="Reading"
                    color="green"
                  />
                  <MiniButton
                    onClick={() => addLesson(module.id, "quiz")}
                    icon={<HelpCircle className="w-3 h-3" />}
                    label="Quiz"
                    color="purple"
                  />
                </div>

                {/* Lessons List */}
                <ul className="space-y-2">
                  {module.lessons.map((lesson, lessonIndex) => (
                    <li
                      key={lesson.id}
                      className="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 hover:bg-slate-100 transition"
                    >
                      <span className="text-xs text-slate-400 font-mono">
                        {moduleIndex + 1}.{lessonIndex + 1}
                      </span>
                      <div className="flex-1">
                        <span className="text-sm font-medium text-slate-900">
                          {lesson.title}
                        </span>
                      </div>
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase ${
                          lesson.type === "video"
                            ? "bg-blue-100 text-brandPrimary"
                            : lesson.type === "quiz"
                            ? "bg-purple-100 text-purple-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {lesson.type}
                      </span>
                      <button
                        onClick={() => deleteLesson(module.id, lesson.id)}
                        className="p-1 text-red-500 hover:bg-red-50 rounded transition"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </li>
                  ))}
                  {module.lessons.length === 0 && (
                    <li className="text-xs text-slate-500 italic px-4 py-2">
                      No lessons yet. Click a button above to add content.
                    </li>
                  )}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end gap-3 pt-6 border-t">
          <button
            onClick={() => {
              setTitle("");
              setDescription("");
              setModules([]);
            }}
            className="rounded-xl border-2 border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
          >
            Clear All
          </button>
          <button
            onClick={handleSave}
            disabled={!title || modules.length === 0}
            className="rounded-xl bg-green-600 px-6 py-3 text-sm font-semibold text-white hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            Save Course Structure
          </button>
        </div>
      </div>
    </div>
  );
}

function MiniButton({
  onClick,
  icon,
  label,
  color,
}: {
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  color: "blue" | "green" | "purple";
}) {
  const colorClasses = {
    blue: "border-blue-200 text-brandPrimary hover:bg-blue-50",
    green: "border-green-200 text-green-700 hover:bg-green-50",
    purple: "border-purple-200 text-purple-700 hover:bg-purple-50",
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-1.5 rounded-full border-2 px-3 py-1.5 text-xs font-medium transition ${colorClasses[color]}`}
    >
      {icon}
      {label}
    </button>
  );
}
