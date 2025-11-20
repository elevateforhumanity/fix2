# LMS Features Implementation Plan

## Status Overview

| Feature           | Status         | Priority | Timeline |
| ----------------- | -------------- | -------- | -------- |
| Interactive Video | ✅ Implemented | High     | Complete |
| SCORM/xAPI        | 🔄 In Progress | High     | 2 weeks  |
| Course Authoring  | 🔄 In Progress | High     | 2 weeks  |
| eCommerce         | 🔄 In Progress | Medium   | 3 weeks  |
| Gamification      | ✅ Implemented | Medium   | Complete |

---

## 1. Interactive Video ✅

### Current Implementation

- **Location**: `components/video/InteractiveVideoPlayer.tsx`
- **Features**:
  - Video playback with controls
  - Timestamp-based notes
  - Embedded quizzes at specific timestamps
  - Transcript display
  - Progress tracking
  - Completion callbacks

### Enhancements Needed

- [ ] Add video bookmarks
- [ ] Implement video chapters
- [ ] Add interactive hotspots
- [ ] Support multiple video qualities
- [ ] Add closed captions/subtitles
- [ ] Implement video analytics

### Implementation

```typescript
// components/video/EnhancedVideoPlayer.tsx
interface VideoChapter {
  timestamp: number;
  title: string;
  description?: string;
}

interface VideoHotspot {
  timestamp: number;
  x: number; // percentage
  y: number; // percentage
  action: 'quiz' | 'link' | 'note' | 'resource';
  data: any;
}

interface EnhancedVideoPlayerProps {
  videoUrl: string;
  chapters?: VideoChapter[];
  hotspots?: VideoHotspot[];
  subtitles?: { language: string; url: string }[];
  qualities?: { label: string; url: string }[];
}
```

---

## 2. SCORM/xAPI 🔄

### Requirements

- SCORM 1.2 and 2004 support
- xAPI (Tin Can API) integration
- Learning Record Store (LRS) connection
- Progress tracking
- Completion tracking
- Score reporting

### Implementation Plan

#### Phase 1: xAPI Foundation (Week 1)

```typescript
// lib/xapi/xapi-client.ts
import { Statement, Actor, Verb, Activity } from '@xapi/xapi';

export class XAPIClient {
  private endpoint: string;
  private auth: string;

  constructor(endpoint: string, username: string, password: string) {
    this.endpoint = endpoint;
    this.auth = btoa(`${username}:${password}`);
  }

  async sendStatement(statement: Statement): Promise<void> {
    const response = await fetch(`${this.endpoint}/statements`, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${this.auth}`,
        'Content-Type': 'application/json',
        'X-Experience-API-Version': '1.0.3',
      },
      body: JSON.stringify(statement),
    });

    if (!response.ok) {
      throw new Error(`xAPI error: ${response.statusText}`);
    }
  }

  // Track course started
  async trackCourseStarted(
    userId: string,
    courseId: string,
    courseName: string
  ) {
    const statement: Statement = {
      actor: {
        mbox: `mailto:${userId}@elevateforhumanity.org`,
        name: userId,
        objectType: 'Agent',
      },
      verb: {
        id: 'http://adlnet.gov/expapi/verbs/initialized',
        display: { 'en-US': 'initialized' },
      },
      object: {
        id: `https://elevateforhumanity.org/courses/${courseId}`,
        definition: {
          name: { 'en-US': courseName },
          type: 'http://adlnet.gov/expapi/activities/course',
        },
        objectType: 'Activity',
      },
      timestamp: new Date().toISOString(),
    };

    await this.sendStatement(statement);
  }

  // Track lesson completed
  async trackLessonCompleted(
    userId: string,
    lessonId: string,
    lessonName: string,
    score?: number,
    duration?: number
  ) {
    const statement: Statement = {
      actor: {
        mbox: `mailto:${userId}@elevateforhumanity.org`,
        name: userId,
        objectType: 'Agent',
      },
      verb: {
        id: 'http://adlnet.gov/expapi/verbs/completed',
        display: { 'en-US': 'completed' },
      },
      object: {
        id: `https://elevateforhumanity.org/lessons/${lessonId}`,
        definition: {
          name: { 'en-US': lessonName },
          type: 'http://adlnet.gov/expapi/activities/lesson',
        },
        objectType: 'Activity',
      },
      result: {
        completion: true,
        success: score ? score >= 70 : undefined,
        score: score
          ? {
              scaled: score / 100,
              raw: score,
              min: 0,
              max: 100,
            }
          : undefined,
        duration: duration ? `PT${duration}S` : undefined,
      },
      timestamp: new Date().toISOString(),
    };

    await this.sendStatement(statement);
  }
}
```

#### Phase 2: SCORM Support (Week 2)

```typescript
// lib/scorm/scorm-api.ts
export class SCORMAPIWrapper {
  private lmsAPI: any;
  private initialized: boolean = false;

