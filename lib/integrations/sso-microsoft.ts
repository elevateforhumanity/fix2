/**
 * Microsoft 365 / Azure AD SSO Integration
 * OAuth 2.0, user sync, Teams integration, Outlook Calendar
 */

export interface MicrosoftSSOConfig {
  clientId: string;
  clientSecret: string;
  tenantId: string;
  redirectUri: string;
  scopes: string[];
}

export interface MicrosoftUser {
  id: string;
  userPrincipalName: string;
  displayName: string;
  givenName: string;
  surname: string;
  mail: string;
  jobTitle?: string;
  officeLocation?: string;
  mobilePhone?: string;
}

export interface TeamsChannel {
  id: string;
  displayName: string;
  description: string;
  webUrl: string;
  membershipType: 'standard' | 'private';
}

export interface TeamsMeeting {
  id: string;
  subject: string;
  startDateTime: string;
  endDateTime: string;
  joinWebUrl: string;
  participants: {
    organizer: { identity: { user: { displayName: string; id: string } } };
    attendees: { identity: { user: { displayName: string; id: string } } }[];
  };
}

/**
 * Microsoft Azure AD OAuth 2.0
 */
export class MicrosoftSSOProvider {
  private config: MicrosoftSSOConfig;

  constructor(config: MicrosoftSSOConfig) {
    this.config = config;
  }

  /**
   * Get authorization URL
   */
  getAuthorizationUrl(state: string): string {
    const params = new URLSearchParams({
      client_id: this.config.clientId,
      response_type: 'code',
      redirect_uri: this.config.redirectUri,
      response_mode: 'query',
      scope: this.config.scopes.join(' '),
      state,
    });

    return `https://login.microsoftonline.com/${this.config.tenantId}/oauth2/v2.0/authorize?${params.toString()}`;
  }

  /**
   * Exchange code for tokens
   */
  async exchangeCodeForTokens(code: string): Promise<{
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
    idToken: string;
  }> {
    const response = await fetch(
      `https://login.microsoftonline.com/${this.config.tenantId}/oauth2/v2.0/token`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          client_id: this.config.clientId,
          client_secret: this.config.clientSecret,
          code,
          redirect_uri: this.config.redirectUri,
          grant_type: 'authorization_code',
        }),
      }
    );

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
    const response = await fetch(
      `https://login.microsoftonline.com/${this.config.tenantId}/oauth2/v2.0/token`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          client_id: this.config.clientId,
          client_secret: this.config.clientSecret,
          refresh_token: refreshToken,
          grant_type: 'refresh_token',
        }),
      }
    );

    const data = await response.json();

    return {
      accessToken: data.access_token,
      expiresIn: data.expires_in,
    };
  }

  /**
   * Get user info
   */
  async getUserInfo(accessToken: string): Promise<MicrosoftUser> {
    const response = await fetch('https://graph.microsoft.com/v1.0/me', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    return await response.json();
  }
}

/**
 * Microsoft Teams Integration
 */
export class MicrosoftTeamsIntegration {
  private accessToken: string;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }

  /**
   * Create team
   */
  async createTeam(team: {
    displayName: string;
    description: string;
    visibility: 'private' | 'public';
  }) {
    const response = await fetch('https://graph.microsoft.com/v1.0/teams', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'template@odata.bind':
          "https://graph.microsoft.com/v1.0/teamsTemplates('educationClass')",
        displayName: team.displayName,
        description: team.description,
        visibility: team.visibility,
      }),
    });

    return await response.json();
  }

  /**
   * Create channel
   */
  async createChannel(
    teamId: string,
    channel: { displayName: string; description: string }
  ): Promise<TeamsChannel> {
    const response = await fetch(
      `https://graph.microsoft.com/v1.0/teams/${teamId}/channels`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(channel),
      }
    );

    return await response.json();
  }

  /**
   * Create online meeting
   */
  async createOnlineMeeting(meeting: {
    subject: string;
    startDateTime: Date;
    endDateTime: Date;
    participants?: string[];
  }): Promise<TeamsMeeting> {
    const response = await fetch(
      'https://graph.microsoft.com/v1.0/me/onlineMeetings',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subject: meeting.subject,
          startDateTime: meeting.startDateTime.toISOString(),
          endDateTime: meeting.endDateTime.toISOString(),
          participants: {
            attendees: meeting.participants?.map((email) => ({
              identity: { user: { id: email } },
              upn: email,
            })),
          },
        }),
      }
    );

    return await response.json();
  }

  /**
   * Add member to team
   */
  async addMemberToTeam(
    teamId: string,
    userId: string,
    role: 'owner' | 'member'
  ) {
    const response = await fetch(
      `https://graph.microsoft.com/v1.0/teams/${teamId}/members`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          '@odata.type': '#microsoft.graph.aadUserConversationMember',
          roles: role === 'owner' ? ['owner'] : [],
          'user@odata.bind': `https://graph.microsoft.com/v1.0/users('${userId}')`,
        }),
      }
    );

    return await response.json();
  }

  /**
   * Sync course to Teams
   */
  async syncCourseToTeams(courseId: string) {
    const { createClient } = await import('@/lib/supabase/server');
    const supabase = await createClient();

    // Get course
    const { data: course } = await supabase
      .from('courses')
      .select('*, enrollments(*, student:profiles(*))')
      .eq('id', courseId)
      .single();

    if (!course) throw new Error('Course not found');

    // Create team
    const team = await this.createTeam({
      displayName: course.title,
      description: course.description || '',
      visibility: 'private',
    });

    // Add students
    for (const enrollment of course.enrollments) {
      if (enrollment.student.microsoft_id) {
        await this.addMemberToTeam(
          team.id,
          enrollment.student.microsoft_id,
          'member'
        );
      }
    }

    // Update course with team ID
    await supabase
      .from('courses')
      .update({ microsoft_teams_id: team.id })
      .eq('id', courseId);

    return team;
  }
}

