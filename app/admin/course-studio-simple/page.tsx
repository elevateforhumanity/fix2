"use client";
import { useState } from "react";
import CourseList from "../course-studio/CourseList";
import Editor from "../course-studio/Editor";
import Preview from "../course-studio/Preview";
import FileSidebar from "../course-studio/FileSidebar";
import LessonModal from "../course-studio/LessonModal";

export default function CourseStudioSimplePage() {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [content, setContent] = useState("");
  const [fileSha, setFileSha] = useState("");
  const [showLessonModal, setShowLessonModal] = useState(false);

  const handleCreateLesson = async (name: string) => {
    // Create new lesson file
    const lessonPath = `content/courses/lessons/${name}`;
    const lessonContent = `# ${name}\n\nLesson content goes here...`;
    
    try {
      await fetch("/api/github/file", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          repo: "elevateforhumanity/fix2",
          path: lessonPath,
          content: lessonContent,
          message: `Create lesson: ${name}`,
          branch: "main",
        }),
      });
      
      // Load the new file
      setSelectedFile(lessonPath);
      setContent(lessonContent);
    } catch (error) {
      console.error("Failed to create lesson:", error);
      alert("Failed to create lesson");
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-100">
      
      <FileSidebar
        onSelect={(file) => {
          setSelectedFile(file.path);
          setContent(file.content);
          setFileSha(file.sha);
        }}
      />

      <div className="flex-1 p-6 space-y-6">
        
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Course Studio - Simple</h1>
          <button
            onClick={() => setShowLessonModal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            + Add Lesson
          </button>
        </div>

        <CourseList />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Editor
            filePath={selectedFile}
            content={content}
            sha={fileSha}
            onChange={setContent}
          />
          <Preview content={content} />
        </div>

      </div>

      <LessonModal
        open={showLessonModal}
        onClose={() => setShowLessonModal(false)}
        onCreate={handleCreateLesson}
      />
    </div>
  );
}
