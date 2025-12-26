import fs from 'fs';
import path from 'path';

console.log('🔍 COMPREHENSIVE CODE QUALITY CHECK\n');
console.log('=' .repeat(80));

// Check console.logs
console.log('\n📊 CHECKING CONSOLE LOGS...\n');

function findInFiles(dir, patterns, extensions, exclude = ['node_modules', '.next', '.git', '.archive', 'dist', 'build']) {
  const results = [];
  
  function scan(currentDir) {
    try {
      const items = fs.readdirSync(currentDir);
      
      for (const item of items) {
        const fullPath = path.join(currentDir, item);
        
        if (exclude.some(ex => fullPath.includes(ex))) continue;
        
        try {
          const stat = fs.statSync(fullPath);
          
          if (stat.isDirectory()) {
            scan(fullPath);
          } else if (stat.isFile() && extensions.some(ext => item.endsWith(ext))) {
            const content = fs.readFileSync(fullPath, 'utf8');
            patterns.forEach(pattern => {
              const regex = new RegExp(pattern, 'g');
              const matches = content.match(regex);
              if (matches) {
                results.push({ 
                  file: fullPath.replace(process.cwd(), '.'), 
                  pattern, 
                  count: matches.length 
                });
              }
            });
          }
        } catch (err) {}
      }
    } catch (err) {}
  }
  
  scan(dir);
  return results;
}

const consoleLogs = findInFiles('.', ['console\\.log', 'console\\.error', 'console\\.warn'], ['.ts', '.tsx', '.js', '.jsx']);

const consoleByType = {};
consoleLogs.forEach(item => {
  if (!consoleByType[item.pattern]) consoleByType[item.pattern] = [];
  consoleByType[item.pattern].push(item);
});

Object.entries(consoleByType).forEach(([pattern, items]) => {
  const totalCount = items.reduce((sum, item) => sum + item.count, 0);
  console.log(`${pattern}: ${totalCount} occurrences in ${items.length} files`);
});

// Check TODOs and FIXMEs
console.log('\n' + '=' .repeat(80));
console.log('\n📊 CHECKING TODO/FIXME COMMENTS...\n');

const todos = findInFiles('.', ['TODO:', 'FIXME:', 'HACK:', 'XXX:', 'BUG:', 'OPTIMIZE:'], ['.ts', '.tsx', '.js', '.jsx']);

const todosByType = {};
todos.forEach(item => {
  if (!todosByType[item.pattern]) todosByType[item.pattern] = [];
  todosByType[item.pattern].push(item);
});

Object.entries(todosByType).forEach(([pattern, items]) => {
  const totalCount = items.reduce((sum, item) => sum + item.count, 0);
  console.log(`${pattern} ${totalCount} occurrences in ${items.length} files`);
  if (items.length <= 5) {
    items.forEach(item => console.log(`   - ${item.file}`));
  }
});

// Check unused files
console.log('\n' + '=' .repeat(80));
console.log('\n📊 CHECKING POTENTIALLY UNUSED FILES...\n');

const unusedPatterns = [
  '.backup', '.old', '.tmp', '.bak',
  '_unused', '_old', '_backup', '_temp',
  '.test.skip', '.spec.skip',
  'TEMPLATE', 'EXAMPLE', 'SAMPLE'
];

function findUnusedFiles(dir) {
  const results = [];
  
  function scan(currentDir) {
    try {
      if (currentDir.includes('node_modules') || currentDir.includes('.git') || currentDir.includes('.archive')) {
        return;
      }
      
      const items = fs.readdirSync(currentDir);
      
      for (const item of items) {
        const fullPath = path.join(currentDir, item);
        
        try {
          const stat = fs.statSync(fullPath);
          
          if (stat.isDirectory()) {
            scan(fullPath);
          } else {
            if (unusedPatterns.some(pattern => item.includes(pattern))) {
              results.push(fullPath.replace(process.cwd(), '.'));
            }
          }
        } catch (err) {}
      }
    } catch (err) {}
  }
  
  scan(dir);
  return results;
}

const unusedFiles = findUnusedFiles('.');

