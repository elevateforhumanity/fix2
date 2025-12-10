# Compliance & Tracking Systems - Complete Implementation
## SCORM, xAPI, Certificates, Compliance

**Date**: December 10, 2024  
**Priority**: Compliance features for workforce training

---

## CURRENT STATUS CHECK

Let me verify what already exists:

### Existing Systems ✅

**Certificate System**:
- ✅ `/lib/certificate-generator.ts` - EXISTS
- ✅ `/lib/certificates/generate-certificate.ts` - EXISTS
- ✅ `/lib/certificates/certificate-generator.ts` - EXISTS
- ✅ `/lib/certificates/generator.ts` - EXISTS
- ✅ Certificate generation is IMPLEMENTED

**Compliance Tracking**:
- ✅ `/app/admin/compliance` - EXISTS
- ✅ `/app/admin/compliance-dashboard` - EXISTS
- ✅ `/app/admin/audit-logs` - EXISTS
- ✅ Compliance pages are BUILT

**Data Export**:
- ✅ `/lib/dataExport.ts` - EXISTS
- ✅ Data export functionality is IMPLEMENTED

### What Needs Enhancement:

1. SCORM player integration
2. xAPI (Tin Can API) tracking
3. Enhanced attendance tracking
4. GDPR compliance tools
5. Accessibility features

---

## 1. SCORM PLAYER IMPLEMENTATION

### A. SCORM Player Component

```typescript
// /components/scorm/SCORMPlayer.tsx
'use client';

import { useEffect, useRef, useState } from 'react';

interface SCORMPlayerProps {
  packageUrl: string;
  lessonId: string;
  userId: string;
  onComplete?: () => void;
}

export function SCORMPlayer({ packageUrl, lessonId, userId, onComplete }: SCORMPlayerProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [scormData, setSCORMData] = useState({
    status: 'not attempted',
    score: 0,
    progress: 0,
    suspendData: '',
  });

  useEffect(() => {
    // Load existing SCORM data
    loadSCORMData();

    // Set up SCORM API
    setupSCORMAPI();

    return () => {
      // Save SCORM data on unmount
      saveSCORMData();
    };
  }, []);

  const loadSCORMData = async () => {
    try {
      const response = await fetch(`/api/scorm/data/${lessonId}`);
      const data = await response.json();
      setSCORMData(data);
    } catch (error) {
      console.error('Failed to load SCORM data:', error);
    }
  };

  const saveSCORMData = async () => {
    try {
      await fetch('/api/scorm/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lessonId,
          userId,
          ...scormData,
        }),
      });
    } catch (error) {
      console.error('Failed to save SCORM data:', error);
    }
  };

  const setupSCORMAPI = () => {
    // SCORM 1.2 API
    (window as any).API = {
      LMSInitialize: () => {
        console.log('SCORM: LMSInitialize');
        return 'true';
      },
      LMSFinish: () => {
        console.log('SCORM: LMSFinish');
        saveSCORMData();
        return 'true';
      },
      LMSGetValue: (element: string) => {
        console.log('SCORM: LMSGetValue', element);
        switch (element) {
          case 'cmi.core.lesson_status':
            return scormData.status;
          case 'cmi.core.score.raw':
            return scormData.score.toString();
          case 'cmi.suspend_data':
            return scormData.suspendData;
          default:
            return '';
        }
      },
      LMSSetValue: (element: string, value: string) => {
        console.log('SCORM: LMSSetValue', element, value);
        setSCORMData(prev => {
          const newData = { ...prev };
          switch (element) {
            case 'cmi.core.lesson_status':
              newData.status = value;
              if (value === 'completed' || value === 'passed') {
                onComplete?.();
              }
              break;
            case 'cmi.core.score.raw':
              newData.score = parseFloat(value);
              break;
            case 'cmi.suspend_data':
              newData.suspendData = value;
              break;
          }
          return newData;
        });
        return 'true';
      },
      LMSCommit: () => {
        console.log('SCORM: LMSCommit');
        saveSCORMData();
        return 'true';
      },
      LMSGetLastError: () => '0',
      LMSGetErrorString: () => '',
      LMSGetDiagnostic: () => '',
    };

    // SCORM 2004 API
    (window as any).API_1484_11 = {
      Initialize: () => 'true',
      Terminate: () => {
        saveSCORMData();
        return 'true';
      },
      GetValue: (element: string) => {
        switch (element) {
          case 'cmi.completion_status':
            return scormData.status;
          case 'cmi.score.raw':
            return scormData.score.toString();
          case 'cmi.suspend_data':
            return scormData.suspendData;
          default:
            return '';
        }
      },
      SetValue: (element: string, value: string) => {
        setSCORMData(prev => {
          const newData = { ...prev };
          switch (element) {
            case 'cmi.completion_status':
              newData.status = value;
              if (value === 'completed') {
                onComplete?.();
              }
              break;
            case 'cmi.score.raw':
              newData.score = parseFloat(value);
              break;
            case 'cmi.suspend_data':
              newData.suspendData = value;
              break;
          }
          return newData;
        });
        return 'true';
      },
      Commit: () => {
        saveSCORMData();
        return 'true';
      },
      GetLastError: () => '0',
      GetErrorString: () => '',
      GetDiagnostic: () => '',
    };
  };

  return (
    <div className="relative w-full h-screen bg-gray-100">
      <iframe
        ref={iframeRef}
        src={packageUrl}
        className="w-full h-full border-0"
        title="SCORM Content"
        sandbox="allow-scripts allow-same-origin allow-forms"
      />
      
      {/* Progress Indicator */}
      <div className="absolute top-4 right-4 bg-white rounded-lg shadow p-4">
        <div className="text-sm font-semibold mb-2">Progress</div>
        <div className="w-32 h-2 bg-gray-200 rounded-full">
          <div 
            className="h-full bg-blue-500 rounded-full transition-all"
            style={{ width: `${scormData.progress}%` }}
          />
        </div>
        <div className="text-xs text-gray-600 mt-1">
          Status: {scormData.status}
        </div>
        {scormData.score > 0 && (
          <div className="text-xs text-gray-600">
            Score: {scormData.score}%
          </div>
        )}
      </div>
    </div>
  );
}
```

