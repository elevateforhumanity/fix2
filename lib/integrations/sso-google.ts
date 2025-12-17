/**
 * Google Workspace SSO Integration
 * OAuth 2.0, user sync, Google Classroom integration
 */

export interface GoogleSSOConfig {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  domain?: string; // For Google Workspace domain restriction
  scopes: string[];
}

export interface GoogleUser {
  id: string;
  email: string;
  name: string;
  givenName: string;
  familyName: string;
  picture: string;
  domain?: string;
  verified: boolean;
}

export interface GoogleClassroom {
  id: string;
  name: string;
  section: string;
  descriptionHeading: string;
  description: string;
  room: string;
  ownerId: string;
  courseState: 'ACTIVE' | 'ARCHIVED' | 'PROVISIONED' | 'DECLINED' | 'SUSPENDED';
  alternateLink: string;
  teacherGroupEmail: string;
  courseGroupEmail: string;
}

export interface GoogleClassroomStudent {
  courseId: string;
  userId: string;
  profile: {
    id: string;
    name: { fullName: string; givenName: string; familyName: string };
    emailAddress: string;
    photoUrl: string;
  };
}

/**
 * Google OAuth 2.0 Authentication
 */
export class GoogleSSOProvider {
  private config: GoogleSSOConfig;

  constructor(config: GoogleSSOConfig) {
    this.config = config;
  }

  /**
   * Get authorization URL
   */
  getAuthorizationUrl(state: string): string {
    const params = new URLSearchParams({
      client_id: this.config.clientId,
      redirect_uri: this.config.redirectUri,
      response_type: 'code',
      scope: this.config.scopes.join(' '),
      access_type: 'offline',
      prompt: 'consent',
      state,
    });

    if (this.config.domain) {
      params.append('hd', this.config.domain);
    }

    return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
  }

  /**
   * Exchange authorization code for tokens
   */
  async exchangeCodeForTokens(code: string): Promise<{
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
    idToken: string;
  }> {
    const response = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: this.config.clientId,
        client_secret: this.config.clientSecret,
        redirect_uri: this.config.redirectUri,
        grant_type: 'authorization_code',
      }),
    });

    const data = await response.json();

    return {
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
      expiresIn: data.expires_in,
      idToken: data.id_token,
    };
  }

  /**
   * Refresh access token
   */
  async refreshAccessToken(refreshToken: string): Promise<{
    accessToken: string;
    expiresIn: number;
  }> {
    const response = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        refresh_token: refreshToken,
        client_id: this.config.clientId,
        client_secret: this.config.clientSecret,
        grant_type: 'refresh_token',
      }),
    });

    const data = await response.json();

    return {
      accessToken: data.access_token,
      expiresIn: data.expires_in,
    };
  }

  /**
   * Get user info
   */
  async getUserInfo(accessToken: string): Promise<GoogleUser> {
    const response = await fetch(
      'https://www.googleapis.com/oauth2/v2/userinfo',
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    const data = await response.json();

    return {
      id: data.id,
      email: data.email,
      name: data.name,
      givenName: data.given_name,
      familyName: data.family_name,
      picture: data.picture,
      domain: data.hd,
      verified: data.verified_email,
    };
  }

  /**
   * Verify ID token
   */
  async verifyIdToken(idToken: string): Promise<GoogleUser> {
    const response = await fetch(
      `https://oauth2.googleapis.com/tokeninfo?id_token=${idToken}`
    );

    const data = await response.json();

    if (data.aud !== this.config.clientId) {
      throw new Error('Invalid token audience');
    }

    if (this.config.domain && data.hd !== this.config.domain) {
      throw new Error('Invalid domain');
    }

    return {
      id: data.sub,
      email: data.email,
      name: data.name,
      givenName: data.given_name,
      familyName: data.family_name,
      picture: data.picture,
      domain: data.hd,
      verified: data.email_verified === 'true',
    };
  }
}

/**
 * Google Classroom Integration
 */