/**
 * Outlook Calendar Integration
 */
export class OutlookCalendarIntegration {
  private accessToken: string;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }

  /**
   * Create calendar event
   */
  async createEvent(event: {
    subject: string;
    body?: string;
    start: Date;
    end: Date;
    location?: string;
    attendees?: string[];
    isOnlineMeeting?: boolean;
  }) {
    const response = await fetch('https://graph.microsoft.com/v1.0/me/events', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        subject: event.subject,
        body: {
          contentType: 'HTML',
          content: event.body || '',
        },
        start: {
          dateTime: event.start.toISOString(),
          timeZone: 'UTC',
        },
        end: {
          dateTime: event.end.toISOString(),
          timeZone: 'UTC',
        },
        location: event.location ? { displayName: event.location } : undefined,
        attendees: event.attendees?.map((email) => ({
          emailAddress: { address: email },
          type: 'required',
        })),
        isOnlineMeeting: event.isOnlineMeeting || false,
        onlineMeetingProvider: event.isOnlineMeeting
          ? 'teamsForBusiness'
          : undefined,
      }),
    });

    return await response.json();
  }

  /**
   * Sync assignment deadlines
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
        subject: `${assignment.course.title}: ${assignment.title}`,
        body: assignment.description,
        start: new Date(assignment.due_date),
        end: new Date(new Date(assignment.due_date).getTime() + 60 * 60 * 1000),
      });
    }

    return assignments.length;
  }
}

/**
 * Initialize Microsoft SSO
 */
export async function initializeMicrosoftSSO(userId: string, code: string) {
  const config: MicrosoftSSOConfig = {
    clientId: process.env.MICROSOFT_CLIENT_ID!,
    clientSecret: process.env.MICROSOFT_CLIENT_SECRET!,
    tenantId: process.env.MICROSOFT_TENANT_ID || 'common',
    redirectUri: process.env.MICROSOFT_REDIRECT_URI!,
    scopes: [
      'openid',
      'profile',
      'email',
      'User.Read',
      'Team.Create',
      'TeamMember.ReadWrite.All',
      'OnlineMeetings.ReadWrite',
      'Calendars.ReadWrite',
    ],
  };

  const provider = new MicrosoftSSOProvider(config);
  const tokens = await provider.exchangeCodeForTokens(code);
  const user = await provider.getUserInfo(tokens.accessToken);

  // Store tokens
  const { createClient } = await import('@/lib/supabase/server');
  const supabase = await createClient();

  await supabase.from('oauth_tokens').upsert(
    {
      user_id: userId,
      provider: 'microsoft',
      access_token: tokens.accessToken,
      refresh_token: tokens.refreshToken,
      expires_at: new Date(Date.now() + tokens.expiresIn * 1000).toISOString(),
    },
    {
      onConflict: 'user_id,provider',
    }
  );

  // Update profile
  await supabase
    .from('profiles')
    .update({
      microsoft_id: user.id,
      job_title: user.jobTitle,
      office_location: user.officeLocation,
    })
    .eq('id', userId);

  return user;
}