  constructor() {
    this.lmsAPI = this.findAPI(window);
  }

  private findAPI(win: Window): any {
    let attempts = 0;
    const maxAttempts = 500;

    while (
      !win.API &&
      !win.API_1484_11 &&
      win.parent &&
      win.parent !== win &&
      attempts < maxAttempts
    ) {
      attempts++;
      win = win.parent;
    }

    return win.API || win.API_1484_11;
  }

  initialize(): boolean {
    if (this.initialized) return true;

    if (this.lmsAPI) {
      const result = this.lmsAPI.LMSInitialize
        ? this.lmsAPI.LMSInitialize('')
        : this.lmsAPI.Initialize('');

      this.initialized = result === 'true';
      return this.initialized;
    }

    return false;
  }

  getValue(element: string): string {
    if (!this.initialized) return '';

    return this.lmsAPI.LMSGetValue
      ? this.lmsAPI.LMSGetValue(element)
      : this.lmsAPI.GetValue(element);
  }

  setValue(element: string, value: string): boolean {
    if (!this.initialized) return false;

    const result = this.lmsAPI.LMSSetValue
      ? this.lmsAPI.LMSSetValue(element, value)
      : this.lmsAPI.SetValue(element, value);

    return result === 'true';
  }

  commit(): boolean {
    if (!this.initialized) return false;

    const result = this.lmsAPI.LMSCommit
      ? this.lmsAPI.LMSCommit('')
      : this.lmsAPI.Commit('');

    return result === 'true';
  }

  terminate(): boolean {
    if (!this.initialized) return false;

    const result = this.lmsAPI.LMSFinish
      ? this.lmsAPI.LMSFinish('')
      : this.lmsAPI.Terminate('');

    this.initialized = false;
    return result === 'true';
  }

  // Helper methods
  setScore(score: number, min: number = 0, max: number = 100): boolean {
    this.setValue('cmi.core.score.raw', score.toString());
    this.setValue('cmi.core.score.min', min.toString());
    this.setValue('cmi.core.score.max', max.toString());
    return this.commit();
  }

  setStatus(status: 'passed' | 'completed' | 'failed' | 'incomplete'): boolean {
    this.setValue('cmi.core.lesson_status', status);
    return this.commit();
  }

  setProgress(progress: number): boolean {
    this.setValue('cmi.core.lesson_location', progress.toString());
    return this.commit();
  }
}
```

---

## 3. Course Authoring 🔄

### Requirements

- Drag-and-drop course builder
- Lesson editor with rich text
- Quiz/assessment creator
- Media upload and management
- Course preview
- Version control
- Publishing workflow

### Implementation Plan

#### Phase 1: Course Builder UI (Week 1)

```typescript
// components/authoring/CourseBuilder.tsx
interface CourseStructure {
  id: string;
  title: string;
  description: string;
  modules: Module[];
}

interface Module {
  id: string;
  title: string;
  order: number;
  lessons: Lesson[];
}

interface Lesson {
  id: string;
  title: string;
  type: 'video' | 'text' | 'quiz' | 'assignment' | 'scorm';
  content: any;
  duration?: number;
  order: number;
}

export function CourseBuilder() {
  const [course, setCourse] = useState<CourseStructure | null>(null);
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null);

  // Drag and drop handlers
  const onDragEnd = (result: DropResult) => {
    // Reorder modules or lessons
  };

  // CRUD operations
  const addModule = () => { /* ... */ };
  const addLesson = (moduleId: string, type: Lesson['type']) => { /* ... */ };
  const updateLesson = (lessonId: string, content: any) => { /* ... */ };
  const deleteLesson = (lessonId: string) => { /* ... */ };

  return (
    <div className="course-builder">
      <CourseOutline
        course={course}
        onDragEnd={onDragEnd}
        onSelectModule={setSelectedModule}
        onSelectLesson={setSelectedLesson}
      />
      <LessonEditor
        lesson={selectedLesson}
        onUpdate={updateLesson}
      />
      <CoursePreview course={course} />
    </div>
  );
}
```

#### Phase 2: Rich Text Editor (Week 2)

```typescript
// components/authoring/RichTextEditor.tsx
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import CodeBlock from '@tiptap/extension-code-block';

