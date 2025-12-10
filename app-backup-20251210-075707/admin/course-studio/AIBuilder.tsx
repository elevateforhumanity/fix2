"use client";
import { useState } from "react";
import AIPromptModal from "./AIPromptModal";
import AIGeneratorButton from "./AIGeneratorButton";

interface AIBuilderProps {
  onGenerate: (data: Record<string, unknown>) => void;
}

export default function AIBuilder({ onGenerate }: AIBuilderProps) {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("course");

  function generate(type: string) {
    setMode(type);
    setOpen(true);
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow space-y-4">

      <h2 className="font-bold text-xl">AI Course Builder</h2>
      <p className="text-slate-600 text-sm">
        Generate complete courses, modules, lessons, quizzes, and learning paths using AI.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">

        <AIGeneratorButton
          label="Generate Full Course"
          onClick={() => generate("course")}
        />

        <AIGeneratorButton
          label="Generate Module"
          onClick={() => generate("module")}
        />

        <AIGeneratorButton
          label="Generate Lesson"
          onClick={() => generate("lesson")}
        />

        <AIGeneratorButton
          label="Generate Quiz"
          onClick={() => generate("quiz")}
        />

        <AIGeneratorButton
          label="Generate Objectives"
          onClick={() => generate("objectives")}
        />

        <AIGeneratorButton
          label="Generate Course Images"
          onClick={() => generate("images")}
        />

      </div>

      {open && (
        <AIPromptModal
          mode={mode}
          onClose={() => setOpen(false)}
          onGenerate={(data) => {
            onGenerate(data);
            setOpen(false);
          }}
        />
      )}

    </div>
  );
}
