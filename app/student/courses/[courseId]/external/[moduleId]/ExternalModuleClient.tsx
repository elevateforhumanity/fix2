"use client";

// app/student/courses/[courseId]/external/[moduleId]/ExternalModuleClient.tsx
// Client component for external partner module interaction

import { supabase } from "@/lib/supabaseClient";
import { useState } from "react";

type Module = {
  id: string;
  course_id: string;
  title: string;
  partner_name: string;
  partner_type: string | null;
  delivery_mode: "api" | "link" | "hybrid";
  launch_url: string;
  external_course_code: string | null;
  description: string | null;
  hours: number | null;
  requires_proof: boolean;
};

type Progress = {
  id: string;
  status: "not_started" | "in_progress" | "submitted" | "approved";
  proof_file_url: string | null;
  notes: string | null;
  external_enrollment_id: string | null;
  external_account_id: string | null;
  progress_percentage: number;
  completed_at: string | null;
  certificate_url: string | null;
  certificate_number: string | null;
};

type Props = {
  userId: string;
  module: Module;
  initialProgress: Progress | null;
};

export default function ExternalModuleClient({
  userId,
  module,
  initialProgress,
}: Props) {
  const [progress, setProgress] = useState<Progress | null>(initialProgress);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const status = progress?.status ?? "not_started";
  const isApiMode = module.delivery_mode === "api";
  const isLinkMode = module.delivery_mode === "link";
  const isHybridMode = module.delivery_mode === "hybrid";

  async function ensureRow(statusOverride?: Progress["status"]) {
    const nextStatus = statusOverride ?? status;

    const { data, error } = await supabase
      .from("external_partner_progress")
      .upsert(
        {
          module_id: module.id,
          user_id: userId,
          status: nextStatus,
        },
        { onConflict: "module_id,user_id" }
      )
      .select()
      .single();

    if (error) throw error;
    setProgress(data as Progress);
    return data as Progress;
  }

  async function handleLaunch() {
    start {
      setMessage(null);
      await ensureRow("in_progress");
      window.open(module.launch_url, "_blank", "noopener,noreferrer");
    } catch (err: any) {
      console.error(err);
      setMessage(err?.message ?? "Error launching external module.");
    }
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setMessage(null);

    start {
      // Create storage path: moduleId/userId/filename
      const path = `${module.id}/${userId}/${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from("external-proof")
        .upload(path, file, { upsert: true });

      if (uploadError) throw uploadError;

      const publicUrl = supabase.storage
        .from("external-proof")
        .getPublicUrl(path).data.publicUrl;

      const { data, error } = await supabase
        .from("external_partner_progress")
        .upsert(
          {
            module_id: module.id,
            user_id: userId,
            status: "submitted",
            proof_file_url: publicUrl,
          },
          { onConflict: "module_id,user_id" }
        )
        .select()
        .single();

      if (error) throw error;
      setProgress(data as Progress);
      setMessage("Proof uploaded. Your instructor or admin will review.");
    } catch (err: any) {
      console.error(err);
      setMessage(err?.message ?? "Error uploading proof.");
    } finally {
      setUploading(false);
    }
  }

  const getStatusBadge = () => {
    const badges = {
      not_started: (
        <span className="inline-flex items-center rounded-full bg-slate-100 px-2 py-1 text-[10px] font-semibold text-slate-700">
          Not Started
        </span>
      ),
      in_progress: (
        <span className="inline-flex items-center rounded-full bg-blue-100 px-2 py-1 text-[10px] font-semibold text-blue-700">
          In Progress
        </span>
      ),
      submitted: (
        <span className="inline-flex items-center rounded-full bg-amber-100 px-2 py-1 text-[10px] font-semibold text-amber-700">
          Submitted - Awaiting Review
        </span>
      ),
      approved: (
        <span className="inline-flex items-center rounded-full bg-emerald-100 px-2 py-1 text-[10px] font-semibold text-emerald-700">
          ✓ Approved
        </span>
      ),
    };
    return badges[status];
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs font-semibold text-emerald-700 uppercase tracking-[0.2em]">
            External Partner Module
          </p>
          {getStatusBadge()}
        </div>
        <h1 className="text-2xl font-semibold mb-1">{module.title}</h1>
        <p className="text-xs text-slate-600 mb-2">
          Delivered by{" "}
          <span className="font-semibold">{module.partner_name}</span> as part
          of your Elevate course. Completion is required for your stacked
          credential.
        </p>
        {module.description && (
          <p className="text-xs text-slate-600 whitespace-pre-line">
            {module.description}
          </p>
        )}
        {module.hours && (
          <p className="mt-1 text-[11px] text-slate-500">
            Approximate time: {module.hours} hour(s)
          </p>
        )}
      </div>

      {/* API Mode Progress Display */}
      {(isApiMode || isHybridMode) && progress?.external_enrollment_id && (
        <div className="rounded-2xl border bg-gradient-to-br from-emerald-50 to-white p-4 shadow-sm">
          <p className="text-xs font-semibold text-slate-700 mb-2">
            API Integration Active
          </p>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-600">Progress:</span>
              <span className="text-xs font-semibold text-emerald-700">
                {progress.progress_percentage}%
              </span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div
                className="bg-emerald-600 h-2 rounded-full transition-all"
                style={{ width: `${progress.progress_percentage}%` }}
              />
            </div>
            {progress.completed_at && (
              <p className="text-[11px] text-slate-600">
                Completed: {new Date(progress.completed_at).toLocaleDateString()}
              </p>
            )}
            {progress.certificate_number && (
              <p className="text-[11px] text-slate-600">
                Certificate: {progress.certificate_number}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Launch Button */}
      <div className="rounded-2xl border bg-white p-4 shadow-sm space-y-3">
        <p className="text-xs font-semibold text-slate-700">
          Step 1 – Launch the partner course
        </p>
        <p className="text-xs text-slate-600">
          Click the button below to open the official {module.partner_name}{" "}
          course in a new tab. Complete all lessons and the final assessment on
          the partner site.
        </p>
        <button
          type="button"
          onClick={handleLaunch}
          className="inline-flex items-center rounded-full bg-emerald-600 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-700 transition-colors"
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
          Open {module.partner_name} Course
        </button>
        {isApiMode && (
          <p className="text-[11px] text-slate-500">
            Your progress will be automatically synced from {module.partner_name}.
          </p>
        )}
      </div>

      {/* Proof Upload (Link Mode or Hybrid) */}
      {(isLinkMode || isHybridMode) && module.requires_proof && (
        <div className="rounded-2xl border bg-white p-4 shadow-sm space-y-3">
          <p className="text-xs font-semibold text-slate-700">
            Step 2 – Upload your certificate or screenshot
          </p>
          <p className="text-xs text-slate-600">
            After finishing the {module.partner_name} course, download your
            certificate or take a screenshot of your completion page. Upload it
            here so we can verify and mark this module complete in Elevate.
          </p>
          <div className="space-y-2">
            <input
              type="file"
              accept="image/*,application/pdf"
              onChange={handleFileChange}
              disabled={uploading || status === "approved"}
              className="text-xs block w-full file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 disabled:opacity-50"
            />
            {uploading && (
              <p className="text-[11px] text-blue-600">Uploading...</p>
            )}
            {progress?.proof_file_url && (
              <div className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-emerald-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="text-[11px] text-emerald-700">
                  Proof on file.{" "}
                  <a
                    href={progress.proof_file_url}
                    target="_blank"
                    rel="noreferrer"
                    className="underline hover:text-emerald-800"
                  >
                    View uploaded document
                  </a>
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Status Messages */}
      {status === "submitted" && (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
          <p className="text-xs text-amber-800">
            <span className="font-semibold">Awaiting Review:</span> Your proof
            has been submitted. An instructor will review and approve your
            completion soon.
          </p>
        </div>
      )}

      {status === "approved" && (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="text-xs text-emerald-800">
            <span className="font-semibold">✓ Module Complete:</span> This
            module has been approved and counts toward your course completion.
          </p>
          {progress?.certificate_url && (
            <a
              href={progress.certificate_url}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-flex items-center text-xs text-emerald-700 hover:text-emerald-800 underline"
            >
              View Certificate
            </a>
          )}
        </div>
      )}

      {message && (
        <div className="rounded-2xl border bg-slate-50 p-4">
          <p className="text-[11px] text-slate-600 whitespace-pre-wrap">
            {message}
          </p>
        </div>
      )}
    </div>
  );
}