export function RichTextEditor({ content, onChange }: {
  content: string;
  onChange: (content: string) => void;
}) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Link,
      CodeBlock
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    }
  });

  return (
    <div className="rich-text-editor">
      <EditorToolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
```

---

## 4. eCommerce 🔄

### Requirements

- Course pricing and packages
- Shopping cart
- Checkout process
- Payment gateway integration (Stripe)
- Subscription management
- Coupon/discount codes
- Invoice generation
- Refund handling

### Implementation Plan

#### Phase 1: Stripe Integration (Week 1)

```typescript
// lib/stripe/stripe-client.ts
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export async function createCheckoutSession(
  courseId: string,
  userId: string,
  priceId: string
) {
  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/courses/${courseId}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/courses/${courseId}`,
    client_reference_id: userId,
    metadata: {
      courseId,
      userId,
    },
  });

  return session;
}

export async function createSubscription(
  userId: string,
  priceId: string,
  customerId?: string
) {
  // Create or retrieve customer
  let customer = customerId;
  if (!customer) {
    const newCustomer = await stripe.customers.create({
      metadata: { userId },
    });
    customer = newCustomer.id;
  }

  // Create subscription
  const subscription = await stripe.subscriptions.create({
    customer,
    items: [{ price: priceId }],
    payment_behavior: 'default_incomplete',
    payment_settings: { save_default_payment_method: 'on_subscription' },
    expand: ['latest_invoice.payment_intent'],
  });

  return subscription;
}
```

#### Phase 2: Shopping Cart (Week 2)

```typescript
// components/ecommerce/ShoppingCart.tsx
interface CartItem {
  courseId: string;
  courseName: string;
  price: number;
  priceId: string;
}

export function ShoppingCart() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);

  const addToCart = (item: CartItem) => {
    setCart(prev => [...prev, item]);
  };

  const removeFromCart = (courseId: string) => {
    setCart(prev => prev.filter(item => item.courseId !== courseId));
  };

  const checkout = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: cart })
      });

      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      console.error('Checkout error:', error);
    } finally {
      setLoading(false);
    }
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="shopping-cart">
      {cart.map(item => (
        <CartItemCard
          key={item.courseId}
          item={item}
          onRemove={removeFromCart}
        />
      ))}
      <div className="cart-total">
        Total: ${total.toFixed(2)}
      </div>
      <Button onClick={checkout} disabled={loading || cart.length === 0}>
        {loading ? 'Processing...' : 'Checkout'}
      </Button>
    </div>
  );
}
```

#### Phase 3: Subscription Management (Week 3)

```typescript
// app/api/subscriptions/route.ts
export async function POST(request: Request) {
  const { userId, planId } = await request.json();

  // Create subscription
  const subscription = await createSubscription(userId, planId);

  // Save to database
  await supabase.from('subscriptions').insert({
    user_id: userId,
    stripe_subscription_id: subscription.id,
    status: subscription.status,
    current_period_start: new Date(subscription.current_period_start * 1000),
    current_period_end: new Date(subscription.current_period_end * 1000),
  });

  return Response.json({ subscription });
}
```

---

## 5. Gamification ✅

### Current Implementation

- **Location**: `components/gamification/`
- **Features**:
  - Achievement badges
  - Leaderboard
  - Points system
  - Progress tracking

### Enhancements Needed

- [ ] Add experience points (XP)
- [ ] Implement levels/ranks
- [ ] Add daily/weekly challenges
- [ ] Create achievement unlocking system
- [ ] Add social features (share achievements)
- [ ] Implement rewards/prizes

### Enhanced Implementation

```typescript
// lib/gamification/gamification-engine.ts
interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  points: number;
  criteria: AchievementCriteria;
}

interface AchievementCriteria {
  type:
    | 'lessons_completed'
    | 'courses_completed'
    | 'quiz_score'
    | 'streak_days'
    | 'total_time';
  threshold: number;
}

export class GamificationEngine {
  async checkAchievements(userId: string): Promise<Achievement[]> {
    const userStats = await this.getUserStats(userId);
    const allAchievements = await this.getAllAchievements();
    const earnedAchievements = await this.getEarnedAchievements(userId);

    const newAchievements: Achievement[] = [];

    for (const achievement of allAchievements) {
      if (earnedAchievements.some((a) => a.id === achievement.id)) {
        continue; // Already earned
      }

      if (this.meetsAchievementCriteria(userStats, achievement.criteria)) {
        await this.awardAchievement(userId, achievement);
        newAchievements.push(achievement);
      }
    }

    return newAchievements;
  }

  private meetsAchievementCriteria(
    stats: UserStats,
    criteria: AchievementCriteria
  ): boolean {
    switch (criteria.type) {
      case 'lessons_completed':
        return stats.lessonsCompleted >= criteria.threshold;
      case 'courses_completed':
        return stats.coursesCompleted >= criteria.threshold;
      case 'quiz_score':
        return stats.averageQuizScore >= criteria.threshold;
      case 'streak_days':
        return stats.currentStreak >= criteria.threshold;
      case 'total_time':
        return stats.totalStudyTime >= criteria.threshold;
      default:
        return false;
    }
  }

  async awardPoints(userId: string, points: number, reason: string) {
    await supabase.from('user_points').insert({
      user_id: userId,
      points,
      reason,
      awarded_at: new Date().toISOString(),
    });

    // Update total points
    await supabase.rpc('increment_user_points', {
      user_id: userId,
      points_to_add: points,
    });
  }
}
```

---

## Database Schema Updates

```sql
-- SCORM/xAPI tracking
CREATE TABLE xapi_statements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id),
  actor JSONB NOT NULL,
  verb JSONB NOT NULL,
  object JSONB NOT NULL,
  result JSONB,
  context JSONB,
  timestamp TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Course authoring
CREATE TABLE course_versions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  course_id UUID REFERENCES courses(id),
  version_number INTEGER NOT NULL,
  content JSONB NOT NULL,
  published BOOLEAN DEFAULT FALSE,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- eCommerce
CREATE TABLE purchases (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id),
  course_id UUID REFERENCES courses(id),
  amount DECIMAL(10,2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'USD',
  stripe_payment_intent_id VARCHAR(255),
  status VARCHAR(50) NOT NULL,
  purchased_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id),
  stripe_subscription_id VARCHAR(255) UNIQUE,
  status VARCHAR(50) NOT NULL,
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  cancel_at_period_end BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Gamification
CREATE TABLE achievements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  icon VARCHAR(255),
  points INTEGER DEFAULT 0,
  criteria JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE user_achievements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id),
  achievement_id UUID REFERENCES achievements(id),
  earned_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, achievement_id)
);

CREATE TABLE user_points (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id),
  points INTEGER NOT NULL,
  reason VARCHAR(255),
  awarded_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## Implementation Timeline

### Week 1-2: SCORM/xAPI

- Set up xAPI client
- Implement SCORM API wrapper
- Add tracking to existing components
- Test with SCORM content

### Week 3-4: Course Authoring

- Build course builder UI
- Implement rich text editor
- Add media management
- Create preview functionality

### Week 5-7: eCommerce

- Integrate Stripe
- Build shopping cart
- Implement checkout flow
- Add subscription management
- Test payment flows

### Week 8: Gamification Enhancements

- Add XP and levels
- Implement challenges
- Create achievement system
- Add social sharing

### Week 9: Testing & Polish

- End-to-end testing
- Performance optimization
- Bug fixes
- Documentation

---

## Dependencies to Install

```json
{
  "dependencies": {
    "@stripe/stripe-js": "^2.2.0",
    "stripe": "^14.5.0",
    "@xapi/xapi": "^2.0.0",
    "@tiptap/react": "^2.1.13",
    "@tiptap/starter-kit": "^2.1.13",
    "@tiptap/extension-image": "^2.1.13",
    "@tiptap/extension-link": "^2.1.13",
    "@dnd-kit/core": "^6.1.0",
    "@dnd-kit/sortable": "^8.0.0"
  }
}
```

---

## Environment Variables Needed

```env
# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# xAPI/LRS
XAPI_ENDPOINT=https://lrs.example.com/xapi
XAPI_USERNAME=your_username
XAPI_PASSWORD=your_password

# Feature Flags
ENABLE_ECOMMERCE=true
ENABLE_SCORM=true
ENABLE_COURSE_AUTHORING=true
```

---

## Testing Checklist

### Interactive Video

- [ ] Video plays correctly
- [ ] Quizzes appear at correct timestamps
- [ ] Progress is tracked
- [ ] Completion is recorded

### SCORM/xAPI

- [ ] Statements are sent correctly
- [ ] Progress is tracked
- [ ] Scores are recorded
- [ ] Completion is tracked

### Course Authoring

- [ ] Can create new courses
- [ ] Can add/edit/delete modules
- [ ] Can add/edit/delete lessons
- [ ] Preview works correctly
- [ ] Publishing works

### eCommerce

- [ ] Can add courses to cart
- [ ] Checkout flow works
- [ ] Payments process correctly
- [ ] Access is granted after purchase
- [ ] Subscriptions work correctly

### Gamification

- [ ] Achievements unlock correctly
- [ ] Points are awarded
- [ ] Leaderboard updates
- [ ] Badges display correctly

---

## Documentation Links

- [xAPI Specification](https://github.com/adlnet/xAPI-Spec)
- [SCORM Documentation](https://scorm.com/scorm-explained/)
- [Stripe Documentation](https://stripe.com/docs)
- [TipTap Editor](https://tiptap.dev/)

---

**Status**: Ready for implementation  
**Last Updated**: 2025-01-15  
**Next Review**: After Phase 1 completion