### B. SCORM API Routes

```typescript
// /app/api/scorm/save/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { lessonId, userId, status, score, progress, suspendData } = await request.json();

    const { error } = await supabase
      .from('scorm_data')
      .upsert({
        user_id: userId,
        lesson_id: lessonId,
        status,
        score,
        progress,
        suspend_data: suspendData,
        updated_at: new Date().toISOString(),
      }, {
        onConflict: 'user_id,lesson_id',
      });

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('SCORM save error:', error);
    return NextResponse.json({ error: 'Failed to save SCORM data' }, { status: 500 });
  }
}
```

---

## 2. xAPI (TIN CAN API) TRACKING

### A. xAPI Statement Generator

```typescript
// /lib/xapi/statement-generator.ts
interface xAPIStatement {
  actor: {
    name: string;
    mbox: string;
  };
  verb: {
    id: string;
    display: { 'en-US': string };
  };
  object: {
    id: string;
    definition: {
      name: { 'en-US': string };
      description: { 'en-US': string };
      type: string;
    };
  };
  result?: {
    score?: {
      scaled: number;
      raw: number;
      min: number;
      max: number;
    };
    completion?: boolean;
    success?: boolean;
    duration?: string;
  };
  context?: {
    registration?: string;
    contextActivities?: any;
  };
  timestamp: string;
}

export class xAPITracker {
  private endpoint: string;
  private auth: string;

  constructor(endpoint: string, username: string, password: string) {
    this.endpoint = endpoint;
    this.auth = btoa(`${username}:${password}`);
  }

  async sendStatement(statement: xAPIStatement): Promise<void> {
    try {
      const response = await fetch(`${this.endpoint}/statements`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${this.auth}`,
          'X-Experience-API-Version': '1.0.3',
        },
        body: JSON.stringify(statement),
      });

      if (!response.ok) {
        throw new Error(`xAPI error: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Failed to send xAPI statement:', error);
    }
  }

  createStatement(
    userId: string,
    userEmail: string,
    userName: string,
    verb: string,
    objectId: string,
    objectName: string,
    result?: any
  ): xAPIStatement {
    const verbs: Record<string, { id: string; display: string }> = {
      'completed': {
        id: 'http://adlnet.gov/expapi/verbs/completed',
        display: 'completed',
      },
      'passed': {
        id: 'http://adlnet.gov/expapi/verbs/passed',
        display: 'passed',
      },
      'failed': {
        id: 'http://adlnet.gov/expapi/verbs/failed',
        display: 'failed',
      },
      'attempted': {
        id: 'http://adlnet.gov/expapi/verbs/attempted',
        display: 'attempted',
      },
      'experienced': {
        id: 'http://adlnet.gov/expapi/verbs/experienced',
        display: 'experienced',
      },
    };

    return {
      actor: {
        name: userName,
        mbox: `mailto:${userEmail}`,
      },
      verb: {
        id: verbs[verb].id,
        display: { 'en-US': verbs[verb].display },
      },
      object: {
        id: objectId,
        definition: {
          name: { 'en-US': objectName },
          description: { 'en-US': objectName },
          type: 'http://adlnet.gov/expapi/activities/course',
        },
      },
      result,
      timestamp: new Date().toISOString(),
    };
  }

  async trackCourseCompletion(
    userId: string,
    userEmail: string,
    userName: string,
    courseId: string,
    courseName: string,
    score?: number,
    duration?: number
  ): Promise<void> {
    const statement = this.createStatement(
      userId,
      userEmail,
      userName,
      'completed',
      `https://elevateforhumanity.org/courses/${courseId}`,
      courseName,
      {
        completion: true,
        success: score ? score >= 70 : undefined,
        score: score ? {
          scaled: score / 100,
          raw: score,
          min: 0,
          max: 100,
        } : undefined,
        duration: duration ? `PT${duration}S` : undefined,
      }
    );

    await this.sendStatement(statement);
  }
}

