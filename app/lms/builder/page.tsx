// app/lms/builder/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

type LessonInput = {
  id: string;
  title: string;
  type: 'video' | 'reading' | 'quiz' | 'assignment';
};

type ModuleInput = {
  id: string;
  title: string;
  lessons: LessonInput[];
};

const LESSON_TYPES: LessonInput['type'][] = [
  'video',
  'reading',
  'quiz',
  'assignment',
];

function createId() {
  return Math.random().toString(36).slice(2);
}

export default function CourseBuilderPage() {
  const router = useRouter();
  const [programCode, setProgramCode] = useState<
    'hvac' | 'barber' | 'med-assistant' | ''
  >('');
  const [title, setTitle] = useState('');
  const [level, setLevel] = useState<'intro' | 'standard' | 'advanced'>(
    'standard'
  );
  const [deliveryMode, setDeliveryMode] = useState<
    'online' | 'hybrid' | 'in_person'
  >('hybrid');
  const [modules, setModules] = useState<ModuleInput[]>([
    {
      id: createId(),
      title: 'Module 1 – Orientation & Expectations',
      lessons: [],
    },
  ]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const programLabel =
    programCode === 'hvac'
      ? 'HVAC Technician'
      : programCode === 'barber'
        ? 'Barber Apprenticeship'
        : programCode === 'med-assistant'
          ? 'Medical Assistant'
          : 'Select program';

  function addModule() {
    setModules((prev) => [
      ...prev,
      {
        id: createId(),
        title: `Module ${prev.length + 1}`,
        lessons: [],
      },
    ]);
  }

  function updateModuleTitle(id: string, value: string) {
    setModules((prev) =>
      prev.map((m) => (m.id === id ? { ...m, title: value } : m))
    );
  }

  function addLesson(moduleId: string) {
    setModules((prev) =>
      prev.map((m) =>
        m.id === moduleId
          ? {
              ...m,
              lessons: [
                ...m.lessons,
                {
                  id: createId(),
                  title: `Lesson ${m.lessons.length + 1}`,
                  type: 'video',
                },
              ],
            }
          : m
      )
    );
  }

  function updateLesson(
    moduleId: string,
    lessonId: string,
    patch: Partial<Pick<LessonInput, 'title' | 'type'>>
  ) {
    setModules((prev) =>
      prev.map((m) =>
        m.id === moduleId
          ? {
              ...m,
              lessons: m.lessons.map((l) =>
                l.id === lessonId
                  ? {
                      ...l,
                      ...patch,
                    }
                  : l
              ),
            }
          : m
      )
    );
  }

  async function handleSave() {
    setError(null);

    if (!programCode) {
      setError('Select the program that this course belongs to.');
      return;
    }

    if (!title.trim()) {
      setError('Give the course a title that students will understand.');
      return;
    }

    if (modules.length === 0 || modules.every((m) => m.lessons.length === 0)) {
      setError('Add at least one module with one lesson.');
      return;
    }

    setSaving(true);
    try {
      const res = await fetch('/api/lms/courses/builder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          program_code: programCode,
          title,
          level,
          delivery_mode: deliveryMode,
          modules,
        }),
      });

      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || 'Failed to save course.');
      }

      const data = await res.json();
      router.push(`/program-holder/dashboard?success=course_created`);
    } catch (e: any) {
      setError(e.message || 'Something went wrong while saving.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8 md:px-8">
        <header className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-sky-400">
              Elevate Connects Directory · Course Builder
            </p>
            <h1 className="mt-1 text-2xl font-semibold md:text-3xl">
              Build a course once, reuse it everywhere
            </h1>
            <p className="mt-2 text-xs text-slate-300 md:text-sm">
              This builder is for Elevate staff and program holders. Create a
              course one time and reuse it across funding streams — WRG, WIOA,
              JRI, employer-sponsored, and private pay — without rewriting the
              syllabus.
            </p>
          </div>
          <button
            disabled={saving}
            onClick={handleSave}
            className="h-10 rounded-2xl bg-sky-500 px-5 text-xs font-semibold text-slate-950 shadow-md shadow-sky-700/40 transition hover:bg-sky-400 disabled:cursor-not-allowed disabled:bg-slate-600"
          >
            {saving ? 'Saving course…' : 'Save course'}
          </button>
        </header>

        {/* Top-level course settings */}
        <section className="grid gap-4 md:grid-cols-[2fr,1fr]">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
            <label className="text-xs font-semibold text-slate-200">
              Course title
              <input
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm outline-none ring-0 placeholder:text-slate-500 focus:border-sky-400"
                placeholder="Example: Intro to HVAC Safety & Tools"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>
            <p className="mt-1 text-[11px] text-slate-400">
              Use language a student can understand. Avoid internal codes at the
              front of the title.
            </p>
          </div>

          <div className="space-y-3 rounded-2xl border border-slate-800 bg-slate-900/70 p-4 text-xs">
            <div>
              <p className="font-semibold text-slate-200">Program</p>
              <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-3">
                <button
                  onClick={() => setProgramCode('hvac')}
                  className={`rounded-xl border px-3 py-2 text-left text-xs ${
                    programCode === 'hvac'
                      ? 'border-sky-400 bg-sky-950/60 text-sky-100'
                      : 'border-slate-700 bg-slate-950/40 text-slate-200'
                  }`}
                >
                  <p className="font-semibold">HVAC</p>
                  <p className="text-[10px] text-slate-400">
                    Technician · Workforce & apprenticeship
                  </p>
                </button>
                <button
                  onClick={() => setProgramCode('barber')}
                  className={`rounded-xl border px-3 py-2 text-left text-xs ${
                    programCode === 'barber'
                      ? 'border-sky-400 bg-sky-950/60 text-sky-100'
                      : 'border-slate-700 bg-slate-950/40 text-slate-200'
                  }`}
                >
                  <p className="font-semibold">Barber</p>
                  <p className="text-[10px] text-slate-400">
                    Apprenticeship · Licensed in the shop
                  </p>
                </button>
                <button
                  onClick={() => setProgramCode('med-assistant')}
                  className={`rounded-xl border px-3 py-2 text-left text-xs ${
                    programCode === 'med-assistant'
                      ? 'border-sky-400 bg-sky-950/60 text-sky-100'
                      : 'border-slate-700 bg-slate-950/40 text-slate-200'
                  }`}
                >
                  <p className="font-semibold">Medical Assistant</p>
                  <p className="text-[10px] text-slate-400">
                    Clinical & admin pathway
                  </p>
                </button>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex-1">
                <p className="font-semibold text-slate-200">Level</p>
                <select
                  className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950/60 px-3 py-2 text-xs outline-none focus:border-sky-400"
                  value={level}
                  onChange={(e) => setLevel(e.target.value as typeof level)}
                >
                  <option value="intro">Intro / Onboarding</option>
                  <option value="standard">Standard</option>
                  <option value="advanced">Advanced / Capstone</option>
                </select>
              </div>
              <div className="flex-1">
                <p className="font-semibold text-slate-200">Delivery mode</p>
                <select
                  className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950/60 px-3 py-2 text-xs outline-none focus:border-sky-400"
                  value={deliveryMode}
                  onChange={(e) =>
                    setDeliveryMode(e.target.value as typeof deliveryMode)
                  }
                >
                  <option value="online">Online only</option>
                  <option value="hybrid">Hybrid (online + hands-on)</option>
                  <option value="in_person">
                    In person (classroom / shop)
                  </option>
                </select>
              </div>
            </div>

            <p className="text-[11px] text-slate-400">
              Program + level + delivery mode are used to build your ETPL, WIOA,
              and WRG reporting and to keep all program holders consistent.
            </p>
          </div>
        </section>

        {/* Builder grid */}
        <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-sm font-semibold text-slate-50">
              Modules & lessons (what students actually see)
            </h2>
            <button
              type="button"
              onClick={addModule}
              className="rounded-xl border border-slate-700 bg-slate-950/60 px-3 py-1.5 text-[11px] font-medium text-slate-100 hover:border-sky-400 hover:text-sky-200"
            >
              + Add module
            </button>
          </div>

          <div className="mt-4 space-y-4">
            {modules.map((module, moduleIndex) => (
              <div
                key={module.id}
                className="rounded-xl border border-slate-800 bg-slate-950/60 p-3 text-xs"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex-1">
                    <input
                      className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-1.5 text-xs outline-none focus:border-sky-400"
                      value={module.title}
                      onChange={(e) =>
                        updateModuleTitle(module.id, e.target.value)
                      }
                    />
                    <p className="mt-1 text-[10px] text-slate-500">
                      Example: "Safety, professionalism, and expectations"
                    </p>
                  </div>
                  <span className="rounded-full bg-slate-800 px-2 py-1 text-[10px] text-slate-300">
                    Module {moduleIndex + 1}
                  </span>
                </div>

                <div className="mt-3 space-y-2">
                  {module.lessons.map((lesson) => (
                    <div
                      key={lesson.id}
                      className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900 px-3 py-2"
                    >
                      <select
                        className="w-28 rounded-md border border-slate-700 bg-slate-950 px-2 py-1 text-[11px] outline-none focus:border-sky-400"
                        value={lesson.type}
                        onChange={(e) =>
                          updateLesson(module.id, lesson.id, {
                            type: e.target.value as LessonInput['type'],
                          })
                        }
                      >
                        {LESSON_TYPES.map((t) => (
                          <option key={t} value={t}>
                            {t === 'video'
                              ? 'Video'
                              : t === 'reading'
                                ? 'Reading'
                                : t === 'quiz'
                                  ? 'Quiz'
                                  : 'Assignment'}
                          </option>
                        ))}
                      </select>
                      <input
                        className="flex-1 rounded-md border border-slate-700 bg-slate-950 px-2 py-1 text-[11px] outline-none focus:border-sky-400"
                        placeholder="Lesson title"
                        value={lesson.title}
                        onChange={(e) =>
                          updateLesson(module.id, lesson.id, {
                            title: e.target.value,
                          })
                        }
                      />
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addLesson(module.id)}
                    className="rounded-md border border-dashed border-slate-700 px-3 py-1.5 text-[11px] text-slate-200 hover:border-sky-400 hover:text-sky-200"
                  >
                    + Add lesson to this module
                  </button>
                </div>
              </div>
            ))}
          </div>

          {error && <p className="mt-3 text-xs text-red-400">{error}</p>}
        </section>

        <section className="flex justify-end">
          <button
            disabled={saving}
            onClick={handleSave}
            className="rounded-2xl bg-sky-500 px-6 py-2 text-xs font-semibold text-slate-950 shadow-md shadow-sky-700/40 transition hover:bg-sky-400 disabled:cursor-not-allowed disabled:bg-slate-600"
          >
            {saving ? 'Saving course…' : 'Save course'}
          </button>
        </section>
      </main>
    </div>
  );
}
