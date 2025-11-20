"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type FundingType = "WIOA" | "WRG" | "Apprenticeship" | "Tuition" | "Mixed";
type CourseHealth = "healthy" | "attention" | "at-risk";

interface InstructorCourseSummary {
  id: string;
  title: string;
  pathway: string;
  funding: FundingType[];
  enrolled: number;
  active: number;
  completed: number;
  completionRate: number;
  avgQuizScore: number;
  health: CourseHealth;
  nextLive?: string;
}

interface AtRiskStudent {
  id: string;
  name: string;
  courseId: string;
  courseTitle: string;
  riskReason: string;
  lastLogin: string;
  progress: number;
  contactPreference: "Call" | "Text" | "Email";
}

interface LiveSession {
  id: string;
  title: string;
  courseId: string;
  courseTitle: string;
  date: string;
  time: string;
  delivery: "In-person" | "Virtual" | "Hybrid";
  joinLink?: string;
}

interface InstructorEvent {
  id: string;
  type: "grade" | "discussion" | "attendance" | "certificate" | "note";
  label: string;
  courseTitle: string;
  timestamp: string;
  details: string;
}

type CourseFilter = "all" | "healthy" | "attention" | "at-risk";

const sampleCourses: InstructorCourseSummary[] = [
  {
    id: "barber-101",
    title: "Barber Apprenticeship – Phase 1",
    pathway: "Trades · Apprenticeship",
    funding: ["WIOA", "Apprenticeship"],
    enrolled: 24,
    active: 22,
    completed: 5,
    completionRate: 68,
    avgQuizScore: 84,
    health: "healthy",
    nextLive: "Live demo: Taper fades · Nov 22",
  },
  {
    id: "hvac-101",
    title: "HVAC Technician – Core Foundations",
    pathway: "Skilled Trades",
    funding: ["WIOA", "WRG"],
    enrolled: 18,
    active: 15,
    completed: 4,
    completionRate: 61,
    avgQuizScore: 76,
    health: "attention",
    nextLive: "Safety lab walkthrough · Nov 23",
  },
  {
    id: "med-assistant-101",
    title: "Medical Assistant – Clinical Skills",
    pathway: "Healthcare",
    funding: ["Mixed"],
    enrolled: 20,
    active: 10,
    completed: 2,
    completionRate: 38,
    avgQuizScore: 72,
    health: "at-risk",
    nextLive: "Clinical prep Q&A · Nov 24",
  },
  {
    id: "cdl-101",
    title: "CDL – Commercial Driving Basics",
    pathway: "Transportation · Workforce",
    funding: ["WIOA", "Tuition"],
    enrolled: 14,
    active: 9,
    completed: 7,
    completionRate: 80,
    avgQuizScore: 88,
    health: "healthy",
    nextLive: "Road test prep · Nov 25",
  },
];

const sampleAtRisk: AtRiskStudent[] = [
  {
    id: "s1",
    name: "Angela H",
    courseId: "med-assistant-101",
    courseTitle: "Medical Assistant – Clinical Skills",
    riskReason: "Has not logged in for 10 days · 18% progress",
    lastLogin: "10 days ago",
    progress: 18,
    contactPreference: "Text",
  },
  {
    id: "s2",
    name: "Marcus J",
    courseId: "hvac-101",
    courseTitle: "HVAC Technician – Core Foundations",
    riskReason: "Missed last live session · quiz average 64%",
    lastLogin: "3 days ago",
    progress: 32,
    contactPreference: "Call",
  },
  {
    id: "s3",
    name: "Tanya R",
    courseId: "barber-101",
    courseTitle: "Barber Apprenticeship – Phase 1",
    riskReason: "Behind on hours log · attendance 60%",
    lastLogin: "Yesterday",
    progress: 45,
    contactPreference: "Text",
  },
];

