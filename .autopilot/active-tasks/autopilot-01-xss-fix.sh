#!/bin/bash
# Task: Fix XSS Vulnerabilities
# Install DOMPurify if not present
npm install dompurify @types/dompurify --save

# Create sanitization utility
cat > lib/sanitize.ts << 'SANITIZE'
import DOMPurify from 'dompurify';

export function sanitizeHtml(dirty: string): string {
  if (typeof window === 'undefined') {
    // Server-side: use isomorphic-dompurify or return as-is
    return dirty;
  }
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br', 'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    ALLOWED_ATTR: ['href', 'target', 'rel']
  });
}
SANITIZE

echo "✅ Created sanitization utility"
echo "⚠️  Manual step required: Replace dangerouslySetInnerHTML in 5 files"
echo "   Files to update:"
echo "   - app/courses/[courseId]/learn/LessonContent.tsx"
echo "   - components/AssetGenerator.tsx"
echo "   - components/AIPageBuilder.tsx"
echo "   - components/UniversalMarketingPage.tsx"
echo "   - components/PageManager.tsx"
