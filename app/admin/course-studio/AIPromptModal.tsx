"use client";
import { useState } from "react";

interface AIPromptModalProps {
  mode: string;
  onClose: () => void;
  onGenerate: (data: Record<string, unknown>) => void;
}

export default function AIPromptModal({ mode, onClose, onGenerate }: AIPromptModalProps) {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submit() {
    if (!prompt.trim()) {
      setError("Please enter a prompt");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/ai/generate-course", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode, prompt }),
      });

      if (!res.ok) {
        throw new Error("Failed to generate content");
      }

      const data = await res.json();
      onGenerate(data);
    } catch (err: unknown) {
      setError(err.message || "Failed to generate content");
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-lg space-y-3">

        <h3 className="font-bold text-lg">
          AI: Generate {mode.charAt(0).toUpperCase() + mode.slice(1)}
        </h3>

        <textarea
          className="w-full h-40 border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder={`Describe what you want the AI to create for this ${mode}...`}
          value={prompt}
          onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setPrompt(e.target.value)}
          disabled={loading}
        />

        {error && (
          <div className="text-red-600 text-sm">{error}</div>
        )}

        <button
          onClick={submit}
          disabled={loading || !prompt.trim()}
          className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? "Generating..." : "Generate"}
        </button>

        <button
          onClick={onClose}
          disabled={loading}
          className="text-center w-full text-slate-600 hover:text-slate-800 transition-colors"
        >
          Cancel
        </button>

      </div>
    </div>
  );
}
