import fs from "node:fs";
import path from "node:path";

const data = JSON.parse(fs.readFileSync(".autopilot/reports/errors.json", "utf8"));
const errors = data.errors;

// Bucket strategy: group by top folder to keep changes coherent
function topBucket(file) {
  const norm = file.replace(/\\/g, "/");
  const parts = norm.split("/");
  
  // Customize these to match your repo layout
  if (norm.includes("/api/admin/")) return "api-admin";
  if (norm.includes("/api/affirm/")) return "api-affirm";
  if (norm.includes("/api/ai")) return "api-ai";
  if (norm.includes("/api/analytics/")) return "api-analytics";
  if (norm.includes("/api/autopilots/")) return "api-autopilots";
  if (norm.includes("/api/billing/")) return "api-billing";
  if (norm.includes("/api/cert")) return "api-cert";
  if (norm.includes("/api/certificates/")) return "api-certificates";
  if (norm.includes("/api/contact")) return "api-contact";
  if (norm.includes("/api/courses/")) return "api-courses";
  if (norm.includes("/api/enrollment")) return "api-enrollment";
  if (norm.includes("/api/lms/")) return "api-lms";
  if (norm.includes("/api/org/")) return "api-org";
  if (norm.includes("/api/reports/")) return "api-reports";
  if (norm.includes("/api/stripe/")) return "api-stripe";
  if (norm.includes("/api/")) return "api-other";
  
  if (norm.includes("/app/admin/")) return "app-admin";
  if (norm.includes("/app/lms/")) return "app-lms";
  if (norm.includes("/app/staff/")) return "app-staff";
  if (norm.includes("/app/")) return "app-pages";
  
  if (norm.includes("/components/dashboard/")) return "components-dashboard";
  if (norm.includes("/components/lms/")) return "components-lms";
  if (norm.includes("/components/ui/")) return "components-ui";
  if (norm.includes("/components/")) return "components-other";
  
  if (norm.includes("/lib/org/")) return "lib-org";
  if (norm.includes("/lib/billing/")) return "lib-billing";
  if (norm.includes("/lib/reports/")) return "lib-reports";
  if (norm.includes("/lib/auth")) return "lib-auth";
  if (norm.includes("/lib/supabase")) return "lib-supabase";
  if (norm.includes("/lib/")) return "lib-other";
  
  if (norm.includes("/workers/")) return "workers";
  if (norm.includes("/supabase/")) return "supabase";
  
  return parts[0] || "root";
}

const buckets = new Map();
for (const e of errors) {
  const b = topBucket(e.file);
  if (!buckets.has(b)) buckets.set(b, []);
  buckets.get(b).push(e);
}

// Flatten buckets but keep locality
const ordered = [...buckets.entries()]
  .sort((a,b) => b[1].length - a[1].length)
  .flatMap(([_, list]) => list);

const AUTOPILOTS = 40;
const missions = Array.from({ length: AUTOPILOTS }, (_, i) => ({
  id: i + 1,
  errors: [],
}));

// Greedy balance
for (const e of ordered) {
  missions.sort((a,b) => a.errors.length - b.errors.length);
  missions[0].errors.push(e);
}

fs.mkdirSync(".autopilot/tasks", { recursive: true });

for (const m of missions) {
  const lines = [];
  lines.push(`# Autopilot ${String(m.id).padStart(2,"0")} Mission`);
  lines.push(`Assigned errors: ${m.errors.length}`);
  lines.push(``);
  lines.push(`## Rules`);
  lines.push(`- No @ts-ignore, no any, no masking tsconfig, no disabling lint.`);
  lines.push(`- Fix the type OR add runtime validation (zod/etc) where data is unknown.`);
  lines.push(`- Add/adjust tests when changing logic.`);
  lines.push(``);
  lines.push(`## Error List (file:line:col code)`);
  for (const e of m.errors) {
    lines.push(`- ${e.file}:${e.line}:${e.col} ${e.code} — ${e.msg}`);
  }
  lines.push(``);
  lines.push(`## Proof of Done (paste outputs)`);
  lines.push(`- pnpm -s typecheck`);
  lines.push(`- pnpm -s lint`);
  lines.push(`- pnpm -s test`);
  lines.push(``);
  fs.writeFileSync(`.autopilot/tasks/autopilot-${String(m.id).padStart(2,"0")}.md`, lines.join("\n"));
}

console.log(`Wrote 40 mission files into .autopilot/tasks/`);
console.log(`\nBucket distribution:`);
[...buckets.entries()]
  .sort((a,b) => b[1].length - a[1].length)
  .forEach(([bucket, errs]) => {
    console.log(`  ${bucket.padEnd(25)} ${errs.length} errors`);
  });
