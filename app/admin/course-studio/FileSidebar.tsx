"use client";
import { useState, useEffect } from "react";

interface FileSidebarProps {
  onSelect: (file: { path: string; content: string; sha: string }) => void;
}

export default function FileSidebar({ onSelect }: FileSidebarProps) {
  const [tree, setTree] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/github/tree?repo=elevateforhumanity/fix2&courses=true")
      .then((r) => r.json())
      .then((d) => {
        setTree(d.files || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleFileClick = async (filePath: string) => {
    try {
      const res = await fetch(
        `/api/github/file?repo=elevateforhumanity/fix2&path=${filePath}`
      );
      const data = await res.json();
      onSelect({ path: filePath, content: data.content, sha: data.sha });
    } catch (error) {
      console.error("Failed to load file:", error);
    }
  };

  return (
    <div className="w-80 bg-white p-4 border-r overflow-y-auto">
      <h3 className="font-semibold mb-3">Course Files</h3>

      {loading ? (
        <div className="text-sm text-gray-500">Loading files...</div>
      ) : (
        <ul className="space-y-1 text-sm">
          {tree.map((file) => (
            <li
              key={file.path}
              onClick={() => handleFileClick(file.path)}
              className="cursor-pointer hover:bg-blue-50 p-2 rounded truncate"
              title={file.path}
            >
              {file.path}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
