#!/bin/bash
# Fix Next.js 15 route params (must be awaited Promise)

files=(
  "app/api/lessons/[lessonId]/qa/route.ts"
  "app/api/lessons/[lessonId]/bookmarks/route.ts"
  "app/api/lessons/[lessonId]/notes/route.ts"
  "app/api/certificates/[id]/download/route.ts"
  "app/api/study-groups/[id]/join/route.ts"
  "app/api/notes/[id]/route.ts"
  "app/api/courses/[courseId]/reviews/route.ts"
  "app/api/courses/[courseId]/announcements/route.ts"
  "app/api/courses/[courseId]/leaderboard/route.ts"
  "app/api/courses/[courseId]/route.ts"
  "app/api/cm/learners/[id]/notes/route.ts"
  "app/api/cm/learners/[id]/route.ts"
)

for file in "${files[@]}"; do
  if [ -f "$file" ]; then
    echo "Fixing $file..."
    # This is a placeholder - we'll fix each file individually
  fi
done
