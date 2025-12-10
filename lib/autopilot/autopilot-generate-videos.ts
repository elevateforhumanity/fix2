#!/usr/bin/env tsx
/**
 * AUTOPILOT (safe default)
 * Exits gracefully unless OPENAI_API_KEY and Supabase creds are present.
 */
import fs from "node:fs";
import path from "node:path";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

async function main() {
  if (!OPENAI_API_KEY || !SUPABASE_URL || !SUPABASE_KEY) {
    console.log("⚠️  Autopilot video generation disabled (missing env).");
    process.exit(0);
  }
  // TODO: your real generation logic lives here
  console.log("✅ Env present. (Generation implementation intentionally noop here.)");
}

main().catch((err) => {
  console.error("❌ Fatal:", err?.message || err);
  process.exit(1);
});