// Usage
export async function trackLessonCompletion(
  userId: string,
  userEmail: string,
  userName: string,
  lessonId: string,
  lessonName: string
) {
  const tracker = new xAPITracker(
    process.env.XAPI_ENDPOINT || '',
    process.env.XAPI_USERNAME || '',
    process.env.XAPI_PASSWORD || ''
  );

  await tracker.trackCourseCompletion(
    userId,
    userEmail,
    userName,
    lessonId,
    lessonName
  );
}
```

---

## 3. ATTENDANCE TRACKING

### A. Attendance System

```typescript
// /lib/attendance/tracker.ts
import { createClient } from '@/lib/supabase/server';

export async function recordAttendance(
  userId: string,
  sessionId: string,
  sessionType: 'live_class' | 'webinar' | 'lab' | 'exam'
) {
  const supabase = await createClient();

  const { error } = await supabase
    .from('attendance')
    .insert({
      user_id: userId,
      session_id: sessionId,
      session_type: sessionType,
      check_in_time: new Date().toISOString(),
      status: 'present',
    });

  if (error) {
    console.error('Attendance recording error:', error);
    throw error;
  }
}

export async function recordCheckOut(attendanceId: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from('attendance')
    .update({
      check_out_time: new Date().toISOString(),
    })
    .eq('id', attendanceId);

  if (error) {
    console.error('Check-out error:', error);
    throw error;
  }
}

export async function getAttendanceReport(
  userId: string,
  startDate: string,
  endDate: string
) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('attendance')
    .select('*')
    .eq('user_id', userId)
    .gte('check_in_time', startDate)
    .lte('check_in_time', endDate)
    .order('check_in_time', { ascending: false });

  if (error) throw error;

  return data;
}
```

### B. Attendance UI Component

```typescript
// /components/attendance/AttendanceTracker.tsx
'use client';

import { useState, useEffect } from 'react';

export function AttendanceTracker({ sessionId, sessionType }: { sessionId: string; sessionType: string }) {
  const [attendanceId, setAttendanceId] = useState<string | null>(null);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    // Record check-in
    const checkIn = async () => {
      const response = await fetch('/api/attendance/check-in', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, sessionType }),
      });
      const data = await response.json();
      setAttendanceId(data.attendanceId);
    };

    checkIn();

    // Track duration
    const interval = setInterval(() => {
      setDuration(d => d + 1);
    }, 1000);

    // Record check-out on unmount
    return () => {
      clearInterval(interval);
      if (attendanceId) {
        fetch('/api/attendance/check-out', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ attendanceId }),
        });
      }
    };
  }, [sessionId, sessionType]);

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
        <span className="font-semibold">Attendance: {formatDuration(duration)}</span>
      </div>
    </div>
  );
}
```

---

## 4. GDPR COMPLIANCE TOOLS

### A. Data Export Tool

```typescript
// /app/api/gdpr/export/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Collect all user data
    const userData = {
      profile: await getUserProfile(user.id),
      enrollments: await getUserEnrollments(user.id),
      progress: await getUserProgress(user.id),
      certificates: await getUserCertificates(user.id),
      attendance: await getUserAttendance(user.id),
      payments: await getUserPayments(user.id),
    };

    // Create JSON file
    const json = JSON.stringify(userData, null, 2);
    
    return new NextResponse(json, {
      headers: {
        'Content-Type': 'application/json',
        'Content-Disposition': `attachment; filename="user-data-${user.id}.json"`,
      },
    });
  } catch (error) {
    console.error('Data export error:', error);
    return NextResponse.json({ error: 'Export failed' }, { status: 500 });
  }
}

