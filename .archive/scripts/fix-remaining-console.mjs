import { readFileSync, writeFileSync } from 'fs';

const files = [
  'app/api/stripe/webhook/route.ts',
  'app/api/webhooks/marketplace/route.ts',
  'components/SecurityMonitor.tsx'
];

files.forEach(file => {
  try {
    let content = readFileSync(file, 'utf8');
    
    // Remove broken commented console.log patterns
    content = content.replace(/\/\/ console\.log\([^)]*\) \/\/ Removed for production\s*\n\s*[^;]*\s*\);/g, '// Removed for production');
    content = content.replace(/\/\/ console\.log\([^)]*\/\/ Removed for production[\s\S]*?\);/g, '// Removed for production');
    
    // Fix any remaining broken patterns
    const lines = content.split('\n');
    const fixedLines = [];
    let skipNext = false;
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      // Skip lines that are part of broken console.log comments
      if (line.includes('// console.log') && line.includes('// Removed for production')) {
        // Check if next lines are part of the broken pattern
        let j = i + 1;
        while (j < lines.length && !lines[j].includes(');')) {
          j++;
        }
        if (j < lines.length && lines[j].trim() === ');') {
          // Skip all these lines
          i = j;
          fixedLines.push('        // Removed for production');
          continue;
        }
      }
      
      fixedLines.push(line);
    }
    
    content = fixedLines.join('\n');
    
    writeFileSync(file, content);
    console.log(`✓ Fixed ${file}`);
  } catch (err) {
    console.error(`✗ ${file}: ${err.message}`);
  }
});

console.log('\n✅ All console.log issues fixed');
