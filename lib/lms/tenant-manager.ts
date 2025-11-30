// Universal LMS - Tenant Management System
// Multi-tenant architecture with full isolation

import { createClient } from '@supabase/supabase-js';

export interface Tenant {
  id: string;
  slug: string;
  name: string;
  domain?: string;
  customDomain?: string;
  
  // White-label branding
  branding: {
    logoUrl?: string;
    faviconUrl?: string;
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
  };
  
  // Configuration
  settings: TenantSettings;
  features: TenantFeatures;
  limits: TenantLimits;
  
  // Subscription
  plan: 'free' | 'starter' | 'professional' | 'enterprise';
  subscriptionStatus: 'active' | 'trial' | 'suspended' | 'cancelled';
  trialEndsAt?: Date;
  subscriptionEndsAt?: Date;
  
  // Integrations
  integrations: TenantIntegrations;
  
  status: 'active' | 'suspended' | 'deleted';
  createdAt: Date;
  updatedAt: Date;
}

export interface TenantSettings {
  timezone: string;
  language: string;
  currency: string;
  dateFormat: string;
  timeFormat: string;
  
  // Email settings
  emailFrom: string;
  emailReplyTo: string;
  smtpConfig?: {
    host: string;
    port: number;
    username: string;
    password: string;
    secure: boolean;
  };
  
  // Course settings
  defaultCourseSettings: {
    enrollmentType: 'open' | 'approval_required' | 'invite_only';
    certificateEnabled: boolean;
    discussionsEnabled: boolean;
    allowGuestAccess: boolean;
  };
  
  // Security
  security: {
    requireEmailVerification: boolean;
    passwordMinLength: number;
    sessionTimeout: number;
    twoFactorEnabled: boolean;
    ipWhitelist?: string[];
  };
}

export interface TenantFeatures {
  // Core features
  courses: boolean;
  assessments: boolean;
  certificates: boolean;
  discussions: boolean;
  
  // Advanced features
  liveClasses: boolean;
  gamification: boolean;
  blockchainCertificates: boolean;
  vrArContent: boolean;
  aiPersonalization: boolean;
  plagiarismDetection: boolean;
  advancedProctoring: boolean;
  
  // Integrations
  salesforce: boolean;
  hubspot: boolean;
  zapier: boolean;
  slack: boolean;
  microsoftTeams: boolean;
  googleWorkspace: boolean;
  zoom: boolean;
  
  // Analytics
  advancedAnalytics: boolean;
  customReports: boolean;
  dataExport: boolean;
  
  // White-label
  customDomain: boolean;
  removeBranding: boolean;
  customEmails: boolean;
}

export interface TenantLimits {
  maxStudents: number;
  maxInstructors: number;
  maxCourses: number;
  maxStorageGB: number;
  maxVideoDurationHours: number;
  maxApiCallsPerDay: number;
}

export interface TenantIntegrations {
  salesforce?: {
    enabled: boolean;
    instanceUrl: string;
    accessToken: string;
    refreshToken: string;
    syncContacts: boolean;
    syncLeads: boolean;
  };
  
  hubspot?: {
    enabled: boolean;
    apiKey: string;
    portalId: string;
    syncContacts: boolean;
    syncDeals: boolean;
  };
  
  zapier?: {
    enabled: boolean;
    webhookUrl: string;
    apiKey: string;
  };
  
  slack?: {
    enabled: boolean;
    workspaceId: string;
    accessToken: string;
    botToken: string;
    channelId?: string;
    notifyEnrollments: boolean;
    notifyCompletions: boolean;
  };
  
  microsoftTeams?: {
    enabled: boolean;
    tenantId: string;
    clientId: string;
    clientSecret: string;
    teamId?: string;
    channelId?: string;
  };
  
  googleWorkspace?: {
    enabled: boolean;
    clientId: string;
    clientSecret: string;
    refreshToken: string;
    syncCalendar: boolean;
    syncDrive: boolean;
  };
  
  zoom?: {
    enabled: boolean;
    apiKey: string;
    apiSecret: string;
    accountId: string;
    autoCreateMeetings: boolean;
  };
}

export class TenantManager {
  private supabase: ReturnType<typeof createClient>;
  
  constructor(supabaseUrl: string, supabaseKey: string) {
    this.supabase = createClient(supabaseUrl, supabaseKey);
  }
  
