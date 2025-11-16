# 🤖 AI CONTENT GENERATOR GUIDE

**YES! You have AI generators built-in!** 🎉

Your application includes powerful AI tools to generate:
- ✅ Images (DALL-E 3)
- ✅ Video scripts
- ✅ Video thumbnails
- ✅ Course content
- ✅ Page layouts
- ✅ Educational content

---

## 🎯 WHAT YOU HAVE

### 1. AI Asset Generator API
**Location:** `/api/ai/generate-asset`

**Capabilities:**
- Generate images with DALL-E 3
- Generate content with GPT-4
- Professional, modern styling
- 1024x1024 high-quality images

### 2. AI Page Builder API
**Location:** `/api/ai/generate-page`

**Capabilities:**
- Generate React components
- TypeScript + Tailwind CSS
- Responsive designs
- Semantic HTML

### 3. Video Generator
**Location:** `ecosystem5-scripts/utilities/video-generator.js`

**Capabilities:**
- Generate video scripts
- Create thumbnails
- Estimate duration
- Educational content focus

### 4. AI Page Builder UI
**Location:** `components/AIPageBuilder.tsx`

**Capabilities:**
- Visual page builder
- Template selection
- Section customization
- Save to database

---

## 🚀 HOW TO USE

### Generate Images for Programs

**Method 1: API Call**

```bash
curl -X POST http://localhost:3000/api/ai/generate-asset \
  -H "Content-Type: application/json" \
  -d '{
    "type": "image",
    "prompt": "Professional CDL truck driving training program, modern educational setting",
    "style": "professional, modern, educational"
  }'
```

**Method 2: JavaScript/TypeScript**

```typescript
async function generateProgramImage(programTitle: string) {
  const response = await fetch('/api/ai/generate-asset', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      type: 'image',
      prompt: `Professional ${programTitle} training program, modern educational setting`,
      style: 'professional, modern, educational'
    })
  });
  
  const data = await response.json();
  return data.url; // DALL-E generated image URL
}

// Use it
const imageUrl = await generateProgramImage('Welding Certification');
// Save to database
await supabase
  .from('programs')
  .update({ image_url: imageUrl })
  .eq('slug', 'welding');
```

---

### Generate Video Content

**Method 1: Using Video Generator Class**

```javascript
import VideoGenerator from './ecosystem5-scripts/utilities/video-generator.js';

const generator = new VideoGenerator();

// Generate script
const script = await generator.generateScript('CDL Training Basics', 300);
console.log(script.script);

// Generate thumbnail
const thumbnail = await generator.generateThumbnail('CDL Training Basics');
console.log(thumbnail.thumbnailUrl);

// Create metadata
const metadata = generator.createVideoMetadata(
  'CDL Training Basics',
  script.script,
  thumbnail.thumbnailUrl
);
```

**Method 2: Generate and Save to Database**

```javascript
async function createVideoLesson(lessonTitle, topic) {
  const generator = new VideoGenerator();
  
  // Generate script
  const scriptResult = await generator.generateScript(topic, 300);
  
  // Generate thumbnail
  const thumbnailResult = await generator.generateThumbnail(lessonTitle);
  
  // Save to database
  const { data, error } = await supabase
    .from('lessons')
    .insert({
      title: lessonTitle,
      content: scriptResult.script,
      content_type: 'video',
      thumbnail_url: thumbnailResult.thumbnailUrl,
      duration_minutes: Math.ceil(scriptResult.duration / 60)
    });
  
  return data;
}

// Use it
await createVideoLesson(
  'Introduction to CDL Training',
  'Commercial Driver License basics and requirements'
);
```

---

### Generate Course Content

**Generate Lesson Content:**

