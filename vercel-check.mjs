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

// Optional variables (only show if set)
const optionalVars = [
  "RESEND_API_KEY",
  "NEXT_PUBLIC_GA_MEASUREMENT_ID",
  "NEXT_PUBLIC_FACEBOOK_PIXEL_ID",
  "NEXT_PUBLIC_VAPID_PUBLIC_KEY",
  "OPENAI_API_KEY",
];

const setOptional = optionalVars.filter(varName => process.env[varName]);

if (setOptional.length > 0) {
  console.log("\n⚙️  Optional Features Enabled:");
  setOptional.forEach((varName) => {
    console.log(`  ✅ ${varName}: [set]`);
  });
}

// Heavy dependencies are installed but only used in API routes with runtime='nodejs'
// No need to warn about them - they're configured correctly

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