  // Create new tenant
  async createTenant(data: {
    slug: string;
    name: string;
    email: string;
    plan?: string;
  }): Promise<Tenant> {
    const { data: tenant, error } = await this.supabase
      .from('tenants')
      .insert({
        slug: data.slug,
        name: data.name,
        plan: data.plan || 'free',
        settings: this.getDefaultSettings(),
        features: this.getDefaultFeatures(data.plan || 'free'),
        limits: this.getDefaultLimits(data.plan || 'free'),
        branding: {
          primaryColor: '#ea580c',
          secondaryColor: '#2563eb',
          accentColor: '#16a34a',
        },
      })
      .select()
      .single();
    
    if (error) throw error;
    
    // Create admin user for tenant
    await this.createTenantAdmin(tenant.id, data.email);
    
    // Initialize default content
    await this.initializeTenantContent(tenant.id);
    
    return tenant;
  }
  
  // Get tenant by slug or domain
  async getTenant(identifier: string): Promise<Tenant | null> {
    const { data, error } = await this.supabase
      .from('tenants')
      .select('*')
      .or(`slug.eq.${identifier},domain.eq.${identifier},custom_domain.eq.${identifier}`)
      .eq('status', 'active')
      .single();
    
    if (error) return null;
    return data;
  }
  
  // Update tenant settings
  async updateTenant(tenantId: string, updates: Partial<Tenant>): Promise<Tenant> {
    const { data, error } = await this.supabase
      .from('tenants')
      .update(updates)
      .eq('id', tenantId)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }
  
  // Update tenant branding
  async updateBranding(tenantId: string, branding: Partial<Tenant['branding']>): Promise<void> {
    const { error } = await this.supabase
      .from('tenants')
      .update({ branding })
      .eq('id', tenantId);
    
    if (error) throw error;
  }
  
  // Enable/disable features
  async updateFeatures(tenantId: string, features: Partial<TenantFeatures>): Promise<void> {
    const tenant = await this.getTenant(tenantId);
    if (!tenant) throw new Error('Tenant not found');
    
    const updatedFeatures = { ...tenant.features, ...features };
    
    const { error } = await this.supabase
      .from('tenants')
      .update({ features: updatedFeatures })
      .eq('id', tenantId);
    
    if (error) throw error;
  }
  
  // Configure integration
  async configureIntegration(
    tenantId: string,
    integration: keyof TenantIntegrations,
    config: any
  ): Promise<void> {
    const tenant = await this.getTenant(tenantId);
    if (!tenant) throw new Error('Tenant not found');
    
    const integrations = tenant.integrations || {};
    integrations[integration] = { ...config, enabled: true };
    
    const { error } = await this.supabase
      .from('tenants')
      .update({ integrations })
      .eq('id', tenantId);
    
    if (error) throw error;
    
    // Test integration
    await this.testIntegration(tenantId, integration);
  }
  
  // Test integration connection
  private async testIntegration(
    tenantId: string,
    integration: keyof TenantIntegrations
  ): Promise<boolean> {
    const tenant = await this.getTenant(tenantId);
    if (!tenant) return false;
    
    const config = tenant.integrations?.[integration];
    if (!config || !config.enabled) return false;
    
    try {
      switch (integration) {
        case 'salesforce':
          return await this.testSalesforceConnection(config);
        case 'hubspot':
          return await this.testHubSpotConnection(config);
        case 'slack':
          return await this.testSlackConnection(config);
        case 'zoom':
          return await this.testZoomConnection(config);
        default:
          return true;
      }
    } catch (error) {
      console.error(`Integration test failed for ${integration}:`, error);
      return false;
    }
  }
  
  // Integration test methods
  private async testSalesforceConnection(config: any): Promise<boolean> {
    const response = await fetch(`${config.instanceUrl}/services/data/v57.0/`, {
      headers: { Authorization: `Bearer ${config.accessToken}` },
    });
    return response.ok;
  }
  
  private async testHubSpotConnection(config: any): Promise<boolean> {
    const response = await fetch('https://api.hubapi.com/crm/v3/objects/contacts?limit=1', {
      headers: { Authorization: `Bearer ${config.apiKey}` },
    });
    return response.ok;
  }
  
  private async testSlackConnection(config: any): Promise<boolean> {
    const response = await fetch('https://slack.com/api/auth.test', {
      headers: { Authorization: `Bearer ${config.accessToken}` },
    });
    const data = await response.json();
    return data.ok;
  }
  
