"use client";
import { useState } from "react";
import CourseList from "../course-studio/CourseList";
import Editor from "../course-studio/Editor";
import Preview from "../course-studio/Preview";
import FileSidebar from "../course-studio/FileSidebar";
import AIBuilder from "../course-studio/AIBuilder";

export default function CourseStudioAIPage() {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [content, setContent] = useState("");
  const [fileSha, setFileSha] = useState("");
  const [showAI, setShowAI] = useState(true);

  const handleAIGenerate = async (data: any) => {
    console.log("AI Generated:", data);
    
    // If it's a course, create the structure
    if (data.mode === "course" && data.output) {
      const course = data.output;
      
      // Format as markdown/JSON for the editor
      const courseContent = `# ${course.title || "New Course"}

## Summary
${course.summary || ""}

## Description
${course.description || ""}

## Objectives
${course.objectives?.map((obj: string) => `- ${obj}`).join('\n') || ""}

## Modules
${course.modules?.map((mod: any, i: number) => `
### Module ${i + 1}: ${mod.title || mod}
${mod.description || ""}
`).join('\n') || ""}

## Lessons
${course.lessons?.map((lesson: string, i: number) => `${i + 1}. ${lesson}`).join('\n') || ""}
`;

      setContent(courseContent);
      
      // Optionally save to GitHub
      if (selectedFile) {
        try {
          await fetch("/api/github/commit", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              repo: "elevateforhumanity/fix2",
              path: selectedFile,
              branch: "main",
              content: courseContent,
              sha: fileSha,
              message: `AI Generated: ${course.title || "course content"}`,
            }),
          });
        } catch (error) {
          console.error("Failed to save:", error);
        }
      }
    } else {
      // For other modes, just set the content
      const outputText = typeof data.output === 'string' 
        ? data.output 
        : JSON.stringify(data.output, null, 2);
      setContent(outputText);
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
          <h1 className="text-2xl font-bold">Course Studio with AI</h1>
          <button
            onClick={() => setShowAI(!showAI)}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            {showAI ? "Hide AI Builder" : "Show AI Builder"}
          </button>
        </div>

        {showAI && <AIBuilder onGenerate={handleAIGenerate} />}

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
    </div>
  );
}
