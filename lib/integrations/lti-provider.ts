/**
 * LTI 1.3 Provider Implementation
 * Allows partners to integrate EFH into their existing LMS/SIS systems
 */

import { SignJWT, jwtVerify } from 'jose';

export interface LTIPlatform {
  id: string;
  name: string;
  clientId: string;
  deploymentId: string;
  authorizationUrl: string;
  tokenUrl: string;
  jwksUrl: string;
  publicKey: string;
}

export interface LTILaunchRequest {
  iss: string; // Platform issuer
  aud: string; // Client ID
  sub: string; // User ID
  exp: number;
  iat: number;
  nonce: string;
  
  // LTI claims
  'https://purl.imsglobal.org/spec/lti/claim/message_type': 'LtiResourceLinkRequest' | 'LtiDeepLinkingRequest';
  'https://purl.imsglobal.org/spec/lti/claim/version': '1.3.0';
  'https://purl.imsglobal.org/spec/lti/claim/deployment_id': string;
  'https://purl.imsglobal.org/spec/lti/claim/target_link_uri': string;
  'https://purl.imsglobal.org/spec/lti/claim/resource_link': {
    id: string;
    title?: string;
    description?: string;
  };
  'https://purl.imsglobal.org/spec/lti/claim/roles': string[];
  'https://purl.imsglobal.org/spec/lti/claim/context': {
    id: string;
    label?: string;
    title?: string;
    type?: string[];
  };
  'https://purl.imsglobal.org/spec/lti/claim/launch_presentation': {
    document_target?: 'iframe' | 'window';
    return_url?: string;
    locale?: string;
  };
  'https://purl.imsglobal.org/spec/lti/claim/custom'?: Record<string, string>;
  
  // User info
  name?: string;
  given_name?: string;
  family_name?: string;
  email?: string;
  picture?: string;
}

export interface LTIDeepLinkingResponse {
  type: 'ltiResourceLink';
  title: string;
  url: string;
  custom?: Record<string, string>;
}

/**
 * LTI 1.3 Provider
 */
export class LTIProvider {
  private platforms: Map<string, LTIPlatform> = new Map();
  private privateKey: string;
  private publicKey: string;
  private issuer: string;

  constructor(config: {
    privateKey: string;
    publicKey: string;
    issuer: string;
  }) {
    this.privateKey = config.privateKey;
    this.publicKey = config.publicKey;
    this.issuer = config.issuer;
  }

  /**
   * Register LTI platform
   */
  registerPlatform(platform: LTIPlatform) {
    this.platforms.set(platform.clientId, platform);
  }

  /**
   * Handle OIDC login initiation
   */
  async handleLoginInitiation(params: {
    iss: string;
    login_hint: string;
    target_link_uri: string;
    lti_message_hint?: string;
    client_id: string;
  }): Promise<string> {
    const platform = this.platforms.get(params.client_id);
    if (!platform) {
      throw new Error('Unknown platform');
    }

    const state = crypto.randomUUID();
    const nonce = crypto.randomUUID();

    // Store state and nonce for validation
    // In production, store in Redis/database
    
    const authParams = new URLSearchParams({
      response_type: 'id_token',
      response_mode: 'form_post',
      scope: 'openid',
      client_id: params.client_id,
      redirect_uri: params.target_link_uri,
      login_hint: params.login_hint,
      state,
      nonce,
      prompt: 'none',
    });

    if (params.lti_message_hint) {
      authParams.append('lti_message_hint', params.lti_message_hint);
    }

    return `${platform.authorizationUrl}?${authParams.toString()}`;
  }

  /**
   * Validate LTI launch request
   */
  async validateLaunchRequest(idToken: string, state: string): Promise<LTILaunchRequest> {
    // Decode without verification first to get issuer
    const decoded = JSON.parse(
      Buffer.from(idToken.split('.')[1], 'base64').toString()
    );

    const platform = this.platforms.get(decoded.aud);
    if (!platform) {
      throw new Error('Unknown platform');
    }

    // Fetch platform's public key
    const jwks = await this.fetchJWKS(platform.jwksUrl);
    
    // Verify JWT
    const { payload } = await jwtVerify(idToken, jwks);

    // Validate claims
    if (payload.iss !== platform.id) {
      throw new Error('Invalid issuer');
    }

    if (payload.aud !== platform.clientId) {
      throw new Error('Invalid audience');
    }

    // Validate state and nonce
    // In production, check against stored values

    return payload as unknown as LTILaunchRequest;
  }

