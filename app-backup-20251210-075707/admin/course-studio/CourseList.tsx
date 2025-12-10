"use client";
import { useEffect, useState } from "react";

export default function CourseList() {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    fetch("/api/github/repos")
      .then((res) => res.json())
      .then(setRepos);
  }, []);

  return (
    <div className="bg-white p-4 rounded-lg shadow space-y-2">
      <h2 className="font-bold text-xl">Courses</h2>

      {repos.map((r: Record<string, any>) => (
        <div
          key={r.full_name}
          className="p-2 border rounded bg-slate-50 hover:bg-slate-100 cursor-pointer"
        >
          {r.full_name}
        </div>
      ))}
    </div>
  );
}