async function getUserProfile(userId: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  return data;
}

async function getUserEnrollments(userId: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from('enrollments')
    .select('*')
    .eq('user_id', userId);
  return data;
}

async function getUserProgress(userId: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from('lesson_progress')
    .select('*')
    .eq('user_id', userId);
  return data;
}

async function getUserCertificates(userId: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from('certificates')
    .select('*')
    .eq('user_id', userId);
  return data;
}

async function getUserAttendance(userId: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from('attendance')
    .select('*')
    .eq('user_id', userId);
  return data;
}

async function getUserPayments(userId: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from('payments')
    .select('*')
    .eq('user_id', userId);
  return data;
}
```

### B. Data Deletion Tool

```typescript
// /app/api/gdpr/delete/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Delete user data (keep compliance records for legal requirements)
    await supabase.from('profiles').delete().eq('id', user.id);
    await supabase.from('lesson_progress').delete().eq('user_id', user.id);
    await supabase.from('attendance').delete().eq('user_id', user.id);
    
    // Anonymize instead of delete (for compliance)
    await supabase
      .from('enrollments')
      .update({ user_id: 'deleted-user', anonymized: true })
      .eq('user_id', user.id);

    await supabase
      .from('certificates')
      .update({ user_id: 'deleted-user', anonymized: true })
      .eq('user_id', user.id);

    // Delete auth user
    await supabase.auth.admin.deleteUser(user.id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Data deletion error:', error);
    return NextResponse.json({ error: 'Deletion failed' }, { status: 500 });
  }
}
```

---

## 5. ACCESSIBILITY FEATURES

### A. Keyboard Navigation

```typescript
// /components/accessibility/KeyboardNav.tsx
'use client';

import { useEffect } from 'react';

export function KeyboardNavigation() {
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Skip to main content (Alt + 1)
      if (e.altKey && e.key === '1') {
        document.getElementById('main-content')?.focus();
      }
      
      // Skip to navigation (Alt + 2)
      if (e.altKey && e.key === '2') {
        document.getElementById('main-nav')?.focus();
      }
      
      // Skip to search (Alt + 3)
      if (e.altKey && e.key === '3') {
        document.getElementById('search')?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <div className="sr-only">
      <a href="#main-content" className="skip-link">
        Skip to main content (Alt + 1)
      </a>
      <a href="#main-nav" className="skip-link">
        Skip to navigation (Alt + 2)
      </a>
      <a href="#search" className="skip-link">
        Skip to search (Alt + 3)
      </a>
    </div>
  );
}
```

### B. Screen Reader Support

```typescript
// /components/accessibility/ScreenReaderAnnouncer.tsx
'use client';

import { useEffect, useState } from 'react';

export function ScreenReaderAnnouncer() {
  const [announcement, setAnnouncement] = useState('');

  useEffect(() => {
    // Listen for route changes
    const handleRouteChange = () => {
      const pageTitle = document.title;
      setAnnouncement(`Navigated to ${pageTitle}`);
    };

    window.addEventListener('popstate', handleRouteChange);
    return () => window.removeEventListener('popstate', handleRouteChange);
  }, []);

  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className="sr-only"
    >
      {announcement}
    </div>
  );
}
```

---

## DEPLOYMENT STATUS

### What's Already Built ✅:
- Certificate generation system
- Compliance dashboard
- Audit logs
- Data export functionality
- Basic accessibility

### What Needs Adding:
- SCORM player (1 day)
- xAPI tracking (1 day)
- Enhanced attendance (1 day)
- GDPR tools (1 day)
- Enhanced accessibility (1 day)

**Total**: 5 days to complete all compliance features

### Recommendation:

**Deploy now** with existing features. Add compliance enhancements in Week 1-2 post-launch based on actual regulatory requirements and user needs.

Most workforce training programs don't need SCORM/xAPI immediately. Add when required by specific contracts or compliance needs.
