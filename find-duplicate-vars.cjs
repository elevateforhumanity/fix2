const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Get all files with parsing errors
const buildOutput = execSync('cd /workspaces/fix2 && pnpm build 2>&1', { encoding: 'utf8' });
const errorLines = buildOutput.split('\n').filter(line => line.includes('.tsx:'));

const files = new Set();
errorLines.forEach(line => {
  const match = line.match(/\.\/(app\/[^:]+\.tsx)/);
  if (match) {
    files.add(match[1]);
  }
});

console.log(`Found ${files.size} files with errors:\n`);

files.forEach(file => {
  const filePath = path.join('/workspaces/fix2', file);
  if (!fs.existsSync(filePath)) return;
  
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  
  // Find duplicate variable declarations
  const varNames = {};
  lines.forEach((line, idx) => {
    const match = line.match(/const\s+\{\s*data:\s*(\w+)/);
    if (match) {
      const varName = match[1];
      if (!varNames[varName]) {
        varNames[varName] = [];
      }
      varNames[varName].push(idx + 1);
    }
  });
  
  // Report duplicates
  Object.keys(varNames).forEach(varName => {
    if (varNames[varName].length > 1) {
      console.log(`${file}:`);
      console.log(`  Variable "${varName}" declared ${varNames[varName].length} times at lines: ${varNames[varName].join(', ')}`);
    }
  });
});
