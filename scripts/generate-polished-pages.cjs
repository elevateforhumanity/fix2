#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const APP_DIR = path.join(process.cwd(), "app");
const PAGE_FILES = new Set(["page.tsx", "page.jsx", "page.ts", "page.js"]);

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (PAGE_FILES.has(entry.name)) out.push(full);
  }
  return out;
}

function fileToRoute(filePath) {
  if (path.relative(APP_DIR, filePath).replace(/\\/g, "/") === "page.tsx") return "/";
  const rel = path.relative(APP_DIR, filePath).replace(/\\/g, "/");
  const parts = rel.split("/"); parts.pop();
  const segments = parts.filter(Boolean);
  return segments.length === 0 ? "/" : "/" + segments.join("/");
}

function routeToLabel(route) {
  if (route === "/") return "Home";
  const segs = route.split("/").filter(Boolean);
  const last = segs[segs.length - 1] || route;
  if (last === "faq") return "FAQ";
  if (last === "lms") return "LMS";
  return last.replace(/-/g, " ").split(" ").map(w => w[0].toUpperCase() + w.slice(1)).join(" ");
}

function routeToSectionTitle(route) {
  if (route === "/") return "Main Pages";
  if (["/about","/contact","/apply","/blog","/faq","/success-stories","/get-started","/sitemap-page"].includes(route)) return "Main Pages";
  if (route.startsWith("/programs")) return "Programs";
  if (route.startsWith("/funding")) return "Funding";
  if (route.startsWith("/student") || route.startsWith("/students")) return "For Students";
  if (route.startsWith("/lms") || route.startsWith("/courses")) return "LMS";
  if (route.startsWith("/credentials")) return "Credentials";
  if (route.startsWith("/employers")) return "For Employers";
  if (route.startsWith("/program-holders")) return "Program Holders";
  if (route.startsWith("/career-services") || route.startsWith("/career-center")) return "Career Services";
  if (route.startsWith("/admin") || route.startsWith("/staff")) return "Admin & Staff";
  if (route.startsWith("/community") || route.startsWith("/partners")) return "Community";
  if (route.startsWith("/legal")) return "Legal & Policies";
  if (route.startsWith("/hr")) return "HR & Payroll";
  if (route.startsWith("/case-management") || route.startsWith("/delegate")) return "Case Management";
  if (route.startsWith("/boards")) return "Boards";
  if (route.startsWith("/programs/kingdom") || route.startsWith("/programs/vita") || route.startsWith("/programs/serene") || route.startsWith("/programs/urban") || route.startsWith("/programs/selfish")) return "Special Programs";
  if (route.startsWith("/tools")) return "Tools";
  if (route.startsWith("/builders")) return "Builders";
  if (route.startsWith("/documents")) return "Documents";
  if (route.startsWith("/instructor")) return "Instructor";
  if (route.startsWith("/reports") || route.startsWith("/analytics")) return "Reports & Analytics";
  return "Other";
}

function makePageContent(route, label, sectionTitle) {
  const safeLabel = label.replace(/"/g, '\\"');
  const safeSection = sectionTitle.replace(/"/g, '\\"');
  const title = `${safeLabel} | Elevate For Humanity`;
  const description = `Learn more about ${safeLabel} inside the Elevate For Humanity workforce ecosystem.`;
  return `import type { Metadata } from "next";
import { AutoPolishedPage } from "@/components/layouts/AutoPolishedPage";

export const metadata: Metadata = {
  title: "${title}",
  description: "${description}",
};

export default function Page() {
  return (
    <AutoPolishedPage
      route="${route}"
      label="${safeLabel}"
      section="${safeSection}"
    />
  );
}
`;
}

(function main(){
  if (!fs.existsSync(APP_DIR)) {
    console.error("❌ app/ directory not found. Run from your Next.js repo root.");
    process.exit(1);
  }
  console.log("🔍 Scanning app/ for page files...");
  const files = walk(APP_DIR);
  if (!files.length) { console.log("No page files found."); return; }

  let total = 0;
  for (const filePath of files) {
    const route = fileToRoute(filePath);
    if (!route.startsWith("/") || route.startsWith("/api")) continue;
    const label = routeToLabel(route);
    const sectionTitle = routeToSectionTitle(route);
    const content = makePageContent(route, label, sectionTitle);
    fs.writeFileSync(filePath, content, "utf8");
    total++;
    console.log("✅ Polished:", path.relative(process.cwd(), filePath), "->", route);
  }
  console.log(`\n✨ Done. Polished ${total} pages using AutoPolishedPage.`);
  console.log("   Review with \`git diff\`, then run \`npm run build\`.");
})();