  /**
   * Process LTI launch
   */
  async processLaunch(launchRequest: LTILaunchRequest) {
    const { createClient } = await import('@/lib/supabase/server');
    const supabase = await createClient();

    // Extract user info
    const userId = launchRequest.sub;
    const email = launchRequest.email;
    const roles = launchRequest['https://purl.imsglobal.org/spec/lti/claim/roles'];
    const context = launchRequest['https://purl.imsglobal.org/spec/lti/claim/context'];
    const resourceLink = launchRequest['https://purl.imsglobal.org/spec/lti/claim/resource_link'];

    // Determine role
    let role = 'student';
    if (roles.some(r => r.includes('Instructor') || r.includes('Teacher'))) {
      role = 'instructor';
    } else if (roles.some(r => r.includes('Administrator'))) {
      role = 'admin';
    }

    // Create or update user
    const { data: user } = await supabase.from('profiles').upsert({
      lti_user_id: userId,
      email,
      first_name: launchRequest.given_name,
      last_name: launchRequest.family_name,
      avatar_url: launchRequest.picture,
      role,
    }, {
      onConflict: 'lti_user_id',
    }).select().single();

    // Create or update course context
    if (context) {
      const { data: course } = await supabase.from('courses').upsert({
        lti_context_id: context.id,
        title: context.title || context.label || 'Untitled Course',
        status: 'active',
      }, {
        onConflict: 'lti_context_id',
      }).select().single();

      // Enroll user in course
      if (course && user) {
        await supabase.from('enrollments').upsert({
          course_id: course.id,
          student_id: user.id,
          status: 'active',
          enrolled_at: new Date().toISOString(),
        }, {
          onConflict: 'course_id,student_id',
        });
      }
    }

    return {
      user,
      context,
      resourceLink,
    };
  }

  /**
   * Create deep linking response
   */
  async createDeepLinkingResponse(
    launchRequest: LTILaunchRequest,
    resources: LTIDeepLinkingResponse[]
  ): Promise<string> {
    const deepLinkingSettings = launchRequest['https://purl.imsglobal.org/spec/lti-dl/claim/deep_linking_settings'];
    
    const jwt = await new SignJWT({
      iss: this.issuer,
      aud: launchRequest.iss,
      exp: Math.floor(Date.now() / 1000) + 600,
      iat: Math.floor(Date.now() / 1000),
      nonce: crypto.randomUUID(),
      'https://purl.imsglobal.org/spec/lti/claim/message_type': 'LtiDeepLinkingResponse',
      'https://purl.imsglobal.org/spec/lti/claim/version': '1.3.0',
      'https://purl.imsglobal.org/spec/lti/claim/deployment_id': launchRequest['https://purl.imsglobal.org/spec/lti/claim/deployment_id'],
      'https://purl.imsglobal.org/spec/lti-dl/claim/content_items': resources,
      'https://purl.imsglobal.org/spec/lti-dl/claim/data': deepLinkingSettings?.data,
    })
      .setProtectedHeader({ alg: 'RS256', kid: 'efh-lti-key' })
      .sign(await this.getPrivateKey());

    return jwt;
  }

  /**
   * Send grade back to platform (LTI Assignment and Grade Services)
   */
  async sendGrade(params: {
    platformId: string;
    lineItemUrl: string;
    userId: string;
    scoreGiven: number;
    scoreMaximum: number;
    comment?: string;
  }) {
    const platform = this.platforms.get(params.platformId);
    if (!platform) {
      throw new Error('Unknown platform');
    }

    // Get access token
    const accessToken = await this.getAccessToken(platform);

    // Send grade
    const response = await fetch(`${params.lineItemUrl}/scores`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/vnd.ims.lis.v1.score+json',
      },
      body: JSON.stringify({
        timestamp: new Date().toISOString(),
        scoreGiven: params.scoreGiven,
        scoreMaximum: params.scoreMaximum,
        comment: params.comment,
        activityProgress: 'Completed',
        gradingProgress: 'FullyGraded',
        userId: params.userId,
      }),
    });

    return response.ok;
  }

  /**
   * Get access token for platform
   */
  private async getAccessToken(platform: LTIPlatform): Promise<string> {
    const jwt = await new SignJWT({
      iss: this.issuer,
      sub: platform.clientId,
      aud: platform.tokenUrl,
      exp: Math.floor(Date.now() / 1000) + 300,
      iat: Math.floor(Date.now() / 1000),
    })
      .setProtectedHeader({ alg: 'RS256' })
      .sign(await this.getPrivateKey());

    const response = await fetch(platform.tokenUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        client_assertion_type: 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
        client_assertion: jwt,
        scope: 'https://purl.imsglobal.org/spec/lti-ags/scope/score',
      }),
    });

    const data = await response.json();
    return data.access_token;
  }

  /**
   * Fetch JWKS from platform
   */
  private async fetchJWKS(jwksUrl: string) {
    const response = await fetch(jwksUrl);
    const jwks = await response.json();
    
    // Return first key (simplified - should match kid)
    return jwks.keys[0];
  }

  /**
   * Get private key
   */
  private async getPrivateKey() {
    return crypto.subtle.importKey(
      'pkcs8',
      Buffer.from(this.privateKey, 'base64'),
      { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
      false,
      ['sign']
    );
  }
}

/**
 * Initialize LTI provider
 */
export function createLTIProvider(): LTIProvider {
  const provider = new LTIProvider({
    privateKey: process.env.LTI_PRIVATE_KEY!,
    publicKey: process.env.LTI_PUBLIC_KEY!,
    issuer: process.env.NEXT_PUBLIC_SITE_URL!,
  });

  // Register known platforms
  // Canvas, Blackboard, Moodle, etc.
  
  return provider;
}
