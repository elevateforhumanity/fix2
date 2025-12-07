"use client";
import { useEffect, useState } from "react";

interface EditorProps {
  filePath: string | null;
  content: string;
  sha: string;
  onChange: (content: string) => void;
}

export default function Editor({ filePath, content, sha, onChange }: EditorProps) {
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  async function save() {
    if (!filePath || !content) return;

    setSaving(true);
    try {
      await fetch("/api/github/commit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          repo: "elevateforhumanity/fix2",
          path: filePath,
          branch: "main",
          content,
          sha,
          message: `Update ${filePath} via Course Studio`,
        }),
      });
      setLastSaved(new Date());
    } catch (error) {
      console.error("Save failed:", error);
    } finally {
      setSaving(false);
    }
  }

  // AUTOSAVE - debounced
  useEffect(() => {
    if (!filePath || !content) return;
    
    const id = setTimeout(() => {
      save();
    }, 2000); // 2 second debounce
    
    return () => clearTimeout(id);
  }, [content]);

  return (
    <div className="bg-white p-4 rounded-lg shadow flex flex-col">
      <div className="flex justify-between items-center mb-3">
        <div>
          <h3 className="font-semibold">Editor</h3>
          {filePath && (
            <p className="text-xs text-gray-500 truncate max-w-md">{filePath}</p>
          )}
        </div>
        <div className="text-sm">
          {saving ? (
            <span className="text-blue-600">Saving...</span>
          ) : lastSaved ? (
            <span className="text-green-600">
              Saved {lastSaved.toLocaleTimeString()}
            </span>
          ) : (
            <span className="text-gray-400">No changes</span>
          )}
        </div>
      </div>

      {filePath ? (
        <textarea
          className="w-full h-[600px] border p-3 rounded font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={content}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Start editing your course content..."
        />
      ) : (
        <div className="w-full h-[600px] border rounded flex items-center justify-center text-gray-400">
          Select a file from the sidebar to start editing
        </div>
      )}
    </div>
  );
}
