#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Emoji to Lucide icon mapping
const EMOJI_TO_ICON = {
  '🎯': 'Target',
  '📊': 'BarChart',
  '💼': 'Briefcase',
  '🎓': 'GraduationCap',
  '📝': 'FileText',
  '✨': 'Sparkles',
  '🚀': 'Rocket',
  '💡': 'Lightbulb',
  '🔥': 'Flame',
  '⚡': 'Zap',
  '🌟': 'Star',
  '💪': 'Dumbbell',
  '🎉': 'PartyPopper',
  '🏆': 'Trophy',
  '📈': 'TrendingUp',
  '🎨': 'Palette',
  '🔔': 'Bell',
  '📱': 'Smartphone',
  '💻': 'Laptop',
  '🌐': 'Globe',
  '🔒': 'Lock',
  '✅': 'CheckCircle',
  '❌': 'XCircle',
  '⚠️': 'AlertTriangle',
  '📚': 'BookOpen',
  '🎬': 'Video',
  '📧': 'Mail',
  '📞': 'Phone',
  '🏠': 'Home',
  '👥': 'Users',
  '⏰': 'Clock',
  '📅': 'Calendar',
  '💰': 'DollarSign',
  '🔍': 'Search',
  '⚙️': 'Settings',
  '📦': 'Package',
  '🎁': 'Gift',
};

function findTsxFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
      findTsxFiles(filePath, fileList);
    } else if (file.endsWith('.tsx')) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

function replaceEmojisInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  let iconsNeeded = new Set();
  
  // Find all emojis in the file
  for (const [emoji, icon] of Object.entries(EMOJI_TO_ICON)) {
    if (content.includes(emoji)) {
      // Replace emoji with icon component
      const iconComponent = `<${icon} className="w-5 h-5 inline-block" />`;
      content = content.replaceAll(emoji, iconComponent);
      iconsNeeded.add(icon);
      modified = true;
    }
  }
  
  // Add import if icons were used
  if (iconsNeeded.size > 0 && !content.includes("from 'lucide-react'")) {
    const icons = Array.from(iconsNeeded).sort().join(', ');
    const importStatement = `import { ${icons} } from 'lucide-react';\n`;
    
    // Find the right place to add import (after other imports)
    const lines = content.split('\n');
    let lastImportIndex = -1;
    
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].startsWith('import ')) {
        lastImportIndex = i;
      }
    }
    
    if (lastImportIndex >= 0) {
      lines.splice(lastImportIndex + 1, 0, importStatement);
      content = lines.join('\n');
    } else {
      content = importStatement + content;
    }
  }
  
  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    return { modified: true, icons: Array.from(iconsNeeded) };
  }
  
  return { modified: false, icons: [] };
}

// Main execution
console.log('🔧 Replacing emojis with Lucide icons...\n');

const appDir = path.join(__dirname, 'app');
const files = findTsxFiles(appDir);

console.log(`Found ${files.length} TSX files\n`);

let modifiedCount = 0;
let totalIcons = 0;

files.forEach(file => {
  const result = replaceEmojisInFile(file);
  if (result.modified) {
    modifiedCount++;
    totalIcons += result.icons.length;
    const relativePath = path.relative(__dirname, file);
    console.log(`✅ ${relativePath}`);
    console.log(`   Icons: ${result.icons.join(', ')}\n`);
  }
});

console.log(`\n✅ Complete!`);
console.log(`   Modified: ${modifiedCount} files`);
console.log(`   Icons added: ${totalIcons} total`);