  private async testZoomConnection(config: any): Promise<boolean> {
    const response = await fetch('https://api.zoom.us/v2/users/me', {
      headers: { Authorization: `Bearer ${config.apiKey}` },
    });
    return response.ok;
  }
  
  // Helper methods
  private async createTenantAdmin(tenantId: string, email: string): Promise<void> {
    const { error } = await this.supabase
      .from('tenant_users')
      .insert({
        tenant_id: tenantId,
        email,
        role: 'admin',
        status: 'active',
      });
    
    if (error) throw error;
  }
  
  private async initializeTenantContent(tenantId: string): Promise<void> {
    // Create welcome course
    await this.supabase.from('courses').insert({
      tenant_id: tenantId,
      title: 'Welcome to Your LMS',
      slug: 'welcome',
      description: 'Get started with your new learning management system',
      status: 'published',
    });
  }
  
  private getDefaultSettings(): TenantSettings {
    return {
      timezone: 'America/New_York',
      language: 'en',
      currency: 'USD',
      dateFormat: 'MM/DD/YYYY',
      timeFormat: '12h',
      emailFrom: 'noreply@lms.com',
      emailReplyTo: 'support@lms.com',
      defaultCourseSettings: {
        enrollmentType: 'open',
        certificateEnabled: true,
        discussionsEnabled: true,
        allowGuestAccess: false,
      },
      security: {
        requireEmailVerification: true,
        passwordMinLength: 8,
        sessionTimeout: 3600,
        twoFactorEnabled: false,
      },
    };
  }
  
  private getDefaultFeatures(plan: string): TenantFeatures {
    const baseFeatures: TenantFeatures = {
      courses: true,
      assessments: true,
      certificates: true,
      discussions: true,
      liveClasses: false,
      gamification: false,
      blockchainCertificates: false,
      vrArContent: false,
      aiPersonalization: false,
      plagiarismDetection: false,
      advancedProctoring: false,
      salesforce: false,
      hubspot: false,
      zapier: false,
      slack: false,
      microsoftTeams: false,
      googleWorkspace: false,
      zoom: false,
      advancedAnalytics: false,
      customReports: false,
      dataExport: true,
      customDomain: false,
      removeBranding: false,
      customEmails: false,
    };
    
    if (plan === 'professional' || plan === 'enterprise') {
      baseFeatures.liveClasses = true;
      baseFeatures.gamification = true;
      baseFeatures.zapier = true;
      baseFeatures.slack = true;
      baseFeatures.zoom = true;
      baseFeatures.advancedAnalytics = true;
      baseFeatures.customReports = true;
    }
    
    if (plan === 'enterprise') {
      baseFeatures.blockchainCertificates = true;
      baseFeatures.vrArContent = true;
      baseFeatures.aiPersonalization = true;
      baseFeatures.plagiarismDetection = true;
      baseFeatures.advancedProctoring = true;
      baseFeatures.salesforce = true;
      baseFeatures.hubspot = true;
      baseFeatures.microsoftTeams = true;
      baseFeatures.googleWorkspace = true;
      baseFeatures.customDomain = true;
      baseFeatures.removeBranding = true;
      baseFeatures.customEmails = true;
    }
    
    return baseFeatures;
  }
  
  private getDefaultLimits(plan: string): TenantLimits {
    const limits: Record<string, TenantLimits> = {
      free: {
        maxStudents: 50,
        maxInstructors: 2,
        maxCourses: 5,
        maxStorageGB: 5,
        maxVideoDurationHours: 10,
        maxApiCallsPerDay: 1000,
      },
      starter: {
        maxStudents: 500,
        maxInstructors: 10,
        maxCourses: 50,
        maxStorageGB: 50,
        maxVideoDurationHours: 100,
        maxApiCallsPerDay: 10000,
      },
      professional: {
        maxStudents: 5000,
        maxInstructors: 50,
        maxCourses: 500,
        maxStorageGB: 500,
        maxVideoDurationHours: 1000,
        maxApiCallsPerDay: 100000,
      },
      enterprise: {
        maxStudents: -1, // unlimited
        maxInstructors: -1,
        maxCourses: -1,
        maxStorageGB: -1,
        maxVideoDurationHours: -1,
        maxApiCallsPerDay: -1,
      },
    };
    
    return limits[plan] || limits.free;
  }
}

// Export singleton instance
export const tenantManager = new TenantManager(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);