```typescript
async function generateLessonContent(topic: string) {
  const response = await fetch('/api/ai/generate-asset', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      type: 'content',
      prompt: `Create a comprehensive lesson about ${topic}. Include:
        - Introduction
        - Key concepts
        - Step-by-step instructions
        - Practice exercises
        - Summary
        Format as educational content for workforce training.`
    })
  });
  
  const data = await response.json();
  return data.content;
}

// Use it
const content = await generateLessonContent('Basic Welding Safety');
// Save to database
await supabase
  .from('lessons')
  .update({ content: content })
  .eq('id', 'lesson-id');
```

---

## 🎨 BULK GENERATE CONTENT

### Script to Generate All Program Images

```typescript
// scripts/generate-program-images.ts
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function generateAllProgramImages() {
  // Get all programs
  const { data: programs } = await supabase
    .from('programs')
    .select('id, slug, title')
    .is('image_url', null);
  
  for (const program of programs || []) {
    console.log(`Generating image for ${program.title}...`);
    
    // Generate image
    const response = await fetch('http://localhost:3000/api/ai/generate-asset', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'image',
        prompt: `Professional ${program.title} training program, modern educational setting, diverse students learning`,
        style: 'professional, modern, educational, diverse'
      })
    });
    
    const data = await response.json();
    
    if (data.url) {
      // Update program with image
      await supabase
        .from('programs')
        .update({ image_url: data.url })
        .eq('id', program.id);
      
      console.log(`✅ Generated image for ${program.title}`);
    }
    
    // Wait 1 second between requests (rate limiting)
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  console.log('✅ All program images generated!');
}

generateAllProgramImages();
```

**Run it:**
```bash
npx tsx scripts/generate-program-images.ts
```

---

### Script to Generate Video Lessons

```typescript
// scripts/generate-video-lessons.ts
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function generateVideoLessons() {
  // Get all video lessons without content
  const { data: lessons } = await supabase
    .from('lessons')
    .select('id, title, description')
    .eq('content_type', 'video')
    .is('content', null);
  
  for (const lesson of lessons || []) {
    console.log(`Generating video script for ${lesson.title}...`);
    
    // Generate script
    const response = await fetch('http://localhost:3000/api/ai/generate-asset', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'content',
        prompt: `Create a 5-minute video script for: ${lesson.title}. 
                 Description: ${lesson.description}
                 Format as a professional educational video script with:
                 - Opening hook
                 - Main content sections
                 - Visual cues
                 - Closing summary`
      })
    });
    
    const data = await response.json();
    
    if (data.content) {
      // Update lesson with script
      await supabase
        .from('lessons')
        .update({ content: data.content })
        .eq('id', lesson.id);
      
      console.log(`✅ Generated script for ${lesson.title}`);
    }
    
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  console.log('✅ All video scripts generated!');
}

generateVideoLessons();
```

---

## 🎬 COMPLETE WORKFLOW

### Generate Full Course with AI

```typescript
async function generateCompleteCourse(courseTitle: string, topics: string[]) {
  console.log(`🎓 Generating course: ${courseTitle}`);
  
  // 1. Generate course image
  const courseImageResponse = await fetch('/api/ai/generate-asset', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      type: 'image',
      prompt: `Professional course cover for ${courseTitle}, modern educational design`,
      style: 'professional, modern, educational'
    })
  });
  const courseImage = await courseImageResponse.json();
  
  // 2. Create course in database
  const { data: course } = await supabase
    .from('courses')
    .insert({
      title: courseTitle,
      thumbnail_url: courseImage.url,
      image_url: courseImage.url
    })
    .select()
    .single();
  
  // 3. Generate lessons for each topic
  for (const topic of topics) {
    console.log(`  📝 Generating lesson: ${topic}`);
    
    // Generate lesson content
    const contentResponse = await fetch('/api/ai/generate-asset', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'content',
        prompt: `Create a comprehensive lesson about ${topic} for ${courseTitle}. 
                 Include introduction, key concepts, examples, and exercises.`
      })
    });
    const content = await contentResponse.json();
    
    // Generate lesson thumbnail
    const thumbnailResponse = await fetch('/api/ai/generate-asset', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'image',
        prompt: `Educational illustration for ${topic}, simple, clear, professional`,
        style: 'educational, simple, clear'
      })
    });
    const thumbnail = await thumbnailResponse.json();
    
    // Save lesson
    await supabase
      .from('lessons')
      .insert({
        course_id: course.id,
        title: topic,
        content: content.content,
        content_type: 'text',
        thumbnail_url: thumbnail.url
      });
    
    console.log(`  ✅ Lesson created: ${topic}`);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  console.log(`✅ Course complete: ${courseTitle}`);
}

// Use it
await generateCompleteCourse('CDL Training Fundamentals', [
  'Introduction to Commercial Driving',
  'Vehicle Inspection Basics',
  'Safe Driving Techniques',
  'Hours of Service Regulations',
  'Emergency Procedures'
]);
```

