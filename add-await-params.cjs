const fs = require('fs');

const files = [
  'app/api/study-groups/[id]/join/route.ts',
  'app/api/notes/[id]/route.ts',
];

files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Add await params destructuring after function signature
    content = content.replace(
      /(export async function \w+\([^)]+{ params }: { params: Promise<{ id: string }> }\)[^{]*{\s*)(try {)?/g,
      '$1$2\n    const { id } = await params;'
    );
    
    fs.writeFileSync(file, content);
    console.log(`Fixed: ${file}`);
  }
});
