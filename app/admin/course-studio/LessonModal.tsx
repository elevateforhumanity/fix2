"use client";
import { useState } from "react";

interface LessonModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (name: string) => void;
}

export default function LessonModal({ open, onClose, onCreate }: LessonModalProps) {
  const [name, setName] = useState("");

  if (!open) return null;

  const handleCreate = () => {
    if (name.trim()) {
      onCreate(name);
      setName("");
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-96 space-y-4 shadow-xl">
        <h2 className="font-bold text-lg">Add Lesson</h2>

        <input
          className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="lesson-name.md"
          value={name}
          onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleCreate();
            if (e.key === 'Escape') onClose();
          }}
          autoFocus
        />

        <div className="flex gap-2">
          <button
            className="flex-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
            onClick={handleCreate}
          >
            Create
          </button>

          <button
            className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-50 transition-colors"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
