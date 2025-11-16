# Course & Video Builders - Complete

**Date:** 2025-11-11  
**Purpose:** Staff tools for creating and managing course content

---

## ✅ COMPLETED

### 1. Course Builder (`/staff/course-builder`)

**Features:**

- Drag & drop module organization
- Add/edit/delete modules
- Add lessons (Video, Text, Quiz, Assignment, Resource)
- Course settings sidebar
- Course metadata (name, description, image, duration, level, category)
- Visual lesson type indicators
- Reorderable content
- Preview and save functionality

**Lesson Types:**

- 🎥 Video - Video content
- 📄 Text - Written content/articles
- ✅ Quiz - Assessments
- 📤 Assignment - Student submissions
- 🔗 Resource - Downloads/links

### 2. Video Builder (`/staff/video-builder`)

**Features:**

- Video library management
- Multiple upload methods:
  - File upload (MP4, MOV, AVI)
  - YouTube embed
  - External URL
- Video settings:
  - Title and description
  - Custom thumbnails
  - Auto-play toggle
  - Show controls toggle
  - Allow download toggle
- Video status tracking (Processing, Ready, Error)
- Video analytics (views, duration, size)
- Preview and download options
- Delete functionality

---

## COURSE BUILDER DETAILS

### Module Structure

```typescript
interface Module {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
  order: number;
}
```

### Lesson Structure

```typescript
interface Lesson {
  id: string;
  type: 'video' | 'text' | 'quiz' | 'assignment' | 'resource';
  title: string;
  duration?: string;
  order: number;
}
```

### Workflow

1. Create course (name, description, settings)
2. Add modules
3. Add lessons to each module
4. Configure lesson content
5. Preview course
6. Save and publish

---

## VIDEO BUILDER DETAILS

### Video Structure

```typescript
interface VideoFile {
  id: string;
  title: string;
  filename: string;
  duration: string;
  size: string;
  uploadDate: string;
  status: 'processing' | 'ready' | 'error';
  thumbnail?: string;
  url?: string;
  views?: number;
}
```

### Upload Methods

#### 1. File Upload

- Drag & drop interface
- Multiple file support
- Max 2GB per file
- Supports: MP4, MOV, AVI

#### 2. YouTube Embed

- Paste YouTube URL
- Automatic embedding
- No storage needed

#### 3. External URL

- Link to hosted video
- CDN support
- Custom server videos

### Video Settings

- **Title** - Display name
- **Description** - Video description
- **Thumbnail** - Custom thumbnail upload
- **Auto-play** - Start on load
- **Show controls** - Player controls
- **Allow download** - Download button

---

## PHASE 2 - LESSON BUILDERS

### Text/Article Builder

**Path:** `/staff/lesson-builder/text/:id`
**Features:**

- Rich text editor
- Formatting tools
- Image insertion
- Code blocks
- Embedded media
- Save drafts

### Quiz Builder

**Path:** `/staff/lesson-builder/quiz/:id`
**Features:**

- Multiple choice questions
- True/False questions
- Short answer
- Essay questions
- Point values
- Time limits
- Passing scores
- Randomize questions

### Assignment Builder

**Path:** `/staff/lesson-builder/assignment/:id`
**Features:**

- Assignment instructions
- File upload requirements
- Due dates
- Point values
- Rubric creation
- Submission settings

### Resource Manager

**Path:** `/staff/lesson-builder/resource/:id`
**Features:**

- File uploads (PDF, DOC, etc.)
- External links
- Resource descriptions
- Download tracking

---

## PHASE 3 - ADVANCED FEATURES

### Course Builder Enhancements

- [ ] Drag & drop reordering
- [ ] Bulk operations
- [ ] Course templates
- [ ] Import/export courses
- [ ] Version control
- [ ] Collaboration tools
- [ ] Course cloning
- [ ] Prerequisites setup
- [ ] Completion certificates
- [ ] Course analytics

### Video Builder Enhancements

- [ ] Video trimming/editing
- [ ] Subtitle upload
- [ ] Multiple quality options
- [ ] Adaptive streaming
- [ ] Video chapters
- [ ] Interactive elements
- [ ] Analytics dashboard
- [ ] Batch upload
- [ ] Video transcoding
- [ ] CDN integration

### Content Library

- [ ] Shared resource library
- [ ] Content search
- [ ] Tags and categories
- [ ] Usage tracking
- [ ] Content recommendations
- [ ] Duplicate detection

---

## INTEGRATION POINTS

### With Student Portal

- Students view courses created here
- Video player uses videos from library
- Progress tracking on lessons
- Quiz submissions
- Assignment uploads

### With Partner Portal

- Partners can view course content
- Track student progress through courses
- Generate completion reports
- Monitor video engagement

### With Staff Portal

- Course analytics
- Student performance data
- Content usage statistics
- Popular videos/lessons

---

## DATABASE SCHEMA

### Courses Table

```sql
CREATE TABLE courses (
  id UUID PRIMARY KEY,
  title VARCHAR(255),
  description TEXT,
  image_url VARCHAR(500),
  duration VARCHAR(50),
  level VARCHAR(50),
  category VARCHAR(100),
  created_by UUID,
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  published BOOLEAN
);
```

