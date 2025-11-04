#!/usr/bin/env node
/**
 * Deployment Fallback System
 * Creates alternate deployment options when API keys are not available
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

console.log('🔄 Setting up deployment fallback options...\n');

// Check what's available
const checks = {
  netlify_cli: false,
  git: false,
  dist_exists: false,
  env_configured: false,
};

try {
  execSync('netlify --version', { stdio: 'ignore' });
  checks.netlify_cli = true;
} catch {}

try {
  execSync('git --version', { stdio: 'ignore' });
  checks.git = true;
} catch {}

checks.dist_exists = fs.existsSync('./dist');
checks.env_configured =
  fs.existsSync('./.env') &&
  fs.readFileSync('./.env', 'utf8').includes('VITE_SUPABASE_URL');

console.log('📊 System Status:');
console.log(`  ${checks.netlify_cli ? '✅' : '❌'} Netlify CLI`);
console.log(`  ${checks.git ? '✅' : '❌'} Git`);
console.log(`  ${checks.dist_exists ? '✅' : '❌'} Build output (dist/)`);
console.log(`  ${checks.env_configured ? '✅' : '❌'} Environment configured`);
console.log('');

// Generate deployment options
const options = [];

if (checks.dist_exists) {
  options.push({
    name: 'Manual Netlify Drop',
    description: 'Drag and drop dist/ folder to Netlify',
    steps: [
      '1. Go to https://app.netlify.com/drop',
      '2. Drag the dist/ folder from your file explorer',
      '3. Site will be live instantly with a random URL',
      '4. Optional: Connect to your GitHub repo for continuous deployment',
    ],
  });

  options.push({
    name: 'Netlify CLI (No Auth)',
    description: 'Deploy without authentication using deploy command',
    command: 'npx netlify-cli deploy --dir=dist --prod',
    steps: [
      '1. Run: npx netlify-cli deploy --dir=dist',
      '2. Follow prompts to create new site or link existing',
      '3. Confirm production deployment',
    ],
  });
}

if (checks.git) {
  options.push({
    name: 'GitHub Pages',
    description: 'Free hosting via GitHub Pages',
    steps: [
      '1. Push dist/ contents to gh-pages branch',
      '2. Enable GitHub Pages in repo settings',
      '3. Site available at: https://elevateforhumanity.github.io/fix2',
    ],
    command: 'npm run deploy:gh-pages',
  });

  options.push({
    name: 'Vercel (No Config)',
    description: 'Deploy to Vercel with zero configuration',
    steps: [
      '1. Install: npm i -g vercel',
      '2. Run: vercel --prod',
      '3. Follow prompts (no account needed for first deploy)',
      '4. Site live in ~30 seconds',
    ],
    command: 'npx vercel --prod',
  });
}

options.push({
  name: 'Static File Server',
  description: 'Run locally or on any server',
  command: 'npx serve dist -p 8080',
  steps: [
    '1. Run: npx serve dist -p 8080',
    '2. Access at http://localhost:8080',
    '3. For production: Copy dist/ to any web server',
  ],
});

// Create deployment scripts
const deployScripts = {
  'deploy-manual.sh': `#!/bin/bash
# Manual deployment helper
echo "🚀 Manual Deployment Options"
echo ""
echo "Option 1: Netlify Drop (Easiest)"
echo "  → Open: https://app.netlify.com/drop"
echo "  → Drag: ./dist folder"
echo ""
echo "Option 2: Netlify CLI"
echo "  → Run: npx netlify-cli deploy --dir=dist --prod"
echo ""
echo "Option 3: GitHub Pages"
echo "  → Run: npm run deploy:gh-pages"
echo ""
echo "Option 4: Vercel"
echo "  → Run: npx vercel --prod"
echo ""
echo "Option 5: Local Preview"
echo "  → Run: npx serve dist -p 8080"
echo ""
`,

  'deploy-gh-pages.sh': `#!/bin/bash
# Deploy to GitHub Pages without API keys
set -e

echo "📦 Building for GitHub Pages..."
npm run build

echo "🌿 Creating gh-pages branch..."
git checkout -b gh-pages 2>/dev/null || git checkout gh-pages

echo "📋 Copying dist contents..."
cp -r dist/* .
git add .
git commit -m "Deploy to GitHub Pages" || true

echo "🚀 Pushing to GitHub..."
git push origin gh-pages --force

echo "✅ Deployed! Enable GitHub Pages in repo settings."
echo "   Settings → Pages → Source: gh-pages branch"
git checkout main
`,

  'deploy-vercel.sh': `#!/bin/bash
# Deploy to Vercel (no auth needed for first deploy)
set -e

echo "📦 Building..."
npm run build

echo "🚀 Deploying to Vercel..."
npx vercel --prod --yes

echo "✅ Deployed to Vercel!"
`,

  'serve-local.sh': `#!/bin/bash
# Serve locally
npm run build
echo "🌐 Starting local server..."
npx serve dist -p 8080
`,
};

// Write scripts
const scriptsDir = './scripts';
if (!fs.existsSync(scriptsDir)) {
  fs.mkdirSync(scriptsDir, { recursive: true });
}

for (const [filename, content] of Object.entries(deployScripts)) {
  const filepath = path.join(scriptsDir, filename);
  fs.writeFileSync(filepath, content);
  try {
    fs.chmodSync(filepath, '755');
  } catch {}
  console.log(`✅ Created: ${filepath}`);
}

// Update package.json with new scripts
const packageJsonPath = './package.json';
if (fs.existsSync(packageJsonPath)) {
  const pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

  pkg.scripts = pkg.scripts || {};
  pkg.scripts['deploy:manual'] = 'bash scripts/deploy-manual.sh';
  pkg.scripts['deploy:gh-pages'] = 'bash scripts/deploy-gh-pages.sh';
  pkg.scripts['deploy:vercel'] = 'bash scripts/deploy-vercel.sh';
  pkg.scripts['deploy:local'] = 'bash scripts/serve-local.sh';
  pkg.scripts['deploy:netlify-drop'] =
    'echo "Open https://app.netlify.com/drop and drag the dist/ folder"';

  fs.writeFileSync(packageJsonPath, JSON.stringify(pkg, null, 2));
  console.log('✅ Updated package.json with deployment scripts\n');
}

// Print options
console.log('🎯 Available Deployment Options:\n');
options.forEach((opt, i) => {
  console.log(`${i + 1}. ${opt.name}`);
  console.log(`   ${opt.description}`);
  if (opt.command) {
    console.log(`   Command: ${opt.command}`);
  }
  if (opt.steps) {
    opt.steps.forEach((step) => console.log(`   ${step}`));
  }
  console.log('');
});

// Create deployment guide
const guide = `# Deployment Options (No API Keys Required)

## Quick Start - Choose One:

### 1. Netlify Drop (Easiest - 30 seconds)
\`\`\`bash
npm run build
# Then open https://app.netlify.com/drop
# Drag the dist/ folder
\`\`\`

### 2. Vercel (Fast - 1 minute)
\`\`\`bash
npm run deploy:vercel
# Follow prompts, no account needed initially
\`\`\`

### 3. GitHub Pages (Free Forever)
\`\`\`bash
npm run deploy:gh-pages
# Then enable in repo settings
\`\`\`

### 4. Local Preview
\`\`\`bash
npm run deploy:local
# Access at http://localhost:8080
\`\`\`

## Available Commands:
- \`npm run deploy:manual\` - Show all options
- \`npm run deploy:gh-pages\` - Deploy to GitHub Pages
- \`npm run deploy:vercel\` - Deploy to Vercel
- \`npm run deploy:local\` - Run local server
- \`npm run deploy:netlify-drop\` - Instructions for Netlify Drop

## Current Status:
${checks.dist_exists ? '✅' : '❌'} Build ready (dist/ folder exists)
${checks.git ? '✅' : '❌'} Git available
${checks.netlify_cli ? '✅' : '❌'} Netlify CLI installed
${checks.env_configured ? '✅' : '❌'} Environment configured

## Recommended: Netlify Drop
1. Build: \`npm run build\`
2. Open: https://app.netlify.com/drop
3. Drag: dist/ folder
4. Done! Site is live

No API keys, no authentication, no configuration needed.
`;

fs.writeFileSync('./DEPLOYMENT_OPTIONS.md', guide);
console.log('✅ Created: DEPLOYMENT_OPTIONS.md');
console.log('\n📖 Read DEPLOYMENT_OPTIONS.md for detailed instructions');
console.log(
  '🚀 Quickest option: npm run build && open https://app.netlify.com/drop\n'
);
