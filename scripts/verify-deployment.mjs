#!/usr/bin/env node

/**
 * Verify Deployment Status
 * Checks if the domain migration completed successfully
 */

const DOMAIN = 'https://www.elevateforhumanity.org';

async function main() {
  console.log('🔍 Verifying Deployment Status');
  console.log('================================\n');

  const checks = {
    buildInfo: false,
    health: false,
    sitemap: false,
    robots: false,
    homepage: false,
  };

  // Check 1: Build Info API
  console.log('1️⃣ Checking build info API...');
  try {
    const response = await fetch(`${DOMAIN}/api/build-info`);
    if (response.ok) {
      const data = await response.json();
      console.log('   ✅ Build info accessible');
      console.log(`   - Build Time: ${data.deployment?.buildTime || 'N/A'}`);
      console.log(`   - Timestamp: ${data.deployment?.timestamp || 'N/A'}`);
      checks.buildInfo = true;
    } else {
      console.log(`   ❌ Build info returned ${response.status}`);
    }
  } catch (error) {
    console.log(`   ❌ Build info failed: ${error.message}`);
  }

  // Check 2: Health API
  console.log('\n2️⃣ Checking health API...');
  try {
    const response = await fetch(`${DOMAIN}/api/health`);
    if (response.ok) {
      const data = await response.json();
      console.log('   ✅ Health check passed');
      console.log(`   - Status: ${data.status}`);
      console.log(`   - Version: ${data.version || 'N/A'}`);
      checks.health = true;
    } else {
      console.log(`   ❌ Health check returned ${response.status}`);
    }
  } catch (error) {
    console.log(`   ❌ Health check failed: ${error.message}`);
  }

  // Check 3: Sitemap
  console.log('\n3️⃣ Checking sitemap.xml...');
  try {
    const response = await fetch(`${DOMAIN}/sitemap.xml`);
    if (response.ok) {
      const text = await response.text();
      const pageCount = (text.match(/<url>/g) || []).length;
      console.log('   ✅ Sitemap accessible');
      console.log(`   - Pages indexed: ${pageCount}`);
      if (text.includes('www.elevateforhumanity.org')) {
        console.log('   ✅ Contains www.elevateforhumanity.org');
        checks.sitemap = true;
      } else {
        console.log('   ❌ Does not contain www.elevateforhumanity.org');
      }
    } else {
      console.log(`   ❌ Sitemap returned ${response.status}`);
    }
  } catch (error) {
    console.log(`   ❌ Sitemap failed: ${error.message}`);
  }

  // Check 4: Robots.txt
  console.log('\n4️⃣ Checking robots.txt...');
  try {
    const response = await fetch(`${DOMAIN}/robots.txt`);
    if (response.ok) {
      const text = await response.text();
      console.log('   ✅ Robots.txt accessible');
      if (text.includes('www.elevateforhumanity.org')) {
        console.log('   ✅ Contains www.elevateforhumanity.org');
        checks.robots = true;
      } else {
        console.log('   ❌ Does not contain www.elevateforhumanity.org');
      }
    } else {
      console.log(`   ❌ Robots.txt returned ${response.status}`);
    }
  } catch (error) {
    console.log(`   ❌ Robots.txt failed: ${error.message}`);
  }

  // Check 5: Homepage
  console.log('\n5️⃣ Checking homepage...');
  try {
    const response = await fetch(DOMAIN);
    if (response.ok) {
      console.log('   ✅ Homepage accessible');
      console.log(`   - Status: ${response.status}`);
      checks.homepage = true;
    } else {
      console.log(`   ❌ Homepage returned ${response.status}`);
    }
  } catch (error) {
    console.log(`   ❌ Homepage failed: ${error.message}`);
  }

  // Summary
  console.log('\n' + '='.repeat(50));
  console.log('📊 SUMMARY');
  console.log('='.repeat(50));

  const passed = Object.values(checks).filter(Boolean).length;
  const total = Object.keys(checks).length;

  console.log(`\nPassed: ${passed}/${total} checks`);
  console.log('');

  Object.entries(checks).forEach(([check, status]) => {
    console.log(`${status ? '✅' : '❌'} ${check}`);
  });

  if (passed === total) {
    console.log('\n🎉 ALL CHECKS PASSED!');
    console.log('✅ Domain migration is complete and working!');
    console.log(`\n🌐 Visit: ${DOMAIN}`);
    process.exit(0);
  } else {
    console.log('\n⚠️  SOME CHECKS FAILED');
    console.log('The deployment may still be in progress.');
    console.log('Wait 2-3 minutes and run this script again.');
    console.log('\nCommand: node scripts/verify-deployment.mjs');
    process.exit(1);
  }
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
