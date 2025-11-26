const fs = require('fs');

const files = [
  'app/api/forums/[forumId]/threads/[threadId]/route.ts',
  'app/api/verify/certificate/[certificateId]/route.ts',
  'app/api/videos/[videoId]/meta/route.ts',
];

files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Fix type definitions
    content = content.replace(
      /type Params = { params: { ([^}]+) } };/g,
      'type Params = { params: Promise<{ $1 }> };'
    );
    
    // Fix destructuring
    content = content.replace(
      /const { ([^}]+) } = params;/g,
      'const { $1 } = await params;'
    );
    
    // Fix direct params access
    content = content.replace(/params\.(\w+)/g, '$1');
    
    fs.writeFileSync(file, content);
    console.log(`Fixed: ${file}`);
  }
});
