"use client";

// app/lms/study-groups/page.tsx - ACTIVATED VERSION
import Image from 'next/image';
import { useEffect, useState } from "react";
import { Users, MapPin, Calendar, Video, Clock } from "lucide-react";

type StudyGroup = {
  id: string;
  name: string;
  description: string;
  modality: "online" | "in_person" | "hybrid";
  schedule: string;
  location?: string | null;
  meetingLink?: string | null;
  memberCount: number;
  maxMembers?: number | null;
  isMember: boolean;
  nextSession?: string | null;
};

export default function StudyGroupsPage() {
  const [groups, setGroups] = useState<StudyGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "online" | "in_person">("all");

  async function loadGroups() {
    try {
      const res = await fetch("/api/study-groups");
      const data = await res.json();
      setGroups(data);
    } catch (e) {
      console.error("Failed to load study groups", e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadGroups();
  }, []);

  async function handleJoin(id: string) {
    try {
      await fetch(`/api/study-groups/${id}/join`, { method: "POST" });
      await loadGroups();
    } catch (e) {
      console.error("Failed to join study group", e);
    }
  }

  const filteredGroups = groups.filter((g) => {
    if (filter === "all") return true;
    return g.modality === filter;
  });

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-bold text-slate-900">Study Groups & Cohorts</h1>
        <p className="text-sm text-slate-600">
          Join live or in-person groups to stay accountable, learn together, and finish your program.
        </p>
      </header>

      {/* Filter Tabs */}
      <div className="flex gap-2">
        <FilterButton
          active={filter === "all"}
          onClick={() => setFilter("all")}
          label="All Groups"
        />
        <FilterButton
          active={filter === "online"}
          onClick={() => setFilter("online")}
          label="Online"
        />
        <FilterButton
          active={filter === "in_person"}
          onClick={() => setFilter("in_person")}
          label="In-Person"
        />
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="text-sm text-slate-500">Loading study groups...</div>
        </div>
      ) : filteredGroups.length === 0 ? (
        <div className="rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 p-12 text-center">
          <Users className="w-12 h-12 mx-auto mb-4 text-slate-400" />
          <p className="text-sm text-slate-600 mb-2">No study groups available</p>
          <p className="text-xs text-slate-500">
            Your Elevate team will publish cohorts here. Check back soon!
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {filteredGroups.map((g) => (
            <article
              key={g.id}
              className="rounded-2xl border-2 border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h2 className="text-base font-semibold text-slate-900 mb-1">{g.name}</h2>
                  <p className="text-sm text-slate-600 leading-relaxed">{g.description}</p>
                </div>
                <span
                  className={`text-xs rounded-full px-3 py-1 font-medium ${
                    g.modality === "online"
                      ? "bg-blue-100 text-blue-700"
                      : g.modality === "in_person"
                      ? "bg-green-100 text-green-700"
                      : "bg-purple-100 text-purple-700"
                  }`}
                >
                  {g.modality === "online" ? "Online" : g.modality === "in_person" ? "In-Person" : "Hybrid"}
                </span>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <Calendar className="w-4 h-4" />
                  <span>{g.schedule}</span>
                </div>
                {g.location && (
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <MapPin className="w-4 h-4" />
                    <span>{g.location}</span>
                  </div>
                )}
                {g.meetingLink && (
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <Video className="w-4 h-4" />
                    <a href={g.meetingLink} className="text-blue-600 hover:underline">
                      Join meeting link
                    </a>
                  </div>
                )}
                {g.nextSession && (
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <Clock className="w-4 h-4" />
                    <span>Next: {new Date(g.nextSession).toLocaleDateString()}</span>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Users className="w-4 h-4" />
                  <span>
                    {g.memberCount} {g.maxMembers ? `/ ${g.maxMembers}` : ""} members
                  </span>
                </div>
                {g.isMember ? (
                  <span className="text-xs rounded-full bg-green-100 px-3 py-1.5 text-green-700 font-medium">
                    ✓ You're a member
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleJoin(g.id)}
                    className="text-xs rounded-full bg-blue-600 px-4 py-1.5 text-white font-medium hover:bg-blue-700 transition"
                  >
                    Join group
                  </button>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

function FilterButton({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
        active
          ? "bg-blue-600 text-white"
          : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
      }`}
    >
      {label}
    </button>
  );
}
