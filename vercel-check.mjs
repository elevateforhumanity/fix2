#!/usr/bin/env node
// vercel-check.mjs - Pre-build validation for Vercel deployments

console.log("🔎 Vercel Build Environment Check");
console.log("=" .repeat(50));

// Node version check
console.log("\n📦 Runtime Information:");
console.log(`  Node version: ${process.version}`);
console.log(`  NODE_ENV: ${process.env.NODE_ENV || "(not set)"}`);
console.log(`  Platform: ${process.platform}`);
console.log(`  Architecture: ${process.arch}`);

// Critical environment variables
console.log("\n🔐 Critical Environment Variables:");
const criticalVars = [
  "NEXT_PUBLIC_SITE_URL",
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  "SUPABASE_SERVICE_ROLE_KEY",
  "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY",
  "STRIPE_SECRET_KEY",
];

let missingCritical = 0;
criticalVars.forEach((varName) => {
  const value = process.env[varName];
  if (value) {
    console.log(`  ✅ ${varName}: [set]`);
  } else {
    console.log(`  ❌ ${varName}: (not set)`);
    missingCritical++;
  }
});

// Optional but recommended variables
console.log("\n⚙️  Optional Environment Variables:");
const optionalVars = [
  "RESEND_API_KEY",
  "NEXT_PUBLIC_GA_MEASUREMENT_ID",
  "NEXT_PUBLIC_FACEBOOK_PIXEL_ID",
];

optionalVars.forEach((varName) => {
  const value = process.env[varName];
  if (value) {
    console.log(`  ✅ ${varName}: [set]`);
  } else {
    console.log(`  ⚠️  ${varName}: (not set)`);
  }
});

// Advanced optional features (not needed for basic deployment)
console.log("\n🔧 Advanced Features (Optional - can add later):");
const advancedVars = [
  "NEXT_PUBLIC_VAPID_PUBLIC_KEY",
  "OPENAI_API_KEY",
];

let advancedSet = 0;
advancedVars.forEach((varName) => {
  const value = process.env[varName];
  if (value) {
    console.log(`  ✅ ${varName}: [set]`);
    advancedSet++;
  }
});

if (advancedSet === 0) {
  console.log(`  ℹ️  No advanced features configured (Push Notifications, AI features)`);
  console.log(`     These can be added later when needed`);
}

// Check for heavy dependencies
console.log("\n📚 Heavy Dependencies Check:");
const heavyDeps = [
  "@ffmpeg-installer/ffmpeg",
  "@ffprobe-installer/ffprobe",
  "@google-cloud/text-to-speech",
  "@aws-sdk/client-s3",
  "@react-pdf/renderer",
];

try {
  const fs = await import("fs");
  const packageJson = JSON.parse(
    fs.readFileSync("./package.json", "utf-8")
  );
  
  heavyDeps.forEach((dep) => {
    if (packageJson.dependencies[dep]) {
      console.log(`  ⚠️  ${dep}: ${packageJson.dependencies[dep]}`);
      console.log(`     → Must use runtime='nodejs' in API routes`);
    }
  });
} catch (err) {
  console.log(`  ❌ Could not read package.json: ${err.message}`);
}

// Summary
console.log("\n" + "=".repeat(50));
if (missingCritical > 0) {
  console.log(`❌ ${missingCritical} critical environment variable(s) missing`);
  console.log("⚠️  Build may fail or app may not function correctly");
} else {
  console.log("✅ All critical environment variables are set");
}

console.log("\n💡 Reminder: Heavy server-side libraries must only be used in:");
console.log("   - API routes with: export const runtime = 'nodejs'");
console.log("   - Server components (not client components)");
console.log("   - Background scripts (not browser code)");
console.log("");

// Exit with warning code if critical vars missing (but don't fail build)
if (missingCritical > 0) {
  console.log("⚠️  Continuing build despite missing variables...\n");
}
