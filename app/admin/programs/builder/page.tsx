"use client";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useState } from "react";
import { SortableItem } from "./sortable-item";

type ModuleItem = {
  id: string;
  title: string;
  description?: string;
};

const initialModules: ModuleItem[] = [
  {
    id: "m1",
    title: "Orientation & Safety",
    description: "Introduction to workplace safety and program overview",
  },
  {
    id: "m2",
    title: "Core Technical Skills",
    description: "Fundamental skills and knowledge for the occupation",
  },
  {
    id: "m3",
    title: "Hands-on Lab",
    description: "Practical application and skill demonstration",
  },
  {
    id: "m4",
    title: "Soft Skills & Professionalism",
    description: "Communication, teamwork, and workplace behavior",
  },
  {
    id: "m5",
    title: "Industry Certifications",
    description: "Preparation for industry-recognized credentials",
  },
  {
    id: "m6",
    title: "Job Readiness & Placement",
    description: "Resume building, interviewing, and job search strategies",
  },
];

export default function ProgramBuilderPage() {
  const [modules, setModules] = useState<ModuleItem[]>(initialModules);
  const [programTitle, setProgramTitle] = useState("New Workforce Program");
  const [saving, setSaving] = useState(false);

  const sensors = useSensors(useSensor(PointerSensor));

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = modules.findIndex((m) => m.id === active.id);
    const newIndex = modules.findIndex((m) => m.id === over.id);
    setModules(arrayMove(modules, oldIndex, newIndex));
  }

  async function handleSave() {
    setSaving(true);
    try {
      // In production, save to API
      await fetch("/api/programs/builder/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: programTitle,
          modules: modules.map((m, index) => ({
            ...m,
            order: index + 1,
          })),
        }),
      });
      alert("Program saved successfully!");
    } catch (error) {
      alert("Failed to save program");
    } finally {
      setSaving(false);
    }
  }

  function addModule() {
    const newModule: ModuleItem = {
      id: `m${Date.now()}`,
      title: "New Module",
      description: "Add description here",
    };
    setModules([...modules, newModule]);
  }

  function removeModule(id: string) {
    setModules(modules.filter((m) => m.id !== id));
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="mx-auto max-w-4xl px-4 py-10">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-slate-900">
            Program Builder
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Drag and reorder modules to design your workforce program.
          </p>
        </div>

        <div className="mb-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
          <label className="block text-sm font-medium text-slate-700">
            Program Title
          </label>
          <input
            type="text"
            value={programTitle}
            onChange={(e) => setProgramTitle(e.target.value)}
            className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none"
          />
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">Modules</h2>
            <button
              onClick={addModule}
              className="rounded-xl bg-orange-400 text-white px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-orange-500"
            >
              + Add Module
            </button>
          </div>

          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={modules.map((m) => m.id)}
              strategy={verticalListSortingStrategy}
            >
              <ul className="space-y-2">
                {modules.map((m, index) => (
                  <SortableItem key={m.id} id={m.id}>
                    <div className="flex items-start justify-between rounded-xl border border-slate-100 bg-slate-50 px-3 py-3 text-sm">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-orange-100 text-xs font-semibold text-orange-600">
                            {index + 1}
                          </span>
                          <span className="font-medium text-slate-900">
                            {m.title}
                          </span>
                        </div>
                        {m.description && (
                          <p className="ml-8 mt-1 text-xs text-slate-600">
                            {m.description}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="cursor-move text-[10px] uppercase tracking-wide text-slate-400">
                          Drag
                        </span>
                        <button
                          onClick={() => removeModule(m.id)}
                          className="text-xs text-red-500 hover:text-red-700"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </SortableItem>
                ))}
              </ul>
            </SortableContext>
          </DndContext>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={() => window.history.back()}
            className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="rounded-xl bg-orange-400 text-white px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Program"}
          </button>
        </div>
      </section>
    </main>
  );
}