const sampleLiveSessions: LiveSession[] = [
  {
    id: "ls1",
    title: "Live demo: Taper fades",
    courseId: "barber-101",
    courseTitle: "Barber Apprenticeship – Phase 1",
    date: "Nov 22",
    time: "6:00 PM – 7:30 PM",
    delivery: "Hybrid",
    joinLink: "#",
  },
  {
    id: "ls2",
    title: "Safety lab walkthrough",
    courseId: "hvac-101",
    courseTitle: "HVAC Technician – Core Foundations",
    date: "Nov 23",
    time: "5:30 PM – 7:00 PM",
    delivery: "In-person",
  },
  {
    id: "ls3",
    title: "Clinical prep Q&A",
    courseId: "med-assistant-101",
    courseTitle: "Medical Assistant – Clinical Skills",
    date: "Nov 24",
    time: "7:00 PM – 8:00 PM",
    delivery: "Virtual",
    joinLink: "#",
  },
];

const sampleEvents: InstructorEvent[] = [
  {
    id: "e1",
    type: "grade",
    label: "Graded 12 Safety Basics quizzes · Avg 86%",
    courseTitle: "HVAC Technician – Core Foundations",
    timestamp: "2 hours ago",
    details: "3 learners flagged for follow-up (scores below 70%).",
  },
  {
    id: "e2",
    type: "discussion",
    label: "Replied in \"Balancing work, family & training\" thread",
    courseTitle: "Student Success & Soft Skills",
    timestamp: "Yesterday",
    details: "Pinned response with time management strategy.",
  },
  {
    id: "e3",
    type: "attendance",
    label: "Marked attendance for live barber demo",
    courseTitle: "Barber Apprenticeship – Phase 1",
    timestamp: "Yesterday",
    details: "18 present · 3 excused · 3 no-shows.",
  },
  {
    id: "e4",
    type: "certificate",
    label: "Issued 4 new CDL certificates",
    courseTitle: "CDL – Commercial Driving Basics",
    timestamp: "3 days ago",
    details: "Certificates available in student dashboards.",
  },
];

function getHealthBadge(health: CourseHealth) {
  switch (health) {
    case "healthy":
      return {
        label: "Healthy",
        className: "bg-emerald-50 text-emerald-700 border-emerald-100",
      };
    case "attention":
      return {
        label: "Needs Attention",
        className: "bg-amber-50 text-amber-800 border-amber-100",
      };
    case "at-risk":
      return {
        label: "At Risk",
        className: "bg-rose-50 text-rose-700 border-rose-100",
      };
    default:
      return {
        label: "Unknown",
        className: "bg-slate-50 text-slate-600 border-slate-100",
      };
  }
}

function getFundingLabel(funding: FundingType) {
  switch (funding) {
    case "WIOA":
      return "WIOA-Eligible";
    case "WRG":
      return "Workforce Ready Grant";
    case "Apprenticeship":
      return "Registered Apprenticeship";
    case "Tuition":
      return "Tuition / Self-Pay";
    case "Mixed":
      return "Mixed Funding";
    default:
      return funding;
  }
}

function getEventEmoji(type: InstructorEvent["type"]) {
  switch (type) {
    case "grade":
      return "🧪";
    case "discussion":
      return "💬";
    case "attendance":
      return "📋";
    case "certificate":
      return "🎓";
    case "note":
      return "📝";
    default:
      return "⭐";
  }
}

