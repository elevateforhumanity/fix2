"use client";

import { useState } from "react";
import type { Lesson } from "@/lms-data/courses";
import { getScormPackageById } from "@/lms-data/scorm";

interface Props {
  lesson: Lesson;
}

export function ScormLaunchPanel({ lesson }: Props) {
  const [launched, setLaunched] = useState(false);

  if (lesson.type !== "scorm" || !lesson.scormPackageId) {
    return (
      <div className="rounded-lg border border-slate-800 bg-slate-950/80 p-4 text-xs text-slate-200">
        This lesson is not configured as a SCORM / JRI launch yet.
      </div>
    );
  }

  const pkg = getScormPackageById(lesson.scormPackageId);

  const handleLaunch = () => {
    if (pkg?.launchUrl) {
      window.open(pkg.launchUrl, "_blank", "noopener,noreferrer");
      setLaunched(true);
    } else {
      alert(
        "This SCORM package does not have a launch URL configured yet. Ask Elevate staff to connect the SCORM host."
      );
    }
  };

  return (
    <div className="space-y-3 rounded-lg border border-slate-800 bg-slate-950/80 p-4 text-xs text-slate-200">
      <p className="text-[11px] font-semibold text-white">{lesson.title}</p>
      {lesson.description && (
        <p className="text-slate-300">{lesson.description}</p>
      )}
      <div className="rounded-md border border-slate-700 bg-slate-900/90 px-3 py-2 text-[11px] text-slate-200">
        <p className="font-semibold">
          {pkg?.title || "SCORM / JRI Module Launch"}
        </p>
        {pkg?.provider && (
          <p className="mt-0.5 text-[10px] text-slate-400">
            Provider: {pkg.provider}
          </p>
        )}
        {pkg?.notes && (
          <p className="mt-1 text-[10px] text-slate-400">
            {pkg.notes}
          </p>
        )}
      </div>
      <button
        type="button"
        onClick={handleLaunch}
        className="inline-flex h-9 items-center justify-center rounded-md bg-red-600 px-4 text-[11px] font-semibold text-white hover:bg-red-700"
      >
        Launch Training in New Window
      </button>
      {launched && (
        <p className="text-[10px] text-green-300">
          We opened the training in a new tab. When you finish, return here to
          continue your Elevate course.
        </p>
      )}
      <p className="text-[10px] text-slate-500">
        This button will eventually connect directly to your hosted SCORM 2004
        packages (JRI or others). Right now it&apos;s a placeholder shell so
        your LMS structure is ready.
      </p>
    </div>
  );
}