if (unusedFiles.length > 0) {
  console.log(`Found ${unusedFiles.length} potentially unused files:\n`);
  unusedFiles.slice(0, 20).forEach(f => console.log(`   ${f}`));
  if (unusedFiles.length > 20) {
    console.log(`   ... and ${unusedFiles.length - 20} more`);
  }
} else {
  console.log('✅ No obviously unused files found');
}

// Check for duplicate components
console.log('\n' + '=' .repeat(80));
console.log('\n📊 CHECKING DUPLICATE COMPONENTS...\n');

function findComponents(dir) {
  const components = {};
  
  function scan(currentDir) {
    try {
      if (currentDir.includes('node_modules') || currentDir.includes('.git')) return;
      
      const items = fs.readdirSync(currentDir);
      
      for (const item of items) {
        const fullPath = path.join(currentDir, item);
        
        try {
          const stat = fs.statSync(fullPath);
          
          if (stat.isDirectory()) {
            scan(fullPath);
          } else if (item.endsWith('.tsx') || item.endsWith('.jsx')) {
            const baseName = item.replace(/\.(tsx|jsx)$/, '');
            if (!components[baseName]) components[baseName] = [];
            components[baseName].push(fullPath.replace(process.cwd(), '.'));
          }
        } catch (err) {}
      }
    } catch (err) {}
  }
  
  scan(dir);
  return components;
}

const components = findComponents('.');
const duplicates = Object.entries(components).filter(([_, files]) => files.length > 1);

if (duplicates.length > 0) {
  console.log(`Found ${duplicates.length} components with duplicate names:\n`);
  duplicates.slice(0, 10).forEach(([name, files]) => {
    console.log(`   ${name}:`);
    files.forEach(f => console.log(`      - ${f}`));
  });
  if (duplicates.length > 10) {
    console.log(`   ... and ${duplicates.length - 10} more`);
  }
} else {
  console.log('✅ No duplicate component names found');
}

// Check for empty files
console.log('\n' + '=' .repeat(80));
console.log('\n📊 CHECKING EMPTY FILES...\n');

function findEmptyFiles(dir) {
  const results = [];
  
  function scan(currentDir) {
    try {
      if (currentDir.includes('node_modules') || currentDir.includes('.git')) return;
      
      const items = fs.readdirSync(currentDir);
      
      for (const item of items) {
        const fullPath = path.join(currentDir, item);
        
        try {
          const stat = fs.statSync(fullPath);
          
          if (stat.isDirectory()) {
            scan(fullPath);
          } else if ((item.endsWith('.ts') || item.endsWith('.tsx') || item.endsWith('.js') || item.endsWith('.jsx')) && stat.size < 50) {
            results.push(fullPath.replace(process.cwd(), '.'));
          }
        } catch (err) {}
      }
    } catch (err) {}
  }
  
  scan(dir);
  return results;
}

const emptyFiles = findEmptyFiles('.');

if (emptyFiles.length > 0) {
  console.log(`Found ${emptyFiles.length} nearly empty files:\n`);
  emptyFiles.slice(0, 10).forEach(f => console.log(`   ${f}`));
  if (emptyFiles.length > 10) {
    console.log(`   ... and ${emptyFiles.length - 10} more`);
  }
} else {
  console.log('✅ No empty files found');
}

// Summary
console.log('\n' + '=' .repeat(80));
console.log('\n📋 SUMMARY\n');

const totalConsoleLogs = Object.values(consoleByType).reduce((sum, items) => sum + items.reduce((s, i) => s + i.count, 0), 0);
const totalTodos = Object.values(todosByType).reduce((sum, items) => sum + items.reduce((s, i) => s + i.count, 0), 0);

console.log(`Console logs: ${totalConsoleLogs}`);
console.log(`TODO/FIXME comments: ${totalTodos}`);
console.log(`Potentially unused files: ${unusedFiles.length}`);
console.log(`Duplicate component names: ${duplicates.length}`);
console.log(`Empty files: ${emptyFiles.length}`);

console.log('\n' + '=' .repeat(80));

if (totalConsoleLogs > 50 || totalTodos > 20 || unusedFiles.length > 10) {
  console.log('\n⚠️  CODE CLEANUP RECOMMENDED\n');
} else {
  console.log('\n✅ CODE QUALITY IS GOOD\n');
}

console.log('=' .repeat(80));

