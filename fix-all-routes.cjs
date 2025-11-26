const fs = require('fs');
const path = require('path');

const files = [
  'app/api/lessons/[lessonId]/qa/route.ts',
  'app/api/lessons/[lessonId]/bookmarks/route.ts',
  'app/api/lessons/[lessonId]/notes/route.ts',
  'app/api/courses/[courseId]/reviews/route.ts',
  'app/api/courses/[courseId]/announcements/route.ts',
  'app/api/courses/[courseId]/leaderboard/route.ts',
  'app/api/cm/learners/[id]/notes/route.ts',
];

files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Fix lessonId params
    content = content.replace(
      /{ params }: { params: { lessonId: string } }/g,
      '{ params }: { params: Promise<{ lessonId: string }> }'
    );
    content = content.replace(
      /const { lessonId } = params;/g,
      'const { lessonId } = await params;'
    );
    
    // Fix courseId params
    content = content.replace(
      /{ params }: { params: { courseId: string } }/g,
      '{ params }: { params: Promise<{ courseId: string }> }'
    );
    content = content.replace(
      /const { courseId } = params;/g,
      'const { courseId } = await params;'
    );
    
    // Fix id params
    content = content.replace(
      /{ params }: { params: { id: string } }/g,
      '{ params }: { params: Promise<{ id: string }> }'
    );
    content = content.replace(
      /const { id } = params;/g,
      'const { id } = await params;'
    );
    
    // Fix direct params.lessonId usage
    content = content.replace(/params\.lessonId/g, 'lessonId');
    content = content.replace(/params\.courseId/g, 'courseId');
    content = content.replace(/params\.id/g, 'id');
    
    fs.writeFileSync(file, content);
    console.log(`Fixed: ${file}`);
  }
});