export default function InstructorDashboardPage() {
  const [filter, setFilter] = useState<CourseFilter>("all");

  const filteredCourses = useMemo(() => {
    if (filter === "all") return sampleCourses;
    return sampleCourses.filter((course) => course.health === filter);
  }, [filter]);

  const totalEnrolled = sampleCourses.reduce((sum, c) => sum + c.enrolled, 0);
  const totalActive = sampleCourses.reduce((sum, c) => sum + c.active, 0);
  const overallCompletion =
    sampleCourses.length === 0
      ? 0
      : Math.round(
          sampleCourses.reduce((sum, c) => sum + c.completionRate, 0) /
            sampleCourses.length
        );
  const overallQuizScore =
    sampleCourses.length === 0
      ? 0
      : Math.round(
          sampleCourses.reduce((sum, c) => sum + c.avgQuizScore, 0) /
            sampleCourses.length
        );

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-6xl mx-auto px-4 py-10 lg:py-12">
        <header className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-purple-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-purple-700">
              Instructor · Program View
            </p>
            <h1 className="mt-3 text-3xl md:text-4xl font-bold text-slate-900">
              Instructor Dashboard
            </h1>
            <p className="mt-2 text-sm md:text-base text-slate-600 max-w-xl">
              Monitor course health, support learners who are falling behind,
              and stay on top of live sessions, grades, and certificates.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/admin"
              className="inline-flex items-center justify-center rounded-lg bg-white px-4 py-2 text-xs md:text-sm font-semibold text-slate-900 border border-slate-200 hover:bg-slate-50 transition"
            >
              Admin / System View
            </Link>
            <Link
              href="/courses/new"
              className="inline-flex items-center justify-center rounded-lg bg-purple-600 px-4 py-2 text-xs md:text-sm font-semibold text-white shadow-sm hover:bg-purple-700 transition"
            >
              Create / Clone Course
            </Link>
          </div>
        </header>

        <section className="mb-8 grid gap-4 md:grid-cols-4">
          <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
              Active Courses
            </p>
            <p className="mt-2 text-3xl font-bold text-slate-900">
              {sampleCourses.length}
            </p>
            <p className="mt-1 text-[11px] text-slate-500">
              Across trades, healthcare, and transportation pathways
            </p>
          </div>
          <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
              Learners Enrolled
            </p>
            <p className="mt-2 text-3xl font-bold text-slate-900">
              {totalEnrolled}
            </p>
            <p className="mt-1 text-[11px] text-slate-500">
              {totalActive} currently active this week
            </p>
          </div>
          <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
              Avg Completion Rate
            </p>
            <p className="mt-2 text-3xl font-bold text-emerald-600">
              {overallCompletion}%
            </p>
            <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-2 rounded-full bg-emerald-500 transition-all"
                style={{ width: `${overallCompletion}%` }}
              />
            </div>
          </div>
          <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
              Avg Quiz Score
            </p>
            <p className="mt-2 text-3xl font-bold text-blue-600">
              {overallQuizScore}%
            </p>
            <p className="mt-1 text-[11px] text-slate-500">
              Watch for cohorts under 70% to trigger coaching
            </p>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[2.1fr,1.4fr]">
          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
              <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-lg md:text-xl font-semibold text-slate-900">
                    Course Health Overview
                  </h2>
                  <p className="text-xs text-slate-500">
                    Quickly see which cohorts are healthy and which need support.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 text-[11px]">
                  <button
                    type="button"
                    onClick={() => setFilter("all")}
                    className={`rounded-full px-3 py-1 font-semibold ${
                      filter === "all"
                        ? "bg-slate-900 text-white"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    All
                  </button>
                  <button
                    type="button"
                    onClick={() => setFilter("healthy")}
                    className={`rounded-full px-3 py-1 font-semibold ${
                      filter === "healthy"
                        ? "bg-emerald-600 text-white"
                        : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                    }`}
                  >
                    Healthy
                  </button>
                  <button
                    type="button"
                    onClick={() => setFilter("attention")}
                    className={`rounded-full px-3 py-1 font-semibold ${
                      filter === "attention"
                        ? "bg-amber-500 text-white"
                        : "bg-amber-50 text-amber-800 hover:bg-amber-100"
                    }`}
                  >
                    Needs Attention
                  </button>
                  <button
                    type="button"
                    onClick={() => setFilter("at-risk")}
                    className={`rounded-full px-3 py-1 font-semibold ${
                      filter === "at-risk"
                        ? "bg-rose-600 text-white"
                        : "bg-rose-50 text-rose-700 hover:bg-rose-100"
                    }`}
                  >
                    At Risk
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                {filteredCourses.map((course) => {
                  const healthBadge = getHealthBadge(course.health);
                  return (
                    <div
                      key={course.id}
                      className="rounded-xl border border-slate-100 bg-slate-50/70 px-3 py-3 text-xs hover:bg-slate-50 hover:border-blue-100 transition"
                    >
                      <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                        <div>
                          <Link
                            href={`/lms/course/${course.id}`}
                            className="text-sm font-semibold text-slate-900 hover:underline"
                          >
                            {course.title}
                          </Link>
                          <p className="mt-0.5 text-[11px] text-slate-500">
                            {course.pathway}
                          </p>
                          <div className="mt-1 flex flex-wrap gap-1.5">
                            {course.funding.map((f) => (
                              <span
                                key={f}
                                className="rounded-full bg-white px-2 py-0.5 text-[10px] text-slate-700 border border-slate-200"
                              >
                                {getFundingLabel(f)}
                              </span>
                            ))}
                          </div>
                          {course.nextLive && (
                            <p className="mt-1 text-[11px] text-slate-500">
                              📺 {course.nextLive}
                            </p>
                          )}
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <span
                            className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold ${healthBadge.className}`}
                          >
                            {healthBadge.label}
                          </span>
                          <p className="text-[10px] text-slate-500">
                            {course.active}/{course.enrolled} active ·{" "}
                            {course.completed} completed
                          </p>
                          <div className="mt-1 w-40">
                            <div className="mb-1 flex items-center justify-between text-[10px] text-slate-500">
                              <span>Completion</span>
                              <span>{course.completionRate}%</span>
                            </div>
                            <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
                              <div
                                className="h-1.5 rounded-full bg-emerald-500"
                                style={{ width: `${course.completionRate}%` }}
                              />
                            </div>
                            <div className="mt-1 mb-0 flex items-center justify-between text-[10px] text-slate-500">
                              <span>Avg quiz</span>
                              <span>{course.avgQuizScore}%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
              <h2 className="text-lg md:text-xl font-semibold text-slate-900 mb-4">
                Recent Teaching Activity
              </h2>
              <ul className="space-y-3 text-xs">
                {sampleEvents.map((event) => (
                  <li
                    key={event.id}
                    className="flex gap-3 rounded-xl bg-slate-50/80 px-3 py-2.5"
                  >
                    <div className="mt-0.5 text-lg">
                      {getEventEmoji(event.type)}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-slate-900">
                        {event.label}
                      </p>
                      <p className="mt-0.5 text-[11px] text-slate-500">
                        {event.courseTitle}
                      </p>
                      <p className="mt-0.5 text-[11px] text-slate-400">
                        {event.timestamp}
                      </p>
                      <p className="mt-1 text-[11px] text-slate-600">
                        {event.details}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border border-rose-100 bg-rose-50/70 p-5 shadow-sm">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-lg md:text-xl font-semibold text-rose-900">
                  Learners to Check On
                </h2>
                <span className="rounded-full bg-white px-2.5 py-0.5 text-[11px] font-semibold text-rose-700 border border-rose-100">
                  {sampleAtRisk.length} flagged
                </span>
              </div>
              <p className="mb-3 text-[11px] text-rose-900/80">
                These learners have risk signals. A quick touch can keep them from dropping off.
              </p>
              <ul className="space-y-2 text-xs">
                {sampleAtRisk.map((student) => (
                  <li
                    key={student.id}
                    className="rounded-xl bg-white px-3 py-2 border border-rose-100"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-semibold text-slate-900">
                          {student.name}
                        </p>
                        <p className="mt-0.5 text-[11px] text-slate-500">
                          {student.courseTitle}
                        </p>
                        <p className="mt-0.5 text-[11px] text-rose-700">
                          {student.riskReason}
                        </p>
                      </div>
                      <button
                        type="button"
                        className="mt-1 rounded-full bg-rose-600 px-2.5 py-0.5 text-[10px] font-semibold text-white hover:bg-rose-700"
                      >
                        Log outreach
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
              <h2 className="text-lg md:text-xl font-semibold text-slate-900 mb-3">
                Upcoming Live Sessions
              </h2>
              <ul className="space-y-2 text-xs">
                {sampleLiveSessions.map((session) => (
                  <li
                    key={session.id}
                    className="rounded-xl bg-slate-50 px-3 py-2 border border-slate-100"
                  >
                    <p className="font-semibold text-slate-900">
                      {session.title}
                    </p>
                    <p className="mt-0.5 text-[11px] text-slate-500">
                      {session.courseTitle}
                    </p>
                    <p className="mt-0.5 text-[11px] text-slate-600">
                      {session.date} · {session.time} · {session.delivery}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
