#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const issues = {
  stillHasPlaceholderItems: [],
  stillHasDuplicateSupabase: [],
  missingImports: [],
  syntaxIssues: [],
  clean: []
};

function verifyFile(filePath, relativePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  
  const hasPlaceholderItems = content.includes("from('items')");
  const duplicateSupabaseCount = (content.match(/const supabase = await createClient\(\)/g) || []).length;
  const hasDuplicateSupabase = duplicateSupabaseCount > 1;
  
  // Check for missing imports
  const usesSupabase = content.includes('supabase');
  const hasSupabaseImport = content.includes("from '@/lib/supabase/");
  const missingImport = usesSupabase && !hasSupabaseImport;
  
  // Basic syntax check
  const hasUnmatchedBraces = (content.match(/{/g) || []).length !== (content.match(/}/g) || []).length;
  const hasUnmatchedParens = (content.match(/\(/g) || []).length !== (content.match(/\)/g) || []).length;
  const syntaxIssue = hasUnmatchedBraces || hasUnmatchedParens;
  
  if (hasPlaceholderItems) {
    issues.stillHasPlaceholderItems.push(relativePath);
  } else if (hasDuplicateSupabase) {
    issues.stillHasDuplicateSupabase.push(relativePath);
  } else if (missingImport) {
    issues.missingImports.push(relativePath);
  } else if (syntaxIssue) {
    issues.syntaxIssues.push(relativePath);
  } else {
    issues.clean.push(relativePath);
  }
}

function scanDirectory(dir, baseDir = dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relativePath = path.relative(baseDir, fullPath);
    
    if (entry.name === 'node_modules' || entry.name === '.next' || entry.name === '.git') {
      continue;
    }
    
    if (entry.isDirectory()) {
      scanDirectory(fullPath, baseDir);
    } else if (entry.name === 'page.tsx' || entry.name === 'page.ts') {
      verifyFile(fullPath, relativePath);
    }
  }
}

console.log('🔍 Verifying all fixes...\n');

const appDir = path.join(__dirname, 'app');
scanDirectory(appDir);

const totalPages = Object.values(issues).reduce((sum, arr) => sum + arr.length, 0);

console.log('📊 VERIFICATION REPORT\n');
console.log('=' .repeat(60));

console.log('\n✅ CLEAN PAGES:\n');
console.log(`  ${issues.clean.length} pages have no issues`);

console.log('\n⚠️  REMAINING ISSUES:\n');
console.log(`  Placeholder 'items' table:     ${issues.stillHasPlaceholderItems.length.toString().padStart(4)} pages`);
console.log(`  Duplicate supabase init:       ${issues.stillHasDuplicateSupabase.length.toString().padStart(4)} pages`);
console.log(`  Missing imports:               ${issues.missingImports.length.toString().padStart(4)} pages`);
console.log(`  Syntax issues:                 ${issues.syntaxIssues.length.toString().padStart(4)} pages`);

console.log('\n' + '='.repeat(60));

const successRate = ((issues.clean.length / totalPages) * 100).toFixed(1);
console.log(`\n📈 Success Rate: ${successRate}% (${issues.clean.length}/${totalPages} pages)\n`);

if (issues.stillHasPlaceholderItems.length > 0) {
  console.log('⚠️  Pages still with placeholder items:');
  issues.stillHasPlaceholderItems.slice(0, 10).forEach(p => console.log(`     ${p}`));
  if (issues.stillHasPlaceholderItems.length > 10) {
    console.log(`     ... and ${issues.stillHasPlaceholderItems.length - 10} more`);
  }
  console.log('');
}

// Save verification report
const report = {
  timestamp: new Date().toISOString(),
  totalPages,
  successRate: parseFloat(successRate),
  issues,
  summary: {
    clean: issues.clean.length,
    stillHasPlaceholderItems: issues.stillHasPlaceholderItems.length,
    stillHasDuplicateSupabase: issues.stillHasDuplicateSupabase.length,
    missingImports: issues.missingImports.length,
    syntaxIssues: issues.syntaxIssues.length
  }
};

fs.writeFileSync(
  path.join(__dirname, 'VERIFICATION_REPORT.json'),
  JSON.stringify(report, null, 2),
  'utf8'
);

console.log('✅ Verification report saved to VERIFICATION_REPORT.json\n');
