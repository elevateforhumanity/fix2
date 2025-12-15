const fs = require('fs');
const path = require('path');

const files = [
  'app/jri/page.tsx',
  'app/programs/page.tsx',
  'app/store/page.tsx',
  'app/supersonicfastcash/page.tsx',
  'app/vita/page.tsx'
];

let fixedCount = 0;

files.forEach(file => {
  const filePath = path.join('/workspaces/fix2', file);
  
  if (!fs.existsSync(filePath)) {
    console.log(`❌ Not found: ${file}`);
    return;
  }
  
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;
  
  // Fix empty metadata objects
  content = content.replace(
    /export const metadata: Metadata = \{\s*\n\s*export default/g,
    'export const metadata: Metadata = {\n  title: \'Elevate For Humanity\',\n  description: \'Career training and development programs\'\n};\n\nexport default'
  );
  
  content = content.replace(
    /export const metadata = \{\s*\n\s*export default/g,
    'export const metadata = {\n  title: \'Elevate For Humanity\',\n  description: \'Career training and development programs\'\n};\n\nexport default'
  );
  
  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    fixedCount++;
    console.log(`✅ Fixed: ${file}`);
  } else {
    console.log(`⚠️  No changes: ${file}`);
  }
});

console.log(`\n✅ Fixed ${fixedCount} files`);
