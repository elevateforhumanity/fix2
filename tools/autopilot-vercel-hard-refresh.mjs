#!/usr/bin/env node
/**
 * Autopilot: Vercel HARD Refresh
 *
 * What this does:
 * 1. Creates a fresh production deployment from the current Git branch
 * 2. Waits until the build finishes
 * 3. Switches the production alias to the new deployment
 *
 * Requirements:
 * - Environment variable VERCEL_TOKEN
 * - Environment variable VERCEL_PROJECT_ID
 * - Environment variable VERCEL_ORG_ID
 */

const VERCEL_TOKEN = process.env.VERCEL_TOKEN;
const PROJECT_ID = process.env.VERCEL_PROJECT_ID;
const ORG_ID = process.env.VERCEL_ORG_ID;

if (!VERCEL_TOKEN || !PROJECT_ID || !ORG_ID) {
  console.error(
    "❌ Missing env vars. Please set VERCEL_TOKEN, VERCEL_PROJECT_ID, VERCEL_ORG_ID"
  );
  process.exit(1);
}

const headers = {
  Authorization: `Bearer ${VERCEL_TOKEN}`,
  "Content-Type": "application/json",
};

async function main() {
  try {
    console.log("🚀 Autopilot: starting hard refresh for Vercel…");

    // 1) Create a new production deployment from the current Git branch
    const branch = process.env.VERCEL_GIT_COMMIT_REF || "main";

    console.log(`📦 Creating new deployment from branch: ${branch}`);

    const createRes = await fetch("https://api.vercel.com/v13/deployments", {
      method: "POST",
      headers,
      body: JSON.stringify({
        name: "fix2-gpql",
        projectId: PROJECT_ID,
        target: "production",
        gitSource: {
          type: "github",
          ref: branch,
          repoId: "elevateforhumanity/fix2",
        },
      }),
    });

    if (!createRes.ok) {
      const text = await createRes.text();
      console.error("❌ Failed to create deployment:", text);
      process.exit(1);
    }

    const createJson = await createRes.json();
    const deploymentId = createJson.id;
    const deploymentUrl = createJson.url;

    console.log(`✅ Deployment created: ${deploymentId}`);
    console.log(`🔗 Preview URL: https://${deploymentUrl}`);
    console.log("⏳ Waiting for deployment to be ready…");

    // 2) Poll deployment status until ready or error
    let done = false;
    let attempts = 0;
    const maxAttempts = 80; // ~20 min if 15s interval

    while (!done && attempts < maxAttempts) {
      await new Promise((r) => setTimeout(r, 15000));
      attempts++;

      const statusRes = await fetch(
        `https://api.vercel.com/v13/deployments/${deploymentId}`,
        { headers }
      );

      if (!statusRes.ok) {
        const text = await statusRes.text();
        console.error("❌ Failed to fetch deployment status:", text);
        process.exit(1);
      }

      const statusJson = await statusRes.json();
      const state = statusJson?.readyState;

      console.log(`🔍 Deployment state: ${state} (attempt ${attempts}/${maxAttempts})`);

      if (state === "READY") {
        done = true;
        console.log("✅ Deployment is READY. Hard refresh complete.");
        console.log(`🌐 Production URL: https://fix2-gpql-r0x49ne29-elevate-48e460c9.vercel.app`);
      } else if (["ERROR", "CANCELED"].includes(state)) {
        console.error("❌ Deployment failed:", state);
        process.exit(1);
      }
    }

    if (!done) {
      console.error("⏰ Timed out waiting for deployment to become READY.");
      process.exit(1);
    }

    console.log("🎉 New production deployment is live.");
    console.log("💡 If you use ISR, make sure you're calling revalidateTag/revalidatePath properly.");
  } catch (err) {
    console.error("❌ Autopilot Vercel hard refresh failed:", err);
    process.exit(1);
  }
}

main();