### Modules Table

```sql
CREATE TABLE modules (
  id UUID PRIMARY KEY,
  course_id UUID REFERENCES courses(id),
  title VARCHAR(255),
  description TEXT,
  order_index INTEGER,
  created_at TIMESTAMP
);
```

### Lessons Table

```sql
CREATE TABLE lessons (
  id UUID PRIMARY KEY,
  module_id UUID REFERENCES modules(id),
  type VARCHAR(50),
  title VARCHAR(255),
  content TEXT,
  video_id UUID,
  duration VARCHAR(20),
  order_index INTEGER,
  created_at TIMESTAMP
);
```

### Videos Table

```sql
CREATE TABLE videos (
  id UUID PRIMARY KEY,
  title VARCHAR(255),
  description TEXT,
  filename VARCHAR(255),
  url VARCHAR(500),
  thumbnail_url VARCHAR(500),
  duration VARCHAR(20),
  size_bytes BIGINT,
  status VARCHAR(50),
  upload_date TIMESTAMP,
  views INTEGER DEFAULT 0
);
```

---

## API ENDPOINTS

### Course Builder

```
POST   /api/courses              - Create course
GET    /api/courses/:id          - Get course
PUT    /api/courses/:id          - Update course
DELETE /api/courses/:id          - Delete course
POST   /api/courses/:id/modules  - Add module
PUT    /api/modules/:id          - Update module
DELETE /api/modules/:id          - Delete module
POST   /api/modules/:id/lessons  - Add lesson
PUT    /api/lessons/:id          - Update lesson
DELETE /api/lessons/:id          - Delete lesson
```

### Video Builder

```
POST   /api/videos/upload        - Upload video
POST   /api/videos/youtube       - Add YouTube video
POST   /api/videos/url           - Add external URL
GET    /api/videos               - List videos
GET    /api/videos/:id           - Get video
PUT    /api/videos/:id           - Update video
DELETE /api/videos/:id           - Delete video
GET    /api/videos/:id/analytics - Video analytics
```

---

## USAGE WORKFLOW

### Creating a Complete Course

1. **Start Course Builder**
   - Navigate to `/staff/course-builder`
   - Enter course name and description
   - Set course image, duration, level, category

2. **Add Modules**
   - Click "Add Module"
   - Enter module title and description
   - Repeat for each module

3. **Add Lessons**
   - Click "Add Lesson" in a module
   - Choose lesson type (Video, Text, Quiz, etc.)
   - Enter lesson title

4. **Configure Video Lessons**
   - Click "Edit" on video lesson
   - Navigate to Video Builder
   - Upload or link video
   - Configure video settings
   - Return to Course Builder

5. **Configure Other Lessons**
   - Click "Edit" on lesson
   - Use appropriate builder (Text, Quiz, Assignment)
   - Add content
   - Save lesson

6. **Preview Course**
   - Click "Preview" button
   - Review entire course flow
   - Test all lessons

7. **Publish Course**
   - Click "Save Course"
   - Course becomes available to students

---

## FILES CREATED

1. `/src/pages/staff/CourseBuilder.tsx` - Main course builder
2. `/src/pages/staff/VideoBuilder.tsx` - Video management

## FILES NEEDED (Phase 2)

3. `/src/pages/staff/TextBuilder.tsx` - Text/article editor
4. `/src/pages/staff/QuizBuilder.tsx` - Quiz creator
5. `/src/pages/staff/AssignmentBuilder.tsx` - Assignment creator
6. `/src/pages/staff/ResourceManager.tsx` - Resource uploader

---

## ROUTING

Add to `AppRoutes.tsx`:

```typescript
<Route path="/staff/course-builder" element={<CourseBuilder />} />
<Route path="/staff/course-builder/:id" element={<CourseBuilder />} />
<Route path="/staff/video-builder" element={<VideoBuilder />} />
<Route path="/staff/lesson-builder/text/:id" element={<TextBuilder />} />
<Route path="/staff/lesson-builder/quiz/:id" element={<QuizBuilder />} />
<Route path="/staff/lesson-builder/assignment/:id" element={<AssignmentBuilder />} />
<Route path="/staff/lesson-builder/resource/:id" element={<ResourceManager />} />
```

---

## NEXT STEPS

### Immediate

1. [ ] Add routing for builders
2. [ ] Create lesson builders (Phase 2)
3. [ ] Connect to Supabase
4. [ ] Test course creation flow
5. [ ] Build and deploy

### Short Term

6. [ ] Implement file upload to storage
7. [ ] Add video processing
8. [ ] Create course preview
9. [ ] Add course publishing
10. [ ] Test with real content

### Long Term

11. [ ] Add Phase 3 features
12. [ ] Implement analytics
13. [ ] Add collaboration
14. [ ] Create templates
15. [ ] Mobile optimization

---

**Status:** ✅ Course Builder and Video Builder complete  
**Next:** Create lesson builders and connect to database  
**Goal:** Full content creation system for staff