export class GoogleClassroomIntegration {
  private accessToken: string;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }

  /**
   * List courses
   */
  async listCourses(): Promise<GoogleClassroom[]> {
    const response = await fetch(
      'https://classroom.googleapis.com/v1/courses?courseStates=ACTIVE',
      {
        headers: { Authorization: `Bearer ${this.accessToken}` },
      }
    );

    const data = await response.json();
    return data.courses || [];
  }

  /**
   * Get course
   */
  async getCourse(courseId: string): Promise<GoogleClassroom> {
    const response = await fetch(
      `https://classroom.googleapis.com/v1/courses/${courseId}`,
      {
        headers: { Authorization: `Bearer ${this.accessToken}` },
      }
    );

    return await response.json();
  }

  /**
   * List students in course
   */
  async listStudents(courseId: string): Promise<GoogleClassroomStudent[]> {
    const response = await fetch(
      `https://classroom.googleapis.com/v1/courses/${courseId}/students`,
      {
        headers: { Authorization: `Bearer ${this.accessToken}` },
      }
    );

    const data = await response.json();
    return data.students || [];
  }

  /**
   * Create course
   */
  async createCourse(course: {
    name: string;
    section?: string;
    description?: string;
    room?: string;
  }): Promise<GoogleClassroom> {
    const response = await fetch(
      'https://classroom.googleapis.com/v1/courses',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: course.name,
          section: course.section,
          descriptionHeading: course.description,
          room: course.room,
          ownerId: 'me',
          courseState: 'PROVISIONED',
        }),
      }
    );

    return await response.json();
  }

  /**
   * Sync course to Supabase
   */
  async syncCourseToSupabase(courseId: string) {
    const course = await this.getCourse(courseId);
    const students = await this.listStudents(courseId);

    const { createClient } = await import('@/lib/supabase/server');
    const supabase = await createClient();

    // Create/update course
    await supabase.from('courses').upsert(
      {
        google_classroom_id: course.id,
        title: course.name,
        description: course.description,
        section: course.section,
        status: course.courseState === 'ACTIVE' ? 'active' : 'archived',
      },
      {
        onConflict: 'google_classroom_id',
      }
    );

    // Sync students
    for (const student of students) {
      // Create/update user
      await supabase.from('profiles').upsert(
        {
          google_id: student.profile.id,
          email: student.profile.emailAddress,
          first_name: student.profile.name.givenName,
          last_name: student.profile.name.familyName,
          avatar_url: student.profile.photoUrl,
          role: 'student',
        },
        {
          onConflict: 'google_id',
        }
      );

      // Get course and user IDs
      const { data: courseData } = await supabase
        .from('courses')
        .select('id')
        .eq('google_classroom_id', courseId)
        .single();

      const { data: userData } = await supabase
        .from('profiles')
        .select('id')
        .eq('google_id', student.profile.id)
        .single();

      if (courseData && userData) {
        // Create enrollment
        await supabase.from('enrollments').upsert(
          {
            course_id: courseData.id,
            student_id: userData.id,
            status: 'active',
            enrolled_at: new Date().toISOString(),
          },
          {
            onConflict: 'course_id,student_id',
          }
        );
      }
    }

    return { course, students: students.length };
  }
}

/**
 * Google Calendar Integration
 */
export class GoogleCalendarIntegration {
  private accessToken: string;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }

  /**
   * Create calendar event
   */
  async createEvent(event: {
    summary: string;
    description?: string;
    start: Date;
    end: Date;
    location?: string;
    attendees?: string[];
  }) {
    const response = await fetch(
      'https://www.googleapis.com/calendar/v3/calendars/primary/events',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          summary: event.summary,
          description: event.description,
          start: { dateTime: event.start.toISOString() },
          end: { dateTime: event.end.toISOString() },
          location: event.location,
          attendees: event.attendees?.map((email) => ({ email })),
          reminders: {
            useDefault: false,
            overrides: [
              { method: 'email', minutes: 24 * 60 },
              { method: 'popup', minutes: 30 },
            ],
          },
        }),
      }
    );

    return await response.json();
  }

  /**
   * Sync assignment deadlines to calendar
   */
  async syncAssignmentDeadlines(courseId: string) {
    const { createClient } = await import('@/lib/supabase/server');
    const supabase = await createClient();

    const { data: assignments } = await supabase
      .from('assignments')
      .select('*, course:courses(*)')
      .eq('course_id', courseId)
      .gte('due_date', new Date().toISOString());

    // @ts-expect-error TS7030: Not all code paths return a value.
    if (!assignments) return;

    for (const assignment of assignments) {
      await this.createEvent({
        summary: `${assignment.course.title}: ${assignment.title}`,
        description: assignment.description,
        start: new Date(assignment.due_date),
        end: new Date(new Date(assignment.due_date).getTime() + 60 * 60 * 1000), // 1 hour
      });
    }

    return assignments.length;
  }
}

/**
 * Initialize Google SSO for user
 */
export async function initializeGoogleSSO(userId: string, code: string) {
  const config: GoogleSSOConfig = {
    clientId: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    redirectUri: process.env.GOOGLE_REDIRECT_URI!,
    scopes: [
      'openid',
      'email',
      'profile',
      'https://www.googleapis.com/auth/classroom.courses.readonly',
      'https://www.googleapis.com/auth/classroom.rosters.readonly',
      'https://www.googleapis.com/auth/calendar.events',
    ],
  };

  const provider = new GoogleSSOProvider(config);
  const tokens = await provider.exchangeCodeForTokens(code);
  const user = await provider.getUserInfo(tokens.accessToken);

  // Store tokens in Supabase
  const { createClient } = await import('@/lib/supabase/server');
  const supabase = await createClient();

  await supabase.from('oauth_tokens').upsert(
    {
      user_id: userId,
      provider: 'google',
      access_token: tokens.accessToken,
      refresh_token: tokens.refreshToken,
      expires_at: new Date(Date.now() + tokens.expiresIn * 1000).toISOString(),
    },
    {
      onConflict: 'user_id,provider',
    }
  );

  // Update user profile
  await supabase
    .from('profiles')
    .update({
      google_id: user.id,
      avatar_url: user.picture,
    })
    .eq('id', userId);

  return user;
}