---

## ⚙️ SETUP REQUIREMENTS

### 1. OpenAI API Key

**Add to your environment variables:**

```bash
# .env.local
OPENAI_API_KEY=sk-your-api-key-here
```

**Get your API key:**
1. Go to [platform.openai.com](https://platform.openai.com)
2. Sign up / Log in
3. Go to API Keys
4. Create new secret key
5. Copy and add to `.env.local`

### 2. Verify Setup

```bash
# Test image generation
curl -X POST http://localhost:3000/api/ai/generate-asset \
  -H "Content-Type: application/json" \
  -d '{"type":"image","prompt":"test image"}'

# Test content generation
curl -X POST http://localhost:3000/api/ai/generate-asset \
  -H "Content-Type": "application/json" \
  -d '{"type":"content","prompt":"test content"}'
```

---

## 💰 COST ESTIMATES

### OpenAI Pricing (as of 2024):

**DALL-E 3:**
- Standard quality: $0.040 per image
- HD quality: $0.080 per image

**GPT-4 Turbo:**
- Input: $0.01 per 1K tokens
- Output: $0.03 per 1K tokens

**Example Costs:**
- Generate 50 program images: ~$2.00
- Generate 100 lesson scripts: ~$5.00
- Generate complete 10-lesson course: ~$1.50

**Total to populate entire LMS:** ~$20-50

---

## 🎯 RECOMMENDED WORKFLOW

### Step 1: Generate Program Images (10 minutes)
```bash
npx tsx scripts/generate-program-images.ts
```

### Step 2: Generate Course Content (30 minutes)
```bash
npx tsx scripts/generate-course-content.ts
```

### Step 3: Generate Video Scripts (20 minutes)
```bash
npx tsx scripts/generate-video-lessons.ts
```

### Step 4: Review and Refine
- Check generated content
- Edit as needed
- Add real videos where available

---

## ✅ QUICK START

**1. Set up OpenAI API key:**
```bash
echo "OPENAI_API_KEY=sk-your-key" >> .env.local
```

**2. Test generation:**
```bash
curl -X POST http://localhost:3000/api/ai/generate-asset \
  -H "Content-Type: application/json" \
  -d '{
    "type": "image",
    "prompt": "Professional welding training program"
  }'
```

**3. Generate all content:**
```bash
# Create the scripts above and run them
npx tsx scripts/generate-all-content.ts
```

**4. Deploy and enjoy!**

---

## 🎉 SUMMARY

**You have everything you need!**

Your application includes:
- ✅ AI image generator (DALL-E 3)
- ✅ AI content generator (GPT-4)
- ✅ Video script generator
- ✅ Thumbnail generator
- ✅ Page builder

**Just add your OpenAI API key and run the scripts!**

**Cost:** ~$20-50 to generate all content  
**Time:** ~1 hour to generate everything  
**Result:** Fully populated LMS with professional content

---

**See also:**
- `VIDEO_IMAGE_FIX_GUIDE.md` - Why content isn't showing
- `DEPLOYMENT_INSTRUCTIONS.md` - How to deploy

---

**Created:** November 16, 2025  
**Status:** AI Generators Ready ✅
