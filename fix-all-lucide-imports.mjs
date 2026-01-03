#!/usr/bin/env node

import fs from 'fs';
import { execSync } from 'child_process';

// All possible Lucide icons that might be used
const ALL_ICONS = [
  'Target', 'BarChart', 'Briefcase', 'GraduationCap', 'FileText', 'Sparkles',
  'Rocket', 'Lightbulb', 'Flame', 'Zap', 'Star', 'Dumbbell', 'PartyPopper',
  'Trophy', 'TrendingUp', 'Palette', 'Bell', 'Smartphone', 'Laptop', 'Globe',
  'Lock', 'CheckCircle', 'XCircle', 'AlertTriangle', 'BookOpen', 'Video',
  'Mail', 'Phone', 'Home', 'Users', 'Clock', 'Calendar', 'DollarSign',
  'Search', 'Settings', 'Package', 'Gift', 'Check', 'MapPin', 'ArrowRight',
  'ExternalLink', 'Award', 'Shield', 'Building2', 'FileCheck', 'Heart',
  'TrendingDown', 'Activity', 'MessageCircle', 'Download', 'Upload',
  'Edit', 'Trash', 'Plus', 'Minus', 'X', 'Menu', 'ChevronRight', 'ChevronLeft',
  'ChevronUp', 'ChevronDown', 'Info', 'HelpCircle', 'AlertCircle'
];

console.log('🔍 Finding all TSX files with inline-block icons...\n');

// Get all TSX files with inline-block (our emoji replacement pattern)
const files = execSync('find app -name "*.tsx" -type f -exec grep -l "inline-block" {} \\;', { encoding: 'utf-8' })
  .trim()
  .split('\n')
  .filter(f => f);

console.log(`Found ${files.length} files with inline-block icons\n`);

let fixed = 0;
let errors = 0;

files.forEach(filePath => {
  try {
    let content = fs.readFileSync(filePath, 'utf-8');
    
    // Find which icons are used in the file
    const usedIcons = new Set();
    ALL_ICONS.forEach(icon => {
      if (content.includes(`<${icon} `) || content.includes(`<${icon}>`)) {
        usedIcons.add(icon);
      }
    });
    
    if (usedIcons.size === 0) return;
    
    // Check if file has lucide-react import
    const hasLucideImport = content.includes("from 'lucide-react'");
    
    if (!hasLucideImport) {
      console.log(`⚠️  ${filePath} - No lucide-react import found, skipping`);
      return;
    }
    
    // Find existing imports
    const importMatch = content.match(/import\s*{([^}]*)}\s*from\s*['"]lucide-react['"]/);
    if (!importMatch) return;
    
    const existingImports = importMatch[1]
      .split(',')
      .map(i => i.trim())
      .filter(i => i);
    
    // Find missing icons
    const missingIcons = Array.from(usedIcons).filter(icon => !existingImports.includes(icon));
    
    if (missingIcons.length === 0) return;
    
    // Add missing icons to import
    const allImports = [...existingImports, ...missingIcons].sort();
    const newImportStatement = `import {\n  ${allImports.join(',\n  ')},\n} from 'lucide-react'`;
    
    content = content.replace(
      /import\s*{[^}]*}\s*from\s*['"]lucide-react['"]/,
      newImportStatement
    );
    
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`✅ ${filePath}`);
    console.log(`   Added: ${missingIcons.join(', ')}\n`);
    fixed++;
    
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
    errors++;
  }
});

console.log(`\n✅ Fixed ${fixed} files`);
if (errors > 0) {
  console.log(`❌ Errors: ${errors} files`);
}
