#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname);

console.log('🔍 Checking for broken imports, links, and bugs...\n');

const issues = {
  brokenImports: [],
  brokenLinks: [],
  missingComponents: [],
  duplicateRoutes: []
};

// Check if a file exists with common extensions
function fileExists(basePath, importPath) {
  const extensions = ['', '.ts', '.tsx', '.js', '.jsx', '/index.ts', '/index.tsx', '/index.js', '/index.jsx'];
  
  for (const ext of extensions) {
    const fullPath = path.join(basePath, importPath + ext);
    if (fs.existsSync(fullPath)) {
      return true;
    }
  }
  return false;
}

// Recursively check files
function checkDirectory(dir, basePath = '') {
  if (!fs.existsSync(dir)) return;
  
  const items = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    
    // Skip certain directories
    if (item.isDirectory()) {
      if (['node_modules', '.next', '.git', 'dist', 'build', '.vercel'].includes(item.name)) {
        continue;
      }
      checkDirectory(fullPath, path.join(basePath, item.name));
      continue;
    }
    
    // Only check TypeScript/JavaScript files
    if (!['.ts', '.tsx', '.js', '.jsx'].includes(path.extname(item.name))) {
      continue;
    }
    
    const relativePath = path.join(basePath, item.name);
    checkFile(fullPath, relativePath);
  }
}

function checkFile(filePath, relativePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');
    
    lines.forEach((line, index) => {
      const lineNum = index + 1;
      
      // Check imports
      const importMatch = line.match(/import\s+.*?\s+from\s+['"](.+?)['"]/);
      if (importMatch) {
        const importPath = importMatch[1];
        
        // Check @/ imports
        if (importPath.startsWith('@/')) {
          const resolvedPath = importPath.replace('@/', '');
          if (!fileExists(rootDir, resolvedPath)) {
            issues.brokenImports.push({
              file: relativePath,
              line: lineNum,
              import: importPath,
              type: 'alias'
            });
          }
        }
        // Check relative imports
        else if (importPath.startsWith('.')) {
          const baseDir = path.dirname(filePath);
          const resolvedPath = path.resolve(baseDir, importPath);
          const relativeToRoot = path.relative(rootDir, resolvedPath);
          
          if (!fileExists(rootDir, relativeToRoot)) {
            issues.brokenImports.push({
              file: relativePath,
              line: lineNum,
              import: importPath,
              type: 'relative'
            });
          }
        }
      }
      
      // Check Link href and router.push
      const linkMatch = line.match(/(?:href|to|push)\s*=\s*['"]([^'"]+)['"]/);
      if (linkMatch) {
        const linkPath = linkMatch[1];
        
        // Only check internal links (starting with /)
        if (linkPath.startsWith('/') && !linkPath.startsWith('//')) {
          // Remove query params and hash
          const cleanPath = linkPath.split('?')[0].split('#')[0];
          
          // Check if route exists
          const routePath = cleanPath === '/' ? 'app/page.tsx' : `app${cleanPath}/page.tsx`;
          
          if (!fs.existsSync(path.join(rootDir, routePath))) {
            // Check for dynamic routes
            const parts = cleanPath.split('/').filter(Boolean);
            let found = false;
            
            // Try to find dynamic route
            for (let i = parts.length; i > 0; i--) {
              const testParts = parts.slice(0, i);
              const testPath = testParts.join('/');
              const dynamicPath = `app/${testPath}/[...slug]/page.tsx`;
              const dynamicPath2 = `app/${testPath}/[slug]/page.tsx`;
              
              if (fs.existsSync(path.join(rootDir, dynamicPath)) || 
                  fs.existsSync(path.join(rootDir, dynamicPath2))) {
                found = true;
                break;
              }
            }
            
            if (!found) {
              issues.brokenLinks.push({
                file: relativePath,
                line: lineNum,
                link: linkPath
              });
            }
          }
        }
      }
    });
  } catch (error) {
    console.error(`Error checking ${relativePath}: ${error.message}`);
  }
}

// Start checking
console.log('Checking app directory...');
checkDirectory(path.join(rootDir, 'app'));

console.log('Checking components directory...');
checkDirectory(path.join(rootDir, 'components'));

console.log('Checking lib directory...');
checkDirectory(path.join(rootDir, 'lib'));

// Print results
console.log('\n' + '='.repeat(70));
console.log('📊 RESULTS');
console.log('='.repeat(70) + '\n');

if (issues.brokenImports.length === 0 && issues.brokenLinks.length === 0) {
  console.log('✅ No issues found! All imports and links are valid.\n');
} else {
  if (issues.brokenImports.length > 0) {
    console.log(`❌ BROKEN IMPORTS (${issues.brokenImports.length}):\n`);
    
    // Group by file
    const byFile = {};
    issues.brokenImports.forEach(issue => {
      if (!byFile[issue.file]) byFile[issue.file] = [];
      byFile[issue.file].push(issue);
    });
    
    Object.entries(byFile).slice(0, 30).forEach(([file, fileIssues]) => {
      console.log(`  📄 ${file}`);
      fileIssues.forEach(issue => {
        console.log(`     Line ${issue.line}: import from '${issue.import}'`);
      });
      console.log('');
    });
    
    if (Object.keys(byFile).length > 30) {
      console.log(`  ... and ${Object.keys(byFile).length - 30} more files\n`);
    }
  }
  
  if (issues.brokenLinks.length > 0) {
    console.log(`❌ BROKEN LINKS (${issues.brokenLinks.length}):\n`);
    
    // Group by file
    const byFile = {};
    issues.brokenLinks.forEach(issue => {
      if (!byFile[issue.file]) byFile[issue.file] = [];
      byFile[issue.file].push(issue);
    });
    
    Object.entries(byFile).slice(0, 30).forEach(([file, fileIssues]) => {
      console.log(`  📄 ${file}`);
      fileIssues.forEach(issue => {
        console.log(`     Line ${issue.line}: link to '${issue.link}'`);
      });
      console.log('');
    });
    
    if (Object.keys(byFile).length > 30) {
      console.log(`  ... and ${Object.keys(byFile).length - 30} more files\n`);
    }
  }
}

// Save detailed report
const report = {
  timestamp: new Date().toISOString(),
  summary: {
    brokenImports: issues.brokenImports.length,
    brokenLinks: issues.brokenLinks.length
  },
  issues
};

fs.writeFileSync('import-check-report.json', JSON.stringify(report, null, 2));
console.log('📄 Detailed report saved to: import-check-report.json\n');

process.exit(issues.brokenImports.length > 0 || issues.brokenLinks.length > 0 ? 1 : 0);
